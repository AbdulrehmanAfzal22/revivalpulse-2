import { storyboardFor } from '../storyScenes/storyboard';
import { StoryboardSet, placementFor } from '../storyScenes/StoryboardSet';
import { STORYBOARD_SUBJECTS } from '../storyScenes/storyboardSubjects';
import { CONTEXTUAL_MOTIF_VARIANTS } from '../storyScenes/contextualMotifVariants';
import { useId } from 'react';
import type { CSSProperties } from 'react';
import type { SceneSpec } from '../storyScenes/sceneTypes';
import { buildPalette } from '../storyScenes/sceneTypes';
import { MOTIFS } from '../storyScenes/motifs';
import { variationFor, propOf } from '../storyScenes/sceneVariation';
import styles from './StoryScene.module.css';
export interface NarrativeSceneProps { scene:SceneSpec; accent:string; seed:string; frame?:number; className?:string }
/** Paragraph-directed compositions, using the project's editable native art.
 * The primary object is never exchanged for an unrelated object for variety.
 * Secondary objects are literal subjects found in this paragraph. */
export default function NarrativeScene({scene,accent,seed,frame=0,className}:NarrativeSceneProps){
 const uid='n'+useId().replace(/[^a-zA-Z0-9_-]/g,'');const v=variationFor(seed),p=buildPalette(scene.sky,scene.ground,accent,v.tint);
 const shot=storyboardFor(seed);
 const art=scene.art,layout=art?.layout??'landscape',Primary=(shot ? STORYBOARD_SUBJECTS[scene.motif] : undefined) ?? CONTEXTUAL_MOTIF_VARIANTS[scene.motif] ?? MOTIFS[scene.motif];
 const placement=shot ? placementFor(shot.stage,scene) : undefined;
 const objectVariation=shot ? {...v,props:[(shot.pose+.1)/12,...v.props.slice(1)]} : v;
 const Secondary=art?.secondary?(CONTEXTUAL_MOTIF_VARIANTS[art.secondary] ?? MOTIFS[art.secondary]):undefined;
 const near=layout==='closeup'||layout==='foreground';
 const scale=layout==='closeup'?3.7:layout==='overlook'?2.55:layout==='stillLife'?3.3:3.0;
 const x=layout==='foreground'?42:layout==='pathway'?255:layout==='waterside'?110:layout==='doorway'?150:layout==='overlook'?160:layout==='closeup'?-94:0;
 const y=layout==='closeup'?-45:layout==='overlook'?32:layout==='stillLife'?-3:0;
 const night=scene.sky==='night'||scene.sky==='dusk';
 const ridge=94+v.ridge*12;
 const skyTop=scene.sky==='day'?'#9ed3df':p.skyTop,skyBottom=scene.sky==='day'?'#f8e8c8':p.skyBottom;
 const landscape=scene.ground!=='stone';
 const waves=scene.ground==='sea'&&scene.motif!=='seaPassage';
 return <div className={[styles.scene,className].filter(Boolean).join(' ')} role="img" aria-label={scene.alt} style={{'--scene-accent':accent} as CSSProperties} data-story-art={seed} data-art-layout={shot?.stage??layout}>
 <svg className={styles.art} viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
 <defs><linearGradient id={`${uid}-sky`} x2="0" y2="1"><stop stopColor={skyTop}/><stop offset="1" stopColor={skyBottom}/></linearGradient><linearGradient id={`${uid}-ground`} x2="0" y2="1"><stop stopColor={p.ridgeNear}/><stop offset="1" stopColor={p.groundNear}/></linearGradient><radialGradient id={`${uid}-light`}><stop stopColor="#fff3c9" stopOpacity=".75"/><stop offset="1" stopColor="#fff3c9" stopOpacity="0"/></radialGradient><linearGradient id={`${uid}-shade`} x2="1" y2="0"><stop stopColor={p.woodDark}/><stop offset="1" stopColor={p.stone}/></linearGradient><pattern id={`${uid}-grain`} width="29" height="31" patternUnits="userSpaceOnUse"><circle cx="3" cy="5" r=".8" fill="#ffffff" opacity=".17"/><circle cx="19" cy="22" r=".65" fill="#38302b" opacity=".1"/></pattern></defs>
 <rect width="960" height="540" fill={`url(#${uid}-sky)`}/>
 {night?<><circle cx={v.sunX*3} cy="95" r="26" fill="#f9e9b9"/>{Array.from({length:scene.sky==='night'?22:7},(_,i)=><circle key={i} cx={20+propOf(v,i)*920} cy={20+propOf(v,i+3)*210} r={1.5+propOf(v,i+7)*2} fill="#f8edd2"/>)}</>:<><circle cx={v.sunX*3} cy={v.sunY*2} r="180" fill={`url(#${uid}-light)`}/><circle cx={v.sunX*3} cy={v.sunY*2} r="35" fill="#ffecb8"/><g fill="#fff5e5" opacity=".55">{[0,1,2].map(i=><path key={i} d={`M${45+i*310} ${65+i%2*33} q35 -30 68 -6 q28 -37 55 -3 q47 -6 50 19 h-173z`}/>)}</g></>}
 {!shot&&<>
 <path d={`M0 332 Q125 ${ridge+90} 270 298 Q410 ${ridge+45} 580 311 Q760 ${ridge+100} 960 294 L960 540 L0 540Z`} fill={p.ridgeFar} opacity=".52"/>
 <path d={`M0 364 Q167 ${ridge+180} 360 343 Q563 ${ridge+130} 755 356 Q870 332 960 351 L960 540 L0 540Z`} fill={p.ridgeNear}/>
 <path d="M0 423 Q220 370 427 416 Q668 365 960 419 L960 540 L0 540Z" fill={`url(#${uid}-ground)`}/>
 {waves&&<g fill="none" stroke={p.waterLight} strokeWidth="5" opacity=".65">{[0,1,2,3].map(i=><path key={i} d={`M-30 ${412+i*34} q105 -23 210 0 t210 0 t210 0 t420 0`}/>)}</g>}
 {layout==='waterside'&&<path d="M0 510 Q350 368 960 411 L960 540 L0 540Z" fill={p.water} opacity=".75"/>}
 {layout==='pathway'&&<path d="M90 540 Q360 405 613 322 L647 322 Q450 460 367 540Z" fill={p.cloth} opacity=".85"/>}
 {Secondary&&<g transform={`translate(${layout==='foreground'?530:20} 60) scale(1.5)`} opacity=".83">{Secondary(p,variationFor(seed+'-background'))}</g>}
 {layout==='stillLife'&&<><path d="M0 405 L960 390 L960 540 L0 540Z" fill={p.wood}/><path d="M0 449 L960 437 M0 492 L960 481" stroke={p.woodDark} strokeWidth="3" opacity=".22"/></>}
 </>}
 {shot&&<StoryboardSet stage={shot.stage} p={p} scene={scene}/>}
 {placement?<svg x={placement.x} y={placement.y} width={placement.width} height={placement.height} viewBox="20 28 280 146" preserveAspectRatio="xMidYMid meet" overflow="visible">{Primary(p,{...objectVariation,narrativePose:art?.subjectDetail})}</svg>:<g transform={`translate(${x} ${y}) scale(${scale})`}>{Primary(p,{...v,narrativePose:art?.subjectDetail})}</g>}
 {!shot&&<>
 {art?.subjectDetail==='construction'&&scene.motif!=='arkWorkshop'&&<g stroke={p.woodDark} strokeWidth="11" strokeLinecap="round"><path d="M34 489 L202 470 M48 509 L218 491"/></g>}
 {art?.subjectDetail==='arrival'&&<g fill={p.groundShadow} opacity=".45">{[0,1,2,3,4].map(i=><ellipse key={i} cx={790-i*22} cy={500-i*16} rx="5" ry="10" transform={`rotate(-35 ${790-i*22} ${500-i*16})`}/>)}</g>}
 {layout==='doorway'&&<><path d="M0 0 H960 V540 H883 V197 Q855 21 483 26 Q97 25 77 197 V540 H0Z" fill={`url(#${uid}-shade)`}/><path d="M64 540 V197 Q85 14 480 14 Q875 14 897 197 V540" fill="none" stroke={p.woodDark} strokeWidth="12"/></>}
 {landscape&&layout!=='doorway'&&layout!=='stillLife'&&<g fill={p.foliage} opacity=".85"><path d={`M0 540 Q${near?18:43} 452 27 423 Q${near?90:61} 470 83 540Z M960 540 Q923 428 945 414 Q879 476 881 540Z`}/></g>}
 {layout==='foreground'&&<><ellipse cx="64" cy="530" rx="93" ry="22" fill={p.groundShadow} opacity=".38"/><path d="M0 503 Q50 461 91 486 Q120 482 141 540 H0Z" fill={p.stoneDark}/></>}
 </>}
 {shot&&<StoryboardSet stage={shot.stage} p={p} scene={scene} front/>}
 <rect width="960" height="540" fill={`url(#${uid}-grain)`} pointerEvents="none"/>
 </svg></div>;
}
