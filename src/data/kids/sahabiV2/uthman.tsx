import type { KidsStoryV2 } from 'types/kidsStories.types';

/**
 * Uthman ibn Affan (RA) — "Dhun-Nurayn," the Possessor of the Two Lights; the
 * Third Caliph who gathered the Qur’an into one standard Book (Phase 8 Batch 1).
 *
 * Citation discipline for Sahabah content: Hadith/Seerah sourced ONLY. Where
 * a specific authentic narration could not be verified with certainty while
 * writing, the reference is marked `needsVerification: true` rather than
 * guessing a hadith number.
 *
 * `ur` here is a faithful rendering of the English on this page — no event,
 * title or ruling is added that the English does not carry. The subject is
 * named in the Urdu reading form (عثمان بن عفان رضی اللہ عنہ) rather than the
 * English spelling, because English words dropped inside an Urdu sentence
 * render as broken half-script text for the child reader.
 *
 * Review sign-off: single-reviewer (site owner). Sources get `reviewed: true`
 * + `reviewedBy`/`reviewedDate` in batches; confirm-read sign-off, not
 * scholarly/ijazah certification.
 */
export const SAHABI_UTHMAN: KidsStoryV2 = {
  id: 'uthman',
  type: 'sahabi',
  nameArabic: 'عثمان بن عفان',
  nameEnglish: 'Uthman ibn Affan',
  illustrationSymbol: 'BookOpen',
  accentColor: '#b08d3f',
  summary: {
    en: 'Uthman ibn Affan was a gentle, shy, and wonderfully generous companion of the Prophet ﷺ. He bought the sweet Well of Rumah so the whole city of Madinah could drink freely, and he spent his wealth to support the believers in their hardest days. As the third caliph, he gathered the words of the Qur’an into one standard Book that Muslims all over the world still read together today.',
    ur: 'عثمان بن عفان رضی اللہ عنہ نبی کریم ﷺ کے نرم مزاج، شرمیلے اور بے حد فیاض صحابی تھے۔ انہوں نے میٹھے پانی کا کنواں رومہ خرید کر پورے مدینہ کے لوگوں کے لیے مفت کر دیا، اور مومنوں کے سخت ترین دنوں میں ان کی حمایت پر اپنا مال خرچ کیا۔ تیسرے خلیفہ کے طور پر انہوں نے قرآن کے الفاظ کو ایک معیاری مصحف میں جمع کیا، جو آج بھی پوری دنیا کے مسلمان مل جل کر پڑھتے ہیں۔',
  },
  chapters: [
    {
      id: 'well-of-rumah',
      title: { en: 'The Well That Belonged to Everyone', ur: 'وہ کنواں جو سب کا تھا' },
      paragraphs: [
        {
          en: 'In Madinah, fresh water could be more precious than gold. There was one sweet well called the Well of Rumah, but it belonged to a man who sold its water cup by cup, and the poor people could not drink unless they paid. One day the Prophet ﷺ stood before the companions and said: "Who will buy this well and give it freely to the Muslims?"',
          ur: 'مدینہ میں تازہ پانی سونے سے بھی زیادہ قیمتی ہو سکتا تھا۔ ایک میٹھا کنواں تھا جسے کنواں رومہ کہتے تھے، مگر وہ ایک ایسے شخص کا تھا جو اس کا پانی پیالہ پیالہ بیچتا تھا، اور غریب لوگ پیسے دیے بغیر پی نہ سکتے تھے۔ ایک دن نبی کریم ﷺ صحابہ کے سامنے کھڑے ہوئے اور فرمایا: "کون یہ کنواں خرید کر اسے مسلمانوں کے لیے مفت کر دے؟"',
        },
        {
          en: 'Uthman ibn Affan, a wealthy and generous man, agreed at once. He went to the owner and bought the well with his own money — paying every piece the man asked until the well was his. Then he opened it to all the people of Madinah, so that the rich and the poor, the guest and the stranger, could all drink from it freely.',
          ur: 'عثمان بن عفان رضی اللہ عنہ امیر اور فیاض شخص تھے؛ انہوں نے اسی وقت ہاں میں جواب دیا۔ وہ مالک کے پاس گئے اور اپنی جیب کے پیسوں سے کنواں خرید لیا — شخص جتنے مانگتا اتنے دیے، یہاں تک کہ کنواں ان کا ہو گیا۔ پھر انہوں نے اسے مدینہ کے تمام لوگوں کے لیے کھول دیا تاکہ امیر اور غریب، مہمان اور اجنبی، سب مل کر آزادانہ پی سکیں۔',
        },
        {
          en: 'From that day the sweet water of Rumah flowed for every traveller who was thirsty, and the gift of Uthman kept giving long after the seller had counted his coins. The Prophet ﷺ promised that such a gift would be a beloved treasure for Uthman. A gift that helps many people keeps growing in value in front of Allah.',
          ur: 'اس دن سے رومہ کا میٹھا پانی ہر پیاسے مسافر کے لیے بہتا رہا، اور بیچنے والے نے اپنے پیسے گن لیے مگر عثمان کا تحفہ بہت عرصے تک دیتا رہا۔ نبی کریم ﷺ نے وعدہ فرمایا کہ ایسا تحفہ عثمان کے لیے محبوب خزانہ ہوگا۔ جو تحفہ کئی لوگوں کے کام آئے، اللہ کے نزدیک اس کی قدر بڑھتی ہی جاتی ہے۔',
        },
        {
          en: 'Free water for everyone had become a shared treasure of the whole city. Uthman did not wait to be asked twice — his wealth flowed from his hand into the service of others. That is true generosity: not giving what the heart does not need, but giving quickly and quietly what someone else truly needs.',
          ur: 'سب کے لیے مفت پانی پورے شہر کی مشترک دولت بن گیا۔ عثمان دو بار کہنے کا انتظار نہ کرتے تھے — ان کا مال ان کے ہاتھ سے نکل کر دوسروں کی خدمت میں لگتا رہا۔ یہی سچی فیاضی ہے: وہ چیز نہیں دینا جس کی دل کو ضرورت نہیں، بلکہ جلدی اور چپکے سے وہ کچھ دے دینا جس کی کسی اور کو سچی ضرورت ہو۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari; Sahih Muslim (Uthman buying the Well of Rumah)', needsVerification: true, label: { en: 'Uthman buys the Well of Rumah and gives it for all the Muslims of Madinah', ur: 'عثمان کنواں رومہ خرید کر اسے مدینہ کے تمام مسلمانوں کے لیے وقف کر دیتے ہیں' } },
      ],
    },
    {
      id: 'the-two-lights',
      title: { en: 'The Shyness of Uthman', ur: 'عثمان کی حیاء' },
      paragraphs: [
        {
          en: 'Uthman ibn Affan was a noble, gentle man, and the Prophet ﷺ loved him very much. He was honored to be married to one daughter of the Prophet ﷺ, and when she passed away, the Prophet ﷺ married him to another — so the people praised him as Dhun-Nurayn, "the Possessor of the Two Lights."',
          ur: 'عثمان بن عفان رضی اللہ عنہ نیک سیرت اور نرم مزاج تھے، اور نبی کریم ﷺ انہیں بہت چاہتے تھے۔ انہیں نبی کریم ﷺ کی ایک بیٹی سے نکاح کا شرف ملا، اور جب وہ وفات پا گئیں تو نبی کریم ﷺ نے انہیں دوسری بیٹی سے نکاح میں دیا — اس لیے لوگوں نے انہیں ذو النورین کہا، یعنی دو نوروں والے۔',
        },
        {
          en: 'Uthman was famous for a beautiful quality: hayaa, the quiet, noble shyness. He spoke softly, lowered his gaze, and never moved forward with a rude or showy word. His modesty about living is a sign of a heart that loves Allah and respects the feelings of others.',
          ur: 'عثمان ایک خوبصورت صفت کی وجہ سے مشہور تھے: حیاء، یعنی نرم اور نیک شرم۔ وہ آہستہ بولتے، نظر نیچی رکھتے، اور کبھی بدتمیزی یا دکھاوے والے لفظ سے آگے نہ بڑھتے۔ زندگی میں ان کا تکلف اسی دل کی نشانی ہے جو اللہ سے محبت رکھتا ہے اور دوسروں کے جذبات کا لحاظ کرتا ہے۔',
        },
        {
          en: 'The Prophet ﷺ honored him for this, and the companions remember how the Messenger of Allah ﷺ would say that the light of Uthman was a sign of his goodness and his closeness to the truth. Shyness did not make Uthman weak — it made him gentle, careful, and loved by everyone around him.',
          ur: 'نبی کریم ﷺ نے اسی وجہ سے ان کا وقار فرمایا، اور صحابہ یہ بات یاد رکھتے ہیں کہ رسول اللہ ﷺ فرماتے تھے کہ عثمان کا نور ان کی نیکی اور سچ کے قریب ہونے کی نشانی ہے۔ حیاء نے عثمان کو کمزور نہ کیا — بلکہ انہیں نرم، محتاط اور اپنے ارد گرد سب کا محبوب بنا دیا۔',
        },
        {
          en: 'Being shy in a good way means guarding the tongue and feeling the feelings of others. A child does not lose courage by being gentle; the two go together, as Uthman showed. Kind eyes, soft words, and a heart that does not wound — that was the good shyness of Uthman ibn Affan.',
          ur: 'اچھے انداز میں شرمیلا ہونے کا مطلب ہے زبان کو سنبھالنا اور دوسروں کے دل کا حال محسوس کرنا۔ بچہ نرمی سے اپنی ہمت نہیں کھوتا؛ نرمی اور ہمت ساتھ ساتھ چلتی ہیں، جیسا عثمان نے دکھایا۔ مہربان آنکھیں، نرم بول، اور وہ دل جو کسی کو چوٹ نہ لگائے — یہی عثمان بن عفان رضی اللہ عنہ کی نیک حیاء تھی۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari; Sahih Muslim (Uthman married to Ruqayyah and Umm Kulthum, the name Dhun-Nurayn)', needsVerification: true, label: { en: 'Uthman marries two daughters of the Prophet ﷺ and is called Dhun-Nurayn', ur: 'عثمان نبی کریم ﷺ کی دو بیٹیوں سے شادی کرتے ہیں اور ذو النورین کہلاتے ہیں' } },
        { type: 'hadith', reference: 'Sahih al-Bukhari (the hayaa of Uthman)', needsVerification: true, label: { en: 'The Prophet ﷺ praised the good shyness called hayaa in Uthman', ur: 'نبی کریم ﷺ نے عثمان میں حیاء یعنی اچھی شرم کی تعریف کی' } },
      ],
    },
    {
      id: 'one-quran',
      title: { en: 'One Book for the Whole World', ur: 'پوری دنیا کے لیے ایک کتاب' },
      paragraphs: [
        {
          en: 'The Qur’an is the Book of Allah, and it was revealed to the Prophet ﷺ and then quickly recorded by the scribes of the Prophet and memorized in the hearts of thousands. After the Prophet ﷺ passed away, the Islamic world grew, with Muslims in new lands, and sometimes they recited the same words in their own different ways of reading.',
          ur: 'قرآن اللہ کی کتاب ہے، نبی کریم ﷺ پر نازل ہوئی، پھر آپ ﷺ کے لکھنے والوں نے جلد از جلد اسے قلمبند کر لیا، اور ہزاروں دلوں میں محفوظ ہو گئی۔ نبی کریم ﷺ کے وصال کے بعد اسلامی دنیا پھیلی، نئے دیسوں میں مسلمان گئے، اور کبھی کبھار وہ ایک ہی قرآن کے الفاظ اپنے اپنے مختلف انداز میں پڑھتے تھے۔',
        },
        {
          en: 'A wise companion named Hudhayfah came to the Caliph Uthman one day with a worried report. The people of the different places had begun to argue over the best way of reading. He urged him: "O leader of the believers, stop the people before they quarrel over the Book of Allah like those before them."',
          ur: 'حذیفہ رضی اللہ عنہ نامی ایک سمجھدار صحابی ایک دن پریشان اطلاع لے کر خلیفہ عثمان کے پاس آئے۔ مختلف مقامات کے لوگوں نے بہترین پڑھائی کے بارے میں جھگڑا شروع کر دیا تھا۔ انہوں نے نصیحت کی: "اے امیر المومنین! لوگوں کو اس سے پہلے روک لو کہ وہ اللہ کی کتاب پر ان سے پہلے والوں کی طرح اختلاف کرنے لگیں۔"',
        },
        {
          en: 'So Uthman gathered the scholars of the Qur’an, among them the great Zaid ibn Thabit, and commanded them to collect the words into one. They gathered all the pages together, checked them against the memory of the memorizers, and wrote out one complete, careful Book in the finest Arabic — the speech of the Prophet ﷺ.',
          ur: 'چناچہ عثمان نے قرآن کے علماء کو جمع کیا، جن میں بڑے مقام کے زید بن ثابت رضی اللہ عنہ بھی تھے، اور انہیں حکم دیا کہ قرآن کے الفاظ کو یکجا کریں۔ انہوں نے تمام صحف اکٹھے کیے، حافظوں کے یاد سے ان کا موازنہ کیا، اور سب سے عمدہ عربی میں ایک مکمل اور پُر احتیاط کتاب لکھ دی — وہی عربی جو نبی کریم ﷺ کی زبان تھی۔',
        },
        {
          en: 'Copies of this one Mushaf were sent to every far city of the Muslims, so that all would read from the same book and no one would lose a single letter of the Revelation. And that Book is the same one that a Muslim opens anywhere on the earth today, whether in Makkah, Madeenah, Cairo, or another home.',
          ur: 'اس ایک مصحف کی نقول مسلمانوں کے دور دراز شہروں میں بھیج دی گئیں، تاکہ سب ایک ہی کتاب سے پڑھیں اور وحی کا ایک حرف بھی ضائع نہ ہو۔ وہی کتاب آج زمین پر کہیں بھی کوئی مسلمان کھولتا ہے — خواہ مکہ ہو، مدینہ ہو، قاہرہ ہو یا اور کوئی گھر۔',
        },
        {
          en: 'Because Uthman cared for the Qur’an and brought it together, the Word of Allah has never been lost. This story teaches: value the Book of Allah, learn it, and hold on to its words. And Uthman is rightly praised as the one who gathered the Qur’an into one.',
          ur: 'کیونکہ عثمان نے قرآن کا خیال رکھا اور اسے یکجا کیا، اللہ کا کلام آج تک ضائع نہیں ہوا۔ یہ کہانی سکھاتی ہے: اللہ کی کتاب کی قدر کرو، اسے سیکھو، اور اس کے الفاظ کو مضبوطی تھامو۔ اور عثمان واقعی اس بات کے مستحق ہیں کہ انہیں قرآن کو یکجا کرنے والا کہا جائے۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari (gathering of the Qur’an under Uthman, narrated by Zaid bin Thabit)', needsVerification: true, label: { en: 'Uthman gathers the Qur’an into one complete Book with Zaid bin Thabit', ur: 'عثمان زید بن ثابت کے ساتھ قرآن کو ایک مکمل کتاب میں جمع کرتے ہیں' } },
      ],
    },
    {
      id: 'army-of-hardship',
      title: { en: 'The Army of the Hard Days', ur: 'مشقتوں کا لشکر' },
      paragraphs: [
        {
          en: 'Once the Prophet ﷺ called the believers to a long and difficult expedition in the scorching heat, to the north, toward the land of Tabuk. The road was far, the weather was burning, and the believers had little to spend. It was hard, and only the ones whose hearts were strong stood up ready to go.',
          ur: 'ایک بار نبی کریم ﷺ نے مومنوں کو تپتی دھوپ میں ایک لمبے اور سخت سفر کے لیے بلایا، شمال کی طرف، زمین تبوک کی جانب۔ راستہ بہت دور تھا، گرمی آگ برسا رہی تھی، اور مسلمانوں کے پاس خرچ کرنے کو کم تھا۔ یہ سخت وقت تھا، اور صرف جن کے دل مضبوط تھے وہ اٹھ کھڑے ہوئے۔',
        },
        {
          en: 'The Prophet ﷺ spoke of the great reward for the one who would give generously to equip this struggling army. Uthman came forward and gave with a wide open heart — camels, money, and supplies, until the whole of the expedition was ready thanks to him. He wanted no praise for these, and no return in themselves.',
          ur: 'نبی کریم ﷺ نے اس مشکل لشکر کو کھلے دل سے سامان دینے والے کے لیے بڑے اجر کی خبر دی۔ عثمان آگے بڑھے اور کھلے دل سے دیا — اونٹ، مال اور سامان — یہاں تک کہ ان کے سبب پورا لشکر روانہ ہونے کے لیے تیار ہو گیا۔ انہیں ان کاموں پر نہ تعریف چاہیے تھی نہ کوئی بدلہ۔',
        },
        {
          en: 'The companions all saw Uthman’s gift, and the Prophet ﷺ prayed a joyful prayer for him. The Messenger of Allah ﷺ spoke warmly of the one who gives for the advantage of the Muslims, and the companions remembered that Uthman’s charity would be a treasure for him in the sight of Allah. Whatever good he did after that day, it is a tree that keeps bearing its fruit.',
          ur: 'تمام صحابہ نے عثمان کا تحفہ دیکھا، اور نبی کریم ﷺ نے ان کے لیے خوشی بھری دعا فرمائی۔ رسول اللہ ﷺ نے مسلمانوں کے فائدے کے لیے خرچ کرنے والے کی بڑے پیار سے بات کی، اور صحابہ یہ بات یاد رکھتے ہیں کہ عثمان کی فیاضی اللہ کے نزدیک ان کے لیے خزانہ ہوگی۔ اس دن کے بعد ان کا کیا ہوا ہر نیکی کا کام ایسے درخت کی طرح لگاتار پھل دیتا رہا۔',
        },
        {
          en: 'Later, Uthman brought that same spirit to the caliphate. He taught order to the armies of the growing Ummah, divided the new lands with fairness and provided for the soldiers. Strong and organized armies, generous and honest — that was the way of the Prophet ﷺ for the Islamic rule that went out beyond.',
          ur: 'بعد میں عثمان نے خلافت میں بھی وہی روح لائی۔ انہوں نے بڑھتی ہوئی امت کے لشکروں کو نظم و ضبط سکھایا، نئے علاقے انصاف کے ساتھ بانٹے، اور سپاہیوں کا بندوبست کیا۔ مضبوط اور منظم لشکر، فیاض اور دیانتدار — باہر تک پھیلنے والی اسلامی حکومت کے لیے یہی نبی کریم ﷺ کا طریقہ تھا۔',
        },
        {
          en: 'Generosity is measured not in coins but in the readiness of the heart. Uthman equipped the army so completely that the entire team could move forward, and the hearts of the believers were filled with trust. A child can give a coin, share a snack, or welcome a new friend — that is the same generous spirit at work on their little scale.',
          ur: 'فیاضی سکوں سے نہیں، دل کے تیار ہونے سے ناپی جاتی ہے۔ عثمان نے لشکر اتنا مکمل سامان دیا کہ پورا قافلہ آگے نکل کھڑا ہوا، اور مومنوں کے دل بھروسے سے بھر گئے۔ آج کا بچہ ایک سککا دے سکتا ہے، اپنا کھانا بانٹ سکتا ہے، یا نئے دوست کا خیر مقدم کر سکتا ہے — یہی فیاضی کا جذبہ ان کے چھوٹے پیمانے پر کام کر رہا ہے۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Sahih al-Bukhari; Sahih Muslim (the hadith of equipping the army of al-Usra)', needsVerification: true, label: { en: 'Uthman equips the struggling army of al-Usra so it can march', ur: 'عثمان مشکل حالات کے لشکر کو سامان دیتے ہیں تاکہ وہ آگے چل سکے' } },
        { type: 'hadith', reference: 'Seerah of the Prophet ﷺ (the Expedition of Tabuk)', needsVerification: true, label: { en: 'The Seerah tells of the long, scorching expedition of Tabuk', ur: 'سیرت تبوک کے طویل اور تپتا ہوا سفر کا ذکر کرتی ہے' } },
      ],
    },
    {
      id: 'third-caliph',
      title: { en: 'The Third Leader of the Muslims', ur: 'مسلمانوں کے تیسرے رہنما' },
      paragraphs: [
        {
          en: 'When the second caliph, Umar, passed away, the great companions gathered together to choose the next leader of the believers. After open and honest counsel they agreed with one heart on Uthman. So Uthman became the third Caliph, gently and humbly, the open book of his hands extended to all.',
          ur: 'جب دوسرے خلیفہ عمر رضی اللہ عنہ وصال فرما گئے تو بڑے بڑے صحابہ جمع ہوئے تاکہ مومنوں کے آگے کے رہنما کا انتخاب ہو۔ کھلے اور سچے مشورے کے بعد سب ایک دل ہو کر عثمان پر متفق ہو گئے۔ یوں عثمان تیسرے خلیفہ بنے — نرمی سے، عاجزی سے، سب کے لیے اپنے ہاتھ کھلے رکھتے ہوئے۔',
        },
        {
          en: 'Uthman carried the justice and the order laid down by Abu Bakr and Umar, and he added his own gentle and generous spirit. He enlarged the Prophet’s mosque in Madinah and planned the streets and houses of the city, while at home he lived simply and kept nothing but a quiet heart.',
          ur: 'عثمان نے ابوبکر اور عمر رضی اللہ عنہما کا انصاف اور نظم برقرار رکھا، اور اس میں اپنی نرمی اور فیاضی کا اپنا رنگ ڈال دیا۔ انہوں نے مدینہ میں نبی کریم ﷺ کی مسجد کو وسعت دی، شہر کی سڑکوں اور گھروں کا نقشہ بچھا، اور اپنے گھر میں نہایت سادہ زندگی گزاری — اپنے پاس صرف ایک پرسکون دل رکھا۔',
        },
        {
          en: 'During his time the light of the Islamic state reached new horizons and lands. The call of the faith crossed rivers and mountains, and the pattern of his gentle, careful leadership strengthened the kingdom that wanted peace and faith on both of them.',
          ur: 'ان کے دور میں اسلامی ریاست کی روشنی نئے نئے افقوں اور سرزمینوں تک پہنچی۔ ایمان کی پکار ندیوں اور پہاڑوں کو پار کرتی چلی گئی، اور ان کے نرم اور محتاط قیادت کے انداز نے امن اور ایمان دونوں چاہنے والی اس حکومت کو مضبوط کر دیا۔',
        },
        {
          en: 'Above all, Uthman is the champion of the Qur’an: he made the Book one, and by that he held the whole Ummah together. A child today can open his own Mushaf and find the care of Uthman in it — together with a sweet well for the thirsty and an open hand for the believers. That is Uthman: the shy, the generous, the hero of the two lights and of the one Book.',
          ur: 'سب سے بڑھ کر عثمان قرآن کے ہیرو ہیں: انہوں نے اللہ کی کتاب کو یکجا کیا، اور اسی کے ذریعے پوری امت کو جوڑے رکھا۔ آج کا بچہ اپنا مصحف کھولتا ہے تو اس میں عثمان کی محنت نظر آتی ہے — ساتھ ہی پیاسوں کے لیے میٹھا کنواں اور مومنوں کے لیے کھلا ہاتھ۔ یہی عثمان ہیں: شرمیلے، فیاض، دو نوروں اور ایک کتاب کے ہیرو۔',
        },
      ],
      sources: [
        { type: 'hadith', reference: 'Seerah and histories of the Rightly-Guided Caliphs (the shura that agreed on Uthman)', needsVerification: true, label: { en: 'The companions counsel together and agree to choose Uthman as caliph', ur: 'صحابہ آپس میں مشورہ کرتے ہیں اور عثمان کو خلیفہ چننے پر متفق ہوتے ہیں' } },
        { type: 'hadith', reference: 'Histories of the Rightly-Guided Caliphate (Uthman’s expansion of the Prophet’s Mosque and the state)', needsVerification: true, label: { en: 'Uthman enlarged the Prophet’s Mosque and spread the Islamic state', ur: 'عثمان نے نبی کریم ﷺ کی مسجد کو بڑھایا اور اسلامی ریاست کو پھیلایا' } },
      ],
    },
  ],
};