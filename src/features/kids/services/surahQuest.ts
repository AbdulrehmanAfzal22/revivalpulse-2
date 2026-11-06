import { shuffle } from 'features/kids/games/engineUtils';
import type { TranslationKey } from 'i18n/types';
import type { Ayah } from 'types/quran.types';
import type { SurahQuest, SurahWordKey } from 'types/kids.types';
import { buildAyahAudioUrl } from 'api/quran/everyAyahClient';

/**
 * Round builders for the surah quest (1-3 stars per surah).
 *
 * Nothing here is invented: the verse meanings come from the fetched mushaf
 * text and the word list comes from data/kids/surahQuests.ts, which is
 * asserted to quote real ayah text. The order round's answer is simply the
 * mushaf sequence the child heard in the reader, so `verseNumber` — not the
 * position in the shuffled card row — decides correctness.
 */
export type QuestKind = 'listen' | 'read' | 'order' | 'word';

export interface QuestVerse {
  verseKey: string;
  verseNumber: number;
  /** Short English meaning, trimmed for a tappable card. */
  meaning: string;
  arabic: string;
  audioUrl: string;
}

export interface QuestChoiceRound {
  kind: 'listen' | 'read' | 'word';
  target: QuestVerse | SurahWordKey;
  /** Always contains the target. */
  options: (QuestVerse | SurahWordKey)[];
}

export interface QuestOrderRound {
  kind: 'order';
  /** Shuffled cards to tap into slots. */
  cards: QuestVerse[];
  /** Verse keys in mushaf order. */
  correctOrder: string[];
}

export type QuestRound = QuestChoiceRound | QuestOrderRound;

const MAX_OPTIONS = 4;
const ORDER_CARDS = 3;
const MEANING_LENGTH = 110;

/** Narrows a choice-round value: verse cards carry a meaning, word keys do not. */
export function isQuestVerse(value: QuestVerse | SurahWordKey): value is QuestVerse {
  return 'meaning' in value;
}

function shorten(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= MEANING_LENGTH) return clean;
  const cut = clean.slice(0, MEANING_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 40 ? cut.lastIndexOf(' ') : MEANING_LENGTH)}…`;
}

/** Verses that actually carry a translation, in mushaf order. */
function usableVerses(verses: Ayah[], audioFolder: string | null): QuestVerse[] {
  return verses
    .filter((verse) => !!verse.translations[0]?.text?.trim())
    .map((verse) => ({
      verseKey: verse.verseKey,
      verseNumber: verse.verseNumber,
      meaning: shorten(verse.translations[0]!.text),
      arabic: verse.textUthmani,
      audioUrl: audioFolder ? buildAyahAudioUrl(audioFolder, verse.chapterId, verse.verseNumber) : '',
    }));
}

/** First / middle / last, so the three cards are visibly spread over the surah. */
function spreadIndices(length: number, count: number): number[] {
  if (length <= count) return Array.from({ length }, (_, index) => index);
  const middle = Math.floor(length / 2);
  return Array.from(new Set([0, middle, length - 1])).slice(0, count);
}

function verseTarget(verses: QuestVerse[]): QuestVerse {
  const later = verses.slice(Math.floor(verses.length / 2));
  return shuffle(later.length > 0 ? later : verses)[0]!;
}

function choiceRound(kind: 'listen' | 'read', target: QuestVerse, verses: QuestVerse[]): QuestChoiceRound {
  const decoys = shuffle(verses.filter((verse) => verse.verseKey !== target.verseKey)).slice(0, MAX_OPTIONS - 1);
  return { kind, target, options: shuffle([target, ...decoys]) };
}

function orderRound(verses: QuestVerse[]): QuestOrderRound {
  const picked = spreadIndices(verses.length, ORDER_CARDS).map((index) => verses[index]!);
  return { kind: 'order', cards: shuffle(picked), correctOrder: picked.map((verse) => verse.verseKey) };
}

function wordRound(quest: SurahQuest): QuestChoiceRound {
  const target = shuffle(quest.wordKeys)[0]!;
  return { kind: 'word', target, options: shuffle(quest.wordKeys) };
}

/**
 * Three rounds — hear (or read) a verse, put verses back in order, own the
 * word. `audioFolder` is null when the bundled kids reciter has no
 * everyayah.com track, in which case the child reads the ayah instead.
 */
export function buildSurahQuest(quest: SurahQuest, verses: Ayah[], audioFolder: string | null): QuestRound[] {
  const usable = usableVerses(verses, audioFolder);
  // The order round needs three genuinely different verses to be a question.
  if (usable.length < ORDER_CARDS) return [];

  const target = verseTarget(usable);
  const first: QuestChoiceRound = audioFolder ? choiceRound('listen', target, usable) : choiceRound('read', target, usable);
  return [first, orderRound(usable), wordRound(quest)];
}

export function questPromptKey(kind: QuestKind): TranslationKey {
  switch (kind) {
    case 'listen':
      return 'kids.questPromptListen';
    case 'read':
      return 'kids.questPromptRead';
    case 'order':
      return 'kids.questPromptOrder';
    case 'word':
      return 'kids.questPromptWord';
  }
}
