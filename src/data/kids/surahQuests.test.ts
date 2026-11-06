import { SURAH_QUESTS, SURAH_QUESTS_BY_ID, questForSurah } from './surahQuests';
import { SURAH_TIERS } from './juzAmmaTiers';
import mushaf from '../../../public/data/quran-full-arabic.json';
import { normalizeArabicText } from 'features/recitationCoach/services/arabicNormalization';

interface MushafSurah {
  id: number;
  ayahs: string[];
}

const surahs = mushaf as unknown as MushafSurah[];

/** The whole surah as one normalized, diacritic-free string to search inside. */
function mushafText(surahId: number): string {
  const surah = surahs.find((item) => item.id === surahId);
  return normalizeArabicText((surah?.ayahs ?? []).join(' '));
}

describe('authored surah quests', () => {
  it('authors exactly one quest per guided tier surah', () => {
    const guided = SURAH_TIERS.flatMap((tier) => tier.surahIds);
    expect(SURAH_QUESTS.map((quest) => quest.surahId).sort((a, b) => a - b)).toEqual(
      [...guided].sort((a, b) => a - b)
    );
    expect(SURAH_QUESTS).toHaveLength(15);
    expect(Object.keys(SURAH_QUESTS_BY_ID)).toHaveLength(15);
  });

  it('gives every quest a hook, a practice and three words', () => {
    SURAH_QUESTS.forEach((quest) => {
      expect(quest.hook.trim().length).toBeGreaterThan(40);
      expect(quest.practice.trim().length).toBeGreaterThan(10);
      expect(quest.wordKeys).toHaveLength(3);
      expect(new Set(quest.wordKeys.map((word) => word.arabic)).size).toBe(3);
      quest.wordKeys.forEach((word) => {
        expect(word.arabic.trim()).toBeTruthy();
        expect(word.transliteration.trim()).toBeTruthy();
        expect(word.english.trim()).toBeTruthy();
      });
    });
  });

  // The religious content of a quest is only safe if the words are really in the surah.
  it('quotes every word key from that surah of the bundled mushaf', () => {
    SURAH_QUESTS.forEach((quest) => {
      const text = mushafText(quest.surahId);
      expect(text).toBeTruthy();
      quest.wordKeys.forEach((word) => {
        expect(text).toContain(normalizeArabicText(word.arabic));
      });
    });
  });

  it('returns nothing for a surah nobody authored a quest for', () => {
    expect(questForSurah(78)).toBeUndefined();
    expect(questForSurah(112)?.surahId).toBe(112);
  });
});
