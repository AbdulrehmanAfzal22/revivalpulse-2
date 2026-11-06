import NarrativeScene from './NarrativeScene';
import { useId, type CSSProperties } from 'react';
import { MOTIFS } from 'features/kids/storyScenes/motifs';
import { buildPalette, mix } from 'features/kids/storyScenes/sceneTypes';
import type { SceneSpec } from 'features/kids/storyScenes/sceneTypes';
import {
  bankPath,
  framing,
  groundDetail,
  place,
  propOf,
  ridgePath,
  sunPosition,
  variationFor,
} from 'features/kids/storyScenes/sceneVariation';
import styles from './StoryScene.module.css';

/** Possible star positions; the panel's seed picks how many and jitters each. */
const STAR_FIELD: Array<[number, number, number]> = [
  [42, 30, 2.2], [78, 52, 1.6], [116, 24, 2.6], [152, 58, 1.8], [188, 30, 2.4],
  [224, 62, 1.6], [262, 26, 2.2], [292, 58, 1.8], [64, 84, 1.5], [246, 92, 1.5],
];

export interface StorySceneProps {
  scene: SceneSpec;
  /** The story's accent colour, so a Nuh scene and an Ibrahim scene stay distinct. */
  accent: string;
  /** Painted backdrop layered under the vector art, when one exists. */
  painting?: string;
  /**
   * Which panel this is (`yusuf/the-dream/p2`). Every scene is drawn from its
   * own seed, so two panels that share a subject never share a picture.
   */
  seed?: string;
  /**
   * How many times this scene has already been drawn in the same part. The
   * second ark is shown from further off than the first, so a subject that
   * returns is not the same shot twice.
   */
  frame?: number;
  className?: string;
}

/**
 * The picture for one part of a story: layered, animated landscape art drawn
 * entirely in SVG, with no people or faces in it.
 */
export default function StoryScene({ scene, accent, painting, seed, frame = 0, className }: StorySceneProps) {
  const uid = useId().replace(/:/g, '');
  const variation = variationFor(seed ?? `${scene.motif}|${scene.sky}|${scene.ground}`);
  const p = buildPalette(scene.sky, scene.ground, accent, variation.tint);
  const Motif = MOTIFS[scene.motif];
  const night = scene.sky === 'night' || scene.sky === 'dusk';
  const starCount =
    scene.sky === 'night' ? variation.stars : scene.sky === 'dusk' ? 3 + (variation.ridge % 3) : 0;
  const sun = sunPosition(scene.sky, variation);
  const detail = groundDetail(scene.ground, variation);

  // The focal object stands on the same ground line however it is scaled, and
  // some panels read it mirrored, which doubles the shapes on offer.
  const shot = framing(frame, variation);
  const stand = `translate(${(160 - 160 * shot.scale + shot.dx).toFixed(1)} ${(150 - 150 * shot.scale).toFixed(1)}) scale(${shot.scale})`;
  const motifTransform = shot.flip || propOf(variation, 15) > 0.72 ? `translate(320 0) scale(-1 1) ${stand}` : stand;

  if (!painting && scene.art) {
    return <NarrativeScene scene={scene} accent={accent} seed={seed ?? `${scene.motif}/${frame}`} frame={frame} className={className} />;
  }

  return (
    <div
      className={[styles.scene, className].filter(Boolean).join(' ')}
      role="img"
      aria-label={scene.alt}
      style={{ '--scene-accent': accent } as CSSProperties}
    >
      {painting && (
        <img className={styles.painting} src={painting} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      )}
      <svg className={styles.art} viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.skyTop} />
            <stop offset="100%" stopColor={p.skyBottom} />
          </linearGradient>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={p.sunGlow} stopOpacity="0.95" />
            <stop offset="100%" stopColor={p.sunGlow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-ground`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.ridgeNear} />
            <stop offset="100%" stopColor={p.groundShadow} />
          </linearGradient>
        </defs>

        {/* A painting already pictures this scene, so the vector backdrop and
            its motif step aside instead of drawing a second ark over it. */}
        {!painting && (
          <>
            <rect width="320" height="180" fill={`url(#${uid}-sky)`} />

            {scene.sky === 'night' && (
              <g className={styles.glowDisc}>
                <circle cx={sun.x} cy={sun.y} r={sun.r} fill={`url(#${uid}-glow)`} />
              </g>
            )}
            {(scene.sky === 'day' || scene.sky === 'dawn') && (
              <g>
                <circle cx={sun.x} cy={sun.y} r={sun.r + 30} fill={`url(#${uid}-glow)`} />
                <circle cx={sun.x} cy={sun.y} r={sun.r} fill={p.sunGlow} />
              </g>
            )}
            {scene.sky === 'dusk' && (
              <g>
                <circle cx={sun.x} cy={sun.y} r={sun.r + 26} fill={`url(#${uid}-glow)`} />
                <circle cx={sun.x} cy={sun.y} r={sun.r} fill={p.sunGlow} />
              </g>
            )}
            {scene.sky === 'storm' && (
              <g transform={`translate(${Math.round(place(propOf(variation, 11), -26, 26))} 0)`}>
                <g className={styles.cloudDrift}>
                  <path d="M-10 44 C 30 22 78 30 110 44 C 150 26 210 30 246 46 C 286 30 320 40 336 52 L336 0 L-10 0 Z" fill={mix(p.skyTop, '#1c2534', 0.35)} opacity="0.85" />
                  <path d="M-10 62 C 40 44 96 54 140 64 C 190 48 250 56 300 68 L336 68 L336 40 L-10 40 Z" fill={mix(p.skyTop, '#28364a', 0.3)} opacity="0.7" />
                </g>
              </g>
            )}

            {starCount > 0 && (
              <g>
                {STAR_FIELD.slice(0, starCount).map(([x, y, r], i) => (
                  <circle
                    key={`st-${i}`}
                    className={styles.twinkle}
                    cx={Math.round(x + place(propOf(variation, i), -14, 14))}
                    cy={Math.round(y + place(propOf(variation, i + 5), -8, 8))}
                    r={Number((r * place(propOf(variation, i + 10), 0.7, 1.4)).toFixed(2))}
                    fill={p.star}
                    style={{ animationDelay: `${i * 0.4}s` }}
                  />
                ))}
              </g>
            )}

            <path d={ridgePath(variation)} fill={p.ridgeFar} opacity={night ? 0.55 : 0.85} />
            <path d={bankPath(variation)} fill={p.ridgeNear} />

            {scene.ground === 'sea' ? (
              <g>
                <rect y="132" width="320" height="48" fill={`url(#${uid}-ground)`} />
                <g transform={`translate(${Math.round(place(propOf(variation, 9), -40, 0))} ${Math.round(place(propOf(variation, 12), -3, 3))})`}>
                  <g className={styles.waveShift}>
                    <path d="M0 140 q 20 -8 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" stroke={p.waterLight} strokeWidth="3" fill="none" opacity="0.7" />
                    <path d="M0 156 q 20 -8 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" stroke={p.waterLight} strokeWidth="3" fill="none" opacity="0.45" />
                  </g>
                </g>
              </g>
            ) : (
              <g>
                <path
                  d={`M0 ${Math.round(150 + place(propOf(variation, 13), -6, 6))} C 60 140 120 156 176 148 C 232 140 280 154 320 146 L320 180 L0 180 Z`}
                  fill={`url(#${uid}-ground)`}
                />
                {detail.kind !== 'none' && (
                  <path
                    d={detail.path}
                    stroke={
                      detail.kind === 'grass'
                        ? p.foliage
                        : detail.kind === 'dunes'
                          ? mix(p.ridgeNear, '#ffffff', 0.25)
                          : p.stoneDark
                    }
                    strokeWidth={detail.kind === 'dunes' ? 2.5 : 4}
                    strokeLinecap={detail.kind === 'dunes' ? 'butt' : 'round'}
                    fill="none"
                    opacity={detail.kind === 'dunes' ? 0.6 : 0.75}
                  />
                )}
              </g>
            )}

            <g transform={motifTransform}>
              <g className={scene.ground === 'sea' ? styles.bobOnWater : styles.breathe}>
                {Motif ? Motif(p, variation) : null}
              </g>
            </g>
          </>
        )}
      </svg>
      <div className={styles.vignette} aria-hidden="true" />
    </div>
  );
}
