import type { KidsStoryV2 } from 'types/kidsStories.types';

/**
 * Ali ibn Abi Talib (RA) — the Prophet's cousin and son-in-law, who grew up
 * in the Prophet's home and was the first of the children to accept Islam
 * (Phase 8 Batch 2).
 *
 * Citation discipline for Sahabah content: Hadith/Seerah sourced ONLY. No
 * Quran-narrated "personal" events are used as sources here — everything is
 * anchored to authentic hadith or an established Seerah work. Where a
 * specific authentic narration could not be confidently verified while
 * writing, the reference is marked `needsVerification: true` rather than
 * guessing a number.
 *
 * `ur` here is a faithful rendering of the English on this page — no event,
 * title or ruling is added that the English does not carry. The subject is
 * named in the Urdu reading form (علی بن ابی طالب رضی اللہ عنہ) rather than the
 * English spelling, because English words dropped inside an Urdu sentence
 * render as broken half-script text for the child reader.
 *
 * Review sign-off: single-reviewer (site owner). Sources get `reviewed: true`
 * + `reviewedBy`/`reviewedDate` in batches; confirm-read sign-off, not
 * scholarly/ijazah certification.
 */
export const SAHABI_ALI: KidsStoryV2 = {
  id: 'ali',
  type: 'sahabi',
  nameArabic: 'علي بن أبي طالب',
  nameEnglish: 'Ali ibn Abi Talib',
  illustrationSymbol: 'Swords',
  accentColor: '#8e5fc9',
  summary: {
    en: 'The cousin of the Prophet ﷺ who grew up in his own home. While he was still a child, his heart chose Islam, and he never changed his mind. He grew into a brave knight on the battlefield, a patient judge, and the most loyal of friends.',
    ur: 'نبی کریم ﷺ کے چچا زاد بھائی، جنہیں آپ ﷺ نے اپنے ہی گھر میں پلایا۔ وہ ابھی بچے ہی تھے کہ ان کے دل نے اسلام چن لیا، اور انہوں نے کبھی اپنا ارادہ نہ بدلا۔ بڑے ہو کر وہ میدانِ جنگ میں ایک بہادر سپاہی بنے، صبر کرنے والے منصف ہوئے، اور سب سے زیادہ ثابت قدم دوست ثابت ہوئے۔',
  },
  chapters: [
    {
      id: 'boy-in-the-prophets-house',
      title: { en: 'A Boy in the Prophet’s House', ur: 'نبی کریم ﷺ کے گھر کا بچہ' },
      paragraphs: [
        {
          en: 'Long ago, Makkah had a year when the rain did not come and the ground grew hard and dry. Life was very hard for everyone, including a good uncle of the Prophet ﷺ named Abu Talib, who had many young ones to feed.',
          ur: 'بہت پرانی بات ہے، مکہ میں ایک ایسا سال آیا جب بارش نہیں ہوئی اور زمین سخت اور خشک ہو گئی۔ سب کی زندگی بہت مشکل ہو گئی، جن میں نبی کریم ﷺ کے ایک نیک چچا ابو طالب بھی تھے، جن کے گھر پالنے کے لیے کئی چھوٹے بچے تھے۔',
        },
        {
          en: 'The Prophet ﷺ always helped people, so he took his little cousin Ali into his own home. Ali grew up eating, sleeping, and learning beside the most honest man in all of Makkah.',
          ur: 'نبی کریم ﷺ ہمیشہ لوگوں کی مدد فرماتے تھے، اس لیے آپ ﷺ نے اپنے چھوٹے چچا زاد بھائی علی کو اپنے گھر میں رکھ لیا۔ علی کھاتے پیتے، سوتے اور سیکھتے ہوئے مکہ کے سب سے سچے انسان کے پہلو میں پلے بڑھے۔',
        },
        {
          en: 'From a very small age, Ali watched everything the Prophet ﷺ did. He saw how gently he spoke to the little ones, how kindly he treated his neighbors, and how he never, ever told a lie.',
          ur: 'علی نے بچپن ہی سے نبی کریم ﷺ کا ہر کام دیکھا۔ انہوں نے دیکھا کہ آپ ﷺ چھوٹوں سے کیسے نرمی سے بولتے ہیں، پڑوسیوں کے ساتھ کیسے شفقت کرتے ہیں، اور ہرگز ہرگز جھوٹ نہیں بولتے۔',
        },
        {
          en: 'Because of this, the Prophet ﷺ shaped the man Ali would become. Years later, everyone who knew him said the same thing: growing up in the Prophet’s house had filled his heart with light.',
          ur: 'یہی وجہ تھی کہ نبی کریم ﷺ نے علی کو وہ انسان بنا دیا جو وہ بعد میں بنے۔ کئی سالوں بعد، ان سب نے جو انہیں جانتے تھے ایک ہی بات کہی: نبی کریم ﷺ کے گھر میں پلنے نے ان کے دل کو روشنی سے بھر دیا تھا۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Seerah (Ibn Hisham)', label: { en: 'The Seerah tells how the Prophet ﷺ took young Ali into his home', ur: 'سیرت بتاتی ہے کہ نبی کریم ﷺ نے چھوٹے علی کو اپنے گھر رکھا' } },
        {
          type: 'hadith',
          reference: 'Sahih al-Bukhari (the Prophet ﷺ raised Ali in his home)',
          needsVerification: true,
          label: { en: 'Ali grew up in the Prophet’s house, learning from the most honest man', ur: 'علی نبی کریم ﷺ کے گھر پلے بڑھے اور سب سے سچے انسان سے سیکھتے رہے' },
        },
      ],
    },
    {
      id: 'the-first-of-the-children',
      title: { en: 'The First of the Children', ur: 'بچوں میں سب سے پہلے' },
      paragraphs: [
        {
          en: 'When the Prophet ﷺ began to call people to worship Allah alone, some of his dearest listeners were his own family. Among them was a boy — Ali — who was still young, standing at the edge between childhood and the story of Islam.',
          ur: 'جب نبی کریم ﷺ نے لوگوں کو صرف ایک اللہ کی عبادت کی طرف بلانا شروع کیا تو ان کے اپنے گھر والے انہیں سننے والوں میں سب سے عزیز تھے۔ انہی میں ایک لڑکا تھا — علی — جو ابھی چھوٹا تھا اور بچپن اور اسلام کی کہانی کے سنگم پر کھڑا تھا۔',
        },
        {
          en: 'One day the Prophet ﷺ asked his family to be the first to accept the message. Ali did not wait, and he did not ask for more signs. He already loved the Prophet ﷺ so much that his heart said “I believe” right away.',
          ur: 'ایک دن نبی کریم ﷺ نے اپنے گھر والوں سے کہا کہ وہ اس پیغام کو سب سے پہلے قبول کریں۔ علی نے نہ انتظار کیا اور نہ مزید کوئی نشان مانگا۔ وہ نبی کریم ﷺ سے پہلے ہی اتنی محبت کرتے تھے کہ ان کا دل فوراً بول اُٹھا “میں ایمان لاتا ہوں۔”',
        },
        {
          en: 'The Seerah tells us that among the boys and girls of Makkah, Ali was the first child to accept Islam. He was only around ten years old, but his courage stood taller than many grown-ups.',
          ur: 'سیرت ہمیں بتاتی ہے کہ مکہ کے لڑکوں اور لڑکیوں میں علی پہلے بچے تھے جنہوں نے اسلام قبول کیا۔ وہ تقریباً دس سال کے تھے، مگر ان کی ہمت بہت سے بڑوں سے اونچی تھی۔',
        },
        {
          en: 'Being first is not about being the biggest or the strongest. Ali showed that even a child can lead the way with a brave heart, and that loving Allah from a young heart is a very real thing.',
          ur: 'پہلے ہونا اس بات کا نام نہیں کہ انسان سب سے بڑا یا سب سے طاقتور ہو۔ علی نے دکھایا کہ ایک بچہ بھی دلیر دل کے ساتھ راہ دکھا سکتا ہے، اور چھوٹے دل سے اللہ سے محبت کرنا بالکل حقیقی چیز ہے۔',
        },
        {
          en: 'In those very first days, the household of the Prophet ﷺ was just three people: the Prophet ﷺ, his wife Khadijah, and young Ali. Together they carried the first small light of Islam before anyone else joined.',
          ur: 'ان پہلے ہی دنوں میں نبی کریم ﷺ کے گھر میں صرف تین افراد تھے: نبی کریم ﷺ، ان کی بیوی خدیجہ، اور چھوٹے علی۔ ان سب نے مل کر اسلام کی پہلی چھوٹی سی روشنی اٹھائی، اس سے پہلے کہ کوئی اور شامل ہوتا۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Seerah (Ibn Hisham)', label: { en: 'The Seerah records that Ali was the first child of Makkah to accept Islam', ur: 'سیرت لکھتی ہے کہ علی مکہ کے پہلے بچے تھے جنہوں نے اسلام قبول کیا' } },
        {
          type: 'hadith',
          reference: 'Sahih al-Bukhari (Ali accepted Islam while a child)',
          needsVerification: true,
          label: { en: 'Ali still a young boy, eagerly believes in the Prophet’s message', ur: 'علی جو ابھی چھوٹے لڑکے تھے، دل سے نبی ﷺ کے پیغام پر ایمان لے آئے' },
        },
      ],
    },
    {
      id: 'the-brave-fighter',
      title: { en: 'The Brave Fighter', ur: 'بہادور سپاہی' },
      paragraphs: [
        {
          en: 'When the believers moved to Madinah, enemies from Makkah still came to fight them. In the great battlefield of Badr, Ali was still a young man, yet he stood in the lines of the fighters with a heart as steady as the strongest shield.',
          ur: 'جب مومن مدینہ ہو گئے تو مکہ کے دشمن اب بھی ان سے لڑنے آتے تھے۔ بڑے میدانِ بدر میں علی ابھی نوجوان ہی تھے، مگر انہوں نے لڑاکوں کی قطاروں میں ایسی جگہ لی جیسے ان کا دل سب سے مضبوط ڈھال کی طرح قائم ہو۔',
        },
        {
          en: 'At Badr, a small and faithful army of Muslims faced many enemies, and Allah gave them a wonderful victory. Ali fought with all his strength, protecting his Prophet ﷺ and the believers beside him.',
          ur: 'بدر میں مسلمانوں کا ایک چھوٹا مگر باایمان لشکر کئی دشموں کے مقابل آیا، اور اللہ نے انہیں عمدہ فتح عطا کی۔ علی نے اپنی پوری طاقت سے لڑائی کی، اور اپنے نبی کریم ﷺ اور اپنے ساتھ کھڑے مومنوں کی حفاظت کی۔',
        },
        {
          en: 'Years later, when it came to the strong forts of Khaybar, the Prophet ﷺ said: “I will give the flag tomorrow to a man who loves Allah and His Messenger, and whom Allah and His Messenger love.” Everyone could hardly wait for the morning.',
          ur: 'کئی سالوں بعد، جب بات خیبر کے مضبوط قلعوں کی آئی تو نبی کریم ﷺ نے فرمایا: “کل میں جھنڈا اُس شخص کے دوں گا جو اللہ اور اس کے رسول سے محبت کرتا ہے، اور اللہ اور اس کے رسول اس سے محبت کرتے ہیں۔” سب بی تاب تھے کہ صبح کب آئے۔',
        },
        {
          en: 'The next day, the Prophet ﷺ called for no one but Ali and placed the flag in his hand. With the flag in hand, Ali said he would first call the enemy to Islam — and only if they refused would there be a fight for the truth.',
          ur: 'اگلے دن نبی کریم ﷺ نے علی کے سوا کسی کو نہ بلایا اور جھنڈا ان کے ہاتھ میں دے دیا۔ جھنڈا تھامے علی نے کہا کہ پہلے میں دشمن کو اسلام کی طرف بلاتا ہوں — اور اگر وہ انکار کریں گے تو حق کے لیے لڑائی ہوگی۔',
        },
        {
          en: 'That day Ali carried the flag as boldly as a lion, and the people began to call him the lion of Allah. All his strength, he always said, belonged not to himself but to Allah.',
          ur: 'اُس دن علی نے شیر جیسی دلیری سے جھنڈا اٹھایا، اور لوگوں نے انہیں اللہ کا شیر کہنا شروع کر دیا۔ وہ ہمیشہ کہتے تھے کہ ان کی ساری طاقت اللہ کی ہے، ان کی اپنی نہیں۔',
        },
      ],
      sources: [
        {
          type: 'hadith',
          reference: 'Sahih al-Bukhari; Sahih Muslim (the flag of Khaybar given to Ali)',
          label: { en: 'The Prophet ﷺ gives the flag at Khaybar to Ali, the man who loves Allah', ur: 'نبی ﷺ خیبر کے دن جھنڈا علی کو دیتے ہیں، جو اللہ سے محبت کرنے والے ہیں' },
        },
        { type: 'hadith', reference: 'Seerah (Ibn Hisham; the battle of Badr)', label: { en: 'Ali stands bravely among the Muslims who win the battle of Badr', ur: 'علی ان مسلمانوں میں بہادری سے لڑتے ہیں جو جنگ بدر میں فتح پاتے ہیں' } },
      ],
    },
    {
      id: 'the-prophets-praise',
      title: { en: 'Deep Praise From the Prophet ﷺ', ur: 'نبی کریم ﷺ کی گہری ستائش' },
      paragraphs: [
        {
          en: 'The Prophet ﷺ loved Ali very much and praised him on many special days. During a very long journey, Ali had to stay behind in Madinah for a while, and some troublemakers whispered: “Look, he was left behind!”',
          ur: 'نبی کریم ﷺ علی سے بہت محبت فرماتے تھے اور کئی خاص دنوں میں ان کی تعریف کی۔ ایک بہت لمبے سفر میں علی کو کچھ دیر مدینہ میں پیچھے رکنا پڑا، اور بعض شر پسندوں نے سرگوشی کی: “دیکھو، وہ تو پیچھے رہ گئے!”',
        },
        {
          en: 'Ali hurried after the Prophet ﷺ to explain. The Prophet ﷺ then said to him those famous words: “Are you not satisfied to be to me like Harun to Musa?” — like Aaron, the brother and helper of the prophet Moses, peace be upon them.',
          ur: 'علی وضاحت کے لیے فوراً نبی کریم ﷺ کے پیچھے ہو پڑے۔ نبی کریم ﷺ نے پھر ان سے وہ مشہور جملہ کہا: “کیا تم اس بات پر راضی نہیں کہ میرے لیے تم وہ ہو جو ہارون موسیٰ کے لیے تھے؟” — یعنی ہارون علیہ السلام، جو نبی موسیٰ علیہ السلام کے بھائی اور مددگار تھے۔',
        },
        {
          en: 'And the Prophet ﷺ added the deepest of them all: “But there is no prophet after me.” For a while, Ali’s place beside the Messenger of Allah was the closest a companion could ever reach.',
          ur: 'اور نبی کریم ﷺ نے سب سے گہری بات یہ جوڑی: “مگر میرے بعد کوئی نبی نہیں۔” کچھ دیر کے لیے، اللہ کے رسول ﷺ کے پہلو میں علی کا مقام ایک صحابی کے لیے وہ سب سے زیادہ قریب تھا جتنا کوئی صحابی کبھی پا سکتا ہے۔',
        },
        {
          en: 'Makkah called the Prophet ﷺ “the trustworthy one” even before Islam, and he trusted Ali the same way. When they were together, the town knew that whatever the Prophet ﷺ said, and whatever Ali agreed to, could always be believed.',
          ur: 'مکہ والے نبی کریم ﷺ کو اسلام سے پہلے بھی “امین” کہتے تھے، اور آپ ﷺ بھی علی پر اسی طرح بھروسا فرماتے تھے۔ جب یہ دونوں ساتھ ہوتے تو شہر والے جانتے تھے کہ نبی کریم ﷺ جو بھی فرمائیں اور علی جس سے بھی متفق ہوں، وہ ہمیشہ سچ مانا جا سکتا ہے۔',
        },
        {
          en: 'Such praise from the one he loved carried Ali for his whole life. It reminds us that when someone we love speaks into our hearts with kindness and trust, it can lift us higher than we ever knew we could go.',
          ur: 'جس سے علی بے حد محبت کرتے تھے اُس کی یہ تعریف انہیں زندگی بھر ساتھ دیتی رہی۔ یہ ہمیں یاد دلاتا ہے کہ جب کوئی ہم سے محبوب شخص نرمی اور اعتماد کے ساتھ ہمارے دلوں میں بات کہے، تو وہ ہمیں اس سے بھی اونچا اٹھا سکتا ہے جتنی بلندی تک ہم نے کبھی پہنچنے کا سوچا بھی نہ تھا۔',
        },
      ],
      sources: [
        {
          type: 'hadith',
          reference: 'Sahih al-Bukhari; Sahih Muslim (the Prophet ﷺ comparing Ali to Aaron as Moses)',
          label: { en: 'The Prophet ﷺ tells Ali he is like Aaron to Moses, but no prophet after him', ur: 'نبی ﷺ علی کہتے ہیں کہ وہ موسیٰ کے لیے ہارون کی مانند ہیں، مگر ان کے بعد کوئی نبی نہیں' },
        },
      ],
    },
    {
      id: 'wise-and-fair',
      title: { en: 'Wise and Fair for Allah', ur: 'اللہ کے لیے دانائی اور انصاف' },
      paragraphs: [
        {
          en: 'Many people remember Ali only as a swordsman. But the Prophet ﷺ also trusted him as a judge and a teacher, and he sent him to a distant land to lead the people. Ali had hands that could fight, and a heart that loved fairness.',
          ur: 'بہت سے لوگ علی کو صرف تلوار باز کے طور پر یاد رکھتے ہیں۔ مگر نبی کریم ﷺ نے ان پر منصف اور استاد کے طور پر بھی بھروسا کیا، اور انہیں لوگوں کی رہنمائی کے لیے دور کے ایک خطے میں بھیجا۔ علی کے پاس وہ ہاتھ تھے جو لڑ سکتے تھے، اور وہ دل تھا جو انصاف کو چاہتا تھا۔',
        },
        {
          en: 'When the Prophet ﷺ sent Ali to judge between people, he gave him this advice: listen to both sides before deciding, so that no innocent person is ever harmed. Ali carried those words like a lamp in his heart.',
          ur: 'جب نبی کریم ﷺ نے علی کو لوگوں کے درمیان فیصلہ کرنے کے لیے بھیجا تو انہیں یہ نصیحت فرمائی: فیصلہ کرنے سے پہلے دونوں فریقوں کی بات سن لو، تاکہ کبھی کسی بے قصور کو نقصان نہ پہنچے۔ علی نے وہ باتیں اپنے دل میں ایک چراغ کی طرح اٹھا رکھیں۔',
        },
        {
          en: 'Everyone could see how fairly Ali decided. He never favored the rich over the poor, and he never took the side of his own family over a stranger. His wisdom flowed from his love of Allah, which made people trust him.',
          ur: 'سب دیکھ سکتے تھے کہ علی کتنے انصاف سے فیصلہ کرتے ہیں۔ انہوں نے کبھی غریب کے مقابل امیر کو ترجیح نہیں دی، اور کبھی اجنبی کے بدلے اپنے گھر والوں کا ساتھ نہیں دیا۔ ان کی دانائی اُن کی اللہ سے محبت سے نکلتی تھی، جس کی وجہ سے لوگ ان پر بھروسا کرتے تھے۔',
        },
        {
          en: 'Ali also taught his students that a sharp mind is a person’s best weapon. Strength can win a single fight, but knowledge and fairness keep peace between people for a whole lifetime.',
          ur: 'علی نے اپنے شاگردوں کو یہ بھی سکھایا کہ تیز ذہن انسان کا سب سے اچھا ہتھیار ہے۔ طاقت ایک ہی لڑائی جیت سکتی ہے، مگر علم اور انصاف لوگوں کے درمیان عمر بھر کا امن قائم رکھتے ہیں۔',
        },
        {
          en: 'So Ali’s real title is not only “the Brave.” He is also “the Wise.” Fighting was just a small part of his story — the true story is a boy who grew into a man whose fairness and gentle mind made a whole generation trust him.',
          ur: 'تو علی کا اصل لقب صرف “بہادر” نہیں ہے۔ وہ “دانا” بھی ہیں۔ لڑائی ان کی کہانی کا صرف ایک چھوٹا سا حصہ تھی — اصل کہانی یہ ہے کہ ایک بچہ بڑا ہو کر ایسا شخص بنا جس کے انصاف اور نرم ذہن نے ایک پوری نسل کا بھروسا جیت لیا۔',
        },
      ],
      sources: [
        {
          type: 'hadith',
          reference: 'Seerah (Ibn Hisham); Sunan works on Ali as judge in Yemen',
          needsVerification: true,
          label: { en: 'The Prophet ﷺ sends Ali to Yemen to judge fairly between people', ur: 'نبی ﷺ علی کو یمن بھیجتے ہیں تاکہ لوگوں کے درمیان انصاف سے فیصلہ کریں' },
        },
        {
          type: 'hadith',
          reference: 'Sayings of Ali recorded in Sunan collections',
          needsVerification: true,
          label: { en: 'Ali taught that a sharp mind and fairness are the best strength', ur: 'علی نے سکھایا کہ تیز دماغ اور انصاف بہترین طاقت ہے' },
        },
      ],
    },
  ],
};