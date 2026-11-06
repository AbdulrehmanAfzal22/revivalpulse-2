import { useEffect, useMemo, useState } from 'react';
import { Check, Lightbulb, ScrollText } from 'lucide-react';
import Typography from 'components/ui/Typography';
import Card from 'components/ui/Card';
import Button from 'components/ui/Button';
import Skeleton from 'components/ui/Skeleton';
import EmptyState from 'components/feedback/EmptyState';
import AudioPlayButton from 'components/ui/AudioPlayButton';
import KidsBackButton from 'features/kids/components/KidsBackButton';
import SurahQuiz from 'features/kids/components/SurahQuiz';
import SurahLab from 'features/kids/components/SurahLab';
import LessonsTrail from 'features/kids/components/LessonsTrail';
import { SURAHS } from 'data/quran/surahs';
import { JUZ_BOUNDARIES } from 'data/quran/juz';
import { RECITERS } from 'constants/reciters';
import { buildAyahAudioUrl } from 'api/quran/everyAyahClient';
import { moreSurahIds, questOf, resolveTiers } from 'data/kids/juzAmmaTiers';
import useBeginnerLessonVerses from 'features/kids/hooks/useBeginnerLessonVerses';
import { useKidsProgressStore, getCompletedLessonSurahIds, getLessonStars, getViewedContentIds } from 'stores/kidsProgressStore';
import { STARS_PER_CORRECT_ANSWER, useKidsRewardsStore } from 'stores/useKidsRewardsStore';
import useTranslation from 'hooks/useTranslation';
import type { Surah } from 'types/quran.types';
import styles from './KidsLessonsPage.module.css';

const KIDS_RECITER = RECITERS.find((reciter) => reciter.id === 'maher-muaiqly');
const AUDIO_FOLDER = KIDS_RECITER?.source === 'everyayah.com' ? KIDS_RECITER.folderName : null;
const JUZ_AMMA_IDS = Object.keys(JUZ_BOUNDARIES.find((juz) => juz.juzNumber === 30)?.verseMapping ?? {}).map(Number);

export default function KidsLessonsPage() {
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(null);
  const [quizSurahId, setQuizSurahId] = useState<number | null>(null);
  const [labOpen, setLabOpen] = useState(false);
  const records = useKidsProgressStore((state) => state.records);
  const completeLesson = useKidsProgressStore((state) => state.completeLesson);
  const markContentViewed = useKidsProgressStore((state) => state.markContentViewed);
  const recordQuizResult = useKidsProgressStore((state) => state.recordQuizResult);
  const recordLessonStars = useKidsProgressStore((state) => state.recordLessonStars);
  const awardStars = useKidsRewardsStore((state) => state.awardStars);
  const { t } = useTranslation();

  const tiers = useMemo(() => resolveTiers(), []);
  const stars = getLessonStars(records);
  const guidedIds = useMemo(() => tiers.flatMap((tier) => tier.surahIds), [tiers]);
  const moreSurahs = useMemo(
    () =>
      moreSurahIds(JUZ_AMMA_IDS, tiers)
        .map((id) => SURAHS.find((surah) => surah.id === id))
        .filter((surah): surah is Surah => !!surah),
    [tiers]
  );
  const masteredCount = useMemo(() => guidedIds.filter((id) => (stars[id] ?? 0) >= 3).length, [guidedIds, stars]);

  const { data: verses, isPending, isError } = useBeginnerLessonVerses(selectedSurahId);
  useEffect(() => {
    if (selectedSurahId !== null && verses && verses.length > 0 && !isPending && !isError) {
      markContentViewed('surahLesson', String(selectedSurahId));
    }
  }, [isError, isPending, markContentViewed, selectedSurahId, verses]);

  function openSurah(surah: Surah) {
    setSelectedSurahId(surah.id);
    setQuizSurahId(null);
    setLabOpen(false);
  }
  if (selectedSurahId !== null) {
    const surah = SURAHS.find((item) => item.id === selectedSurahId);
    if (!surah) return <EmptyState title="Surah not found" />;

    const quest = questOf(surah.id);
    const isCompleted = getCompletedLessonSurahIds(records).includes(surah.id);
    const lessonViewed = isCompleted || getViewedContentIds(records, 'surahLesson').includes(String(surah.id));
    const priorStars = stars[surah.id] ?? 0;

    return (
      <div className={styles.page}>
        <div className={styles.detailTop}>
          <KidsBackButton to="/kids/lessons" />
        </div>
        <div className={styles.detailHeading}>
          <Typography variant="h2" dir="rtl">{surah.nameArabic}</Typography>
          <Typography variant="h3">{surah.nameSimple}</Typography>
          <Typography variant="body" muted>{surah.translatedName} · {t('kids.versesCount', { count: surah.versesCount })} · {surah.revelationPlace === 'makkah' ? 'Meccan' : 'Medinan'}</Typography>
        </div>
        {isPending && <Skeleton variant="rect" height="5rem" count={Math.min(surah.versesCount, 4)} />}
        {isError && <EmptyState title={t('emptyState.kids.lessonLoadFailed')} />}
        <div className={styles.verses}>
          {verses?.map((verse) => (
            <Card key={verse.verseKey} elevation="raised" className={styles.verseCard}>
              <div className={styles.verseHeader}>
                <Typography variant="caption" muted>{verse.verseKey}</Typography>
                {AUDIO_FOLDER && <AudioPlayButton src={buildAyahAudioUrl(AUDIO_FOLDER, verse.chapterId, verse.verseNumber)} size="sm" label={t('kids.playVerse', { verseKey: verse.verseKey })} />}
              </div>
              <Typography variant="h4" as="p" className={styles.verseArabic} dir="rtl">{verse.textUthmani}</Typography>
              <Typography variant="body">{verse.translations[0]?.text}</Typography>
            </Card>
          ))}
        </div>
        {quest && (
          <Card elevation="raised" className={styles.questCard}>
            <div className={styles.questHead}>
              <span className={styles.questIcon}><Lightbulb size={20} /></span>
              <Typography variant="h3" as="h2">{t('kids.questHookTitle')}</Typography>
            </div>
            <Typography variant="body">{quest.hook}</Typography>
            <div className={styles.wordKeys}>
              {quest.wordKeys.map((word) => (
                <div className={styles.wordKey} key={word.arabic}>
                  <Typography variant="h4" as="p" className={styles.wordKeyArabic} dir="rtl">{word.arabic}</Typography>
                  <Typography variant="caption" className={styles.wordKeyTranslit}>{word.transliteration}</Typography>
                  <Typography variant="body">{word.english}</Typography>
                </div>
              ))}
            </div>
            <p className={styles.practice}><ScrollText size={16} aria-hidden="true" /> {t('kids.questPracticeTitle')}: {quest.practice}</p>
            {verses && verses.length > 0 && (
              <Button variant="primary" onClick={() => setLabOpen(true)}>
                {priorStars > 0 ? t('kids.openQuest', { surah: surah.nameSimple }) : t('kids.startQuest')}
              </Button>
            )}
            {priorStars > 0 && <Typography variant="caption" muted>{t('kids.letterStars', { stars: priorStars })}</Typography>}
          </Card>
        )}
        {!quest && lessonViewed && !isCompleted && quizSurahId !== surah.id && (
          <Card elevation="raised" className={styles.recapCard}>
            <Typography variant="h3" as="h2">Ready for a quick quiz?</Typography>
            <Typography variant="body">Answer five questions about this Surah. You can try again with no penalty.</Typography>
            <Button variant="primary" onClick={() => setQuizSurahId(surah.id)}>Start quiz</Button>
          </Card>
        )}
        {!quest && quizSurahId === surah.id && lessonViewed && verses && <SurahQuiz surah={surah} verses={verses} onComplete={(score, total) => { recordQuizResult(`surah:${surah.id}`, score, total); completeLesson(surah.id); awardStars(25 + score * 10); setQuizSurahId(null); }} />}
        {!quest && isCompleted && <Button variant="secondary" disabled leadingIcon={<Check size={16} />}>{t('kids.lessonComplete')}</Button>}
        {labOpen && quest && verses && (
          <SurahLab
            quest={quest}
            surahName={surah.nameSimple}
            verses={verses}
            audioFolder={AUDIO_FOLDER}
            priorStars={priorStars}
            onComplete={(earned) => {
              recordLessonStars(surah.id, earned);
              awardStars(STARS_PER_CORRECT_ANSWER * earned);
              setLabOpen(false);
            }}
            onClose={() => setLabOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <KidsBackButton to="/kids" />
      <div className={styles.trailHeading}>
        <Typography variant="h2">{t('kids.lessonsTrailTitle')}</Typography>
        <Typography variant="body" muted>{t('kids.lessonsTrailSubtitle')}</Typography>
        <Typography variant="caption" muted>{t('kids.surahsMastered')} · {masteredCount} / {guidedIds.length}</Typography>
      </div>
      <LessonsTrail tiers={tiers} stars={stars} moreSurahs={moreSurahs} onSelectSurah={openSurah} />
    </div>
  );
}

