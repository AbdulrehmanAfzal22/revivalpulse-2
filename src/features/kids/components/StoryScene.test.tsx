import { render } from '@testing-library/react';
import StoryScene from 'features/kids/components/StoryScene';
import { SCENES, SCENE_KEYS } from 'features/kids/storyScenes/scenes';
import type { StorySceneKey } from 'types/kidsStories.types';

/**
 * The picture a scene actually draws. The backdrop (sky, sun, ground) is the
 * same machinery for every scene, so only the motif group tells two subjects
 * apart — which is exactly what these tests are about.
 */
function motifMarkup(motif: StorySceneKey, frame = 0): { art: string; shot: string | null } {
  const { container } = render(
    <StoryScene scene={SCENES[motif]} accent="#2f8f6b" seed={`pilot/${motif}/p0`} frame={frame} />,
  );
  const drawn = container.querySelector('svg g[class*="breathe"], svg g[class*="bobOnWater"]');
  return {
    art: drawn?.innerHTML ?? '',
    shot: drawn?.parentElement?.getAttribute('transform') ?? null,
  };
}

describe('scene artwork', () => {
  it('draws something for every subject the resolver can pick', () => {
    SCENE_KEYS.forEach((key) => {
      const { art } = motifMarkup(key);
      expect(art.length).toBeGreaterThan(200);
      expect(art).not.toMatch(/NaN|undefined/);
    });
  });

  it('gives each subject its own picture, not one subject drawn twice', () => {
    const pictures = SCENE_KEYS.map((key) => motifMarkup(key).art);
    expect(new Set(pictures).size).toBe(SCENE_KEYS.length);
  });

  it('shows a subject that returns from a different distance', () => {
    const first = motifMarkup('ark', 0);
    const again = motifMarkup('ark', 1);
    expect(first.shot).not.toBe(again.shot);
    expect(first.art).toBe(again.art);
  });
});
