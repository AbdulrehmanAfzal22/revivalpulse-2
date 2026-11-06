import type { ReactElement } from 'react';
import type { BaseStorySceneKey, StorySceneKey } from 'types/kidsStories.types';
import { mix, type MotifRenderer, type ScenePalette } from './sceneTypes';
import { place, propOf, type SceneVariation } from './sceneVariation';
import { NARRATIVE_MOTIFS } from './narrativeMotifs';
import { EXTENDED_MOTIFS } from './motifsExtended';

const STROKE = 2.5;

/** A spot for a repeated prop: three of the panel's numbers per index. */
function scatter(
  v: SceneVariation,
  index: number,
  xFrom: number,
  xTo: number,
  yFrom: number,
  yTo: number,
): { x: number; y: number; r: number } {
  return {
    x: Math.round(place(propOf(v, index * 3), xFrom, xTo)),
    y: Math.round(place(propOf(v, index * 3 + 1), yFrom, yTo)),
    r: Number(place(propOf(v, index * 3 + 2), 5, 8).toFixed(1)),
  };
}

function palmTree(p: ScenePalette, x: number, baseY: number, s: number, key: string): ReactElement {
  return (
    <g key={key} transform={`translate(${x} ${baseY}) scale(${s})`}>
      <path d="M0 0 C -2 -14 -1 -26 2 -36" stroke={p.woodDark} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M2 -36 C -10 -40 -16 -34 -19 -27" stroke={p.foliage} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M2 -36 C 14 -40 20 -34 23 -27" stroke={p.foliage} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M2 -36 C -4 -47 -12 -48 -18 -45" stroke={p.foliage} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M2 -36 C 8 -47 16 -48 22 -45" stroke={p.foliage} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M2 -36 C 2 -48 4 -52 6 -55" stroke={p.foliage} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="-2" cy="-32" r="2.4" fill={p.metal} />
      <circle cx="6" cy="-31" r="2.4" fill={p.metal} />
    </g>
  );
}

function star(p: ScenePalette, x: number, y: number, r: number, key: string): ReactElement {
  return (
    <path
      key={key}
      className="kids-scene-star"
      d={`M${x} ${y - r} L${x + r * 0.28} ${y - r * 0.28} L${x + r} ${y} L${x + r * 0.28} ${y + r * 0.28} L${x} ${y + r} L${x - r * 0.28} ${y + r * 0.28} L${x - r} ${y} L${x - r * 0.28} ${y - r * 0.28} Z`}
      fill={p.star}
    />
  );
}

type MountainRange = { body: string; caps: string };

/** Three skylines, so a mountain panel is never the same mountain twice. */
const MOUNTAIN_PEAKS: readonly [MountainRange, MountainRange, MountainRange] = [
  {
    body: 'M70 150 L134 66 L172 112 L200 78 L262 150 Z',
    caps: 'M134 66 L152 90 L134 96 L120 86 Z M200 78 L214 100 L198 106 L186 94 Z',
  },
  {
    body: 'M60 150 L112 82 L152 120 L198 58 L240 110 L272 150 Z',
    caps: 'M112 82 L128 104 L110 110 L98 96 Z M198 58 L214 82 L196 88 L184 74 Z',
  },
  {
    body: 'M74 150 L148 56 L184 106 L218 82 L268 150 Z',
    caps: 'M148 56 L166 84 L146 92 L132 74 Z M218 82 L232 102 L216 108 L204 94 Z',
  },
];

/**
 * Figure-free focal objects for each scene. Nothing here draws a person or a
 * face: the stories are told through places and objects, matching the rule
 * recorded in data/kids/stories.ts for prophet illustrations.
 *
 * `v` carries the panel's own numbers (see sceneVariation). A renderer that
 * ignores it is still leaned, scaled and mirrored by the frame that draws it;
 * the ones here use it to move their own repeated props, because a single
 * crescent picture was otherwise pasted onto 274 different panels.
 */
const BASE_MOTIFS: Record<BaseStorySceneKey, MotifRenderer> = {
  ark: (p, v) => (
    <g transform={`rotate(${Math.round(place(propOf(v, 8), -3, 3))} 160 128)`}>
      <path d="M62 120 C 78 108 242 108 258 120 C 244 142 210 150 160 150 C 110 150 76 142 62 120 Z" fill={p.wood} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M96 112 L96 92 L224 92 L224 112" fill={p.woodDark} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M124 92 L124 76 L196 76 L196 92" fill={p.wood} stroke={p.ink} strokeWidth={STROKE} />
      <line x1="160" y1="76" x2="160" y2="52" stroke={p.ink} strokeWidth="3" />
      <path d="M163 54 L192 70 L163 70 Z" fill={p.cloth} stroke={p.ink} strokeWidth="2" />
      <path d="M84 130 H236" stroke={p.ink} strokeWidth="1.5" opacity="0.45" />
      <path d="M112 100 H208 M132 84 H188" stroke={p.ink} strokeWidth="1.2" opacity="0.35" />
      <path
        d={`M${Math.round(place(propOf(v, 9), 20, 60))} 152 q 16 -8 32 0 t 32 0 t 32 0 t 32 0`}
        stroke={p.waterLight}
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
    </g>
  ),
  whale: (p, v) => (
    <g transform={`translate(${Math.round(place(propOf(v, 0), -20, 20))} 0)`}>
      <path d="M104 126 C 118 96 176 92 206 112 C 224 124 232 128 240 126 C 234 140 214 146 190 146 C 150 146 118 140 104 126 Z" fill={p.water} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M150 112 C 168 104 186 106 198 114" stroke={p.waterLight} strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M206 112 C 216 96 232 92 244 96 C 236 106 230 112 226 120" fill={p.water} stroke={p.ink} strokeWidth="2" />
      <circle cx="132" cy="124" r="3" fill={p.ink} />
      <path
        d={`M156 86 q ${Math.round(place(propOf(v, 1), 4, 9))} -14 0 -${Math.round(place(propOf(v, 2), 20, 30))}`}
        stroke={p.waterLight}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  ),
  flame: (p, v) => {
    const reach = place(propOf(v, 3), 0.86, 1.1);
    return (
      <g transform={`translate(0 ${(146 - 146 * reach).toFixed(1)}) scale(1 ${reach.toFixed(2)})`}>
        <path d="M160 40 C 196 78 206 104 196 124 C 184 146 136 146 124 124 C 114 104 124 78 160 40 Z" fill={p.accent} opacity="0.85" />
        <path d="M160 66 C 182 92 186 110 178 124 C 170 138 150 138 142 124 C 134 110 138 92 160 66 Z" fill={p.sunGlow} />
        <path d="M160 92 C 170 106 172 116 166 124 C 160 132 152 130 150 122 C 148 112 152 104 160 92 Z" fill={p.cloth} />
        <path d="M108 146 H212" stroke={p.ink} strokeWidth="4" strokeLinecap="round" />
        <path
          d={`M${Math.round(place(propOf(v, 4), 116, 140))} 138 q 4 -12 -2 -20 M${Math.round(place(propOf(v, 5), 180, 208))} 138 q 5 -12 -1 -22`}
          stroke={p.sunGlow}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.75"
        />
      </g>
    );
  },
  coolGarden: (p, v) => (
    <g>
      <path d="M92 146 C 96 96 120 66 160 60 C 200 66 224 96 228 146 Z" fill={p.accent} opacity="0.45" />
      <path d="M104 146 C 108 104 128 82 160 78 C 192 82 212 104 216 146 Z" fill={p.foliage} opacity="0.5" />
      {palmTree(p, Math.round(place(propOf(v, 6), 112, 140)), 146, place(propOf(v, 7), 0.72, 1.02), 'cg-l')}
      {palmTree(p, Math.round(place(propOf(v, 8), 182, 210)), 146, place(propOf(v, 9), 0.68, 0.96), 'cg-r')}
      {propOf(v, 10) > 0.5 && palmTree(p, Math.round(place(propOf(v, 11), 156, 176)), 146, place(propOf(v, 12), 0.5, 0.7), 'cg-mid')}
      <path d="M148 146 q 4 -18 12 -22 q 8 4 12 22" fill={p.accentSoft} opacity="0.9" />
      <circle cx="160" cy="118" r="7" fill={p.cloth} />
    </g>
  ),
  cave: (p, v) => (
    <g transform={`translate(${Math.round(place(propOf(v, 0), -14, 14))} 0)`}>
      <path d="M84 150 C 84 88 118 56 160 56 C 202 56 236 88 236 150 Z" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M120 150 C 120 108 136 90 160 90 C 184 90 200 108 200 150 Z" fill={p.stoneDark} />
      <path d="M134 150 C 136 118 146 104 160 104 C 174 104 184 118 186 150 Z" fill={mix(p.ink, '#000000', 0.35)} />
      <path d="M96 118 q 12 -10 20 -2" stroke={p.stoneDark} strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M204 122 q 10 -8 18 0" stroke={p.stoneDark} strokeWidth="3" fill="none" opacity="0.7" />
      <path
        d={`M${Math.round(place(propOf(v, 1), 92, 116))} 150 h${Math.round(place(propOf(v, 2), 10, 22))}`}
        stroke={p.stoneDark}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  ),
  well: (p, v) => (
    <g>
      <path d="M118 150 L118 116 L202 116 L202 150 Z" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
      <ellipse cx="160" cy="116" rx="42" ry="10" fill={p.stoneDark} stroke={p.ink} strokeWidth="2" />
      <ellipse cx="160" cy="116" rx="26" ry="6" fill={p.water} />
      <line x1="112" y1="116" x2="112" y2="72" stroke={p.woodDark} strokeWidth="4" />
      <line x1="208" y1="116" x2="208" y2="72" stroke={p.woodDark} strokeWidth="4" />
      <path d="M104 74 L216 74" stroke={p.woodDark} strokeWidth="5" strokeLinecap="round" />
      {/* The bucket hangs wherever the rope was last pulled. */}
      {(() => {
        const lean = Math.round(place(propOf(v, 4), -16, 16));
        const drop = Math.round(place(propOf(v, 5), 18, 30));
        return (
          <g transform={`translate(${lean} 0)`}>
            <line x1="160" y1="76" x2="160" y2={76 + drop} stroke={p.ink} strokeWidth="2" />
            <path d={`M150 ${76 + drop} L170 ${76 + drop} L166 ${92 + drop} L154 ${92 + drop} Z`} fill={p.wood} stroke={p.ink} strokeWidth="2" />
          </g>
        );
      })()}
      <path
        d={`M${Math.round(place(propOf(v, 6), 76, 96))} 152 h${Math.round(place(propOf(v, 7), 8, 18))} M${Math.round(place(propOf(v, 8), 218, 244))} 152 h${Math.round(place(propOf(v, 9), 8, 16))}`}
        stroke={p.stoneDark}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  ),
  palms: (p, v) => (
    <g>
      {palmTree(p, Math.round(place(propOf(v, 0), 104, 142)), 150, place(propOf(v, 1), 0.92, 1.22), 'pa-1')}
      {palmTree(p, Math.round(place(propOf(v, 2), 168, 204)), 150, place(propOf(v, 3), 0.74, 1.04), 'pa-2')}
      {palmTree(p, Math.round(place(propOf(v, 4), 206, 248)), 150, place(propOf(v, 5), 0.54, 0.82), 'pa-3')}
      {propOf(v, 6) > 0.45 && palmTree(p, Math.round(place(propOf(v, 7), 62, 96)), 150, place(propOf(v, 8), 0.44, 0.64), 'pa-4')}
      <path
        d={`M${Math.round(place(propOf(v, 9), 82, 108))} 150 q ${Math.round(place(propOf(v, 10), 22, 40))} -10 ${Math.round(place(propOf(v, 11), 48, 70))} -2 q ${Math.round(place(propOf(v, 12), 26, 46))} 8 ${Math.round(place(propOf(v, 13), 50, 78))} -2`}
        stroke={p.foliage}
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />
    </g>
  ),
  kaaba: (p, v) => (
    <g>
      <path d="M120 148 L120 84 L200 84 L200 148 Z" fill={mix(p.ink, '#101010', 0.5)} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M120 84 L138 68 L218 68 L200 84 Z" fill={mix(p.stone, '#222222', 0.6)} stroke={p.ink} strokeWidth="2" />
      <path d="M200 84 L218 68 L218 132 L200 148 Z" fill={mix(p.ink, '#000000', 0.6)} />
      <path d="M120 104 L200 104" stroke={p.metal} strokeWidth="7" />
      <path d="M152 148 L152 122 L176 122 L176 148 Z" fill={p.metal} stroke={p.ink} strokeWidth="2" />
      <path
        d={`M${Math.round(place(propOf(v, 4), 74, 92))} 152 h${Math.round(place(propOf(v, 5), 10, 20))} M${Math.round(place(propOf(v, 6), 226, 250))} 152 h${Math.round(place(propOf(v, 7), 10, 22))}`}
        stroke={p.stoneDark}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </g>
  ),
  tent: (p, v) => {
    const spread = place(propOf(v, 0), 0.82, 1.18);
    const height = place(propOf(v, 1), 0.86, 1.12);
    return (
      <g transform={`translate(${(160 - 160 * spread).toFixed(1)} ${(146 - 146 * height).toFixed(1)}) scale(${spread.toFixed(2)} ${height.toFixed(2)})`}>
        <path d="M96 146 L160 74 L224 146 Z" fill={p.cloth} stroke={p.ink} strokeWidth={STROKE} />
        <path d="M160 74 L160 146" stroke={p.ink} strokeWidth="2" opacity="0.5" />
        <path d="M140 146 C 144 120 176 120 180 146 Z" fill={p.accent} opacity="0.75" />
        <path d="M96 146 L112 132 L128 146" stroke={p.ink} strokeWidth="2" fill="none" opacity="0.6" />
        <line x1="160" y1="66" x2="160" y2="74" stroke={p.ink} strokeWidth="3" />
        <circle cx="160" cy="64" r="3" fill={p.metal} />
        {propOf(v, 2) > 0.4 && (
          <path
            d={`M${Math.round(place(propOf(v, 3), 232, 258))} 146 l 6 -${Math.round(place(propOf(v, 4), 14, 26))} l 12 0 l -6 ${Math.round(place(propOf(v, 5), 14, 26))} Z`}
            fill={p.accentSoft}
            stroke={p.ink}
            strokeWidth="1.5"
          />
        )}
      </g>
    );
  },
  crescent: (p, v) => (
    <g>
      <path
        d="M186 46 A 34 34 0 1 0 186 112 A 26 26 0 1 1 186 46 Z"
        fill={p.star}
        transform={`translate(${Math.round(place(propOf(v, 0), -52, 26))} ${Math.round(place(propOf(v, 1), -12, 16))}) rotate(${Math.round(place(propOf(v, 2), -30, 30))} 186 79)`}
      />
      {Array.from({ length: v.stars }, (_, i) => {
        const s = scatter(v, i + 4, 26, 300, 22, 118);
        return star(p, s.x, s.y, s.r - 1.5, `cr-${i}`);
      })}
    </g>
  ),
  dreamSky: (p, v) => (
    <g>
      <g transform={`translate(${Math.round(place(propOf(v, 0), -40, 12))} ${Math.round(place(propOf(v, 1), -14, 12))})`}>
        <circle cx="112" cy="66" r="20" fill={p.sunGlow} />
        <path d="M112 40 v-10 M112 92 v10 M86 66 h-10 M138 66 h10 M94 48 l-7 -7 M130 48 l7 -7 M94 84 l-7 7 M130 84 l7 7" stroke={p.sunGlow} strokeWidth="3" strokeLinecap="round" />
        <path d="M206 52 A 22 22 0 1 0 206 96 A 17 17 0 1 1 206 52 Z" fill={p.star} />
      </g>
      {/* Eleven stars, scattered differently for every dream. */}
      {Array.from({ length: 11 }, (_, i) => {
        const s = scatter(v, i + 4, 78, 274, 20, 126);
        return star(p, s.x, s.y, s.r - 1.8, `ds-${i}`);
      })}
    </g>
  ),
  mountain: (p, v) => {
    const peaks = MOUNTAIN_PEAKS[v.ridge];
    return (
      <g transform={`translate(${Math.round(place(propOf(v, 10), -16, 16))} 0)`}>
        <path d={peaks.body} fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
        <path d={peaks.caps} fill={p.cloth} opacity="0.9" />
        <path
          d={`M${Math.round(place(propOf(v, 11), 140, 172))} 150 L${Math.round(place(propOf(v, 12), 168, 190))} ${Math.round(place(propOf(v, 13), 104, 124))} L${Math.round(place(propOf(v, 14), 196, 224))} 150`}
          fill={p.stoneDark}
          opacity="0.7"
        />
      </g>
    );
  },
  rainClouds: (p, v) => (
    <g
      className="kids-scene-rain"
      transform={`translate(${Math.round(place(propOf(v, 6), -22, 22))} ${Math.round(place(propOf(v, 7), -6, 6))})`}
    >
      <path d="M104 92 C 104 72 122 60 142 64 C 150 48 176 46 188 62 C 212 58 228 76 222 94 C 232 100 228 114 214 114 L116 114 C 100 114 96 100 104 92 Z" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
      {(() => {
        const drops = Array.from({ length: 4 + v.ridge }, (_, i) => Math.round(place(propOf(v, i), 108, 226)));
        const slant = Math.round(place(propOf(v, 8), -8, 8));
        return (
          <>
            <path d={drops.map((x) => `M${x} 124 q ${slant - 6} 14 ${slant} 20`).join(' ')} stroke={p.waterLight} strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d={drops.map((x, i) => `M${x + 14 + i * 2} 128 q ${slant - 6} 14 ${slant} 20`).join(' ')} stroke={p.water} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
          </>
        );
      })()}
    </g>
  ),
  windSwirl: (p, v) => (
    <g
      className="kids-scene-wind"
      transform={`translate(${Math.round(place(propOf(v, 4), -18, 18))} ${Math.round(place(propOf(v, 5), -10, 10))})`}
    >
      <path d="M74 74 C 130 60 190 66 240 80 C 254 84 252 98 238 96 C 200 88 150 86 104 94" stroke={p.accentSoft} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M88 112 C 140 100 196 106 236 118 C 248 122 246 134 234 132 C 198 124 150 122 112 130" stroke={p.cloth} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />
      <path
        d={`M${Math.round(place(propOf(v, 6), 104, 132))} 52 C ${Math.round(place(propOf(v, 7), 140, 162))} 44 ${Math.round(place(propOf(v, 8), 176, 200))} 48 ${Math.round(place(propOf(v, 9), 204, 228))} 56`}
        stroke={p.cloth}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path d="M240 80 q 14 -4 12 -16" stroke={p.accentSoft} strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  ),
  tablets: (p, v) => (
    <g transform={`rotate(${Math.round(place(propOf(v, 0), -4, 4))} 160 148)`}>
      <path d="M108 148 L108 78 A 22 22 0 0 1 152 78 L152 148 Z" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M168 148 L168 78 A 22 22 0 0 1 212 78 L212 148 Z" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
      {(() => {
        const engrave = (index: number) => 12 + Math.round(propOf(v, index + 4) * 10);
        const first = engrave(0);
        const second = engrave(1);
        const third = engrave(2);
        return (
          <path
            d={`M118 96 H${118 + first} M118 110 H${118 + first} M118 124 H${118 + second} M178 96 H${178 + second} M178 110 H${178 + third} M178 124 H${172 + third}`}
            stroke={p.ink}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.65"
          />
        );
      })()}
    </g>
  ),
  basket: (p, v) => (
    <g transform={`translate(${Math.round(place(propOf(v, 2), -18, 18))} 0)`}>
      <path d="M124 146 C 124 120 196 120 196 146 Z" fill={p.wood} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M128 132 H192 M132 140 H188" stroke={p.woodDark} strokeWidth="2" opacity="0.8" />
      <path d="M132 122 C 140 100 180 100 188 122" stroke={p.woodDark} strokeWidth="4" fill="none" />
      <path
        d={`M96 150 q 12 -${Math.round(place(propOf(v, 3), 14, 22))} 8 -${Math.round(place(propOf(v, 4), 28, 40))} M108 150 q 14 -${Math.round(place(propOf(v, 5), 16, 26))} 10 -${Math.round(place(propOf(v, 6), 32, 46))} M224 150 q -12 -${Math.round(place(propOf(v, 7), 14, 22))} -8 -${Math.round(place(propOf(v, 8), 28, 40))} M212 150 q -14 -${Math.round(place(propOf(v, 9), 16, 26))} -10 -${Math.round(place(propOf(v, 10), 32, 46))}`}
        stroke={p.foliage}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  ),
  throne: (p, v) => (
    <g transform={`translate(${Math.round(place(propOf(v, 0), -14, 14))} 0)`}>
      <path d="M116 148 L116 92 L204 92 L204 148 Z" fill={p.wood} stroke={p.ink} strokeWidth={STROKE} />
      <path d={`M124 92 L124 ${Math.round(place(propOf(v, 1), 50, 66))} C 124 46 196 46 196 58 L196 92 Z`} fill={p.woodDark} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M140 148 L140 118 L180 118 L180 148 Z" fill={p.accent} opacity="0.8" />
      <circle cx="160" cy="66" r={place(propOf(v, 2), 7, 11).toFixed(1)} fill={p.metal} />
      <path d="M108 148 H212" stroke={p.ink} strokeWidth="5" strokeLinecap="round" />
      {propOf(v, 3) > 0.45 && (
        <path
          d={`M${Math.round(place(propOf(v, 4), 84, 100))} 148 v-${Math.round(place(propOf(v, 5), 26, 46))} M${Math.round(place(propOf(v, 6), 220, 236))} 148 v-${Math.round(place(propOf(v, 7), 26, 46))}`}
          stroke={p.stoneDark}
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.75"
        />
      )}
    </g>
  ),
  birds: (p, v) => (
    <g className="kids-scene-birds">
      {Array.from({ length: 4 + (v.stars % 4) }, (_, i) => {
        const s = scatter(v, i, 92, 250, 48, 124);
        return (
          <path
            key={`bi-${i}`}
            d={`M${s.x - 18} ${s.y} q 9 -${Math.round(s.r * 1.8)} 18 0 q 9 -${Math.round(s.r * 1.8)} 18 0`}
            stroke={p.ink}
            strokeWidth={place(propOf(v, i + 8), 2, 4).toFixed(1)}
            fill="none"
            strokeLinecap="round"
          />
        );
      })}
      <path d="M132 146 L188 146 L176 128 L144 128 Z" fill={p.wood} stroke={p.ink} strokeWidth="2" />
    </g>
  ),
  mihrab: (p, v) => (
    <g>
      <path d="M108 150 L108 92 C 108 60 212 60 212 92 L212 150 Z" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M130 150 L130 98 C 130 76 190 76 190 98 L190 150 Z" fill={p.accent} opacity="0.55" />
      <path d="M144 150 L144 104 C 144 88 176 88 176 104 L176 150 Z" fill={p.cloth} opacity="0.9" />
      {/* The lamp hangs on a swing of its own. */}
      <g transform={`rotate(${Math.round(place(propOf(v, 0), -10, 10))} 160 82)`}>
        <line x1="160" y1="82" x2="160" y2="96" stroke={p.metal} strokeWidth="2" />
        <path d="M152 96 L168 96 L164 112 L156 112 Z" fill={p.metal} />
        <circle cx="160" cy="104" r="4" fill={p.sunGlow} />
      </g>
      <path
        d={`M120 ${Math.round(place(propOf(v, 1), 128, 140))} h${Math.round(place(propOf(v, 2), 8, 14))} M188 ${Math.round(place(propOf(v, 3), 128, 140))} h${Math.round(place(propOf(v, 4), 8, 14))}`}
        stroke={p.metal}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </g>
  ),
  palace: (p, v) => (
    <g transform={`translate(${Math.round(place(propOf(v, 0), -12, 12))} 0)`}>
      <path d="M92 150 L92 96 L228 96 L228 150 Z" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M92 96 L110 74 L210 74 L228 96 Z" fill={p.stoneDark} stroke={p.ink} strokeWidth="2" />
      {[108, 138, 168, 198].map((x, i) => (
        <rect
          key={`pl-${x}`}
          x={x}
          y={104}
          width={14}
          height={Math.round(place(propOf(v, i + 1), 26, 40))}
          rx={7}
          fill={p.accent}
          opacity={place(propOf(v, i + 5), 0.5, 0.9).toFixed(2)}
        />
      ))}
      <path d={`M150 74 L160 ${Math.round(place(propOf(v, 8), 46, 60))} L170 74 Z`} fill={p.metal} />
      {propOf(v, 9) > 0.5 && (
        <path
          d={`M${Math.round(place(propOf(v, 10), 60, 76))} 150 v-${Math.round(place(propOf(v, 11), 20, 40))} M${Math.round(place(propOf(v, 12), 244, 262))} 150 v-${Math.round(place(propOf(v, 13), 20, 40))}`}
          stroke={p.stoneDark}
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.7"
        />
      )}
    </g>
  ),
  treasure: (p, v) => (
    <g transform={`rotate(${Math.round(place(propOf(v, 6), -3, 3))} 160 148)`}>
      <path d="M110 150 L110 108 L210 108 L210 150 Z" fill={p.wood} stroke={p.ink} strokeWidth={STROKE} />
      <path d="M110 108 L120 88 L200 88 L210 108 Z" fill={p.woodDark} stroke={p.ink} strokeWidth="2" />
      <path d="M110 124 H210" stroke={p.metal} strokeWidth="4" />
      <circle cx="160" cy="124" r="6" fill={p.metal} stroke={p.ink} strokeWidth="2" />
      {Array.from({ length: 4 + (v.stars % 4) }, (_, i) => {
        const s = scatter(v, i + 8, 116, 206, 62, 88);
        return <ellipse key={`tr-${i}`} cx={s.x} cy={s.y} rx={place(propOf(v, i), 7, 11).toFixed(1)} ry="4" fill={p.metal} stroke={p.ink} strokeWidth="1.5" />;
      })}
    </g>
  ),
  sheep: (p, v) => {
    const crookX = Math.round(place(propOf(v, 12), 88, 112));
    const crookTop = Math.round(place(propOf(v, 13), 78, 96));
    return (
      <g>
        {Array.from({ length: 2 + (v.ridge % 3) }, (_, i) => {
          const s = scatter(v, i + 2, 118, 216, 118, 142);
          return (
            <g key={`sh-${i}`} transform={`translate(${s.x} ${s.y}) scale(${place(propOf(v, i + 8), 0.75, 1.15).toFixed(2)})`}>
              <ellipse cx="0" cy="0" rx="22" ry="14" fill={p.cloth} stroke={p.ink} strokeWidth="2" />
              <circle cx={propOf(v, i) > 0.5 ? 20 : -20} cy="-6" r="8" fill={p.stone} stroke={p.ink} strokeWidth="2" />
              <path d="M-12 14 v8 M0 16 v8 M12 14 v8" stroke={p.ink} strokeWidth="3" strokeLinecap="round" />
            </g>
          );
        })}
        <line x1={crookX} y1="150" x2={crookX + 10} y2={crookTop} stroke={p.woodDark} strokeWidth="4" strokeLinecap="round" />
        <path d={`M${crookX + 10} ${crookTop} q 14 4 12 16`} stroke={p.woodDark} strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    );
  },
  camel: (p, v) => {
    const facingLeft = propOf(v, 1) > 0.5;
    return (
      <g transform={`translate(${Math.round(place(propOf(v, 0), -20, 20))} 0) ${facingLeft ? 'translate(320 0) scale(-1 1)' : ''}`}>
        <path d="M104 132 C 112 112 128 108 142 118 C 152 104 172 104 182 118 C 196 108 214 112 220 130 L220 148 L104 148 Z" fill={p.wood} stroke={p.ink} strokeWidth={STROKE} />
        <path d="M220 130 C 236 126 244 112 242 98 L252 96 C 256 116 246 136 228 144" fill={p.wood} stroke={p.ink} strokeWidth={STROKE} />
        <circle cx="246" cy="102" r="3" fill={p.ink} />
        <path d="M120 148 v-10 M152 148 v-10 M186 148 v-10 M212 148 v-10" stroke={p.ink} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d={`M150 112 q 10 -${Math.round(place(propOf(v, 2), 10, 18))} 22 -2`} stroke={p.accent} strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    );
  },
  idols: (p, v) => (
    <g>
      {[116, 160, 204].map((x, i) => {
        const h = Math.round(place(propOf(v, i), 40, 84));
        return (
          <g key={`id-${i}`}>
            <path d={`M${x - 14} 150 L${x - 10} ${150 - h} q 14 -12 28 0 L${x + 14} 150 Z`} fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
            <path d={`M${x - 8} ${150 - h * 0.6} h16`} stroke={p.stoneDark} strokeWidth="3" />
          </g>
        );
      })}
      <ellipse cx={Math.round(place(propOf(v, 4), 132, 188))} cy="152" rx={Math.round(place(propOf(v, 5), 40, 62))} ry="6" fill={p.stoneDark} opacity="0.5" />
    </g>
  ),
  swords: (p, v) => (
    <g>
      {[Math.round(place(propOf(v, 0), 22, 40)), -Math.round(place(propOf(v, 1), 22, 40))].map((angle) => (
        <g key={`sw-${angle}`} transform={`translate(160 108) rotate(${angle})`}>
          <path d="M0 -62 L8 -50 L8 20 L-8 20 L-8 -50 Z" fill={p.metal} stroke={p.ink} strokeWidth="2" />
          <rect x="-20" y="20" width="40" height="8" rx="4" fill={p.woodDark} stroke={p.ink} strokeWidth="2" />
          <rect x="-6" y="28" width="12" height="26" rx="5" fill={p.wood} stroke={p.ink} strokeWidth="2" />
        </g>
      ))}
      <circle cx="160" cy="108" r="7" fill={p.accent} stroke={p.ink} strokeWidth="2" />
    </g>
  ),
  balance: (p, v) => {
    // The pans settle at whatever angle this panel's scale is hanging at.
    const tilt = place(propOf(v, 2), -9, 9);
    return (
      <g>
        <line x1="160" y1="60" x2="160" y2="140" stroke={p.ink} strokeWidth="5" strokeLinecap="round" />
        <line x1="102" y1={(74 + tilt).toFixed(1)} x2="218" y2={(74 - tilt).toFixed(1)} stroke={p.ink} strokeWidth="4" strokeLinecap="round" />
        <circle cx="160" cy="60" r="7" fill={p.metal} stroke={p.ink} strokeWidth="2" />
        {[
          { x: 102, y: 74 + tilt },
          { x: 218, y: 74 - tilt },
        ].map(({ x, y }) => (
          <g key={`ba-${x}`}>
            <path d={`M${x} ${(y + 2).toFixed(1)} L${x - 18} ${(y + 30).toFixed(1)} L${x + 18} ${(y + 30).toFixed(1)} Z`} fill={p.metal} stroke={p.ink} strokeWidth="2" />
            <path d={`M${x - 20} ${(y + 30).toFixed(1)} q 20 16 40 0`} fill={p.accentSoft} stroke={p.ink} strokeWidth="2" />
          </g>
        ))}
        <path d="M132 148 H188" stroke={p.ink} strokeWidth="6" strokeLinecap="round" />
      </g>
    );
  },
};

/**
 * Every subject the scene library can draw. A missing key is a compile error,
 * which is the point: adding a scene means adding its picture too.
 */
export const MOTIFS: Record<StorySceneKey, MotifRenderer> = {
  ...EXTENDED_MOTIFS,
  ...NARRATIVE_MOTIFS,
  ...BASE_MOTIFS,
};
