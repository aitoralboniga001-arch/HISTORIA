'use client';

import type { ChangeEvent, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  ArrowDownUp,
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Check,
  Download,
  Eye,
  EyeOff,
  Flame,
  GripVertical,
  History,
  ListChecks,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Target,
  Trophy,
  Upload,
  User
} from 'lucide-react';
import { events, texts } from '@/lib/content';
import {
  compareEvents,
  createAkatsExercise,
  createAkatsExerciseForText,
  createOrderingExercise,
  createSeleAkatsExercise,
  createSeleOrderingExercise,
  createThemedOrderingExercise,
  categoryLabel,
  examTexts,
  examOrderingEvents,
  getTrapCandidates,
  orderingThemes,
  seleOrderingSets,
  scoreAkatsExercise,
  scoreOrdering,
  textMastery,
  updateManyProgress,
  weakTrapCandidates
} from '@/lib/exercises';
import {
  clearLastUsername,
  createProfile,
  createProgressBackup,
  getProfile,
  getLastUsername,
  getOrCreateProfile,
  importProgressBackup,
  isSupabaseConfigured,
  loadProgress,
  loadAttempts,
  requestPersistentStorage,
  saveAttempt,
  saveProgress
} from '@/lib/progress';
import type { AkatsExercise, AkatsResult, HistoryEvent, OrderingExercise, ProgressItem, TextSource, TrapCandidate } from '@/lib/types';
import type { LocalAttempt, Profile } from '@/lib/progress';

type Section = 'home' | 'testuak' | 'akatsak' | 'gertakariak' | 'ordenatu' | 'sele' | 'emaitzak';
type ProfileOpenMode = 'auto' | 'login' | 'create';
type OrderingPracticeMode = 'sele' | 'theme';
type Selection = { id: string; label: string; trapId?: string };
type StudyMark = TrapCandidate & { start: number; end: number; progressId: string; occurrence: number };
type TutorState = { title: string; text: string } | null;

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<Record<string, ProgressItem>>({});
  const [section, setSection] = useState<Section>('home');
  const [selectedTextId, setSelectedTextId] = useState(examTexts()[0]?.id ?? texts[0]?.id ?? '');
  const [practiceTextId, setPracticeTextId] = useState('auto');
  const [akats, setAkats] = useState<AkatsExercise | null>(null);
  const [selectedPieces, setSelectedPieces] = useState<Selection[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [akatsResult, setAkatsResult] = useState<AkatsResult | null>(null);
  const [ordering, setOrdering] = useState<OrderingExercise | null>(null);
  const [orderingResult, setOrderingResult] = useState<number | null>(null);
  const [orderingPracticeMode, setOrderingPracticeMode] = useState<OrderingPracticeMode>('sele');
  const [orderingTheme, setOrderingTheme] = useState('II. Errepublika');
  const [seleDone, setSeleDone] = useState(false);
  const [booting, setBooting] = useState(true);
  const [username, setUsername] = useState('');
  const [loginBusy, setLoginBusy] = useState(false);
  const [storagePersisted, setStoragePersisted] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [tutor, setTutor] = useState<TutorState>(null);
  const [tutorBusy, setTutorBusy] = useState(false);
  const [now, setNow] = useState(0);
  const backupInputRef = useRef<HTMLInputElement>(null);
  const recentSeleAkatsIdsRef = useRef<string[]>([]);
  const recentSeleOrderingIdsRef = useRef<string[]>([]);

  const examTextSources = useMemo(() => examTexts(), []);
  const examEventSources = useMemo(() => examOrderingEvents(), []);
  const orderingThemeOptions = useMemo(() => orderingThemes(), []);
  const selectedText = texts.find((text) => text.id === selectedTextId) ?? examTextSources[0] ?? texts[0];
  const examCandidates = useMemo(() => examTextSources.flatMap((text) => getTrapCandidates(text)), [examTextSources]);
  const weakTraps = useMemo(() => weakTrapCandidates(progress, 6), [progress]);
  const due = Object.values(progress).filter((item) => new Date(item.dueAt).getTime() <= now).length;
  const masteredExam = examCandidates.filter((candidate) => (progress[candidate.id]?.mastery ?? 0) >= 0.82).length;
  const examMastery = examCandidates.length ? Math.round((masteredExam / examCandidates.length) * 100) : 0;
  const xp = Math.round(Object.values(progress).reduce((sum, item) => sum + item.mastery * 80 + item.streak * 8, 0));
  const level = Math.max(1, Math.floor(xp / 220) + 1);

  useEffect(() => {
    let active = true;

    // Register Service Worker for PWA installation and offline support
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('Service Worker registered with scope:', reg.scope))
        .catch((err) => console.error('Service Worker registration failed:', err));
    }

    async function boot() {
      try {
        const persisted = await requestPersistentStorage();
        if (!active) return;
        setStoragePersisted(persisted);
        const rememberedUsername = getLastUsername();
        setUsername(rememberedUsername);
        setNow(Date.now());
        if (rememberedUsername) {
          await openProfile(rememberedUsername, { quiet: true, mode: 'auto' });
        }
      } catch (error) {
        if (active) setMessage(readErrorMessage(error, 'Ezin izan da hasieratu.'));
      } finally {
        if (active) setBooting(false);
      }
    }

    void boot();
    return () => {
      active = false;
    };
  }, []);

  async function openProfile(nextUsername: string, options?: { quiet?: boolean; mode?: ProfileOpenMode }) {
    if (!nextUsername.trim()) {
      setMessage('Idatzi erabiltzaile-izena.');
      return;
    }
    setLoginBusy(true);
    if (!options?.quiet) setMessage('');
    try {
      const mode = options?.mode ?? 'auto';
      const nextProfile =
        mode === 'login'
          ? await getProfile(nextUsername)
          : mode === 'create'
            ? await createProfile(nextUsername)
            : await getOrCreateProfile(nextUsername);
      const loaded = await loadProgress(nextProfile);
      setProfile(nextProfile);
      setProgress(loaded);
      setNow(Date.now());
      const nextSele = createNextSele(loaded, false);
      setAkats(nextSele.akats);
      setOrdering(nextSele.ordering);
      setSelectedPieces([]);
      setAnswers({});
      setAkatsResult(null);
      setOrderingResult(null);
      setSeleDone(false);
      setSection('sele');
      if (!options?.quiet) {
        setMessage(
          nextProfile.isLocal
            ? 'Supabase ez dago konfiguratuta: aurrerapena gailu honetan gordeko da.'
            : mode === 'create'
              ? 'Erabiltzailea sortu da eta saioa gailu honetan gordeta geratu da.'
              : 'Saioa hasita: aurrerapena Supabase-rekin sinkronizatuta dago.'
        );
      }
    } catch (error) {
      setMessage(readErrorMessage(error, 'Ezin izan da erabiltzailea ireki.'));
    } finally {
      setLoginBusy(false);
    }
  }

  async function enter() {
    await openProfile(username, { mode: 'login' });
  }

  async function createUser() {
    await openProfile(username, { mode: 'create' });
  }

  function leaveProfile() {
    clearLastUsername();
    setProfile(null);
    setUsername('');
    setProgress({});
    setAkats(null);
    setOrdering(null);
    setSelectedPieces([]);
    setAnswers({});
    setAkatsResult(null);
    setOrderingResult(null);
    setSeleDone(false);
    setMessage('');
  }

  async function persist(nextProgress: Record<string, ProgressItem>) {
    setProgress(nextProgress);
    setNow(Date.now());
    if (!profile) return;
    try {
      await saveProgress(profile, nextProgress);
    } catch (error) {
      setMessage(readErrorMessage(error, 'Aurrerapena ezin izan da gorde.'));
    }
  }

  function togglePiece(piece: Selection) {
    setSelectedPieces((prev) => {
      const exists = prev.some((item) => item.id === piece.id);
      if (exists) {
        setAnswers((prevAnswers) => {
          const copy = { ...prevAnswers };
          delete copy[piece.trapId ?? piece.id];
          return copy;
        });
        return prev.filter((item) => item.id !== piece.id);
      } else {
        return prev.length < 5 ? [...prev, piece] : prev;
      }
    });
  }

  function newAkats(textId = practiceTextId) {
    const nextAkats = textId === 'auto' ? createAkatsExercise(progress) : createAkatsExerciseForText(textId, progress);
    setAkats(nextAkats);
    setPracticeTextId(textId);
    setSelectedPieces([]);
    setAnswers({});
    setAkatsResult(null);
    setSeleDone(false);
    setSection('akatsak');
  }

  async function finishAkats() {
    if (!akats || !profile) return;
    const result = scoreAkatsExercise(
      akats,
      new Set(selectedPieces.map((piece) => piece.trapId).filter((id): id is string => Boolean(id))),
      Object.entries(answers).map(([trapId, correction]) => ({ trapId, correction }))
    );
    setAkatsResult(result);
    const nextProgress = updateManyProgress(
      progress,
      result.details.map((detail) => ({
        itemId: detail.trap.id,
        itemType: 'trap',
        quality: detail.corrected ? 1 : detail.identified ? 0.55 : 0
      }))
    );
    await persist(nextProgress);
    await saveAttempt({ profile, type: 'akatsak', score: result.total, maxScore: 2, detail: result });
  }

  function newOrdering(mode: OrderingPracticeMode = orderingPracticeMode, theme = orderingTheme) {
    const next = mode === 'theme' ? createThemedOrderingExercise(progress, theme) : createOrderingExercise(progress);
    setOrderingPracticeMode(mode);
    setOrderingTheme(theme);
    setOrdering(next);
    setOrderingResult(null);
    setSeleDone(false);
    setSection('ordenatu');
  }

  function createNextSele(nextProgress: Record<string, ProgressItem>, avoidRecent: boolean) {
    const excludeAkats = avoidRecent ? [...recentSeleAkatsIdsRef.current, akats?.id].filter((id): id is string => Boolean(id)) : [];
    const excludeOrdering = avoidRecent ? [...recentSeleOrderingIdsRef.current, ordering?.id].filter((id): id is string => Boolean(id)) : [];
    const nextAkats = createSeleAkatsExercise(nextProgress, { excludeIds: excludeAkats });
    const nextOrdering = createSeleOrderingExercise(nextProgress, { excludeIds: excludeOrdering });
    rememberRecentSele(nextAkats.id, nextOrdering.id);
    return { akats: nextAkats, ordering: nextOrdering };
  }

  function rememberRecentSele(akatsId: string, orderingId: string) {
    recentSeleAkatsIdsRef.current = [akatsId, ...recentSeleAkatsIdsRef.current.filter((id) => id !== akatsId)].slice(0, 6);
    recentSeleOrderingIdsRef.current = [orderingId, ...recentSeleOrderingIdsRef.current.filter((id) => id !== orderingId)].slice(0, 8);
  }

  function newSele() {
    const nextSele = createNextSele(progress, true);
    setAkats(nextSele.akats);
    setOrdering(nextSele.ordering);
    setSelectedPieces([]);
    setAnswers({});
    setAkatsResult(null);
    setOrderingResult(null);
    setSeleDone(false);
    setSection('sele');
  }

  async function finishOrdering() {
    if (!ordering || !profile) return;
    const score = scoreOrdering(ordering.events.map((event) => event.id));
    setOrderingResult(score);
    const nextProgress = updateManyProgress(progress, [
      { itemId: ordering.id, itemType: 'ordering-set', quality: score },
      ...orderingProgressUpdates(ordering.events)
    ]);
    await persist(nextProgress);
    await saveAttempt({
      profile,
      type: 'ordenatu',
      score,
      maxScore: 1,
      detail: { eventIds: ordering.events.map((event) => event.id), score }
    });
  }

  async function finishSele() {
    if (!akats || !ordering || !profile || selectedPieces.length !== 5) return;
    const akatsScore = scoreAkatsExercise(
      akats,
      new Set(selectedPieces.map((piece) => piece.trapId).filter((id): id is string => Boolean(id))),
      Object.entries(answers).map(([trapId, correction]) => ({ trapId, correction }))
    );
    const orderScore = scoreOrdering(ordering.events.map((event) => event.id));
    setAkatsResult(akatsScore);
    setOrderingResult(orderScore);
    setSeleDone(true);
    const nextProgress = updateManyProgress(progress, [
      ...akatsScore.details.map((detail) => ({
        itemId: detail.trap.id,
        itemType: 'trap' as const,
        quality: detail.corrected ? 1 : detail.identified ? 0.55 : 0
      })),
      { itemId: akats.id, itemType: 'akats-set' as const, quality: akatsScore.total / 2 },
      { itemId: ordering.id, itemType: 'ordering-set' as const, quality: orderScore },
      ...orderingProgressUpdates(ordering.events)
    ]);
    await persist(nextProgress);
    await saveAttempt({ profile, type: 'akatsak', score: akatsScore.total, maxScore: 2, detail: { mode: 'sele', result: akatsScore } });
    await saveAttempt({ profile, type: 'ordenatu', score: orderScore, maxScore: 1, detail: { mode: 'sele', eventIds: ordering.events.map((event) => event.id), score: orderScore } });
  }

  async function askTutor(title: string, kind: 'akatsak' | 'ordenatu' | 'summary', payload: unknown) {
    setTutorBusy(true);
    setTutor({ title, text: 'Gemma 4 pentsatzen ari da...' });
    try {
      const endpoint = process.env.NEXT_PUBLIC_TUTOR_API_URL ?? '/api/tutor';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, payload })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? 'Tutorea ezin izan da kargatu.');
      setTutor({ title, text: data.text ?? 'Ez dago azalpenik.' });
    } catch (error) {
      setTutor({
        title,
        text: readErrorMessage(error, 'Tutorea ezin izan da kargatu. Begiratu GEMINI_API_KEY.')
      });
    } finally {
      setTutorBusy(false);
    }
  }

  function moveEvent(from: number, to: number) {
    if (!ordering || from === to) return;
    const copy = [...ordering.events];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    setOrdering({ ...ordering, events: copy });
  }

  function orderingProgressUpdates(eventsToScore: HistoryEvent[]) {
    const correctIds = [...eventsToScore].sort(compareEvents).map((event) => event.id);
    const correctIndex = new Map(correctIds.map((id, index) => [id, index]));
    return eventsToScore.map((event, submittedIndex) => {
      const expectedIndex = correctIndex.get(event.id) ?? submittedIndex;
      const distance = Math.abs(expectedIndex - submittedIndex);
      return {
        itemId: event.id,
        itemType: 'event' as const,
        quality: distance === 0 ? 1 : distance === 1 ? 0.55 : 0.1
      };
    });
  }

  function exportBackup() {
    if (!profile || typeof window === 'undefined') return;
    const backup = createProgressBackup(profile, progress);
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `historia-usap-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage('Babeskopia deskargatu da. Gorde fitxategia badaezpada.');
  }

  async function importBackup(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const raw = await file.text();
      const nextProgress = importProgressBackup(raw, progress);
      await persist(nextProgress);
      const nextSele = createNextSele(nextProgress, true);
      setAkats(nextSele.akats);
      setOrdering(nextSele.ordering);
      setSelectedPieces([]);
      setAnswers({});
      setAkatsResult(null);
      setOrderingResult(null);
      setSeleDone(false);
      setMessage('Babeskopia kargatu da eta aurrerapena batu da.');
    } catch (error) {
      setMessage(readErrorMessage(error, 'Babeskopia ezin izan da kargatu.'));
    } finally {
      event.target.value = '';
    }
  }

  if (booting || !profile) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-5 py-10">
        <section className="grid w-full min-w-0 gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="min-w-0">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-600/25 bg-emerald-50/70 px-4 py-1.5 text-sm font-black text-emerald-800 shadow-sm">
              <ShieldCheck size={16} /> Supabase sync
            </p>
            <h1 className="max-w-full break-words text-balance text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-7xl font-serif">
              Zure aurrerapena izenarekin gordeta.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              Idatzi erabiltzaile-izena bakarrik. Lehen aldian sortu erabiltzailea; hurrengoetan
              sartu egingo zara, eta gailu honek saioa gogoratuko du.
            </p>
          </div>
          <div className="glass-panel min-w-0 rounded-3xl p-5 sm:p-8">
            <label className="text-sm font-bold tracking-wide uppercase text-slate-500" htmlFor="username">
              Erabiltzaile-izena
            </label>
            <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
              <input
                id="username"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white/80 px-4 py-3 font-bold outline-none ring-emerald-700/20 focus:ring-4"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') void enter();
                }}
                placeholder="adib. aitor"
                disabled={booting || loginBusy}
              />
              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3 font-black text-white transition hover:bg-emerald-800 disabled:opacity-60"
                onClick={() => void enter()}
                disabled={booting || loginBusy}
              >
                <User size={18} /> Sartu
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-900/20 bg-white/80 px-5 py-3 font-black text-emerald-950 transition hover:bg-emerald-50 disabled:opacity-60"
                onClick={() => void createUser()}
                disabled={booting || loginBusy}
              >
                <Check size={18} /> Sortu
              </button>
            </div>
            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm leading-relaxed text-emerald-950">
              <p className="font-black">Nola funtzionatzen du?</p>
              <p className="mt-1">
                Lehen aldia bada, sakatu Sortu. Erabiltzailea badago, sakatu Sartu. Ondoren,
                nabigatzaileak izena gordeko du eta hurrengo bisitan automatikoki irekiko da.
              </p>
            </div>
            {!isSupabaseConfigured() && (
              <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
                Supabase env aldagaiak falta dira: oraingoz tokiko moduan gordeko da.
              </p>
            )}
            {message && <p className="mt-3 rounded-xl bg-white/70 px-4 py-3 text-sm font-bold text-slate-700">{message}</p>}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 pt-6 pb-32 md:px-8 md:pt-8 md:pb-8 xl:pb-8">
      <header className="glass-panel grid gap-6 rounded-3xl p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700/80">Historia USaP Trainer</p>
          <h1 className="text-3xl font-black text-slate-950 mt-1 font-serif">Kaixo, {profile.username}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-600">
            <ShieldCheck size={16} className="text-emerald-700" />
            {!profile.isLocal
              ? 'Supabase sinkronizazioa aktibo'
              : storagePersisted === true
              ? 'Biltegiratze iraunkorra aktibo'
              : storagePersisted === false
                ? 'Tokiko biltegiratzea aktibo: egin babeskopia noizean behin'
                : 'Tokiko biltegiratzea aktibo'}
          </p>
        </div>
        <div className="grid gap-3">
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <Stat label="Maila" value={level} />
            <Stat label="Domeinua" value={examMastery} suffix="%" />
            <Stat label="Errepasatzeko" value={due} />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition-all hover:bg-white"
              onClick={() => backupInputRef.current?.click()}
            >
              <Upload size={16} />
              Inportatu
            </button>
            <button
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-emerald-900 px-4 py-2 text-sm font-black text-white shadow-sm transition-all hover:bg-emerald-800"
              onClick={exportBackup}
            >
              <Download size={16} />
              Babeskopia
            </button>
            <input
              ref={backupInputRef}
              className="hidden"
              type="file"
              accept="application/json"
              onChange={(event) => void importBackup(event)}
            />
            <button
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition-all hover:bg-white"
              onClick={leaveProfile}
            >
              Aldatu izena
            </button>
          </div>
        </div>
      </header>

      {message && (
        <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">{message}</div>
      )}

      <nav className="sticky top-4 z-40 glass-panel no-scrollbar flex gap-2 overflow-x-auto rounded-full p-2.5 shadow-xl shadow-emerald-900/5 md:grid md:grid-cols-7 md:overflow-visible border border-white/60 mx-auto w-full">
        <NavButton active={section === 'home'} icon={<Play size={18} />} onClick={() => setSection('home')}>
          Hasiera
        </NavButton>
        <NavButton active={section === 'sele'} icon={<Target size={18} />} onClick={newSele}>
          Sele modua
        </NavButton>
        <NavButton active={section === 'testuak'} icon={<BookOpen size={18} />} onClick={() => setSection('testuak')}>
          Testuak ikasi
        </NavButton>
        <NavButton active={section === 'akatsak'} icon={<ListChecks size={18} />} onClick={() => newAkats()}>
          Akatsak praktikatu
        </NavButton>
        <NavButton active={section === 'gertakariak'} icon={<History size={18} />} onClick={() => setSection('gertakariak')}>
          Gertakariak ikasi
        </NavButton>
        <NavButton active={section === 'ordenatu'} icon={<ArrowDownUp size={18} />} onClick={() => newOrdering('sele')}>
          Ordenatu praktikatu
        </NavButton>
        <NavButton active={section === 'emaitzak'} icon={<Trophy size={18} />} onClick={() => setSection('emaitzak')}>
          Emaitzak
        </NavButton>
      </nav>

      {section === 'home' && (
        <section className="grid gap-4">
          <TrainingDashboard
            mastery={examMastery}
            level={level}
            xp={xp}
            due={due}
            weakTraps={weakTraps}
            onAkats={() => newAkats()}
            onOrdering={() => newOrdering('sele')}
            onSele={newSele}
            onStudy={() => {
              setSelectedTextId(weakTraps[0]?.textId ?? examTextSources[0]?.id ?? selectedTextId);
              setSection('testuak');
            }}
          />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <HomeCard
              icon={<Target size={24} />}
              title="Sele modua"
              text="Simulakro zorrotza: A1 akatsak eta A2 kronologia jarraian, irizpide ofizialekin eta laguntzarik gabe."
              cta="Simulakroa hasi"
              onClick={newSele}
            />
            <HomeCard
              icon={<ListChecks size={24} />}
              title="Akatsak praktikatu"
              text="Testu ofizial batean 5 akats aurkitu. Hitz guztiak dira klikagarriak, azterketan bezala: aplikazioak ez dizu pista bisualik ematen."
              cta="Akatsen ariketa hasi"
              onClick={() => newAkats()}
            />
            <HomeCard
              icon={<ArrowDownUp size={24} />}
              title="Gertakariak ordenatu"
              text={`${examEventSources.length} gertakari ofizialeko bankutik 5 aterako dira. Puntuazioa PAU 25-26 bezala: 5/4/3/2 ondo = 1/0,75/0,5/0,25.`}
              cta="Kronologia ariketa hasi"
              onClick={() => newOrdering('sele')}
            />
            <button
              className="glass-panel glass-panel-hover group rounded-3xl p-6 text-left sm:p-8"
              onClick={() => setSection('testuak')}
            >
              <div className="mb-6 inline-flex rounded-2xl bg-emerald-50 p-4 text-emerald-800 shadow-sm ring-1 ring-emerald-200/70 transition-transform duration-500 group-hover:scale-110">
                <BookOpen size={26} />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl font-serif">Testuak ikasi</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">13-24 iturrietako arrisku-hitzak azpimarratuta, kategoriaka eta azalpenekin.</p>
            </button>
            <button
              className="glass-panel glass-panel-hover group rounded-3xl p-6 text-left sm:p-8"
              onClick={() => setSection('gertakariak')}
            >
              <div className="mb-6 inline-flex rounded-2xl bg-amber-50 p-4 text-amber-800 shadow-sm ring-1 ring-amber-200/70 transition-transform duration-500 group-hover:scale-110">
                <CalendarDays size={26} />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl font-serif">Mapa kronologikoa</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">`DATA GARRANTZITSUAK` fitxatik osatutako kronologia, bilatzailearekin eta gaika antolatuta.</p>
            </button>
          </div>
        </section>
      )}

      {section === 'testuak' && (
        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="glass-panel rounded-3xl p-5 flex flex-col max-h-[85vh]">
            <select
              className="w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 font-bold shadow-sm backdrop-blur-md outline-none focus:ring-4 focus:ring-teal-500/20"
              value={selectedTextId}
              onChange={(event) => setSelectedTextId(event.target.value)}
            >
              {examTextSources.map((text) => (
                <option key={text.id} value={text.id}>
                  {text.number}. {text.title}
                </option>
              ))}
            </select>
            <div className="mt-4 flex-1 overflow-auto pr-2 no-scrollbar">
              {examTextSources.map((text) => (
                <button
                  key={text.id}
                  className={clsx(
                    'mb-2 w-full rounded-xl px-4 py-3 text-left text-sm transition-all duration-200',
                    selectedTextId === text.id
                      ? 'bg-teal-600 font-bold text-white shadow-md shadow-teal-900/20'
                      : 'bg-transparent text-slate-700 hover:bg-white/60 hover:shadow-sm border border-transparent hover:border-white/50'
                  )}
                  onClick={() => setSelectedTextId(text.id)}
                >
                  <span className="font-black">{text.number}. </span>
                  {text.title}
                </button>
              ))}
            </div>
          </aside>
          <TextStudy text={selectedText} progress={progress} />
        </section>
      )}

      {section === 'akatsak' && akats && (
        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <ExerciseText
            exercise={akats}
            selected={new Set(selectedPieces.map((piece) => piece.id))}
            answers={answers}
            onToggle={togglePiece}
            onAnswerChange={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
          />
          <aside className="glass-panel rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-black text-slate-900">Zure zuzenketak</h2>
              <button className="rounded-xl border border-white/60 bg-white/50 p-2.5 shadow-sm transition-all hover:bg-white hover:scale-105" onClick={() => newAkats()} title="Berria">
                <RotateCcw size={18} className="text-slate-700" />
              </button>
            </div>
            <label className="mt-4 block text-xs font-black uppercase tracking-widest text-slate-500" htmlFor="practice-text">
              Testua aukeratu
            </label>
            <select
              id="practice-text"
              className="mt-2 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-black text-slate-800 shadow-sm outline-none transition focus:ring-4 focus:ring-teal-500/20"
              value={practiceTextId}
              onChange={(event) => newAkats(event.target.value)}
            >
              <option value="auto">Automatikoa: sistemak aukeratu</option>
              {examTextSources.map((text) => (
                <option key={text.id} value={text.id}>
                  {text.number}. {text.title}
                </option>
              ))}
            </select>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Egin klik susmagarriak diren hitzetan. Denak dira klikagarriak, beraz hemen ez dago pistarik.
              <strong className="block mt-1 text-teal-700">Hautatuta: {selectedPieces.length}/5</strong>
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              PAU 2025-2026: 13-24 testuak, 5 akats, 2 puntu
            </p>
            <div className="mt-4 rounded-2xl border border-teal-100 bg-teal-50/70 p-4 text-sm text-teal-950">
              <p className="font-black">Irizpide ofiziala</p>
              <p className="mt-1 leading-relaxed">
                Identifikazioa: puntu 1. Zuzenketa: puntu 1. Ez dira zenbakiak izango:
                urteak, egunak edo errege-erreginen zenbakiak.
              </p>
            </div>
            <div className="mt-6 space-y-3 flex-1 overflow-auto no-scrollbar pr-1">
              {selectedPieces.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/45 p-5 text-sm leading-relaxed text-slate-600">
                  Lehenik testuan klikatu susmagarriak iruditzen zaizkizun 5 hitz edo esaldi. Zuzenketa laukitxoa testuan bertan agertuko da.
                </div>
              ) : (
                <ul className="space-y-2">
                  {selectedPieces.map((piece, index) => (
                    <li key={piece.id} className="rounded-xl border border-white/60 bg-white/40 p-3 shadow-sm backdrop-blur-md flex items-center justify-between">
                      <div className="min-w-0">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          {index + 1}. Hautaketa
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-slate-800 line-through truncate max-w-[120px] sm:max-w-[150px]">{piece.label}</span>
                          <span className="text-slate-400">→</span>
                          <span className="font-medium text-emerald-700 truncate max-w-[120px] sm:max-w-[150px]">
                            {answers[piece.trapId ?? piece.id] || '(hutsik)'}
                          </span>
                        </div>
                      </div>
                      <button 
                        className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-rose-500 transition-colors shrink-0"
                        onClick={() => togglePiece(piece)}
                        title="Kendu"
                      >
                        <RotateCcw size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              id="akats-submit-btn"
              className="mt-6 w-full rounded-xl bg-teal-600 px-5 py-4 font-black text-white shadow-md shadow-teal-900/20 transition-all hover:bg-teal-500 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:text-slate-500"
              onClick={() => void finishAkats()}
              disabled={selectedPieces.length !== 5}
            >
              Zuzendu
            </button>
            {akatsResult && (
              <AkatsResultView
                result={akatsResult}
                selectedPieces={selectedPieces}
                onTutor={() => void askTutor('A1 akatsen tutorea', 'akatsak', buildAkatsTutorPayload(akatsResult, selectedPieces))}
              />
            )}
          </aside>
        </section>
      )}

      {section === 'gertakariak' && <Timeline />}

      {section === 'ordenatu' && ordering && (
        <section className="glass-panel rounded-3xl p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-teal-700 mb-1">{ordering.title}</p>
              <h2 className="text-3xl font-black text-slate-900">Ordenatu zaharrenetik berrienera</h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
                PAU 2025-2026 irizpidea: 5 ondo jarraian = 1 puntu; 4 = 0,75; 3 = 0,5; 2 = 0,25.
                Gertaerak bakarrik agertzen dira, ez pertsonaia solteak.
              </p>
            </div>
            <button
              className="rounded-xl border border-white/60 bg-white/60 px-5 py-3 font-bold shadow-sm backdrop-blur-md transition-all hover:bg-white hover:scale-105"
              onClick={() => newOrdering(orderingPracticeMode, orderingTheme)}
            >
              Beste sorta bat
            </button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-white/60 bg-white/55 p-3 shadow-sm">
            <div className="inline-grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-black text-slate-600">
              <button
                className={clsx('rounded-lg px-4 py-2 transition', orderingPracticeMode === 'sele' && 'bg-slate-950 text-white shadow-sm')}
                onClick={() => newOrdering('sele')}
              >
                Sele modua
              </button>
              <button
                className={clsx('rounded-lg px-4 py-2 transition', orderingPracticeMode === 'theme' && 'bg-slate-950 text-white shadow-sm')}
                onClick={() => newOrdering('theme', orderingTheme)}
              >
                Gaika
              </button>
            </div>
            <select
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm disabled:opacity-40"
              value={orderingTheme}
              onChange={(event) => newOrdering('theme', event.target.value)}
              disabled={orderingPracticeMode !== 'theme'}
            >
              {orderingThemeOptions.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
            <p className="text-sm font-semibold text-slate-600">
              {orderingPracticeMode === 'sele'
                ? 'Lehenetsia: PAU estiloko nahasketa, mendeen arteko saltoekin eta gertakari garrantzitsuekin.'
                : 'Gaika: gai zehatz bateko sekuentziak automatizatzeko.'}
            </p>
          </div>
          <div className="mt-8 grid gap-4">
            {ordering.events.map((event, index) => (
              <div
                key={event.id}
                draggable
                onDragStart={(dragEvent) => dragEvent.dataTransfer.setData('text/plain', String(index))}
                onDragOver={(dragEvent) => dragEvent.preventDefault()}
                onDrop={(dragEvent) => moveEvent(Number(dragEvent.dataTransfer.getData('text/plain')), index)}
                className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[auto_1fr_auto_auto] items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 md:cursor-grab md:active:cursor-grabbing active:scale-[0.98] active:shadow-lg"
              >
                <GripVertical className="hidden md:block text-slate-400" size={20} />
                <span className="text-lg font-bold text-slate-800">{event.label}</span>
                <span className="hidden rounded-lg bg-white/80 px-3 py-1.5 text-sm font-bold text-slate-600 shadow-sm border border-slate-200/50 sm:inline">{event.theme}</span>
                <span className="flex gap-2">
                  <button
                    className="rounded-lg border border-slate-200/50 bg-white p-2 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white"
                    onClick={() => moveEvent(index, index - 1)}
                    disabled={index === 0}
                    title="Gora"
                  >
                    <ChevronUp size={18} />
                  </button>
                  <button
                    className="rounded-lg border border-slate-200/50 bg-white p-2 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white"
                    onClick={() => moveEvent(index, index + 1)}
                    disabled={index === ordering.events.length - 1}
                    title="Behera"
                  >
                    <ChevronDown size={18} />
                  </button>
                </span>
              </div>
            ))}
          </div>
          <button
            className="mt-8 rounded-xl bg-teal-600 px-8 py-4 font-black text-white shadow-md shadow-teal-900/20 transition-all hover:bg-teal-500 hover:-translate-y-0.5 text-lg"
            onClick={() => void finishOrdering()}
          >
            Zuzendu
          </button>
          {orderingResult !== null && (
            <div className="mt-8 rounded-2xl border border-teal-200/50 bg-teal-50/50 p-6 backdrop-blur-sm shadow-sm animate-fade-in">
              <p className="text-4xl font-black text-teal-900 mb-4">{formatOfficialScore(orderingResult)} <span className="text-2xl text-teal-700/50">/ 1</span></p>
              <p className="text-sm font-bold uppercase tracking-wider text-teal-800">
                Nota ofiziala: {orderingResult === 1 ? '5 hurrenkeran' : orderingResult === 0.75 ? '4 hurrenkeran' : orderingResult === 0.5 ? '3 hurrenkeran' : orderingResult === 0.25 ? '2 hurrenkeran' : 'hurrenkera nahikorik ez'}
              </p>
              <ol className="mt-4 list-decimal space-y-3 pl-6 text-base font-medium text-slate-700">
                {[...ordering.events].sort(compareEvents).map((event) => (
                  <li key={event.id} className="pl-2">
                    <strong className="text-teal-800">{event.date}</strong> - {event.label}
                  </li>
                ))}
              </ol>
              <button
                className="mt-5 rounded-xl bg-teal-700 px-4 py-3 text-sm font-black text-white transition hover:bg-teal-600 disabled:opacity-60"
                disabled={tutorBusy}
                onClick={() => void askTutor('Kronologiaren tutorea', 'ordenatu', buildOrderingTutorPayload(ordering, orderingResult))}
              >
                Gemma 4: azaldu eta eman mnemoteknia
              </button>
            </div>
          )}
        </section>
      )}

      {section === 'sele' && akats && ordering && (
        <section className="grid gap-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-rose-200">PAU simulakroa</p>
                <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Sele modua</h2>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  A1 eta A2 jarraian. Laguntzarik gabe, zuzenketa bukaeran, eta 2025-2026 irizpide ofizialekin.
                </p>
              </div>
              <button className="focus-ring rounded-xl bg-white px-5 py-3 font-black text-slate-950 shadow-sm transition-all hover:bg-rose-50" onClick={newSele}>
                Beste simulakro bat
              </button>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <ExamMetric
                label="A1 akatsak"
                value={`${selectedPieces.length}/5`}
                detail="Klikatu testuan eta idatzi zuzenketak"
                tone={selectedPieces.length === 5 ? 'good' : 'main'}
              />
              <ExamMetric
                label="A2 kronologia"
                value="5 gertakari"
                detail="Arrastatu zaharrenetik berrienera"
                tone="warm"
              />
              <ExamMetric
                label="Nota osoa"
                value={seleDone ? `${((akatsResult?.total ?? 0) + (orderingResult ?? 0)).toLocaleString('eu-ES', { maximumFractionDigits: 2 })}/3` : '3 puntu'}
                detail="A1 = 2 puntu, A2 = 1 puntu"
                tone={seleDone ? 'good' : 'quiet'}
              />
            </div>
            {seleDone && (
              <div className="mt-6 rounded-2xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-3xl font-black">
                  {((akatsResult?.total ?? 0) + (orderingResult ?? 0)).toLocaleString('eu-ES', { maximumFractionDigits: 2 })} / 3
                </p>
                <p className="mt-1 text-sm font-bold text-slate-300">
                  A1: {akatsResult?.total.toFixed(1) ?? '0'} / 2 - A2: {formatOfficialScore(orderingResult ?? 0)} / 1
                </p>
              </div>
            )}
          </div>

          <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <ExerciseText
              exercise={akats}
              selected={new Set(selectedPieces.map((piece) => piece.id))}
              answers={answers}
              onToggle={togglePiece}
              onAnswerChange={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
            />
            <aside className="glass-panel rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-rose-700">1. ariketa</p>
                  <h3 className="mt-1 text-2xl font-black text-slate-900">A1. Akatsak</h3>
                </div>
                <span className={clsx(
                  'rounded-xl px-3 py-1.5 text-sm font-black ring-1',
                  selectedPieces.length === 5
                    ? 'bg-teal-50 text-teal-800 ring-teal-200'
                    : 'bg-white/70 text-slate-600 ring-slate-200'
                )}>
                  {selectedPieces.length}/5
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">Hautatu 5 zati eta idatzi zuzenketa. Testuko hitz guztiak klikagarriak dira, beraz ez dago pistarik.</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200/80">
                <div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${(selectedPieces.length / 5) * 100}%` }} />
              </div>
              <div className="mt-5 space-y-3">
                {selectedPieces.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/45 p-5 text-sm leading-relaxed text-slate-600">
                    Lehenik testuan klikatu susmagarriak iruditzen zaizkizun 5 hitz edo esaldi. Zuzenketa laukitxoa testuan bertan agertuko da.
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {selectedPieces.map((piece, index) => (
                      <li key={piece.id} className="rounded-xl border border-white/60 bg-white/40 p-3 shadow-sm flex items-center justify-between">
                        <div className="min-w-0">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            {index + 1}. Hautaketa
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-800 line-through truncate max-w-[120px] sm:max-w-[150px]">{piece.label}</span>
                            <span className="text-slate-400">→</span>
                            <span className="font-medium text-emerald-700 truncate max-w-[120px] sm:max-w-[150px]">
                              {answers[piece.trapId ?? piece.id] || '(hutsik)'}
                            </span>
                          </div>
                        </div>
                        <button 
                          className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-rose-500 transition-colors shrink-0"
                          onClick={() => togglePiece(piece)}
                          title="Kendu"
                        >
                          <RotateCcw size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {akatsResult && (
                <AkatsResultView
                  result={akatsResult}
                  selectedPieces={selectedPieces}
                  onTutor={() => void askTutor('A1 akatsen tutorea', 'akatsak', buildAkatsTutorPayload(akatsResult, selectedPieces))}
                />
              )}
            </aside>
          </section>

          <section className="glass-panel rounded-3xl p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold tracking-widest uppercase text-teal-700">{ordering.title}</p>
                <h3 className="text-3xl font-black text-slate-900">A2. Ordenatu zaharrenetik berrienera</h3>
              </div>
              <p className="rounded-xl bg-white/60 px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-white/60">
                5/4/3/2 = 1/0,75/0,5/0,25
              </p>
            </div>
            <div className="mt-6 grid gap-4">
              {ordering.events.map((event, index) => (
                <div
                  key={event.id}
                  draggable
                  onDragStart={(dragEvent) => dragEvent.dataTransfer.setData('text/plain', String(index))}
                  onDragOver={(dragEvent) => dragEvent.preventDefault()}
                  onDrop={(dragEvent) => moveEvent(Number(dragEvent.dataTransfer.getData('text/plain')), index)}
                  className="grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 md:cursor-grab md:active:cursor-grabbing active:scale-[0.98] active:shadow-lg"
                >
                  <GripVertical className="hidden md:block text-slate-400" size={20} />
                  <span className="text-lg font-bold text-slate-800">{event.label}</span>
                  <span className="flex gap-2">
                    <button className="rounded-lg bg-white p-2 shadow-sm disabled:opacity-30" onClick={() => moveEvent(index, index - 1)} disabled={index === 0} title="Gora">
                      <ChevronUp size={18} />
                    </button>
                    <button className="rounded-lg bg-white p-2 shadow-sm disabled:opacity-30" onClick={() => moveEvent(index, index + 1)} disabled={index === ordering.events.length - 1} title="Behera">
                      <ChevronDown size={18} />
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <button
              id="sele-submit-btn"
              className="focus-ring mt-8 rounded-xl bg-rose-600 px-8 py-4 text-lg font-black text-white shadow-md shadow-rose-900/20 transition-all hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-slate-300"
              onClick={() => void finishSele()}
              disabled={selectedPieces.length !== 5}
            >
              {selectedPieces.length === 5 ? 'Simulakroa zuzendu' : `A1ean ${5 - selectedPieces.length} falta dira`}
            </button>
            {orderingResult !== null && (
              <div className="mt-6 rounded-2xl border border-teal-200/50 bg-teal-50/60 p-5 animate-fade-in">
                <p className="text-3xl font-black text-teal-900">{formatOfficialScore(orderingResult)} / 1</p>
                <ol className="mt-4 list-decimal space-y-2 pl-6 font-medium text-slate-700">
                  {[...ordering.events].sort(compareEvents).map((event) => (
                    <li key={event.id}>
                      <strong>{event.date}</strong> - {event.label}
                    </li>
                  ))}
                </ol>
                <button
                  className="mt-5 rounded-xl bg-teal-700 px-4 py-3 text-sm font-black text-white transition hover:bg-teal-600 disabled:opacity-60"
                  disabled={tutorBusy}
                  onClick={() => void askTutor('A2 kronologiaren tutorea', 'ordenatu', buildOrderingTutorPayload(ordering, orderingResult))}
                >
                  Gemma 4: azaldu ordena + trikimailua
                </button>
              </div>
            )}
          </section>
        </section>
      )}

      {tutor && <TutorPanel tutor={tutor} busy={tutorBusy} onClose={() => setTutor(null)} />}

      {section === 'emaitzak' && (
        <Results
          progress={progress}
          now={now}
          onTutor={(title, payload) => void askTutor(title, 'summary', payload)}
        />
      )}

      {/* Floating Mobile Sticky Bar for quick progress & evaluation */}
      {selectedPieces.length > 0 && (section === 'akatsak' || section === 'sele') && (
        <div className="fixed bottom-4 left-4 right-4 z-40 xl:hidden transition-all duration-300">
          <div className="glass-panel rounded-2xl p-4 shadow-xl border border-white/80 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">A1. Aurrerapena</span>
              <span className="text-sm font-black text-slate-800">Hautatuta: {selectedPieces.length}/5</span>
            </div>
            <button
              onClick={() => {
                if (section === 'akatsak') {
                  void finishAkats();
                } else {
                  // Scroll directly to the "Simulakroa zuzendu" button using robust ID
                  const submitBtn = document.getElementById('sele-submit-btn');
                  if (submitBtn) {
                    submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  } else {
                    void finishSele();
                  }
                }
              }}
              disabled={selectedPieces.length !== 5}
              className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-black text-white shadow-md shadow-teal-900/10 disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none transition-all hover:bg-teal-500 active:scale-95"
            >
              {selectedPieces.length === 5 ? 'Zuzendu' : `${5 - selectedPieces.length} falta dira`}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function formatOfficialScore(score: number): string {
  return score.toLocaleString('eu-ES', { maximumFractionDigits: 2 });
}

function Stat({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="glass-panel-hover rounded-2xl border border-white/60 bg-white/40 px-5 py-4 backdrop-blur-md shadow-sm">
      <div className="text-2xl font-black text-slate-900 font-serif">{value}{suffix}</div>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function ExamMetric({
  label,
  value,
  detail,
  tone
}: {
  label: string;
  value: string;
  detail: string;
  tone: 'main' | 'good' | 'warm' | 'quiet';
}) {
  return (
    <div className={clsx(
      'rounded-2xl border p-5 glass-panel-hover',
      tone === 'main' && 'border-rose-400/30 bg-rose-500/10',
      tone === 'good' && 'border-emerald-400/30 bg-emerald-500/10',
      tone === 'warm' && 'border-amber-400/30 bg-amber-500/10',
      tone === 'quiet' && 'border-white/10 bg-white/5'
    )}>
      <p className="text-xs font-black uppercase tracking-widest text-slate-300">{label}</p>
      <p className="mt-2 text-3xl font-black text-white font-serif">{value}</p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-300">{detail}</p>
    </div>
  );
}

function NavButton({
  active,
  icon,
  children,
  onClick
}: {
  active: boolean;
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx(
        'inline-flex min-h-12 min-w-[9rem] shrink-0 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 md:min-w-0',
        active
          ? 'border-transparent bg-emerald-900 text-white shadow-lg shadow-emerald-900/20 scale-105'
          : 'border-transparent bg-transparent text-slate-600 hover:bg-white/80 hover:text-emerald-900 hover:shadow-sm hover:scale-105'
      )}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}

function HomeCard({
  icon,
  title,
  text,
  cta,
  onClick
}: {
  icon: ReactNode;
  title: string;
  text: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <button
      className="glass-panel glass-panel-hover group overflow-hidden rounded-3xl text-left flex flex-col border border-white/60"
      onClick={onClick}
    >
      <div className="h-2 w-full bg-slate-200/50 transition-colors duration-500 group-hover:bg-emerald-700" />
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-5 inline-flex self-start rounded-2xl bg-emerald-50 p-4 text-emerald-800 shadow-sm ring-1 ring-emerald-200/50 sm:mb-6 transition-transform duration-500 group-hover:scale-110">{icon}</div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl font-serif">{title}</h2>
        <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600 sm:text-lg">{text}</p>
        <span className="mt-6 inline-flex self-start items-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-bold text-white shadow-md shadow-slate-900/20 transition-all duration-300 group-hover:bg-emerald-800 group-hover:shadow-emerald-900/30">
          {cta}
          <Play size={17} />
        </span>
      </div>
    </button>
  );
}

function TrainingDashboard({
  mastery,
  level,
  xp,
  due,
  weakTraps,
  onAkats,
  onOrdering,
  onSele,
  onStudy
}: {
  mastery: number;
  level: number;
  xp: number;
  due: number;
  weakTraps: ReturnType<typeof weakTrapCandidates>;
  onAkats: () => void;
  onOrdering: () => void;
  onSele: () => void;
  onStudy: () => void;
}) {
  const nextLevel = 220 - (xp % 220);
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-8 sm:p-10 text-white shadow-2xl shadow-slate-900/40">
        <div className="absolute inset-x-0 top-0 h-2 bg-emerald-500" />
        <div className="absolute inset-0 bg-slate-900/35 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold backdrop-blur-md border border-white/10">
              <Flame size={16} className="text-amber-400" /> Maila {level}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-4 py-1.5 text-sm font-bold text-emerald-100 backdrop-blur-md border border-emerald-400/20">
              <Target size={16} className="text-emerald-300" /> {mastery}% domeinua
            </span>
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl font-serif">Gaurko sprint azkarra</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Hasi Sele modutik: lehenengo simulakro erreala, gero akats ahulenak eta kronologia landu.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button className="focus-ring rounded-2xl bg-rose-600 px-4 py-4 font-bold text-white hover:bg-rose-500 transition-all hover:-translate-y-1 shadow-md shadow-rose-900/30 col-span-2 sm:col-span-1" onClick={onSele}>
              1. Sele modua
            </button>
            <button className="focus-ring rounded-2xl bg-emerald-700 px-4 py-4 font-bold text-white hover:bg-emerald-600 transition-all hover:-translate-y-1 shadow-md shadow-emerald-900/30" onClick={onAkats}>
              2. Akatsak
            </button>
            <button className="focus-ring rounded-2xl bg-amber-600 px-4 py-4 font-bold text-white hover:bg-amber-500 transition-all hover:-translate-y-1 shadow-md shadow-amber-900/30" onClick={onOrdering}>
              3. Datak
            </button>
            <button className="focus-ring rounded-2xl bg-slate-800 px-4 py-4 font-bold text-white hover:bg-slate-700 transition-all hover:-translate-y-1 shadow-sm shadow-slate-900/40" onClick={onStudy}>
              4. Testua
            </button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                <span>Domeinu Orokorra</span>
                <span className="text-teal-400 font-extrabold">{mastery}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10 ring-1 ring-inset ring-white/10">
                <div className="h-full rounded-full bg-teal-400 relative shadow-[0_0_10px_rgba(45,212,191,0.35)]" style={{ width: `${Math.min(100, mastery)}%` }}>
                  <div className="absolute inset-0 bg-white/20 w-full h-full mix-blend-overlay"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                <span>XP Maila Progress</span>
                <span className="text-indigo-300 font-extrabold">{xp % 220} / 220 XP</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10 ring-1 ring-inset ring-white/10">
                <div className="h-full rounded-full bg-indigo-400 relative shadow-[0_0_10px_rgba(129,140,248,0.35)]" style={{ width: `${((xp % 220) / 220) * 100}%` }}>
                  <div className="absolute inset-0 bg-white/20 w-full h-full mix-blend-overlay"></div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-400">
            {nextLevel} XP falta zaizkizu hurrengo mailarako — <span className="text-amber-400 font-bold">{due} item</span> errepasatzeko
          </p>
        </div>
      </div>
      <div className="glass-panel rounded-3xl p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex rounded-xl bg-teal-100 p-2.5 text-teal-800">
            <Brain size={24} />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Orain gehien komeni zaizuna</h2>
        </div>
        <div className="mt-4 space-y-3 flex-1 overflow-auto no-scrollbar">
          {weakTraps.slice(0, 5).map((trap) => (
            <div key={trap.id} className="rounded-2xl border border-white/60 bg-white/40 p-4 shadow-sm backdrop-blur-md transition-all hover:bg-white/60">
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-slate-900">{trap.correct}</span>
                <span className="rounded-lg bg-white/80 px-2.5 py-1 text-xs font-bold text-slate-600 shadow-sm border border-slate-200/50">{categoryLabel(trap.category)}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{trap.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TextStudy({ text, progress }: { text: TextSource; progress: Record<string, ProgressItem> }) {
  const [showMarks, setShowMarks] = useState(true);
  const [filter, setFilter] = useState<'all' | 'high' | 'weak'>('all');
  const [activeMark, setActiveMark] = useState<StudyMark | null>(null);
  const allMarks = useMemo(() => studyMarks(text), [text]);
  const marks = allMarks.filter((mark) => {
    if (filter === 'high') return mark.priority >= 5;
    if (filter === 'weak') return (progress[mark.progressId]?.mastery ?? 0) < 0.5;
    return true;
  });
  const uniqueMarks = marks.filter((mark, index, list) => list.findIndex((item) => item.progressId === mark.progressId) === index);
  const mastery = Math.round(textMastery(text, progress) * 100);
  return (
    <article className="glass-panel overflow-hidden rounded-3xl p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="rounded-xl bg-teal-50 px-3 py-1.5 text-sm font-bold text-teal-800 shadow-sm border border-teal-100">{text.theme}</span>
        <span className="rounded-xl bg-slate-100/80 px-3 py-1.5 text-sm font-bold text-slate-700 shadow-sm border border-slate-200/50">{text.date}</span>
        {text.number >= 13 && <span className="rounded-xl bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-800 shadow-sm border border-amber-100">Azterketako sorta</span>}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">{text.number}. {text.title}</h2>
          <p className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-wider">Testu honetako domeinua: {mastery}% - {allMarks.length} arrisku-puntu</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/60 px-4 py-2.5 text-sm font-bold shadow-sm backdrop-blur-md transition-all hover:bg-white"
            onClick={() => setShowMarks((value) => !value)}
          >
            {showMarks ? <EyeOff size={16} /> : <Eye size={16} />}
            {showMarks ? 'Garbia' : 'Azpimarratu'}
          </button>
          <select
            className="rounded-xl border border-white/60 bg-white/60 px-4 py-2.5 text-sm font-bold shadow-sm backdrop-blur-md outline-none focus:ring-4 focus:ring-teal-500/20"
            value={filter}
            onChange={(event) => setFilter(event.target.value as 'all' | 'high' | 'weak')}
          >
            <option value="all">Arrisku guztiak</option>
            <option value="high">Probableenak</option>
            <option value="weak">Nire ahulenak</option>
          </select>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/60 bg-white/45 p-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">Helburua</p>
          <p className="mt-1 text-sm font-bold leading-relaxed text-slate-800">Azpimarratutako kontzeptuak dira akats izateko hautagai naturalak.</p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/45 p-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">Filtroa</p>
          <p className="mt-1 text-sm font-bold leading-relaxed text-slate-800">Erabili Probableenak azkar errepasatzeko, eta Nire ahulenak azken bueltan.</p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/45 p-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">Azterketa</p>
          <p className="mt-1 text-sm font-bold leading-relaxed text-slate-800">Praktikan testua garbi agertuko da: hemen bakarrik ikusten dituzu arriskuak.</p>
        </div>
      </div>
      <div className="mt-8 rounded-2xl bg-white/40 p-6 md:p-8 border border-white/60 shadow-inner">
        <p className="text-lg leading-relaxed text-slate-800 font-medium">{showMarks ? renderMarkedText(text.body, marks, setActiveMark) : text.body}</p>
      </div>

      {showMarks && activeMark && (
        <div className="mt-6 rounded-2xl border border-amber-200/50 bg-amber-50/70 p-5 shadow-md backdrop-blur-md animate-fade-in relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-500" />
          <button 
            className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white shadow-md hover:bg-slate-700 active:scale-95 transition-all"
            onClick={() => setActiveMark(null)}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-amber-100 px-2.5 py-0.5 text-xs font-black text-amber-800 border border-amber-200 uppercase tracking-wider">
              {categoryLabel(activeMark.category)}
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Arrisku-Puntua</span>
          </div>
          
          <h3 className="mt-3 text-2xl font-black text-slate-900 font-serif flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 line-through text-lg">{activeMark.wrong}</span>
            <span className="text-amber-600 font-black">→ {activeMark.correct}</span>
          </h3>
          
          <div className="mt-4 border-t border-amber-200/40 pt-3 flex items-start gap-3">
            <div className="rounded-lg bg-amber-100 p-2 text-amber-800 shrink-0">
              <Brain size={18} />
            </div>
            <div>
              <p className="text-sm font-black text-slate-800 uppercase tracking-wider">Zergatik da tranpa?</p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{activeMark.reason}</p>
            </div>
          </div>
        </div>
      )}
      {showMarks && (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {uniqueMarks.slice(0, 12).map((mark) => (
            <div key={mark.id} className="rounded-2xl border border-white/60 bg-white/50 p-4 shadow-sm backdrop-blur-md transition-all hover:bg-white/80">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-slate-900 text-lg">{mark.correct}</strong>
                <span className="rounded-lg bg-white/80 px-2.5 py-1 text-xs font-bold text-slate-600 shadow-sm border border-slate-200/50">{categoryLabel(mark.category)}</span>
              </div>
              <p className="mt-2 text-slate-600 leading-relaxed">{mark.reason}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function studyMarks(text: TextSource): StudyMark[] {
  const positioned = getTrapCandidates(text).flatMap((candidate) =>
    findAllWholePhrases(text.body, candidate.correct).map((match, occurrence) => ({
      ...candidate,
      id: `${candidate.id}:${match.start}`,
      progressId: candidate.id,
      start: match.start,
      end: match.end,
      occurrence
    }))
  );
  const accepted: StudyMark[] = [];
  positioned
    .sort((a, b) => b.priority - a.priority || b.end - b.start - (a.end - a.start) || a.start - b.start)
    .forEach((mark) => {
      const overlaps = accepted.some((item) => mark.start < item.end && mark.end > item.start);
      if (!overlaps) accepted.push(mark);
    });
  return accepted.sort((a, b) => a.start - b.start);
}

function findAllWholePhrases(text: string, phrase: string): Array<{ start: number; end: number }> {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'gu');
  return Array.from(text.matchAll(regex), (match) => ({
    start: match.index ?? 0,
    end: (match.index ?? 0) + phrase.length
  }));
}

function renderMarkedText(
  body: string, 
  marks: StudyMark[],
  onMarkClick: (mark: StudyMark) => void
) {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  marks.forEach((mark) => {
    nodes.push(body.slice(cursor, mark.start));
    nodes.push(
      <button
        key={mark.id}
        onClick={() => onMarkClick(mark)}
        className="rounded border-b-2 border-amber-500 bg-amber-50/70 px-1 font-extrabold text-amber-950 hover:bg-amber-100 active:scale-95 transition-all cursor-pointer inline align-baseline"
      >
        {body.slice(mark.start, mark.end)}
      </button>
    );
    cursor = mark.end;
  });
  nodes.push(body.slice(cursor));
  return nodes;
}

function ExerciseText({
  exercise,
  selected,
  answers,
  onToggle,
  onAnswerChange
}: {
  exercise: AkatsExercise;
  selected: Set<string>;
  answers?: Record<string, string>;
  onToggle: (piece: Selection) => void;
  onAnswerChange?: (id: string, val: string) => void;
}) {
  const nodes = renderExercisePieces(exercise, selected, answers, onToggle, onAnswerChange);
  return (
    <article className="glass-panel rounded-3xl p-5 sm:p-8 exercise-text-container">
      <div className="mb-6 flex flex-wrap gap-3">
        <span className="rounded-xl bg-white/60 px-3 py-1.5 text-sm font-bold text-slate-700 shadow-sm border border-slate-200/50 backdrop-blur-sm">
          {exercise.text.number}. {exercise.text.title}
        </span>
        <span className="rounded-xl bg-white/60 px-3 py-1.5 text-sm font-bold text-slate-700 shadow-sm border border-slate-200/50 backdrop-blur-sm">{exercise.text.date}</span>
      </div>
      <p className="text-lg leading-relaxed md:text-xl md:leading-loose text-slate-800 font-medium">{nodes}</p>
    </article>
  );
}

function renderExercisePieces(exercise: AkatsExercise, selected: Set<string>, answers: Record<string, string> | undefined, onToggle: (piece: Selection) => void, onAnswerChange: ((id: string, val: string) => void) | undefined): ReactNode[] {
  const nodes: ReactNode[] = [];
  const traps = [...exercise.traps].sort((a, b) => a.start - b.start);
  let cursor = 0;
  let trapIndex = 0;
  let key = 0;

  while (cursor < exercise.mutatedBody.length) {
    const trap = traps[trapIndex];
    if (trap && cursor === trap.start) {
      const value = exercise.mutatedBody.slice(trap.start, trap.end);
      nodes.push(
        <SelectablePiece
          key={`trap:${trap.id}`}
          piece={{ id: trap.id, trapId: trap.id, label: value }}
          selected={selected.has(trap.id)}
          answer={answers?.[trap.id]}
          onAnswerChange={onAnswerChange ? (val) => onAnswerChange(trap.id, val) : undefined}
          onToggle={onToggle}
        >
          {value}
        </SelectablePiece>
      );
      cursor = trap.end;
      trapIndex += 1;
      continue;
    }

    const nextTrapStart = trap?.start ?? exercise.mutatedBody.length;
    const slice = exercise.mutatedBody.slice(cursor, nextTrapStart);
    const match = slice.match(/\s+|[^\s]+/);
    if (!match) break;
    const value = match[0];
    if (/^\s+$/.test(value)) {
      nodes.push(value);
    } else {
      const clean = value.replace(/^[([{“"']+|[)\]},.;:!?…”"']+$/g, '');
      if (!clean) {
        nodes.push(value);
      } else {
        const wordStart = cursor + Math.max(0, value.indexOf(clean));
        const wordEnd = wordStart + clean.length;
        const piece = { id: `decoy:${wordStart}:${wordEnd}`, label: clean };
        nodes.push(
          <SelectablePiece
            key={`decoy:${key}:${wordStart}`}
            piece={piece}
            selected={selected.has(piece.id)}
            answer={answers?.[piece.id]}
            onAnswerChange={onAnswerChange ? (val) => onAnswerChange(piece.id, val) : undefined}
            onToggle={onToggle}
          >
            {value}
          </SelectablePiece>
        );
      }
    }
    cursor += value.length;
    key += 1;
  }

  return nodes;
}

function SelectablePiece({
  piece,
  selected,
  answer,
  onToggle,
  onAnswerChange,
  children
}: {
  piece: Selection;
  selected: boolean;
  answer?: string;
  onToggle: (piece: Selection) => void;
  onAnswerChange?: (val: string) => void;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (selected && containerRef.current) {
      const element = containerRef.current;
      const timer = setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  if (selected) {
    return (
      <span ref={containerRef} className="relative inline-flex items-center mx-1 my-1 align-middle z-10">
        <button 
          className="rounded-l-lg bg-rose-600 px-3 py-1 font-black text-white shadow-lg hover:bg-rose-500 transition-colors line-through"
          onClick={() => onToggle(piece)}
          title="Kendu"
        >
          {children}
        </button>
        <input 
          autoFocus
          className="w-24 sm:w-32 rounded-r-lg border-2 border-l-0 border-rose-600 bg-white px-3 py-1 text-base font-bold text-slate-900 outline-none focus:w-32 sm:focus:w-48 transition-all focus:ring-0 shadow-lg"
          placeholder="Zuzen..."
          value={answer ?? ''}
          onChange={(e) => onAnswerChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
        />
        <button 
          className="absolute -right-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-white shadow-md hover:bg-slate-700 hover:scale-110 active:scale-95 transition-all" 
          onClick={(e) => {
            e.stopPropagation();
            onToggle(piece);
          }}
          title="Descartar"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </span>
    );
  }

  return (
    <button
      className="rounded-md px-1 py-0.5 mx-0.5 text-left transition-all duration-300 focus:outline-none hover:bg-amber-200/80 hover:shadow-sm hover:scale-[1.02] active:scale-95"
      onClick={() => onToggle(piece)}
    >
      {children}
    </button>
  );
}

function AkatsResultView({
  result,
  selectedPieces,
  onTutor
}: {
  result: AkatsResult;
  selectedPieces: Selection[];
  onTutor: () => void;
}) {
  const falseSelections = selectedPieces.filter((piece) => !piece.trapId);
  return (
    <div className="mt-6 rounded-2xl border border-teal-200/50 bg-teal-50/50 p-5 backdrop-blur-sm shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <p className="text-3xl font-black text-teal-900">{result.total.toFixed(1)} <span className="text-xl text-teal-700/50">/ 2</span></p>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-800">Identifikazioa: {result.identificationScore.toFixed(1)}</p>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-800">Zuzenketa: {result.correctionScore.toFixed(1)}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {result.details.map((detail) => (
          <div key={detail.trap.id} className="rounded-xl bg-white/80 p-3 text-sm shadow-sm border border-teal-100 backdrop-blur-md">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              {detail.corrected ? <Check size={18} className="text-teal-600" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300" />}
              <span className="line-through text-slate-400 mr-1">{detail.trap.wrong}</span> - <span className="text-teal-700 ml-1">{detail.trap.correct}</span>
            </div>
            <p className="text-slate-600 mt-1 leading-relaxed">{detail.trap.reason}</p>
          </div>
        ))}
      </div>
      {falseSelections.length > 0 && (
        <div className="mt-4 rounded-xl border border-amber-200/50 bg-amber-50/80 p-4 text-sm text-amber-900 shadow-sm backdrop-blur-md">
          <strong className="block mb-1 text-amber-800">Soberan hautatuta:</strong> {falseSelections.map((piece) => piece.label).join(', ')}
        </div>
      )}
      <button
        className="mt-4 w-full rounded-xl bg-teal-700 px-4 py-3 text-sm font-black text-white transition hover:bg-teal-600"
        onClick={onTutor}
      >
        Gemma 4: azaldu nire akatsak + mnemotekniak
      </button>
    </div>
  );
}

function TutorPanel({ tutor, busy, onClose }: { tutor: NonNullable<TutorState>; busy: boolean; onClose: () => void }) {
  return (
    <section className="glass-panel rounded-3xl border border-violet-200/60 bg-violet-50/60 p-6 shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-violet-700">Gemma 4 tutorea</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">{tutor.title}</h3>
        </div>
        <button className="rounded-xl bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-sm hover:bg-white" onClick={onClose}>
          Itxi
        </button>
      </div>
      <p className={clsx('mt-4 whitespace-pre-line text-base font-semibold leading-relaxed text-slate-800', busy && 'animate-pulse')}>
        {tutor.text}
      </p>
    </section>
  );
}

function Timeline() {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('Guztiak');
  const selectableIds = new Set(seleOrderingSets.flatMap((set) => set.eventIds));
  const selectableEvents = examOrderingEvents()
    .filter((event) => selectableIds.has(event.id))
    .sort(compareEvents);
  const themes = ['Guztiak', ...Array.from(new Set(selectableEvents.map((event) => event.theme)))];
  const filteredEvents = selectableEvents.filter((event) => {
    const matchesTheme = theme === 'Guztiak' || event.theme === theme;
    const matchesQuery = `${event.date} ${event.label} ${event.theme}`.toLocaleLowerCase('eu').includes(query.toLocaleLowerCase('eu'));
    return matchesTheme && matchesQuery;
  });
  const grouped = selectableEvents.reduce<Record<string, HistoryEvent[]>>((acc, event) => {
    acc[event.theme] ??= [];
    acc[event.theme].push(event);
    return acc;
  }, {});
  return (
    <section className="glass-panel rounded-3xl p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Sele kronologia ikasi</h2>
          <p className="mt-2 text-lg text-slate-600">
            {selectableEvents.length} gertakari ager daitezke Sele moduko ordena kronologikoan, urteekin eta gaika banatuta.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              className="w-full rounded-xl border border-white/60 bg-white/60 py-3 pl-11 pr-4 font-medium shadow-sm backdrop-blur-md outline-none transition-all focus:bg-white focus:ring-4 focus:ring-teal-500/20"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Bilatu: Franco, 1936, autonomia..."
            />
          </label>
          <select 
            className="rounded-xl border border-white/60 bg-white/60 px-5 py-3 font-bold shadow-sm backdrop-blur-md outline-none transition-all focus:bg-white focus:ring-4 focus:ring-teal-500/20" 
            value={theme} 
            onChange={(event) => setTheme(event.target.value)}
          >
            {themes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      {query || theme !== 'Guztiak' ? (
        <ol className="mt-8 space-y-3">
          {[...filteredEvents].sort(compareEvents).map((event) => (
            <li key={event.id} className="grid gap-3 rounded-2xl border border-white/60 bg-white/40 p-5 shadow-sm backdrop-blur-md sm:grid-cols-[120px_1fr_auto] sm:items-center transition-all hover:bg-white/60 hover:-translate-y-0.5">
              <span className="text-xl font-black text-teal-800">{event.date}</span>
              <span className="text-lg font-bold text-slate-800">{event.label}</span>
              <span className="rounded-lg bg-white/80 px-3 py-1.5 text-sm font-bold text-slate-600 shadow-sm border border-slate-200/50">{event.theme}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {Object.entries(grouped).map(([themeName, themeEvents]) => (
            <div key={themeName} className="rounded-3xl border border-white/60 bg-white/30 p-6 shadow-sm backdrop-blur-md">
              <div className="mb-4 border-b border-teal-200/50 pb-3">
                <h3 className="text-xl font-black text-teal-900">{themeName}</h3>
                <p className="mt-1 text-sm font-bold text-slate-500">{themeEvents.length} gertakari</p>
              </div>
              <ol className="space-y-3">
                {[...themeEvents].sort(compareEvents).map((event) => (
                  <li key={event.id} className="grid grid-cols-[104px_1fr] gap-3 rounded-2xl bg-white/45 p-3 text-sm items-start ring-1 ring-white/60">
                    <span className="rounded-xl bg-slate-900 px-2.5 py-1.5 text-center text-base font-black text-white">{event.date}</span>
                    <span className="pt-1 text-slate-700 font-bold">{event.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Results({
  progress,
  now,
  onTutor
}: {
  progress: Record<string, ProgressItem>;
  now: number;
  onTutor: (title: string, payload: unknown) => void;
}) {
  const rows = Object.values(progress).sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  const knownCandidates = examTexts().flatMap((text) => getTrapCandidates(text));
  const urgent = rows.filter((item) => new Date(item.dueAt).getTime() <= now).length;
  const attempts = loadAttempts();
  const errorNotes = buildErrorNotes(attempts).slice(0, 8);
  return (
    <section className="glass-panel rounded-3xl p-8">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex items-center gap-4">
          <div className="inline-flex rounded-2xl bg-teal-100 p-3 text-teal-800 shadow-sm ring-1 ring-teal-200/50">
            <BarChart3 size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Aurrerapena</h2>
            <p className="mt-1 text-sm font-bold text-slate-500">Tokiko biltegiratzean gordeta, babeskopia botoiarekin esportagarria.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <Stat label="Itemak" value={rows.length} />
          <Stat label="Gaur" value={urgent} />
          <Stat label="Batez bestekoa" value={rows.length ? Math.round(rows.reduce((sum, item) => sum + item.mastery, 0) / rows.length * 100) : 0} suffix="%" />
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-white/60 bg-white/45 p-5 shadow-sm backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Akatsen koadernoa</h3>
            <p className="mt-1 text-sm font-bold text-slate-500">Azken hutsak, Gemma 4 tutorearekin azaltzeko eta trikimailuak ateratzeko.</p>
          </div>
          <button
            className="rounded-xl bg-violet-700 px-4 py-3 text-sm font-black text-white transition hover:bg-violet-600 disabled:opacity-50"
            disabled={!errorNotes.length}
            onClick={() => onTutor('Nire akatsen laburpena', { errors: errorNotes, weakProgress: rows.slice(0, 12) })}
          >
            Gemma 4: plan pertsonala
          </button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {errorNotes.map((note) => (
            <div key={note.id} className="rounded-xl border border-white/70 bg-white/70 p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">{note.type}</p>
              <p className="mt-1 font-bold leading-relaxed text-slate-800">{note.label}</p>
              <p className="mt-1 text-sm font-semibold text-rose-700">{note.problem}</p>
            </div>
          ))}
          {!errorNotes.length && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white/45 p-5 text-sm font-bold text-slate-500">
              Oraindik ez dago huts nabarmenik. Egin simulakro bat eta hemen agertuko dira.
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-sm backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] sm:min-w-[650px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/60 bg-white/50 text-slate-600 font-bold uppercase tracking-wider text-xs">
                <th className="py-4 px-6">Itema</th>
                <th className="py-4 px-6 hidden sm:table-cell">Mota</th>
                <th className="py-4 px-6">Domeinua</th>
                <th className="py-4 px-6">Bolada</th>
                <th className="py-4 px-6">Hurrengoan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {rows.map((item) => (
                <tr key={item.itemId} className="transition-colors hover:bg-white/60">
                  <td className="py-4 px-6 font-bold text-slate-800">{progressLabel(item, knownCandidates)}</td>
                  <td className="py-4 px-6 text-slate-600 font-medium hidden sm:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      {progressTypeLabel(item.itemType)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex min-w-[7rem] sm:min-w-[8rem] items-center gap-3 font-bold text-slate-700">
                      <span className="w-8 text-right">{Math.round(item.mastery * 100)}%</span>
                      <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200/80 shadow-inner">
                        <span className="block h-full rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.25)]" style={{ width: `${Math.round(item.mastery * 100)}%` }} />
                      </span>
                    </span>
                  </td>
                  <td className="py-4 px-6 font-black text-slate-700">{item.streak}</td>
                  <td className="py-4 px-6 text-slate-500 font-bold whitespace-nowrap">{formatDueDate(item.dueAt, now)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length && (
            <div className="p-8 text-center text-sm font-bold text-slate-500">
              Oraindik ez dago aurrerapenik. Egin lehen simulakroa eta hemen ikusiko duzu zer errepasatu behar den.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function buildAkatsTutorPayload(result: AkatsResult, selectedPieces: Selection[]) {
  return {
    score: result.total,
    selected: selectedPieces.map((piece) => piece.label),
    details: result.details.map((detail) => ({
      wrongShown: detail.trap.wrong,
      correct: detail.trap.correct,
      identified: detail.identified,
      corrected: detail.corrected,
      answer: detail.answer,
      reason: detail.trap.reason
    }))
  };
}

function buildOrderingTutorPayload(ordering: OrderingExercise, score: number | null) {
  return {
    score,
    submitted: ordering.events.map((event, index) => ({ index: index + 1, label: event.label, date: event.date })),
    correct: [...ordering.events].sort(compareEvents).map((event, index) => ({ index: index + 1, label: event.label, date: event.date }))
  };
}

function buildErrorNotes(attempts: LocalAttempt[]) {
  return attempts.flatMap((attempt) => {
    if (attempt.type === 'akatsak') return akatsAttemptErrors(attempt);
    if (attempt.type === 'ordenatu') return orderingAttemptErrors(attempt);
    return [];
  });
}

function akatsAttemptErrors(attempt: LocalAttempt) {
  const detail = attempt.detail as { result?: AkatsResult; details?: AkatsResult['details'] };
  const details = detail.result?.details ?? detail.details ?? [];
  return details
    .filter((item) => !item.corrected)
    .map((item, index) => ({
      id: `${attempt.id}:akats:${index}`,
      type: 'A1 akatsa',
      label: `${item.trap.wrong} -> ${item.trap.correct}`,
      problem: item.identified ? `Zuk idatzia: ${item.answer || 'hutsik'}` : 'Ez zenuen akatsa identifikatu'
    }));
}

function orderingAttemptErrors(attempt: LocalAttempt) {
  const detail = attempt.detail as { eventIds?: string[]; score?: number };
  const submitted = detail.eventIds?.map((id) => events.find((event) => event.id === id)).filter((event): event is HistoryEvent => Boolean(event)) ?? [];
  if (!submitted.length || (detail.score ?? attempt.score) >= 1) return [];
  const correct = [...submitted].sort(compareEvents);
  return [
    {
      id: `${attempt.id}:ordenatu`,
      type: 'A2 kronologia',
      label: submitted.map((event) => event.label).join(' / '),
      problem: `Ordena zuzena: ${correct.map((event) => `${event.date} ${event.label}`).join(' -> ')}`
    }
  ];
}

function progressLabel(item: ProgressItem, candidates: ReturnType<typeof getTrapCandidates>): string {
  if (item.itemType === 'event') {
    return events.find((event) => event.id === item.itemId)?.label ?? item.itemId;
  }
  if (item.itemType === 'trap') {
    const candidate = candidates.find((trap) => trap.id === item.itemId);
    return candidate ? `${candidate.correct} (${categoryLabel(candidate.category)})` : item.itemId;
  }
  return item.itemId;
}

function progressTypeLabel(type: ProgressItem['itemType']): string {
  if (type === 'trap') return 'Akatsa';
  if (type === 'event') return 'Gertakaria';
  if (type === 'akats-set') return 'A1 eredua';
  return 'Sorta';
}

function readErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === 'string' && error.trim()) return error;
  if (error && typeof error === 'object') {
    const data = error as { message?: unknown; details?: unknown; hint?: unknown; code?: unknown };
    const parts = [data.message, data.details, data.hint]
      .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);
    if (parts.length) {
      const code = typeof data.code === 'string' && data.code.trim() ? ` (${data.code})` : '';
      return `${parts.join(' ')}${code}`;
    }
  }
  return fallback;
}

function formatDueDate(dueStr: string, now: number): string {
  const due = new Date(dueStr);
  const diffMs = due.getTime() - now;
  const diffDays = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
  
  if (diffMs <= 0) {
    return 'Orain';
  }
  if (diffDays === 1) {
    return 'Bihar';
  }
  if (diffDays <= 7) {
    return `${diffDays} egun barru`;
  }
  
  return due.toLocaleDateString('eu-ES', { month: 'short', day: 'numeric' });
}
