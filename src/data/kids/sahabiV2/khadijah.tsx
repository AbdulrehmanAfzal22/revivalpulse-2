import type { KidsStoryV2 } from 'types/kidsStories.types';

/**
 * Khadijah bint Khuwaylid (RA) — the first wife of the Prophet ﷺ and the
 * first person to believe in his message (Phase 8 Batch 2).
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
 * named in the Urdu reading form (خدیجہ بنت خویلد رضی اللہ عنہا) rather than the
 * English spelling, because English words dropped inside an Urdu sentence
 * render as broken half-script text for the child reader.
 *
 * Review sign-off: single-reviewer (site owner). Sources get `reviewed: true`
 * + `reviewedBy`/`reviewedDate` in batches; confirm-read sign-off, not
 * scholarly/ijazah certification.
 */
export const SAHABI_KHADIJAH: KidsStoryV2 = {
  id: 'khadijah',
  type: 'sahabi',
  nameArabic: 'خديجة بنت خويلد',
  nameEnglish: 'Khadija bint Khuwaylid',
  illustrationSymbol: 'Gem',
  accentColor: '#d472a0',
  summary: {
    en: 'A wise and gentle merchant from Makkah who people called “the pure one.” She was the very first person to believe in the Prophet ﷺ, and her home was the soft, safe place where he found comfort when the world around him grew hard.',
    ur: 'خدیجہ بنت خویلد رضی اللہ عنہا مکہ کی ایک دانا اور نرم مزاج تاجر تھیں جنہیں لوگ “پاکیزہ” کہتے تھے۔ وہ نبی کریم ﷺ پر ایمان لانے والی پہلی شخصیت تھیں، اور ان کا گھر ایک نرم اور محفوظ جگہ تھی جہاں آپ ﷺ کو تسلی ملتی تھی جب ان کے ارد گرد کی دنیا سخت ہو جاتی تھی۔',
  },
  chapters: [
    {
      id: 'fair-merchant-of-makkah',
      scene: 'camel',
      title: { en: 'A Fair and Honest Merchant', ur: 'انصاف پسند اور دیانتدار تاجر' },
      paragraphs: [
        {
          en: 'Long before Islam, a girl named Khadijah grew up in Makkah. As she became an adult, she proved to be one of the wisest merchants in the whole city, sending her caravans to faraway lands loaded with fine goods.',
          ur: 'اسلام سے بہت پہلے کی بات ہے، مکہ میں خدیجہ نامی ایک بچی پلی بڑھی۔ جب وہ بڑی ہوئیں تو پورے شہر کی دانامند ترین تاجروں میں سے ایک بن گئیں، اور دور دراز ملکوں میں قیمتی سامان سے بھرے اپنے قافلے بھیجتی تھیں۔',
        },
        {
          en: 'She was so honest and pure in her dealings that people called her at-Tahira, “the pure one.” Even though she was very wealthy, she never cheated a single customer and she always treated her helpers with kindness.',
          ur: 'ان کے کاروبار میں دیانت اور پاکیزگی دیکھ کر لوگ انہیں طاہرہ کہتے، یعنی “پاکیزہ”۔ بہت دولت مند ہوتے ہوئے بھی انہوں نے کبھی ایک گاہک کے ساتھ بھی دھوکہ نہیں کیا اور اپنے کام کرنے والوں کے ساتھ ہمیشہ نیکی سے پیش آئیں۔',
        },
        {
          en: 'When she needed a trustworthy man to lead one of her great trading journeys, everyone told her the same name: Muhammad ﷺ, the man the whole city called al-Ameen, “the trustworthy one.”',
          ur: 'جب انہیں اپنے بڑے تجارتی سفر میں سے ایک سفر کے لیے بھروسے کے قابل آدمی چاہیے، تو سب نے ایک ہی نام بتایا: محمد ﷺ — وہ شخص جسے پورا شہر امین کہتا تھا، یعنی “بھروسے کے قابل”۔',
        },
        {
          en: 'Muhammad ﷺ led the journey with perfect honesty, and it returned with good profit. But the true treasure was something else: Khadijah saw his beautiful character with her own eyes, and her respect and love for him grew very deep.',
          ur: 'محمد ﷺ نے یہ سفر پوری دیانتداری سے طے کیا اور قافلہ اچھے منافع کے ساتھ واپس آیا۔ مگر اصل خزانہ کچھ اور تھا: خدیجہ نے محمد ﷺ کا حسین کردار اپنی آنکھوں سے دیکھا اور ان کے دل میں ان کا احترام اور محبت بہت گہری ہو گئی۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Seerah (Ibn Hisham)', label: { en: 'Khadijah sends Muhammad ﷺ to lead her caravan and sees his honesty', ur: 'خدیجہ محمد ﷺ کو اپنا قافلہ لے جانے کے لیے بھیجتی ہیں اور ان کی دیانتداری دیکھتی ہیں' } },
        { type: 'hadith', reference: 'Seerah (Ibn Kathir, Al-Bidayah wan-Nihayah)', label: { en: 'Khadijah is known as the pure and fair merchant of Makkah', ur: 'خدیجہ مکہ کی پاک اور دیانتدار تاجر کے طور پر مشہور تھیں' } },
      ],
    },
    {
      id: 'the-first-to-believe',
      scene: 'crescent',
      title: { en: 'The First to Believe', ur: 'ایمان لانے والی سب سے پہلی شخصیت' },
      paragraphs: [
        {
          en: 'One day the Prophet ﷺ returned home carrying news that would change the world: Allah had made him the Messenger for all of mankind. His dearest wife Khadijah sat beside him, and his heart needed someone to hold the secret.',
          ur: 'ایک دن نبی کریم ﷺ گھر لوٹے اور ساتھ ایسی خبر لائی جو دنیا کو بدل دے گی: اللہ نے انہیں تمام انسانوں کا رسول بنایا تھا۔ ان کی سب سے پیاری بیوی خدیجہ ان کے پاس بیٹھی تھیں، اور ان کے دل کو کسی ایسے کی ضرورت تھی جو یہ راز سنبھالے۔',
        },
        {
          en: 'Khadijah listened, and she did not hesitate for a single moment. She was the very first person in the entire world to accept Islam — before Abu Bakr, before Ali, before anyone. She said: “I bear witness that you are the Messenger of Allah.”',
          ur: 'خدیجہ نے سنا اور ایک لمحے کے لیے بھی تردد نہیں کیا۔ وہ پوری دنیا میں اسلام قبول کرنے والی پہلی شخصیت تھیں — ابوبکر سے پہلے، علی سے پہلے، سب سے پہلے۔ انہوں نے کہا: “میں گواہی دیتی ہوں کہ آپ اللہ کے رسول ہیں۔”',
        },
        {
          en: 'She did not need fireworks or miracles to believe. She had lived with this man for many years, and she knew with certainty that he had never told a lie in his whole life. So when he spoke the truth, her whole heart trusted him.',
          ur: 'ایمان لانے کے لیے انہیں کسی زوردار نشان یا معجزے کی ضرورت نہیں تھی۔ وہ برسوں تک اس شخص کے ساتھ زندگی گزار چکی تھیں اور پورے یقین سے جانتی تھیں کہ اس نے عمر بھر کبھی جھوٹ نہیں بولا۔ چناچہ جب وہ سچ بولتے تو ان کا پورا دل ان پر بھروسا کرتا۔',
        },
        {
          en: 'Her quick belief was a great blessing to the Prophet ﷺ. When the city of Makkah was difficult and most people refused him, the one part of the world where he always felt believed and loved was the home of Khadijah.',
          ur: 'ان کا اتنی جلدی ایمان لے آنا نبی کریم ﷺ کے لیے بڑی نعمت تھا۔ جب مکہ کا شہر سخت ہو گیا اور بیشتر لوگوں نے انکار کر دیا، تو دنیا میں ایک ہی جگہ ایسی تھی جہاں آپ ﷺ ہمیشہ خود کو مانا ہوا اور پیارا محسوس کرتے تھے، اور وہ خدیجہ کا گھر تھی۔',
        },
        {
          en: 'The very first “yes” in the story of Islam did not come from a grand hall or a mighty king. It came quietly from the gentle heart of a wife, inside a small home — and that first yes carried the whole religion on its back.',
          ur: 'اسلام کی داستان میں پہلا “ہاں” کسی شاندار دربار یا کسی زورآور بادشاہ کی طرف سے نہیں آیا۔ یہ خاموشی سے ایک بیوی کے نرم دل سے آیا، ایک چھوٹے سے گھر میں — اور وہی پہلا ہاں پورے دین کو اپنی پیٹھ پر اٹھائے ہوئے تھا۔',
        },
      ],
      sources: [
        {
          type: 'hadith',
          reference: 'Sahih al-Bukhari; Sahih Muslim (Khadijah was the first to believe)',
          needsVerification: true,
          label: { en: 'Khadijah is the very first person to accept and believe in Islam', ur: 'خدیجہ وہ پہلی شخصیت ہیں جنہوں نے اسلام قبول کیا اور ایمان لائیں' },
        },
        { type: 'hadith', reference: 'Seerah (Ibn Kathir, Al-Bidayah wan-Nihayah)', label: { en: 'Khadijah trusted the Prophet ﷺ with her entire heart and soul', ur: 'خدیجہ نے پورے دل و جان سے نبی کریم ﷺ پر بھروسہ کیا' } },
      ],
    },
    {
      id: 'warmth-in-the-dark-room',
      scene: 'tent',
      title: { en: 'Warmth in a Dark Hour', ur: 'اندھیری گھڑی میں گرمجوشی' },
      paragraphs: [
        {
          en: 'At the very beginning of revelation, the Prophet ﷺ came down from the mountain cave trembling, carrying a beautiful but enormous weight. He hurried into his home saying: “Cover me! Cover me!” and Khadijah wrapped him in a blanket.',
          ur: 'وحی کے بالکل ابتدائی دنوں میں نبی کریم ﷺ پہاڑ کی غار سے کانپتے ہوئے اترے، ساتھ ایک حسین مگر بہت بڑا بوجھ تھا۔ آپ ﷺ جلدی سے گھر داخل ہوئے اور فرمایا: “مجھے اوڑھ لو! مجھے اوڑھ لو!” اور خدیجہ نے انہیں کمبل میں لپیٹ لیا۔',
        },
        {
          en: 'Then Khadijah spoke the most comforting words found anywhere in the stories of Makkah: “By Allah, He will never put you to shame. You keep your family ties, you carry the burden of others, you help the poor, and you give to the needy.”',
          ur: 'پھر خدیجہ نے مکہ کی داستانوں میں آنے والے سب سے زیادہ اطمینان دینے والے الفاظ کہے: “اللہ کی قسم! وہ آپ کو کبھی رسوا نہیں کریگا۔ آپ اپنی قرابت کا تعلق نبھاتے ہیں، دوسروں کے بوجھ اٹھاتے ہیں، مسکینوں کی مدد کرتے ہیں اور محتاجوں کو دیتے ہیں۔”',
        },
        {
          en: 'She confirmed his heart and then took him to her wise and elderly relative, a man who knew the old scriptures. He said to both of them: the same angel that came to Moses has now come to him, and he is the prophet of this people.',
          ur: 'انہوں نے آپ ﷺ کا دل مضبوط کیا اور پھر انہیں اپنے ایک دانا اور بوڑھے رشتہ دار کے پاس لے گئیں، جو پرانی آسمانی کتابوں کو جانتا تھا۔ اس رشتہ دار نے دونوں سے کہا: وہی فرشتہ جو موسیٰ پر نازل ہوا تھا، اب اس پر نازل ہوا ہے، اور وہ اس قوم کے نبی ہیں۔',
        },
        {
          en: 'From that night on, the Prophet ﷺ knew that he was not alone on this new road. The revelation fell onto his heart like heavy rain — but Khadijah was the kind roof that kept him warm and safe.',
          ur: 'اس رات کے بعد سے نبی کریم ﷺ جانتے تھے کہ وہ اس نئے راستے پر اکیلے نہیں ہیں۔ وحی ان کے دل پر بھاری بارش کی طرح ٹوٹتی تھی — مگر خدیجہ ایسی نرم چھت تھیں جس نے انہیں گرم اور محفوظ رکھا۔',
        },
        {
          en: 'Every child who loves the story of the first revelation should also learn this beautiful part: when the mountain shook and the darkness closed, the Prophet ﷺ found his light in the comfort of Khadijah’s kind words.',
          ur: 'ہر وہ بچہ جو پہلی وحی کا قصہ پسند کرتا ہے، اسے یہ خوبصورت حصہ بھی جاننا چاہیے: جب پہاڑ کانپا اور اندھیرا چھا گیا، تو نبی کریم ﷺ نے خدیجہ کی نرم باتوں کی تسلی میں روشنی پائی۔',
        },
      ],
      sources: [
        {
          type: 'hadith',
          reference: 'Sahih al-Bukhari; Sahih Muslim (the beginning of revelation; Khadijah comforting the Prophet ﷺ)',
          label: { en: 'Khadijah comforts the Prophet ﷺ in the first scary moment of revelation', ur: 'خدیجہ وحی کے پہلے ڈراؤنے لمحے میں نبی کریم ﷺ کو تسلی دیتی ہیں' },
        },
      ],
    },
    {
      id: 'the-year-of-sorrow',
      scene: 'palms',
      title: { en: 'The Year of Sorrow', ur: 'غم کا سال' },
      paragraphs: [
        {
          en: 'For many years the Prophet ﷺ and his family carried their faith under hard trials in the city of Makkah. The enemies treated his people harshly, and the one big protector, his kind uncle Abu Talib, passed away after many years of watching over him.',
          ur: 'برسوں تک نبی کریم ﷺ اور ان کے گھر والوں نے مکہ میں سخت آزمائشوں میں اپنا ایمان سنبھالے رکھا۔ دشمن ان کے لوگوں سے سختی کرتے تھے، اور جو ایک بڑے سرپرست تھے — ان کے نرم دل چچا ابو طالب — برسوں تک ان کی نگہبانی کرنے کے بعد وفات پا گئے۔',
        },
        {
          en: 'Then, very soon after, Khadijah’s gentle body became weak, and she returned to Allah. In one short stretch of time, the Prophet ﷺ had lost the two people who had protected and comforted him his whole life — and the people called it the “Year of Sorrow.”',
          ur: 'پھر اس کے تھوڑے ہی عرصے بعد خدیجہ کا نرم جسم کمزور پڑا اور وہ اللہ کی طرف لوٹ گئیں۔ ایک ہی مختصر سی مدت میں نبی کریم ﷺ نے ان دونوں کو کھو دیا جنہوں نے ساری عمر ان کی حفاظت اور تسلی کی تھی — اور لوگوں نے اسے “غم کا سال” کہا۔',
        },
        {
          en: 'The believers recalled that the Prophet ﷺ missed Khadijah with such a deep and long love that even years later, when her old friends came to visit, tears of memory would gather right at the edge of his eyes.',
          ur: 'مومنوں کو یاد تھا کہ نبی کریم ﷺ خدیجہ کو بڑی گہری اور دیرپا محبت سے یاد کرتے تھے، یہاں تک کہ برسوں بعد بھی جب خدیجہ کی پرانی سہیلیں آتیں، یاد کے آنسو آپ ﷺ کی آنکھوں کے بالکل کنارے جمع ہو جاتے تھے۔',
        },
        {
          en: 'That hardest of years taught the believers about patience. From the Prophet ﷺ they learned that even a heart filled with grief never stops trusting Allah and never stops serving the mission, and that the year of the hardest seasons still only passes in a moment.',
          ur: 'اس مشکل ترین سال نے مومنوں کو صبر سکھایا۔ انہوں نے نبی کریم ﷺ سے سیکھا کہ غم سے بھرا ہوا دل بھی اللہ پر بھروسا نہیں چھوٹا اور دین کے کام سے نہیں رکتا، اور کہ سخت ترین موسم بھی بس ایک پل میں گزر جاتے ہیں۔',
        },
        {
          en: 'We honor Khadijah every time we retell the early beauty of Islam. Her years helped the Prophet ﷺ stand, and her passing taught the whole world that great love does not end — it only changes where it rests.',
          ur: 'ہم جب بھی اسلام کے ابتدائی حسن کی بات دہراتے ہیں، خدیجہ کا ذکر عزت سے کرتے ہیں۔ ان کے برسوں نے نبی کریم ﷺ کو سہارا دیا، اور ان کا جانا پوری دنیا کو یہ بات سکھا گیا کہ بڑی محبت ختم نہیں ہوتی — بس جہاں ٹھہرتی ہے وہ جگہ بدل جاتی ہے۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Seerah (Ibn Kathir, Al-Bidayah wan-Nihayah)', label: { en: 'In the Year of Sorrow, the Prophet ﷺ loses his uncle and his wife', ur: 'غم کے سال میں نبی کریم ﷺ اپنے چچا اور اپنی بیوی دونوں سے محروم ہو جاتے ہیں' } },
        {
          type: 'hadith',
          reference: 'Sahih al-Bukhari; Sahih Muslim (the death of Khadijah, the Year of Sorrow)',
          needsVerification: true,
          label: { en: 'Khadijah passes away in the sad, hard year called the Year of Sorrow', ur: 'خدیجہ اس اداس اور مشکل سال میں وفات پاتی ہیں جسے غم کا سال کہا گیا' },
        },
      ],
    },
    {
      id: 'he-never-stopped-loving-her',
      scene: 'mihrab',
      title: { en: 'He Never Stopped Loving Her', ur: 'نبی کریم ﷺ کی ان سے محبت کبھی کم نہ ہوئی' },
      paragraphs: [
        {
          en: 'Long after Khadijah passed away, the Prophet ﷺ married again, and one of his wives, Aisha, shared a famous honest secret: even though she had never met her, she felt the loving shadow of Khadijah in their home.',
          ur: 'خدیجہ کے وصال کے بہت عرصے بعد نبی کریم ﷺ نے دوبارہ شادی کی، اور ان کی بیویوں میں سے ایک عائشہ نے ایک مشہور سچا راز بتایا: اگرچہ وہ کبھی خدیجہ سے ملی ہی نہیں تھیں، مگر انہیں اپنے گھر میں خدیجہ کی محبت کا سایہ محسوس ہوتا تھا۔',
        },
        {
          en: 'Whenever the Prophet ﷺ cooked a sheep or received a gift, he sent part of it to her families and old friends — quietly, no fanfare — so that the memory of his first wife would never grow thirsty in the world.',
          ur: 'جب بھی نبی کریم ﷺ کے ہاں بکری پکائی جاتی یا کوئی تحفہ آتا، تو آپ ﷺ اس کا کچھ حصہ ان کے رشتہ داروں اور پرانے دوستوں کو بھیج دیتے — چپکے سے، دکھادے کے بغیر — تاکہ دنیا میں ان کی پہلی بیوی کی یاد کبھی پیاسی نہ رہے۔',
        },
        {
          en: 'One day he mentioned her to Aisha, and Aisha, in her loving teasing, said she wished she could be like her. The Prophet ﷺ did not scold her; he just nodded, and reminded them both that the treasure he treasured most in marriage was the love of a true and gentle heart.',
          ur: 'ایک دن آپ ﷺ نے عائشہ کے سامنے خدیجہ کا ذکر کیا، اور عائشہ نے اپنی پیاری سی چھیڑ میں کہا کہ کاش وہ ایسی ہی ہوتیں۔ نبی کریم ﷺ نے انہیں ڈانٹا نہیں؛ بس اقرار میں سر ہلایا، اور دونوں کو یاد دلایا کہ شادی میں آپ ﷺ کے نزدیک سب سے قیمتی خزانہ ایک سچے اور نرم دل کی محبت تھی۔',
        },
        {
          en: 'Because of this, the whole world remembers him as a faithful husband. He remembered Khadijah’s kindness after she was gone, and did not let it grow cold — he kept sharing that kindness with her friends and family.',
          ur: 'اسی لیے پوری دنیا آپ ﷺ کو وفادار شوہر کے طور پر یاد رکھتی ہے۔ خدیجہ کے وصال کے بعد بھی نبی کریم ﷺ نے ان کی نیکی کو ٹھنڈا ہونے نہیں دیا — بلکہ وہ نیکی ان کے دوستوں اور خاندان تک پہنچاتے رہے۔',
        },
        {
          en: 'Kindness that we remember and share, as the Prophet ﷺ shared Khadijah’s, is the kind of love that never grows tired. We can honor this precious mother of the believers by being soft, honest, and generous — just as she was.',
          ur: 'جو مہربانی ہم یاد رکھیں اور بانٹیں — جیسے نبی کریم ﷺ نے خدیجہ کی مہربانی بانٹی — وہ ایسی محبت ہے جو کبھی تکتی نہیں۔ ہم مومنوں کی اس پیاری ماں کی عزت اس طرح کر سکتے ہیں کہ نرم، سچے اور فیاض بنیں — بالکل جیسا کہ وہ تھیں۔',
        },
      ],
      sources: [
        {
          type: 'hadith',
          reference: 'Sahih al-Bukhari; Sahih Muslim (the Prophet ﷺ remembers Khadijah after her death)',
          needsVerification: true,
          label: { en: 'The Prophet ﷺ still remembers and honors Khadijah many years later', ur: 'نبی کریم ﷺ کئی سال بعد بھی خدیجہ کو یاد کرتے ہیں اور ان کی عزت کرتے ہیں' },
        },
        {
          type: 'hadith',
          reference: 'Seerah (Ibn Kathir, Al-Bidayah wan-Nihayah)',
          label: { en: 'The Prophet ﷺ sends gifts to Khadijah’s friends and family, with love', ur: 'نبی کریم ﷺ محبت کے ساتھ خدیجہ کی سہیلیوں اور خاندان کو تحفے بھیجتے ہیں' },
        },
      ],
    },
  ],
};