import { buildSurahQuest, isQuestVerse, questPromptKey } from './surahQuest';
import type { QuestChoiceRound, QuestOrderRound } from './surahQuest';
import { SURAH_QUESTS } from 'data/kids/surahQuests';
import type { SurahQuest } from 'types/kids.types';
import type { Ayah } from 'types/quran.types';

const quest = SURAH_QUESTS.find((item) => item.surahId === 112)!;

function ayah(chapterId: number, verseNumber: number, meaning: string): Ayah {
  return {
    id: verseNumber,
    verseKey: `${chapterId}:${verseNumber}`,
    verseNumber,
    chapterId,
    textUthmani: `arabic ${verseNumber}`,
    translations: [{ translationId: 'saheeh-international', text: meaning }],
    words: [],
    juzNumber: 30,
    hizbNumber: 60,
    rubNumber: 240,
    rukuNumber: 1,
    manzilNumber: 5,
    sajdahNumber: null,
    pageNumber: 604,
  };
}

function verses(count: number, chapterId = 112): Ayah[] {
  return Array.from({ length: count }, (_, index) =>
    ayah(chapterId, index + 1, `Meaning number ${index + 1}, short enough to fit a card.`)
  );
}

function firstRound(rounds: ReturnType<typeof buildSurahQuest>): QuestChoiceRound {
  return rounds[0] as QuestChoiceRound;
}

describe('surah quest rounds', () => {
  it('asks hear, order, word when there is recitation to play', () => {
    const rounds = buildSurahQuest(quest, verses(4), 'maher-muaiqly');
    expect(rounds.map((round) => round.kind)).toEqual(['listen', 'order', 'word']);
    expect(firstRound(rounds).options).toHaveLength(4);
    rounds.forEach((round) => {
      expect(round.kind).not.toBe('read');
    });
  });

  it('swaps the listening round for a reading round when the reciter has no track', () => {
    const rounds = buildSurahQuest(quest, verses(4), null);
    expect(rounds.map((round) => round.kind)).toEqual(['read', 'order', 'word']);
    const target = firstRound(rounds).target;
    expect(isQuestVerse(target) && target.audioUrl).toBe('');
  });

  it('refuses to build a quest shorter than three translated verses', () => {
    expect(buildSurahQuest(quest, verses(2), 'maher-muaiqly')).toEqual([]);
    const untranslated = verses(4).map((item) => ({ ...item, translations: [] }));
    expect(buildSurahQuest(quest, untranslated, 'maher-muaiqly')).toEqual([]);
  });

  it('answers the order round with the mushaf sequence, never the shuffled row', () => {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const round = buildSurahQuest(quest, verses(4), 'maher-muaiqly')[1] as QuestOrderRound;
      expect(round.correctOrder).toEqual(
        [...round.cards].sort((a, b) => a.verseNumber - b.verseNumber).map((card) => card.verseKey)
      );
      expect(round.cards).toHaveLength(3);
      expect(new Set(round.cards.map((card) => card.verseKey)).size).toBe(3);
    }
  });

  it('spreads the order cards over the start, middle and end of the surah', () => {
    const round = buildSurahQuest(quest, verses(9), 'maher-muaiqly')[1] as QuestOrderRound;
    expect(round.correctOrder).toEqual(['112:1', '112:5', '112:9']);
  });

  it('always offers the target among unique options, for both verse and word rounds', () => {
    const rounds = buildSurahQuest(quest, verses(4), 'maher-muaiqly');
    const listen = firstRound(rounds);
    const targetId = isQuestVerse(listen.target) ? listen.target.verseKey : '';
    expect(listen.options.map((option) => (isQuestVerse(option) ? option.verseKey : option.arabic))).toContain(targetId);
    expect(new Set(listen.options.map((option) => (isQuestVerse(option) ? option.verseKey : option.arabic))).size).toBe(
      listen.options.length
    );

    const word = rounds[2] as QuestChoiceRound;
    expect(word.options).toHaveLength(3);
    expect(word.options.map((option) => (option as { arabic: string }).arabic)).toContain(
      (word.target as { arabic: string }).arabic
    );
  });

  it('trims a long translation so a meaning stays tappable', () => {
    const long = verses(3).map((item, index) =>
      index === 1 ? ayah(112, 2, `${'many words here '.repeat(20)} tail`) : item
    );
    const round = buildSurahQuest(quest, long, 'maher-muaiqly')[1] as QuestOrderRound;
    const trimmed = round.cards.find((card) => card.verseNumber === 2)!.meaning;
    expect(trimmed.length).toBeLessThanOrEqual(111);
    expect(trimmed.endsWith('…')).toBe(true);
  });

  it('has a prompt string for every round kind', () => {
    expect(questPromptKey('listen')).toBe('kids.questPromptListen');
    expect(questPromptKey('read')).toBe('kids.questPromptRead');
    expect(questPromptKey('order')).toBe('kids.questPromptOrder');
    expect(questPromptKey('word')).toBe('kids.questPromptWord');
  });

  it('builds a three-round quest for every authored surah', () => {
    const byId = new Map<number, SurahQuest>(SURAH_QUESTS.map((item) => [item.surahId, item]));
    byId.forEach((item, surahId) => {
      const rounds = buildSurahQuest(item, verses(6, surahId), 'maher-muaiqly');
      expect(rounds).toHaveLength(3);
    });
  });
});
