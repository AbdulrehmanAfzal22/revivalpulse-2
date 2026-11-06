import { CHAPTER_ART_FOCUS } from './chapterArtFocus';
import type { KidsStoryChapter, StorySceneKey } from 'types/kidsStories.types';
import type { SceneSpec } from './sceneTypes';
export type ArtLayout = 'landscape' | 'closeup' | 'foreground' | 'doorway' | 'overlook' | 'stillLife' | 'waterside' | 'pathway';
export interface NarrativeArt {
  layout: ArtLayout;
  secondary?: StorySceneKey;
  subjectDetail: 'whole' | 'construction' | 'interior' | 'arrival' | 'provision' | 'release' | 'reflection';
  symbolic: boolean;
}
/** Literal subjects only. Broad mood words such as “great”, “gave”, “taught”,
 * “sky”, “grew” and “Allah” must never pick a physical place or object. */
const SUBJECTS: Array<[StorySceneKey, RegExp, number]> = [
 ['seaPassage', /(?:sea|water|waters) (?:split|parted)|(?:split|parted|parting|through|across|divided) (?:the )?(?:sea|water)|walls? of water|dry (?:path|passage)/i, 160],
 ['trench', /\btrench(?:es)?\b/i, 150], ['antValley', /\bants?\b|ant valley/i,150],
 ['hoopoe', /\bhoopoe\b/i,150], ['burningBush', /burning bush|fire (?:in|from|on) (?:a |the )?(?:bush|tree)/i,150],
 ['staffSerpent', /\b(?:snake|serpent)\b|staff (?:turned|became)/i,150],
 ['clayBank', /(?<!baked )\bclay\b|created? (?:him |adam |humankind )?from (?:dust|earth)/i,150],
 ['freedom', /\b(?:freed|freedom|freeing|liberat\w*|set him free|set them free)\b/i,140],
 ['adhanCourtyard', /\b(?:adhan|mu.?adhin|call to prayer|caller to prayer)\b/i,145],
 ['armorWorkshop', /\b(?:armo[u]?r|chainmail|iron links|softened iron)\b/i,145],
 ['sling', /\b(?:sling|slingshot|goliath|jalut)\b/i,145],
 ['arkWorkshop', /(?:build|building|built|construct\w*|planks|carpenter).{0,40}\bark\b|\bark\b.{0,40}(?:build|building|planks|construct)/i,145],
 ['sealedLetter', /\b(?:letter|letters|sealed message|treaty|hudaybiyyah|hudaybiyya)\b/i,125],
 ['sharedMeal', /\b(?:meal|meals|table of food|table spread|table from heaven|roasted|loaves|bread|cooked|cooking|fed|feed|feeding)\b/i,115],
 ['sickroom', /\b(?:illness|ill|sick|sickness|disease|bed|bedside|unwell|health)\b/i,105],
 ['charityBasket', /\b(?:charity|charitable|donat\w*|generous|generosity|gave food|share food|sharing food|help the poor|helping the poor|gave money)\b/i,90],
 ['caravanSupplies', /\b(?:supplies|provisions|equipped|equipment|packed|sacks)\b/i,100],
 ['datePalm', /\bdates\b|palm (?:tree|trunk)|shook.{0,30}palm/i,135],
 ['waterJars', /\b(?:water jars?|water skins?|water vessels?|pitcher|jug|jugs)\b/i,115],
 ['dreamSky', /eleven stars|sun and (?:the )?moon|\bdream(?:ed|s)?\b/i,110],
 ['crescent', /\b(?:star|stars|moon|night sky)\b/i,90],
 ['well', /(?<!as )\bwell\b(?![- ]known| as)|\bbucket\b|\bzamzam\b/i,125],
 ['ark', /\b(?:ark|ship|boat|sailing|sailed|vessel)\b/i,110],
 ['whale', /\b(?:whale|fish|belly of|swallowed)\b/i,125],
 ['cave', /\bcave\b|\bhira\b/i,125], ['kaaba', /\b(?:kaaba|ka.bah|kaabah|black stone|tawaf)\b/i,130],
 ['carvedHomes', /\b(?:carved|hewed|cliff dwellings|rock houses)\b/i,105],
 ['idols', /\b(?:idol|idols|baal|statues|statue)\b/i,100],
 ['basket', /\bbasket\b|\bcradle\b/i,100],
 ['floodWater', /\bflood\b|waters rose|rooftops|water rose/i,110],
 ['coolGarden', /\b(?:garden|gardens|paradise|jannah)\b|cool and safe/i,95],
 ['crackedEarth', /\b(?:drought|thirst|thirsty|parched|barren)\b|no water|without water|dry land/i,95],
 ['springRock', /\bspring\b|rock.{0,25}(?:water|struck)|water.{0,20}burst/i,95],
 ['flame', /\b(?:fire|flames|flame|burning|burned)\b/i,85],
 ['prisonWindow', /\b(?:prison|prisoner|jail|cell|confined)\b/i,110],
 ['granary', /\b(?:grain|storehouse|granary|famine|harvest|stored food)\b/i,110],
 ['wheatField', /\b(?:wheat|ears of grain|ears of corn|ears of wheat)\b/i,120],
 ['cattle', /\b(?:cows|cow|cattle|oxen)\b/i,120],
 ['sheep', /\b(?:sheep|flock|shepherd|lamb|ram)\b/i,100],
 ['camel', /\b(?:camel|camels|she.camel)\b/i,105],
 ['birds', /\b(?:bird|birds)\b/i,95],
 ['windSwirl', /\b(?:wind|winds|whirlwind|storm)\b/i,85],
 ['rainClouds', /\b(?:rain|rained|rainfall|clouds|cloud)\b/i,80],
 ['banner', /\b(?:banner|flag|standard bearer)\b/i,110],
 ['fortress', /\b(?:fortress|fort|forts|khaybar|siege)\b/i,100],
 ['armyLines', /\b(?:army|armies|troops|battle|battles|soldiers|warrior)\b/i,75],
 ['swords', /\b(?:sword|swords|arrows?|bow and arrows?|bowstring)\b/i,80],
 ['tablets', /\btablets\b/i,115],
 ['throne', /\bthrone\b/i,110], ['palace', /\b(?:palace|royal court|royal home)\b/i,90],
 ['market', /\b(?:market|marketplace|merchant|trade|trading|traded|bought|sold|seller|shop|goods)\b/i,80],
 ['balance', /\b(?:scales|weights|measures|weigh|weighed|measure)\b/i,105],
 ['sownField', /\b(?:seed|seeds|sow|sown|planted)\b/i,95],
 ['ruinedColumns', /nothing was left|ruins|ruined|stones in the sand|destroyed town|destroyed city/i,120],
 ['tornRobe', /\b(?:shirt|tunic|robe|cloak|garment)\b/i,95],
 ['tent', /\btent\b|\btents\b/i,80], ['caravan', /\bcaravan\b/i,110],
 ['nightCamp', /\bcamp\b|\bcamped\b/i,75],
 ['cityGate', /\b(?:city|cities|town|towns|makkah|mekka|makkans|madinah|madeenah|medina|village)\b/i,45],
 ['homeYard', /\b(?:home|house|household|family|parents|mother|father|childhood)\b/i,55],
 ['desertRoad', /\b(?:journey|road|roads|travel|travelled|traveled|walked|migration|migrat\w*|hijrah|hijra)\b/i,45],
 ['mountain', /\b(?:mountain|mountains|sinai|uhud)\b/i,85],
 ['oliveTree', /\b(?:tree|trees|olive|fig)\b/i,45],
 ['prayerMat', /\b(?:prayer|prayed|pray|praying|dua|supplication|worship)\b/i,35],
 ['inkwell', /\b(?:book|books|writing|write|wrote|pen|ink|recitation|recited|scroll|scrolls|knowledge)\b/i,80],
];
const CHAPTER_FOCUS: Array<[RegExp,StorySceneKey]> = [
 [/creation|created from clay/,'clayBank'],[/knowledge of the names/,'learningObjects'],[/angels.*bow/,'learningObjects'],
 [/ark.command|build.*ark/,'arkWorkshop'],[/flood/,'floodWater'],[/landing/,'ark'],
 [/trench/,'trench'],[/valley.of.ants/,'antValley'],[/hoopoe/,'hoopoe'],[/letter|treaty|hudayb/,'sealedLetter'],
 [/iron|armor|armour/,'armorWorkshop'],[/burning.bush/,'burningBush'],[/night.of.the.sea/,'seaPassage'],
 [/steadfast.heart|tortured.but.strong|first.martyrs/,'stoneShelter'],[/bought.and.freed|freeing.the.slaves|freedom/,'freedom'],
 [/first.adhan|voice.after/,'adhanCourtyard'],[/well.of|well|zamzam/,'well'],[/kaaba|ka.bah/,'kaaba'],
 [/birth.under.the.palm/,'datePalm'],[/table.from.heaven/,'sharedMeal'],[/great.test|patient.call|loyal.wife/,'sickroom'],
 [/baby.in.a.basket/,'basket'],[/royal.home|before.pharaoh|queen.submits/,'palace'],[/tablets|calf/,'tablets'],
 [/dream/,'dreamSky'],[/cave|revelation/,'cave'],[/sacrifice/,'sheep'],[/shepherd/,'sheep'],
 [/hunger|famine/,'granary'],[/prison/,'prisonWindow'],[/fish/,'whale'],[/shore/,'datePalm'],
 [/trade|merchant/,'market'],[/judge|fair|justice|faruq/,'balance'],[/warrior|fighter|badr|uhud|commander|last.stand/,'armyLines'],
 [/charity|generosity|hardship|service.and.sacrifice/,'charityBasket'],[/seeker|long.road|journey|hijrah/,'desertRoad'],
 [/family|son|parents|boy|orphan|wife|mother|father/,'homeYard'],[/knowledge|teacher|wisdom|truthful|quran|memory.keeper/,'inkwell'],
 [/dua|prayer|supplication/,'prayerMat'],[/garden|paradise/,'coolGarden'],
];
const LESSON = /\b(?:teaches us|teaches children|reminds us|for us|when we|we can|you can|we should|children can|children learn|the lesson|every child)\b/i;
const matchPosition=(text:string,exp:RegExp)=>{const m=exp.exec(text);return m?m.index:-1};
export function contextualFocus(chapter:KidsStoryChapter): StorySceneKey | undefined {
 if (CHAPTER_ART_FOCUS[chapter.id]) return CHAPTER_ART_FOCUS[chapter.id];
 const text=`${chapter.id.replace(/-/g,' ')} ${chapter.title.en}`.toLowerCase();
 return CHAPTER_FOCUS.find(([pattern])=>pattern.test(text))?.[1];
}
/** Candidate scoring rewards the paragraph's opening action, never merely a
 * mood. Sources/references and the chapter's other paragraphs are excluded. */
export function contextualSubjects(chapter:KidsStoryChapter,text:string): StorySceneKey[] {
 const own=text.replace(/(?:anger|heart) (?:burned|burning)|burning (?:desire|anger)/gi,'strong feelings').replace(/like (?:a child shaping )?(?:soft )?clay/gi,'like a simple material').replace(/\([^)]*(?:qur|bukhari|muslim|:)[^)]*\)/gi,'');
 const firstEnd=own.search(/[.!?](?:\s|$)/);const end=firstEnd<0?own.length:firstEnd;
 const ranked=SUBJECTS.map(([key,pattern,weight])=>{const at=matchPosition(own,pattern);return {key,score:at<0?0:weight+(at<end?24:0)-(at/Math.max(own.length,1))*8};}).filter(r=>r.score>0).sort((a,b)=>b.score-a.score);
 const focus=contextualFocus(chapter);
 // Lessons stay attached to the event they explain. They do not turn into
 // unrelated crops/treasure because the text says “grew” or “a great gift”.
 if(LESSON.test(own)&&focus&&(!ranked[0]||ranked[0].score<110))return [focus,...ranked.map(r=>r.key).filter(k=>k!==focus)];
 if(focus&&!ranked[0])return [focus,...ranked.map(r=>r.key).filter(k=>k!==focus)];
 return ranked.map(r=>r.key);
}
export function chooseContextualScene(chapter:KidsStoryChapter,text:string):StorySceneKey|undefined {
 const subjects=contextualSubjects(chapter,text);
 if (chapter.id==='names') return 'learningObjects';
 if (chapter.id==='the-ark-command') return 'arkWorkshop';
 if (chapter.id==='the-night-of-the-sea') {
   const index=chapter.paragraphs.findIndex(p=>p.en===text);
   return index===3?'seaPassage':index===4?'closingSea':'seaShore';
 }
 if (chapter.id==='iron-armor') return 'armorWorkshop';
 if (chapter.id==='valley-of-ants' && /ant/i.test(text)) return 'antValley';
 if (/stones? of (?:baked )?clay|storm of stones|stones?.{0,15}rain/i.test(text)) return 'ruinedColumns';
 return subjects[0]??contextualFocus(chapter)??chapter.scene;
}
const LAYOUTS:ArtLayout[]=['landscape','closeup','foreground','overlook','stillLife','pathway'];
export function artDirection(chapter:KidsStoryChapter,text:string,index:number,prior:SceneSpec[],primary:StorySceneKey):NarrativeArt {
 const subjects=contextualSubjects(chapter,text);const repeated=prior.filter(s=>s.motif===primary).length;
 let secondary=subjects.find(k=>k!==primary);
 if ((primary==='arkWorkshop' && secondary==='ark') || (primary==='burningBush' && secondary==='flame') || (primary==='antValley' && secondary==='armyLines') || (primary==='freedom' && secondary==='charityBasket')) secondary=undefined;
 if (primary==='seaShore' && secondary!=='armyLines') secondary=undefined;
 if (primary==='floodWater' && secondary==='seaPassage') secondary=undefined;
 if (primary==='closingSea') secondary=undefined;
 if (primary==='seaPassage') secondary=undefined;
 // Broad place words aren't additional objects in a close-up. Avoid a second
 // allegory competing with the story's actual subject.
 if(secondary&&['inkwell','prayerMat','cityGate','desertRoad','homeYard'].includes(secondary)&&subjects.length<3)secondary=undefined;
 let layout:ArtLayout=LAYOUTS[(index+repeated*2)%LAYOUTS.length]??'landscape';
 if(/\b(?:inside|room|indoors|prison|cell)\b/i.test(text))layout=repeated%2?'closeup':'doorway';
 if(/\b(?:river|stream|shore|bank|sea|water)\b/i.test(text)&&['basket','datePalm','well','waterJars','whale'].includes(primary))layout=repeated%2?'closeup':'waterside';
 if(['sealedLetter','learningObjects','sling','armorWorkshop','waterJars','freedom'].includes(primary))layout=repeated%3===0?'stillLife':repeated%3===1?'closeup':'foreground';
 if(['seaPassage','trench','antValley','carvedHomes','floodWater','armyLines','desertRoad'].includes(primary))layout=repeated%2?'foreground':'overlook';
 const subjectDetail:NarrativeArt['subjectDetail']=/build|construct|planks/i.test(text)?'construction':/inside|room|cell/i.test(text)?'interior':/arriv|reach|return|landed/i.test(text)?'arrival':/food|share|give|gave|help|grain|drink|water/i.test(text)?'provision':/free|freedom/i.test(text)?'release':LESSON.test(text)?'reflection':'whole';
 return {layout,secondary,subjectDetail,symbolic:LESSON.test(text)};
}
