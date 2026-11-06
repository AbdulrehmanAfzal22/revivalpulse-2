import type { ReactElement } from 'react';
import type { ExtendedStorySceneKey } from 'types/kidsStories.types';
import type { MotifRenderer, ScenePalette } from './sceneTypes';
import { place, propOf, type SceneVariation } from './sceneVariation';

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

/** Contact shadow, so the object sits on the ground instead of floating. */
function shadow(p: ScenePalette, cx: number, rx: number, opacity = 0.28): ReactElement {
  return <ellipse cx={cx} cy={152} rx={rx} ry={6} fill={p.groundShadow} opacity={opacity} />;
}

/**
 * New subjects, one renderer each.
 *
 * Every key here is a different *thing to be looking at* — a road, a gate, a
 * field of wheat, a barred window — not the same object under a different sky.
 * A paragraph about a journey is painted as a road, one about hunger as a thin
 * animal, because a child reads the picture before the words.
 *
 * Same rules as motifs.tsx: no people and no faces, and no sky, sun, stars or
 * ground band, which the frame that draws this already lays down.
 */
export const EXTENDED_MOTIFS: Record<ExtendedStorySceneKey, MotifRenderer> = {
  /** Down the road, so the panel reads as travel rather than as a place. */
  desertRoad: (p, v) => {
    const bend = Math.round(place(propOf(v, 0), 118, 202));
    const steps = 4 + (v.ridge % 3);
    return (
      <g>
        <path
          d={`M104 178 C ${bend - 24} 150 ${bend + 30} 132 ${bend} 96 L${bend + 18} 96 C ${bend + 52} 134 ${bend - 6} 152 ${216} 178 Z`}
          fill={p.cloth}
          stroke={p.ink}
          strokeWidth="2"
          opacity="0.85"
        />
        {Array.from({ length: steps }, (_, i) => {
          const t = (i + 1) / (steps + 1);
          const x = 148 + t * (bend - 148) + place(propOf(v, i + 3), -8, 8);
          const y = 172 - t * 66;
          const size = 5.5 - t * 3;
          return (
            <g key={`dr-${i}`} opacity={(0.85 - t * 0.45).toFixed(2)}>
              <ellipse cx={x.toFixed(1)} cy={y.toFixed(1)} rx={size.toFixed(1)} ry={(size * 0.62).toFixed(1)} fill={p.woodDark} />
              <ellipse cx={(x + size * 1.9).toFixed(1)} cy={(y + 3).toFixed(1)} rx={size.toFixed(1)} ry={(size * 0.62).toFixed(1)} fill={p.woodDark} />
            </g>
          );
        })}
        {/* Two dry bushes mark the edge of the track. */}
        {[
          { x: Math.round(place(propOf(v, 8), 58, 84)), y: 160 },
          { x: Math.round(place(propOf(v, 9), 246, 278)), y: 146 },
        ].map((bush, i) => (
          <path
            key={`dr-b${i}`}
            d={`M${bush.x} ${bush.y} q -7 -10 -3 -18 M${bush.x} ${bush.y} q 2 -12 8 -16 M${bush.x} ${bush.y} q 8 -6 14 -4`}
            stroke={p.foliage}
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
        <path d={`M${bend} 96 h18`} stroke={p.ink} strokeWidth="2" opacity="0.4" />
      </g>
    );
  },

  /** A line of camels over a crest, seen from far off: the whole horizon is travel. */
  caravan: (p, v) => {
    const count = 3 + (v.stars % 3);
    const crest = place(propOf(v, 0), 112, 128);
    const trail = `M36 ${crest + 20} Q 160 ${crest - 26} 292 ${crest + 16}`;
    return (
      <g>
        <path d={trail} stroke={p.groundShadow} strokeWidth="9" fill="none" opacity="0.35" />
        {Array.from({ length: count }, (_, i) => {
          const t = (i + 0.5) / count;
          // Position along the quadratic crest, so the line follows the dune.
          const x = 36 + t * 256;
          const y = (1 - t) * (1 - t) * (crest + 20) + 2 * (1 - t) * t * (crest - 26) + t * t * (crest + 16);
          const s = place(propOf(v, i + 4), 0.5, 0.82);
          return (
            <g key={`cv-${i}`} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})`}>
              <path d="M-16 6 C -12 -6 -4 -8 0 -2 C 4 -10 12 -8 15 2 L15 12 L-16 12 Z" fill={p.woodDark} />
              <path d="M15 2 C 22 0 25 -6 24 -13 L29 -14 C 31 -5 26 4 19 8" fill={p.woodDark} />
              <path d="M-12 12 v6 M-2 12 v6 M9 12 v6" stroke={p.woodDark} strokeWidth="2.6" strokeLinecap="round" />
              <path d="M-4 -4 q 6 -8 12 -1" stroke={p.accent} strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          );
        })}
        {/* Long shadows reaching toward the viewer. */}
        <path
          d={`M${Math.round(70 + place(propOf(v, 1), -12, 12))} ${crest + 30} l 30 14 M${Math.round(170 + place(propOf(v, 2), -12, 12))} ${crest + 12} l 28 12`}
          stroke={p.groundShadow}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.3"
        />
      </g>
    );
  },

  /** Arriving: the gate is the subject, and the town behind it is the reward. */
  cityGate: (p, v) => {
    const arch = Math.round(place(propOf(v, 0), 142, 178));
    const wallTop = Math.round(place(propOf(v, 1), 84, 98));
    return (
      <g>
        {shadow(p, 160, 96, 0.2)}
        <path d={`M62 150 L62 ${wallTop} L258 ${wallTop} L258 150 Z`} fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
        {[62, 96, 130, 190, 224, 258].map((x, i) => (
          <rect key={`cg-t${i}`} x={x - 7} y={wallTop - 12} width={14} height={12} fill={p.stoneDark} stroke={p.ink} strokeWidth="1.6" />
        ))}
        <path d={`M${arch - 28} 150 L${arch - 28} ${wallTop + 26} Q ${arch} ${wallTop - 6} ${arch + 28} ${wallTop + 26} L${arch + 28} 150 Z`} fill={p.woodDark} stroke={p.ink} strokeWidth={STROKE} />
        <path d={`M${arch - 28} ${wallTop + 26} Q ${arch} ${wallTop - 6} ${arch + 28} ${wallTop + 26}`} fill="none" stroke={p.cloth} strokeWidth="4" />
        {/* Doors studded with iron bosses. */}
        <line x1={arch} y1={wallTop + 16} x2={arch} y2="150" stroke={p.ink} strokeWidth="2.5" />
        {[0, 1, 2].map((row) => (
          <g key={`cg-r${row}`}>
            {[arch - 16, arch + 16].map((x) => (
              <circle key={`cg-b${row}-${x}`} cx={x} cy={wallTop + 44 + row * 20} r="3" fill={p.metal} />
            ))}
          </g>
        ))}
        {/* A dome and two palms rise behind the wall. */}
        <path d={`M196 ${wallTop} q 22 -34 44 0 Z`} fill={p.accentSoft} stroke={p.ink} strokeWidth="2" />
        <line x1="218" y1={wallTop - 34} x2="218" y2={wallTop - 46} stroke={p.metal} strokeWidth="2.5" />
        <circle cx="218" cy={wallTop - 50} r="3.5" fill={p.metal} />
        <path d="M84 84 c -3 -22 -5 -34 -3 -44 m 3 44 c 4 -20 8 -30 14 -38" stroke={p.foliage} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d={`M${Math.round(place(propOf(v, 3), 66, 80))} ${wallTop} v-${Math.round(place(propOf(v, 4), 30, 44))}`} stroke={p.wood} strokeWidth="5" strokeLinecap="round" />
      </g>
    );
  },

  /** Three stalls receding, so a market panel never looks like a wall of houses. */
  market: (p, v) => {
    const lean = Math.round(place(propOf(v, 0), -6, 6));
    return (
      <g transform={`skewY(${lean * 0.12})`}>
        {[
          { x: 46, w: 76, s: 1 },
          { x: 132, w: 70, s: 0.92 },
          { x: 212, w: 62, s: 0.84 },
        ].map((stall, i) => {
          const top = 104 - i * 6;
          const cloth = i % 2 === 0 ? p.accent : p.accentSoft;
          return (
            <g key={`mk-${i}`} transform={`translate(0 ${Math.round(place(propOf(v, i + 1), -3, 3))})`}>
              {shadow(p, stall.x + stall.w / 2, stall.w * 0.46, 0.22)}
              {/* canopy */}
              <path d={`M${stall.x - 6} ${top} L${stall.x + stall.w + 6} ${top} L${stall.x + stall.w} ${top - 20} L${stall.x} ${top - 20} Z`} fill={cloth} stroke={p.ink} strokeWidth="2" />
              <path
                d={`M${stall.x + 4} ${top} v-18 M${stall.x + 16} ${top} v-18 M${stall.x + 28} ${top} v-18`}
                stroke={p.cloth}
                strokeWidth="3"
                opacity="0.65"
              />
              <line x1={stall.x} y1={top} x2={stall.x} y2="150" stroke={p.woodDark} strokeWidth="3" />
              <line x1={stall.x + stall.w} y1={top} x2={stall.x + stall.w} y2="150" stroke={p.woodDark} strokeWidth="3" />
              {/* counter and goods */}
              <rect x={stall.x + 2} y="128" width={stall.w - 4} height="10" rx="3" fill={p.wood} stroke={p.ink} strokeWidth="2" />
              {Array.from({ length: 3 }, (_, j) => {
                const gx = stall.x + 12 + j * (stall.w / 3.4);
                const gh = Math.round(place(propOf(v, i * 3 + j + 5), 9, 16));
                return <path key={`mk-j${i}-${j}`} d={`M${gx} 128 q -4 -${gh} 5 -${gh} q 9 0 5 ${gh} Z`} fill={p.stoneDark} stroke={p.ink} strokeWidth="1.6" />;
              })}
            </g>
          );
        })}
      </g>
    );
  },

  /** Stored grain, with the light a shaft of a door would let in. */
  granary: (p, v) => {
    const stack = 3 + (v.ridge % 2);
    return (
      <g>
        <path d="M60 150 L60 78 L262 78 L262 150 Z" fill={p.stoneDark} stroke={p.ink} strokeWidth="2" opacity="0.45" />
        <path d={`M${Math.round(place(propOf(v, 0), 210, 250))} 78 L262 150 L186 150 Z`} fill={p.sunGlow} opacity="0.28" />
        {Array.from({ length: stack }, (_, i) => {
          const x = 82 + i * 44 + place(propOf(v, i + 2), -6, 6);
          const h = Math.round(place(propOf(v, i + 6), 34, 50));
          return (
            <g key={`gr-${i}`}>
              {shadow(p, x + 18, 22, 0.25)}
              <path d={`M${x} 150 C ${x - 4} ${150 - h} ${x + 40} ${150 - h} ${x + 36} 150 Z`} fill={p.cloth} stroke={p.ink} strokeWidth={STROKE} />
              <path d={`M${x + 8} ${150 - h + 4} q 10 -8 20 0`} fill={p.woodDark} stroke={p.ink} strokeWidth="2" />
              <path d={`M${x + 6} ${150 - h / 2} h24`} stroke={p.woodDark} strokeWidth="2" opacity="0.6" />
            </g>
          );
        })}
        {/* A measure cup and a spill of grain: plenty, counted out. */}
        <g transform={`translate(${Math.round(place(propOf(v, 4), 216, 246))} 132)`}>
          <path d="M0 0 L22 0 L18 18 L4 18 Z" fill={p.wood} stroke={p.ink} strokeWidth="2" />
          <ellipse cx="11" cy="0" rx="11" ry="4" fill={p.metal} stroke={p.ink} strokeWidth="1.6" />
        </g>
        {Array.from({ length: 6 }, (_, i) => {
          const s = scatter(v, i + 9, 196, 262, 146, 156);
          return <circle key={`gr-g${i}`} cx={s.x} cy={s.y} r="2.2" fill={p.metal} opacity="0.9" />;
        })}
      </g>
    );
  },

  /** Confinement drawn as a wall: the bars are the whole picture. */
  prisonWindow: (p, v) => {
    const x = Math.round(place(propOf(v, 0), 112, 148));
    const lift = Math.round(place(propOf(v, 1), 52, 66));
    const w = 68;
    return (
      <g>
        <path d="M44 150 L44 42 L276 42 L276 150 Z" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
        {[0, 1, 2, 3].map((row) => (
          <line key={`pw-c${row}`} x1="44" y1={62 + row * 24} x2="276" y2={62 + row * 24} stroke={p.ink} strokeWidth="1.6" opacity="0.25" />
        ))}
        {/* the opening, lit from outside */}
        <path
          d={`M${x} 150 L${x} ${lift + 34} Q ${x} ${lift} ${x + w / 2} ${lift} Q ${x + w} ${lift} ${x + w} ${lift + 34} L${x + w} 150 Z`}
          fill={p.skyBottom}
          stroke={p.ink}
          strokeWidth={STROKE}
        />
        {[x + 17, x + 34, x + 51].map((bx, i) => (
          <line key={`pw-b${i}`} x1={bx} y1={lift + 4} x2={bx} y2="146" stroke={p.ink} strokeWidth="4.5" strokeLinecap="round" />
        ))}
        <line x1={x + 4} y1={lift + 46} x2={x + w - 4} y2={lift + 46} stroke={p.ink} strokeWidth="4.5" strokeLinecap="round" />
        {/* the stones cut back around the frame */}
        <path d={`M${x - 8} ${lift + 8} l -16 -8 M${x + w + 8} ${lift + 8} l 16 -8`} stroke={p.stoneDark} strokeWidth="6" strokeLinecap="round" />
        {/* the light the window lets in, lying on the floor */}
        <path d={`M${x} 150 L${x + 34} 150 L${x + w + 52} 168 L${x + 18} 168 Z`} fill={p.sunGlow} opacity="0.3" />
        <path d={`M${Math.round(place(propOf(v, 3), 80, 112))} 148 l 12 -4 M${Math.round(place(propOf(v, 4), 196, 228))} 146 l 14 3`} stroke={p.wood} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      </g>
    );
  },

  /** Long patience: a tree old enough to have seen everything. */
  oliveTree: (p, v) => {
    const lean = Math.round(place(propOf(v, 0), -8, 8));
    const canopy = place(propOf(v, 1), 0.88, 1.14);
    return (
      <g transform={`translate(${lean} 0)`}>
        {shadow(p, 160, 74, 0.26)}
        <path d="M150 150 C 146 128 152 112 142 96 C 136 86 144 78 152 82 C 158 66 170 70 172 84 C 184 78 192 88 184 98 C 176 112 178 130 176 150 Z" fill={p.woodDark} stroke={p.ink} strokeWidth={STROKE} />
        <g transform={`translate(160 74) scale(${canopy.toFixed(2)}) translate(-160 -74)`}>
          {[
            { cx: 122, cy: 74, rx: 30, ry: 20 },
            { cx: 160, cy: 58, rx: 36, ry: 24 },
            { cx: 200, cy: 76, rx: 30, ry: 20 },
            { cx: 160, cy: 86, rx: 44, ry: 18 },
          ].map((blob, i) => (
            <ellipse key={`ol-${i}`} cx={blob.cx} cy={blob.cy} rx={blob.rx} ry={blob.ry} fill={p.foliage} stroke={p.ink} strokeWidth="2" opacity={i === 3 ? 0.9 : 1} />
          ))}
        </g>
        {Array.from({ length: 7 }, (_, i) => {
          const s = scatter(v, i + 4, 112, 210, 56, 92);
          return <ellipse key={`ol-f${i}`} cx={s.x} cy={s.y} rx="4" ry="3" fill={p.accent} opacity="0.85" />;
        })}
        {/* Bench stones under it, because someone sat here a long time. */}
        <path d={`M${Math.round(place(propOf(v, 2), 76, 96))} 150 l 6 -14 h30 l 4 14 Z`} fill={p.stone} stroke={p.ink} strokeWidth="2" />
        <path d={`M${Math.round(place(propOf(v, 3), 210, 232))} 150 l 4 -10 h24 l 5 10 Z`} fill={p.stoneDark} stroke={p.ink} strokeWidth="2" />
      </g>
    );
  },

  /** Low to the ground, in the stalks: seven ears, counted. */
  wheatField: (p, v) => {
    const ears = 6 + (v.ridge % 2);
    return (
      <g>
        <path d="M0 156 C 60 148 118 158 176 152 C 232 146 280 156 320 150 L320 180 L0 180 Z" fill={p.metal} opacity="0.35" />
        {Array.from({ length: ears }, (_, i) => {
          const x = 26 + i * (268 / (ears - 1)) + place(propOf(v, i), -7, 7);
          const top = Math.round(place(propOf(v, i + 6), 44, 76));
          const sway = Math.round(place(propOf(v, i + 2), -6, 6));
          return (
            <g key={`wf-${i}`} transform={`translate(${x.toFixed(1)} 156)`}>
              <path d={`M0 0 C ${sway} -${top / 2} ${sway} -${top * 0.8} ${sway * 1.6} -${top}`} stroke={p.wood} strokeWidth="2.6" fill="none" strokeLinecap="round" />
              <g transform={`translate(${(sway * 1.6).toFixed(1)} -${top})`}>
                <ellipse cx="0" cy="0" rx="6" ry="14" fill={p.metal} stroke={p.ink} strokeWidth="1.6" />
                {[-9, -3, 3, 9].map((gy) => (
                  <path key={`wf-a${i}-${gy}`} d={`M-6 ${gy} l -6 -5 M6 ${gy} l 6 -5`} stroke={p.wood} strokeWidth="1.8" strokeLinecap="round" />
                ))}
                <path d="M0 -14 v-10" stroke={p.wood} strokeWidth="1.8" strokeLinecap="round" />
              </g>
            </g>
          );
        })}
        {/* A sickle leans in from the corner: the harvest has begun. */}
        <g transform={`translate(${Math.round(place(propOf(v, 12), 244, 272))} 142) rotate(${Math.round(place(propOf(v, 13), -18, -6))})`}>
          <path d="M0 0 q -26 -6 -34 -22" stroke={p.metal} strokeWidth="4" fill="none" strokeLinecap="round" />
          <line x1="0" y1="0" x2="16" y2="10" stroke={p.woodDark} strokeWidth="5" strokeLinecap="round" />
        </g>
      </g>
    );
  },

  /** Fat and thin, side by side, at the same water: the dream made visible. */
  cattle: (p, v) => {
    const flip = propOf(v, 5) > 0.5;
    return (
      <g transform={flip ? 'translate(320 0) scale(-1 1)' : undefined}>
        <path d="M88 150 C 88 140 232 140 232 150 Z" fill={p.water} stroke={p.ink} strokeWidth="2" />
        <path d="M96 146 C 120 142 200 142 224 146" stroke={p.waterLight} strokeWidth="3" fill="none" opacity="0.8" />
        {/* the healthy one */}
        <g transform={`translate(${Math.round(place(propOf(v, 0), 92, 116))} ${Math.round(place(propOf(v, 1), 100, 112))})`}>
          {shadow(p, 30, 34, 0.22)}
          <ellipse cx="30" cy="18" rx="34" ry="22" fill={p.wood} stroke={p.ink} strokeWidth={STROKE} />
          <path d="M0 34 v14 M18 36 v14 M44 36 v14 M60 34 v14" stroke={p.ink} strokeWidth="5" strokeLinecap="round" />
          <path d="M62 12 C 74 8 82 14 82 24 C 82 32 74 34 66 30" fill={p.wood} stroke={p.ink} strokeWidth={STROKE} />
          <circle cx="76" cy="22" r="2.6" fill={p.ink} />
          <path d="M66 6 q -4 -10 2 -14 M76 6 q 4 -10 -1 -13" stroke={p.metal} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M6 4 q -12 6 -14 18" stroke={p.woodDark} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
        {/* the thin one */}
        <g transform={`translate(${Math.round(place(propOf(v, 2), 186, 214))} ${Math.round(place(propOf(v, 3), 106, 120))})`}>
          {shadow(p, 24, 26, 0.22)}
          <path d="M0 22 C 4 6 44 4 50 20 C 52 30 44 34 26 34 C 8 34 -2 30 0 22 Z" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
          <path d="M6 30 v16 M16 32 v14 M34 32 v14 M44 30 v16" stroke={p.ink} strokeWidth="3" strokeLinecap="round" />
          {[12, 22, 32].map((x) => (
            <line key={`ct-r${x}`} x1={x} y1="10" x2={x - 2} y2="30" stroke={p.ink} strokeWidth="1.6" opacity="0.5" />
          ))}
          <path d="M50 18 C 60 16 66 22 64 30 C 60 34 54 32 50 28" fill={p.stone} stroke={p.ink} strokeWidth="2" />
          <circle cx="59" cy="25" r="2.2" fill={p.ink} />
          <path d="M52 12 q 2 -8 -2 -12" stroke={p.metal} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      </g>
    );
  },

  /** Water out of a split rock — the crack is the point. */
  springRock: (p, v) => {
    const split = Math.round(place(propOf(v, 0), 150, 172));
    const flow = place(propOf(v, 1), 0.9, 1.15);
    return (
      <g>
        <path d={`M92 150 L${split - 16} 150 L${split - 22} 104 L${split - 6} 78 L${split - 10} 150 Z`} fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
        <path d={`M${split + 10} 150 L${split + 26} 84 L${split + 52} 100 L${split + 62} 150 Z`} fill={p.stoneDark} stroke={p.ink} strokeWidth={STROKE} />
        <g transform={`translate(0 ${(110 - 110 * flow).toFixed(1)}) scale(1 ${flow.toFixed(2)})`}>
          <path d={`M${split} 92 C ${split - 6} 112 ${split + 8} 130 ${split} 150`} stroke={p.waterLight} strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d={`M${split - 3} 96 C ${split - 10} 118 ${split + 2} 134 ${split - 4} 150`} stroke={p.water} strokeWidth="3" fill="none" opacity="0.7" />
        </g>
        {/* the pool it fills */}
        <ellipse cx={split + 4} cy="152" rx={Math.round(place(propOf(v, 2), 44, 62))} ry="9" fill={p.water} stroke={p.ink} strokeWidth="2" />
        <path d={`M${split - 24} 152 q 14 -5 28 0 t 28 0`} stroke={p.waterLight} strokeWidth="2.5" fill="none" opacity="0.8" />
        {Array.from({ length: 4 + (v.ridge % 3) }, (_, i) => {
          const x = split - 54 + i * 26 + place(propOf(v, i + 6), -6, 6);
          const h = Math.round(place(propOf(v, i + 10), 16, 30));
          return (
            <path
              key={`sr-r${i}`}
              d={`M${x.toFixed(1)} 150 C ${(x - 3).toFixed(1)} ${150 - h / 2} ${(x + 4).toFixed(1)} ${150 - h * 0.7} ${(x + 2).toFixed(1)} ${150 - h}`}
              stroke={p.foliage}
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
        {[split - 44, split + 58].map((x, i) => (
          <path key={`sr-s${i}`} d="M0 0 m-7 0 a7 4 0 1 0 14 0" transform={`translate(${x} 146)`} fill={p.stone} stroke={p.ink} strokeWidth="1.6" />
        ))}
      </g>
    );
  },

  /** Thirst drawn as ground itself: cracks, dust, one dead shrub. */
  crackedEarth: (p, v) => {
    const shift = Math.round(place(propOf(v, 0), -18, 18));
    return (
      <g>
        {/* The fissures run the whole width, nearest ones widest. */}
        <path
          d={`M${20 + shift} 176 l 26 -22 l -8 -18 M${86 + shift} 178 l 18 -26 l 22 -12 M${158 + shift} 176 l -12 -20 l 16 -22 M${228 + shift} 178 l 20 -24 l -6 -18 M${286 + shift} 174 l -16 -18 l 10 -16`}
          stroke={p.ink}
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.72"
        />
        <path
          d={`M${52 + shift} 168 l 34 6 M${132 + shift} 162 l 40 -4 M${210 + shift} 166 l 32 5`}
          stroke={p.ink}
          strokeWidth="1.8"
          fill="none"
          opacity="0.4"
        />
        {/* one shrub, given up */}
        <g transform={`translate(${Math.round(place(propOf(v, 1), 116, 172))} 150)`}>
          <path d="M0 0 C -4 -14 -14 -20 -20 -30 M0 0 C 2 -16 10 -22 16 -28 M0 -8 C -6 -16 -6 -22 -2 -30 M0 -4 C 8 -10 14 -12 20 -10" stroke={p.woodDark} strokeWidth="2.8" fill="none" strokeLinecap="round" />
          {shadow(p, 0, 26, 0.2)}
        </g>
        {/* a skull-dry hollow, and dust lifted by the wind */}
        <ellipse cx={Math.round(206 + shift)} cy="158" rx="18" ry="6" fill={p.groundShadow} opacity="0.35" />
        <path
          d={`M${Math.round(place(propOf(v, 3), 40, 70))} 120 q 20 -8 44 0 t 40 -6 M${Math.round(place(propOf(v, 4), 180, 210))} 106 q 18 -7 38 0`}
          stroke={p.cloth}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
    );
  },

  /** The water is above the fence line: a flood seen from the roof side. */
  floodWater: (p, v) => {
    const level = Math.round(place(propOf(v, 0), 104, 118));
    return (
      <g>
        <path d={`M0 ${level} H320 V180 H0 Z`} fill={p.water} stroke="none" />
        <path d={`M0 ${level} q 26 -8 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0`} stroke={p.waterLight} strokeWidth="4" fill="none" opacity="0.75" />
        <path d={`M0 ${level + 16} q 30 -7 60 0 t 60 0 t 60 0 t 60 0 t 60 0`} stroke={p.waterLight} strokeWidth="3" fill="none" opacity="0.45" />
        {/* a rooftop breaking the surface */}
        <g transform={`translate(${Math.round(place(propOf(v, 1), 60, 96))} ${level - 22})`}>
          <path d="M0 22 L26 -6 L52 22 Z" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
          <path d="M14 12 h12 v10 H14 Z" fill={p.woodDark} />
          <line x1="26" y1="-6" x2="26" y2="-18" stroke={p.metal} strokeWidth="2.5" />
        </g>
        {/* a tree with only its crown left */}
        <g transform={`translate(${Math.round(place(propOf(v, 2), 210, 250))} ${level - 14})`}>
          <line x1="0" y1="14" x2="0" y2="-6" stroke={p.woodDark} strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="0" cy="-14" rx="22" ry="14" fill={p.foliage} stroke={p.ink} strokeWidth="2" />
          <path d={`M${Math.round(place(propOf(v, 4), -14, 14))} -22 q 6 -10 4 -18`} stroke={p.foliage} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
        {/* a fencepost, almost swallowed */}
        <line x1={Math.round(place(propOf(v, 3), 156, 184))} y1={level + 6} x2={Math.round(place(propOf(v, 3), 156, 184))} y2={level - 18} stroke={p.wood} strokeWidth="5" strokeLinecap="round" />
        {/* rain still falling into it */}
        {Array.from({ length: 5 }, (_, i) => {
          const x = 30 + i * 62 + place(propOf(v, i + 8), -8, 8);
          return <line key={`fw-${i}`} x1={x.toFixed(1)} y1={30} x2={(x - 5).toFixed(1)} y2={level - 30} stroke={p.waterLight} strokeWidth="2" opacity="0.5" strokeLinecap="round" />;
        })}
        <path d={`M108 ${level + 30} h48 M188 ${level + 46} h36`} stroke={p.wood} strokeWidth="5" strokeLinecap="round" opacity="0.85" />
      </g>
    );
  },

  /** Camp from above the fire: tents, embers, a hanging pot. */
  nightCamp: (p, v) => {
    const fireX = Math.round(place(propOf(v, 0), 148, 176));
    return (
      <g>
        {/* three-sided tent */}
        {[
          { x: Math.round(place(propOf(v, 1), 62, 84)), w: 74, h: 60 },
          { x: Math.round(place(propOf(v, 2), 210, 232)), w: 62, h: 50 },
        ].map((tent, i) => (
          <g key={`nc-t${i}`}>
            {shadow(p, tent.x + tent.w / 2, tent.w * 0.55, 0.24)}
            <path d={`M${tent.x} 150 L${tent.x + tent.w / 2} ${150 - tent.h} L${tent.x + tent.w} 150 Z`} fill={i === 0 ? p.cloth : p.wood} stroke={p.ink} strokeWidth={STROKE} />
            <path d={`M${tent.x + tent.w / 2 - 12} 150 L${tent.x + tent.w / 2} ${150 - tent.h + 14} L${tent.x + tent.w / 2 + 12} 150 Z`} fill={p.groundShadow} opacity="0.6" />
            <path d={`M${tent.x + tent.w / 2} ${150 - tent.h} l 0 -10`} stroke={p.woodDark} strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
        {/* the fire ring, and its light on the ground */}
        <ellipse cx={fireX} cy="150" rx="34" ry="10" fill={p.sunGlow} opacity="0.3" />
        <path d={`M${fireX - 18} 152 h36`} stroke={p.stoneDark} strokeWidth="4" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <line key={`nc-w${i}`} x1={fireX - 14 + i * 12} y1="152" x2={fireX + 4 - i * 10} y2="140" stroke={p.woodDark} strokeWidth="3.5" strokeLinecap="round" />
        ))}
        <path d={`M${fireX} 142 C ${fireX + 12} 128 ${fireX - 8} 120 ${fireX} 104 C ${fireX + 8} 120 ${fireX + 16} 128 ${fireX} 142 Z`} fill={p.accent} opacity="0.9" />
        <path d={`M${fireX} 138 C ${fireX + 6} 128 ${fireX - 3} 122 ${fireX} 112 Z`} fill={p.sunGlow} />
        {/* pot on a tripod */}
        <g transform={`translate(${fireX + 30} 0)`}>
          <path d="M-10 132 L10 132 L6 150 L-6 150 Z" fill={p.metal} stroke={p.ink} strokeWidth="2" />
          <path d="M-12 132 h24" stroke={p.ink} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M-8 128 q 4 -10 2 -18 M4 128 q 2 -12 6 -16" stroke={p.cloth} strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round" />
        </g>
        {/* a rolled bedroll and a water skin */}
        <ellipse cx={Math.round(place(propOf(v, 4), 96, 124))} cy="146" rx="16" ry="7" fill={p.accentSoft} stroke={p.ink} strokeWidth="2" />
        <path d={`M${Math.round(place(propOf(v, 5), 246, 268))} 150 q 10 -22 20 0 Z`} fill={p.woodDark} stroke={p.ink} strokeWidth="2" />
        {Array.from({ length: 3 }, (_, i) => {
          const s = scatter(v, i + 10, fireX - 30, fireX + 30, 92, 110);
          return <circle key={`nc-e${i}`} cx={s.x} cy={s.y} r="2" fill={p.sunGlow} opacity="0.9" />;
        })}
      </g>
    );
  },

  /** One lamp, big, with the cone of light it makes. */
  lantern: (p, v) => {
    const x = Math.round(place(propOf(v, 0), 140, 180));
    const swing = Math.round(place(propOf(v, 1), -8, 8));
    return (
      <g>
        <path d={`M${x - 40} 168 L${x - 96} 150 L${x + 96} 150 L${x + 40} 168 Z`} fill={p.sunGlow} opacity="0.22" />
        <g transform={`rotate(${swing} ${x} 56)`}>
          <line x1={x} y1="26" x2={x} y2="60" stroke={p.metal} strokeWidth="3" />
          <path d={`M${x - 10} 60 h20 l 4 8 h-28 Z`} fill={p.metal} stroke={p.ink} strokeWidth="1.6" />
          <path d={`M${x - 16} 68 L${x + 16} 68 L${x + 12} 116 L${x - 12} 116 Z`} fill={p.cloth} stroke={p.ink} strokeWidth={STROKE} opacity="0.7" />
          <path d={`M${x - 16} 68 L${x + 16} 68 L${x + 12} 116 L${x - 12} 116 Z`} fill={p.sunGlow} opacity="0.55" />
          {/* the flame, and the glow around it */}
          <circle cx={x} cy="92" r="12" fill={p.sunGlow} opacity="0.6" />
          <path d={`M${x} 82 C ${x + 7} 90 ${x + 4} 98 ${x} 102 C ${x - 4} 98 ${x - 7} 90 ${x} 82 Z`} fill={p.accent} />
          {[-6, 0, 6].map((o) => (
            <line key={`ln-bar${o}`} x1={x + o} y1="68" x2={x + o} y2="116" stroke={p.ink} strokeWidth="1.8" opacity="0.5" />
          ))}
          <path d={`M${x - 12} 116 h24 l -3 10 h-18 Z`} fill={p.metal} stroke={p.ink} strokeWidth="1.6" />
          <path d={`M${x} 126 q ${place(propOf(v, 2), -8, 8)} 12 0 22`} stroke={p.cloth} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
        </g>
        {/* rays, so the light itself is drawn, not just implied */}
        {[-52, -26, 0, 26, 52].map((a) => (
          <line
            key={`ln-r${a}`}
            x1={x}
            y1="96"
            x2={(x + Math.sin((a * Math.PI) / 180) * 62).toFixed(1)}
            y2={(96 + Math.cos((a * Math.PI) / 180) * 62).toFixed(1)}
            stroke={p.sunGlow}
            strokeWidth="2"
            opacity="0.35"
            strokeLinecap="round"
          />
        ))}
      </g>
    );
  },

  /** Angled from behind, so the mat points somewhere. */
  prayerMat: (p, v) => {
    const skew = place(propOf(v, 0), -6, 6);
    const slide = Math.round(place(propOf(v, 1), -14, 14));
    return (
      <g transform={`translate(${slide} 0)`}>
        {shadow(p, 150, 76, 0.18)}
        {/* the mat, drawn as a parallelogram lying in perspective */}
        <path d={`M${72 + skew} 166 L${110 + skew} 92 L${236 + skew} 92 L${198 + skew} 166 Z`} fill={p.accent} stroke={p.ink} strokeWidth={STROKE} />
        <path d={`M${84 + skew} 158 L${116 + skew} 100 L${224 + skew} 100 L${188 + skew} 158 Z`} fill={p.accentSoft} stroke={p.ink} strokeWidth="1.6" opacity="0.85" />
        {/* the arch motif at the head of the mat */}
        <path
          d={`M${136 + skew} 148 L${136 + skew} 118 Q ${136 + skew} 104 162 ${104} Q ${188 + skew} 104 ${188 + skew} 118 L${188 + skew} 148 Z`}
          fill={p.cloth}
          stroke={p.ink}
          strokeWidth="1.8"
          opacity="0.9"
        />
        <path d={`M${84 + skew} 130 h110 M${88 + skew} 146 h102`} stroke={p.accent} strokeWidth="2.4" opacity="0.55" />
        {/* fringe along the near edge */}
        {Array.from({ length: 9 }, (_, i) => {
          const fx = 78 + i * 15 + skew;
          return <line key={`pm-f${i}`} x1={fx} y1="166" x2={(fx + 3).toFixed(1)} y2="174" stroke={p.woodDark} strokeWidth="2.4" strokeLinecap="round" />;
        })}
        {/* a pair of sandals left neatly at the side */}
        <g transform={`translate(${Math.round(place(propOf(v, 2), 240, 262))} 152) rotate(-8)`}>
          <ellipse cx="0" cy="0" rx="15" ry="7" fill={p.wood} stroke={p.ink} strokeWidth="2" />
          <ellipse cx="14" cy="8" rx="15" ry="7" fill={p.wood} stroke={p.ink} strokeWidth="2" />
          <path d="M-8 -2 l 10 4 M6 6 l 10 4" stroke={p.woodDark} strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    );
  },

  /** Learning: the page, the pen and the ink, close in. */
  inkwell: (p, v) => {
    const open = place(propOf(v, 0), 0.9, 1.1);
    return (
      <g transform={`translate(160 128) scale(${open.toFixed(2)}) translate(-160 -128)`}>
        {shadow(p, 152, 84, 0.24)}
        {/* the rehal stand */}
        <path d="M112 150 L152 118 L158 150 Z" fill={p.woodDark} stroke={p.ink} strokeWidth="2" />
        <path d="M196 150 L156 118 L150 150 Z" fill={p.wood} stroke={p.ink} strokeWidth="2" />
        {/* the open book */}
        <path d="M152 120 C 120 106 88 108 70 118 L72 146 C 92 136 124 134 152 146 Z" fill={p.cloth} stroke={p.ink} strokeWidth={STROKE} />
        <path d="M156 120 C 188 106 220 108 238 118 L236 146 C 216 136 184 134 156 146 Z" fill={p.cloth} stroke={p.ink} strokeWidth={STROKE} />
        <line x1="154" y1="120" x2="154" y2="146" stroke={p.ink} strokeWidth="2.5" />
        {[-1, 1].map((side) =>
          [0, 1, 2].map((row) => (
            <line
              key={`ik-l${side}-${row}`}
              x1={154 + side * 18}
              y1={126 + row * 6}
              x2={154 + side * Math.round(place(propOf(v, row + 3), 46, 64))}
              y2={124 + row * 6}
              stroke={p.stoneDark}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
            />
          )),
        )}
        {/* the reed pen, mid-rest */}
        <g transform={`translate(${Math.round(place(propOf(v, 6), 210, 244))} ${Math.round(place(propOf(v, 7), 100, 122))}) rotate(${Math.round(place(propOf(v, 8), 26, 52))})`}>
          <path d="M0 0 L54 -4 L58 0 L54 4 L0 5 Z" fill={p.wood} stroke={p.ink} strokeWidth="2" />
          <path d="M-10 2 L0 0 L0 5 Z" fill={p.ink} />
          <line x1="22" y1="-2" x2="22" y2="4" stroke={p.woodDark} strokeWidth="2" />
        </g>
        {/* the inkpot, with a drop on the rim */}
        <g transform={`translate(${Math.round(place(propOf(v, 9), 60, 84))} 150)`}>
          <path d="M-14 0 L-12 -22 Q 0 -28 12 -22 L14 0 Z" fill={p.water} stroke={p.ink} strokeWidth="2" />
          <ellipse cx="0" cy="-22" rx="12" ry="4" fill={p.ink} />
          <path d="M10 -24 q 6 4 4 10" stroke={p.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      </g>
    );
  },

  /** Sowing: the seed is in the air, the furrow is ready, and green is answering. */
  sownField: (p, v) => {
    const handX = Math.round(place(propOf(v, 0), 210, 248));
    return (
      <g>
        {/* furrows running away from the viewer */}
        {[0, 1, 2, 3, 4].map((i) => {
          const near = -10 + i * 74;
          return <path key={`sf-f${i}`} d={`M${near} 178 C ${near + 40} 160 ${near + 70} 148 ${60 + i * 58} 120`} stroke={p.ink} strokeWidth="3" fill="none" opacity="0.45" strokeLinecap="round" />;
        })}
        <path d="M0 156 C 80 146 160 156 240 148 C 278 144 306 150 320 148" stroke={p.groundShadow} strokeWidth="5" fill="none" opacity="0.3" />
        {/* the handful, still falling */}
        <path d={`M${handX} 84 q 16 4 22 14`} stroke={p.woodDark} strokeWidth="4" fill="none" strokeLinecap="round" />
        {Array.from({ length: 8 }, (_, i) => {
          const t = i / 7;
          const x = handX - 6 - t * (handX - 96);
          const y = 92 + t * t * 58 + place(propOf(v, i + 2), -5, 5);
          return <circle key={`sf-s${i}`} cx={x.toFixed(1)} cy={y.toFixed(1)} r={place(propOf(v, i + 9), 2, 3.4).toFixed(1)} fill={p.metal} stroke={p.ink} strokeWidth="1" />;
        })}
        {/* what has already come up */}
        {[64, 122, 188, 258].map((x, i) => {
          const h = Math.round(place(propOf(v, i + 5), 12, 22));
          return (
            <path
              key={`sf-g${i}`}
              d={`M${x} 150 v-${h} M${x} ${150 - h} q -8 -6 -10 -14 M${x} ${150 - h} q 8 -6 10 -14`}
              stroke={p.foliage}
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
      </g>
    );
  },

  /** Grief with a reason: the shirt, torn, held up. */
  tornRobe: (p, v) => {
    const tear = Math.round(place(propOf(v, 0), 78, 104));
    return (
      <g transform={`translate(${Math.round(place(propOf(v, 1), -16, 16))} 0)`}>
        <line x1="160" y1="46" x2="160" y2="150" stroke={p.woodDark} strokeWidth="5" strokeLinecap="round" />
        <line x1="126" y1="60" x2="194" y2="60" stroke={p.woodDark} strokeWidth="4" strokeLinecap="round" />
        {shadow(p, 160, 40, 0.22)}
        {/* the tunic */}
        <path d="M126 62 L194 62 L202 100 L186 100 L182 146 L138 146 L134 100 L118 100 Z" fill={p.cloth} stroke={p.ink} strokeWidth={STROKE} />
        <path d="M126 62 Q160 74 194 62" fill="none" stroke={p.ink} strokeWidth="2" opacity="0.5" />
        {/* the tear across it */}
        <path d={`M${tear} 74 l 10 12 l -8 12 l 12 14 l -6 12 l 12 16`} stroke={p.ink} strokeWidth="3" fill="none" strokeLinecap="round" transform="translate(38 0)" />
        <path
          d={`M${tear} 78 q 6 10 -2 16 q 10 8 2 18`}
          stroke={p.groundShadow}
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          transform="translate(38 0)"
        />
        {/* one sleeve, torn off, still hanging by a thread */}
        <g transform={`translate(${Math.round(place(propOf(v, 2), 196, 214))} ${Math.round(place(propOf(v, 3), 84, 100))}) rotate(${Math.round(place(propOf(v, 4), 10, 34))})`}>
          <path d="M0 0 L34 6 L30 26 L-2 20 Z" fill={p.cloth} stroke={p.ink} strokeWidth="2" />
          <path d="M0 4 q -8 4 -6 12" stroke={p.woodDark} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
        {/* a few threads left on the shoulder */}
        <path d="M138 100 l -6 8 M182 100 l 6 8" stroke={p.woodDark} strokeWidth="1.8" strokeLinecap="round" />
      </g>
    );
  },

  /** A place that was destroyed: what is left is standing, and broken. */
  ruinedColumns: (p, v) => {
    const drift = Math.round(place(propOf(v, 0), -20, 20));
    return (
      <g>
        {shadow(p, 160, 110, 0.2)}
        {/* still standing, chipped */}
        {[
          { x: 82 + drift, h: 78 },
          { x: 118 + drift, h: 58 },
        ].map((col, i) => (
          <g key={`rc-s${i}`}>
            <path d={`M${col.x - 12} 152 L${col.x - 9} ${152 - col.h} L${col.x + 9} ${152 - col.h} L${col.x + 12} 152 Z`} fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
            {[0, 1, 2, 3].map((flute) => (
              <line key={`rc-f${i}-${flute}`} x1={col.x - 6 + flute * 4} y1={150 - col.h} x2={col.x - 6 + flute * 4} y2="150" stroke={p.stoneDark} strokeWidth="1.6" opacity="0.7" />
            ))}
            <path d={`M${col.x - 14} ${152 - col.h} h28 l -4 -8 h-20 Z`} fill={p.stoneDark} stroke={p.ink} strokeWidth="2" />
          </g>
        ))}
        {/* the fallen arch across them */}
        <path
          d={`M${58 + drift} ${152 - 62} A 58 58 0 0 1 ${174 + drift} ${152 - 62} L${166 + drift} ${152 - 74} A 50 50 0 0 0 ${66 + drift} ${152 - 74} Z`}
          fill={p.stone}
          stroke={p.ink}
          strokeWidth="2"
        />
        {/* one column on the ground, half buried */}
        <g transform={`translate(${Math.round(place(propOf(v, 1), 190, 226))} 148) rotate(${Math.round(place(propOf(v, 2), -8, 6))})`}>
          <rect x="-46" y="-12" width="92" height="22" rx="10" fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
          <path d="M-46 -4 h92" stroke={p.stoneDark} strokeWidth="2" opacity="0.6" />
          <ellipse cx="46" cy="-1" rx="8" ry="12" fill={p.stoneDark} stroke={p.ink} strokeWidth="2" />
        </g>
        {/* broken pieces and the sand drifting over them */}
        {Array.from({ length: 4 }, (_, i) => {
          const s = scatter(v, i + 5, 60, 280, 138, 152);
          return <path key={`rc-d${i}`} d={`M${s.x - s.r} ${s.y} l ${s.r} -${s.r * 0.8} l ${s.r} ${s.r * 0.8} Z`} fill={p.stoneDark} stroke={p.ink} strokeWidth="1.4" />;
        })}
        <path d={`M${20 + drift} 160 q 40 -10 80 0 t 80 0 t 80 0`} stroke={p.groundShadow} strokeWidth="4" fill="none" opacity="0.3" />
      </g>
    );
  },

  /** A city cut out of a cliff, so the wall itself is the architecture. */
  carvedHomes: (p, v) => {
    const cliffTop = Math.round(place(propOf(v, 0), 40, 56));
    const doors = 3 + (v.ridge % 2);
    return (
      <g>
        <path d={`M24 152 L24 ${cliffTop + 14} L58 ${cliffTop - 10} L104 ${cliffTop + 8} L150 ${cliffTop - 18} L206 ${cliffTop + 6} L252 ${cliffTop - 12} L296 ${cliffTop + 10} L296 152 Z`} fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
        {/* strata lines in the rock face */}
        {[0, 1, 2].map((i) => (
          <path key={`ch-s${i}`} d={`M28 ${cliffTop + 26 + i * 22} H292`} stroke={p.stoneDark} strokeWidth="2" opacity="0.45" />
        ))}
        {Array.from({ length: doors }, (_, i) => {
          const x = 58 + i * (212 / doors) + place(propOf(v, i + 2), -8, 8);
          const top = Math.round(place(propOf(v, i + 7), cliffTop + 34, cliffTop + 46));
          return (
            <g key={`ch-d${i}`}>
              {/* doorway with its pediment */}
              <path d={`M${x - 16} 152 L${x - 16} ${top + 22} Q ${x} ${top - 6} ${x + 16} ${top + 22} L${x + 16} 152 Z`} fill={p.groundShadow} stroke={p.ink} strokeWidth="2" />
              <path d={`M${x - 20} ${top + 20} L${x} ${top - 10} L${x + 20} ${top + 20}`} fill="none" stroke={p.ink} strokeWidth="2.5" />
              {/* a ledge carved under each window */}
              <path d={`M${x - 20} 152 h40`} stroke={p.stoneDark} strokeWidth="4" strokeLinecap="round" />
            </g>
          );
        })}
        {/* upper storeys of square windows */}
        {Array.from({ length: 5 }, (_, i) => {
          const x = 44 + i * 54 + place(propOf(v, i + 11), -6, 6);
          const y = cliffTop + 18 + (i % 2) * 12;
          return <rect key={`ch-w${i}`} x={x} y={y} width="12" height={Math.round(place(propOf(v, i + 3), 14, 22))} fill={p.groundShadow} stroke={p.ink} strokeWidth="1.8" />;
        })}
        {/* the flat front yard, with two graves' worth of stones at the foot */}
        <path d="M24 152 H296" stroke={p.ink} strokeWidth="2.5" />
        {[Math.round(place(propOf(v, 5), 92, 124)), Math.round(place(propOf(v, 6), 196, 236))].map((x, i) => (
          <path key={`ch-b${i}`} d={`M${x} 152 l 5 -14 h14 l 5 14 Z`} fill={p.stoneDark} stroke={p.ink} strokeWidth="1.8" />
        ))}
      </g>
    );
  },

  /** One pole and one cloth, planted in the sand: an army's standard without an army. */
  banner: (p, v) => {
    const x = 128;
    const top = Math.round(place(propOf(v, 0), 26, 44));
    const clothW = Math.round(place(propOf(v, 1), 62, 92));
    const clothH = Math.round(place(propOf(v, 2), 40, 56));
    const flutter = Math.round(place(propOf(v, 3), 5, 13));
    const mound = Math.round(place(propOf(v, 4), 10, 18));
    const stoneH = Math.round(place(propOf(v, 5), 8, 14));
    return (
      <g>
        {shadow(p, x + 8, 44, 0.24)}
        {/* the cloth, stretched out with a torn fly edge */}
        <path
          d={`M${x} ${top + 6} Q ${x + clothW * 0.5} ${top + 6 - flutter} ${x + clothW} ${top + 12} L ${x + clothW - 9} ${top + 12 + clothH * 0.5} L ${x + clothW} ${top + 6 + clothH} Q ${x + clothW * 0.5} ${top + 10 + clothH + flutter} ${x} ${top + 10 + clothH} Z`}
          fill={p.accent}
          stroke={p.ink}
          strokeWidth={STROKE}
        />
        <path
          d={`M${x + 5} ${top + 8 + clothH * 0.45} Q ${x + clothW * 0.55} ${top + 4 + clothH * 0.45} ${x + clothW - 7} ${top + 10 + clothH * 0.45}`}
          fill="none"
          stroke={p.cloth}
          strokeWidth="5"
          opacity="0.8"
        />
        {/* pole, finial and the lashes holding the cloth on */}
        <line x1={x} y1={top - 10} x2={x} y2="152" stroke={p.woodDark} strokeWidth="6" strokeLinecap="round" />
        <circle cx={x} cy={top - 14} r="5" fill={p.metal} stroke={p.ink} strokeWidth="1.8" />
        {[top + 6, top + 12 + clothH - 4].map((y, i) => (
          <rect key={`bn-l${i}`} x={x - 6} y={y} width="12" height="5" rx="2" fill={p.metal} stroke={p.ink} strokeWidth="1.5" />
        ))}
        {/* where it was thrust into the ground */}
        <path d={`M${x - 36} 152 Q ${x} ${152 - mound * 2} ${x + 36} 152 Z`} fill={p.groundNear} stroke={p.ink} strokeWidth="2" />
        <path d={`M${x + 52} 152 l 6 -${stoneH} h 13 l 6 ${stoneH} Z`} fill={p.stoneDark} stroke={p.ink} strokeWidth="1.8" />
      </g>
    );
  },

  /** Walls on rising ground — a fortified place, which is not the same town as cityGate. */
  fortress: (p, v) => {
    const rise = Math.round(place(propOf(v, 0), 96, 116));
    const towers = 2 + (v.ridge % 2);
    const wallTop = rise - 34;
    return (
      <g>
        {/* the rocky hill the fort sits on */}
        <path d={`M30 152 L70 ${rise} L250 ${rise} L290 152 Z`} fill={p.stoneDark} stroke={p.ink} strokeWidth={STROKE} />
        {Array.from({ length: towers }, (_, i) => {
          const cx = 92 + i * (136 / Math.max(towers - 1, 1));
          const height = Math.round(place(propOf(v, i + 1), 42, 58));
          const cone = Math.round(place(propOf(v, i + 6), 16, 24));
          return (
            <g key={`ft-t${i}`}>
              <path d={`M${cx - 15} ${rise} L${cx - 15} ${rise - height} L${cx + 15} ${rise - height} L${cx + 15} ${rise} Z`} fill={p.stone} stroke={p.ink} strokeWidth="2.2" />
              <path d={`M${cx - 18} ${rise - height} L${cx} ${rise - height - cone} L${cx + 18} ${rise - height} Z`} fill={p.woodDark} stroke={p.ink} strokeWidth="2" />
              {/* narrow slit windows */}
              <rect x={cx - 2.5} y={rise - height + 12} width="5" height="13" fill={p.groundShadow} />
              <rect x={cx - 2.5} y={rise - 20} width="5" height="11" fill={p.groundShadow} />
            </g>
          );
        })}
        {/* the curtain wall between them, crenellated along the top */}
        <path d={`M92 ${rise} L92 ${wallTop} L228 ${wallTop} L228 ${rise} Z`} fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
        {[100, 118, 136, 184, 202, 220].map((x, i) => (
          <rect key={`ft-c${i}`} x={x - 5} y={wallTop - 9} width="10" height="9" fill={p.stoneDark} stroke={p.ink} strokeWidth="1.6" />
        ))}
        {/* one heavy door, set high because the wall is the way in */}
        <path d={`M152 ${rise} L152 ${rise - 22} Q 160 ${rise - 34} 168 ${rise - 22} L168 ${rise} Z`} fill={p.woodDark} stroke={p.ink} strokeWidth="2.2" />
        <line x1="160" y1={rise - 28} x2="160" y2={rise} stroke={p.ink} strokeWidth="2" />
        {/* a rock face broken along the hillside */}
        <path d={`M70 ${rise} H250`} stroke={p.ink} strokeWidth="2" opacity="0.5" />
        {[Math.round(place(propOf(v, 3), 96, 126)), Math.round(place(propOf(v, 4), 186, 224))].map((x, i) => (
          <path key={`ft-r${i}`} d={`M${x} 152 l 7 -${Math.round(place(propOf(v, i + 8), 9, 15))} h 12 l 6 ${Math.round(place(propOf(v, i + 8), 9, 15))} Z`} fill={p.stoneDark} stroke={p.ink} strokeWidth="1.8" />
        ))}
      </g>
    );
  },

  /** Ranks of spears, receding: the fighters themselves stay off the page. */
  armyLines: (p, v) => {
    const tilt = Number(place(propOf(v, 0), -4, 4).toFixed(1));
    return (
      <g>
        {Array.from({ length: 3 }, (_, row) => {
          const base = 150 - row * 17;
          const scale = 1 - row * 0.24;
          const count = 5 - row;
          const from = 60 + row * 22;
          const span = 200 - row * 44;
          return (
            <g key={`al-r${row}`} opacity={`${(1 - row * 0.16).toFixed(2)}`}>
              {Array.from({ length: count }, (_, i) => {
                const x = Math.round(from + (i * span) / (count - 1) + place(propOf(v, row * 5 + i + 1), -9, 9));
                const shaftTop = Math.round(base - (34 + row * 4) * scale * 1.9);
                const head = Math.round(place(propOf(v, row * 5 + i + 9), 8, 13) * scale);
                return (
                  <g key={`al-s${row}-${i}`}>
                    <line x1={x} y1={base} x2={x + tilt} y2={shaftTop} stroke={p.woodDark} strokeWidth={Math.max(2, 3.5 * scale)} />
                    <path d={`M${x + tilt - head * 0.35} ${shaftTop + head} L${x + tilt} ${shaftTop} L${x + tilt + head * 0.35} ${shaftTop + head} Z`} fill={p.metal} stroke={p.ink} strokeWidth="1.4" />
                    {row === 0 && (
                      <circle cx={x} cy={base - 6} r={Math.round(place(propOf(v, i + 2), 8, 12))} fill={i % 2 === 0 ? p.accent : p.cloth} stroke={p.ink} strokeWidth="2" />
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* the line of the ground the ranks stand on */}
        <path d="M34 152 H286" stroke={p.ink} strokeWidth="2.5" />
        {[Math.round(place(propOf(v, 1), 44, 68)), Math.round(place(propOf(v, 2), 250, 278))].map((x, i) => (
          <ellipse key={`al-d${i}`} cx={x} cy="149" rx="16" ry="3.5" fill={p.groundShadow} opacity="0.3" />
        ))}
      </g>
    );
  },

  /** One family's yard: this is where a child in these stories actually lived. */
  homeYard: (p, v) => {
    const door = Math.round(place(propOf(v, 0), 118, 152));
    const roof = Math.round(place(propOf(v, 1), 74, 90));
    const poles = 3 + (v.ridge % 3);
    return (
      <g>
        {shadow(p, 160, 92, 0.2)}
        {/* the low flat-roofed house */}
        <path d={`M74 150 L74 ${roof} L232 ${roof} L232 150 Z`} fill={p.stone} stroke={p.ink} strokeWidth={STROKE} />
        <path d={`M68 ${roof} L238 ${roof} L238 ${roof - 9} L68 ${roof - 9} Z`} fill={p.stoneDark} stroke={p.ink} strokeWidth="2" />
        {/* roof poles laid across, and the ladder up to them */}
        {Array.from({ length: poles }, (_, i) => (
          <line key={`hy-p${i}`} x1={80 + i * (150 / poles)} y1={roof - 9} x2={86 + i * (150 / poles)} y2={roof + 5} stroke={p.woodDark} strokeWidth="2.5" />
        ))}
        <line x1="244" y1={roof - 6} x2="252" y2="150" stroke={p.wood} strokeWidth="3.5" />
        <line x1="234" y1={roof + 2} x2="242" y2="150" stroke={p.wood} strokeWidth="3.5" />
        {[roof + 12, roof + 30, roof + 48].map((y, i) => (
          <line key={`hy-r${i}`} x1={234 - (y - roof) * 0.13} y1={y} x2={252} y2={y} stroke={p.wood} strokeWidth="2.5" />
        ))}
        {/* the doorway, and one small window above it */}
        <path d={`M${door - 15} 150 L${door - 15} ${roof + 24} Q ${door} ${roof + 8} ${door + 15} ${roof + 24} L${door + 15} 150 Z`} fill={p.woodDark} stroke={p.ink} strokeWidth="2.2" />
        <path d={`M${door - 15} ${roof + 34} H${door + 15}`} stroke={p.ink} strokeWidth="2" opacity="0.6" />
        <rect x={door + 34} y={roof + 14} width="13" height="15" fill={p.groundShadow} stroke={p.ink} strokeWidth="1.8" />
        {/* the yard: water jars, a grinding stone and a mat rolled up */}
        {[Math.round(place(propOf(v, 2), 92, 108)), Math.round(place(propOf(v, 3), 196, 214))].map((x, i) => {
          const h = Math.round(place(propOf(v, i + 6), 18, 26));
          return <path key={`hy-j${i}`} d={`M${x - 9} 150 q -3 -${h} 9 -${h} q 12 0 9 ${h} Z`} fill={p.cloth} stroke={p.ink} strokeWidth="2" />;
        })}
        <ellipse cx={Math.round(place(propOf(v, 4), 128, 148))} cy="146" rx="12" ry="4.5" fill={p.stoneDark} stroke={p.ink} strokeWidth="1.8" />
        <rect x={Math.round(place(propOf(v, 5), 176, 200))} y="142" width="26" height="8" rx="4" fill={p.accentSoft} stroke={p.ink} strokeWidth="1.8" />
        {/* a shade tree at the corner of the wall */}
        <line x1="262" y1="150" x2="262" y2={roof + 6} stroke={p.wood} strokeWidth="4" strokeLinecap="round" />
        <path d={`M${262 - 17} ${roof + 10} q 17 -${Math.round(place(propOf(v, 7), 22, 34))} 34 0 q -17 12 -34 0 Z`} fill={p.foliage} stroke={p.ink} strokeWidth="2" />
      </g>
    );
  },
};
