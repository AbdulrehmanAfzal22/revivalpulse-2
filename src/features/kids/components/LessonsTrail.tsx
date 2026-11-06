import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Check, Lock, Sparkles } from 'lucide-react';
import Card from 'components/ui/Card';
import Typography from 'components/ui/Typography';
import LetterStars from './LetterStars';
import { isTierComplete, isTierUnlocked, currentTier } from 'data/kids/juzAmmaTiers';
import type { ResolvedTier } from 'data/kids/juzAmmaTiers';
import type { Surah } from 'types/quran.types';
import useTranslation from 'hooks/useTranslation';
import styles from './LessonsTrail.module.css';

export interface LessonsTrailProps {
  tiers: ResolvedTier[];
  /** Best stars per surah id. */
  stars: Record<number, number>;
  /** The rest of the last juz — readable, but not part of the gated trail. */
  moreSurahs: Surah[];
  onSelectSurah: (surah: Surah) => void;
}

/**
 * The guided Juz 'Amma journey: a tier rail, three surah nodes per tier and
 * the plain reading list underneath. One star on every surah of a tier is
 * what walks the child into the next one, so the map always has exactly one
 * glowing "you are here" node.
 */
export default function LessonsTrail({ tiers, stars, moreSurahs, onSelectSurah }: LessonsTrailProps) {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(
    () => tiers.find((tier) => tier.id === activeId) ?? currentTier(tiers, stars) ?? tiers[0],
    [tiers, activeId, stars]
  );

  // Once the tier being viewed is finished, step to the one it unlocked.
  useEffect(() => {
    const viewed = tiers.find((tier) => tier.id === activeId);
    if (!viewed || !isTierComplete(viewed, stars)) return;
    const next = currentTier(tiers, stars);
    if (next) setActiveId(next.id);
  }, [activeId, stars, tiers]);

  if (!active) return null;

  const activeUnlocked = isTierUnlocked(tiers, active, stars);
  const isActiveComplete = isTierComplete(active, stars);
  const starCount = active.surahIds.reduce((total, id) => total + (stars[id] ?? 0), 0);
  const earnedCount = active.surahIds.filter((id) => (stars[id] ?? 0) > 0).length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.rail} role="tablist" aria-label={t('kids.lessonsTrailTitle')}>
        {tiers.map((tier) => {
          const unlocked = isTierUnlocked(tiers, tier, stars);
          const complete = isTierComplete(tier, stars);
          const isActive = tier.id === active.id;
          return (
            <button
              key={tier.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={[
                styles.tier,
                isActive && styles.tierActive,
                complete && styles.tierComplete,
                !unlocked && styles.tierLocked,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActiveId(tier.id)}
            >
              <span className={styles.tierKicker}>{t('kids.tierOf', { current: tier.index + 1, total: tiers.length })}</span>
              <span className={styles.tierName}>{tier.name}</span>
              <span className={styles.tierGlyphs} dir="rtl" aria-hidden="true">
                {tier.surahs.map((surah) => surah.nameArabic).join(' ')}
              </span>
              {complete && (
                <span className={styles.tierTag}>
                  <Check size={12} aria-hidden="true" /> {t('kids.stationCleared')}
                </span>
              )}
              {!unlocked && <Lock size={14} className={styles.tierLock} aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      <Card elevation="raised" className={styles.panel}>
        <div className={styles.panelHead}>
          <Typography variant="h3" as="h2">
            {active.name}
          </Typography>
          <Typography variant="body" muted>
            {active.blurb}
          </Typography>
        </div>

        {!activeUnlocked && (
          <Typography variant="body" className={styles.lockedNote} role="status">
            <Lock size={16} aria-hidden="true" /> {t('kids.tierLockedHint')}
          </Typography>
        )}

        <div className={styles.progressTrack} aria-hidden="true">
          <i className={styles.progressFill} style={{ width: `${(starCount / (active.surahIds.length * 3)) * 100}%` }} />
        </div>

        <div className={styles.nodes}>
          {active.surahs.map((surah, index) => {
            const count = stars[surah.id] ?? 0;
            const isNext = activeUnlocked && count === 0 && index === earnedCount;
            return (
              <button
                key={surah.id}
                type="button"
                className={[
                  styles.node,
                  count === 3 && styles.nodeMastered,
                  count > 0 && count < 3 && styles.nodeStarted,
                  isNext && styles.nodeNext,
                  !activeUnlocked && styles.nodeLocked,
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={!activeUnlocked}
                onClick={() => onSelectSurah(surah)}
                aria-label={
                  activeUnlocked
                    ? t('kids.openQuest', { surah: surah.nameSimple })
                    : t('kids.lockedSurah')
                }
              >
                {!activeUnlocked && <Lock size={14} className={styles.nodeLock} aria-hidden="true" />}
                {count === 3 && <Sparkles size={14} className={styles.nodeSparkle} aria-hidden="true" />}
                <span className={styles.nodeGlyph} dir="rtl" aria-hidden="true">
                  {surah.nameArabic}
                </span>
                <span className={styles.nodeName}>{surah.nameSimple}</span>
                <LetterStars count={count} size="sm" />
                <span className={styles.nodeNumber} aria-hidden="true">
                  {surah.id}
                </span>
              </button>
            );
          })}
        </div>

        {!isActiveComplete && (
          <Typography variant="caption" muted className={styles.hint}>
            {t('kids.tierNextHint', { count: active.surahIds.length })}
          </Typography>
        )}
      </Card>

      {moreSurahs.length > 0 && (
        <div className={styles.more}>
          <Typography variant="h4" as="h3">
            <BookOpen size={16} aria-hidden="true" /> {t('kids.moreSurahs')}
          </Typography>
          <div className={styles.moreList}>
            {moreSurahs.map((surah) => (
              <button
                key={surah.id}
                type="button"
                className={styles.moreCard}
                onClick={() => onSelectSurah(surah)}
              >
                <span className={styles.moreGlyph} dir="rtl" aria-hidden="true">
                  {surah.nameArabic}
                </span>
                <span className={styles.nodeName}>{surah.nameSimple}</span>
                <span className={styles.moreMeta}>{t('kids.versesCount', { count: surah.versesCount })}</span>
                {(stars[surah.id] ?? 0) > 0 && <Check size={14} className={styles.moreCheck} aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
