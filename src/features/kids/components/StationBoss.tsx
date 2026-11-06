import { useEffect, useMemo, useRef, useState } from 'react';
import { Heart, Swords, Trophy, X } from 'lucide-react';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import Typography from 'components/ui/Typography';
import SparkleBurst from 'features/kids/components/rewards/SparkleBurst';
import ChallengeRoundView from './ChallengeRoundView';
import { buildBossRounds } from 'features/kids/services/letterChallenge';
import type { ChallengeRound } from 'features/kids/services/letterChallenge';
import type { ResolvedStation } from 'data/kids/letterStations';
import { playCorrect, playTap, playWrong } from 'services/kidSounds';
import type { AlphabetLetter } from 'types/kids.types';
import useTranslation from 'hooks/useTranslation';
import styles from './StationBoss.module.css';

export interface StationBossProps {
  station: ResolvedStation;
  letters: AlphabetLetter[];
  onWin: (score: number, total: number) => void;
  onClose: () => void;
}

const LIVES = 3;
const SECONDS_PER_ROUND = 12;

type Status = 'playing' | 'won' | 'lost';

/**
 * A station's end-of-level run: every letter of the station in mixed round
 * kinds, three lives and a short clock. Beating it is what opens the next
 * station, so it is the thing a child is working towards on the map.
 */
export default function StationBoss({ station, letters, onWin, onClose }: StationBossProps) {
  const { t } = useTranslation();

  const rounds = useMemo(() => buildBossRounds(station.letters, letters), [station, letters]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lives, setLives] = useState(LIVES);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<Status>('playing');
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_ROUND);
  const settledRef = useRef(false);

  const round = rounds[roundIndex] as ChallengeRound;
  const answered = selectedId !== null;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function settle(nextLives: number, nextScore: number) {
    if (settledRef.current) return;
    settledRef.current = true;

    if (nextLives <= 0) {
      setStatus('lost');
      return;
    }
    if (roundIndex + 1 >= rounds.length) {
      setStatus('won');
      onWin(nextScore, rounds.length);
      return;
    }
    window.setTimeout(() => {
      setRoundIndex((prev) => prev + 1);
      setSelectedId(null);
      setTimeLeft(SECONDS_PER_ROUND);
      settledRef.current = false;
    }, 900);
  }

  function pick(optionId: string) {
    if (answered) return;
    setSelectedId(optionId);

    if (optionId === round.target.id) {
      playCorrect();
      const nextScore = score + 1;
      setScore(nextScore);
      settle(lives, nextScore);
      return;
    }

    playWrong();
    const nextLives = lives - 1;
    setLives(nextLives);
    settle(nextLives, score);
  }

  // The clock runs only while the child is still deciding; running out costs a life.
  useEffect(() => {
    if (status !== 'playing' || answered) return undefined;
    if (timeLeft <= 0) {
      playWrong();
      setSelectedId('timeout');
      const nextLives = lives - 1;
      setLives(nextLives);
      settle(nextLives, score);
      return undefined;
    }
    const timer = window.setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => window.clearTimeout(timer);
    // `settle` is re-created each render and reads the same state this effect already depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, answered, timeLeft, lives, score]);

  function restart() {
    playTap();
    setRoundIndex(0);
    setSelectedId(null);
    setLives(LIVES);
    setScore(0);
    setTimeLeft(SECONDS_PER_ROUND);
    setStatus('playing');
    settledRef.current = false;
  }

  if (status === 'won') {
    return (
      <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="boss-win-title">
        <Card elevation="raised" className={styles.resultCard}>
          <SparkleBurst burstKey="boss-win" count={16} />
          <Trophy size={40} className={styles.trophy} aria-hidden="true" />
          <Typography variant="h3" as="h2" id="boss-win-title">
            {t('kids.bossCleared')}
          </Typography>
          <Typography variant="body" muted>
            {t('kids.scoreLabel', { score, total: rounds.length })}
          </Typography>
          <div className={styles.actions}>
            <Button variant="secondary" onClick={restart}>
              {t('kids.playAgain')}
            </Button>
            <Button variant="primary" onClick={onClose}>
              {t('kids.badgeUnlockContinue')}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (status === 'lost') {
    return (
      <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="boss-lost-title">
        <Card elevation="raised" className={styles.resultCard}>
          <Typography variant="h3" as="h2" id="boss-lost-title">
            {t('kids.bossDefeated')}
          </Typography>
          <Typography variant="body" muted>
            {t('kids.scoreLabel', { score, total: rounds.length })}
          </Typography>
          <div className={styles.actions}>
            <Button variant="primary" onClick={restart}>
              {t('kids.playAgain')}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              {t('common.close')}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="boss-title">
      <Card elevation="raised" className={styles.card}>
        <button type="button" className={styles.close} onClick={onClose} aria-label={t('common.close')}>
          <X size={22} />
        </button>

        <header className={styles.head}>
          <span className={styles.headIcon} aria-hidden="true">
            <Swords size={20} />
          </span>
          <Typography variant="h3" as="h2" id="boss-title">
            {t('kids.bossChallenge')}: {station.name}
          </Typography>
          <span className={styles.lives} aria-label={t('kids.livesLeft', { count: lives })}>
            {Array.from({ length: LIVES }, (_, index) => (
              <Heart key={index} size={18} className={index < lives ? styles.heartOn : styles.heartOff} aria-hidden="true" />
            ))}
          </span>
        </header>

        <Typography variant="caption" muted>
          {t('kids.questionProgress', { current: roundIndex + 1, total: rounds.length })}
        </Typography>

        <div className={styles.clock} aria-hidden="true">
          <i
            className={styles.clockFill}
            style={{ width: `${Math.max(0, (timeLeft / SECONDS_PER_ROUND) * 100)}%` }}
          />
        </div>
        <Typography variant="caption" muted className={styles.clockLabel}>
          {`${timeLeft}s`}
        </Typography>

        <ChallengeRoundView round={round} selectedId={selectedId} onPick={pick} locked={answered} revealAnswer />
      </Card>
    </div>
  );
}
