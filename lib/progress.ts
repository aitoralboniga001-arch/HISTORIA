'use client';

import type { AttemptType, ProgressItem } from './types';

export type LocalProfile = {
  id: string;
  username: string;
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
  profile: LocalProfile;
  progress: Record<string, ProgressItem>;
  attempts: LocalAttempt[];
};

const PROFILE_KEY = 'historia-usap:local-profile:v2';
const PROGRESS_KEY = 'historia-usap:local-progress:v2';
const PROGRESS_MIRROR_KEY = 'historia-usap:local-progress-mirror:v2';
const ATTEMPTS_KEY = 'historia-usap:local-attempts:v2';
const OLD_LOCAL_PREFIX = 'historia-usap:';
const MAX_ATTEMPTS = 500;

export async function getOrCreateProfile(): Promise<LocalProfile> {
  if (typeof window === 'undefined') return { id: 'local-device', username: 'Nire gailua' };
  const existing = readJson<LocalProfile>(PROFILE_KEY);
  if (existing?.id) return existing;
  const profile = {
    id: createId(),
    username: 'Nire gailua'
  };
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  return profile;
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

export async function loadProgress(_profile: LocalProfile): Promise<Record<string, ProgressItem>> {
  const primary = readProgress(PROGRESS_KEY);
  const mirror = readProgress(PROGRESS_MIRROR_KEY);
  const legacy = loadLegacyProgress();
  const merged = mergeProgress(mergeProgress(mirror, primary), legacy);
  if (Object.keys(legacy).length || Object.keys(primary).length || Object.keys(mirror).length) {
    saveLocalProgress(merged);
  }
  return merged;
}

export async function saveProgress(_profile: LocalProfile, progress: Record<string, ProgressItem>): Promise<void> {
  saveLocalProgress(progress);
}

export async function saveAttempt(input: {
  profile: LocalProfile;
  type: AttemptType;
  score: number;
  maxScore: number;
  detail: unknown;
}): Promise<void> {
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

export function loadAttempts(): LocalAttempt[] {
  return readJson<LocalAttempt[]>(ATTEMPTS_KEY) ?? [];
}

export function createProgressBackup(profile: LocalProfile, progress: Record<string, ProgressItem>): BackupPayload {
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

function saveLocalProgress(progress: Record<string, ProgressItem>): void {
  if (typeof window === 'undefined') return;
  const payload = JSON.stringify(progress);
  window.localStorage.setItem(PROGRESS_KEY, payload);
  window.localStorage.setItem(PROGRESS_MIRROR_KEY, payload);
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
    if ([PROFILE_KEY, PROGRESS_KEY, PROGRESS_MIRROR_KEY, ATTEMPTS_KEY].includes(key)) continue;
    const value = sanitizeProgress(readJson<Record<string, ProgressItem>>(key) ?? {});
    merged = mergeProgress(merged, value);
  }
  return merged;
}

function sanitizeProgress(progress: Record<string, ProgressItem>): Record<string, ProgressItem> {
  const output: Record<string, ProgressItem> = {};
  for (const [key, item] of Object.entries(progress)) {
    if (!item || item.itemId !== key) continue;
    if (!['trap', 'event', 'ordering-set'].includes(item.itemType)) continue;
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

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
