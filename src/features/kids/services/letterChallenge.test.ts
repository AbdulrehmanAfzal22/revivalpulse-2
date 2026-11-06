import { buildBossRounds, buildLetterLab, roundPromptKey } from './letterChallenge';
import alphabetData from '../../../../public/data/kidsAlphabet.json';
import type { AlphabetLetter } from 'types/kids.types';

const letters = alphabetData as unknown as AlphabetLetter[];
const byId = (id: string) => letters.find((letter) => letter.id === id)!;

describe('letter lab rounds', () => {
  it('asks hear, find and word in order, always offering the target', () => {
    const rounds = buildLetterLab(byId('ba'), letters);
    expect(rounds.map((round) => round.kind)).toEqual(['hear', 'find', 'word']);
    rounds.forEach((round) => {
      expect(round.target.id).toBe('ba');
      expect(round.options).toHaveLength(4);
      expect(round.options.map((option) => option.id)).toContain('ba');
      expect(new Set(round.options.map((option) => option.id)).size).toBe(4);
    });
  });

  it('uses look-alike neighbours rather than random letters as decoys', () => {
    // Decoys come from the +-3 window around Ba: alif, ta, tha and jim — not far letters like qaf.
    const round = buildLetterLab(byId('ba'), letters)[1]!;
    const window = ['alif', 'ba', 'ta', 'tha', 'jim'];
    round.options.forEach((option) => expect(window).toContain(option.id));
  });

  it('never offers hamza as a decoy for alif, because both start on the alif carrier', () => {
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const alifRounds = buildLetterLab(byId('alif'), letters);
      alifRounds.forEach((round) => expect(round.options.map((o) => o.id)).not.toContain('hamza'));

      const hamzaRounds = buildLetterLab(byId('hamza'), letters);
      hamzaRounds.forEach((round) => expect(round.options.map((o) => o.id)).not.toContain('alif'));
    }
  });

  it('gives every round kind a prompt key', () => {
    expect(roundPromptKey('hear')).toBe('kids.labPromptHear');
    expect(roundPromptKey('find')).toBe('kids.labPromptFind');
    expect(roundPromptKey('name')).toBe('kids.labPromptName');
    expect(roundPromptKey('word')).toBe('kids.labPromptWord');
  });
});

describe('boss rounds', () => {
  it('tests every letter of the station at least once', () => {
    const stationLetters = letters.slice(0, 4);
    const rounds = buildBossRounds(stationLetters, letters, 2);
    expect(rounds).toHaveLength(6);

    const targets = rounds.map((round) => round.target.id);
    stationLetters.forEach((letter) => expect(targets).toContain(letter.id));
  });

  it('keeps the answer set valid for a one-letter station', () => {
    const rounds = buildBossRounds([byId('shin')], letters, 2);
    expect(rounds.length).toBeGreaterThan(0);
    rounds.forEach((round) => {
      expect(round.options.map((option) => option.id)).toContain(round.target.id);
      expect(new Set(round.options.map((option) => option.id)).size).toBe(round.options.length);
    });
  });
});
