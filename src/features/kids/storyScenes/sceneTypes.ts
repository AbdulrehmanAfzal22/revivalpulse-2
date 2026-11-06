import type { ReactElement } from 'react';
import type { StorySceneKey } from 'types/kidsStories.types';
import type { SceneVariation } from './sceneVariation';

export type SceneSky = 'dawn' | 'day' | 'dusk' | 'night' | 'storm';
export type SceneGround = 'dunes' | 'sea' | 'valley' | 'green' | 'stone';

/**
 * How one subject is drawn: the panel's palette in, its own SVG group out.
 * Declared here so both motif files can use it without importing each other.
 */
export type MotifRenderer = (palette: ScenePalette, variation: SceneVariation) => ReactElement;

/** One scene's recipe: what the art looks like and the words that select it. */
export interface SceneSpec {
  /** Paragraph-specific art direction; absent on preserved legacy scenes. */
  art?: import('./contextualArt').NarrativeArt;
  sky: SceneSky;
  ground: SceneGround;
  motif: StorySceneKey;
  /** Lowercased fragments matched against the part title and opening lines. */
  keywords: string[];
  /** Optional painted backdrop layered under the vector art. */
  painting?: string;
  /** Shown to screen readers as the picture of this part. */
  alt: string;
}

/** Concrete colours for one rendered scene, blended with the story accent. */
export interface ScenePalette {
  skyTop: string;
  skyBottom: string;
  sunGlow: string;
  star: string;
  ridgeFar: string;
  ridgeNear: string;
  groundNear: string;
  groundShadow: string;
  ink: string;
  accent: string;
  accentSoft: string;
  wood: string;
  woodDark: string;
  cloth: string;
  stone: string;
  stoneDark: string;
  water: string;
  waterLight: string;
  foliage: string;
  metal: string;
}

interface SkyBase {
  top: string;
  bottom: string;
  glow: string;
  /** 0 = no stars, 1 = full night field. */
  stars: number;
}

const SKY: Record<SceneSky, SkyBase> = {
  dawn: { top: '#f7c78c', bottom: '#fdf1de', glow: '#ff9d5c', stars: 0 },
  day: { top: '#8cc6e8', bottom: '#e3f1f8', glow: '#ffd76e', stars: 0 },
  dusk: { top: '#3c4b74', bottom: '#d0808c', glow: '#f2a65a', stars: 0.35 },
  night: { top: '#0f1c31', bottom: '#2a3a52', glow: '#f4e3b0', stars: 1 },
  storm: { top: '#33465c', bottom: '#75889a', glow: '#cfd8e0', stars: 0 },
};

interface GroundBase {
  far: string;
  near: string;
  ink: string;
}

const GROUND: Record<SceneGround, GroundBase> = {
  dunes: { far: '#e8c78f', near: '#cfa364', ink: '#7c5a2e' },
  sea: { far: '#5b9bc0', near: '#2f6a92', ink: '#173f5c' },
  valley: { far: '#bccaa6', near: '#8fa877', ink: '#4c6135' },
  green: { far: '#abd48f', near: '#6fae6a', ink: '#33633a' },
  stone: { far: '#cdc1b4', near: '#9c8d7e', ink: '#5b4d40' },
};

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function parseHex(hex: string): [number, number, number] {
  const compact = hex.replace('#', '');
  const full = compact.length === 3 ? compact.split('').map((c) => c + c).join('') : compact;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** Blend `to` into `from` at ratio `t`, returned as a hex string. */
export function mix(from: string, to: string, t: number): string {
  const [r1, g1, b1] = parseHex(from);
  const [r2, g2, b2] = parseHex(to);
  const part = (a: number, b: number) => clampChannel(a + (b - a) * t).toString(16).padStart(2, '0');
  return `#${part(r1, r2)}${part(g1, g2)}${part(b1, b2)}`;
}

/**
 * Every scene is tinted toward the story's accent colour so a Nuh chapter
 * reads blue and a Ibrahim chapter reads amber even when they share shapes.
 */
export function buildPalette(sky: SceneSky, ground: SceneGround, accent: string, tint = 0): ScenePalette {
  const s = SKY[sky];
  const g = GROUND[ground];
  // A panel leaning warm pulls its props into the story colour; one leaning
  // cool pulls them toward slate, so a repeated subject is not a repeat.
  const leanTarget = tint > 0 ? accent : '#7f95b0';
  const leanRatio = 0.05 + Math.abs(tint) * 0.13;
  const lean = (color: string) => mix(color, leanTarget, leanRatio);
  const shade = (color: string, ratio = 0.22) => mix(mix(color, accent, ratio), leanTarget, Math.abs(tint) * 0.07);
  return {
    skyTop: mix(s.top, tint > 0 ? accent : '#243248', (sky === 'night' || sky === 'dusk' ? 0.14 : 0.1) + Math.abs(tint) * 0.07),
    skyBottom: mix(s.bottom, leanTarget, Math.abs(tint) * 0.08),
    sunGlow: mix(s.glow, accent, tint > 0 ? 0.16 : 0.06),
    star: mix('#fff7e0', accent, Math.abs(tint) * 0.12),
    ridgeFar: shade(g.far, 0.26),
    ridgeNear: shade(g.near, 0.26),
    groundNear: shade(g.near, 0.18),
    groundShadow: mix(shade(g.near, 0.18), '#000000', 0.22),
    ink: mix(g.ink, '#1c1712', 0.25),
    accent,
    accentSoft: mix(accent, '#ffffff', 0.55),
    wood: lean('#a9743f'),
    woodDark: lean('#7d5327'),
    cloth: lean('#f3e6cd'),
    stone: lean('#c3b6a6'),
    stoneDark: lean('#8d7f6f'),
    water: shade('#3f83a8', 0.16),
    waterLight: lean('#9fd6e8'),
    foliage: shade('#4e8a52', 0.2),
    metal: lean('#d9b45f'),
  };
}
