import type { KidsStoryV2, KidsStoryChapter, LocalizedText } from 'types/kidsStories.types';

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * The takeaway for a part that doesn't carry one.
 *
 * A chapter whose ayah note is already bilingual ends on that takeaway, so it
 * needs no invented second one — the reader would show the same thought twice.
 */
function makeLesson(story: KidsStoryV2, chapter: KidsStoryChapter): LocalizedText | undefined {
  const existing = chapter.lesson;
  if (existing?.en.trim() && existing.ur?.trim()) return existing;
  if (chapter.ayahNote?.en.trim() && chapter.ayahNote.ur?.trim()) return undefined;
  return {
    en: `${story.nameEnglish} shows us what ${chapter.title.en.toLowerCase()} really means: faith when it is hard, courage when it costs something, and kindness even when nobody returns it.`,
    ur: `${story.nameEnglish} ہمیں ایمان، ہمت، مہربانی اور سچائی کا خوبصورت درس دیتے ہیں۔`,
  };
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
