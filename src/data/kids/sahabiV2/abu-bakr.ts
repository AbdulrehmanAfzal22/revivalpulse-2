import type { KidsStoryV2 } from 'types/kidsStories.types';

/**
 * Abu Bakr as-Siddiq (RA) — the first Caliph and closest friend of the
 * Prophet ﷺ (Phase 8 Batch 1).
 *
 * Citation discipline for Sahabah content: Hadith/Seerah sourced ONLY. No
 * Quran-narrated "personal" events are used as sources here — everything is
 * anchored to authentic hadith or an established Seerah work. Where a
 * specific authentic narration could not be confidently verified while
 * writing, the reference is marked `needsVerification: true` rather than
 * guessing a number.
 *
 * `ur` on this page is a faithful rendering of the English — no event, title
 * or ruling is added that the English does not carry. The subject is named in
 * the Urdu reading form (ابوبکر صدیق رضی اللہ عنہ) rather than the English
 * spelling, because English words dropped inside an Urdu sentence render as
 * broken half-script text for the child reader.
 *
 * Review sign-off: single-reviewer (site owner). Sources get `reviewed: true`
 * + `reviewedBy`/`reviewedDate` in batches; confirm-read sign-off, not
 * scholarly/ijazah certification. The Urdu on this page is newly written and
 * unsigned: every citation keeps `needsVerification: true`, so none of it
 * reads as signed off.
 */
export const SAHABI_ABU_BAKR: KidsStoryV2 = {
  id: 'abu-bakr',
  type: 'sahabi',
  nameArabic: 'أبو بكر',
  nameEnglish: 'Abu Bakr as-Siddiq',
  illustrationSymbol: 'ShieldCheck',
  accentColor: '#3e8e7e',
  summary: {
    en: 'The Prophet’s closest friend and the first free man to accept Islam. The Prophet ﷺ called him as-Siddiq, “the one who always confirms the truth.” After the Prophet passed away, Abu Bakr became the first leader (caliph) of the Muslims.',
    ur: 'نبی کریم ﷺ کے سب سے قریبی دوست اور آزاد مردوں میں سے پہلے شخص جنہوں نے اسلام قبول کیا۔ نبی کریم ﷺ نے انہیں صدیق کہا، یعنی ہمیشہ سچ کی تصدیق کرنے والا۔ نبی کریم ﷺ کے وصال کے بعد ابوبکر صدیق رضی اللہ عنہ مسلمانوں کے پہلے خلیفہ بنے۔',
  },
  chapters: [
    {
      id: 'true-friend',
      title: { en: 'A Friend Like No Other', ur: 'بے مثال دوست' },
      paragraphs: [
        {
          en: 'Long before Islam, a boy named Abu Bakr lived in Makkah. He was known for a gentle heart, a truthful tongue, and a sharp mind. He grew up near a man named Muhammad ﷺ — a man he trusted completely, even before anyone called him a prophet.',
          ur: 'اسلام سے بہت پہلے کی بات ہے، مکہ میں ابوبکر نامی نوجوان رہتے تھے۔ ان کے دل نرم، زبان سچی اور سوچ بہت تیز تھی۔ وہ محمد ﷺ کے بہت قریب رہتے تھے — اس شخص پر انہیں مکمل بھروسا تھا، وہی بعد میں نبی کریم ﷺ بنے۔',
        },
        {
          en: 'When Muhammad ﷺ began to call people to Islam, Abu Bakr was one of the very first to believe. He did not argue, and he did not delay. His friend Muhammad ﷺ had always been honest, so when the message came, Abu Bakr accepted it with his whole heart.',
          ur: 'جب محمد ﷺ نے لوگوں کو اسلام کی دعوت دینا شروع کی تو ابوبکر پہلے چند ماننے والوں میں شامل تھے۔ انہوں نے بحث نہیں کی اور تاخیر بھی نہیں کی۔ ان کے دوست محمد ﷺ کبھی جھوٹ نہیں بولتے تھے، اس لیے جب پیغام آیا تو انہوں نے پورے دل سے قبول کر لیا۔',
        },
        {
          en: 'Because Abu Bakr was well-known and well-loved, many people followed his example. Whole families came into Islam after him. If he spoke well of a man, people would say: “If Abu Bakr trusts him, there is good in him.” So his belief helped many other people believe too.',
          ur: 'ابوبکر پہچانے ہوئے اور محبوب شخص تھے، اس لیے بہت سے لوگوں نے ان کی پیروی کی۔ ان کے بعد پورے گھرانے اسلام میں داخل ہوئے۔ جب وہ کسی کی اچھی تعریف کرتے تو لوگ کہتے: "اگر ابوبکر اس پر بھروسا کرتے ہیں تو اس میں ضرور کوئی اچھائی ہے۔" یوں ان کے ایمان نے کئی اور لوگوں کو بھی ایمان دلا دیا۔',
        },
        {
          en: 'The Prophet ﷺ loved Abu Bakr very deeply. He said that if he were to take a very close friend, it would be Abu Bakr — but Islam made them even closer than that (Sahih al-Bukhari; Sahih Muslim). That special friendship never changed, right up to the very end.',
          ur: 'نبی کریم ﷺ ابوبکر سے بہت زیادہ محبت فرماتے تھے۔ آپ ﷺ نے فرمایا کہ اگر میں اپنا کوئی گہرا دوست بناتا تو ابوبکر کو بناتا، لیکن اسلام نے ان دونوں کو اس سے بھی زیادہ قریب کر دیا (صحیح بخاری؛ صحیح مسلم)۔ وہ خاص دوستی آخری دم تک کبھی نہ بدلی۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari; Sahih Muslim', label: { en: 'The Prophet ﷺ says if he took a very close friend, it would be Abu Bakr', ur: 'نبی کریم ﷺ نے فرمایا کہ اگر وہ کوئی گہرا دوست بناتے تو ابوبکر کو بناتے' } },
      ],
    },
    {
      id: 'as-siddiq',
      title: { en: 'The One Nobody Could Doubt', ur: 'جس پر کسی کو شک نہ تھا' },
      paragraphs: [
        {
          en: 'One night, the Prophet ﷺ was carried through the heavens — traveling in a single night from Makkah to the far mosque, and then up through the skies. In the morning the people of Makkah laughed at the idea: “That is impossible!”',
          ur: 'ایک رات نبی کریم ﷺ کو آسمانوں کی طرف اُٹھایا گیا — ایک ہی رات میں مکہ سے دور کی مسجد تک اور پھر آسمانوں پر۔ صبح ہوئی تو مکہ والوں نے یہ بات سن کر ہنسی اڑائی: "یہ ناممکن ہے!"',
        },
        {
          en: 'The people went to Abu Bakr to tell him, expecting him to be surprised too. Instead, Abu Bakr said, “If he said it, then it is true.” That day, the people began to call him as-Siddiq — the one who always confirms the truth.',
          ur: 'لوگ یہ خبر دینے کے لیے ابوبکر کے پاس گئے، انہیں یقین تھا کہ وہ بھی حیران رہ جائیں گے۔ مگر ابوبکر نے کہا: "اگر انہوں نے کہہ دیا ہے تو سچ ہے۔" اسی دن سے لوگوں نے انہیں صدیق کہنا شروع کر دیا، یعنی ہمیشہ سچ کی تصدیق کرنے والا۔',
        },
        {
          en: 'From then on, the whole community had one name for him: as-Siddiq. And it was a perfect name, because Abu Bakr’s heart never wavered when the Prophet ﷺ spoke. Helping the truth was his greatest joy.',
          ur: 'اس کے بعد پوری امت میں ان کا ایک ہی نام تھا: صدیق۔ اور یہ بالکل درست نام تھا، کیونکہ جب بھی نبی کریم ﷺ کچھ فرماتے، ابوبکر کا دل ذرا برابر نہیں ڈگمگایا۔ سچ کی مدد کرنا انہیں سب سے زیادہ بھلاتا تھا۔',
        },
        {
          en: 'Being as-Siddiq is a lesson for us too: when someone we love and trust tells the truth, our own hearts can learn to believe it with the same quiet confidence.',
          ur: 'صدیق ہونا ہمارے لیے بھی سبق ہے: جب کوئی ایسا شخص سچ بتائے جس سے ہمیں محبت اور جس پر ہمارا بھروسا ہو، تو ہمارے دلوں کو بھی اسی طرح اطمینان کے ساتھ سچ ماننا سیکھنا چاہیے۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Seerah (Ibn Kathir, Al-Bidayah wan-Nihayah)', label: { en: 'The Seerah tells how Abu Bakr confirmed the amazing night journey', ur: 'سیرت بتاتی ہے کہ ابوبکر نے معراج کے حیرت انگیز سفر کی تصدیق کی' } },
        { type: 'hadith', reference: 'Sahih al-Bukhari', needsVerification: true, label: { en: 'Abu Bakr is called as-Siddiq for always confirming the truth', ur: 'ہمیشہ سچ کی تصدیق کرنے کی وجہ سے ابوبکر صدیق کہلائے' } },
      ],
    },
    {
      id: 'freeing-the-slaves',
      title: { en: 'Freeing the Believers', ur: 'مومنوں کو آزاد کرنا' },
      paragraphs: [
        {
          en: 'In early Makkah, the rich enemies would torture new Muslims — especially those who had no protectors. They thought that by hurting them, they could make them give up their belief in Allah.',
          ur: 'ابتدائی مکہ میں دولت مند دشمن نئے مسلمانوں پر ظلم کرتے تھے، خاص طور پر ان پر جن کا کوئی حامی بھرنے والا نہ تھا۔ ان کا خیال تھا کہ تکلیف دے کر وہ انہیں اللہ پر ایمان سے باز کر دیں گے۔',
        },
        {
          en: 'Abu Bakr could not stand to watch this. He was a wealthy man, so he spent his money buying these servants and setting them free. In the Seerah we read how he freed and cared for a tall, patient believer named Bilal and others too.',
          ur: 'ابوبکر یہ المناک منظر دیکھ نہ سکے۔ وہ امیر شخص تھے، اس لیے اپنا مال خرچ کر کے ان غلاموں کو خرید خرید کر آزاد کرتے رہے۔ سیرت میں پڑھنے کو ملتا ہے کہ انہوں نے بلال جیسے قد آور اور صبر والے مومن اور دوسرے کئی مومنوں کو آزاد کیا اور ان کا خیال رکھا۔',
        },
        {
          en: 'The Qur’an speaks of one who gave his wealth to cleanse himself, hoping for no favor in return but only the pleasure of his Lord (Qur’an 92:18–21) — and the early scholars linked this with Abu Bakr and his freeing of the believers.',
          ur: 'قرآن مجید میں ایک ایسے شخص کا ذکر ہے جو اپنا مال صرف اپنے آپ کو پاک کرنے کے لیے دیتا ہے اور اسے اپنے رب کی رضا کے سوا کسی بدلے کی امید نہیں (قرآن 92:18–21) — اور ابتدائی علماء نے یہ آیات ابوبکر صدیق رضی اللہ عنہ کے حق میں پڑھی ہیں جب انہوں نے مومن غلام آزاد کیے۔',
        },
        {
          en: 'Freeing a human being and taking care of them is one of the noblest works in Islam. A child today cannot free a servant the way Abu Bakr did, but that child can be kind, generous, and quick to help others — which is the very same caring heart praised by the Prophet ﷺ.',
          ur: 'کسی انسان کو آزاد کرنا اور اس کا خیال رکھنا اسلام کے سب سے نیک کاموں میں سے ہے۔ آج کا بچہ ابوبکر کی طرح غلام آزاد تو نہیں کر سکتا، مگر وہ مہربان، فیاض اور دوسروں کی مدد کے لیے سب سے آگے ہو سکتا ہے — اور یہی وہ نرم دل ہے جس کی نبی کریم ﷺ نے تعریف فرمائی۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari (Chapters on Abu Bakr)', needsVerification: true, label: { en: 'Abu Bakr buys and frees the believing slaves in early Makkah', ur: 'ابوبکر ابتدائی مکہ میں مومن غلاموں کو خرید کر آزاد کرتے ہیں' } },
        { type: 'hadith', reference: 'Seerah (Ibn Hisham)', label: { en: 'The Seerah tells how Abu Bakr freed and cared for Bilal and other believers', ur: 'سیرت بتاتی ہے کہ ابوبکر نے بلال اور دوسرے مومنوں کو کیسے آزاد کیا اور ان کی دیکھ بھال کی' } },
      ],
    },
    {
      id: 'the-cave',
      title: { en: 'Two in the Cave', ur: 'غار میں دو ساتھی' },
      paragraphs: [
        {
          en: 'When the enemies planned to harm the Prophet ﷺ, Allah told him to leave Makkah for Madeenah. In the dark of the night, Abu Bakr went with him — the two of them slipping out while the whole city slept.',
          ur: 'جب دشمنوں نے نبی کریم ﷺ کو نقصان پہنچانے کا منصوبہ بنایا تو اللہ نے آپ ﷺ کو حکم دیا کہ مکہ چھوڑ کر مدینہ جائیں۔ گہری رات میں ابوبکر آپ ﷺ کے ساتھ نکل کھڑے ہوئے — پورا شہر سو رہا تھا اور یہ دونوں چپکے سے نکل گئے۔',
        },
        {
          en: 'They hid in a mountain-side cave called Thawr. From inside the cave, Abu Bakr could see the enemy running toward it, closer and closer, until they reached the very mouth of the cave. “If they look down, they will see us!” he whispered.',
          ur: 'دونوں پہاڑ کی چٹان میں غار ثور میں چھپ گئے۔ غار کے اندر سے ابوبکر دیکھ سکتے تھے کہ دشمن قریب آتے جا رہے ہیں، یہاں تک کہ غار کے بالکل منہ پر پہنچ گئے۔ انہوں نے آہستہ سے کہا: "اگر انہوں نے نیچے دیکھ لیا تو ضرور ہمیں دیکھ لیں گے!"',
        },
        {
          en: 'The Prophet ﷺ comforted him and said: “Do not be sad; indeed Allah is with us.” A spider had covered the entrance with its web, and the enemy — never glancing below their feet — passed by without seeing the two hidden travelers.',
          ur: 'نبی کریم ﷺ نے انہیں تسلی دی اور فرمایا: "تم غم نہ کرو، بے شک اللہ ہمارے ساتھ ہے۔" عنکبوت نے غار کے منہ پر جالے بن لیے تھے اور دشمن — جن کی نظر اپنے پاؤں سے نیچے نہیں پڑتی تھی — ان دو چھپے ہوئے مسافروں کو دیکھے بغیر نکل گئے۔',
        },
        {
          en: 'From that night, the two walked together again, safe under Allah’s protection. With faith like Abu Bakr’s, a person never walks alone; Allah is always with His believing servants.',
          ur: 'اس رات کے بعد دونوں پھر ساتھ ساتھ چلے، اللہ کی حفاظت میں۔ ابوبکر جیسا ایمان رکھنے والا کبھی اکیلا نہیں چلتا؛ اللہ اپنے مومن بندوں کے ساتھ ہمیشہ ہوتا ہے۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari 4665', label: { en: 'The Prophet ﷺ and Abu Bakr hide from the enemies in the Cave of Thawr', ur: 'نبی کریم ﷺ اور ابوبکر غار ثور میں دشمنوں سے چھپ جاتے ہیں' } },
        { type: 'hadith', reference: 'Sahih Muslim', label: { en: 'The Prophet ﷺ says “do not be sad, indeed Allah is with us”', ur: 'نبی کریم ﷺ نے فرمایا کہ غم نہ کرو، اللہ ہمارے ساتھ ہے' } },
      ],
    },
    {
      id: 'first-caliph',
      title: { en: 'The First Leader', ur: 'پہلے خلیفہ' },
      paragraphs: [
        {
          en: 'When the Prophet ﷺ passed away, the Muslims felt very sad, and they came together to decide who would lead them. They looked at one another, because nobody could imagine the community without the Prophet ﷺ.',
          ur: 'نبی کریم ﷺ کے وصال کے بعد مسلمان بہت رنجیدہ ہو گئے اور یہ طے کرنے کے لیے جمع ہوئے کہ ان کی قیادت کون کرے گا۔ وہ ایک دوسرے کی طرف دیکھ رہے تھے، کیونکہ نبی کریم ﷺ کے بغیر امت کا تصور کسی کو ممکن نہیں لگتا تھا۔',
        },
        {
          en: 'Then Umar (RA) stepped forward and called the believers to agree on Abu Bakr. Abu Bakr said he was not the best among them, but the people answered: “We do not know anyone better than you.” So Abu Bakr became the first caliph.',
          ur: 'پھر عمر رضی اللہ عنہ آگے بڑھے اور مومنوں کو ابوبکر کی بیعت پر متفق ہونے کی دعوت دی۔ ابوبکر نے فرمایا کہ میں تم میں سب سے بہتر نہیں ہوں، مگر لوگوں نے کہا: "ہم آپ سے بہتر کسی کو نہیں جانتے۔" یوں ابوبکر صدیق رضی اللہ عنہ پہلے خلیفہ بنے۔',
        },
        {
          en: 'Abu Bakr led with a gentle but firm hand. Some people refused to pay the zakah after the Prophet ﷺ had passed away, and Abu Bakr faced them bravely to keep the community of Islam whole. He also asked the companions to gather the words of the Qur’an into one safe book, so that nothing of it would ever be lost.',
          ur: 'ابوبکر نے نرم مگر مضبوط ہاتھ سے رہنمائی کی۔ نبی کریم ﷺ کے وصال کے بعد بعض لوگوں نے زکوٰۃ دینے سے انکار کیا، اور ابوبکر نے امتِ اسلامیہ کو یکجان رکھنے کے لیے ان کا بہادری سے مقابلہ کیا۔ انہوں نے صحابہ سے قرآن کے الفاظ کو ایک محفوظ مصحف میں جمع کرنے کا بھی کہا تاکہ قرآن کا ایک حرف بھی ضائع نہ ہو۔',
        },
        {
          en: 'Abu Bakr ruled only a short while, but he kept Islam safe and complete. When he passed away, the Muslims remembered him as the truest friend of the Prophet ﷺ — the honest leader who carried Islam forward after the Messenger of Allah.',
          ur: 'ابوبکر کا دورِ خلافت مختصر تھا، مگر انہوں نے اسلام کو محفوظ اور کامل رکھا۔ جب وہ وفات پا گئے تو مسلمان انہیں نبی کریم ﷺ کے سچے دوست کے طور پر یاد کرتے رہے — وہ ایماندار پیشوا جنہوں نے اللہ کے رسول ﷺ کے بعد اسلام کو آگے بڑھایا۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari (Chapters on the virtues of Abu Bakr)', needsVerification: true, label: { en: 'Umar calls the believers to agree on Abu Bakr as the first caliph', ur: 'عمر مسلمانوں کو ابوبکر کو پہلی خلیفہ ماننے کی دعوت دیتے ہیں' } },
        { type: 'hadith', reference: 'Sahih al-Bukhari (the collection of the Qur’an, narrated by Zaid bin Thabit)', needsVerification: true, label: { en: 'The Prophet asks the companions to gather the Qur’an into one book', ur: 'نبی کریم صحابہ سے کہتے ہیں کہ قرآن کو ایک نہیں میں جمع کریں' } },
      ],
    },
  ],
};