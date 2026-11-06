import type { Surah } from 'types/quran.types';
import type { SurahQuest } from 'types/kids.types';
import { SURAHS } from 'data/quran/surahs';
import { questForSurah } from './surahQuests';

/**
 * The guided Juz 'Amma journey: fifteen surahs in five tiers of three.
 *
 * Tier order follows how surahs are actually taught in a beginner halaqah —
 * the three Quls first (they fit in one breath and are said in prayer), then
 * the three-verse surahs with big meanings, then the story surahs, then the
 * longer ones that ask something of the child. Grouping by length alone would
 * strand Al-Fatihah at the end of the list, so it closes the journey as the
 * surah a child recites in every rak'ah.
 *
 * `name`/`blurb` are playful proper nouns, intentionally untranslated — same
 * convention as LETTER_STATIONS.
 */
export interface SurahTier {
  id: string;
  name: string;
  blurb: string;
  surahIds: number[];
}

export interface ResolvedTier extends SurahTier {
  index: number;
  surahs: Surah[];
}

export const SURAH_TIERS: SurahTier[] = [
  {
    id: 'three-quls',
    name: 'The Three Quls',
    blurb: 'Three surahs that start with “Say!” — the shelter you recite every morning and evening.',
    surahIds: [112, 113, 114],
  },
  {
    id: 'three-verses',
    name: 'Three Verse Club',
    blurb: 'Short enough to memorise in an evening, heavy enough to change how you spend your day.',
    surahIds: [108, 103, 110],
  },
  {
    id: 'story-stops',
    name: 'The Story Stops',
    blurb: 'An army of elephants, a trading caravan, and a man whose money could not save him.',
    surahIds: [105, 106, 111],
  },
  {
    id: 'open-hearts',
    name: 'Hearts Checked',
    blurb: 'These three ask what your prayer and your kindness really look like from the outside.',
    surahIds: [109, 107, 99],
  },
  {
    id: 'the-opener',
    name: 'The Opener',
    blurb: 'The surah you say in every unit of prayer, the night the Qur’an came down, and the shape you were made in.',
    surahIds: [1, 97, 95],
  },
];

/** Tiers with surah metadata attached; ids missing from data/quran/surahs.ts are dropped. */
export function resolveTiers(): ResolvedTier[] {
  return SURAH_TIERS.map((tier, index) => ({
    ...tier,
    index,
    surahs: tier.surahIds
      .map((id) => SURAHS.find((surah) => surah.id === id))
      .filter((surah): surah is Surah => !!surah),
  })).filter((tier) => tier.surahs.length > 0);
}

export function tierOfSurah(tiers: ResolvedTier[], surahId: number): ResolvedTier | undefined {
  return tiers.find((tier) => tier.surahIds.includes(surahId));
}

/** A tier is "done" once every surah in it has at least one star — that is what opens the next one. */
export function isTierComplete(tier: ResolvedTier, stars: Record<number, number>): boolean {
  return tier.surahIds.length > 0 && tier.surahIds.every((id) => (stars[id] ?? 0) > 0);
}

/**
 * Tier one is always open so a child never lands on a locked screen; every
 * later tier needs the tier before it complete (one star on each surah).
 */
export function isTierUnlocked(tiers: ResolvedTier[], tier: ResolvedTier, stars: Record<number, number>): boolean {
  if (tier.index === 0) return true;
  const previous = tiers[tier.index - 1];
  return !!previous && isTierComplete(previous, stars);
}

/** The first tier that is open but not yet finished — where the child "is". */
export function currentTier(tiers: ResolvedTier[], stars: Record<number, number>): ResolvedTier | undefined {
  return tiers.find((tier) => isTierUnlocked(tiers, tier, stars) && !isTierComplete(tier, stars));
}

export function questOf(surahId: number): SurahQuest | undefined {
  return questForSurah(surahId);
}

/**
 * Everything else in the last juz: still readable and still quizzable, just
 * not part of the gated trail.
 */
export function moreSurahIds(juzAmmaIds: number[], tiers: ResolvedTier[]): number[] {
  const guided = new Set(tiers.flatMap((tier) => tier.surahIds));
  return juzAmmaIds.filter((id) => !guided.has(id));
}
