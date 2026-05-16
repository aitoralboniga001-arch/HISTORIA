import { events, orderingSets, texts, trapRules } from './content';
import type {
  AkatsAnswer,
  AkatsExercise,
  AkatsResult,
  HistoryEvent,
  MutatedTrap,
  OrderingExercise,
  OrderingSet,
  ProgressItem,
  TextSource,
  TrapCandidate,
  TrapCategory
} from './types';

const DAY = 24 * 60 * 60 * 1000;
export const EXAM_TEXT_MIN_NUMBER = 13;
export const OFFICIAL_ORDERING_SCORE_BY_RUN: Record<number, number> = {
  5: 1,
  4: 0.75,
  3: 0.5,
  2: 0.25
};

export const seleOrderingSets: OrderingSet[] = [
  {
    id: 'sele-set-001',
    title: 'Sele kronologia orokorra I',
    eventIds: ['event-008', 'event-023', 'event-044', 'event-093', 'event-100'],
    priority: 10
  },
  {
    id: 'sele-set-002',
    title: 'Sele kronologia orokorra II',
    eventIds: ['event-002', 'event-029', 'event-048', 'event-071', 'event-098'],
    priority: 10
  },
  {
    id: 'sele-set-003',
    title: 'Sele kronologia orokorra III',
    eventIds: ['event-012', 'event-031', 'event-044', 'event-058', 'event-106'],
    priority: 10
  },
  {
    id: 'sele-set-004',
    title: 'Sele kronologia orokorra IV',
    eventIds: ['event-014', 'event-040', 'event-047', 'event-080', 'event-103'],
    priority: 10
  },
  {
    id: 'sele-set-005',
    title: 'Sele kronologia orokorra V',
    eventIds: ['event-025', 'event-030', 'event-057', 'event-091', 'event-102'],
    priority: 10
  },
  {
    id: 'sele-set-006',
    title: 'Estatu liberala eta Berrezarkuntza',
    eventIds: ['event-002', 'event-008', 'event-023', 'event-027', 'event-029'],
    priority: 9
  },
  {
    id: 'sele-set-007',
    title: 'Foruak eta nazionalismoa',
    eventIds: ['event-012', 'event-014', 'event-030', 'event-031', 'event-038'],
    priority: 9
  },
  {
    id: 'sele-set-008',
    title: 'Berrezarkuntza krisia',
    eventIds: ['event-038', 'event-040', 'event-043', 'event-044', 'event-047'],
    priority: 9
  },
  {
    id: 'sele-set-009',
    title: 'II. Errepublika',
    eventIds: ['event-047', 'event-048', 'event-049', 'event-054', 'event-057'],
    priority: 9
  },
  {
    id: 'sele-set-010',
    title: 'Errepublika eta Gerra Zibila',
    eventIds: ['event-048', 'event-057', 'event-058', 'event-061', 'event-065'],
    priority: 9
  },
  {
    id: 'sele-set-011',
    title: 'Gerra Zibila Euskal Herrian',
    eventIds: ['event-058', 'event-061', 'event-062', 'event-065', 'event-066'],
    priority: 9
  },
  {
    id: 'sele-set-012',
    title: 'Gerra Zibila eta lehen frankismoa',
    eventIds: ['event-065', 'event-066', 'event-067', 'event-070', 'event-071'],
    priority: 9
  },
  {
    id: 'sele-set-013',
    title: 'Frankismoaren finkapena',
    eventIds: ['event-071', 'event-076', 'event-078', 'event-080', 'event-084'],
    priority: 9
  },
  {
    id: 'sele-set-014',
    title: 'Oposizioa eta frankismoaren amaiera',
    eventIds: ['event-082', 'event-084', 'event-088', 'event-091', 'event-093'],
    priority: 9
  },
  {
    id: 'sele-set-015',
    title: 'Trantsizio politikoa',
    eventIds: ['event-093', 'event-097', 'event-098', 'event-100', 'event-106'],
    priority: 9
  },
  {
    id: 'sele-set-016',
    title: 'Trantsizioa eta autonomia',
    eventIds: ['event-098', 'event-100', 'event-102', 'event-103', 'event-105'],
    priority: 9
  },
  {
    id: 'sele-set-017',
    title: 'Konstituzioak',
    eventIds: ['event-008', 'event-013', 'event-029', 'event-049', 'event-100'],
    priority: 8
  },
  {
    id: 'sele-set-018',
    title: 'Autonomia euskal bidea',
    eventIds: ['event-054', 'event-061', 'event-062', 'event-102', 'event-103'],
    priority: 8
  },
  {
    id: 'sele-set-019',
    title: 'Testu ofizialen kronologia',
    eventIds: ['event-050', 'event-057', 'event-061', 'event-067', 'event-070'],
    priority: 8
  },
  {
    id: 'sele-set-020',
    title: 'Testu ofizialen kronologia II',
    eventIds: ['event-070', 'event-082', 'event-084', 'event-100', 'event-103'],
    priority: 8
  },
  {
    id: 'sele-set-021',
    title: 'Euskal auzia XIX-XX',
    eventIds: ['event-015', 'event-030', 'event-031', 'event-061', 'event-103'],
    priority: 8
  },
  {
    id: 'sele-set-022',
    title: 'Krisi politiko nagusiak',
    eventIds: ['event-040', 'event-043', 'event-044', 'event-058', 'event-106'],
    priority: 8
  },
  {
    id: 'sele-set-023',
    title: 'Euskal gatazka eta diktadura',
    eventIds: ['event-080', 'event-082', 'event-088', 'event-091', 'event-093'],
    priority: 8
  },
  {
    id: 'sele-set-024',
    title: 'Ekonomia eta autogobernua',
    eventIds: ['event-031', 'event-067', 'event-080', 'event-103', 'event-105'],
    priority: 8
  },
  {
    id: 'sele-set-025',
    title: 'Azterketa ereduaren antzekoa',
    eventIds: ['event-008', 'event-044', 'event-058', 'event-093', 'event-100'],
    priority: 10
  },
  {
    id: 'sele-set-026',
    title: 'Sele kronologia orokorra VI',
    eventIds: ['event-008', 'event-030', 'event-048', 'event-080', 'event-106'],
    priority: 10
  },
  {
    id: 'sele-set-027',
    title: 'Sele kronologia orokorra VII',
    eventIds: ['event-023', 'event-038', 'event-044', 'event-071', 'event-103'],
    priority: 10
  },
  {
    id: 'sele-set-028',
    title: 'Sele kronologia orokorra VIII',
    eventIds: ['event-012', 'event-029', 'event-057', 'event-082', 'event-100'],
    priority: 10
  },
  {
    id: 'sele-set-029',
    title: 'Sele kronologia orokorra IX',
    eventIds: ['event-014', 'event-025', 'event-047', 'event-067', 'event-098'],
    priority: 10
  },
  {
    id: 'sele-set-030',
    title: 'Sele kronologia orokorra X',
    eventIds: ['event-031', 'event-040', 'event-058', 'event-091', 'event-105'],
    priority: 10
  },
  {
    id: 'sele-set-031',
    title: 'Liberalismoaren eraikuntza',
    eventIds: ['event-002', 'event-008', 'event-012', 'event-014', 'event-015'],
    priority: 8
  },
  {
    id: 'sele-set-032',
    title: 'Seiurtekoa eta Berrezarkuntza',
    eventIds: ['event-023', 'event-025', 'event-027', 'event-029', 'event-030'],
    priority: 8
  },
  {
    id: 'sele-set-033',
    title: 'Foru galera eta kontzertua',
    eventIds: ['event-014', 'event-015', 'event-030', 'event-031', 'event-067'],
    priority: 8
  },
  {
    id: 'sele-set-034',
    title: 'Nazionalismoa eta krisia',
    eventIds: ['event-037', 'event-038', 'event-040', 'event-043', 'event-044'],
    priority: 8
  },
  {
    id: 'sele-set-035',
    title: 'Diktadura eta Errepublika',
    eventIds: ['event-044', 'event-047', 'event-048', 'event-049', 'event-057'],
    priority: 8
  },
  {
    id: 'sele-set-036',
    title: 'Errepublikako euskal autonomia',
    eventIds: ['event-048', 'event-054', 'event-057', 'event-061', 'event-062'],
    priority: 8
  },
  {
    id: 'sele-set-037',
    title: 'Gerra Zibila sekuentzia nagusia',
    eventIds: ['event-058', 'event-059', 'event-061', 'event-065', 'event-071'],
    priority: 8
  },
  {
    id: 'sele-set-038',
    title: 'Euskal frontea',
    eventIds: ['event-060', 'event-061', 'event-062', 'event-065', 'event-066'],
    priority: 8
  },
  {
    id: 'sele-set-039',
    title: 'Errepresioa eta autarkia',
    eventIds: ['event-070', 'event-071', 'event-072', 'event-076', 'event-078'],
    priority: 8
  },
  {
    id: 'sele-set-040',
    title: 'Kanpo irekiera eta garapena',
    eventIds: ['event-076', 'event-078', 'event-080', 'event-081', 'event-084'],
    priority: 8
  },
  {
    id: 'sele-set-041',
    title: 'Frankismoaren oposizio demokratikoa',
    eventIds: ['event-082', 'event-084', 'event-088', 'event-091', 'event-093'],
    priority: 8
  },
  {
    id: 'sele-set-042',
    title: 'Trantsizioaren lehen urratsak',
    eventIds: ['event-093', 'event-095', 'event-097', 'event-098', 'event-099'],
    priority: 8
  },
  {
    id: 'sele-set-043',
    title: 'Konstituzioa eta autonomia',
    eventIds: ['event-098', 'event-100', 'event-101', 'event-102', 'event-103'],
    priority: 8
  },
  {
    id: 'sele-set-044',
    title: 'Trantsizioaren amaiera',
    eventIds: ['event-100', 'event-102', 'event-103', 'event-105', 'event-106'],
    priority: 8
  },
  {
    id: 'sele-set-045',
    title: 'Testu 13-24 lotura I',
    eventIds: ['event-050', 'event-057', 'event-061', 'event-070', 'event-082'],
    priority: 9
  },
  {
    id: 'sele-set-046',
    title: 'Testu 13-24 lotura II',
    eventIds: ['event-057', 'event-067', 'event-070', 'event-084', 'event-100'],
    priority: 9
  },
  {
    id: 'sele-set-047',
    title: 'Testu 13-24 lotura III',
    eventIds: ['event-061', 'event-082', 'event-084', 'event-100', 'event-103'],
    priority: 9
  },
  {
    id: 'sele-set-048',
    title: 'Euskal autogobernua konparatua',
    eventIds: ['event-031', 'event-054', 'event-061', 'event-103', 'event-105'],
    priority: 9
  },
  {
    id: 'sele-set-049',
    title: 'Erregimen aldaketak',
    eventIds: ['event-023', 'event-025', 'event-044', 'event-048', 'event-093'],
    priority: 9
  },
  {
    id: 'sele-set-050',
    title: 'Sele eredu orokorra XI',
    eventIds: ['event-008', 'event-038', 'event-058', 'event-080', 'event-103'],
    priority: 10
  }
];

export const seleAkatsSets = [
  {
    id: 'sele-akats-13-a',
    textId: 'text-13',
    title: 'Clara Campoamor: kontzeptu politikoak',
    corrects: ['askatasunaren', 'Errepublika', 'lehen', 'Espainia', 'sufragio'],
    priority: 10
  },
  {
    id: 'sele-akats-13-b',
    textId: 'text-13',
    title: 'Clara Campoamor: subjektua eta erakundeak',
    corrects: ['askatasuna', 'Espainiako', 'emakumearen', 'emakumeari', 'ganbera'],
    priority: 9
  },
  {
    id: 'sele-akats-14-a',
    textId: 'text-14',
    title: 'Fronte Popularra: amnistia eta ekonomia',
    corrects: ['Errepublika', 'amnistia', 'delitu politiko eta sozialen', 'lurra nazionalizatu', 'bankuak nazionalizatzeko'],
    priority: 10
  },
  {
    id: 'sele-akats-14-b',
    textId: 'text-14',
    title: 'Fronte Popularra: langileak eta Estatua',
    corrects: ['langileen', 'Estatu errepublikanoaren', 'nazionalizatu', 'langile-kontrola', 'Fronte Popularra'],
    priority: 9
  },
  {
    id: 'sele-akats-15-a',
    textId: 'text-15',
    title: '1936ko Estatutua: lurraldea eta hizkuntza',
    corrects: ['Errepublikako', 'Arabak, Gipuzkoak eta Bizkaiak', 'Euskara', 'Euskara, gaztelania bezala', 'Bizkaiko gobernadore zibilak'],
    priority: 10
  },
  {
    id: 'sele-akats-15-b',
    textId: 'text-15',
    title: '1936ko Estatutua: demokrazia eta erakundeak',
    corrects: ['espainiar', 'Bizkaiko', 'sufragio unibertsal, berdin, zuzen eta sekretu', 'Gobernuak', 'hizkuntza ofiziala'],
    priority: 9
  },
  {
    id: 'sele-akats-16-a',
    textId: 'text-16',
    title: 'Kontzertu ekonomikoak: probintziak',
    corrects: ['Gipuzkoan eta Bizkaian', 'Arabako', 'Gipuzkoa eta Bizkaia', 'uztailaren', 'Francisco Franco'],
    priority: 10
  },
  {
    id: 'sele-akats-16-b',
    textId: 'text-16',
    title: 'Kontzertu ekonomikoak: frankismoa',
    corrects: ['txikiagoagatik', 'Mugimendu Nazionalaren', 'autonomia', 'Nafarroa', 'Franco'],
    priority: 9
  },
  {
    id: 'sele-akats-17-a',
    textId: 'text-17',
    title: 'Erantzukizun Politikoa: errepresioa',
    corrects: ['Mugimendu Nazionalaren', 'Falange Española Tradicionalista y de las JONSen', 'Fronte Popularra', 'erakunde separatistak', 'Gobernuak'],
    priority: 10
  },
  {
    id: 'sele-akats-17-b',
    textId: 'text-17',
    title: 'Erantzukizun Politikoa: botere frankista',
    corrects: ['uztailaren', 'Gobernuak', 'Mugimendu Nazionalaren', 'Fronte Popularra', 'Falange Española Tradicionalista y de las JONSen'],
    priority: 9
  },
  {
    id: 'sele-akats-18-a',
    textId: 'text-18',
    title: 'Autarkia: industria-politika',
    corrects: ['Espainia', 'inportaziotik', 'nazio-intereseko', 'ekimen partikularra', 'Estatuak'],
    priority: 9
  },
  {
    id: 'sele-akats-19-a',
    textId: 'text-19',
    title: 'Munich: demokrazia eta eskubideak',
    corrects: ['Espainia', 'demokratikoak', 'Gizakiaren Eskubideei', 'adierazpen-askatasunari', 'alderdi politikoak'],
    priority: 10
  },
  {
    id: 'sele-akats-19-b',
    textId: 'text-19',
    title: 'Munich: pluralismoa',
    corrects: ['espainiar', 'Espainiaren', 'greba', 'bortxakeria aktibo nahiz pasiboari', 'Errepublika'],
    priority: 9
  },
  {
    id: 'sele-akats-20-a',
    textId: 'text-20',
    title: 'Lege Organikoa: printzipio frankistak',
    corrects: ['Espainiar estatua', 'subiranotasuna', 'botere-batasunaren', 'Mugimendu Nazionalaren', 'Estatuburua'],
    priority: 10
  },
  {
    id: 'sele-akats-20-b',
    textId: 'text-20',
    title: 'Lege Organikoa: karguak',
    corrects: ['Espainiako', 'Espainiar', 'Gobernuburuak', 'Estatuburua', 'botere-batasunaren'],
    priority: 9
  },
  {
    id: 'sele-akats-21-a',
    textId: 'text-21',
    title: 'Baionako Hitzarmena: erbestea',
    corrects: ['Euzkadiko Gobernua', 'Jose Antonio Agirre', 'Francoren gobernuaren', 'diktadura', 'demokratikoa'],
    priority: 10
  },
  {
    id: 'sele-akats-21-b',
    textId: 'text-21',
    title: 'Baionako Hitzarmena: erregimen politikoa',
    corrects: ['monarkia', 'Errepublikako', 'Gorteek', 'Gobernuak', 'monarkia berrezartzearen'],
    priority: 9
  },
  {
    id: 'sele-akats-22-a',
    textId: 'text-22',
    title: 'Añoveros: euskal gatazka',
    corrects: ['Bizkaiko', 'euskal gatazka', 'zapalduta', 'Euskararen erabilera', 'irakaskuntzan eta komunikabideetan'],
    priority: 10
  },
  {
    id: 'sele-akats-22-b',
    textId: 'text-22',
    title: 'Añoveros: askatasuna eta Eliza',
    corrects: ['askatasuna', 'Espainiako', 'Elizak', 'Euskararen erabilera', 'euskal gatazka'],
    priority: 9
  },
  {
    id: 'sele-akats-23-a',
    textId: 'text-23',
    title: '1978ko Konstituzioa: forma politikoa',
    corrects: ['zuzenbide-estatu sozial eta demokratiko', 'monarkia parlamentarioa', 'pluralismo politikoa', 'Espainiako herriari', 'nazionalitate eta eskualdeen'],
    priority: 10
  },
  {
    id: 'sele-akats-23-b',
    textId: 'text-23',
    title: '1978ko Konstituzioa: foruak eta autonomia',
    corrects: ['askatasuna', 'autonomia', 'eskubide historikoak', 'foru-lurraldeen', 'Bizkaiko'],
    priority: 10
  },
  {
    id: 'sele-akats-24-a',
    textId: 'text-24',
    title: 'Gernikako Estatutua: lurraldea',
    corrects: ['Euskadi edo Euskal Herria', 'Nafarroak ere', 'Gipuzkoa eta Bizkaia', 'Lurralde Historikoek', 'Autonomia'],
    priority: 10
  },
  {
    id: 'sele-akats-24-b',
    textId: 'text-24',
    title: 'Gernikako Estatutua: hizkuntza eta polizia',
    corrects: ['Euskara', 'hizkuntza ofiziala', 'Polizia autonomoaren', 'Estatuko Segurtasun Indar eta Gorputzak', 'autonomia'],
    priority: 10
  }
] satisfies Array<{ id: string; textId: string; title: string; corrects: string[]; priority: number }>;

export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('eu');
}

function isDue(item?: ProgressItem): boolean {
  if (!item) return true;
  return new Date(item.dueAt).getTime() <= Date.now();
}

function progressWeight(itemId: string, progress: Record<string, ProgressItem>): number {
  const item = progress[itemId];
  if (!item) return 3.5;
  const dueAt = new Date(item.dueAt).getTime();
  const hoursUntilDue = (dueAt - Date.now()) / (60 * 60 * 1000);
  const dueBoost = hoursUntilDue <= 0 ? 2.4 : hoursUntilDue <= 12 ? 1.1 : 0.35;
  const weaknessBoost = 1 + (1 - item.mastery) * 4.5;
  const lapseBoost = item.streak === 0 && item.mastery < 0.55 ? 1.35 : 1;
  return dueBoost * weaknessBoost * lapseBoost * item.ease;
}

export function findWholePhrase(text: string, phrase: string): { start: number; end: number } | null {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'u').exec(text);
  if (!match || match.index === undefined) return null;
  return { start: match.index, end: match.index + phrase.length };
}

function weightedPick<T extends { id: string; priority: number }>(
  items: T[],
  progress: Record<string, ProgressItem>,
  usedIds: Set<string>
): T | null {
  const pool = items.filter((item) => !usedIds.has(item.id));
  if (!pool.length) return null;
  const weights = pool.map((item) => Math.max(0.1, item.priority * progressWeight(item.id, progress)));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = Math.random() * total;
  for (let i = 0; i < pool.length; i += 1) {
    cursor -= weights[i];
    if (cursor <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

export function getTrapCandidates(text: TextSource): TrapCandidate[] {
  return trapRules
    .filter((rule) => isOfficialA1Candidate(rule.correct) && Boolean(findWholePhrase(text.body, rule.correct)))
    .map((rule) => ({
      id: `${text.id}:${rule.id}`,
      textId: text.id,
      ruleId: rule.id,
      correct: rule.correct,
      wrong: rule.wrongOptions[Math.floor(Math.random() * rule.wrongOptions.length)],
      priority: rule.priority,
      reason: rule.reason,
      category: categorizeTrap(rule.correct, rule.reason)
    }));
}

export function isOfficialA1Candidate(value: string): boolean {
  const hasFigure = /\d/.test(value);
  const hasRoyalOrdinal = /\b(?:I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX)\.?(?:a|aren)?\b/u.test(
    value
  );
  return !hasFigure && !hasRoyalOrdinal;
}

function positionCandidate(text: TextSource, candidate: TrapCandidate, occupied: MutatedTrap[]): MutatedTrap | null {
  const match = findWholePhrase(text.body, candidate.correct);
  if (!match) return null;
  const { start, end } = match;
  const overlaps = occupied.some((trap) => start < trap.end && end > trap.start);
  if (overlaps) return null;
  return { ...candidate, start, end };
}

export function eligibleTexts(): TextSource[] {
  return examTexts().filter((text) => countPositionableCandidates(text) >= 5);
}

export function examTexts(): TextSource[] {
  return texts.filter((text) => text.number >= EXAM_TEXT_MIN_NUMBER);
}

export function createAkatsExercise(progress: Record<string, ProgressItem> = {}): AkatsExercise {
  const pool = eligibleTexts();
  const text = pickTextForAkats(pool, progress) ?? texts[0];
  const candidates = getTrapCandidates(text).sort((a, b) => b.priority - a.priority);
  return buildAkatsExercise(text, candidates, progress, `akats-${Date.now()}`);
}

export function createSeleAkatsExercise(progress: Record<string, ProgressItem> = {}): AkatsExercise {
  const pool = seleAkatsSets
    .map((set) => {
      const text = texts.find((item) => item.id === set.textId);
      if (!text) return null;
      const candidates = set.corrects
        .map((correct) => getTrapCandidates(text).find((candidate) => candidate.correct === correct))
        .filter((candidate): candidate is TrapCandidate => Boolean(candidate));
      return candidates.length === 5 && countPositionableFromCandidates(text, candidates) >= 5
        ? { ...set, text, candidates }
        : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const picked = weightedPick(pool, progress, new Set()) ?? pool[0];
  return buildAkatsExercise(picked.text, picked.candidates, progress, picked.id);
}

function buildAkatsExercise(
  text: TextSource,
  candidates: TrapCandidate[],
  progress: Record<string, ProgressItem>,
  id: string
): AkatsExercise {
  const sortedCandidates = candidates.sort((a, b) => b.priority - a.priority);
  const usedIds = new Set<string>();
  const traps: MutatedTrap[] = [];

  while (traps.length < 5) {
    const picked = weightedPick(sortedCandidates, progress, usedIds);
    if (!picked) break;
    usedIds.add(picked.id);
    const positioned = positionCandidate(text, picked, traps);
    if (positioned) traps.push(positioned);
  }

  for (const candidate of sortedCandidates) {
    if (traps.length >= 5) break;
    if (usedIds.has(candidate.id)) continue;
    const positioned = positionCandidate(text, candidate, traps);
    if (positioned) {
      usedIds.add(candidate.id);
      traps.push(positioned);
    }
  }

  const forward = [...traps].sort((a, b) => a.start - b.start);
  let cursor = 0;
  let mutatedBody = '';
  const shifted: MutatedTrap[] = [];
  for (const trap of forward) {
    mutatedBody += text.body.slice(cursor, trap.start);
    const start = mutatedBody.length;
    mutatedBody += trap.wrong;
    shifted.push({ ...trap, start, end: start + trap.wrong.length });
    cursor = trap.end;
  }
  mutatedBody += text.body.slice(cursor);

  return {
    id,
    text,
    mutatedBody,
    traps: shifted
  };
}

export function scoreAkatsExercise(
  exercise: AkatsExercise,
  selectedTrapIds: Set<string>,
  answers: AkatsAnswer[]
): AkatsResult {
  const answerMap = new Map(answers.map((answer) => [answer.trapId, answer.correction]));
  const details = exercise.traps.map((trap) => {
    const answer = answerMap.get(trap.id) ?? '';
    const identified = selectedTrapIds.has(trap.id);
    const corrected = identified && normalizeAnswer(answer) === normalizeAnswer(trap.correct);
    return { trap, identified, corrected, answer };
  });
  const identificationScore = details.filter((detail) => detail.identified).length * 0.2;
  const correctionScore = details.filter((detail) => detail.corrected).length * 0.2;
  return {
    identificationScore: roundScore(identificationScore),
    correctionScore: roundScore(correctionScore),
    total: roundScore(identificationScore + correctionScore),
    details
  };
}

export function getEventById(id: string): HistoryEvent {
  const event = events.find((item) => item.id === id);
  if (!event) throw new Error(`Unknown event ${id}`);
  return event;
}

export function examOrderingEvents(): HistoryEvent[] {
  return events.filter((event) => event.sortKey <= '1982-99-99');
}

export function examOrderingSets() {
  const validEventIds = new Set(examOrderingEvents().map((event) => event.id));
  return orderingSets.filter((set) => set.eventIds.every((id) => validEventIds.has(id)));
}

export function createOrderingExercise(progress: Record<string, ProgressItem> = {}): OrderingExercise {
  const used = new Set<string>();
  const sets = examOrderingSets();
  const set = weightedPick(sets, progress, used) ?? sets[0];
  return buildOrderingExercise(set);
}

export function createSeleOrderingExercise(progress: Record<string, ProgressItem> = {}): OrderingExercise {
  const set = weightedPick(seleOrderingSets, progress, new Set()) ?? seleOrderingSets[0];
  return buildOrderingExercise(set);
}

function buildOrderingExercise(set: (typeof orderingSets)[number]): OrderingExercise {
  const chronological = set.eventIds.map(getEventById).sort(compareEvents);
  return {
    id: set.id,
    title: set.title,
    events: shuffle(chronological)
  };
}

export function compareEvents(a: HistoryEvent, b: HistoryEvent): number {
  return a.sortKey.localeCompare(b.sortKey);
}

export function textMastery(text: TextSource, progress: Record<string, ProgressItem>): number {
  const candidates = getTrapCandidates(text);
  if (!candidates.length) return 0;
  const total = candidates.reduce((sum, candidate) => sum + (progress[candidate.id]?.mastery ?? 0), 0);
  return total / candidates.length;
}

export function weakTrapCandidates(progress: Record<string, ProgressItem>, limit = 6): TrapCandidate[] {
  return examTexts()
    .flatMap((text) => getTrapCandidates(text))
    .sort((a, b) => {
      const aProgress = progress[a.id]?.mastery ?? 0;
      const bProgress = progress[b.id]?.mastery ?? 0;
      return aProgress - bProgress || b.priority - a.priority;
    })
    .slice(0, limit);
}

export function categoryLabel(category: TrapCategory): string {
  const labels: Record<TrapCategory, string> = {
    kontzeptua: 'Kontzeptuak',
    lurraldea: 'Lurraldeak',
    pertsona: 'Pertsonak',
    data: 'Datak',
    erakundea: 'Erakundeak',
    eskubidea: 'Eskubideak',
    ekonomia: 'Ekonomia'
  };
  return labels[category];
}

export function scoreOrdering(submittedIds: string[]): number {
  const correctIds = submittedIds.map(getEventById).sort(compareEvents).map((event) => event.id);
  const index = new Map(correctIds.map((id, i) => [id, i]));
  let best = submittedIds.length ? 1 : 0;
  let current = submittedIds.length ? 1 : 0;
  for (let i = 1; i < submittedIds.length; i += 1) {
    const prev = index.get(submittedIds[i - 1]) ?? -99;
    const next = index.get(submittedIds[i]) ?? -99;
    if (next === prev + 1) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }
  if (best >= 5) return 1;
  if (best === 4) return OFFICIAL_ORDERING_SCORE_BY_RUN[4];
  if (best === 3) return OFFICIAL_ORDERING_SCORE_BY_RUN[3];
  if (best === 2) return OFFICIAL_ORDERING_SCORE_BY_RUN[2];
  return 0;
}

export function updateProgressItem(
  item: ProgressItem | undefined,
  itemId: string,
  itemType: ProgressItem['itemType'],
  quality: number
): ProgressItem {
  const normalizedQuality = clamp(quality, 0, 1);
  const current = item ?? {
    itemId,
    itemType,
    mastery: 0,
    streak: 0,
    ease: 1.4,
    dueAt: new Date().toISOString()
  };
  const success = normalizedQuality >= 0.78;
  const partial = normalizedQuality >= 0.45 && normalizedQuality < 0.78;
  const streak = success ? current.streak + 1 : partial ? Math.max(0, current.streak - 1) : 0;
  const masteryDelta = success
    ? 0.12 + normalizedQuality * 0.08
    : partial
      ? 0.02 + (normalizedQuality - 0.45) * 0.08
      : -0.2 - (0.35 - normalizedQuality) * 0.12;
  const mastery = clamp(current.mastery + masteryDelta, 0, 1);
  const ease = clamp(current.ease + (success ? 0.08 : partial ? -0.04 : -0.2), 0.75, 2.7);
  const intervalDays = success
    ? Math.max(1, Math.round((streak + 1) * ease * (1 + mastery * 2.4)))
    : partial
      ? 0.55
      : normalizedQuality > 0
        ? 0.18
        : 0.04;
  return {
    ...current,
    mastery,
    streak,
    ease,
    dueAt: new Date(Date.now() + intervalDays * DAY).toISOString()
  };
}

export function updateManyProgress(
  progress: Record<string, ProgressItem>,
  updates: Array<{ itemId: string; itemType: ProgressItem['itemType']; quality: number }>
): Record<string, ProgressItem> {
  return updates.reduce(
    (next, update) => ({
      ...next,
      [update.itemId]: updateProgressItem(next[update.itemId], update.itemId, update.itemType, update.quality)
    }),
    { ...progress }
  );
}

function roundScore(value: number): number {
  return Math.round(value * 10) / 10;
}

function countPositionableCandidates(text: TextSource): number {
  return countPositionableFromCandidates(text, getTrapCandidates(text).sort((a, b) => b.priority - a.priority));
}

function countPositionableFromCandidates(text: TextSource, candidates: TrapCandidate[]): number {
  const occupied: MutatedTrap[] = [];
  for (const candidate of candidates.sort((a, b) => b.priority - a.priority)) {
    const positioned = positionCandidate(text, candidate, occupied);
    if (positioned) occupied.push(positioned);
  }
  return occupied.length;
}

function pickTextForAkats(pool: TextSource[], progress: Record<string, ProgressItem>): TextSource | null {
  if (!pool.length) return null;
  const weighted = pool.map((text) => {
    const candidates = getTrapCandidates(text);
    const priority = candidates.reduce((sum, candidate) => {
      const item = progress[candidate.id];
      const weakness = item ? 1 - item.mastery : 1.25;
      const due = !item || isDue(item) ? 1.4 : 0.7;
      return sum + candidate.priority * weakness * due;
    }, 0);
    return { ...text, priority: Math.max(1, priority / Math.max(1, candidates.length)) };
  });
  return weightedPick(weighted, {}, new Set());
}

function categorizeTrap(correct: string, reason: string): TrapCategory {
  const haystack = `${correct} ${reason}`.toLocaleLowerCase('eu');
  if (/urte|urtarril|otsail|martxo|apiril|maiatz|ekain|uztail|abuztu|irail|urri|azaro|abendu|193|197|196|194|195/.test(haystack)) {
    return 'data';
  }
  if (/espain|frantzi|itali|gipuz|bizkai|arab|nafar|euskad|euskal herri|lurralde|probintz/.test(haystack)) {
    return 'lurraldea';
  }
  if (/franco|azaña|agirre|suarez|carrero|añoveros|pertsona|lehendakari/.test(haystack)) {
    return 'pertsona';
  }
  if (/gorte|gobernu|senatu|kongresu|estatu|eliz|falange|polizia|erakunde|mugimendu/.test(haystack)) {
    return 'erakundea';
  }
  if (/sufragio|eskubide|askatasun|adierazpen|greba|demokratiko|pluralismo/.test(haystack)) {
    return 'eskubidea';
  }
  if (/banku|industria|lurra|nazionaliz|kontzertu|zerga|ekonomia|langile-kontrol|ekimen/.test(haystack)) {
    return 'ekonomia';
  }
  return 'kontzeptua';
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
