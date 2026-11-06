import {
  SURAH_TIERS,
  currentTier,
  isTierComplete,
  isTierUnlocked,
  moreSurahIds,
  questOf,
  resolveTiers,
  tierOfSurah,
} from './juzAmmaTiers';
import { JUZ_BOUNDARIES } from 'data/quran/juz';

const tiers = resolveTiers();
const juzAmmaIds = Object.keys(
  JUZ_BOUNDARIES.find((juz) => juz.juzNumber === 30)?.verseMapping ?? {}
).map(Number);

describe("Juz 'Amma tiers", () => {
  it('is five tiers of three real surahs, each with a quest', () => {
    expect(tiers).toHaveLength(5);
    expect(SURAH_TIERS.every((tier) => tier.surahIds.length === 3)).toBe(true);
    tiers.forEach((tier) => {
      expect(tier.surahs).toHaveLength(tier.surahIds.length);
      tier.surahIds.forEach((id) => expect(questOf(id)).toBeDefined());
    });
  });

  it('never lists a surah twice, and stays in the last juz apart from the Opener', () => {
    const guided = tiers.flatMap((tier) => tier.surahIds);
    expect(new Set(guided).size).toBe(guided.length);
    guided.forEach((id) => expect(juzAmmaIds.includes(id) || id === 1).toBe(true));
    // Al-Fatihah is the one surah taught outside Juz 'Amma, deliberately.
    expect(guided.filter((id) => !juzAmmaIds.includes(id))).toEqual([1]);
  });

  it('needs one star on every surah before a tier counts as done', () => {
    const first = tiers[0]!;
    expect(isTierComplete(first, {})).toBe(false);
    expect(isTierComplete(first, { [first.surahIds[0]!]: 1 })).toBe(false);
    expect(
      isTierComplete(first, Object.fromEntries(first.surahIds.map((id) => [id, 1])))
    ).toBe(true);
  });

  it('opens tier one always and later tiers only behind a finished neighbour', () => {
    expect(isTierUnlocked(tiers, tiers[0]!, {})).toBe(true);
    expect(isTierUnlocked(tiers, tiers[1]!, {})).toBe(false);

    const secondTier = tiers[1]!;
    const firstCleared = Object.fromEntries(tiers[0]!.surahIds.map((id) => [id, 2]));
    expect(isTierUnlocked(tiers, secondTier, firstCleared)).toBe(true);
    // A gap must not be jumped: tier 3 sits behind tier 2, not tier 1.
    expect(isTierUnlocked(tiers, tiers[2]!, firstCleared)).toBe(false);
  });

  it('reports the child as standing in the first open, unfinished tier', () => {
    expect(currentTier(tiers, {})?.id).toBe(tiers[0]!.id);

    const oneStarEach = Object.fromEntries(tiers[0]!.surahIds.map((id) => [id, 1]));
    expect(currentTier(tiers, oneStarEach)?.id).toBe(tiers[1]!.id);

    const allDone = Object.fromEntries(tiers.flatMap((tier) => tier.surahIds.map((id) => [id, 3])));
    expect(currentTier(tiers, allDone)).toBeUndefined();
  });

  it('finds the tier a surah belongs to', () => {
    const middle = tiers[2]!;
    expect(tierOfSurah(tiers, middle.surahIds[1]!)?.id).toBe(middle.id);
    expect(tierOfSurah(tiers, 78)).toBeUndefined();
  });

  it('leaves the rest of the juz readable but outside the trail', () => {
    const guided = tiers.flatMap((tier) => tier.surahIds);
    const rest = moreSurahIds(juzAmmaIds, tiers);
    expect(rest.some((id) => guided.includes(id))).toBe(false);
    // Trail plus reading list is exactly the last juz, once each.
    expect([...guided.filter((id) => juzAmmaIds.includes(id)), ...rest].sort((a, b) => a - b))
      .toEqual([...juzAmmaIds].sort((a, b) => a - b));
  });
});
