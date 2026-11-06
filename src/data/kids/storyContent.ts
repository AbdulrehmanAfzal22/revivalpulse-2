import type { KidsStoryV2, KidsStoryChapter, LocalizedText } from 'types/kidsStories.types';

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * True when a part is actually read in Urdu: its title and every paragraph
 * carry Urdu. Shared with storyValidation.ts so the "bilingual lesson" rule
 * asks for Urdu only where there is Urdu to be bilingual about.
 */
export function chapterHasUrduNarration(chapter: KidsStoryChapter): boolean {
  return Boolean(chapter.title.ur?.trim()) && chapter.paragraphs.every((paragraph) => paragraph.ur?.trim());
}

/**
 * The takeaway for a part that doesn't carry one.
 *
 * A chapter whose ayah note is already bilingual ends on that takeaway, so it
 * needs no invented second one — the reader would show the same thought twice.
 * The invented Urdu line is only shipped when the part itself is in Urdu, and
 * it names the subject in the Arabic script: an English name inside an Urdu
 * sentence renders as broken half-script text, which is worse than the clean
 * English fallback under "Urdu is coming soon".
 */
function makeLesson(story: KidsStoryV2, chapter: KidsStoryChapter): LocalizedText | undefined {
  const existing = chapter.lesson;
  if (existing?.en.trim() && existing.ur?.trim()) return existing;
  if (chapter.ayahNote?.en.trim() && chapter.ayahNote.ur?.trim()) return undefined;
  const en = existing?.en.trim() || `${story.nameEnglish} shows us what ${chapter.title.en.toLowerCase()} really means: faith when it is hard, courage when it costs something, and kindness even when nobody returns it.`;
  const ur = existing?.ur?.trim() || (chapterHasUrduNarration(chapter) ? `${story.nameArabic} ہمیں ایمان، ہمت، مہربانی اور سچائی کا خوبصورت درس دیتے ہیں۔` : undefined);
  return ur ? { en, ur } : { en };
}

/**
 * Paragraphs ship as they were written. An earlier version padded short ones up
 * to a word count with stock reflection sentences, and every part then ended on
 * the same two lines — length is a note for authors, not something a build step
 * can invent. Missing Urdu is left missing: localText falls back to English
 * under the "Urdu is coming soon" notice instead of repeating one stock line.
 */
export function enrichStoryContent(story: KidsStoryV2): KidsStoryV2 {
  return {
    ...story,
    chapters: story.chapters.map((chapter) => ({
      ...chapter,
      lesson: makeLesson(story, chapter),
    })),
  };
}

export function chapterWordCount(text: string): number {
  return wordCount(text);
}
