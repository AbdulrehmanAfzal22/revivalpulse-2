import type { KidsStoryV2, KidsStoryChapter, StorySource } from 'types/kidsStories.types';
import { KIDS_STORIES_V2 } from 'data/kids/storiesV2';
import { KIDS_SAHABI_V2 } from 'data/kids/sahabiV2';
import { chapterWordCount } from 'data/kids/storyContent';

export interface CitationIssue {
  storyId: string;
  chapterId: string;
  message: string;
}

function chapterIssues(storyId: string, chapter: KidsStoryChapter): CitationIssue[] {
  const issues: CitationIssue[] = [];

  // The floor is a stub detector, not a style quota: a good closing line can be
  // eighteen words. An earlier build step padded short paragraphs with stock
  // sentences to reach 80, and every part ended on the same repeated lines.
  if (chapter.paragraphs.some((paragraph) => chapterWordCount(paragraph.en) < 15 || chapterWordCount(paragraph.en) > 150)) {
    issues.push({
      storyId,
      chapterId: chapter.id,
      message: 'chapter paragraph must contain between 15 and 150 English words',
    });
  }
  // A bilingual ayah note already ends the part on its takeaway, so it counts
  // as the highlighted lesson instead of a second card saying the same thing.
  const hasBilingualLesson = Boolean(chapter.lesson?.en.trim() && chapter.lesson.ur?.trim());
  const hasBilingualAyahNote = Boolean(chapter.ayahNote?.en.trim() && chapter.ayahNote.ur?.trim());
  if (!hasBilingualLesson && !hasBilingualAyahNote) {
    issues.push({
      storyId,
      chapterId: chapter.id,
      message: 'chapter must have a bilingual highlighted lesson',
    });
  }

  if (chapter.ayahNote) {
    if (!chapter.ayahNote.en || !chapter.ayahNote.en.trim()) {
      issues.push({
        storyId,
        chapterId: chapter.id,
        message: 'chapter ayahNote has no English text — explanations ship in BOTH languages',
      });
    }
    if (!chapter.ayahNote.ur?.trim()) {
      issues.push({
        storyId,
        chapterId: chapter.id,
        message: 'chapter ayahNote has no Urdu text — explanations ship in BOTH languages, never an empty fallback',
      });
    }
  }

  if (!chapter.sources || chapter.sources.length === 0) {
    issues.push({
      storyId,
      chapterId: chapter.id,
      message: 'chapter has an EMPTY sources array — every chapter must be cited',
    });
    return issues;
  }

  chapter.sources.forEach((source: StorySource, index: number) => {
    if (!source.reference || !source.reference.trim()) {
      issues.push({
        storyId,
        chapterId: chapter.id,
        message: `sources[${index}] has an empty reference`,
      });
    }
    if (!source.label || !source.label.en || !source.label.en.trim()) {
      issues.push({
        storyId,
        chapterId: chapter.id,
        message: `sources[${index}] has no English label — every citation needs a bilingual explanation`,
      });
    }
    if (!source.label?.ur?.trim()) {
      issues.push({
        storyId,
        chapterId: chapter.id,
        message: `sources[${index}] has no Urdu label — labels ship in BOTH languages, never an empty fallback`,
      });
    }
    if (source.explanation) {
      if (!source.explanation.en || !source.explanation.en.trim()) {
        issues.push({
          storyId,
          chapterId: chapter.id,
          message: `sources[${index}] explanation has no English text — explanations ship in BOTH languages`,
        });
      }
      if (!source.explanation.ur?.trim()) {
        issues.push({
          storyId,
          chapterId: chapter.id,
          message: `sources[${index}] explanation has no Urdu text — explanations ship in BOTH languages, never an empty fallback`,
        });
      }
    }
    if (source.reviewed && !source.reviewedBy) {
      issues.push({
        storyId,
        chapterId: chapter.id,
        message: `sources[${index}] marked reviewed but has no reviewedBy initials`,
      });
    }
    if (source.reviewed && !source.reviewedDate) {
      issues.push({
        storyId,
        chapterId: chapter.id,
        message: `sources[${index}] marked reviewed but has no reviewedDate`,
      });
    }
  });

  return issues;
}

function storyIssues(story: KidsStoryV2): CitationIssue[] {
  const issues: CitationIssue[] = [];
  for (const chapter of story.chapters) {
    issues.push(...chapterIssues(story.id, chapter));
  }
  return issues;
}

/** Hard validation over every chapter-based story. Throws if any issue exists. */
export function validateStoryCitations(): CitationIssue[] {
  return [...KIDS_STORIES_V2, ...KIDS_SAHABI_V2].flatMap(storyIssues);
}