import type { KidsStoryV2 } from 'types/kidsStories.types';

/**
 * Khalid ibn al-Walid (RA) — "Sayf Allah", the Sword of Allah, one of the
 * greatest commanders of Islam (Phase 8 Batch 1).
 *
 * Citation discipline for Sahabah content: Hadith/Seerah sourced ONLY.
 * References that could not be confidently pinned to a specific authentic
 * narration while writing are marked `needsVerification: true`.
 *
 * `ur` here is a faithful rendering of the English on this page — no event,
 * title or ruling is added that the English does not carry. The subject is
 * named in the Urdu reading form (خالد بن الولید رضی اللہ عنہ) rather than the
 * English spelling, because English words dropped inside an Urdu sentence
 * render as broken half-script text for the child reader.
 *
 * Review sign-off: single-reviewer (site owner). Sources get `reviewed: true`
 * + `reviewedBy`/`reviewedDate` in batches; confirm-read sign-off, not
 * scholarly/ijazah certification.
 */
export const SAHABI_KHALID: KidsStoryV2 = {
  id: 'khalid',
  type: 'sahabi',
  nameArabic: 'خالد بن الوليد',
  nameEnglish: 'Khalid ibn al-Walid',
  illustrationSymbol: 'Shield',
  accentColor: '#5b7583',
  summary: {
    en: 'A famous warrior who first fought against the Muslims — and then, when Allah opened his heart, became a champion of Islam. The Prophet ﷺ honored him with the title "the Sword of Allah." Khalid shows us that it is never too late to leave the wrong path and embrace the truth.',
    ur: 'ایک مشہور جنگجو جنہوں نے اول مسلمانوں کے خلاف لڑائی کی — پھر جب اللہ نے ان کا دل کھول دیا تو اسلام کے حامی بن گئے۔ نبی کریم ﷺ نے انہیں “اللہ کی تلوار” کے لقب سے نوازا۔ خالد ہمیں سکھاتے ہیں کہ بری راہ چھوڑ کر سچ اپنانے کے لیے کبھی دیر نہیں ہوتی۔',
  },
  chapters: [
    {
      id: 'great-warrior',
      title: { en: 'A Warrior Before Islam', ur: 'اسلام سے پہلے کے جنگجو' },
      paragraphs: [
        {
          en: 'Khalid was a brave and clever man from Makkah. Even before Islam he was famous for his courage and his skill in battle. At the battle of Uhud, he commanded the cavalry that passed beside the Muslims, and for a while his boldness shook the believers.',
          ur: 'خالد مکہ کے ایک بہادر اور چالاک آدمی تھے۔ اسلام سے پہلے بھی وہ اپنی ہمت اور جنگ میں اپنی مہارت کی وجہ سے مشہور تھے۔ جنگ احد میں انہوں نے اُن گھڑ سواروں کی سرداری کی جو مسلمانوں کے پہلو سے گزرے، اور کچھ دیر کے لیے ان کی دلیری نے مومنوں کو ہلا کر رکھ دیا۔',
        },
        {
          en: 'But in the middle of the battlefield, Khalid also noticed something strange and beautiful. Even when the Muslims began to stumble, they did not run or break. They gathered around their Prophet ﷺ and around the truth, and that silent strength stayed in Khalid’s mind for a long time.',
          ur: 'لیکن میدانِ جنگ کے بیچ خالد نے ایک عجیب اور خوبصورت بات بھی دیکھی۔ جب مسلمان لڑھکنے لگے تو بھی وہ نہ بھاگے اور نہ بکھرے۔ وہ اپنے نبی کریم ﷺ اور اپنے سچ کے گرد جمع ہو گئے، اور وہ خاموش طاقت خالد کے ذہن میں دیر تک بری رہی۔',
        },
        {
          en: 'Years later, when the two armies met again at the trench, the same feeling came back to him. The truth did not win with endless weapons; it won because it was truly the truth, and Khalid’s own heart began to lean toward it more and more.',
          ur: 'کئی سال بعد جب خندق والی لڑائی میں دونوں لشکر پھر آمنے سامنے ہوئے تو اُنہیں ویسا ہی احساس دوبارہ ہوا۔ سچ ہتھیاروں کی کثرت سے نہ جیتا؛ یہ اس لیے جیتا کیونکہ یہ سچ میں ہی سچ تھا، اور خالد کا اپنا دل اِس کی طرف زیادہ سے زیادہ مڑنے لگا۔',
        },
        {
          en: 'We can learn from Khalid that a person’s past is not his future. Where a soul was headed yesterday does not decide today. The heart can be turned around, and Khalid’s chapter shows us exactly that in a way almost no other story does.',
          ur: 'خالد سے ہم یہ سیکھ سکتے ہیں کہ کسی کا ماضی اُس کا مستقبل نہیں ہوتا۔ کل کوئی کہاں جا رہا تھا، یہ آج کا فیصلہ نہیں کرتا۔ دل کو پلٹا جا سکتا ہے، اور خالد کا یہ باب بالکل یہی بات اِس انداز میں ہمیں دکھاتا ہے جیسا لگ بھگ کوئی اور کہانی نہیں دکھاتی۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Seerah (Ibn Hisham) — Khalid before Islam', label: { en: 'Khalid commands the horsemen against the Muslims at the battle of Uhud', ur: 'خالد جنگ احد میں مسلمانوں کے خلاف گھڑ سواروں کی قیادت کرتے ہیں' } },
      ],
    },
    {
      id: 'the-day-he-came',
      title: { en: 'The Day He Came to the Prophet', ur: 'وہ دن جب وہ نبی کریم ﷺ کے پاس آئے' },
      paragraphs: [
        {
          en: 'In the year of the treaty, the peace of the Treaty of Hudaybiyyah, Khalid felt his heart ready. He rode to the Prophet ﷺ together with his brother, and both of them were welcomed warmly into Islam.',
          ur: 'صلح والے سال، یعنی صلح حدیبیہ کے امن کے وقت، خالد نے اپنا دل تیار پایا۔ وہ اپنے بھائی کے ساتھ نبی کریم ﷺ کی طرف روانہ ہوئے، اور دونوں کو خوشی خوشی اسلام میں داخل ہونے دیا گیا۔',
        },
        {
          en: 'The Prophet ﷺ received him with a smile and a free heart. The same hands that had held a sword against the believers became hands raised in prayer, and the same courage turned to the side of the faith.',
          ur: 'نبی کریم ﷺ نے انہیں مسکرا کر اور کشادہ دل سے خوش آمدید کہا۔ وہی ہاتھ جو مومنوں کے خلاف تلوار تھامے ہوئے تھے، نماز میں اُٹھے ہوئے ہاتھ بن گئے، اور وہی ہمت ایمان کی طرف مڑ گئی۔',
        },
        {
          en: 'From that day, Khalid used his talent — the same talent he had used on a bad side — now completely for the good. When Allah turns a heart, He does not discard its gifts; He aims the same gifts at the right targets.',
          ur: 'اُس دن سے خالد نے اپنی صلاحیت — وہی صلاحیت جو انہوں نے بری طرف لگائی تھی — اب پوری طرح نیکی کے کام لائی۔ جب اللہ کسی دل کو موڑتا ہے تو اُس کی صلاحیتوں کو ضائع نہیں کرتا؛ وہی صلاحیتیں صحیح نشانوں پر لگا دیتا ہے۔',
        },
        {
          en: 'It was the most important victory in Khalid’s whole life, and it was not won on any battlefield. It was won quietly, inside his chest, the day he said yes to the truth.',
          ur: 'یہ خالد کی پوری زندگی کی سب سے اہم فتح تھی، اور یہ کسی میدانِ جنگ میں نہیں جیتی گئی۔ یہ خاموشی سے، اُن کے سینے کے اندر جیتی گئی، اُس دن جب انہوں نے سچ کو ہاں کہہ دیا۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Seerah (Ibn Hisham) — Khalid accepting Islam', label: { en: 'After the treaty, Khalid rides to the Prophet ﷺ and accepts Islam', ur: 'صلح کے بعد خالد نبی کریم ﷺ کے پاس آتے ہیں اور اسلام قبول کرتے ہیں' } },
        { type: 'hadith', reference: 'Sahih al-Bukhari', needsVerification: true, label: { en: 'The Prophet ﷺ warmly welcomes Khalid into Islam', ur: 'نبی کریم ﷺ خالد کو محبت سے اسلام میں خوش آمدید کہتے ہیں' } },
      ],
    },
    {
      id: 'sword-of-allah',
      title: { en: 'The Sword of Allah', ur: 'اللہ کی تلوار' },
      paragraphs: [
        {
          en: 'Khalid soon became one of the bravest soldiers of the Prophet ﷺ. At the battle of Mutah, when the first great commanders of the Muslims fell one after another, Khalid stepped up and took the banner, keeping the Muslim army true night of those days.',
          ur: 'خالد جلد ہی نبی کریم ﷺ کے سب سے بہادر سپاہیوں میں سے ایک بن گئے۔ جنگ موثہ میں جب مسلمانوں کے پہلے بڑے سردار ایک کے بعد ایک گر گئے، تو خالد آگے بڑھے اور جھنڈا تھام لیا، اور اُن دنوں کی رات میں مسلمانوں کے لشکر کو قائم رکھا۔',
        },
        {
          en: 'The Prophet ﷺ was overjoyed and thanks a praiseworthy name for him: Khalid is the Sword of Allah against the enemies. The whole world of Islam would remember his name forever as "Sayf Allah," the Sword of Allah.',
          ur: 'نبی کریم ﷺ بے حد خوش ہوئے اور خالد کے لیے ستائش کے لائق نام رکھا: خالد اللہ کی تلوار ہیں، دشمنوں کے مقابلے میں۔ اسلام کی پوری دنیا اُن کا نام ہمیشہ کے لیے سیف اللہ، یعنی اللہ کی تلوار، کے طور پر یاد رکھے گی۔',
        },
        {
          en: 'A sword is not always a symbol of breaking. Khalid used his courage to protect the people, guard the faith, and face those who wanted to harm the believers. That is the story of a hero — strength turned into mercy and safety.',
          ur: 'تلوار ہمیشہ توڑ پھوڑ کی علامت نہیں ہوتی۔ خالد نے اپنی ہمت لوگوں کی حفاظت، دین کی نگہبانی، اور اُن لوگوں کا مقابلہ کرنے کے لیے کام لائی جو مومنوں کو نقصان پہنچانا چاہتے تھے۔ یہی ایک بہادر کی کہانی ہے — وہ طاقت جو رحم اور تحفظ میں بدل گئی۔',
        },
        {
          en: 'Every child has some own skill — a strong arm, a loud patient, a quick mind. What Khalid’s life says is: place your skill into Allah’s hands, and it will be shaped into something that protects and heals and helps the whole world.',
          ur: 'ہر بچے کے پاس کوئی نہ کوئی صلاحیت ہوتی ہے — مضبوط بازو، بلند آواز، صبر، تیز ذہن۔ خالد کی زندگی کہتی ہے کہ اپنی صلاحیت اللہ کے ہاتھ میں دے دو، اور وہ اِسے ایسی چیز میں بدل دے گا جو پوری دنیا کی حفاظت کرے، اُسے شفا دے، اور اُس کے کام آئے۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari (chapter of Mutah)', needsVerification: true, label: { en: 'Khalid takes the flag at Mutah when the three commanders fall', ur: 'خالد جنگ موتہ میں جھنڈا سنبھالتے ہیں جب تین کمانڈر شہید ہو جاتے ہیں' } },
        { type: 'hadith', reference: 'Sahih Muslim', needsVerification: true, label: { en: 'The Prophet ﷺ calls Khalid the Sword of Allah', ur: 'نبی کریم ﷺ خالد کو اللہ کی تلوار کہتے ہیں' } },
        { type: 'hadith', reference: 'Seerah (Ibn Hisham)', label: { en: 'The Seerah tells how Khalid was praised as Sayf Allah, the Sword of Allah', ur: 'سیرت بتاتی ہے کہ خالد کو سیف اللہ یعنی اللہ کی تلوار کے طور پر کیسے سراہا گیا' } },
      ],
    },
    {
      id: 'second-service',
      title: { en: 'Serving Faith with a Second Courage', ur: 'دوسری ہمت سے دین کی خدمت' },
      paragraphs: [
        {
          en: 'After the Prophet ﷺ passed away, Khalid kept serving the community under the first caliph, Abu Bakr (RA). He led the Muslim armies through the dark days when several tribes tried to end their faith once more — pushing the confusion away with his courage.',
          ur: 'نبی کریم ﷺ کے وصال کے بعد خالد نے پہلے خلیفہ ابوبکر رضی اللہ عنہ کے دور میں امت کی خدمت جاری رکھی۔ انہوں نے اُن اَندھیرے دنوں میں مسلمانوں کے لشکروں کی قیادت کی جب کئی قبیلوں نے ایک بار پھر اپنا دین ختم کرنے کی کوشش کی — اور انہوں نے اپنی ہمت سے اِس گڑبڑ کو دور کر دیا۔',
        },
        {
          en: 'He commanded the armies of the believers in the wars of apostasy, and then the victories in Syria and beyond. Little by little, through his plan and bravery, great lands came together under justice and the fear/prayer of Allah.',
          ur: 'انہوں نے جنگِ ارتداد میں مومنوں کے لشکروں کی سرداری کی، اور پھر شام اور اِس سے آگے کی فتوحات حاصل کیں۔ آہستہ آہستہ، اُن کے منصوبے اور بہادری سے بڑے بڑے علاقے انصاف اور اللہ کے خوف کے سائے میں جمع ہو گئے۔',
        },
        {
          en: 'For all his strength, Khalid was a man who the heart. In his last days he asked Allah for a death of a hero, and his old friends remember how he cared his treasures away, avoiding the wealth and the vanity like a saadiq.',
          ur: 'اپنی پوری طاقت کے باوجود خالد دل کے انسان تھے۔ آخری ایام میں اُنہوں نے اللہ سے بہادر کی سی موت مانگی، اور اُن کے پرانے دوست یاد رکھتے ہیں کہ اُنہوں نے اپنا خزانہ کیسے پیچھے چھوڑ دیا، اور ایک صدیق کی طرح دولت اور دکھاوے سے بچتے رہے۔',
        },
        {
          en: 'Khalid finished as he had lived — strong, humble, and true. The sword of Allah was finally resting in the hand of the One who manages every soldier and every heart.',
          ur: 'خالد نے ویسے ہی اختتام کیا جیسے جئے — مضبوط، عاجز، اور سچے۔ اللہ کی تلوار بالآخر اُس ہاتھ میں آرام کر رہی تھی جو ہر سپاہی اور ہر دل کو سنبھالے ہوئے ہے۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Tarikh (At-Tabari) — the dirwins of the Ridda and of Syria', needsVerification: true, label: { en: 'Khalid leads the armies of the Ridda wars and the conquests of Syria', ur: 'خالد جنگِ ارتداد اور شام کی فتوحات میں لشکروں کی قیادت کرتے ہیں' } },
        { type: 'hadith', reference: 'Seerah (Ibn Sa’d)', needsVerification: true, label: { en: 'In his last days, Khalid pleads for a death like a hero and refuses vanity', ur: 'آخری ایام میں خالد بہادر کی موت کی دعا کرتے ہیں اور دنیا کی چمک دور کرتے ہیں' } },
      ],
    },
  ],
};