import { clipFor, panelSceneId, paintingFor } from 'features/kids/storyScenes/storyMedia';
import { SCENES, resolvePanelScenes, resolveParagraphScene, resolveScene } from 'features/kids/storyScenes/scenes';
import { framing, variationFor, type SceneVariation } from 'features/kids/storyScenes/sceneVariation';
import { KIDS_SAHABI_V2 } from 'data/kids/sahabiV2';
import { KIDS_STORIES_V2 } from 'data/kids/storiesV2';
import type { KidsStoryChapter, StorySceneKey } from 'types/kidsStories.types';

// The opening lines of yusuf/the-dream and yusuf/into-the-well, so the scene
// choices below are the ones the app actually makes for that story.
const CHAPTER: KidsStoryChapter = {
  id: 'the-dream',
  scene: 'dreamSky',
  title: { en: 'A Wonderful Dream' },
  paragraphs: [
    { en: 'Yusuf lived in a big, loving family with his father Prophet Yaqub and eleven brothers.' },
    {
      en: 'One night Yusuf had a dream more wonderful than any dream he had ever had. He said: “Father, I have seen eleven stars, the sun and the moon bowing down to me.”',
    },
    {
      en: 'They set Yusuf far from home and lowered him into a dark, deep well, believing they would never see him again.',
    },
  ],
  sources: [],
};

describe('story panel media', () => {
  it('keys each paragraph as its own panel', () => {
    expect(panelSceneId('the-dream', 0)).toBe('the-dream/p0');
    expect(panelSceneId('the-dream', 12)).toBe('the-dream/p12');
  });

  it('points at the recorded clip for the reading language', () => {
    const clips = { 'the-dream/p1': { en: 'narration.en.mp3', ur: 'narration.ur.wav' } };
    expect(clipFor('yusuf', clips, 'the-dream/p1', 'en')).toBe('/audio/kids/story/yusuf/the-dream/p1/narration.en.mp3');
    expect(clipFor('yusuf', clips, 'the-dream/p1', 'ur')).toBe('/audio/kids/story/yusuf/the-dream/p1/narration.ur.wav');
  });

  it('falls back to the English clip where a paragraph has no Urdu', () => {
    const clips = { 'the-dream/p0': { en: 'narration.en.mp3' } };
    expect(clipFor('yusuf', clips, 'the-dream/p0', 'ur')).toBe('/audio/kids/story/yusuf/the-dream/p0/narration.en.mp3');
  });

  it('resolves nothing when the panel has no produced media', () => {
    expect(clipFor('yusuf', undefined, 'the-dream/p0', 'en')).toBeNull();
    expect(paintingFor('yusuf', undefined, 'the-dream/p0')).toBeNull();
  });

  it('does not play English audio over a translated Urdu paragraph', () => {
    const clips = { 'the-dream/p0': { en: 'narration.en.mp3' } };
    expect(clipFor('yusuf', clips, 'the-dream/p0', 'ur', false)).toBeNull();
  });

  it('shows a painted panel over the drawn scene', () => {
    expect(paintingFor('yusuf', { 'the-dream/p2': 'image.webp' }, 'the-dream/p2')).toBe(
      '/assets/kids/story-art/yusuf/the-dream/p2/image.webp',
    );
  });
});

describe('per-paragraph scene art', () => {
  const paragraphEnglish = (index: number) => CHAPTER.paragraphs[index]?.en ?? '';
  const sceneOf = (index: number, used?: StorySceneKey[]) =>
    resolveParagraphScene(CHAPTER, paragraphEnglish(index), 'Star', used);

  it('draws each paragraph from its own words', () => {
    expect(sceneOf(1).motif).toBe('dreamSky');
    expect(sceneOf(2).motif).toBe('well');
  });

  it('keeps a scene that is about the same subject again, rather than showing an unrelated one', () => {
    // The second dream sentence is still the dream; a crescent over the dunes
    // would be a different picture but a worse match, so the words win.
    expect(sceneOf(1, ['dreamSky']).motif).toBe('dreamSky');
  });

  it('still gives every paragraph of a part its own picture', () => {
    const seen = new Set<string>();
    resolvePanelScenes(CHAPTER, 'Star').forEach((panel, index) => {
      // Subject, light and shot distance together are what a child sees.
      const picture = `${panel.spec.motif}|${panel.spec.sky}|${panel.frame}`;
      expect(seen.has(picture)).toBe(false);
      seen.add(picture);
      expect(index).toBeLessThan(CHAPTER.paragraphs.length);
    });
  });

  /** Each of these describes a different situation, so each needs its own picture. */
  const SITUATIONS: Array<[string, StorySceneKey]> = [
    ['They travelled a long road until they reached the city.', 'desertRoad'],
    ['A caravan of camels crossed the dunes at last light.', 'caravan'],
    ['They sold him for a low price in the market.', 'market'],
    ['He stored grain for the years when there would be nothing to eat.', 'granary'],
    ['Even in prison he stayed calm and kind to the men beside him.', 'prisonWindow'],
    ['Seven green ears of grain grew where seven dry ones had stood.', 'wheatField'],
    ['Seven fat cows came up to the water, and seven thin ones ate them.', 'cattle'],
    ['Water burst from the rock and a pool filled the dry valley.', 'springRock'],
    ['They laid a mat down and stood in prayer before dawn.', 'prayerMat'],
    ['She taught him to read, and he wrote every lesson on a page.', 'inkwell'],
    ['Every kind deed is a seed that grows into something far bigger.', 'sownField'],
    ['They tore his robe and brought the broken thing to their father.', 'tornRobe'],
    ['Nothing was left of the proud town but stones in the sand.', 'ruinedColumns'],
    ['They hewed fine homes straight into the side of the mountain.', 'carvedHomes'],
    ['The Prophet placed the flag in his hand and he carried it forward.', 'banner'],
    ['Their strong forts rose on the rocky ridge above the valley.', 'fortress'],
    ['A small army stood against many enemies and won a wonderful victory.', 'armyLines'],
    ['He grew up in a big family, in a house with a flat roof and a shade tree.', 'homeYard'],
  ];

  SITUATIONS.forEach(([text, expected]) => {
    it(`pictures "${text.slice(0, 34)}…" as ${expected}`, () => {
      expect(resolveParagraphScene(CHAPTER, text, 'Star').motif).toBe(expected);
    });
  });

  it('shows the place a paragraph names, not only the feeling inside it', () => {
    // "Patiently" is a mood, "the flood" is the event — and the event is the picture.
    expect(resolveParagraphScene(CHAPTER, 'They waited patiently while the flood rose over them.', 'Star').motif).toBe('floodWater');
  });

  it('does not replace a repeated subject with an unrelated metaphor', () => {
    const text = 'Knowledge is one of the greatest gifts: it made him a light for his people.';
    expect(resolveParagraphScene(CHAPTER, text, 'Star', ['inkwell', 'inkwell', 'balance']).motif).toBe('inkwell');
  });

  it('changes the light only when the words say a time', () => {
    // No cycling a picture through morning and night to make it look new: the
    // paragraph either states its hour, or the scene keeps its own.
    expect(resolveParagraphScene(CHAPTER, 'The market opened at dawn.', 'Star').sky).toBe('dawn');
    expect(resolveParagraphScene(CHAPTER, 'The market was full of jars.', 'Star').sky).toBe(SCENES.market.sky);
  });

  it('keeps the chapter scene as the last resort', () => {
    // A sentence with nothing in it a picture could be drawn from.
    expect(resolveParagraphScene(CHAPTER, 'He lived a long life.', 'Star').motif).toBe(resolveScene(CHAPTER, 'Star').motif);
  });
});

describe('per-panel variation', () => {
  it('draws the same seed the same way every time', () => {
    expect(variationFor('yusuf/the-dream/p1')).toEqual(variationFor('yusuf/the-dream/p1'));
  });

  it('draws two panels of the same scene differently', () => {
    const first = variationFor('yusuf/the-dream/p1');
    const second = variationFor('musaa/the-dream/p1');
    const signature = (v: SceneVariation) => `${v.ridge}|${v.sunX}|${v.sunY}|${v.tint}|${v.motifDx}|${v.motifScale}|${v.stars}`;
    expect(signature(first)).not.toBe(signature(second));
  });

  it('shows a subject that returns from a different distance', () => {
    const v = variationFor('nuh/the-ark-command/p1');
    expect(framing(1, v).scale).not.toBe(framing(0, v).scale);
    expect(framing(2, v).dx).not.toBe(framing(0, v).dx);
  });

  it('never shows one part the same picture twice, across the whole library', () => {
    const offenders: string[] = [];
    [...KIDS_STORIES_V2, ...KIDS_SAHABI_V2].forEach((story) => {
      story.chapters.forEach((chapter) => {
        const seen = new Set<string>();
        resolvePanelScenes(chapter, story.illustrationSymbol).forEach((panel) => {
          const picture = `${panel.spec.motif}|${panel.spec.sky}|${panel.frame}`;
          if (seen.has(picture)) offenders.push(`${story.id}/${chapter.id} -> ${picture}`);
          seen.add(picture);
        });
      });
    });
    expect(offenders).toEqual([]);
  });
});
