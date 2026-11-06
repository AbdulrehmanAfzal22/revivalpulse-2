import type { TranslationKey } from 'i18n';

/** The "word treasure" behind each letter — a concrete thing a child can picture. */
export interface LetterWord {
  arabic: string;
  transliteration: string;
  english: string;
  emoji: string;
}

export interface AlphabetLetter {
  id: string;
  order: number;
  arabic: string;
  transliteration: string;
  /** public/audio/kids-alphabet/{id}.mp3 */
  audioUrl: string;
  word: LetterWord;
}

export type KidsFigureType = 'prophet' | 'sahabi';

export interface KidsStory {
  id: string;
  type: KidsFigureType;
  nameArabic: string;
  nameEnglish: string;
  /** Short, kid-friendly, cross-checked against a general reference — not a narrative retelling. */
  summary: string;
  /**
   * Detailed, kid-friendly narrative retelling (paragraphs, shown in order
   * on the story page). Quran-based and uncontroversial; the `summary`
   * remains the card blurb. Sahabah stories keep this empty.
   */
  sections?: string[];
  /** Real Quran verse keys about this figure — fetched live (api/quran/quranClient.ts), not paraphrased. */
  verseRefs: string[];
  /** Key into the symbolic (non-figurative) illustration map — features/kids/components/StoryIllustration.tsx. */
  illustrationSymbol: string;
  accentColor: string;
  /** Name with Islamic respect suffix (ﷺ for prophets) */
  nameWithRespect?: string;
}

export interface BeginnerLesson {
  surahId: number;
  /** Surah name — proper noun, intentionally untranslated. */
  title: string;
  focusKey: TranslationKey;
}

/** One Arabic word a child should own after a surah quest, quoted from the mushaf text. */
export interface SurahWordKey {
  arabic: string;
  transliteration: string;
  english: string;
}

/**
 * Authored quest content for the guided Juz 'Amma surahs. `hook`/`practice`
 * are kid-facing prose tied to a specific surah, so — like the alphabet
 * station blurbs — they are intentionally untranslated rather than fanned out
 * across 11 dictionaries.
 */
export interface SurahQuest {
  surahId: number;
  /** Why this surah matters, in one or two sentences a child can hold. */
  hook: string;
  /** 2-3 words straight out of its verses. Drives the word-match round. */
  wordKeys: SurahWordKey[];
  /** Something to do today because of this surah. */
  practice: string;
}

export interface MannerTip {
  id: string;
  tipKey: TranslationKey;
  bookSlug: string;
  idInBook: number;
}

export interface SimplifiedHadithRef {
  id: string;
  bookSlug: string;
  idInBook: number;
  kidFramingKey: TranslationKey;
}

export type RamadanEidOccasion = 'ramadan' | 'eid';

export interface RamadanEidActivity {
  id: string;
  occasion: RamadanEidOccasion;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
}

export type BadgeId =
  | 'alphabet-explorer'
  | 'quiz-whiz'
  | 'story-time'
  | 'daily-learner'
  | 'quran-beginner'
  | 'good-manners';

export interface BadgeDefinition {
  id: BadgeId;
  labelKey: TranslationKey;
  descriptionKey: TranslationKey;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface LetterLearnedPayload {
  kind: 'letterLearned';
  letterId: string;
}

/** Star mastery for one letter, 1-3. Supersedes `letterLearned`, which stays readable for old saves. */
export interface LetterStarsPayload {
  kind: 'letterStars';
  letterId: string;
  stars: number;
}

/** A station's Boss Challenge has been beaten, which is what unlocks the next station. */
export interface StationClearedPayload {
  kind: 'stationCleared';
  stationId: string;
}

export interface QuizResultPayload {
  kind: 'quizResult';
  quizId: string;
  score: number;
  total: number;
}

export interface BadgeEarnedPayload {
  kind: 'badgeEarned';
  badgeId: BadgeId;
}

export interface LessonCompletedPayload {
  kind: 'lessonCompleted';
  surahId: number;
}

/** Star mastery for one surah quest, 1-3. Supersedes `lessonCompleted` for old saves. */
export interface LessonStarsPayload {
  kind: 'lessonStars';
  surahId: number;
  stars: number;
}

export interface DailyActivityPayload {
  kind: 'dailyActivity';
  date: string;
  actionsCount: number;
}

export type ViewedContentCategory = 'story' | 'mannerTip' | 'surahLesson';

export interface ContentViewedPayload {
  kind: 'contentViewed';
  category: ViewedContentCategory;
  itemId: string;
}

export type KidsProgressPayload =
  | LetterLearnedPayload
  | LetterStarsPayload
  | StationClearedPayload
  | QuizResultPayload
  | BadgeEarnedPayload
  | LessonCompletedPayload
  | LessonStarsPayload
  | DailyActivityPayload
  | ContentViewedPayload;
