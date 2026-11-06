import { LETTER_STATIONS, isStationUnlocked, resolveStations } from './letterStations';
import alphabetData from '../../../public/data/kidsAlphabet.json';
import type { AlphabetLetter } from 'types/kids.types';

const letters = alphabetData as unknown as AlphabetLetter[];

describe('letter journey stations', () => {
  it('covers every letter of the data file exactly once', () => {
    const ids = LETTER_STATIONS.flatMap((station) => station.letterIds);
    expect(ids.sort()).toEqual(letters.map((letter) => letter.id).sort());
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('resolves all 29 letters into 7 stations without dropping any', () => {
    const stations = resolveStations(letters);
    expect(stations).toHaveLength(7);
    expect(stations.reduce((sum, station) => sum + station.letters.length, 0)).toBe(letters.length);
  });

  it('gives every letter a word treasure', () => {
    letters.forEach((letter) => {
      expect(letter.word?.arabic).toBeTruthy();
      expect(letter.word?.english).toBeTruthy();
      expect(letter.word?.emoji).toBeTruthy();
    });
  });

  it('opens the first station and holds the rest until the previous boss is beaten', () => {
    const stations = resolveStations(letters);
    const first = stations[0]!;
    const second = stations[1]!;

    expect(isStationUnlocked(stations, first, [])).toBe(true);
    expect(isStationUnlocked(stations, second, [])).toBe(false);
    expect(isStationUnlocked(stations, second, [first.id])).toBe(true);
  });

  it('never unlocks a station past a gap in the cleared list', () => {
    const stations = resolveStations(letters);
    // Station 3 sits behind station 2, so clearing only station 1 must not reach it.
    expect(isStationUnlocked(stations, stations[2]!, [stations[0]!.id])).toBe(false);
  });
});
