import { useEffect, useState } from 'react';
import type { StoryLanguage } from 'features/kids/hooks/useStoryLanguage';

/**
 * Recorded media for the story parts: a narrator clip and, optionally, a
 * painted picture for each paragraph.
 *
 * scripts/generateStoryNarration.mjs records the clips and indexes everything
 * in `/data/kidsStoryMedia.json`. Nothing else has to change when media lands:
 * a paragraph with a clip plays it and one without is read by the browser
 * voice; a paragraph with a painting shows it over the drawn scene and one
 * without keeps the scene art. The library can therefore be produced a few
 * parts at a time.
 */

const MANIFEST_URL = '/data/kidsStoryMedia.json';
const CLIP_ROOT = '/audio/kids/story';
const ART_ROOT = '/assets/kids/story-art';

export interface NarrationClips {
  en?: string;
  ur?: string;
}

/** One story's clips, keyed by panel scene id. */
export type StoryClips = Record<string, NarrationClips>;

/** One story's painted panels, keyed by panel scene id. */
export type StoryPaintings = Record<string, string>;

export interface StoryMediaManifest {
  narration?: Record<string, StoryClips>;
  paintings?: Record<string, StoryPaintings>;
}

const EMPTY: StoryMediaManifest = {};

let manifestPromise: Promise<StoryMediaManifest> | null = null;

/** Shared load; a missing inventory (nothing produced yet) is empty, not an error. */
export function loadStoryMedia(): Promise<StoryMediaManifest> {
  if (!manifestPromise) {
    manifestPromise = fetch(MANIFEST_URL)
      .then((response) => (response.ok ? response.json() : EMPTY))
      .then((manifest) => (manifest && typeof manifest === 'object' ? manifest : EMPTY))
      .catch(() => {
        manifestPromise = null;
        return EMPTY;
      });
  }
  return manifestPromise;
}

/** Paragraph panels are keyed `chapterId/p{index}`. */
export function panelSceneId(chapterId: string, paragraphIndex: number): string {
  return `${chapterId}/p${paragraphIndex}`;
}

/**
 * Recorded clip for one paragraph, in the language the child is reading.
 *
 * An untranslated paragraph has no Urdu clip — the English recording plays
 * instead, matching the on-screen English fallback.
 */
export function clipFor(storyId: string, storyClips: StoryClips | undefined, sceneId: string, language: StoryLanguage, allowEnglishFallback = true): string | null {
  const clips = storyClips?.[sceneId];
  if (!clips) return null;
  const file = language === 'ur' ? clips.ur ?? (allowEnglishFallback ? clips.en : undefined) : clips.en;
  return file ? `${CLIP_ROOT}/${storyId}/${sceneId}/${file}` : null;
}

/** Painted picture for one paragraph, or null so the drawn scene shows. */
export function paintingFor(storyId: string, paintings: StoryPaintings | undefined, sceneId: string): string | null {
  const file = paintings?.[sceneId];
  return file ? `${ART_ROOT}/${storyId}/${sceneId}/${file}` : null;
}

export interface StoryMedia {
  loading: boolean;
  storyClips: StoryClips | undefined;
  storyPaintings: StoryPaintings | undefined;
}

export function useStoryMedia(storyId: string): StoryMedia {
  const [manifest, setManifest] = useState<StoryMediaManifest | null>(null);

  useEffect(() => {
    let active = true;
    loadStoryMedia().then((loaded) => {
      if (active) setManifest(loaded);
    });
    return () => {
      active = false;
    };
  }, []);

  return {
    loading: manifest === null,
    storyClips: manifest?.narration?.[storyId],
    storyPaintings: manifest?.paintings?.[storyId],
  };
}
