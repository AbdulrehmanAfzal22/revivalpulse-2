import { useEffect, useMemo, useState } from 'react';
import { Check, Lock, Play, Sparkles, Swords } from 'lucide-react';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import Typography from 'components/ui/Typography';
import LetterStars from './LetterStars';
import { isStationUnlocked } from 'data/kids/letterStations';
import type { ResolvedStation } from 'data/kids/letterStations';
import type { AlphabetLetter } from 'types/kids.types';
import useTranslation from 'hooks/useTranslation';
import styles from './LetterJourneyMap.module.css';

export interface LetterJourneyMapProps {
  stations: ResolvedStation[];
  /** Best stars per letter id. */
  stars: Record<string, number>;
  clearedIds: string[];
  onOpenLetter: (letter: AlphabetLetter) => void;
  onOpenBoss: (station: ResolvedStation) => void;
}

/** The first station that is open but not yet beaten — where the child "is". */
function currentStation(stations: ResolvedStation[], clearedIds: string[]): ResolvedStation | undefined {
  return stations.find((station) => isStationUnlocked(stations, station, clearedIds) && !clearedIds.includes(station.id));
}

export default function LetterJourneyMap({ stations, stars, clearedIds, onOpenLetter, onOpenBoss }: LetterJourneyMapProps) {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(
    () => stations.find((station) => station.id === activeId) ?? currentStation(stations, clearedIds) ?? stations[0],
    [stations, activeId, clearedIds]
  );

  // Follow the journey: once the station being viewed is beaten, step to the next open one.
  useEffect(() => {
    if (!activeId || !clearedIds.includes(activeId)) return;
    const next = currentStation(stations, clearedIds);
    if (next) setActiveId(next.id);
  }, [activeId, clearedIds, stations]);

  if (!active) return null;

  const activeUnlocked = isStationUnlocked(stations, active, clearedIds);
  const isActiveCleared = clearedIds.includes(active.id);
  const allFound = active.letters.every((letter) => (stars[letter.id] ?? 0) > 0);
  const foundCount = active.letters.filter((letter) => (stars[letter.id] ?? 0) > 0).length;
  const nextStation = stations[active.index + 1];

  return (
    <div className={styles.wrapper}>
      <div className={styles.rail} role="tablist" aria-label={t('kids.modeJourney')}>
        {stations.map((station) => {
          const unlocked = isStationUnlocked(stations, station, clearedIds);
          const cleared = clearedIds.includes(station.id);
          const isActive = station.id === active.id;
          return (
            <button
              key={station.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={[
                styles.station,
                isActive && styles.stationActive,
                cleared && styles.stationCleared,
                !unlocked && styles.stationLocked,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActiveId(station.id)}
            >
              <span className={styles.stationKicker}>
                {t('kids.stationOf', { current: station.index + 1, total: stations.length })}
              </span>
              <span className={styles.stationName}>{station.name}</span>
              <span className={styles.stationGlyphs} dir="rtl" aria-hidden="true">
                {station.letters.map((letter) => letter.arabic).join(' ')}
              </span>
              <span className={styles.stationBar} aria-hidden="true">
                <i
                  className={styles.stationBarFill}
                  style={{ width: `${(station.letters.filter((l) => (stars[l.id] ?? 0) === 3).length / station.letters.length) * 100}%` }}
                />
              </span>
              {cleared && (
                <span className={styles.stationTag}>
                  <Check size={12} aria-hidden="true" /> {t('kids.stationCleared')}
                </span>
              )}
              {!unlocked && <Lock size={14} className={styles.stationLock} aria-hidden="true" />}
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
            <Lock size={16} aria-hidden="true" /> {t('kids.stationLockedHint')}
          </Typography>
        )}

        <div className={styles.trail}>
          {active.letters.map((letter, index) => {
            const count = stars[letter.id] ?? 0;
            const isNext = activeUnlocked && count === 0 && index === foundCount;
            return (
              <div className={styles.nodeGroup} key={letter.id}>
                <button
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
                  onClick={() => onOpenLetter(letter)}
                  aria-label={
                    activeUnlocked
                      ? t('kids.openLetterLab', { letter: letter.transliteration })
                      : t('kids.lockedLetter')
                  }
                >
                  {!activeUnlocked && <Lock size={14} className={styles.nodeLock} aria-hidden="true" />}
                  {count === 3 && <Sparkles size={14} className={styles.nodeSparkle} aria-hidden="true" />}
                  <span className={styles.nodeGlyph} dir="rtl" aria-hidden="true">
                    {letter.arabic}
                  </span>
                  <span className={styles.nodeName}>{letter.transliteration}</span>
                  <LetterStars count={count} size="sm" className={styles.nodeStars} />
                </button>
                {index < active.letters.length - 1 && (
                  <span className={styles.connector} aria-hidden="true">
                    &#10230;
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className={[styles.boss, isActiveCleared && styles.bossCleared, !allFound && styles.bossWaiting].filter(Boolean).join(' ')}>
          <div className={styles.bossCopy}>
            <span className={styles.bossIcon} aria-hidden="true">
              <Swords size={26} />
            </span>
            <span>
              <Typography variant="h4" as="p">
                {t('kids.bossChallenge')}: {active.name}
              </Typography>
              <Typography variant="caption" muted>
                {isActiveCleared
                  ? t('kids.stationCleared')
                  : allFound
                    ? t('kids.bossBlurb', { rounds: active.letters.length + 2, lives: 3, seconds: 12 })
                    : t('kids.bossLockedHint', { count: active.letters.length })}
              </Typography>
            </span>
          </div>

          {isActiveCleared && nextStation ? (
            <Button variant="secondary" onClick={() => setActiveId(nextStation.id)}>
              {nextStation.name}
            </Button>
          ) : (
            <Button
              variant="primary"
              leadingIcon={<Play size={16} />}
              disabled={!allFound}
              onClick={() => onOpenBoss(active)}
            >
              {t('kids.bossStart')}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
