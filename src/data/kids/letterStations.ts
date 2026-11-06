import type { AlphabetLetter } from 'types/kids.types';

/**
 * The 29 letters split into 7 journey stations, in the order they appear in
 * public/data/kidsAlphabet.json. Grouping follows the place of articulation
 * (makhraj) a child learns in the halaqah, so a station is one "family" of
 * sounds rather than an arbitrary slice of the alphabet.
 *
 * `name`/`blurb` are playful proper nouns, intentionally untranslated — same
 * convention as `BeginnerLesson.title` (surah names).
 */
export interface LetterStation {
  id: string;
  name: string;
  blurb: string;
  letterIds: string[];
}

export interface ResolvedStation extends LetterStation {
  letters: AlphabetLetter[];
  /** Zero-based position in the journey. */
  index: number;
}

export const LETTER_STATIONS: LetterStation[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    blurb: 'Four letters that differ only by their dots.',
    letterIds: ['alif', 'ba', 'ta', 'tha'],
  },
  {
    id: 'throat-town',
    name: 'Throat Town',
    blurb: 'Sounds made from the middle of your throat.',
    letterIds: ['jim', 'ha', 'kha', 'dal', 'dhal'],
  },
  {
    id: 'rattlers',
    name: 'The Rattlers',
    blurb: 'Ra rolls on the tongue, and Sheen is Seen with a fire on top.',
    letterIds: ['ra', 'zay', 'sin', 'shin'],
  },
  {
    id: 'heavy-four',
    name: 'The Heavy Four',
    blurb: 'Sad, Dad, Taa and Zaa fill your whole mouth when you say them.',
    letterIds: ['sad', 'dad', 'ta2', 'za'],
  },
  {
    id: 'deep-and-distant',
    name: 'Deep & Distant',
    blurb: 'The deepest sounds in the Arabic language.',
    letterIds: ['ain', 'ghayn', 'fa', 'qaf'],
  },
  {
    id: 'shape-shifters',
    name: 'Shape Shifters',
    blurb: 'Four letters that hold hands with whatever comes next.',
    letterIds: ['kaf', 'lam', 'mim', 'nun'],
  },
  {
    id: 'quiet-ones',
    name: 'The Quiet Ones',
    blurb: 'The gentle last four at the end of the journey.',
    letterIds: ['ha2', 'waw', 'ya', 'hamza'],
  },
];

/** Stations with their letters attached; letters missing from the data file are dropped. */
export function resolveStations(letters: AlphabetLetter[]): ResolvedStation[] {
  const byId = new Map(letters.map((letter) => [letter.id, letter]));
  return LETTER_STATIONS.map((station, index) => ({
    ...station,
    index,
    letters: station.letterIds.map((id) => byId.get(id)).filter((letter): letter is AlphabetLetter => !!letter),
  })).filter((station) => station.letters.length > 0);
}

export function stationOfLetter(stations: ResolvedStation[], letterId: string): ResolvedStation | undefined {
  return stations.find((station) => station.letterIds.includes(letterId));
}

/**
 * A station opens once the one before it has been beaten at the Boss Challenge.
 * The first station is always open so a child never lands on a locked screen.
 */
export function isStationUnlocked(stations: ResolvedStation[], station: ResolvedStation, clearedIds: string[]): boolean {
  if (station.index === 0) return true;
  const previous = stations[station.index - 1];
  return !!previous && clearedIds.includes(previous.id);
}

/** Every letter of an unlocked station plus the previous station's, for fair decoys. */
export function unlockedLetterIds(stations: ResolvedStation[], clearedIds: string[]): string[] {
  return stations.filter((station) => isStationUnlocked(stations, station, clearedIds)).flatMap((s) => s.letterIds);
}
