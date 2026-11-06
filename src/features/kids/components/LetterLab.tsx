import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import Typography from 'components/ui/Typography';
import SparkleBurst from 'features/kids/components/rewards/SparkleBurst';
import ChallengeRoundView from './ChallengeRoundView';
import LetterStars from './LetterStars';
import { buildLetterLab } from 'features/kids/services/letterChallenge';
import type { ChallengeRound } from 'features/kids/services/letterChallenge';
import { playCorrect, playTap, playWrong } from 'services/kidSounds';
import type { AlphabetLetter } from 'types/kids.types';
import useTranslation from 'hooks/useTranslation';
import styles from './LetterLab.module.css';

export interface LetterLabProps {
  letter: AlphabetLetter;
  /** Full alphabet — used to build look-alike decoys. */
  letters: AlphabetLetter[];
  /** Stars the child already holds for this letter, shown as the personal best. */
  bestStars: number;
  onComplete: (stars: number) => void;
  onClose: () => void;
}

export const STARS_PER_LETTER = 3;

/**
 * The per-letter challenge: three quick rounds — hear the sound, spot the
 * shape, claim the word treasure. A round only pays its star when the very
 * first tap is right, so 3 stars means real recognition rather than a lucky
 * fourth guess; a wrong tap is a gentle retry, never a dead end.
 */
export default function LetterLab({ letter, letters, bestStars, onComplete, onClose }: LetterLabProps) {
  const { t } = useTranslation();

  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [missed, setMissed] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);
  const [finished, setFinished] = useState(false);
  // Bumping `nonce` reshuffles the decoys, so "try again" is never the same run twice.
  const [nonce, setNonce] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rounds = useMemo(() => buildLetterLab(letter, letters), [letter, letters, nonce]);

  const round = rounds[roundIndex] as ChallengeRound;
  const answered = selectedId !== null;
  const isCorrect = selectedId === round.target.id;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function pick(optionId: string) {
    if (answered && isCorrect) return;

    if (optionId === round.target.id) {
      playCorrect();
      setSelectedId(optionId);
      const nextStars = starsEarned + (missed ? 0 : 1);
      setStarsEarned(nextStars);

      window.setTimeout(() => {
        if (roundIndex + 1 < rounds.length) {
          setRoundIndex((prev) => prev + 1);
          setSelectedId(null);
          setMissed(false);
        } else {
          setFinished(true);
          // Finishing every round always earns at least one star.
          onComplete(Math.max(1, nextStars));
        }
      }, 850);
      return;
    }

    playWrong();
    setSelectedId(optionId);
    setMissed(true);
  }

  function restartLab() {
    playTap();
    setNonce((prev) => prev + 1);
    setRoundIndex(0);
    setSelectedId(null);
    setMissed(false);
    setStarsEarned(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="lab-result-title">
        <Card elevation="raised" className={styles.resultCard}>
          <SparkleBurst burstKey="lab-win" count={14} />
          <LetterStars count={starsEarned} size="lg" />
          <Typography variant="h3" as="h2" id="lab-result-title">
            {t('kids.labResultTitle', { stars: starsEarned })}
          </Typography>
          <Typography variant="caption" muted className={styles.treasureLabel}>
            {t('kids.wordTreasure')}
          </Typography>
          <Typography variant="body">
            {letter.word.arabic} · {letter.word.transliteration} ({letter.word.english})
          </Typography>
          <div className={styles.resultActions}>
            {starsEarned < STARS_PER_LETTER && (
              <Button variant="secondary" onClick={restartLab}>
                {t('kids.labTryForThree')}
              </Button>
            )}
            <Button variant="primary" onClick={onClose}>
              {t('kids.badgeUnlockContinue')}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="lab-title">
      <Card elevation="raised" className={styles.card}>
        <button type="button" className={styles.close} onClick={onClose} aria-label={t('common.close')}>
          <X size={22} />
        </button>

        <Typography variant="h3" as="h2" id="lab-title" className={styles.srTitle}>
          {t('kids.openLetterLab', { letter: letter.transliteration })}
        </Typography>

        <div className={styles.track} aria-hidden="true">
          {rounds.map((item, index) => (
            <span
              key={item.kind}
              className={[
                styles.trackDot,
                index === roundIndex && styles.trackDotNow,
                index < roundIndex && styles.trackDotDone,
              ]
                .filter(Boolean)
                .join(' ')}
            />
          ))}
        </div>

        <Typography variant="caption" muted>
          {t('kids.questionProgress', { current: roundIndex + 1, total: rounds.length })}
        </Typography>

        <ChallengeRoundView
          round={round}
          selectedId={selectedId}
          onPick={pick}
          locked={answered && isCorrect}
        />

        <div className={styles.footer}>
          <span className={styles.best}>
            <LetterStars count={bestStars} size="sm" /> {t('kids.letterStars', { stars: bestStars })}
          </span>

          {answered && !isCorrect && (
            <div className={styles.feedback}>
              <Typography variant="body" className={styles.encouragement} role="status" aria-live="polite">
                {t('kids.gentleNudge')}
              </Typography>
              <Button variant="secondary" size="sm" onClick={() => { playTap(); setSelectedId(null); }}>
                {t('common.retry')}
              </Button>
            </div>
          )}

          {answered && isCorrect && (
            <Typography variant="body" className={styles.success} role="status" aria-live="polite">
              {t('kids.correct')}
              <span className={styles.starGain} aria-hidden="true">
                {missed ? '·' : '★'}
              </span>
            </Typography>
          )}
        </div>
      </Card>
    </div>
  );
}
