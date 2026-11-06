import type { MotifRenderer } from './sceneTypes';
/** The original single camel was a low silhouette without visible legs.
 * This narrative version has an anatomically readable single hump and stance. */
export const CONTEXTUAL_MOTIF_VARIANTS: Partial<Record<import('types/kidsStories.types').StorySceneKey,MotifRenderer>>={
 camel:(p,v)=>v.narrativePose==='provision'?<g>
 <ellipse cx="211" cy="157" rx="54" ry="11" fill={p.water}/><ellipse cx="211" cy="155" rx="42" ry="6" fill={p.waterLight}/>
 <path d="M85 112 Q96 90 118 99 Q135 64 154 99 Q178 91 190 108 L208 132 L235 145 L234 153 L220 151 L195 138 L177 124 L172 156 L164 156 L165 126 L123 129 L116 156 L107 156 L109 126 L91 125Z" fill="#c1945e" stroke={p.ink} strokeWidth="2.5" strokeLinejoin="round"/>
 <path d="M85 113 Q70 114 75 133" fill="none" stroke={p.woodDark} strokeWidth="3"/><circle cx="229" cy="146" r="1.6" fill={p.ink}/>
 </g>:<g transform={v.props[1]&&v.props[1]>.5?'translate(320 0) scale(-1 1)':undefined}>
 <ellipse cx="167" cy="161" rx="77" ry="6" fill={p.groundShadow} opacity=".25"/>
 <path d="M109 115 Q115 91 136 99 Q152 62 175 100 Q196 92 207 108 L217 105 L222 76 Q227 61 241 69 L250 72 L249 80 L236 83 L235 118 Q230 130 210 132 L205 158 L197 158 L197 130 L173 134 L170 159 L161 159 L162 134 L136 131 L129 159 L120 159 L124 128 Q105 130 109 115Z" fill="#c1945e" stroke={p.ink} strokeWidth="2.5" strokeLinejoin="round"/>
 <path d="M111 112 Q95 112 100 133" fill="none" stroke={p.woodDark} strokeWidth="3"/><circle cx="240" cy="72" r="1.6" fill={p.ink}/><path d="M225 69 L222 60 L231 66" fill={p.wood}/><path d="M140 105 Q162 95 181 107 L179 120 L140 118Z" fill={p.accentSoft}/>
 </g>,
};
