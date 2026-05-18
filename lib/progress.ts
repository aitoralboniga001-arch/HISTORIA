'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { AttemptType, ProgressItem } from './types';

export type Profile = {
  id: string;
  username: string;
  isLocal: boolean;
};

export type LocalAttempt = {
  id: string;
  createdAt: string;
  type: AttemptType;
  score: number;
  maxScore: number;
  detail: unknown;
};

type BackupPayload = {
  app: 'historia-usap-trainer';
  version: 2;
  exportedAt: string;
  profile: Profile;
  progress: Record<string, ProgressItem>;
  attempts: LocalAttempt[];
};

const LAST_USERNAME_KEY = 'historia-usap:last-username:v3';
const PROGRESS_KEY = 'historia-usap:local-progress:v2';
const PROGRESS_MIRROR_KEY = 'historia-usap:local-progress-mirror:v2';
const ATTEMPTS_KEY = 'historia-usap:local-attempts:v2';
const OLD_LOCAL_PREFIX = 'historia-usap:';
const MAX_ATTEMPTS = 500;

let client: SupabaseClient | null = null;

function supabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  client ??= createClient(url, anon);
  return client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getLastUsername(): string {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(LAST_USERNAME_KEY) ?? '';
}

export function clearLastUsername(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(LAST_USERNAME_KEY);
}

export async function getOrCreateProfile(username: string): Promise<Profile> {
  const clean = normalizeUsername(username);
  if (!clean) throw new Error('Idatzi erabiltzaile-izena.');
  if (typeof window !== 'undefined') window.localStorage.setItem(LAST_USERNAME_KEY, clean);

  const db = supabase();
  if (!db) return { id: clean, username: clean, isLocal: true };

  const existing = await db.from('profiles').select('id, username').eq('username', clean).maybeSingle();
  if (existing.error) throw existing.error;
  if (existing.data) {
    await db.from('profiles').update({ last_seen_at: new Date().toISOString() }).eq('id', existing.data.id);
    return { id: existing.data.id, username: existing.data.username, isLocal: false };
  }

  const created = await db
    .from('profiles')
    .insert({ username: clean, last_seen_at: new Date().toISOString() })
    .select('id, username')
    .single();
  if (created.error) throw created.error;
  return { id: created.data.id, username: created.data.username, isLocal: false };
}

export async function requestPersistentStorage(): Promise<boolean | null> {
  if (typeof navigator === 'undefined' || !navigator.storage?.persist) return null;
  try {
    if (await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch {
    return null;
  }
}

export async function loadProgress(profile: Profile): Promise<Record<string, ProgressItem>> {
  const local = loadAllLocalProgress();
  const db = supabase();
  if (!db || profile.isLocal) {
    saveLocalProgress(local);
    return local;
  }

  const response = await db
    .from('item_progress')
    .select('item_id,item_type,mastery,streak,ease,due_at')
    .eq('profile_id', profile.id);
  if (response.error) throw response.error;

  const remote = sanitizeProgress(
    Object.fromEntries(
      (response.data ?? []).map((row) => [
        row.item_id,
        {
          itemId: row.item_id,
          itemType: row.item_type,
          mastery: Number(row.mastery ?? 0),
          streak: Number(row.streak ?? 0),
          ease: Number(row.ease ?? 1.4),
          dueAt: row.due_at
        } satisfies ProgressItem
      ])
    )
  );
  const merged = mergeProgress(remote, local);
  saveLocalProgress(merged);
  if (Object.keys(merged).length) await saveProgress(profile, merged);
  return merged;
}

export async function saveProgress(profile: Profile, progress: Record<string, ProgressItem>): Promise<void> {
  saveLocalProgress(progress);
  const db = supabase();
  if (!db || profile.isLocal) return;

  const rows = Object.values(progress).map((item) => ({
    profile_id: profile.id,
    item_id: item.itemId,
    item_type: item.itemType,
    mastery: item.mastery,
    streak: item.streak,
    ease: item.ease,
    due_at: item.dueAt,
    updated_at: new Date().toISOString()
  }));
  if (!rows.length) return;
  const response = await db.from('item_progress').upsert(rows, { onConflict: 'profile_id,item_id' });
  if (response.error) throw response.error;
}

export async function saveAttempt(input: {
  profile: Profile;
  type: AttemptType;
  score: number;
  maxScore: number;
  detail: unknown;
}): Promise<void> {
  saveLocalAttempt(input);
  const db = supabase();
  if (!db || input.profile.isLocal) return;

  const response = await db.from('attempts').insert({
    profile_id: input.profile.id,
    type: input.type,
    score: input.score,
    max_score: input.maxScore,
    detail: input.detail
  });
  if (response.error) throw response.error;
}

export function loadAttempts(): LocalAttempt[] {
  return readJson<LocalAttempt[]>(ATTEMPTS_KEY) ?? [];
}

export function createProgressBackup(profile: Profile, progress: Record<string, ProgressItem>): BackupPayload {
  return {
    app: 'historia-usap-trainer',
    version: 2,
    exportedAt: new Date().toISOString(),
    profile,
    progress,
    attempts: loadAttempts()
  };
}

export function importProgressBackup(raw: string, current: Record<string, ProgressItem>): Record<string, ProgressItem> {
  const parsed = JSON.parse(raw) as Partial<BackupPayload>;
  if (parsed.app !== 'historia-usap-trainer' || !parsed.progress || typeof parsed.progress !== 'object') {
    throw new Error('Babeskopia ez da baliozkoa.');
  }
  const sanitized = sanitizeProgress(parsed.progress);
  const merged = mergeProgress(current, sanitized);
  saveLocalProgress(merged);
  if (Array.isArray(parsed.attempts) && typeof window !== 'undefined') {
    const attempts = [...parsed.attempts, ...loadAttempts()]
      .filter((attempt): attempt is LocalAttempt => Boolean(attempt?.id && attempt.createdAt))
      .slice(0, MAX_ATTEMPTS);
    window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
  }
  return merged;
}

function saveLocalAttempt(input: {
  type: AttemptType;
  score: number;
  maxScore: number;
  detail: unknown;
}): void {
  if (typeof window === 'undefined') return;
  const attempts = loadAttempts();
  attempts.unshift({
    id: createId(),
    createdAt: new Date().toISOString(),
    type: input.type,
    score: input.score,
    maxScore: input.maxScore,
    detail: input.detail
  });
  window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts.slice(0, MAX_ATTEMPTS)));
}

function saveLocalProgress(progress: Record<string, ProgressItem>): void {
  if (typeof window === 'undefined') return;
  const payload = JSON.stringify(progress);
  window.localStorage.setItem(PROGRESS_KEY, payload);
  window.localStorage.setItem(PROGRESS_MIRROR_KEY, payload);
}

function loadAllLocalProgress(): Record<string, ProgressItem> {
  const primary = readProgress(PROGRESS_KEY);
  const mirror = readProgress(PROGRESS_MIRROR_KEY);
  const legacy = loadLegacyProgress();
  return mergeProgress(mergeProgress(mirror, primary), legacy);
}

function readProgress(key: string): Record<string, ProgressItem> {
  return sanitizeProgress(readJson<Record<string, ProgressItem>>(key) ?? {});
}

function loadLegacyProgress(): Record<string, ProgressItem> {
  if (typeof window === 'undefined') return {};
  let merged: Record<string, ProgressItem> = {};
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key || !key.startsWith(OLD_LOCAL_PREFIX)) continue;
    if ([LAST_USERNAME_KEY, PROGRESS_KEY, PROGRESS_MIRROR_KEY, ATTEMPTS_KEY].includes(key)) continue;
    const value = sanitizeProgress(readJson<Record<string, ProgressItem>>(key) ?? {});
    merged = mergeProgress(merged, value);
  }
  return merged;
}

function sanitizeProgress(progress: Record<string, ProgressItem>): Record<string, ProgressItem> {
  const output: Record<string, ProgressItem> = {};
  for (const [key, item] of Object.entries(progress)) {
    if (!item || item.itemId !== key) continue;
    if (!['trap', 'event', 'ordering-set', 'akats-set'].includes(item.itemType)) continue;
    output[key] = {
      itemId: item.itemId,
      itemType: item.itemType,
      mastery: clamp(Number(item.mastery ?? 0), 0, 1),
      streak: Math.max(0, Number(item.streak ?? 0)),
      ease: clamp(Number(item.ease ?? 1.4), 0.7, 2.8),
      dueAt: Number.isNaN(new Date(item.dueAt).getTime()) ? new Date().toISOString() : item.dueAt
    };
  }
  return output;
}

function mergeProgress(
  base: Record<string, ProgressItem>,
  incoming: Record<string, ProgressItem>
): Record<string, ProgressItem> {
  const merged = { ...base };
  for (const [id, item] of Object.entries(incoming)) {
    const current = merged[id];
    if (!current) {
      merged[id] = item;
      continue;
    }
    const itemScore = item.mastery + item.streak * 0.03;
    const currentScore = current.mastery + current.streak * 0.03;
    merged[id] = itemScore >= currentScore ? item : current;
  }
  return merged;
}

function readJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function normalizeUsername(value: string): string {
  return value.trim().replace(/\s+/g, '-').toLocaleLowerCase('eu').slice(0, 40);
}

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
