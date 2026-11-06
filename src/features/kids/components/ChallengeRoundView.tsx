import AudioPlayButton from 'components/ui/AudioPlayButton';
import Typography from 'components/ui/Typography';
import { roundPromptKey } from 'features/kids/services/letterChallenge';
import type { ChallengeRound } from 'features/kids/services/letterChallenge';
import useTranslation from 'hooks/useTranslation';
import styles from './ChallengeRoundView.module.css';

export interface ChallengeRoundViewProps {
  round: ChallengeRound;
  selectedId: string | null;
  onPick: (optionId: string) => void;
  /** Freeze the board while the round's feedback is showing. */
  locked?: boolean;
  /**
   * The Lab lets a child retry a wrong tap, so the answer stays hidden;
   * the Boss costs a life instead, so it shows them what they missed.
   */
  revealAnswer?: boolean;
}

/** Prompt + answer grid shared by the Letter Lab and the station Boss Challenge. */
export default function ChallengeRoundView({
  round,
  selectedId,
  onPick,
  locked = false,
  revealAnswer = false,
}: ChallengeRoundViewProps) {
  const { t } = useTranslation();
  const answered = selectedId !== null;
  const isRight = selectedId === round.target.id;
  // `word` and `hear` ask about the target letter, so its own treasure is fair game.
  const showOptionsAsGlyph = round.kind !== 'find';
  const revealCorrect = answered && (revealAnswer || isRight);

  return (
    <div className={styles.wrapper}>
      <div className={styles.prompt}>
        {round.kind === 'hear' ? (
          <AudioPlayButton
            src={round.target.audioUrl}
            size="lg"
            label={t('kids.playLetter', { letter: round.target.transliteration })}
          />
        ) : round.kind === 'word' ? (
          <div className={styles.treasure}>
            <span className={styles.treasureEmoji} aria-hidden="true">
              {round.target.word.emoji}
            </span>
            <span className={styles.treasureArabic} dir="rtl">
              {round.target.word.arabic}
            </span>
            <span className={styles.treasureEnglish}>
              {round.target.word.transliteration} · {round.target.word.english}
            </span>
          </div>
        ) : (
          <Typography variant="h1" as="p" className={styles.promptGlyph} dir="rtl">
            {round.kind === 'find' ? round.target.arabic : round.target.transliteration}
          </Typography>
        )}

        <Typography variant="h3" as="p" className={styles.promptText}>
          {t(roundPromptKey(round.kind), { name: round.target.transliteration })}
        </Typography>
      </div>

      <div className={styles.options}>
        {round.options.map((option) => {
          const isSelected = selectedId === option.id;
          const isTarget = option.id === round.target.id;
          return (
            <button
              key={option.id}
              type="button"
              className={[
                styles.option,
                revealCorrect && isTarget && styles.correct,
                isSelected && !isTarget && styles.incorrect,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onPick(option.id)}
              disabled={locked}
            >
              <span className={styles.optionMain} dir={showOptionsAsGlyph ? 'rtl' : 'ltr'}>
                {showOptionsAsGlyph ? option.arabic : option.transliteration}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
