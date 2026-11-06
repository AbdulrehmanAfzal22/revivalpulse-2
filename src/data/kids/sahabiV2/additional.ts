import type { KidsStoryV2 } from 'types/kidsStories.types';

/**
 * Twenty-nine companions told from one shared five-part shape (Phase 9).
 *
 * Urdu is a first-class reader here, so every Urdu template interpolates an
 * Urdu value — never the English name, trait or lesson. English words dropped
 * inside an Urdu sentence render as broken half-script text, which is what the
 * companion reader looked like before.
 *
 * `feminine` selects the one clause in these templates whose verb agrees with
 * the subject; the rest is ergative (`نے` plus object agreement) and reads
 * the same for brothers and sisters.
 *
 * Review sign-off: this Urdu was drafted from the English and every source is
 * marked `needsVerification: true`. It ships and displays normally, but the
 * site owner has not confirmed-read it yet.
 */
type Profile = {
  id: string;
  nameEnglish: string;
  nameArabic: string;
  /** Urdu reading name, honorific included: رضی اللہ عنہ / رضی اللہ عنہا. */
  nameUrdu: string;
  trait: string;
  traitUrdu: string;
  lesson: string;
  lessonUrdu: string;
  feminine?: boolean;
  symbol: string;
  color: string;
  reference: string;
};

const profiles: Profile[] = [
  { id: 'abdullah-ibn-umar', nameEnglish: 'Abdullah ibn Umar', nameArabic: 'عبد الله بن عمر', nameUrdu: 'عبداللہ بن عمر رضی اللہ عنہ', trait: 'careful learning and honesty', traitUrdu: 'غور سے سیکھنا اور سچائی', lesson: 'learn carefully, speak truthfully, and follow good guidance', lessonUrdu: 'غور سے سیکھو، سچ بولو اور اچھی ہدایت پر چلو', symbol: 'Scroll', color: '#246a73', reference: 'Sahih al-Bukhari' },
  { id: 'abdullah-ibn-abbas', nameEnglish: 'Abdullah ibn Abbas', nameArabic: 'عبد الله بن عباس', nameUrdu: 'عبداللہ بن عباس رضی اللہ عنہ', trait: 'love of Quranic knowledge', traitUrdu: 'قرآنی علم سے محبت', lesson: 'ask good questions and share useful knowledge kindly', lessonUrdu: 'اچھے سوالات پوچھو اور مفید علم نرمی سے بانٹو', symbol: 'BookOpen', color: '#8f5b34', reference: 'Sahih al-Bukhari' },
  { id: 'abdullah-ibn-masud', nameEnglish: "Abdullah ibn Mas'ud", nameArabic: 'عبد الله بن مسعود', nameUrdu: 'عبداللہ بن مسعود رضی اللہ عنہ', trait: 'beautiful Quran recitation and humility', traitUrdu: 'خوبصورت تلاوت اور عاجزی', lesson: 'a sincere heart matters more than looking important', lessonUrdu: 'مخلص دل دکھاوے کی اہمیت سے زیادہ اہم ہے', symbol: 'Sparkle', color: '#7b4f9e', reference: 'Sahih Muslim' },
  { id: 'abu-ubaydah', nameEnglish: 'Abu Ubaydah ibn al-Jarrah', nameArabic: 'أبو عبيدة بن الجراح', nameUrdu: 'ابو عبیدہ بن الجراح رضی اللہ عنہ', trait: 'trustworthiness and gentle leadership', traitUrdu: 'امانت داری اور نرم قیادت', lesson: 'people trust the person who is honest and calm', lessonUrdu: 'لوگ ایماندار اور پرسکون شخص پر بھروسا کرتے ہیں', symbol: 'ShieldCheck', color: '#2f7d68', reference: 'Sahih al-Bukhari' },
  { id: 'said-ibn-zayd', nameEnglish: "Sa'id ibn Zayd", nameArabic: 'سعيد بن زيد', nameUrdu: 'سعید بن زید رضی اللہ عنہ', trait: 'quiet faith and courage', traitUrdu: 'خاموش ایمان اور ہمت', lesson: 'good deeds do not need applause', lessonUrdu: 'نیک کاموں کو داد و تحسین کی ضرورت نہیں', symbol: 'Shield', color: '#b45d3c', reference: 'Jami at-Tirmidhi' },
  { id: 'talhah', nameEnglish: 'Talhah ibn Ubaydullah', nameArabic: 'طلحة بن عبيد الله', nameUrdu: 'طلحہ بن عبید اللہ رضی اللہ عنہ', trait: 'bravery and generous care', traitUrdu: 'بہادری اور فیاضانہ خدمت', lesson: 'protecting others and sharing blessings are noble acts', lessonUrdu: 'دوسروں کی حفاظت اور نعمتوں میں شریک ہونا نیک کام ہے', symbol: 'HeartPulse', color: '#bd4f6f', reference: 'Sunan an-Nasa’i' },
  { id: 'zubayr', nameEnglish: 'Az-Zubayr ibn al-Awwam', nameArabic: 'الزبير بن العوام', nameUrdu: 'زبیر بن العوام رضی اللہ عنہ', trait: 'courage and loyalty', traitUrdu: 'ہمت اور وفاداری', lesson: 'stand beside friends when truth needs support', lessonUrdu: 'جب سچ کی مدد چاہیے تو دوستوں کے ساتھ کھڑے ہو', symbol: 'Swords', color: '#4c669f', reference: 'Sahih al-Bukhari' },
  { id: 'abdur-rahman', nameEnglish: 'Abdur Rahman ibn Awf', nameArabic: 'عبد الرحمن بن عوف', nameUrdu: 'عبدالرحمن بن عوف رضی اللہ عنہ', trait: 'generosity and gratitude', traitUrdu: 'فیاضی اور شکرگزاری', lesson: 'work honestly, then give from what Allah provides', lessonUrdu: 'حلال کمائی کرو پھر اللہ کے دیے ہوئے مال میں سے دو', symbol: 'Gem', color: '#b27a24', reference: 'Sahih al-Bukhari' },
  { id: 'jafar', nameEnglish: "Ja'far ibn Abi Talib", nameArabic: 'جعفر بن أبي طالب', nameUrdu: 'جعفر بن ابی طالب رضی اللہ عنہ', trait: 'steadfastness and brave kindness', traitUrdu: 'ثبات اور بہادر مہربانی', lesson: 'kind words and firm faith can help a whole community', lessonUrdu: 'نرم الفاظ اور مضبوط ایمان پوری امت کے کام آ سکتے ہیں', symbol: 'Bird', color: '#3d8b9b', reference: 'Sahih al-Bukhari' },
  { id: 'muadh', nameEnglish: 'Muadh ibn Jabal', nameArabic: 'معاذ بن جبل', nameUrdu: 'معاذ بن جبل رضی اللہ عنہ', trait: 'understanding and teaching', traitUrdu: 'گہرا فہم اور تعلیم', lesson: 'learn well so you can help people with wisdom', lessonUrdu: 'اچھی طرح سیکھو تاکہ حکمت سے لوگوں کی مدد کر سکو', symbol: 'GraduationCap', color: '#6f63a8', reference: 'Sahih al-Bukhari' },
  { id: 'abu-hurairah', nameEnglish: 'Abu Hurairah', nameArabic: 'أبو هريرة', nameUrdu: 'ابو ہریرہ رضی اللہ عنہ', trait: 'careful memory and love of learning', traitUrdu: 'ضبط اور علم سے محبت', lesson: 'pay attention to good words and pass them on faithfully', lessonUrdu: 'اچھی باتوں پر توجہ دو اور انہیں درستگی سے آگے پہنچاؤ', symbol: 'Star', color: '#d18a2e', reference: 'Sahih al-Bukhari' },
  { id: 'abu-ayyub', nameEnglish: 'Abu Ayyub al-Ansari', nameArabic: 'أبو أيوب الأنصاري', nameUrdu: 'ابو ایوب انصاری رضی اللہ عنہ', trait: 'hospitality and devotion', traitUrdu: 'مہمان نوازی اور بندگی', lesson: 'welcoming guests and serving others brings blessing', lessonUrdu: 'مہمانوں کا خیر مقدم اور لوگوں کی خدمت برکت لاتی ہے', symbol: 'Tent', color: '#9b6b4b', reference: 'Sahih al-Bukhari' },
  { id: 'sad-ibn-muadh', nameEnglish: "Sa'd ibn Mu'adh", nameArabic: 'سعد بن معاذ', nameUrdu: 'سعد بن معاذ رضی اللہ عنہ', trait: 'justice and brave responsibility', traitUrdu: 'انصاف اور بہادر ذمہ داری', lesson: 'be fair even when making a hard decision', lessonUrdu: 'مشکل فیصلے میں بھی انصاف کرو', symbol: 'Scale', color: '#3e7890', reference: 'Sahih al-Bukhari' },
  { id: 'ubayy-ibn-kab', nameEnglish: 'Ubay ibn Kab', nameArabic: 'أبي بن كعب', nameUrdu: 'ابی بن کعب رضی اللہ عنہ', trait: 'devotion to the Quran', traitUrdu: 'قرآن سے لگاؤ', lesson: 'let the Quran guide your heart and your choices', lessonUrdu: 'قرآن کو اپنا دل اور اپنے فیصلے سنوارنے دو', symbol: 'Scroll', color: '#a34d58', reference: 'Sahih Muslim' },
  { id: 'suhayb', nameEnglish: 'Suhayb ar-Rumi', nameArabic: 'صهيب الرومي', nameUrdu: 'صہیب رومی رضی اللہ عنہ', trait: 'sacrifice and sincere faith', traitUrdu: 'قربانی اور مخلص ایمان', lesson: 'Allah values what we give up for what is right', lessonUrdu: 'اللہ حق کے لیے چھوڑی ہوئی چیز کو قدر دیتا ہے', symbol: 'Waves', color: '#287c9a', reference: 'Ibn Majah' },
  { id: 'usama', nameEnglish: 'Usama ibn Zayd', nameArabic: 'أسامة بن زيد', nameUrdu: 'اسامہ بن زید رضی اللہ عنہ', trait: 'young courage and responsibility', traitUrdu: 'نوجوان ہمت اور ذمہ داری', lesson: 'young people can lead with patience and good character', lessonUrdu: 'نوجوان صبر اور اچھے کردار سے رہنمائی کر سکتے ہیں', symbol: 'Mountain', color: '#6b8c4a', reference: 'Sahih al-Bukhari' },
  { id: 'zayd-ibn-thabit', nameEnglish: 'Zayd ibn Thabit', nameArabic: 'زيد بن ثابت', nameUrdu: 'زید بن ثابت رضی اللہ عنہ', trait: 'writing and serving the Quran', traitUrdu: 'قرآن کی کتابت اور خدمت', lesson: 'use your skills to preserve truth and help others', lessonUrdu: 'اپنی مہارت سچ کو محفوظ کرنے اور لوگوں کی مدد کے لیے لگاؤ', symbol: 'BookOpen', color: '#7d5b36', reference: 'Sahih al-Bukhari' },
  { id: 'abdullah-ibn-salam', nameEnglish: 'Abdullah ibn Salam', nameArabic: 'عبد الله بن سلام', nameUrdu: 'عبداللہ بن سلام رضی اللہ عنہ', trait: 'recognizing truth with wisdom', traitUrdu: 'حکمت سے سچ پہچاننا', lesson: 'follow truth with humility, even when it changes your path', lessonUrdu: 'عاجزی کے ساتھ سچ پر چلو، چاہے راستہ بدل جائے', symbol: 'Sun', color: '#c47b35', reference: 'Sahih al-Bukhari' },
  { id: 'aisha', nameEnglish: 'Aisha bint Abi Bakr', nameArabic: 'عائشة بنت أبي بكر', nameUrdu: 'عائشہ بنت ابی بکر رضی اللہ عنہا', trait: 'knowledge, courage, and clear teaching', traitUrdu: 'علم، ہمت اور واضح تعلیم', lesson: 'curiosity and careful learning can benefit many people', lessonUrdu: 'تجسس اور غور سے سیکھنا بہت سے لوگوں کے کام آ سکتا ہے', feminine: true, symbol: 'Lamp', color: '#c65b82', reference: 'Sahih al-Bukhari' },
  { id: 'fatimah', nameEnglish: 'Fatimah bint Muhammad', nameArabic: 'فاطمة بنت محمد', nameUrdu: 'فاطمہ رضی اللہ عنہا', trait: 'patience, modesty, and family love', traitUrdu: 'صبر، حیا اور گھر والوں سے محبت', lesson: 'gentleness and patience are signs of strength', lessonUrdu: 'نرمی اور صبر طاقت کی نشانی ہیں', feminine: true, symbol: 'HeartPulse', color: '#b34f73', reference: 'Sahih al-Bukhari' },
  { id: 'umm-salamah', nameEnglish: 'Umm Salamah', nameArabic: 'أم سلمة', nameUrdu: 'ام سلمہ رضی اللہ عنہا', trait: 'wisdom and thoughtful counsel', traitUrdu: 'حکمت اور سوچا سمجھا مشورہ', lesson: 'calm advice can guide people through difficult moments', lessonUrdu: 'پرسکون مشورہ لوگوں کو مشکل لمحوں سے گزار سکتا ہے', feminine: true, symbol: 'Compass', color: '#4d7398', reference: 'Sahih Muslim' },
  { id: 'hafsah', nameEnglish: 'Hafsah bint Umar', nameArabic: 'حفصة بنت عمر', nameUrdu: 'حفصہ بنت عمر رضی اللہ عنہا', trait: 'care for written Quran pages', traitUrdu: 'قرآن کے صفحات کی حفاظت', lesson: 'protect precious knowledge and treat it with respect', lessonUrdu: 'قیمتی علم کی حفاظت کرو اور اس کے ساتھ ادب رکھو', feminine: true, symbol: 'BookOpen', color: '#8d5b9f', reference: 'Sahih al-Bukhari' },
  { id: 'zaynab-bint-jahsh', nameEnglish: 'Zaynab bint Jahsh', nameArabic: 'زينب بنت جحش', nameUrdu: 'زینب بنت جحش رضی اللہ عنہا', trait: 'charity and generosity', traitUrdu: 'صدقہ اور فیاضی', lesson: 'give with an open hand and a sincere heart', lessonUrdu: 'کھلے ہاتھ اور مخلص دل سے دو', feminine: true, symbol: 'HandHeart', color: '#c05a4a', reference: 'Sahih Muslim' },
  { id: 'ruqayyah', nameEnglish: 'Ruqayyah bint Muhammad', nameArabic: 'رقية بنت محمد', nameUrdu: 'رقیہ رضی اللہ عنہا', trait: 'patience and family devotion', traitUrdu: 'صبر اور گھر والوں کی خدمت', lesson: 'kindness and patience shine during hard times', lessonUrdu: 'مشکل وقت میں مہربانی اور صبر چمکتے ہیں', feminine: true, symbol: 'Leaf', color: '#4b9a71', reference: 'Sahih al-Bukhari' },
  { id: 'umm-kulthum', nameEnglish: 'Umm Kulthum bint Muhammad', nameArabic: 'أم كلثوم بنت محمد', nameUrdu: 'ام کلثوم رضی اللہ عنہا', trait: 'patience and faithful family bonds', traitUrdu: 'صبر اور مضبوط گھریلو بندھن', lesson: 'love, patience, and trust help families stay strong', lessonUrdu: 'محبت، صبر اور بھروسا گھرانوں کو مضبوط رکھتے ہیں', feminine: true, symbol: 'Handshake', color: '#9c688e', reference: 'Sahih al-Bukhari' },
  { id: 'asma-bint-abi-bakr', nameEnglish: 'Asma bint Abi Bakr', nameArabic: 'أسماء بنت أبي بكر', nameUrdu: 'اسماء بنت ابی بکر رضی اللہ عنہا', trait: 'courage and resourcefulness', traitUrdu: 'ہمت اور تدبیر', lesson: 'be brave, helpful, and wise when others need you', lessonUrdu: 'جب لوگوں تمہیں چاہیں تو بہادر، مددگار اور دانشمند بنو', feminine: true, symbol: 'CloudSun', color: '#5c7eae', reference: 'Sahih al-Bukhari' },
  { id: 'umm-aiman', nameEnglish: 'Umm Ayman', nameArabic: 'أم أيمن', nameUrdu: 'ام ایمن رضی اللہ عنہا', trait: 'loyal care and steadfast faith', traitUrdu: 'وفادار خیال اور ثابت قدم ایمان', lesson: 'faithful service and kindness make a lasting difference', lessonUrdu: 'ایمانداری سے خدمت اور مہربانی دیرپا اثر چھوڑتی ہیں', feminine: true, symbol: 'ShieldCheck', color: '#3d826f', reference: 'Sahih Muslim' },
  { id: 'sumayyah', nameEnglish: 'Sumayyah bint Khayyat', nameArabic: 'سمية بنت خياط', nameUrdu: 'سمیہ بنت خیاط رضی اللہ عنہا', trait: 'steadfastness and brave faith', traitUrdu: 'ثبات اور بہادر ایمان', lesson: 'hold on to truth with courage and patience', lessonUrdu: 'ہمت اور صبر کے ساتھ سچ تھامے رکھو', feminine: true, symbol: 'Flame', color: '#d15d32', reference: 'Ibn Majah' },
  { id: 'nusaybah', nameEnglish: "Nusaybah bint Ka'b", nameArabic: 'نسيبة بنت كعب', nameUrdu: 'نصیبہ بنت کعب رضی اللہ عنہا', trait: 'bravery and protecting others', traitUrdu: 'بہادری اور دوسروں کی حفاظت', lesson: 'courage means caring for people, not seeking praise', lessonUrdu: 'ہمت کا مطلب لوگوں کا خیال رکھنا ہے، تعریف کی دوڑ نہیں', feminine: true, symbol: 'Shield', color: '#425f9e', reference: 'Musnad Ahmad' },
];

function text(en: string, ur: string) {
  return { en, ur };
}

/** The one clause in these templates whose verb agrees with the subject. */
function listenedCarefully(feminine: boolean | undefined): string {
  return feminine
    ? 'وہ غور سے سنتیں، سچائی اختیار کرتیں اور اپنے آس پاس کے لوگوں کی مدد کرتی تھیں۔'
    : 'وہ غور سے سنتے، سچائی اختیار کرتے اور اپنے آس پاس کے لوگوں کی مدد کرتے تھے۔';
}

function makeStory(profile: Profile): KidsStoryV2 {
  const citation = { type: 'hadith' as const, reference: profile.reference, needsVerification: true };

  return {
    id: profile.id,
    type: 'sahabi',
    nameArabic: profile.nameArabic,
    nameEnglish: profile.nameEnglish,
    summary: text(
      `${profile.nameEnglish} was known for ${profile.trait}. Their life shows children how faith can shape everyday choices.`,
      `${profile.nameUrdu} کی پہچان یہ تھی: ${profile.traitUrdu}۔ ان کی زندگی بچوں کو دکھاتی ہے کہ ایمان روزمرہ کے فیصلوں کو کیسے سنوارتا ہے۔`
    ),
    illustrationSymbol: profile.symbol,
    accentColor: profile.color,
    chapters: [
      {
        id: 'early-faith',
        title: text('Early Life and Faith', 'ابتدائی زندگی اور ایمان'),
        paragraphs: [
          text(`${profile.nameEnglish} grew up learning that Allah sees every kind deed. They listened carefully, chose honesty, and tried to help the people around them.`, `${profile.nameUrdu} نے بچپن سے سیکھا کہ اللہ ہر نیک کام کو دیکھتا ہے۔ ${listenedCarefully(profile.feminine)}`),
          text(`When Islam came with its message of worshipping Allah alone, ${profile.nameEnglish} valued truth and kept faith close to the heart.`, `جب اسلام اللہ وحدہٗ لاشریک کی عبادت کا پیغام لایا تو ${profile.nameUrdu} نے سچائی کو پہچانا اور ایمان کو دل سے تھام لیا۔`),
        ],
        ayahNote: text('Allah loves people who believe and do good deeds.', 'اللہ ان لوگوں سے محبت کرتا ہے جو ایمان لاتے اور نیک عمل کرتے ہیں۔'),
        sources: [{ ...citation, label: text(`Reports remember ${profile.nameEnglish} for ${profile.trait}.`, `روایات ${profile.nameUrdu} کی پہچان بیان کرتی ہیں: ${profile.traitUrdu}۔`) }],
      },
      {
        id: 'legacy-lesson',
        title: text('A Life of Good Character', 'اچھے کردار والی زندگی'),
        paragraphs: [
          text(`In a moment that tested the companions, ${profile.nameEnglish} showed ${profile.trait}. The choice was not about fame; it was about doing what was right for Allah and for people.`, `صحابہ کے امتحان کے ایک موقع پر ${profile.nameUrdu} نے وہی کردار دکھایا جس کے لیے وہ جانے جاتے تھے: ${profile.traitUrdu}۔ یہ انتخاب شہرت کے لیے نہیں بلکہ اللہ اور لوگوں کی بھلائی کے لیے تھا۔`),
          text(`Children can follow this example today: ${profile.lesson}. Small sincere actions can grow into a beautiful legacy.`, `بچے آج بھی اس مثال پر چل سکتے ہیں: ${profile.lessonUrdu}۔ چھوٹے مخلص کام ایک خوبصورت میراث بن سکتے ہیں۔`),
        ],
        ayahNote: text('The best people are those who bring goodness to others.', 'بہترین لوگ وہ ہیں جو دوسروں کے لیے بھلائی لاتے ہیں۔'),
        sources: [{ ...citation, label: text(`The lesson of ${profile.nameEnglish}'s example is ${profile.lesson}.`, `${profile.nameUrdu} کی مثال کا سبق ہے: ${profile.lessonUrdu}۔`) }],
      },
      {
        id: 'service-and-sacrifice',
        title: text('A Defining Sacrifice', 'ایک نمایاں قربانی'),
        paragraphs: [
          text(`${profile.nameEnglish} faced a moment when faith required courage and sacrifice. They chose to help the believers and protect what was right, even when the choice was difficult.`, `${profile.nameUrdu} کو ایک ایسے موقع کا سامنا ہوا جب ایمان کے لیے ہمت اور قربانی ضروری تھی۔ انہوں نے مشکل کے باوجود اہل ایمان کی مدد اور حق کی حفاظت کو چنا۔`),
          text(`Their example shows that brave hearts are not people who never feel afraid; they are people who keep doing good while trusting Allah.`, `ان کی مثال بتاتی ہے کہ بہادر دل وہ نہیں جو کبھی خوف محسوس نہ کریں، بلکہ وہ ہیں جو اللہ پر بھروسا کرتے ہوئے نیکی کرتے رہیں۔`),
        ],
        sources: [{ ...citation, label: text(`${profile.nameEnglish}'s life is remembered for courage, service, and sacrifice.`, `${profile.nameUrdu} کی زندگی ہمت، خدمت اور قربانی کے لیے یاد کی جاتی ہے۔`) }],
      },
      {
        id: 'near-the-prophet',
        title: text('Close to the Prophet ﷺ', 'نبی ﷺ کے قریب'),
        paragraphs: [
          text(`The companions learned character from the Prophet ﷺ: speak truthfully, keep promises, show mercy, and care for neighbors. ${profile.nameEnglish} worked to live by these beautiful teachings.`, `صحابہ نے نبی ﷺ سے سچ بولنا، وعدہ پورا کرنا، رحم کرنا اور پڑوسیوں کا خیال رکھنا سیکھا۔ ${profile.nameUrdu} نے ان خوبصورت تعلیمات پر عمل کرنے کی کوشش کی۔`),
          text(`When children copy one good habit from this story, they keep a little of that noble example alive.`, `جب بچے اس کہانی کی ایک اچھی عادت اپناتے ہیں تو وہ اس عظیم مثال کو زندہ رکھتے ہیں۔`),
        ],
        sources: [{ ...citation, label: text(`The Prophet's teachings shaped ${profile.nameEnglish}'s character.`, `نبی ﷺ کی تعلیمات نے ${profile.nameUrdu} کے کردار کو سنوارا۔`) }],
      },
      {
        id: 'legacy-and-lesson',
        title: text('Legacy and Lesson', 'میراث اور سبق'),
        paragraphs: [
          text(`People remembered ${profile.nameEnglish} because their actions matched their faith. Their story continued to inspire families and students who wanted to become better Muslims.`, `لوگ ${profile.nameUrdu} کو اس لیے یاد رکھتے ہیں کہ ان کے عمل ان کے ایمان کے مطابق تھے۔ ان کی کہانی بہتر مسلمان بننے کی خواہش رکھنے والے خاندانوں اور طلبہ کو متاثر کرتی رہی۔`),
          text(`The lesson for us is simple: ${profile.lesson}. Allah sees every sincere step, whether it is large or small.`, `ہمارے لیے سبق آسان ہے: ${profile.lessonUrdu}۔ اللہ ہر مخلص قدم کو دیکھتا ہے، چاہے وہ بڑا ہو یا چھوٹا۔`),
        ],
        sources: [{ ...citation, label: text(`${profile.nameEnglish}'s legacy teaches children to ${profile.lesson}.`, `${profile.nameUrdu} کی میراث بچوں کو یہ سبق دیتی ہے: ${profile.lessonUrdu}۔`) }],
      },
    ],
  };
}

export const ADDITIONAL_SAHABI_V2: KidsStoryV2[] = profiles.map(makeStory);
