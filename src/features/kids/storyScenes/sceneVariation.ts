import type { SceneGround, SceneSky } from './sceneTypes';

/**
 * One panel's worth of small differences.
 *
 * The library has 1336 panels and only 26 subjects to draw, so without this
 * the same frame would repeat dozens of times over — the crescent-and-dunes
 * picture alone was used on 274 panels. Every panel derives its own numbers
 * from its id, so two paragraphs of the same scene still get a different sky,
 * a different horizon, and a differently placed sun and motif.
 */
export interface SceneVariation {
  /** Optional paragraph-directed pose for the native narrative renderer. */
  narrativePose?: string;
  /** Which of the horizon silhouettes is cut. */
  ridge: 0 | 1 | 2;
  sunX: number;
  sunY: number;
  sunR: number;
  /** Sideways lean of the focal object, in viewBox units. */
  motifDx: number;
  /** Kept close to 1 so the object never grows out of its frame. */
  motifScale: number;
  /** How many stars are scattered across a night sky. */
  stars: number;
  /** -1..1, nudges the palette toward cooler or warmer. */
  tint: number;
  /** Raw values for the motifs that repeat props (trees, birds, coins). */
  props: number[];
}

/** FNV-1a: a stable 32-bit hash, so a panel always draws the same way. */
function hashText(text: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32 — small, deterministic, and good enough to place a sun. */
function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VARIATION_CACHE = new Map<string, SceneVariation>();

/** `yusuf/the-dream/p2` always produces the same numbers, on every render. */
export function variationFor(seed: string): SceneVariation {
  const cached = VARIATION_CACHE.get(seed);
  if (cached) return cached;

  const random = seededRandom(hashText(seed));
  const between = (from: number, to: number) => from + random() * (to - from);

  const variation: SceneVariation = {
    ridge: Math.floor(between(0, 3)) as 0 | 1 | 2,
    sunX: Math.round(between(198, 286)),
    sunY: Math.round(between(30, 58)),
    sunR: Math.round(between(13, 20)),
    motifDx: Math.round(between(-24, 24)),
    motifScale: Number(between(0.9, 1.12).toFixed(3)),
    stars: Math.round(between(4, 10)),
    tint: Number(between(-1, 1).toFixed(3)),
    props: Array.from({ length: 16 }, () => Number(random().toFixed(4))),
  };

  VARIATION_CACHE.set(seed, variation);
  return variation;
}

/** A prop value for repeated elements, wrapped so any index is safe. */
export function propOf(variation: SceneVariation, index: number): number {
  return variation.props[index % variation.props.length] ?? 0.5;
}

/** Between `from` and `to`, driven by one prop value. */
export function place(prop: number, from: number, to: number): number {
  return from + prop * (to - from);
}

/**
 * Where the light sits. A dusk sun is on the horizon and a night sky has no
 * disc at all, so the variation's own height only applies to the daytime
 * skies; the evening keeps its low arc and the night keeps its moon.
 */
export function sunPosition(sky: SceneSky, variation: SceneVariation): { x: number; y: number; r: number } {
  if (sky === 'dusk') return { x: variation.sunX, y: place(propOf(variation, 4), 96, 112), r: variation.sunR - 2 };
  if (sky === 'night') return { x: variation.sunX, y: place(propOf(variation, 5), 34, 58), r: variation.sunR + 22 };
  return { x: variation.sunX, y: variation.sunY, r: variation.sunR };
}

/**
 * The horizon under the motif. Three silhouettes, each slid sideways by the
 * seed, so the ground line is never repeated either.
 */
const RIDGES: readonly [string, string, string] = [
  'M0 118 L52 92 L96 112 L140 86 L196 116 L246 90 L292 114 L320 100 L320 180 L0 180 Z',
  'M0 126 L64 96 L118 120 L158 88 L206 118 L268 94 L320 122 L320 180 L0 180 Z',
  'M0 112 C 40 96 74 118 112 104 C 152 90 186 116 226 100 C 266 84 296 110 320 98 L320 180 L0 180 Z',
];

export function ridgePath(variation: SceneVariation): string {
  return RIDGES[variation.ridge];
}

/** The near bank the motif stands on, also sliding with the seed. */
export function bankPath(variation: SceneVariation): string {
  const lift = place(propOf(variation, 6), -6, 6);
  return `M0 ${136 + lift} C 46 ${122 + lift} 92 ${132 + lift} 138 ${136 + lift} C 190 ${140 + lift} 244 ${126 + lift} 320 ${138 + lift} L320 180 L0 180 Z`;
}

/**
 * How near the focal object is shown. A part that comes back to the same
 * subject should not show it from the same distance twice either, so the number
 * of times this picture has already appeared in the part picks the framing:
 * level with the seed, close enough to crop, or far off and small.
 */
type Shot = { near: number; shift: number; flip: boolean };

const FRAMINGS: readonly [Shot, Shot, Shot, Shot] = [
  { near: 1, shift: 0, flip: false },
  { near: 1.3, shift: -20, flip: false },
  { near: 0.62, shift: 54, flip: false },
  { near: 1.1, shift: 26, flip: true },
];

export function framing(frame: number, variation: SceneVariation): { scale: number; dx: number; flip: boolean } {
  const preset = FRAMINGS[(Math.abs(Math.trunc(frame)) % FRAMINGS.length) as 0 | 1 | 2 | 3];
  return {
    scale: Math.min(1.4, Math.max(0.5, variation.motifScale * preset.near)),
    dx: variation.motifDx + preset.shift,
    flip: preset.flip,
  };
}

/** Ground texture: only the pattern that belongs to this kind of ground. */
export function groundDetail(
  ground: SceneGround,
  variation: SceneVariation,
): { kind: 'grass' | 'dunes' | 'stone' | 'none'; path: string } {
  const shift = place(propOf(variation, 2), -14, 14);
  if (ground === 'green') {
    const blade = (x: number, up: number) => `M${Math.round(x)} 168 v-${up}`;
    const xs = [28, 44, 60, 262, 278, 294].map((x, i) => x + shift * (i % 2 ? -0.4 : 0.4));
    return { kind: 'grass', path: xs.map((x, i) => blade(x, 8 + Math.round(propOf(variation, i) * 4))).join(' ') };
  }
  if (ground === 'dunes') {
    const swell = place(propOf(variation, 3), 26, 54);
    return { kind: 'dunes', path: `M${Math.round(-40 + shift)} 164 q ${Math.round(swell / 2)} -10 ${Math.round(swell)} 0 t ${Math.round(swell)} 0 t ${Math.round(swell)} 0 t ${Math.round(swell)} 0 t ${Math.round(swell)} 0` };
  }
  if (ground === 'stone') {
    const rock = (x: number, width: number) => `M${Math.round(x)} 166 h${width}`;
    const xs = [34, 74, 210, 254].map((x, i) => x + shift * (i % 2 ? 0.5 : -0.5));
    return { kind: 'stone', path: xs.map((x, i) => rock(x, 14 + Math.round(propOf(variation, i) * 10))).join(' ') };
  }
  return { kind: 'none', path: '' };
}
