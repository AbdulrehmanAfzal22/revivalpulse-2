import { KIDS_SAHABI_V2 } from 'data/kids/sahabiV2';
import type { KidsStoryV2 } from 'types/kidsStories.types';
import type { LocalizedText } from 'types/kidsStories.types';

/**
 * The Companions section is read in both English and Urdu, so a companion is
 * only "done" when the Urdu exists AND it is real Urdu. Two failure modes this
 * catches, both reported by users: an empty `ur` that silently renders English,
 * and an English word interpolated inside an Urdu sentence, which renders as
 * broken half-script text.
 */

/** Two Latin letters in a row is an English word; ﷺ, digits and punctuation are not. */
function latinRuns(text: string): string[] {
  return text.match(/[A-Za-z]{2,}/g) ?? [];
}

/** Urdu is written in the Arabic script — any other writing system is a typo that reaches the page. */
function foreignScript(text: string): string[] {
  return [...new Set(text.match(/[^\p{sc=Arabic}\p{sc=Latin}\p{sc=Common}\p{sc=Inherited}]/gu) ?? [])];
}

function missingUrdu(story: KidsStoryV2): string[] {
  const problems: string[] = [];
  const needsUrdu = (label: string, text: LocalizedText | undefined) => {
    if (!text?.ur?.trim()) problems.push(`${label} has no Urdu`);
  };

  needsUrdu('summary', story.summary);
  story.chapters.forEach((chapter) => {
    needsUrdu(`${chapter.id} title`, chapter.title);
    if (chapter.lesson) needsUrdu(`${chapter.id} lesson`, chapter.lesson);
    if (chapter.ayahNote) needsUrdu(`${chapter.id} ayahNote`, chapter.ayahNote);
    chapter.paragraphs.forEach((paragraph, index) => {
      needsUrdu(`${chapter.id} paragraph ${index + 1}`, paragraph);
    });
    chapter.sources.forEach((source, index) => {
      needsUrdu(`${chapter.id} source ${index + 1} label`, source.label);
      if (source.explanation) needsUrdu(`${chapter.id} source ${index + 1} explanation`, source.explanation);
    });
    // A part ends on one highlighted takeaway: either its own lesson or a
    // bilingual ayah note. An absent lesson is not a gap (storyValidation.ts
    // counts the ayah note as the closing line), so only a bilingual
    // takeaway on either side satisfies the reader.
    const hasUrduTakeaway = Boolean(chapter.lesson?.ur?.trim() || chapter.ayahNote?.ur?.trim());
    if (!hasUrduTakeaway) problems.push(`${chapter.id} ends with no Urdu takeaway (lesson or ayah note)`);
  });
  return problems;
}

function mixedScript(story: KidsStoryV2): string[] {
  const problems: string[] = [];
  const check = (label: string, text: string | undefined) => {
    if (!text?.trim()) return;
    const runs = latinRuns(text);
    if (runs.length > 0) problems.push(`${label} mixes English into Urdu: ${runs.slice(0, 3).join(', ')}`);
    const foreign = foreignScript(text);
    if (foreign.length > 0) problems.push(`${label} uses a script that is not Urdu: ${foreign.slice(0, 3).join(' ')}`);
  };

  check('summary', story.summary.ur);
  story.chapters.forEach((chapter) => {
    check(`${chapter.id} title`, chapter.title.ur);
    check(`${chapter.id} lesson`, chapter.lesson?.ur);
    check(`${chapter.id} ayahNote`, chapter.ayahNote?.ur);
    chapter.paragraphs.forEach((paragraph, index) => check(`${chapter.id} paragraph ${index + 1}`, paragraph.ur));
    chapter.sources.forEach((source, index) => {
      check(`${chapter.id} source ${index + 1} label`, source.label.ur);
      check(`${chapter.id} source ${index + 1} explanation`, source.explanation?.ur);
    });
  });
  return problems;
}

describe("companion Urdu reader", () => {
  it.each(KIDS_SAHABI_V2.map((story) => [story.id, story] as const))(
    '%s carries Urdu for every visible line',
    (_id, story) => {
      expect(missingUrdu(story)).toEqual([]);
    }
  );

  it.each(KIDS_SAHABI_V2.map((story) => [story.id, story] as const))(
    '%s writes its Urdu without dropping English words inside',
    (_id, story) => {
      expect(mixedScript(story)).toEqual([]);
    }
  );

  it('covers every companion in the list, not just a few', () => {
    // A companion missing from the registry would never be checked above.
    expect(KIDS_SAHABI_V2.length).toBeGreaterThan(40);
    KIDS_SAHABI_V2.forEach((story) => {
      expect(story.type).toBe('sahabi');
      expect(story.chapters.length).toBeGreaterThanOrEqual(5);
    });
  });
});
