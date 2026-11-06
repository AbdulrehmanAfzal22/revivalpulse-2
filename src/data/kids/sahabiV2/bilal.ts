import type { KidsStoryV2 } from 'types/kidsStories.types';

/**
 * Bilal ibn Rabah (RA) — the first mu'adhin (caller to prayer) of Islam
 * (Phase 8 Batch 1).
 *
 * Citation discipline for Sahabah content: Hadith/Seerah sourced ONLY.
 * References that could not be confidently pinned to a specific authentic
 * narration while writing are marked `needsVerification: true`.
 *
 * `ur` here is a faithful rendering of the English on this page — no event,
 * title or ruling is added that the English does not carry. The subject is
 * named in the Urdu reading form (بلال بن رباح رضی اللہ عنہ) rather than the
 * English spelling, because English words dropped inside an Urdu sentence
 * render as broken half-script text for the child reader.
 *
 * Review sign-off: single-reviewer (site owner). Sources get `reviewed: true`
 * + `reviewedBy`/`reviewedDate` in batches; confirm-read sign-off, not
 * scholarly/ijazah certification.
 */
export const SAHABI_BILAL: KidsStoryV2 = {
  id: 'bilal',
  type: 'sahabi',
  nameArabic: 'بلال بن رباح',
  nameEnglish: 'Bilal ibn Rabah',
  illustrationSymbol: 'Sparkle',
  accentColor: '#e0902f',
  summary: {
    en: 'A patient believer whose heart never broke, even under painful treatment in Makkah. The Prophet ﷺ chose him to be the very first person to call the adhan (the call to prayer). Bilal taught us that true strength is a heart that stays close to Allah.',
    ur: 'ایک صبر کرنے والا مومن، جس کا دل مکہ میں سخت تکلیف دہ سلوک کے باوجود کبھی نہ ٹوٹا۔ نبی کریم ﷺ نے اسے سب سے پہلے اذان (نماز کی دعوت) دینے والا بننے کے لیے چنا۔ بلال بن رباح رضی اللہ عنہ نے ہمیں سکھایا کہ سچی طاقت وہ دل ہے جو اللہ سے جڑا رہے۔',
  },
  chapters: [
    {
      id: 'steadfast-heart',
      scene: 'mountain',
      title: { en: 'A Heart That Would Not Break', ur: 'وہ دل جو کبھی نہ ٹوٹا' },
      paragraphs: [
        {
          en: 'Bilal was a tall, strong man who was a servant in Makkah. When he accepted Islam, his owner grew very angry. The owner threw Bilal on the hot sand and placed a heavy stone on his chest, hoping Bilal would give up his faith.',
          ur: 'بلال قد آور اور مضبوط مرد تھے جو مکہ میں ایک غلام تھے۔ جب انہوں نے اسلام قبول کیا تو ان کے مالک بہت غصے ہوئے۔ مالک نے بلال کو تپتی ریت پر گرا دیا اور ان کے سینے پر بھاری پتھر رکھ دیا، تاکہ بلال اپنا دین چھوڑ دیں۔',
        },
        {
          en: 'But Bilal only repeated one word again and again: “Ahad, Ahad — One, One (Allah).” The hotter the day, the stronger his words became. The stones and the heat could hurt his body, but they could never touch his heart.',
          ur: 'مگر بلال بار بار صرف ایک ہی لفظ دہراتے رہے: ‘احد، احد — یعنی ایک۔’ دن جتنا گرم ہوتا، ان کے الفاظ اتنے ہی مضبوط ہوتے جاتے۔ پتھر اور گرمی ان کے جسم کو تکلیف دے سکتے تھے، مگر وہ کبھی ان کے دل کو نہ چھو سکے۔',
        },
        {
          en: 'The Seerah tells us how much goodness Bilal had inside him. Even while he was hurting, he did not become angry at people. He only remembered Allah, because His love was stronger than any pain.',
          ur: 'سیرت ہمیں بتاتی ہے کہ بلال کے اندر کتنی زیادہ نیکی بھری ہوئی تھی۔ تکلیف میں رہتے ہوئے بھی وہ لوگوں پر غصہ نہیں کرتے تھے۔ وہ صرف اللہ کو یاد کرتے تھے، کیونکہ اس کی محبت ہر تکلیف سے زیادہ مضبوط تھی۔',
        },
        {
          en: 'Bilal’s story teaches children a very strong lesson: your heart can be worth more than your physical strength. When we hold on to Allah even through small troubles, our hearts grow as strong as the hearts of the heroes of Islam.',
          ur: 'بلال کی کہانی بچوں کو ایک بہت مضبوط سبق سکھاتی ہے: تمہارا دل تمہاری جسمانی طاقت سے زیادہ قیمتی ہو سکتا ہے۔ جب ہم چھوٹی موٹی پریشانیوں میں بھی اللہ کو تھامے رکھتے ہیں، تو ہمارے دل اسلام کے بہادروں کے دلوں جیسے مضبوط ہو جاتے ہیں۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari, Kitab al-Manakib (Virtues of Bilal)', needsVerification: true, label: { en: 'Bilal repeats Ahad, Ahad under the heavy stone and burning sand', ur: 'بلال بھاری پتھر اور تپتی ریت کے نیچے احد، احد دہراتے ہیں' } },
        { type: 'hadith', reference: 'Seerah (Ibn Hisham)', label: { en: 'The Seerah tells how patient and strong Bilal’s heart stayed', ur: 'سیرت بتاتی ہے کہ بلال کا دل کتنا صابر اور مضبوط رہا' } },
      ],
    },
    {
      id: 'bought-and-freed',
      scene: 'treasure',
      title: { en: 'Bought and Freed by Abu Bakr', ur: 'ابوبکر نے خرید کر آزاد کیا' },
      paragraphs: [
        {
          en: 'Abu Bakr (RA) could not watch his believing brother suffer. He gave money to Bilal’s owner and freed him, so that Bilal could finally stand up, tall and free, and praise his Lord out loud without fear.',
          ur: 'ابوبکر رضی اللہ عنہ اپنے مومن بھائی کو اتنا دکھی ہوتے ہوئے نہیں دیکھ سکے۔ انہوں نے بلال کے مالک کو پیسے دیے اور انہیں آزاد کر دیا، تاکہ بلال آخرکار لمبے قد اور آزاد ہو کر کھڑے ہوں اور بے خوف اپنے رب کی تعریف کھل کر کر سکیں۔',
        },
        {
          en: 'Bilal the student was a free man, and free same heart he had kept in confinement came out whole. He found his place beside the Prophet ﷺ, close to him night and day, loving him more and more.',
          ur: 'اب بلال آزاد انسان تھے، اور وہی آزاد دل جو انہوں نے قید میں سلامت رکھا تھا، ویسا ہی سلامت باہر آیا۔ انہوں نے نبی کریم ﷺ کے پہلو میں اپنی جگہ پائی، رات دن ان کے قریب، ان سے بڑھتی ہوئی محبت کے ساتھ۔',
        },
        {
          en: 'Some people once said that Abu Bakr had bought Bilal for a small profit, so the Prophet ﷺ corrected them: “If you underpaid him, we would repay it; if you overpaid him, we would accept him.” And he made sure everyone knew that Abu Bakr’s payment-turing was accepted (Sahih al-Bukhari; Seerah).',
          ur: 'ایک بار کچھ لوگوں نے کہا کہ ابوبکر نے بلال کو بہت کم قیمت پر خریدا، تو نبی کریم ﷺ نے انہیں درست سمجھایا: ‘اگر تم نے کم دیا ہے تو ہم اس کا بدلہ چکا دیں گے، اور اگر زیادہ دیا ہے تو ہم قبول کر لیں گے۔’ اور آپ ﷺ نے سب کو یقینی طور پر بتلایا کہ ابوبکر کی یہ ادائیگی قبول ہو گئی (صحیح بخاری؛ سیرت)۔',
        },
        {
          en: 'So freedom came twice for Bilal: first his body was freed, and then his voice was freed to praise. And freedom is a blessing we should always be thankful for, and use to worship Allah and help others.',
          ur: 'یوں بلال کے لیے آزادی دو بار آئی: پہلے ان کا جسم آزاد ہوا، پھر ان کی آواز کو تعریف کے لیے آزاد کر دیا گیا۔ اور آزادی ایک نعمت ہے جس پر ہمیں ہمیشہ شکر گزار ہونا چاہیے، اور اسے اللہ کی عبادت اور دوسروں کی مدد کے لیے کام میں لانا چاہیے۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari (Virtues of Abu Bakr / Bilal)', needsVerification: true, label: { en: 'Abu Bakr gives money to free Bilal and sets him free', ur: 'ابوبکر بلال کو آزاد کرنے کے لیے پیسے دیتے ہیں اور انہیں آزاد کر دیتے ہیں' } },
        { type: 'hadith', reference: 'Seerah (Ibn Hisham)', label: { en: 'The Seerah tells that Abu Bakr freed and cared for Bilal', ur: 'سیرت بتاتی ہے کہ ابوبکر نے بلال کو آزاد کیا اور ان کی دیکھ بھال کی' } },
      ],
    },
    {
      id: 'first-adhan',
      scene: 'mihrab',
      title: { en: 'The First Voice of the Adhan', ur: 'اذان کی پہلی آواز' },
      paragraphs: [
        {
          en: 'When the Muslims moved to Madeenah, the Prophet ﷺ wanted a special sign to call people to the prayer. One night, a friend of the Prophet saw the adhan in a dream — the beautiful words that call “Allah is Greatest, Allah is Greatest… Come to prayer!”',
          ur: 'جب مسلمان مدینہ آئے تو نبی کریم ﷺ لوگوں کو نماز کی طرف بلانے کے لیے کوئی خاص نشان چاہتے تھے۔ ایک رات نبی کریم ﷺ کے ایک ساتھی نے خواب میں اذان دیکھی — وہ خوبصورت الفاظ جو پکارتے ہیں: "اللہ سب سے بڑا ہے، اللہ سب سے بڑا ہے… نماز کی طرف آؤ!"',
        },
        {
          en: 'The Prophet ﷺ loved the idea, and told Bilal to rise and call the adhan with these words. So the first voice of the adhan ever heard in Islam belonged to Bilal, with his deep and sweet voice calling the city to the prayer.',
          ur: 'نبی کریم ﷺ کو یہ بات بہت بھائی، اور آپ ﷺ نے بلال سے کہا کہ وہ اٹھیں اور انہی الفاظ سے اذان دیں۔ تو اسلام میں سب سے پہلے سنی جانے والی اذان کی آواز بلال کی تھی، جن کی گہری اور میٹھی آواز نے شہر کو نماز کی طرف بلایا۔',
        },
        {
          en: 'The Prophet ﷺ said that the mu’adhins — the people who call the prayer — are the longest ones in the necks on the Day of Judgment, honored because their voices spent their whole lives calling people to Allah (Sahih Muslim).',
          ur: 'نبی کریم ﷺ نے فرمایا کہ اذان دینے والے — یعنی لوگوں کو نماز کی طرف بلانے والے — قیامت کے دن سب سے لمبی گردنوں والے ہوں گے، انہیں عزت دی جائے گی کیونکہ ان کی آوازوں نے ساری زندگی لوگوں کو اللہ کی طرف بلایا (صحیح مسلم)۔',
        },
        {
          en: 'Every time a child hears the adhan today, they are hearing the echo of Bilal’s voice through the world. The same turn to the prayer is the one he called with his honest heart in the very first years of Islam.',
          ur: 'آج جب بھی کوئی بچہ اذان سنتا ہے، وہ پوری دنیا میں بلال کی آواز کی گونج سن رہا ہوتا ہے۔ وہی نماز کی پکار جو انہوں نے اسلام کے ابتدائی ترین سالوں میں اپنے سچے دل سے دی تھی۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari; Sahih Muslim', needsVerification: true, label: { en: 'The Prophet ﷺ tells Bilal to call the adhan with the words of the dream', ur: 'نبی کریم ﷺ بلال سے کہتے ہیں کہ وہ خواب کے الفاظ کے ساتھ اذان دیں' } },
        { type: 'hadith', reference: 'Sahih Muslim (chapter on adhān)', needsVerification: true, label: { en: 'On the Day of Judgment, the mu’adhins are honored for their call to prayer', ur: 'قیامت کے دن اذان دینے والوں کو عزت دی جائے گی کیونکہ وہ لوگوں کو اللہ کی طرف بلاتے ہیں' } },
      ],
    },
    {
      id: 'voice-after-the-prophet',
      scene: 'palms',
      title: { en: 'The Voice Behind the Prophet', ur: 'نبی کریم ﷺ کے بعد کی آواز' },
      paragraphs: [
        {
          en: 'Bilal stayed close to the Prophet ﷺ every year of his life. When the Prophet called prayer, Bilal called, and when the Messenger traveled, Bilal went with him, and his famous shoe threw the sand of Madeenah, the Prophet ﷺ heard him in Paradise and smiled.',
          ur: 'بلال اپنی زندگی کے ہر سال نبی کریم ﷺ کے بالکل قریب رہے۔ جب نبی کریم ﷺ نماز کی طرف بلاتے تو بلال اذان دیتے، اور جب اللہ کے رسول سفر پر جاتے تو بلال ان کے ساتھ جاتے، اور ان کے مشہور قدموں نے مدینہ کی ریت اچھالی؛ نبی کریم ﷺ نے جنت میں ان کے قدموں کی آواز سنی اور مسکرائے۔',
        },
        {
          en: 'The Prophet ﷺ once told Bilal that he had heard the sound of his steps ahead of him in Paradise because of a beautiful prayer Bilal had learned. Being a companion so near the Prophet ﷺ was the biggest reward a human heart could hold.',
          ur: 'ایک بار نبی کریم ﷺ نے بلال سے فرمایا کہ انہوں نے جنت میں اپنے آگے بلال کے قدموں کی آواز سنی، یہ اُس خوبصورت نماز کی بدولت تھی جو بلال نے سیکھی تھی۔ نبی کریم ﷺ کے اتنے قریب صحابی ہونا کسی انسانی دل کے لیے سب سے بڑا اجر ہے۔',
        },
        {
          en: 'When the Prophet ﷺ passed away, Bilal’s voice became heavy. He asked the first caliph, Abu Bakr (RA), to let him stop calling the adhan in Madinah, because every call to prayer reminded him of the Messenger ﷺ he loved best of all.',
          ur: 'جب نبی کریم ﷺ کا وصال ہوا تو بلال کی آواز بھاری ہو گئی۔ انہوں نے پہلے خلیفہ ابوبکر رضی اللہ عنہ سے اجازت مانگی کہ وہ مدینہ میں اذان دینا چھوڑ دیں، کیونکہ ہر اذان انہیں اللہ کے رسول ﷺ کی یاد دلاتی جن سے وہ سب سے زیادہ محبت کرتے تھے۔',
        },
        {
          en: 'Today the name Bilal reminds Muslims of a believer who lost everything except Allah — and from that poverty Allah raised him to honor. He is a shining proof that Allah chooses His servants not by their worldly wealth, but by the purity of their hearts.',
          ur: 'آج بلال کا نام مسلمانوں کو ایک ایسے مومن کی یاد دلاتا ہے جس نے اللہ کے سوا سب کچھ کھو دیا — اور اُسی بے نیازی سے اللہ نے انہیں عزت کی بلندی تک پہنچایا۔ وہ ایک روشن ثبوت ہے کہ اللہ اپنے بندوں کو ان کے مالِ دنیا کے سبب نہیں، بلکہ ان کے دلوں کی پاکیزگی کے سبب چنتا ہے۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari 1002 (hadith of Paradise with Bilal)', needsVerification: true, label: { en: 'The Prophet ﷺ tells Bilal he hears his footsteps in Paradise', ur: 'نبی کریم ﷺ بلال سے کہتے ہیں کہ وہ جنت میں ان کے قدموں کی آواز سنتے ہیں' } },
        { type: 'hadith', reference: 'Seerah (Ibn Sa’d)', needsVerification: true, label: { en: 'After the Prophet ﷺ passes away, Bilal asks to stop the adhan in Madinah', ur: 'نبی کریم ﷺ کے انتقال کے بعد بلال مدینہ میں اذان دینا چھوڑنے کی اجازت مانگتے ہیں' } },
      ],
    },
  ],
};