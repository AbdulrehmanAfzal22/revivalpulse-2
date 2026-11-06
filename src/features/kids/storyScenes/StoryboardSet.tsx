import type { ScenePalette, SceneSpec } from './sceneTypes';
import { STORYBOARD_STAGES, type StoryboardStage } from './storyboard';

export interface StagePlacement { x:number; y:number; width:number; height:number }
export const STAGE_PLACEMENT:Record<StoryboardStage,StagePlacement>={
 openValley:{x:80,y:95,width:720,height:385},stoneTerrace:{x:365,y:75,width:555,height:315},
 archway:{x:255,y:130,width:460,height:300},wovenMat:{x:100,y:92,width:600,height:350},
 terracedSlope:{x:360,y:56,width:560,height:330},canopy:{x:90,y:155,width:550,height:310},
 windowSeat:{x:360,y:125,width:515,height:300},rockGorge:{x:260,y:145,width:450,height:290},
 courtyard:{x:100,y:130,width:650,height:330},shelf:{x:340,y:50,width:560,height:330},
 gardenWall:{x:90,y:65,width:550,height:330},windingPath:{x:385,y:55,width:490,height:285},
 colonnade:{x:355,y:165,width:500,height:280},riverBend:{x:40,y:70,width:570,height:310},
 sunkenCourt:{x:200,y:160,width:560,height:320},cliffLedge:{x:350,y:75,width:550,height:320},
 mosaicFloor:{x:110,y:80,width:620,height:350},recess:{x:385,y:80,width:480,height:300},
 palmGrove:{x:280,y:110,width:590,height:335},gateway:{x:250,y:135,width:500,height:300},
 raisedDais:{x:250,y:50,width:610,height:335},sandyBasin:{x:80,y:125,width:620,height:350},
 timberFrame:{x:235,y:115,width:535,height:310},hillTown:{x:50,y:50,width:560,height:330},
 sideStreet:{x:365,y:165,width:500,height:295},roundWindow:{x:240,y:125,width:490,height:300},
 reedScreen:{x:60,y:130,width:650,height:350},steppedPlatform:{x:360,y:35,width:550,height:320},
 clothBackdrop:{x:300,y:120,width:610,height:345},stoneBridge:{x:100,y:70,width:600,height:330},
 roofTerrace:{x:315,y:55,width:565,height:335},alcove:{x:250,y:140,width:490,height:300},
};
export const SMALL_SUBJECTS = new Set([
 'sealedLetter','learningObjects','sling','armorWorkshop','waterJars','freedom',
 'sharedMeal','charityBasket','caravanSupplies','inkwell','tablets','tornRobe',
 'balance','prayerMat','banner','swords','basket',
]);
export function placementFor(stage:StoryboardStage,scene:SceneSpec):StagePlacement {
 if(SMALL_SUBJECTS.has(scene.motif))return STAGE_PLACEMENT[stage];
 const n=STORYBOARD_STAGES.indexOf(stage);
 // An entire town/sea never sits on the table intended for a letter or cup.
 return {x:45+(n%4)*39,y:42+(n%3)*17,width:710-(n%4)*22,height:408-(n%3)*16};
}
function LandscapeSet({stage,p,scene,front}:{stage:StoryboardStage;p:ScenePalette;scene:SceneSpec;front:boolean}){
 const n=STORYBOARD_STAGES.indexOf(stage),kind=n%8;
 const water=scene.ground==='sea',green=scene.ground==='green'||scene.ground==='valley';
 const near=water?p.water:p.groundNear,far=water?p.waterLight:p.ridgeFar;
 const offset=Math.floor(n/8)*27;
 if(front){
  if(kind===2)return <><path d="M0 0H960V45H0ZM0 0H58V540H0ZM902 0H960V540H902Z" fill={p.stoneDark}/><path d="M0 0L200 0L58 160ZM760 0H960V160L902 160Z" fill={p.stone}/></>;
  if(kind===5)return <><path d="M0 0L90 0L62 158L114 370L63 540H0ZM960 0H900L930 237L860 540H960Z" fill={p.stoneDark}/></>;
  return null;
 }
 return <>
  {kind===0?<path d={`M0 ${210+offset}L140 116L330 287L581 ${152+offset}L960 263V540H0Z`} fill={far}/>:kind===1?<path d={`M0 272Q${190+offset} 98 403 253Q690 106 960 265V540H0Z`} fill={far}/>:kind===3?<><path d={`M0 ${189+offset}L960 310V540H0Z`} fill={far}/><path d="M0 0H186V540H0Z" fill={p.stone}/></>:kind===4?<path d={`M0 302L180 ${170+offset}L390 280L600 151L960 304V540H0Z`} fill={far}/>:kind===6?<path d={`M0 190Q340 ${430-offset} 960 163V540H0Z`} fill={far}/>:<path d={`M0 ${270-offset}Q460 ${170+offset} 960 291V540H0Z`} fill={far}/>}
  <path d={`M0 ${399+offset/2}Q${260+offset} ${336-offset} 960 ${408-offset/2}V540H0Z`} fill={near}/>
  {water?<g fill="none" stroke={p.waterLight} strokeWidth="3" opacity=".6">{Array.from({length:5},(_,i)=><path key={i} d={`M${-70+i*17} ${403+i*28}q${70+offset} -18 ${140+offset*2} 0t${140+offset*2} 0t${140+offset*2} 0t${420+offset*2} 0`}/>)}</g>:<>
   {(kind===1||kind===4||kind===7)&&<path d={`M${n%2?40:780} 540Q${470+offset} 429 ${550-offset} 350L${580-offset} 350Q${550+offset} 454 ${n%2?280:960} 540Z`} fill={p.cloth} opacity=".8"/>}
   {green&&<g fill={p.foliage} opacity=".8">{[0,1,2,3,4,5].map(i=><path key={i} d={`M${15+i*34+offset} 530q-7 -29 -18 -36q21 2 21 26q3 -35 17 -45q-5 38 -20 55Z`}/>)}</g>}
   {!green&&<g fill={p.stone} opacity=".7">{[0,1,2,3].map(i=><path key={i} d={`M${25+i*227+offset} 508l16 -12l22 9l-4 9Z`}/>)}</g>}
  </>}
  {kind===6&&!water&&<><path d="M861 0Q844 192 877 540" fill="none" stroke={p.woodDark} strokeWidth="25"/><path d="M860 171Q765 112 756 55Q830 95 860 171M858 93Q906 25 960 32Q916 95 858 93Z" fill={green?p.foliage:p.wood}/></>}
 </>;
}
/** Individually authored set geometry. Water appears only in an aquatic scene;
 * architectural edges are picture framing, not invented historical events. */
export function StoryboardSet({stage,p,scene,front=false}:{stage:StoryboardStage;p:ScenePalette;scene:SceneSpec;front?:boolean}){
 if(!SMALL_SUBJECTS.has(scene.motif))return <LandscapeSet stage={stage} p={p} scene={scene} front={front}/>;
 const aquatic=scene.ground==='sea';const floor=aquatic?p.water:p.groundNear;
 const trim=p.stoneDark,wall=p.stone,light=p.cloth;
 if(front){switch(stage){
 case 'archway':return <path d="M0 0H960V540H865V184Q814 33 480 38Q146 33 95 184V540H0Z" fill={trim}/>;
 case 'windowSeat':return <><path d="M0 0H290V540H0ZM0 0H960V65H0Z" fill={p.woodDark}/><path d="M288 540V60H960V540H906V109H340V540Z" fill={p.wood}/></>;
 case 'rockGorge':return <><path d="M0 0L126 0L94 158L174 247L102 402L186 540H0Z" fill={trim}/><path d="M960 0H860L905 163L809 278L880 414L810 540H960Z" fill={p.stone}/></>;
 case 'colonnade':return <><path d="M0 0H170V540H75V0M70 47Q170 217 283 47" fill={wall}/><path d="M890 0H960V540H890ZM0 0H960V48H0Z" fill={trim}/></>;
 case 'recess':return <path d="M0 0H960V540H885V107Q625 -5 355 107V540H0Z" fill={wall}/>;
 case 'gateway':return <><path d="M0 0H960V540H800V181Q722 47 480 47Q238 47 160 181V540H0Z" fill={p.woodDark}/><path d="M0 470H960V540H0Z" fill={trim}/></>;
 case 'timberFrame':return <g fill={p.woodDark}><path d="M0 0H960V56H0ZM0 0H80V540H0ZM880 0H960V540H880Z"/><path d="M0 0L260 0L80 190Z M700 0H960V190L880 190Z"/></g>;
 case 'roundWindow':return <path fillRule="evenodd" d="M0 0H960V540H0ZM480 29C226 29 161 159 161 275C161 437 287 510 480 510C673 510 799 437 799 275C799 159 734 29 480 29Z" fill={trim}/>;
 case 'reedScreen':return <g stroke={p.woodDark} strokeWidth="18"><path d="M22 0V540M57 0V540M92 0V540M790 0V540M825 0V540M860 0V540M895 0V540M930 0V540"/><path d="M0 43H115M0 415H115M775 113H960M775 467H960" strokeWidth="10"/></g>;
 case 'clothBackdrop':return <><path d="M0 0H280Q128 226 238 540H0Z" fill={p.accentSoft}/><path d="M0 0H960V48Q502 92 0 0Z" fill={p.cloth}/><path d="M66 0Q17 224 90 540M126 0Q65 236 152 540" fill="none" stroke={p.accent} strokeWidth="8" opacity=".25"/></>;
 case 'alcove':return <path d="M0 0H960V540H820V178L740 60H220L140 178V540H0Z" fill={wall}/>;
 case 'canopy':return <><path d="M0 0H960L830 127Q724 95 624 136Q500 104 387 144Q262 110 146 151L0 120Z" fill={p.cloth}/><path d="M37 105V540M868 101V540" stroke={p.woodDark} strokeWidth="18"/></>;
 default:return null;
 }}
 switch(stage){
 case 'openValley':return <><path d="M0 270L145 125L321 291L528 174L730 300L960 157V540H0Z" fill={p.ridgeFar}/><path d="M0 411Q340 326 960 402V540H0Z" fill={floor}/></>;
 case 'stoneTerrace':return <><path d="M0 410L960 343V540H0Z" fill={wall}/><path d="M0 459L960 390M0 510L960 443M190 395L243 540M540 371L592 540M845 351L902 540" stroke={trim} strokeWidth="3"/><path d="M0 0H245V540H0Z" fill={trim}/></>;
 case 'archway':return <><rect y="380" width="960" height="160" fill={floor}/><path d="M0 540L480 350L960 540M170 540L480 350L780 540" stroke={light} strokeWidth="3" fill="none"/></>;
 case 'wovenMat':return <><rect width="960" height="540" fill={p.wood}/><path d="M85 60L825 115L925 474L95 493Z" fill={p.cloth}/><path d="M118 95L793 144L865 439L130 452Z" fill="none" stroke={p.accentSoft} strokeWidth="24"/>{Array.from({length:12},(_,i)=><path key={i} d={`M${143+i*55} 115L${153+i*58} 430`} stroke={p.woodDark} strokeWidth="2" opacity=".22"/>)}</>;
 case 'terracedSlope':return <><path d="M0 205L960 115V540H0Z" fill={p.ridgeFar}/><path d="M0 270L960 190V540H0ZM0 364L960 285V540H0ZM0 468L960 391V540H0Z" fill={floor} stroke={p.groundShadow} strokeWidth="16"/></>;
 case 'canopy':return <><path d="M0 375L960 315V540H0Z" fill={floor}/><path d="M0 424L960 365M80 540L350 350M530 540L620 330" stroke={p.groundShadow} strokeWidth="4"/></>;
 case 'windowSeat':return <><rect width="960" height="540" fill={wall}/><path d="M315 80H960V449H315Z" fill={p.skyBottom}/><path d="M291 437L960 437V540H291Z" fill={p.wood}/><path d="M340 466H960M340 503H960" stroke={p.woodDark} strokeWidth="5"/></>;
 case 'rockGorge':return <><path d="M0 540L480 203L960 540Z" fill={floor}/><path d="M125 0L272 279L47 540H0V0ZM960 0H825L719 238L960 444Z" fill={p.stone}/></>;
 case 'courtyard':return <><path d="M0 90H960V332H0Z" fill={wall}/>{[36,760].map(x=><path key={x} d={`M${x} 335V198Q${x+70} 62 ${x+140} 198V335Z`} fill={trim}/>)}<path d="M0 332H960V540H0Z" fill={p.groundNear}/><path d="M0 467H960M0 386H960M100 540L240 332M460 540V332M820 540L680 332" stroke={light} strokeWidth="4"/></>;
 case 'shelf':return <><rect width="960" height="540" fill={p.cloth}/><path d="M285 0H960V540H285Z" fill={p.stone}/><path d="M240 376L960 358V410L240 429Z" fill={p.wood}/><path d="M267 430V490L317 426M872 415V480L822 419" stroke={p.woodDark} strokeWidth="18"/><path d="M0 0H200V540H0Z" fill={p.woodDark}/></>;
 case 'gardenWall':return <><rect y="100" width="960" height="290" fill={wall}/><path d="M0 370Q410 306 960 405V540H0Z" fill={floor}/><path d="M770 415Q686 188 775 40M768 179Q849 85 951 141M752 245Q671 144 617 146" fill="none" stroke={p.foliage} strokeWidth="29"/><path d="M680 96Q746 38 789 44Q758 124 680 96M802 145Q870 91 940 148Q860 190 802 145Z" fill={p.foliage}/></>;
 case 'windingPath':return <><path d="M0 262Q480 119 960 280V540H0Z" fill={p.ridgeFar}/><path d="M20 540Q688 475 467 360Q269 256 747 203L859 213Q418 283 645 355Q900 455 337 540Z" fill={light}/><path d="M0 380Q90 302 250 403L384 540H0Z" fill={floor}/></>;
 case 'colonnade':return <><rect y="340" width="960" height="200" fill={floor}/><path d="M210 340V70H260V340M315 340V70H350V340M382 340V70H407V340M0 346H960" stroke={trim} strokeWidth="8"/><path d="M0 540L480 335L960 540" stroke={light} strokeWidth="4" fill="none"/></>;
 case 'riverBend':return <><path d="M0 275Q300 164 960 291V540H0Z" fill={p.ridgeFar}/><path d="M0 530Q270 430 682 377Q947 344 785 220L960 234V540Z" fill={aquatic?p.water:p.cloth}/><path d="M0 285Q363 226 565 331Q473 417 0 415Z" fill={floor}/></>;
 case 'sunkenCourt':return <><rect width="960" height="540" fill={wall}/><path d="M105 136L854 136L960 540H0Z" fill={floor}/><path d="M0 85H960L900 136H61ZM0 136H61L0 540ZM900 136H960V540Z" fill={trim}/><path d="M61 136H900M42 189H917M23 242H934" stroke={light} strokeWidth="12"/></>;
 case 'cliffLedge':return <><path d="M0 313L200 90L390 273L650 127L960 301V540H0Z" fill={p.ridgeFar}/><path d="M220 397L960 362V540H315Z" fill={p.stone}/><path d="M220 397L315 443L960 408V362Z" fill={light}/><path d="M380 443L400 540M690 428L720 540" stroke={trim} strokeWidth="5"/></>;
 case 'mosaicFloor':return <><rect width="960" height="540" fill={light}/>{Array.from({length:8},(_,row)=>Array.from({length:13},(_,col)=><path key={`${row}-${col}`} d={`M${col*80} ${row*80-40}l40 -40l40 40l-40 40z`} fill={(col+row)%3===0?p.accentSoft:(col+row)%3===1?wall:light}/>))}</>;
 case 'recess':return <><rect width="960" height="540" fill={p.groundShadow}/><path d="M344 373H960V540H344Z" fill={floor}/><path d="M355 112Q627 4 885 112V168Q627 61 355 168Z" fill={p.wood}/></>;
 case 'palmGrove':return <><path d="M0 336Q440 256 960 350V540H0Z" fill={floor}/>{[90,840].map((x,i)=><g key={x} transform={`translate(${x} ${i?40:0})`}><path d="M0 400Q-25 210 0 76" stroke={p.wood} strokeWidth="30" fill="none"/>{[-1,1].map(d=><path key={d} d={`M0 80Q${d*110} -7 ${d*160} 85Q${d*60} 47 0 80M0 80Q${d*100} 58 ${d*133} 155Q${d*57} 94 0 80Z`} fill={p.foliage}/>)}</g>)}</>;
 case 'gateway':return <><path d="M0 310H960V540H0Z" fill={floor}/><path d="M480 300L220 540H740Z" fill={light}/></>;
 case 'raisedDais':return <><path d="M147 384L894 340L960 391L230 445Z" fill={light}/><path d="M230 445L960 391V500L230 540Z" fill={wall}/><path d="M147 384L230 445V540L147 476Z" fill={trim}/><path d="M0 260Q250 325 960 198V340Q400 423 0 359Z" fill={p.ridgeFar}/></>;
 case 'sandyBasin':return <><path d="M0 194Q290 397 960 119V540H0Z" fill={p.ridgeFar}/><path d="M0 287Q350 440 960 240V540H0Z" fill={p.groundNear}/><ellipse cx="410" cy="448" rx="460" ry="145" fill={light}/><path d="M0 326Q350 505 960 282" fill="none" stroke={p.groundShadow} strokeWidth="5"/></>;
 case 'timberFrame':return <><path d="M0 350H960V540H0Z" fill={floor}/><path d="M80 350L880 350M80 403H880M80 468H880M260 350V540M685 350V540" stroke={p.wood} strokeWidth="8"/></>;
 case 'hillTown':return <><path d="M0 305L960 154V540H0Z" fill={p.ridgeFar}/>{[0,1,2,3,4].map((n)=><g key={n} transform={`translate(${660+n%3*90} ${200-Math.floor(n/3)*85})`}><path d="M0 0L70 -13V130L0 142Z" fill={n%2?wall:light}/><path d="M70 -13L92 4V146L70 130Z" fill={trim}/><path d="M20 94V48Q37 26 52 43V87Z" fill={p.groundShadow}/></g>)}<path d="M0 395L630 300L660 540H0Z" fill={floor}/></>;
 case 'sideStreet':return <><path d="M0 0L330 137V540H0Z" fill={wall}/><path d="M960 0L662 137V540H960Z" fill={trim}/><path d="M330 137H662V540H330Z" fill={p.skyBottom}/><path d="M0 540L480 240L960 540Z" fill={floor}/><path d="M62 415V168L226 230V462Z" fill={p.woodDark}/></>;
 case 'roundWindow':return <><rect width="960" height="540" fill={p.skyBottom}/><path d="M0 367Q480 330 960 367V540H0Z" fill={floor}/><path d="M0 493H960V540H0Z" fill={p.wood}/></>;
 case 'reedScreen':return <><rect y="327" width="960" height="213" fill={floor}/><path d="M0 120H960M0 205H960" stroke={p.wood} strokeWidth="11" opacity=".3"/><path d="M0 475H960V540H0Z" fill={light}/></>;
 case 'steppedPlatform':return <><path d="M0 510L960 450V540H0ZM185 437L960 389V450L185 499ZM305 362L960 323V389L305 425Z" fill={wall} stroke={light} strokeWidth="10"/><path d="M0 0H175V540H0Z" fill={p.groundShadow}/></>;
 case 'clothBackdrop':return <><rect width="960" height="540" fill={p.stone}/><path d="M250 0H960V540H250Q330 309 250 0Z" fill={p.cloth}/><path d="M290 467L960 399V540H250Z" fill={p.accentSoft}/></>;
 case 'stoneBridge':return <><path d="M0 383Q480 442 960 328V540H0Z" fill={aquatic?p.water:floor}/><path d="M0 353L862 321L960 402L62 452Z" fill={light}/><path d="M62 452L960 402V465L62 513Z" fill={wall}/><path d="M0 353L62 452V513L0 421Z" fill={trim}/></>;
 case 'roofTerrace':return <><path d="M0 373L960 263V540H0Z" fill={light}/><path d="M0 280L960 195V263L0 373Z" fill={wall}/><path d="M0 280L960 195" stroke={trim} strokeWidth="17"/><path d="M0 0H215V540H0Z" fill={p.woodDark}/><path d="M215 0H960V40H215Z" fill={p.wood}/></>;
 case 'alcove':return <><rect width="960" height="540" fill={p.woodDark}/><path d="M140 316H820V540H140Z" fill={p.cloth}/><path d="M150 465H810M150 500H810" stroke={p.accentSoft} strokeWidth="12"/></>;
 }
}
