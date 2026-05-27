import { describe, expect, it } from 'vitest';
import { events, texts } from '../lib/content';
import {
  createAkatsExercise,
  createAkatsExerciseForText,
  createSeleAkatsExercise,
  createSeleOrderingExercise,
  eligibleTexts,
  examOrderingEvents,
  examOrderingSets,
  findWholePhrase,
  categoryLabel,
  getTrapCandidates,
  isOfficialA1Candidate,
  normalizeAnswer,
  seleAkatsSets,
  seleOrderingSets,
  scoreAkatsExercise,
  scoreOrdering,
  updateProgressItem,
  weakTrapCandidates
} from '../lib/exercises';

describe('akatsak', () => {
  it('normalizes casing, accents and spacing', () => {
    expect(normalizeAnswer('  \u00c1lava  ')).toBe(normalizeAnswer('alava'));
    expect(normalizeAnswer('Euskal   Herria')).toBe('euskal herria');
  });

  it('creates five non-overlapping traps for an eligible exercise', () => {
    const exercise = createAkatsExercise();
    expect(exercise.text.number).toBeGreaterThanOrEqual(13);
    expect(exercise.traps).toHaveLength(5);
    const ids = new Set(exercise.traps.map((trap) => trap.id));
    expect(ids.size).toBe(5);
    for (const trap of exercise.traps) {
      expect(exercise.mutatedBody.slice(trap.start, trap.end)).toBe(trap.wrong);
      expect(trap.correct).not.toMatch(/\b(VII|XII|XIII|XIV|I\.a|II\.a)\b/);
    }
  });

  it('can create correction practice for a chosen official text', () => {
    const exercise = createAkatsExerciseForText('text-16');
    expect(exercise.text.id).toBe('text-16');
    expect(exercise.traps).toHaveLength(5);
  });

  it('scores identification and correction separately', () => {
    const exercise = createAkatsExercise();
    const firstThree = exercise.traps.slice(0, 3);
    const result = scoreAkatsExercise(
      exercise,
      new Set(firstThree.map((trap) => trap.id)),
      firstThree.map((trap, index) => ({ trapId: trap.id, correction: index < 2 ? trap.correct : 'okerra' }))
    );
    expect(result.identificationScore).toBe(0.6);
    expect(result.correctionScore).toBe(0.4);
    expect(result.total).toBe(1);
  });

  it('has candidates in the official text bank', () => {
    const total = texts.reduce((sum, text) => sum + getTrapCandidates(text).length, 0);
    expect(total).toBeGreaterThan(90);
  });

  it('limits correction practice to texts from Clara Campoamor onwards', () => {
    expect(eligibleTexts().every((text) => text.number >= 13)).toBe(true);
  });

  it('follows official A1 restriction against numeric figures', () => {
    expect(isOfficialA1Candidate('1936ko uztailaren 18ra')).toBe(false);
    expect(isOfficialA1Candidate('Alfontso XIII.a')).toBe(false);
    expect(isOfficialA1Candidate('uztailaren')).toBe(true);
    const exercise = createAkatsExercise();
    expect(exercise.traps.every((trap) => isOfficialA1Candidate(trap.correct))).toBe(true);
  });

  it('does not match country names inside longer Basque forms', () => {
    expect(findWholePhrase('Espainiar estatua', 'Espainia')).toBeNull();
    expect(findWholePhrase('Espainiar estatua', 'Espainiar')).toEqual({ start: 0, end: 9 });
  });

  it('prioritizes weak flashcards from the correction text bank', () => {
    const cards = weakTrapCandidates({}, 12);
    expect(cards).toHaveLength(12);
    expect(cards.every((card) => texts.find((text) => text.id === card.textId)?.number >= 13)).toBe(true);
    expect(cards.every((card) => categoryLabel(card.category).length > 0)).toBe(true);
  });

  it('creates stricter selectivity-style akats exercises', () => {
    const exercise = createSeleAkatsExercise();
    expect(exercise.text.number).toBeGreaterThanOrEqual(13);
    expect(exercise.traps).toHaveLength(5);
    expect(exercise.traps.every((trap) => trap.priority >= 4)).toBe(true);
    expect(seleAkatsSets.some((set) => set.id === exercise.id)).toBe(true);
    expect(exercise.id).toBe('sele-akats-13-ofiziala-2025');
    expect(Object.fromEntries(exercise.traps.map((trap) => [trap.correct, trap.wrong]))).toMatchObject({
      askatasunaren: 'tiraniaren',
      Errepublika: 'Monarkia',
      monarkiaren: 'Errepublikaren',
      lehen: 'azken',
      Espainia: 'Frantzia'
    });
  });

  it('has manually curated selectivity akats sets', () => {
    expect(seleAkatsSets).toHaveLength(26);
    expect(seleAkatsSets.every((set) => set.corrects.length === 5)).toBe(true);
    expect(new Set(seleAkatsSets.map((set) => set.id)).size).toBe(seleAkatsSets.length);
  });

  it('covers new correction texts before repeating mastered selectivity sets', () => {
    const done = {
      itemId: 'sele-akats-13-ofiziala-2025',
      itemType: 'akats-set' as const,
      mastery: 0.85,
      streak: 2,
      ease: 1.6,
      dueAt: new Date(0).toISOString()
    };
    const exercise = createSeleAkatsExercise({ [done.itemId]: done });
    expect(exercise.id).not.toBe(done.itemId);
    expect(exercise.text.id).not.toBe('text-13');
  });

  it('rescues disastrous correction sets before continuing coverage', () => {
    const failed = {
      itemId: 'sele-akats-13-ofiziala-2025',
      itemType: 'akats-set' as const,
      mastery: 0.05,
      streak: 0,
      ease: 1,
      dueAt: new Date(0).toISOString()
    };
    const exercise = createSeleAkatsExercise({ [failed.itemId]: failed });
    expect(exercise.id).toBe(failed.itemId);
  });
});

describe('ordenatu', () => {
  it('scores longest correct chronological run with official PAU scale', () => {
    const ids = [...events]
      .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
      .filter((event, index, list) => index === 0 || event.sortKey !== list[index - 1].sortKey)
      .slice(0, 5)
      .map((event) => event.id);
    expect(scoreOrdering(ids)).toBe(1);
    expect(scoreOrdering([ids[4], ids[0], ids[1], ids[2], ids[3]])).toBe(0.75);
    expect(scoreOrdering([ids[0], ids[1], ids[3], ids[2], ids[4]])).toBe(0.25);
    expect(scoreOrdering([...ids].reverse())).toBe(0);
  });

  it('uses only the official 2025-2026 chronology bank', () => {
    const officialIds = new Set(examOrderingEvents().map((event) => event.id));
    expect(examOrderingEvents().length).toBeGreaterThan(90);
    expect(examOrderingSets().every((set) => set.eventIds.every((id) => officialIds.has(id)))).toBe(true);
  });

  it('creates selectivity-style ordering exercises from official sets', () => {
    const exercise = createSeleOrderingExercise();
    expect(exercise.events).toHaveLength(5);
    expect(exercise.events.every((event) => event.sortKey <= '1982-99-99')).toBe(true);
    expect(seleOrderingSets.some((set) => set.id === exercise.id)).toBe(true);
    expect(exercise.id).toBe('sele-set-051');
  });

  it('has manually curated obvious selectivity ordering sets', () => {
    const officialIds = new Set(examOrderingEvents().map((event) => event.id));
    expect(seleOrderingSets).toHaveLength(56);
    expect(seleOrderingSets.every((set) => set.eventIds.length === 5)).toBe(true);
    expect(seleOrderingSets.every((set) => set.eventIds.every((id) => officialIds.has(id)))).toBe(true);
    expect(seleOrderingSets.every((set) => set.priority >= 8)).toBe(true);
  });

  it('covers new chronology sets before repeating mastered ones', () => {
    const done = {
      itemId: 'sele-set-051',
      itemType: 'ordering-set' as const,
      mastery: 0.9,
      streak: 2,
      ease: 1.6,
      dueAt: new Date(0).toISOString()
    };
    const exercise = createSeleOrderingExercise({ [done.itemId]: done });
    expect(exercise.id).not.toBe(done.itemId);
  });

  it('rescues disastrous chronology sets before continuing coverage', () => {
    const failed = {
      itemId: 'sele-set-051',
      itemType: 'ordering-set' as const,
      mastery: 0.05,
      streak: 0,
      ease: 1,
      dueAt: new Date(0).toISOString()
    };
    const exercise = createSeleOrderingExercise({ [failed.itemId]: failed });
    expect(exercise.id).toBe(failed.itemId);
  });
});

describe('spaced repetition', () => {
  it('raises mastery after success and lowers it after failure', () => {
    const first = updateProgressItem(undefined, 'x', 'trap', 1);
    expect(first.mastery).toBeGreaterThan(0);
    expect(first.streak).toBe(1);
    const failed = updateProgressItem(first, 'x', 'trap', 0);
    expect(failed.mastery).toBeLessThan(first.mastery);
    expect(failed.streak).toBe(0);
  });
});
