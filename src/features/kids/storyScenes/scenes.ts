import { chooseContextualScene, artDirection } from './contextualArt';
import type { KidsStoryChapter, StorySceneKey } from 'types/kidsStories.types';
import type { SceneGround, SceneSky, SceneSpec } from './sceneTypes';

/**
 * One scene specification per drawable subject. Paragraph context is resolved
 * in contextualArt.ts; keywords are retained as descriptive scene metadata.
 */
export const SCENES: Record<StorySceneKey, SceneSpec> = {
  closingSea:{sky:'storm',ground:'sea',motif:'closingSea',alt:'Waves closing over the sea passage; no flooded buildings or people are depicted.',keywords:[]},
  seaShore:{sky:'day',ground:'sea',motif:'seaShore',alt:'An unparted sea beside a sandy shore, before the crossing.',keywords:[]},
  clayBank: {sky:'day',ground:'green',motif:'clayBank',alt:'A bank of red clay beside a clear stream; a symbolic illustration of the material mentioned in the creation story.',keywords:[]},
  learningObjects: {sky:'day',ground:'green',motif:'learningObjects',alt:'A fruit, a water jar, a stone and a leaf arranged for a lesson about the names of things.',keywords:[]},
  arkWorkshop: {sky:'day',ground:'valley',motif:'arkWorkshop',alt:'An unfinished wooden ark on dry land, with timber ribs, planks, rope and building tools.',keywords:[]},
  burningBush: {sky:'dusk',ground:'stone',motif:'burningBush',alt:'A green bush glowing with a gentle fire in a rocky valley.',keywords:[]},
  staffSerpent: {sky:'day',ground:'stone',motif:'staffSerpent',alt:'A wooden staff and a serpent shown as story objects in a stone courtyard.',keywords:[]},
  seaPassage: {sky:'day',ground:'sea',motif:'seaPassage',alt:'A dry passage between two high walls of parted seawater.',keywords:[]},
  antValley: {sky:'day',ground:'green',motif:'antValley',alt:'Small ants carrying seeds toward their nest in a sunlit valley.',keywords:[]},
  hoopoe: {sky:'day',ground:'green',motif:'hoopoe',alt:'A crested hoopoe resting on a branch.',keywords:[]},
  sealedLetter: {sky:'day',ground:'stone',motif:'sealedLetter',alt:'A folded letter closed with a wax seal; no invented writing is shown.',keywords:[]},
  armorWorkshop: {sky:'day',ground:'stone',motif:'armorWorkshop',alt:'A coat of linked iron armor beside an anvil and hammer.',keywords:[]},
  trench: {sky:'day',ground:'dunes',motif:'trench',alt:'A defensive trench outside an oasis settlement, with a digging tool resting safely nearby.',keywords:[]},
  datePalm: {sky:'day',ground:'green',motif:'datePalm',alt:'A date palm with ripe fruit and water nearby.',keywords:[]},
  sharedMeal: {sky:'day',ground:'stone',motif:'sharedMeal',alt:'A simple shared meal of bread, dates and water.',keywords:[]},
  sickroom: {sky:'day',ground:'stone',motif:'sickroom',alt:'An empty resting bed with a water cup beside it; no ill person is depicted.',keywords:[]},
  charityBasket: {sky:'day',ground:'stone',motif:'charityBasket',alt:'A basket of bread and provisions prepared for sharing.',keywords:[]},
  freedom: {sky:'day',ground:'dunes',motif:'freedom',alt:'Two separated chain links, symbolizing freedom.',keywords:[]},
  adhanCourtyard: {sky:'dawn',ground:'stone',motif:'adhanCourtyard',alt:'An early mosque courtyard with an open roofline; curved lines symbolize the sound of the adhan.',keywords:[]},
  waterJars: {sky:'day',ground:'stone',motif:'waterJars',alt:'Clay water jars and a small pool of clear water.',keywords:[]},
  sling: {sky:'day',ground:'stone',motif:'sling',alt:'A simple sling and smooth stones resting on the ground.',keywords:[]},
  seedling: {sky:'day',ground:'green',motif:'seedling',alt:'A small green seedling in fertile soil; a symbolic lesson about care and growth.',keywords:[]},
  caravanSupplies: {sky:'day',ground:'dunes',motif:'caravanSupplies',alt:'Packed provision sacks and a water skin ready for a journey.',keywords:[]},
  stoneShelter: {sky:'day',ground:'dunes',motif:'stoneShelter',alt:'A rocky shelter in the desert with a shaded entrance; a symbolic image of refuge and endurance.',keywords:[]},
  ark: { sky: 'storm', ground: 'sea', motif: 'ark', alt: 'A great wooden ark riding high waves under a stormy sky.', keywords: ['ark', 'ship', 'sail', 'plank', 'carpent', 'no sea', 'wave', 'waves'] },
  whale: { sky: 'day', ground: 'sea', motif: 'whale', alt: 'A huge fish breaching beside the open sea.', keywords: ['whale', 'fish', 'swallow', 'belly', 'ocean', 'deep water', 'sea', 'waves'] },
  flame: { sky: 'dusk', ground: 'stone', motif: 'flame', alt: 'Tall flames rising from a great fire.', keywords: ['fire', 'flame', 'burn', 'burning', 'burned', 'blaze', 'ember'] },
  coolGarden: { sky: 'day', ground: 'green', motif: 'coolGarden', alt: 'A cool green garden with palms and a pool of shade.', keywords: ['garden', 'paradise', 'jannah', 'cool and safe', 'flowers', 'green where the fire', 'fire became'] },
  cave: { sky: 'dusk', ground: 'stone', motif: 'cave', alt: 'A dark cave mouth cut into the side of a mountain.', keywords: ['cave', 'hira', 'sleepers', 'hidden in the mountain'] },
  well: { sky: 'day', ground: 'dunes', motif: 'well', alt: 'A stone well with a wooden bucket on a rope.', keywords: ['well', 'bucket', 'draw water', 'drink', 'zamzam', 'spring of water'] },
  palms: { sky: 'dawn', ground: 'dunes', motif: 'palms', alt: 'Tall date palms swaying over the dunes at daybreak.', keywords: ['palm', 'palms', 'dates', 'shake', 'oasis', 'shade', 'desert road', 'sunrise'] },
  kaaba: { sky: 'day', ground: 'stone', motif: 'kaaba', alt: 'The Kaaba draped in black with a golden band, standing in its courtyard.', keywords: ['kaaba', 'ka’bah', 'house of allah', 'tawaf', 'circle the kaaba', 'pilgrimage', 'hajj', 'black stone'] },
  tent: { sky: 'dawn', ground: 'dunes', motif: 'tent', alt: 'A cloth tent pitched on the sand at first light.', keywords: ['tent', 'tents', 'camp', 'bedouin', 'encampment', 'travelled', 'caravan camp'] },
  crescent: { sky: 'night', ground: 'dunes', motif: 'crescent', alt: 'A crescent moon and scattered stars over the night desert.', keywords: ['crescent', 'moon', 'night', 'dark sky', 'evening prayer'] },
  dreamSky: { sky: 'night', ground: 'valley', motif: 'dreamSky', alt: 'Stars with the sun and the moon set in the night sky.', keywords: ['dream', 'eleven stars', 'stars and the sun', 'prostrated', 'sheikh', 'dream of'] },
  mountain: { sky: 'day', ground: 'valley', motif: 'mountain', alt: 'Snow-capped peaks rising against a clear sky.', keywords: ['mountain', 'peak', 'sinai', 'tur', 'judi', 'cliff', 'rock'] },
  rainClouds: { sky: 'storm', ground: 'valley', motif: 'rainClouds', alt: 'Heavy clouds pouring rain over the valley.', keywords: ['rain', 'cloud', 'thunder', 'downpour', 'water fell', 'sky opened'] },
  windSwirl: { sky: 'day', ground: 'dunes', motif: 'windSwirl', alt: 'Long swirls of wind sweeping sand across the dunes.', keywords: ['wind', 'breeze', 'gale', 'blast', 'three days and nights'] },
  tablets: { sky: 'day', ground: 'stone', motif: 'tablets', alt: 'Two stone tablets covered in writing, standing upright.', keywords: ['tablets', 'torah', 'scroll', 'written down', 'book was given', 'revelation', 'words of'] },
  basket: { sky: 'dawn', ground: 'green', motif: 'basket', alt: 'A small basket resting in the reeds beside the river.', keywords: ['basket', 'baby', 'infant', 'reeds', 'river', 'cradle', 'nile', 'chest'] },
  throne: { sky: 'day', ground: 'stone', motif: 'throne', alt: 'A carved wooden throne with a golden crown on its back.', keywords: ['throne', 'king', 'queen', 'saba', 'royal', 'court', 'majesty', 'ruled'] },
  birds: { sky: 'day', ground: 'valley', motif: 'birds', alt: 'A flock of birds lifting off in wide circles.', keywords: ['bird', 'clay', 'flock', 'wing', 'ababil', 'stones of baked clay'] },
  mihrab: { sky: 'dusk', ground: 'stone', motif: 'mihrab', alt: 'A prayer niche with an arched alcove and a hanging lamp.', keywords: ['mihrab', 'prayer niche', 'temple', 'mosque', 'worship', 'zakariyya', 'caretaker of the temple', 'khalil'] },
  palace: { sky: 'dusk', ground: 'stone', motif: 'palace', alt: 'A grand palace with tall arched windows and a golden roof line.', keywords: ['palace', 'pharaoh', 'firawn', 'castle', 'mansions', 'great hall', 'king of egypt'] },
  treasure: { sky: 'dusk', ground: 'stone', motif: 'treasure', alt: 'An open chest overflowing with golden coins.', keywords: ['treasure', 'gold', 'coins', 'wealth', 'qarun', 'riches', 'silver'] },
  sheep: { sky: 'day', ground: 'green', motif: 'sheep', alt: 'A small flock of sheep grazing beside a shepherd’s crook.', keywords: ['sheep', 'goat', 'shepherd', 'flock of sheep', 'madyan', 'graze', 'water the flock'] },
  camel: { sky: 'dawn', ground: 'dunes', motif: 'camel', alt: 'A single camel standing on the open sand.', keywords: ['camel', 'she-camel', 'herd', 'thamud camel', 'sign of the camel'] },
  idols: { sky: 'dusk', ground: 'stone', motif: 'idols', alt: 'Faceless stone statues standing in a row, one of them toppled.', keywords: ['idol', 'statue', 'stone images', 'worshipped', 'wood and stone', 'carved'] },
  swords: { sky: 'dusk', ground: 'stone', motif: 'swords', alt: 'Two swords crossed over a shield mark.', keywords: ['sword', 'battle', 'warrior', 'fight', 'fought', 'shield', 'brave in battle', 'duel'] },
  balance: { sky: 'day', ground: 'stone', motif: 'balance', alt: 'A brass balance with both pans hanging level.', keywords: ['balance', 'justice', 'measure', 'scales', 'fair weight', 'honest trade', 'judge'] },

  // One subject per situation the stories actually describe, so a journey, a
  // prison and a field of grain never share a drawing.
  desertRoad: { sky: 'day', ground: 'dunes', motif: 'desertRoad', alt: 'A track winding away over the dunes, footprints marching along it.', keywords: ['journey', 'travelled', 'traveled', 'walked', 'road', 'path', 'set out', 'left home', 'long way', 'passed', 'arrived', 'went to'] },
  caravan: { sky: 'dusk', ground: 'dunes', motif: 'caravan', alt: 'A camel caravan crossing the crest of a far dune in the dust.', keywords: ['caravan', 'merchants', 'traders', 'travelers', 'travellers', 'group of camels', 'trade route'] },
  cityGate: { sky: 'day', ground: 'stone', motif: 'cityGate', alt: 'A walled town with a tall arched gateway and palms behind it.', keywords: ['city', 'town', 'gate', 'gates', 'walls', 'entered the', 'arrived in', 'makkah', 'madinah', 'jerusalem', 'bayt al-maqdis'] },
  market: { sky: 'day', ground: 'stone', motif: 'market', alt: 'Striped stalls in a busy market with jars and hanging goods.', keywords: ['market', 'bought', 'sold', 'seller', 'shop', 'goods', 'merchant', 'traded', 'payment for'] },
  granary: { sky: 'dawn', ground: 'stone', motif: 'granary', alt: 'A storehouse of stacked grain sacks with a wooden measure.', keywords: ['grain', 'food', 'store', 'stored', 'harvest', 'famine', 'hungry', 'bread', 'provision', 'supply', 'years of plenty', 'years of hardship'] },
  prisonWindow: { sky: 'night', ground: 'stone', motif: 'prisonWindow', alt: 'A high barred window in a bare stone cell wall, with one shaft of light.', keywords: ['prison', 'prisoner', 'cell', 'jail', 'bars', 'locked up', 'chain', 'imprisoned', 'confined'] },
  oliveTree: { sky: 'day', ground: 'green', motif: 'oliveTree', alt: 'An old gnarled olive tree with flat stones around its roots.', keywords: ['tree', 'trees', 'olive', 'shade', 'fig', 'blessing of the', 'grew'] },
  wheatField: { sky: 'day', ground: 'green', motif: 'wheatField', alt: 'Ripe wheat ears standing tall in a field to a low horizon.', keywords: ['wheat', 'ears of grain', 'green ears', 'dry ears', 'field of grain', 'corn', 'stalk'] },
  cattle: { sky: 'dawn', ground: 'green', motif: 'cattle', alt: 'Plump cows at the water with thin ones waiting behind them.', keywords: ['cow', 'cows', 'kine', 'bull', 'oxen', 'seven fat', 'seven lean', 'thin cows'] },
  springRock: { sky: 'day', ground: 'dunes', motif: 'springRock', alt: 'Water bursting from a split rock into a small clear pool.', keywords: ['spring', 'water came out', 'burst', 'flowing water', 'stream', 'river bank', 'ran water', 'quench'] },
  crackedEarth: { sky: 'dusk', ground: 'dunes', motif: 'crackedEarth', alt: 'Parched cracked earth under a bleached, empty horizon.', keywords: ['drought', 'thirst', 'thirsty', 'parched', 'cracked earth', 'dry and cracked', 'no rain', 'withered', 'scarcity', 'hardship came'] },
  floodWater: { sky: 'storm', ground: 'sea', motif: 'floodWater', alt: 'Flood water with only rooftops and treetops breaking the surface.', keywords: ['flood', 'waters rose', 'water rose', 'swallowed the', 'destroyed them', 'punishment came', 'deluge'] },
  nightCamp: { sky: 'night', ground: 'dunes', motif: 'nightCamp', alt: 'A small desert camp at night: tents, a fire and a hanging pot.', keywords: ['camp', 'tents at night', 'night journey', 'encampment', 'rested', 'stayed the night', 'fire at night', 'halted'] },
  lantern: { sky: 'night', ground: 'stone', motif: 'lantern', alt: 'One hanging lantern casting a cone of warm light into the dark.', keywords: ['light', 'lamp', 'lantern', 'shine', 'guide', 'guided', 'guiding', 'guides', 'guidance', 'showed the way', 'darkness'] },
  prayerMat: { sky: 'dawn', ground: 'stone', motif: 'prayerMat', alt: 'A patterned prayer mat laid empty with a small arch motif.', keywords: ['pray', 'prayer', 'prayed', 'praying', 'worship', 'worshipped', 'sujood', 'stood in prayer', 'devotion', 'supplication', 'called upon', 'grateful', 'thankful'] },
  inkwell: { sky: 'day', ground: 'stone', motif: 'inkwell', alt: 'An open page on a book stand with a reed pen and an inkpot.', keywords: ['write', 'wrote', 'writing', 'page', 'pages', 'book', 'ink', 'pen', 'record', 'taught', 'teach', 'teaches', 'learning', 'learned', 'knowledge', 'wisdom', 'quran', 'recite'] },
  sownField: { sky: 'dawn', ground: 'green', motif: 'sownField', alt: 'Seeds scattering over dark turned furrows with small sprouts.', keywords: ['sow', 'seed', 'seeds', 'plant', 'planted', 'grow', 'grew', 'growing', 'good deed', 'good deeds', 'harvest what', 'increase'] },
  tornRobe: { sky: 'dusk', ground: 'stone', motif: 'tornRobe', alt: 'A boy’s torn tunic hanging on a wooden stake, one sleeve ripped off.', keywords: ['torn', 'rip', 'ripped', 'shirt', 'robe', 'garment', 'cloak', 'cut the', 'blew', 'jealous', 'jealousy', 'envy', 'grieved', 'sorrow', 'wept', 'cried', 'sad', 'tears'] },
  ruinedColumns: { sky: 'dusk', ground: 'dunes', motif: 'ruinedColumns', alt: 'Toppled columns and a broken arch lying in the sand of a ruined town.', keywords: ['ruin', 'ruined', 'ruins', 'remains of', 'perished', 'vanished', 'destroyed city', 'nothing left', 'nothing was left', 'all that was left', 'warning to', 'proud buildings', 'proud town', 'arrogant', 'stones in the sand'] },
  carvedHomes: { sky: 'day', ground: 'stone', motif: 'carvedHomes', alt: 'Doorways and windows carved straight into a sheer cliff face.', keywords: ['carved', 'hewed', 'cut from the mountain', 'cut into the mountain', 'side of the mountain', 'homes in the', 'cliff', 'rock houses', 'thamud', 'salih', 'hew from the', 'dwellings in the', 'carved their homes'] },
  banner: { sky: 'day', ground: 'dunes', motif: 'banner', alt: 'A war banner on a tall wooden pole, its cloth stretched wide in the wind.', keywords: ['flag', 'banner', 'standard', 'called to islam', 'gave the'] },
  fortress: { sky: 'dusk', ground: 'valley', motif: 'fortress', alt: 'A strong fort with round towers standing on top of a rocky ridge.', keywords: ['fortress', 'fort', 'forts', 'khaybar', 'strong walls', 'siege', 'towers', 'guarded'] },
  armyLines: { sky: 'day', ground: 'dunes', motif: 'armyLines', alt: 'Ranks of spears standing in the sand with round shields set among them.', keywords: ['army', 'armies', 'troops', 'soldiers', 'ranks', 'battle lines', 'faced many', 'many enemies', 'victory', 'won the battle'] },
  homeYard: { sky: 'day', ground: 'dunes', motif: 'homeYard', alt: 'A low flat-roofed family house with water jars, a grinding stone and a shade tree in its yard.', keywords: ['family', 'home', 'house', 'household', 'childhood', 'youngest', 'lived with', 'grew up'] },
};

export const SCENE_KEYS = Object.keys(SCENES) as StorySceneKey[];

/** Story symbols fall back to the scene that best matches their icon. */
const SYMBOL_SCENES: Record<string, StorySceneKey> = {
  Ship: 'ark',
  Waves: 'ark',
  Fish: 'whale',
  Droplet: 'well',
  Flame: 'flame',
  CloudSun: 'palms',
  CloudRain: 'rainClouds',
  Wind: 'windSwirl',
  Mountain: 'mountain',
  Tent: 'tent',
  Star: 'crescent',
  Sparkle: 'crescent',
  Sun: 'dreamSky',
  Baby: 'basket',
  Bird: 'birds',
  Scroll: 'tablets',
  BookOpen: 'tablets',
  Lamp: 'mihrab',
  Compass: 'kaaba',
  Gem: 'treasure',
  Swords: 'swords',
  Scale: 'balance',
  Shield: 'swords',
  ShieldCheck: 'swords',
  Leaf: 'palms',
  Handshake: 'balance',
  HandHeart: 'well',
  HeartPulse: 'well',
};

const SKY_WORDS: Array<[SceneSky, string[]]> = [
  ['night', ['night', 'dark', 'after sunset', 'late that night']],
  ['dawn', ['dawn', 'daybreak', 'sunrise', 'early morning', 'at morning', 'first light']],
  ['dusk', ['evening', 'sunset', 'dusk', 'as the sun went down']],
  ['storm', ['storm', 'flood', 'thunder', 'rain poured', 'huge waves']],
];

const WORD_PATTERNS = new Map<string, RegExp>();

function wordPattern(word: string): RegExp {
  let pattern = WORD_PATTERNS.get(word);
  if (!pattern) {
    const stem = word.length >= 5 ? '' : '\\b';
    pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${stem}`, 'i');
    WORD_PATTERNS.set(word, pattern);
  }
  return pattern;
}

/**
 * Whole words only. As a plain substring `ark` matched "dark" and `tur`
 * matched "nature", which is how 106 panels ended up drawing a boat.
 *
 * A keyword of five letters or more may also open a word, because the lists are
 * written as stems on purpose (`carpent` for carpenter, `worship` for worshipped).
 * Shorter ones must stand alone: `sea`, `star`, `wind` and `well` would otherwise
 * claim season, start, window and wellness.
 */
function mentionsWord(text: string, word: string): boolean {
  return wordPattern(word).test(text);
}

/**
 * The scene for a key, re-timed for the words it is drawn under: a part that
 * happens at night or on the water gets that sky or that sea even when its
 * motif was chosen for something else.
 *
 * The light only ever changes when the paragraph's own words say a time:
 * re-tinting one picture to make it look new is exactly what a child notices.
 */
function paintScene(key: StorySceneKey, text: string): SceneSpec {
  const spec = SCENES[key] ?? SCENES.palms;
  // The most specific time-of-day phrase wins, not the first one found, so
  // "as the sun went down" outranks a passing "morning".
  let skyOverride: SceneSky | undefined;
  let matchedLength = 0;
  for (const [sky, words] of SKY_WORDS) {
    for (const word of words) {
      if (word.length > matchedLength && mentionsWord(text, word)) {
        skyOverride = sky;
        matchedLength = word.length;
      }
    }
  }
  const ground: SceneGround = spec.ground;
  return {
    ...spec,
    ground,
    ...(skyOverride ? { sky: skyOverride } : {}),
  };
}

/**
 * Explicit `scene` on the chapter wins; otherwise the words of the part choose
 * the picture; otherwise the story's own symbol does.
 */
export function resolveScene(chapter: KidsStoryChapter | undefined, illustrationSymbol: string): SceneSpec {
  const text = chapter ? `${chapter.title.en} ${chapter.paragraphs.slice(0, 2).map(p => p.en).join(' ')}` : '';
  const spec = paintScene(chapterSceneKey(chapter, illustrationSymbol), text.toLowerCase());
  return chapter ? { ...spec, art: artDirection(chapter, text, 0, [], spec.motif) } : spec;
}

/**
 * The picture for one paragraph of a part.
 *
 * Literal objects and the chapter's event determine the subject. Repetition
 * changes the composition in artDirection, never the meaning of this scene.
 * `used` remains accepted for existing callers; it cannot override context.
 */
export function resolveParagraphScene(
  chapter: KidsStoryChapter,
  paragraphEnglish: string,
  illustrationSymbol: string,
  used?: StorySceneKey[],
): SceneSpec {
  const own = paragraphEnglish.toLowerCase();
  const key = chooseContextualScene(chapter, paragraphEnglish) ?? chapterSceneKey(chapter, illustrationSymbol);
  return paintScene(key, own);
}

/**
 * The pictures for a whole part, in order. They are resolved together because
 * each paragraph's scene depends on the paragraphs above it, and a subject that
 * genuinely returns is recorded with how many times it has (`frame`) so the
 * panel draws it from a different distance instead of repeating the shot.
 */
export function resolvePanelScenes(
  chapter: KidsStoryChapter,
  illustrationSymbol: string,
  storyId?: string,
): Array<{ spec: SceneSpec; frame: number }> {
  const panels: Array<{ spec: SceneSpec; frame: number }> = [];
  chapter.paragraphs.forEach((paragraph) => {
    const spec = resolveParagraphScene(
      chapter,
      paragraph.en,
      illustrationSymbol,
      panels.map((panel) => panel.spec.motif),
    );
    const art = artDirection(chapter, paragraph.en, panels.length, panels.map(panel => panel.spec), spec.motif);
    const secondary = art.secondary ? SCENES[art.secondary] : undefined;
    const alt = `${art.symbolic ? 'Symbolic story illustration. ' : ''}${spec.alt}${secondary ? ` Background detail: ${secondary.alt}` : ''}`;
    panels.push({
      spec: { ...spec, alt, art },
      frame: panels.filter((panel) => panel.spec.motif === spec.motif && panel.spec.sky === spec.sky).length,
    });
  });
  return panels;
}

function chapterSceneKey(chapter: KidsStoryChapter | undefined, illustrationSymbol: string): StorySceneKey {
  if (chapter) {
    const contextual = chooseContextualScene(chapter, chapter.title.en);
    if (contextual) return contextual;
  }
  if (chapter?.scene) return chapter.scene;
  return SYMBOL_SCENES[illustrationSymbol] ?? 'homeYard';
}

