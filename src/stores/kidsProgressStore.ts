import { create } from 'zustand';
import { useAuthStore } from './authStore';
import { readLocal, syncDomain, upsertLocal } from 'services/syncEngine';
import type { SyncRecord } from 'types/sync.types';
import type {
  BadgeId,
  ContentViewedPayload,
  KidsProgressPayload,
  QuizResultPayload,
  ViewedContentCategory,
} from 'types/kids.types';

/** Matches public/data/kidsAlphabet.json's length (29 letters incl. hamza). */
const TOTAL_ALPHABET_LETTERS = 29;
const STORIES_FOR_BADGE = 5;
const MANNER_TIPS_FOR_BADGE = 5;
const STREAK_DAYS_FOR_BADGE = 7;

function currentUserId(): string | null {
  return useAuthStore.getState().user?.id ?? null;
}

function todayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function persistAndSync(record: SyncRecord<KidsProgressPayload>): SyncRecord<KidsProgressPayload>[] {
  const userId = currentUserId();
  const next = upsertLocal<KidsProgressPayload>('kidsProgress', userId, record);
  if (userId) void syncDomain<KidsProgressPayload>('kidsProgress', userId);
  return next;
}

// --- pure selectors ---

function active(records: SyncRecord<KidsProgressPayload>[]): SyncRecord<KidsProgressPayload>[] {
  return records.filter((record) => !record.deleted);
}

export function getLearnedLetterIds(records: SyncRecord<KidsProgressPayload>[]): string[] {
  return Object.keys(getLetterStars(records));
}

/**
 * Best star count per letter, 1-3. Old `letterLearned` saves (a plain boolean,
 * before star mastery existed) read as 1 star, so a child's progress survives
 * the upgrade — and a re-run of the challenge can still raise it.
 */
export function getLetterStars(records: SyncRecord<KidsProgressPayload>[]): Record<string, number> {
  const stars: Record<string, number> = {};
  active(records).forEach((record) => {
    const payload = record.payload;
    if (payload.kind === 'letterLearned') {
      stars[payload.letterId] = Math.max(stars[payload.letterId] ?? 0, 1);
    }
    if (payload.kind === 'letterStars') {
      stars[payload.letterId] = Math.max(stars[payload.letterId] ?? 0, payload.stars);
    }
  });
  return stars;
}

/** Letters with all 3 stars — the child can sound them out without help. */
export function getMasteredLetterIds(records: SyncRecord<KidsProgressPayload>[]): string[] {
  const stars = getLetterStars(records);
  return Object.keys(stars).filter((letterId) => stars[letterId] === 3);
}

export function getClearedStationIds(records: SyncRecord<KidsProgressPayload>[]): string[] {
  return active(records)
    .map((r) => r.payload)
    .filter((p): p is Extract<KidsProgressPayload, { kind: 'stationCleared' }> => p.kind === 'stationCleared')
    .map((p) => p.stationId);
}

export function getQuizResults(records: SyncRecord<KidsProgressPayload>[]): QuizResultPayload[] {
  return active(records)
    .map((r) => r.payload)
    .filter((p): p is QuizResultPayload => p.kind === 'quizResult');
}

export function getEarnedBadgeIds(records: SyncRecord<KidsProgressPayload>[]): BadgeId[] {
  return active(records)
    .map((r) => r.payload)
    .filter((p): p is Extract<KidsProgressPayload, { kind: 'badgeEarned' }> => p.kind === 'badgeEarned')
    .map((p) => p.badgeId);
}

/**
 * Best star count per surah quest, 1-3. Old `lessonCompleted` saves (a plain boolean,
 * before star mastery existed) read as 1 star, so a child's progress survives
 * the upgrade — and a re-run of the quest can still raise it.
 * JS coerces the numeric surahId keys to strings, so stars[7] and stars['7'] are one slot.
 */
export function getLessonStars(records: SyncRecord<KidsProgressPayload>[]): Record<number, number> {
  const stars: Record<number, number> = {};
  active(records).forEach((record) => {
    const payload = record.payload;
    if (payload.kind === 'lessonCompleted') {
      stars[payload.surahId] = Math.max(stars[payload.surahId] ?? 0, 1);
    }
    if (payload.kind === 'lessonStars') {
      stars[payload.surahId] = Math.max(stars[payload.surahId] ?? 0, payload.stars);
    }
  });
  return stars;
}

/** Surahs with all 3 stars — the child can recite them without help. */
export function getMasteredLessonSurahIds(records: SyncRecord<KidsProgressPayload>[]): number[] {
  const stars = getLessonStars(records);
  return Object.keys(stars)
    .filter((surahId) => stars[Number(surahId)] === 3)
    .map(Number)
    .sort((a, b) => a - b);
}

/** Any surah with at least one star — legacy `lessonCompleted` saves count as one. */
export function getCompletedLessonSurahIds(records: SyncRecord<KidsProgressPayload>[]): number[] {
  return Object.keys(getLessonStars(records)).map(Number).sort((a, b) => a - b);
}

export function getViewedContentIds(
  records: SyncRecord<KidsProgressPayload>[],
  category: ViewedContentCategory
): string[] {
  return active(records)
    .map((r) => r.payload)
    .filter((p): p is ContentViewedPayload => p.kind === 'contentViewed' && p.category === category)
    .map((p) => p.itemId);
}

/** Consecutive calendar days (ending today or yesterday) with a dailyActivity record. */
export function getStreak(records: SyncRecord<KidsProgressPayload>[]): number {
  const days = new Set(
    active(records)
      .map((r) => r.payload)
      .filter((p): p is Extract<KidsProgressPayload, { kind: 'dailyActivity' }> => p.kind === 'dailyActivity')
      .map((p) => p.date)
  );
  if (days.size === 0) return 0;

  const cursor = new Date();
  if (!days.has(todayKeyFor(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(todayKeyFor(cursor))) return 0;
  }

  let streak = 0;
  while (days.has(todayKeyFor(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function todayKeyFor(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function getTodayActivityCount(records: SyncRecord<KidsProgressPayload>[]): number {
  const today = active(records)
    .map((r) => r.payload)
    .find(
      (p): p is Extract<KidsProgressPayload, { kind: 'dailyActivity' }> =>
        p.kind === 'dailyActivity' && p.date === todayKey()
    );
  return today?.actionsCount ?? 0;
}

// --- store ---

interface KidsProgressState {
  records: SyncRecord<KidsProgressPayload>[];
  markLetterLearned: (letterId: string) => void;
  recordLetterStars: (letterId: string, stars: number) => void;
  markStationCleared: (stationId: string) => void;
  recordQuizResult: (quizId: string, score: number, total: number) => void;
  completeLesson: (surahId: number) => void;
  recordLessonStars: (surahId: number, stars: number) => void;
  markContentViewed: (category: ViewedContentCategory, itemId: string) => void;
}

function logDailyActivity(get: () => KidsProgressState, set: (partial: Partial<KidsProgressState>) => void): void {
  const date = todayKey();
  const id = `daily:${date}`;
  const existing = get().records.find((r) => r.id === id && !r.deleted);
  const existingCount =
    existing && existing.payload.kind === 'dailyActivity' ? existing.payload.actionsCount : 0;
  const record: SyncRecord<KidsProgressPayload> = {
    id,
    updatedAt: Date.now(),
    deleted: false,
    payload: { kind: 'dailyActivity', date, actionsCount: existingCount + 1 },
  };
  set({ records: persistAndSync(record) });
}

function awardBadgeIfNew(
  get: () => KidsProgressState,
  set: (partial: Partial<KidsProgressState>) => void,
  badgeId: BadgeId
): void {
  const id = `badge:${badgeId}`;
  if (get().records.some((r) => r.id === id && !r.deleted)) return;
  const record: SyncRecord<KidsProgressPayload> = {
    id,
    updatedAt: Date.now(),
    deleted: false,
    payload: { kind: 'badgeEarned', badgeId },
  };
  set({ records: persistAndSync(record) });
}

function evaluateBadges(get: () => KidsProgressState, set: (partial: Partial<KidsProgressState>) => void): void {
  const records = get().records;
  const learnedLetters = getLearnedLetterIds(records);
  if (learnedLetters.length >= TOTAL_ALPHABET_LETTERS) awardBadgeIfNew(get, set, 'alphabet-explorer');

  const quizzes = getQuizResults(records);
  if (quizzes.some((q) => q.total > 0 && q.score === q.total)) awardBadgeIfNew(get, set, 'quiz-whiz');

  const storiesRead = getViewedContentIds(records, 'story');
  if (storiesRead.length >= STORIES_FOR_BADGE) awardBadgeIfNew(get, set, 'story-time');

  const mannersRead = getViewedContentIds(records, 'mannerTip');
  if (mannersRead.length >= MANNER_TIPS_FOR_BADGE) awardBadgeIfNew(get, set, 'good-manners');

  if (getCompletedLessonSurahIds(records).length >= 1) awardBadgeIfNew(get, set, 'quran-beginner');

  if (getStreak(records) >= STREAK_DAYS_FOR_BADGE) awardBadgeIfNew(get, set, 'daily-learner');
}

export const useKidsProgressStore = create<KidsProgressState>((set, get) => ({
  records: readLocal<KidsProgressPayload>('kidsProgress', currentUserId()),

  markLetterLearned: (letterId) => {
    const id = `letter:${letterId}`;
    if (get().records.some((r) => r.id === id && !r.deleted)) return;
    const record: SyncRecord<KidsProgressPayload> = {
      id,
      updatedAt: Date.now(),
      deleted: false,
      payload: { kind: 'letterLearned', letterId },
    };
    set({ records: persistAndSync(record) });
    logDailyActivity(get, set);
    evaluateBadges(get, set);
  },

  recordLetterStars: (letterId, stars) => {
    const best = Math.max(getLetterStars(get().records)[letterId] ?? 0, stars);
    const record: SyncRecord<KidsProgressPayload> = {
      id: `letter-stars:${letterId}`,
      updatedAt: Date.now(),
      deleted: false,
      payload: { kind: 'letterStars', letterId, stars: best },
    };
    set({ records: persistAndSync(record) });
    logDailyActivity(get, set);
    evaluateBadges(get, set);
  },

  markStationCleared: (stationId) => {
    const id = `station:${stationId}`;
    if (get().records.some((r) => r.id === id && !r.deleted)) return;
    const record: SyncRecord<KidsProgressPayload> = {
      id,
      updatedAt: Date.now(),
      deleted: false,
      payload: { kind: 'stationCleared', stationId },
    };
    set({ records: persistAndSync(record) });
    logDailyActivity(get, set);
    evaluateBadges(get, set);
  },

  recordQuizResult: (quizId, score, total) => {
    const id = `quiz:${quizId}:${Date.now()}`;
    const record: SyncRecord<KidsProgressPayload> = {
      id,
      updatedAt: Date.now(),
      deleted: false,
      payload: { kind: 'quizResult', quizId, score, total },
    };
    set({ records: persistAndSync(record) });
    logDailyActivity(get, set);
    evaluateBadges(get, set);
  },

  completeLesson: (surahId) => {
    const id = `lesson:${surahId}`;
    if (get().records.some((r) => r.id === id && !r.deleted)) return;
    const record: SyncRecord<KidsProgressPayload> = {
      id,
      updatedAt: Date.now(),
      deleted: false,
      payload: { kind: 'lessonCompleted', surahId },
    };
    set({ records: persistAndSync(record) });
    logDailyActivity(get, set);
    evaluateBadges(get, set);
  },

  recordLessonStars: (surahId, stars) => {
    const best = Math.max(getLessonStars(get().records)[surahId] ?? 0, stars);
    const record: SyncRecord<KidsProgressPayload> = {
      id: `lesson-stars:${surahId}`,
      updatedAt: Date.now(),
      deleted: false,
      payload: { kind: 'lessonStars', surahId, stars: best },
    };
    set({ records: persistAndSync(record) });
    logDailyActivity(get, set);
    evaluateBadges(get, set);
  },

  markContentViewed: (category, itemId) => {
    const id = `viewed:${category}:${itemId}`;
    if (get().records.some((r) => r.id === id && !r.deleted)) return;
    const record: SyncRecord<KidsProgressPayload> = {
      id,
      updatedAt: Date.now(),
      deleted: false,
      payload: { kind: 'contentViewed', category, itemId },
    };
    set({ records: persistAndSync(record) });
    logDailyActivity(get, set);
    evaluateBadges(get, set);
  },
}));

// --- re-hydrate from the server once a guest signs in (mirrors collectionsStore.ts) ---

let lastSyncedUserId: string | null = currentUserId();

useAuthStore.subscribe((state) => {
  const userId = state.user?.id ?? null;
  if (userId === lastSyncedUserId) return;
  lastSyncedUserId = userId;
  if (!userId) return;

  void syncDomain<KidsProgressPayload>('kidsProgress', userId).then((records) => {
    useKidsProgressStore.setState({ records });
  });
});
