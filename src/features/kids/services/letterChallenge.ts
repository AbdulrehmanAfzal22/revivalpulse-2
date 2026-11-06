import { shuffle } from 'features/kids/games/engineUtils';
import type { TranslationKey } from 'i18n/types';
import type { AlphabetLetter } from 'types/kids.types';

/**
 * Question builders for the two letter challenges:
 *  - the Letter Lab (3 rounds per letter, worth 1-3 stars),
 *  - the station Boss Challenge (a mixed, timed run over a whole station).
 *
 * Decoys are deliberately *neighbours in the alphabet* rather than random
 * letters: ب/ت/ث and ح/خ are the pairs a child actually confuses, so a wrong
 * answer here is a useful wrong answer.
 */
export type ChallengeKind = 'hear' | 'find' | 'name' | 'word';

export interface ChallengeRound {
  kind: ChallengeKind;
  target: AlphabetLetter;
  /** Always contains `target`; 4 options for the Lab, up to 6 for the Boss. */
  options: AlphabetLetter[];
}

const NEIGHBOUR_WINDOW = 3;

/**
 * Alif's treasure word (أَسَد) and Hamza's (إِبْرَة) both begin on the alif
 * carrier, so offering the other as a choice makes the question ambiguous.
 */
function isConfusableWith(target: AlphabetLetter, decoy: AlphabetLetter): boolean {
  const pair = new Set([target.id, decoy.id]);
  return pair.has('alif') && pair.has('hamza');
}

function pickDecoys(target: AlphabetLetter, pool: AlphabetLetter[], count: number): AlphabetLetter[] {
  const byId = new Map(pool.map((letter) => [letter.id, letter]));
  const targetIndex = pool.findIndex((letter) => letter.id === target.id);

  const near = pool.filter(
    (letter, index) =>
      letter.id !== target.id &&
      Math.abs(index - targetIndex) <= NEIGHBOUR_WINDOW &&
      !isConfusableWith(target, letter)
  );
  const far = pool.filter(
    (letter) => letter.id !== target.id && !near.includes(letter) && !isConfusableWith(target, letter)
  );

  const chosen = [...shuffle(near), ...shuffle(far)]
    .slice(0, Math.max(0, count))
    .map((letter) => byId.get(letter.id))
    .filter((letter): letter is AlphabetLetter => !!letter);

  return chosen;
}

function makeRound(kind: ChallengeKind, target: AlphabetLetter, pool: AlphabetLetter[], optionCount: number): ChallengeRound {
  return { kind, target, options: shuffle([target, ...pickDecoys(target, pool, optionCount - 1)]) };
}

/** The three Lab rounds: hear the sound, spot the shape, claim the word treasure. */
export function buildLetterLab(target: AlphabetLetter, letters: AlphabetLetter[]): ChallengeRound[] {
  const kinds: ChallengeKind[] = ['hear', 'find', 'word'];
  return kinds.map((kind) => makeRound(kind, target, letters, 4));
}

/**
 * Boss run over one station: every letter of the station gets a round, plus a
 * couple of extra rounds on the letters the child has already touched, so the
 * station is tested as a set rather than as four isolated cards.
 */
export function buildBossRounds(
  stationLetters: AlphabetLetter[],
  letters: AlphabetLetter[],
  extraRounds = 2
): ChallengeRound[] {
  const kinds: ChallengeKind[] = ['find', 'hear', 'name', 'word'];
  const rounds = stationLetters.map((letter, i) => makeRound(kinds[i % kinds.length] as ChallengeKind, letter, letters, 4));

  const extras = shuffle(stationLetters)
    .slice(0, Math.max(0, Math.min(extraRounds, stationLetters.length)))
    .map((letter, i) => makeRound(kinds[(i + 2) % kinds.length] as ChallengeKind, letter, letters, 5));

  return shuffle([...rounds, ...extras]);
}

/** One-line prompt for a round, as a translation key. */
export function roundPromptKey(kind: ChallengeKind): TranslationKey {
  switch (kind) {
    case 'hear':
      return 'kids.labPromptHear';
    case 'find':
      return 'kids.labPromptFind';
    case 'name':
      return 'kids.labPromptName';
    case 'word':
      return 'kids.labPromptWord';
  }
}
