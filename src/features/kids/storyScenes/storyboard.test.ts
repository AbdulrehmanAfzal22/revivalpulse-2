import { KIDS_STORIES_V2 } from 'data/kids/storiesV2';
import { KIDS_SAHABI_V2 } from 'data/kids/sahabiV2';
import { resolvePanelScenes, resolveScene } from './scenes';
import { storyboardFor } from './storyboard';
import { STAGE_PLACEMENT } from './StoryboardSet';

describe('whole-story illustration planning', () => {
  it('never reuses the full subject/set/pose combination anywhere in the library', () => {
    const seen = new Set<string>();
    for (const story of [...KIDS_STORIES_V2, ...KIDS_SAHABI_V2]) for (const chapter of story.chapters) {
      const panels = [{id: 'cover', spec: resolveScene(chapter, story.illustrationSymbol)},
        ...resolvePanelScenes(chapter, story.illustrationSymbol, story.id).map(({spec}, i) => ({id: `p${i}`, spec}))];
      for (const {id, spec} of panels) {
        const shot = storyboardFor(`${story.id}/${chapter.id}/${id}`)!;
        const key = `${spec.motif}/${shot.stage}/${shot.pose}`;
        expect(seen.has(key)).toBe(false);
        seen.add(key);
      }
    }
    expect(seen.size).toBe(1710);
  });
  it.each([...KIDS_STORIES_V2, ...KIDS_SAHABI_V2].map(s => [s.id, s] as const))(
    '%s has a separate composition for every return to a subject, including covers',
    (_id, story) => {
      const seen = new Map<string, string>();
      let previousStage: string | undefined;
      for (const chapter of story.chapters) {
        const panels = [
          { id: 'cover', spec: resolveScene(chapter, story.illustrationSymbol) },
          ...resolvePanelScenes(chapter, story.illustrationSymbol, story.id).map(({spec}, i) => ({id: `p${i}`, spec})),
        ];
        for (const {id, spec} of panels) {
          const seed = `${story.id}/${chapter.id}/${id}`;
          const shot = storyboardFor(seed);
          expect(shot).toBeDefined();
          expect(spec.art).toBeDefined();
          const key = `${spec.motif}/${shot!.stage}`;
          expect(seen.get(key)).toBeUndefined();
          expect(shot!.stage).not.toBe(previousStage);
          seen.set(key, seed);
          previousStage = shot!.stage;
          const box = STAGE_PLACEMENT[shot!.stage];
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.y).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(960);
          expect(box.y + box.height).toBeLessThanOrEqual(540);
        }
      }
    },
  );
});
