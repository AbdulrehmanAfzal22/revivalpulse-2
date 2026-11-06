import styles from './LetterStars.module.css';

export interface LetterStarsProps {
  /** Stars earned, 0-3. */
  count: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TOTAL = 3;

/** Three-star mastery row. Decorative — the surrounding label carries the meaning. */
export default function LetterStars({ count, size = 'sm', className }: LetterStarsProps) {
  return (
    <span
      className={[styles.row, styles[size], className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {Array.from({ length: TOTAL }, (_, index) => (
        <span key={index} className={index < count ? styles.on : styles.off}>
          {'★'}
        </span>
      ))}
    </span>
  );
}
