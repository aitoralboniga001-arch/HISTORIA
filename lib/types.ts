export type TextSource = {
  id: string;
  number: number;
  title: string;
  date: string;
  theme: string;
  body: string;
};

export type TrapRule = {
  id: string;
  correct: string;
  wrongOptions: string[];
  priority: number;
  reason: string;
};

export type TrapCandidate = {
  id: string;
  textId: string;
  ruleId: string;
  correct: string;
  wrong: string;
  priority: number;
  reason: string;
  category: TrapCategory;
};

export type MutatedTrap = TrapCandidate & {
  start: number;
  end: number;
};

export type AkatsExercise = {
  id: string;
  text: TextSource;
  mutatedBody: string;
  traps: MutatedTrap[];
};

export type AkatsAnswer = {
  trapId: string;
  correction: string;
};

export type AkatsResult = {
  identificationScore: number;
  correctionScore: number;
  total: number;
  details: Array<{
    trap: MutatedTrap;
    identified: boolean;
    corrected: boolean;
    answer: string;
  }>;
};

export type HistoryEvent = {
  id: string;
  date: string;
  sortKey: string;
  label: string;
  theme: string;
  priority: number;
};

export type OrderingSet = {
  id: string;
  title: string;
  eventIds: string[];
  priority: number;
};

export type OrderingExercise = {
  id: string;
  title: string;
  events: HistoryEvent[];
};

export type ProgressItem = {
  itemId: string;
  itemType: 'trap' | 'event' | 'ordering-set';
  mastery: number;
  streak: number;
  ease: number;
  dueAt: string;
};

export type AttemptType = 'akatsak' | 'ordenatu';

export type TrapCategory = 'kontzeptua' | 'lurraldea' | 'pertsona' | 'data' | 'erakundea' | 'eskubidea' | 'ekonomia';
