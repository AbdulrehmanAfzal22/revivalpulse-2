import type { SurahQuest } from 'types/kids.types';

/**
 * Authored quest content for the 15 guided Juz 'Amma surahs (data/kids/juzAmmaTiers.ts).
 *
 * Every `wordKeys.arabic` string is quoted from the bundled mushaf text
 * (public/data/quran-full-arabic.json) for that surah, so the word-match round
 * teaches a word the child genuinely just heard recited — that is asserted in
 * surahQuests.test.ts rather than eyeballed.
 *
 * `hook` and `practice` stay in English on purpose, following the same
 * convention as the alphabet station blurbs: surah-specific prose is not worth
 * fanning out across eleven dictionaries with machine-ish translations, and a
 * child reading Arabic/Urdu/Farsi still gets the verses themselves in the
 * reader above the quest.
 */
export const SURAH_QUESTS: SurahQuest[] = [
  {
    surahId: 112,
    hook: 'The whole surah is one answer to one question: who is Allah? Four short verses say He is One, needs nothing, has no child, and has no equal.',
    wordKeys: [
      { arabic: 'أَحَدٌ', transliteration: 'ahad', english: 'One — with no partner' },
      { arabic: 'ٱلصَّمَدُ', transliteration: 'as-samad', english: 'The One everyone needs, who needs nothing' },
      { arabic: 'لَمْ يَلِدْ', transliteration: 'lam yalid', english: 'He does not give birth' },
    ],
    practice: 'Recite Al-Ikhlas three times tonight — the Prophet ﷺ said it equals a third of the Qur’an.',
  },
  {
    surahId: 113,
    hook: 'A du’a for shelter. It names four things that can frighten us — created harm, the closing dark, the blowers on knots, and the envier — and runs to the Lord of the daybreak.',
    wordKeys: [
      { arabic: 'ٱلْفَلَقِ', transliteration: 'al-falaq', english: 'The crack of dawn' },
      { arabic: 'غَاسِقٍ', transliteration: 'ghasiq', english: 'The deep dark night' },
      { arabic: 'حَاسِدٍ', transliteration: 'hasid', english: 'Someone who envies' },
    ],
    practice: 'Say Al-Falaq and An-Nas together when you feel scared, and ask Allah for shelter.',
  },
  {
    surahId: 114,
    hook: 'The surah of people. Allah is named three times as our Lord, our King, our God — then we run from the whisperer who slides back the moment we remember Allah.',
    wordKeys: [
      { arabic: 'ٱلنَّاسِ', transliteration: 'an-nas', english: 'All people' },
      { arabic: 'ٱلْوَسْوَاسِ ٱلْخَنَّاسِ', transliteration: 'al-waswas al-khannas', english: 'The whisperer who keeps retreating' },
      { arabic: 'صُدُورِ', transliteration: 'suduri', english: 'Chests, hearts' },
    ],
    practice: 'When a bad thought whispers, say a‘udhu billahi — the whisperer is the one who hides.',
  },
  {
    surahId: 108,
    hook: 'The shortest surah in the Qur’an, sent to comfort the Prophet ﷺ when people mocked him for having no surviving sons: Allah gave him abundance, so pray and give — and mockery ends up forgotten.',
    wordKeys: [
      { arabic: 'ٱلْكَوْثَرَ', transliteration: 'al-kawthar', english: 'Abundant good' },
      { arabic: 'وَٱنْحَرْ', transliteration: 'wanhar', english: 'And offer a sacrifice' },
      { arabic: 'ٱلْأَبْتَرُ', transliteration: 'al-abtar', english: 'Cut off, with no memory' },
    ],
    practice: 'Name three things Allah gave you today and say alhamdulillah for each one.',
  },
  {
    surahId: 103,
    hook: 'Three verses that read like a whole life plan: time is passing, we all lose — except those who believe, do good, and tell each other the truth with patience.',
    wordKeys: [
      { arabic: 'وَٱلْعَصْرِ', transliteration: 'wal-‘asr', english: 'By the passing time' },
      { arabic: 'خُسْرٍ', transliteration: 'khusr', english: 'Loss' },
      { arabic: 'ٱلصَّبْرِ', transliteration: 'as-sabr', english: 'Staying patient' },
    ],
    practice: 'Teach Al-‘Asr to someone at home this week — the surah itself tells us to remind each other.',
  },
  {
    surahId: 110,
    hook: 'The victory surah. When Allah’s help arrived and Makkah opened, people entered Islam in crowds — and the answer to a big win was praise, thanks and asking forgiveness.',
    wordKeys: [
      { arabic: 'نَصْرُ ٱللَّهِ', transliteration: 'nasru Allah', english: 'Allah’s help' },
      { arabic: 'وَٱلْفَتْحُ', transliteration: 'al-fath', english: 'The opening, the victory' },
      { arabic: 'أَفْوَاجًۭا', transliteration: 'afwajan', english: 'In crowds, group after group' },
    ],
    practice: 'When something goes really well, say subhanAllahi wa bihamdihi — that is what this surah does.',
  },
  {
    surahId: 105,
    hook: 'A memory picture from before the Prophet ﷺ was born: an army and its elephant marched on the Ka‘bah, and small birds came with stones of baked clay until the soldiers were like eaten straw.',
    wordKeys: [
      { arabic: 'ٱلْفِيلِ', transliteration: 'al-fil', english: 'The elephant' },
      { arabic: 'طَيْرًا أَبَابِيلَ', transliteration: 'tayran ababil', english: 'Flocks of birds' },
      { arabic: 'سِجِّيلٍۢ', transliteration: 'sijjil', english: 'Hard baked clay' },
    ],
    practice: 'When someone big and loud scares you, remember the elephant that never reached Makkah.',
  },
  {
    surahId: 106,
    hook: 'Allah reminded the tribe of Quraysh about their safe trading caravans, their food after hunger, and their security after fear — and asked who those blessings came from.',
    wordKeys: [
      { arabic: 'قُرَيْشٍ', transliteration: 'quraysh', english: 'The tribe of Quraysh' },
      { arabic: 'رِحْلَةَ ٱلشِّتَآءِ وَٱلصَّيْفِ', transliteration: 'rihlata ash-shita’ was-sayf', english: 'The trading journeys of winter and summer' },
      { arabic: 'ٱلْبَيْتِ', transliteration: 'al-bayt', english: 'The House, the Ka‘bah' },
    ],
    practice: 'Ask Allah for safety and food for the whole ummah before you sleep tonight.',
  },
  {
    surahId: 111,
    hook: 'Abu Lahab was the Prophet’s ﷺ own uncle and used his money and rank to hurt him. This surah answered him: wealth cannot rescue anyone, and even his wife, who carried thorns for the Prophet ﷺ, shared his end.',
    wordKeys: [
      { arabic: 'تَبَّتْ', transliteration: 'tabbat', english: 'Ruined and lost' },
      { arabic: 'ذَاتَ لَهَبٍۢ', transliteration: 'dhata lahab', english: 'A blazing flame' },
      { arabic: 'مَّسَدٍۭ', transliteration: 'masad', english: 'Twisted palm fibre' },
    ],
    practice: 'Kindness costs nothing and buys nothing with Allah — do one good deed nobody sees today.',
  },
  {
    surahId: 109,
    hook: 'Some people offered the Prophet ﷺ a deal: one year our worship, one year yours. Allah replied with a clean no — six verses that draw one line under who we worship.',
    wordKeys: [
      { arabic: 'ٱلْكَٰفِرُونَ', transliteration: 'al-kafirun', english: 'Those who cover up the truth' },
      { arabic: 'لَآ أَعْبُدُ', transliteration: 'la a‘budu', english: 'I do not worship' },
      { arabic: 'لَكُمْ دِينُكُمْ', transliteration: 'lakum dinukum', english: 'For you your way' },
    ],
    practice: 'Be gentle with everyone — but pray only to Allah, all the time.',
  },
  {
    surahId: 107,
    hook: 'This surah tests religion at the door of the house: does the one who denies the Day push the orphan away, forget his prayer, show off, and refuse to lend a small thing?',
    wordKeys: [
      { arabic: 'ٱلْيَتِيمَ', transliteration: 'al-yatim', english: 'The child with no father' },
      { arabic: 'ٱلْمِسْكِينِ', transliteration: 'al-miskin', english: 'The needy person' },
      { arabic: 'ٱلْمَاعُونَ', transliteration: 'al-ma‘un', english: 'Small everyday help' },
    ],
    practice: 'Lend or give away one small thing you use every day — that is al-ma‘un.',
  },
  {
    surahId: 1,
    hook: 'The chapter Allah taught us to say in every unit of prayer: seven verses that praise Him, ask only Him for help, and ask for the straight path — recited side by side with the Prophet ﷺ.',
    wordKeys: [
      { arabic: 'ٱلْحَمْدُ', transliteration: 'al-hamdu', english: 'All praise' },
      { arabic: 'ٱهْدِنَا', transliteration: 'ihdina', english: 'Guide us' },
      { arabic: 'ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ', transliteration: 'as-sirata al-mustaqim', english: 'The straight path' },
    ],
    practice: 'In your next prayer, slow down on verse 5 and mean every word of it.',
  },
  {
    surahId: 97,
    hook: 'The night the Qur’an first came down. Worship in it outweighs a thousand months, angels and the Spirit descend by Allah’s command, and it is peace until dawn.',
    wordKeys: [
      { arabic: 'لَيْلَةِ ٱلْقَدْرِ', transliteration: 'laylata al-qadr', english: 'The Night of Decree' },
      { arabic: 'خَيْرٌۭ مِّنْ أَلْفِ شَهْرٍۢ', transliteration: 'khayrun min alfi shahr', english: 'Better than a thousand months' },
      { arabic: 'ٱلْمَلَٰٓئِكَةُ', transliteration: 'al-mala’ikatu', english: 'The angels' },
    ],
    practice: 'Look for it in the odd nights of the last ten nights of Ramadan and pray two rak‘ah.',
  },
  {
    surahId: 95,
    hook: 'Allah swears by the fig, the olive, Mount Sinai and the safe city — Makkah — to hold up one fact: Allah made people in the most beautiful shape, and only faith and good deeds keep us there.',
    wordKeys: [
      { arabic: 'ٱلتِّينِ', transliteration: 'at-tin', english: 'The fig' },
      { arabic: 'ٱلزَّيْتُونِ', transliteration: 'az-zaytun', english: 'The olive' },
      { arabic: 'أَحْسَنِ تَقْوِيمٍۢ', transliteration: 'ahsani taqwim', english: 'The best of shapes' },
    ],
    practice: 'Name three things Allah made beautiful — and include yourself in the list.',
  },
  {
    surahId: 99,
    hook: 'The earthquake surah. The earth will shake, drop what it carries, and speak its own news — and on that day an ant’s weight of good or of bad will show up.',
    wordKeys: [
      { arabic: 'زُلْزِلَتِ', transliteration: 'zulzilati', english: 'Was shaken hard' },
      { arabic: 'أَثْقَالَهَا', transliteration: 'athqalaha', english: 'Its heavy loads' },
      { arabic: 'مِثْقَالَ ذَرَّةٍ', transliteration: 'mithqala dharratin', english: 'The weight of a tiny ant' },
    ],
    practice: 'Do one speck-size good deed today that nobody will ever know about.',
  },
];

/** Lookup by surah id, used by the trail and the quest round builder. */
export const SURAH_QUESTS_BY_ID: Record<number, SurahQuest> = Object.fromEntries(
  SURAH_QUESTS.map((quest) => [quest.surahId, quest])
);

export function questForSurah(surahId: number): SurahQuest | undefined {
  return SURAH_QUESTS_BY_ID[surahId];
}
