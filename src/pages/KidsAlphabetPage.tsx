import { useMemo, useState } from 'react';
import { Flame, RotateCw, Star } from 'lucide-react';
import Typography from 'components/ui/Typography';
import PillGroup from 'components/ui/PillGroup';
import Skeleton from 'components/ui/Skeleton';
import Button from 'components/ui/Button';
import EmptyState from 'components/feedback/EmptyState';
import useAlphabetLetters from 'features/kids/hooks/useAlphabetLetters';
import {
  useKidsProgressStore,
  getClearedStationIds,
  getLetterStars,
  getMasteredLetterIds,
  getStreak,
} from 'stores/kidsProgressStore';
import { STARS_PER_CORRECT_ANSWER, STARS_PER_GAME_COMPLETION, useKidsRewardsStore } from 'stores/useKidsRewardsStore';
import LetterJourneyMap from 'features/kids/components/LetterJourneyMap';
import LetterLab from 'features/kids/components/LetterLab';
import StationBoss from 'features/kids/components/StationBoss';
import LetterFlashcards from 'features/kids/components/LetterFlashcards';
import QuizRunner from 'features/kids/components/QuizRunner';
import KidsBackButton from 'features/kids/components/KidsBackButton';
import { generateAlphabetQuiz } from 'features/kids/services/kidsQuiz';
import { resolveStations } from 'data/kids/letterStations';
import type { ResolvedStation } from 'data/kids/letterStations';
import { ROUTES } from 'constants/routes';
import type { AlphabetLetter } from 'types/kids.types';
import useTranslation from 'hooks/useTranslation';
import styles from './KidsAlphabetPage.module.css';

type Mode = 'journey' | 'flashcards' | 'quiz';

const QUIZ_LENGTH = 10;

export default function KidsAlphabetPage() {
  const [mode, setMode] = useState<Mode>('journey');
  const [quizKey, setQuizKey] = useState(0);
  const [labLetter, setLabLetter] = useState<AlphabetLetter | null>(null);
  const [bossStation, setBossStation] = useState<ResolvedStation | null>(null);
  const { t } = useTranslation();

  const MODES: { id: Mode; label: string }[] = [
    { id: 'journey', label: t('kids.modeJourney') },
    { id: 'flashcards', label: t('kids.modeFlashcards') },
    { id: 'quiz', label: t('kids.modeQuiz') },
  ];

  const { data: letters, isPending, isError, error, refetch, isFetching } = useAlphabetLetters();
  const records = useKidsProgressStore((state) => state.records);
  const recordLetterStars = useKidsProgressStore((state) => state.recordLetterStars);
  const markStationCleared = useKidsProgressStore((state) => state.markStationCleared);
  const recordQuizResult = useKidsProgressStore((state) => state.recordQuizResult);
  const awardStars = useKidsRewardsStore((state) => state.awardStars);

  const stations = useMemo(() => (letters ? resolveStations(letters) : []), [letters]);
  const stars = getLetterStars(records);
  const clearedIds = getClearedStationIds(records);
  const masteredCount = getMasteredLetterIds(records).length;
  const streak = getStreak(records);
  const balance = useKidsRewardsStore((state) => state.stars);

  // quizKey is intentionally unused inside — bumping it (onRestart) is what forces a fresh shuffle.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const quizQuestions = useMemo(() => (letters ? generateAlphabetQuiz(letters, QUIZ_LENGTH) : []), [letters, quizKey]);

  return (
    <div className={styles.page}>
      <KidsBackButton to={ROUTES.KIDS} />

      <header className={styles.head}>
        <div>
          <Typography variant="h2">{t('kids.arabicLetters')}</Typography>
          <Typography variant="body" muted className={styles.subtitle}>
            {t('kids.journeySubtitle', { mastered: masteredCount, total: letters?.length ?? 0 })}
          </Typography>
        </div>

        <div className={styles.hud}>
          <span className={styles.chip}>
            <Flame size={16} className={styles.chipFlame} aria-hidden="true" />
            {t('kids.streak', { count: streak })}
          </span>
          <span className={styles.chip}>
            <Star size={16} aria-hidden="true" />
            {t('kids.starsEarned', { count: balance })}
          </span>
        </div>
      </header>

      <PillGroup options={MODES} value={mode} onChange={(id) => setMode(id as Mode)} />

      {isPending && <Skeleton variant="rect" height="6rem" count={8} />}

      {isError && (
        <EmptyState
          title={t('emptyState.kids.lettersLoadFailed')}
          description={error.message}
          action={
            <Button variant="secondary" onClick={() => refetch()} disabled={isFetching} leadingIcon={<RotateCw size={16} />}>
              {t('common.retry')}
            </Button>
          }
        />
      )}

      {letters && mode === 'journey' && (
        <LetterJourneyMap
          stations={stations}
          stars={stars}
          clearedIds={clearedIds}
          onOpenLetter={setLabLetter}
          onOpenBoss={setBossStation}
        />
      )}

      {letters && mode === 'flashcards' && <LetterFlashcards letters={letters} stars={stars} />}

      {letters && mode === 'quiz' && (
        <QuizRunner
          key={quizKey}
          questions={quizQuestions}
          onComplete={(score, total) => recordQuizResult('alphabet', score, total)}
          onRestart={() => setQuizKey((prev) => prev + 1)}
        />
      )}

      {labLetter && (
        <LetterLab
          letter={labLetter}
          letters={letters ?? []}
          bestStars={stars[labLetter.id] ?? 0}
          onComplete={(earned) => {
            recordLetterStars(labLetter.id, earned);
            awardStars(STARS_PER_CORRECT_ANSWER * earned);
          }}
          onClose={() => setLabLetter(null)}
        />
      )}

      {bossStation && letters && (
        <StationBoss
          station={bossStation}
          letters={letters}
          onWin={(score, total) => {
            markStationCleared(bossStation.id);
            recordQuizResult(`alphabet-boss:${bossStation.id}`, score, total);
            awardStars(STARS_PER_GAME_COMPLETION);
          }}
          onClose={() => setBossStation(null)}
        />
      )}
    </div>
  );
}
