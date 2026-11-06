import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import Typography from 'components/ui/Typography';
import AudioPlayButton from 'components/ui/AudioPlayButton';
import SparkleBurst from 'features/kids/components/rewards/SparkleBurst';
import LetterStars from './LetterStars';
import { buildSurahQuest, isQuestVerse, questPromptKey } from 'features/kids/services/surahQuest';
import type { QuestChoiceRound, QuestOrderRound, QuestRound, QuestVerse } from 'features/kids/services/surahQuest';
import type { SurahQuest, SurahWordKey } from 'types/kids.types';
import type { Ayah } from 'types/quran.types';
import { playCorrect, playTap, playWrong } from 'services/kidSounds';
import useTranslation from 'hooks/useTranslation';
import styles from './SurahLab.module.css';

export interface SurahLabProps {
  quest: SurahQuest;
  surahName: string;
  verses: Ayah[];
  /** Reciter folderName, or null when everyayah.com has no track — 'read' rounds replace 'listen'. */
  audioFolder: string | null;
  /** Stars the child already holds for this surah, shown as the personal best. */
  priorStars: number;
  onComplete: (stars: number) => void;
  onClose: () => void;
}

export const STARS_PER_SURAH = 3;

/** Verse picks and word picks share no id field, so identity decides which kind we hold. */
function optionId(value: QuestVerse | SurahWordKey): string {
  return isQuestVerse(value) ? value.verseKey : value.arabic;
}

/**
 * The per-surah challenge: hear (or read) a verse, put verses back in order,
 * own the word. Like the Letter Lab, a round only pays its star when the very
 * first answer is right, and a wrong answer is a gentle retry — never a dead
 * end. The result screen hands back the authored hook, word keys and practice.
 */
export default function SurahLab({ quest, surahName, verses, audioFolder, priorStars, onComplete, onClose }: SurahLabProps) {
  const { t } = useTranslation();

  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [missed, setMissed] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);
  const [finished, setFinished] = useState(false);
  // Bumping `nonce` reshuffles the rounds, so "try again" is never the same run twice.
  const [nonce, setNonce] = useState(0);
  // Order round: verse keys tapped into slots, left to right.
  const [placed, setPlaced] = useState<string[]>([]);
  const [orderWrong, setOrderWrong] = useState(false);
  const [orderSolved, setOrderSolved] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rounds = useMemo(() => buildSurahQuest(quest, verses, audioFolder), [quest, verses, audioFolder, nonce]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (rounds.length === 0) {
    return (
      <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={surahName}>
        <Card elevation="raised" className={styles.card}>
          <Typography variant="body">{t('emptyState.kids.lessonLoadFailed')}</Typography>
          <Button variant="primary" onClick={onClose}>
            {t('common.close')}
          </Button>
        </Card>
      </div>
    );
  }

  const round = rounds[roundIndex] as QuestRound;
  const orderRound: QuestOrderRound | null = round.kind === 'order' ? round : null;
  const choiceRound: QuestChoiceRound | null = round.kind === 'order' ? null : round;
  const roundTargetId = choiceRound ? optionId(choiceRound.target) : '';
  const answered = choiceRound !== null && selectedId !== null;
  const isCorrect = answered && selectedId === roundTargetId;
  const canCheckOrder = orderRound !== null && placed.length === orderRound.cards.length;
  const showNudge = (answered && !isCorrect) || (orderRound !== null && orderWrong);
  const showSuccess = (answered && isCorrect) || (orderRound !== null && orderSolved);
  const pool = orderRound ? orderRound.cards.filter((card) => !placed.includes(card.verseKey)) : [];
  const earnedStars = Math.max(1, Math.min(STARS_PER_SURAH, starsEarned));

  function advanceToNextRound() {
    setSelectedId(null);
    setMissed(false);
    setPlaced([]);
    setOrderWrong(false);
    setOrderSolved(false);
    if (roundIndex + 1 < rounds.length) {
      setRoundIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  }

  function pick(id: string) {
    if (!choiceRound || (answered && isCorrect)) return;

    if (id === roundTargetId) {
      playCorrect();
      setSelectedId(id);
      setStarsEarned((prev) => prev + (missed ? 0 : 1));
      window.setTimeout(advanceToNextRound, 850);
      return;
    }

    playWrong();
    setSelectedId(id);
    setMissed(true);
  }

  function placeCard(verseKey: string) {
    if (!orderRound || orderSolved || placed.length >= orderRound.cards.length) return;
    playTap();
    setOrderWrong(false);
    setPlaced((prev) => [...prev, verseKey]);
  }

  function clearSlot(index: number) {
    if (!orderRound || orderSolved || index >= placed.length) return;
    playTap();
    setOrderWrong(false);
    setPlaced((prev) => prev.filter((_, i) => i !== index));
  }

  function checkOrder() {
    if (!orderRound || orderSolved || placed.length !== orderRound.cards.length) return;

    const right = placed.every((key, index) => key === orderRound.correctOrder[index]);
    if (right) {
      playCorrect();
      setOrderSolved(true);
      setStarsEarned((prev) => prev + (missed ? 0 : 1));
      window.setTimeout(advanceToNextRound, 850);
      return;
    }

    playWrong();
    setMissed(true);
    setOrderWrong(true);
  }

  function restartLab() {
    playTap();
    setNonce((prev) => prev + 1);
    setRoundIndex(0);
    setSelectedId(null);
    setMissed(false);
    setStarsEarned(0);
    setFinished(false);
    setPlaced([]);
    setOrderWrong(false);
    setOrderSolved(false);
  }

  if (finished) {
    return (
      <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="surah-lab-result-title">
        <Card elevation="raised" className={styles.resultCard}>
          <SparkleBurst burstKey="quest-win" count={14} />
          <LetterStars count={earnedStars} size="lg" />
          <Typography variant="h3" as="h2" id="surah-lab-result-title">
            {t('kids.labResultTitle', { stars: earnedStars })}
          </Typography>

          <div className={styles.payoff}>
            <Typography variant="caption" muted className={styles.payoffLabel}>
              {t('kids.questHookTitle')}
            </Typography>
            <Typography variant="body">{quest.hook}</Typography>

            <Typography variant="caption" muted className={styles.payoffLabel}>
              {t('kids.questWordsTitle')}
            </Typography>
            <ul className={styles.wordKeys}>
              {quest.wordKeys.map((word) => (
                <li key={word.arabic}>
                  <span className={styles.wordArabic} dir="rtl">
                    {word.arabic}
                  </span>{' '}
                  · {word.transliteration} ({word.english})
                </li>
              ))}
            </ul>

            <Typography variant="caption" muted className={styles.payoffLabel}>
              {t('kids.questPracticeTitle')}
            </Typography>
            <Typography variant="body">{quest.practice}</Typography>
          </div>

          <div className={styles.resultActions}>
            {earnedStars < STARS_PER_SURAH && (
              <Button variant="secondary" onClick={restartLab}>
                {t('kids.labTryForThree')}
              </Button>
            )}
            <Button variant="primary" onClick={() => onComplete(earnedStars)}>
              {t('kids.badgeUnlockContinue')}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="surah-lab-title">
      <Card elevation="raised" className={styles.card}>
        <button type="button" className={styles.close} onClick={onClose} aria-label={t('common.close')}>
          <X size={22} />
        </button>

        <Typography variant="h3" as="h2" id="surah-lab-title" className={styles.srTitle}>
          {t('kids.openQuest', { surah: surahName })}
        </Typography>
        <Typography variant="h3" as="p" className={styles.surahName}>
          {surahName}
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

        {choiceRound && (
          <div className={styles.wrapper}>
            <div className={styles.prompt}>
              {choiceRound.kind === 'listen' && isQuestVerse(choiceRound.target) && (
                <AudioPlayButton
                  src={choiceRound.target.audioUrl}
                  size="lg"
                  label={t('kids.playVerse', { verseKey: choiceRound.target.verseKey })}
                />
              )}
              {choiceRound.kind === 'read' && isQuestVerse(choiceRound.target) && (
                <p className={styles.verseArabic} dir="rtl">
                  {choiceRound.target.arabic}
                </p>
              )}
              {choiceRound.kind === 'word' && !isQuestVerse(choiceRound.target) && (
                <div className={styles.wordPrompt}>
                  <span className={styles.wordArabicBig} dir="rtl">
                    {choiceRound.target.arabic}
                  </span>
                  <span className={styles.wordTranslit}>{choiceRound.target.transliteration}</span>
                </div>
              )}
              <Typography variant="h3" as="p" className={styles.promptText}>
                {t(questPromptKey(choiceRound.kind))}
              </Typography>
            </div>

            <div className={styles.options}>
              {choiceRound.options.map((option) => {
                const id = optionId(option);
                const isSelected = selectedId === id;
                const isTarget = id === roundTargetId;
                const revealCorrect = answered && isCorrect;
                return (
                  <button
                    key={id}
                    type="button"
                    className={[
                      styles.option,
                      revealCorrect && isTarget && styles.correct,
                      isSelected && !isTarget && styles.incorrect,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => pick(id)}
                    disabled={answered && isCorrect}
                  >
                    <span className={styles.optionMain}>{isQuestVerse(option) ? option.meaning : option.english}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {orderRound && (
          <div className={styles.wrapper}>
            <Typography variant="h3" as="p" className={styles.promptText}>
              {t(questPromptKey('order'))}
            </Typography>

            <ol className={styles.slots}>
              {orderRound.cards.map((_, index) => {
                const key = placed[index];
                const card = key === undefined ? undefined : orderRound.cards.find((item) => item.verseKey === key);
                const slotLabel = t('kids.questSlotNumber', { number: index + 1 });
                return (
                  <li key={index}>
                    <button
                      type="button"
                      className={[styles.slot, !card && styles.slotEmpty].filter(Boolean).join(' ')}
                      onClick={() => clearSlot(index)}
                      disabled={orderSolved || !card}
                      aria-label={card ? `${slotLabel}: ${card.meaning}` : slotLabel}
                    >
                      <span className={styles.slotNumber} aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className={styles.slotText}>{card ? card.meaning : ''}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className={styles.pool}>
              {pool.map((card) => (
                <button
                  key={card.verseKey}
                  type="button"
                  className={styles.chip}
                  onClick={() => placeCard(card.verseKey)}
                  disabled={orderSolved}
                  aria-label={card.meaning}
                >
                  {card.meaning}
                </button>
              ))}
            </div>

            <Button variant="primary" onClick={checkOrder} disabled={!canCheckOrder || orderSolved}>
              {t('kids.questCheckOrder')}
            </Button>
          </div>
        )}

        <div className={styles.footer}>
          <span className={styles.best}>
            <LetterStars count={priorStars} size="sm" /> {t('kids.letterStars', { stars: priorStars })}
          </span>

          {showNudge ? (
            <div className={styles.feedback}>
              <Typography variant="body" className={styles.encouragement} role="status" aria-live="polite">
                {t('kids.gentleNudge')}
              </Typography>
              {choiceRound && (
                <Button variant="secondary" size="sm" onClick={() => { playTap(); setSelectedId(null); }}>
                  {t('common.retry')}
                </Button>
              )}
            </div>
          ) : null}

          {showSuccess && (
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
