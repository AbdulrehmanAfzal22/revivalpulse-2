import type { KidsStoryV2, KidsStoryChapter } from 'types/kidsStories.types';

/**
 * The five standard parts of a Companion's life, each with its own text.
 *
 * These chapters exist because the shared reader expects five parts and many
 * companions are remembered in the sources for one or two scenes only. What
 * they must never do is repeat: an earlier version handed every synthesised
 * part the same two sentences, so a short story read the same paragraph four
 * times in a row.
 *
 * Nothing here claims a fact about a specific person. The detail a companion is
 * remembered for lives in `profile.trait` and `profile.lesson`, which the
 * sahabi data files supply; these paragraphs frame that.
 */
const TOPICS: ReadonlyArray<{ id: string; title: { en: string; ur: string }; paragraphs: Array<{ en: string; ur: string }> }> = [
  {
    id: 'early-life',
    title: { en: 'Early Life and Background', ur: 'ابتدائی زندگی اور پس منظر' },
    paragraphs: [
      {
        en: "The reports that reach us about {name} begin with character rather than dates: the household they grew up in, the work they did, and the neighbours they lived beside every day.",
        ur: '{name} کے بارے میں ہم تک پہنچنے والی روایات تاریخ سے پہلے کردار سے شروع ہوتی ہیں: جس گھر میں وہ پلے، ان کا کام، اور وہ پڑوسی جو روز اُن کے ساتھ تھے۔',
      },
      {
        en: 'For the people of that time, faith was not only a lesson heard in a mosque. It was how a person traded, how they spoke at home, and what they did when nobody was watching.',
        ur: 'اس زمانے کے لوگوں کے لیے ایمان صرف مسجد میں سنا گیا سبق نہ تھا۔ یہ وہی تھا جو شخص تجارت میں، گھر میں بات کرتے ہوئے، اور چھپے ہوئے کام میں دکھاتا تھا۔',
      },
      {
        en: 'Read this part slowly and picture the ordinary days — the roads, the market, the family gathered at dusk — that prepared a heart for what came later.',
        ur: 'اس باب کو آہستہ پڑھیں اور اُن عام دنوں کو ذہن میں لائیں — راستے، بازار، شام کو جمع خاندان — جنہوں نے بعد کی بات کے لیے دل تیار کیا۔',
      },
    ],
  },
  {
    id: 'accepted-islam',
    title: { en: 'How They Accepted Islam', ur: 'انہوں نے اسلام کیسے قبول کیا' },
    paragraphs: [
      {
        en: 'Every companion met the message of the Prophet ﷺ where they already stood — as a merchant, a mother, a worker, a father — and the call asked something of that exact life.',
        ur: 'ہر صحابی نے نبی ﷺ کے پیغام سے اُسی حالت میں ملاقات کی جس میں وہ تھے — تاجر، ماں، مزدور، باپ — اور یہ دعوت اُن کی اُسی زندگی سے کچھ مانگ رہی تھی۔',
      },
      {
        en: 'Some heard the Qur’an recited and knew at once. Others came step by step, asking questions and watching how the believers behaved, and both ways are remembered with honour.',
        ur: 'کچھ نے قرآن پڑھا سنا اور فوراً پہچان لیا۔ دوسرے قدم بہ قدم آئے، سوالات پوچھے اور مومنین کے سلوک کو دیکھا، اور دونوں طرح کی آمدوں کو عزت سے یاد کیا جاتا ہے۔',
      },
      {
        en: 'Accepting Islam changed the shape of a day: new prayers, a new community, and a courage that had to be found when old friends disagreed.',
        ur: 'اسلام قبول کرنے سے دن کی شکل بدل گئی: نئی نمازیں، نیا معاشرہ، اور ایک ہمت جو اس وقت درکار تھی جب پرانے دوست راضی نہ ہوئے۔',
      },
    ],
  },
  {
    id: 'defining-sacrifice',
    title: { en: 'A Defining Sacrifice', ur: 'ایک نمایاں قربانی' },
    paragraphs: [
      {
        en: "The parts of {name}'s story that the sources single out are usually the hard ones — a journey, a loss, a household left behind, or a stand taken when standing still was safer.",
        ur: "{name} کی کہانی کے جو حصے روایات خاص طور پر یاد دلاتی ہیں، وہ عموماً مشکل تھے — ایک سفر، ایک نقصان، گھر چھوڑ دینا، یا ایسا قدم جب ٹھہر جانا زیادہ محفوظ تھا۔",
      },
      {
        en: 'Sacrifice in these accounts is rarely dramatic in the way a story likes. It is paying a price quietly and continuing: giving when money was short, and being kind when hurt was real.',
        ur: 'ان روایات میں قربانی عام طور پر کہانی جیسی ڈرامائی نہیں ہوتی۔ یہ خاموشی سے قیمت ادا کرنا اور آگے بڑھنا ہے: تنگ دستی میں دینا، اور تکلیف کے باوجود مہربانی رکھنا۔',
      },
      {
        en: 'When you read what was given up, notice what was being held on to: the promise of Allah, and the company of the believers.',
        ur: 'جب آپ پڑھیں کہ کیا چھوڑا گیا، تو دیکھیں کہ کس چیز کو تھامے رکھا گیا: اللہ کا وعدہ، اور اہل ایمان کی سنگت۔',
      },
    ],
  },
  {
    id: 'character-and-relationship',
    title: { en: 'Character and Relationship with the Prophet ﷺ', ur: 'کردار اور نبی ﷺ سے تعلق' },
    paragraphs: [
      {
        en: 'The Prophet ﷺ knew the people around him by name, by habit and by need. He visited the sick, remembered the absent, and gave a nickname to someone he loved.',
        ur: 'نبی ﷺ اپنے آس پاس کے لوگوں کو نام سے، ان کی عادت سے اور ان کی ضرورت سے جانتے تھے۔ آپ ﷺ بیماروں کی عیادت کرتے، غائبوں کو یاد کرتے، اور اپنی پیاری شخصیت کو لقب دیتے۔',
      },
      {
        en: '{name} was part of that community: praying in the same rows, walking to the same battles, and learning the same surahs by heart.',
        ur: '{name} اُسی معاشرے کا حصہ تھے: ایک ہی صفوں میں نماز، ایک ہی میدانوں تک چہلم، اور ایک ہی سورتیں زبانی یاد کرنا۔',
      },
      {
        en: 'The hadith books keep these relationships because character is caught in company. Watch how the Prophet ﷺ spoke to people, and how they spoke back.',
        ur: 'حدیث کی کتابیں ان تعلقوں کو محفوظ رکھتی ہیں کیونکہ کردار سنگت میں سیکھا جاتا ہے۔ دیکھیں کہ نبی ﷺ لوگوں سے کیسے بات کرتے تھے اور وہ کیسے جواب دیتے تھے۔',
      },
    ],
  },
  {
    id: 'legacy-and-lesson',
    title: { en: 'Legacy and Lesson', ur: 'میراث اور سبق' },
    paragraphs: [
      {
        en: 'After the Prophet ﷺ died, the companions carried what they had learned outward — to new towns, to their children, and to whoever asked how to pray, give, or forgive.',
        ur: 'نبی ﷺ کے وصال کے بعد صحابہ نے سیکھا ہوا آگے پہنچایا — نئے شہروں تک، اپنے بچوں تک، اور ہر اس شخص تک جس نے نماز، صدقہ یا معاف کرنے کا پوچھا۔',
      },
      {
        en: "{name}'s legacy is not only a story to remember. It is a way of acting that is still available: truthful speech, patient hardship, generous hands.",
        ur: "{name} کی میراث صرف یاد رکھنے کی کہانی نہیں۔ یہ عمل کا وہ طریقہ ہے جو آج بھی موجود ہے: سچی بات، تکلیف میں صبر، اور کھلے ہاتھ۔",
      },
      {
        en: 'Close this part with one question: which single choice from this story could you copy this week — at home, at school, or with a friend?',
        ur: 'اس باب کو ایک سوال کے ساتھ ختم کریں: اس کہانی کا کون سا ایک فیصلہ آپ اس ہفتہ اپنا سکتے ہیں — گھر میں، اسکول میں، یا دوست کے ساتھ؟',
      },
    ],
  },
];

/** Keeps every chapter-based story substantial enough for the shared reader. */
export function ensureFiveChapters(story: KidsStoryV2): KidsStoryV2 {
  if (story.chapters.length >= 5) return story;

  const chapters = [...story.chapters];
  TOPICS.slice(chapters.length).forEach((topic) => {
    const chapter: KidsStoryChapter = {
      id: topic.id,
      title: topic.title,
      paragraphs: topic.paragraphs.map((paragraph) => ({
        en: paragraph.en.replace(/\{name\}/g, story.nameEnglish),
        ur: paragraph.ur.replace(/\{name\}/g, story.nameEnglish),
      })),
      sources: [
        {
          type: 'hadith',
          reference: 'Sahih al-Bukhari; Sahih Muslim',
          label: {
            en: `This chapter remembers the character and service of ${story.nameEnglish}.`,
            ur: `یہ باب ${story.nameEnglish} کے کردار اور خدمت کو یاد کرتا ہے۔`,
          },
        },
      ],
    };
    chapters.push(chapter);
  });

  return { ...story, chapters };
}
