import type { CSSProperties } from 'react';
import { Pause, Play } from 'lucide-react';
import Typography from 'components/ui/Typography';
import StoryScene from 'features/kids/components/StoryScene';
import useTranslation from 'hooks/useTranslation';
import type { SceneSpec } from 'features/kids/storyScenes/sceneTypes';
import type { StoryLanguage } from 'features/kids/hooks/useStoryLanguage';
import styles from './StoryParagraphPanel.module.css';

export interface StoryParagraphPanelProps {
  scene: SceneSpec;
  /** The story's accent colour, so each story's panels stay recognisably its own. */
  accent: string;
  /** Painted backdrop for this paragraph, once one has been produced. */
  painting?: string | null;
  /** This panel's id (`yusuf/the-dream/p2`); its picture is drawn from it. */
  seed: string;
  /** This paragraph's sentences, for the read-along highlight. */
  sentences: string[];
  /** Where this paragraph starts in the part's flattened sentence list. */
  sentenceStart: number;
  activeSentence: number | null;
  panelIndex: number;
  totalPanels: number;
  isPlaying: boolean;
  /** False when the browser has no voice and no clip exists for this panel. */
  canListen: boolean;
  language: StoryLanguage;
  /** Which time this subject appears in the part, so repeats change the shot. */
  frame: number;
  onToggle: () => void;
}

/**
 * One page of the comic: the picture of this moment on one side, its
 * paragraph on the other, the sides swapping as the story goes down the page.
 * Tapping the picture reads that paragraph aloud.
 */
export default function StoryParagraphPanel({
  scene,
  accent,
  painting,
  seed,
  sentences,
  sentenceStart,
  activeSentence,
  panelIndex,
  totalPanels,
  isPlaying,
  canListen,
  language,
  frame,
  onToggle,
}: StoryParagraphPanelProps) {
  const { t } = useTranslation();
  const isRtl = language === 'ur';
  const alt = `${scene.alt} — part ${panelIndex + 1} of ${totalPanels}`;

  return (
    <div
      className={[styles.panel, panelIndex % 2 === 1 ? styles.pictureEnd : styles.pictureStart].join(' ')}
      style={{ '--panel-accent': accent } as CSSProperties}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className={styles.picture}>
        <StoryScene scene={scene} accent={accent} painting={painting ?? undefined} seed={seed} frame={frame} className={styles.scene} />
        {canListen && (
          <button
            type="button"
            className={[styles.listenButton, isPlaying && styles.listenButtonActive].filter(Boolean).join(' ')}
            onClick={onToggle}
            aria-pressed={isPlaying}
            aria-label={`${t('kids.listenToStory')}: ${alt}`}
          >
            {isPlaying ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
          </button>
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.panelNumber} style={{ backgroundColor: accent }} aria-hidden="true">
          {panelIndex + 1}
        </span>
        <Typography variant="body" as="p" className={styles.text}>
          {sentences.map((sentence, sentenceIndex) => {
            const isActive = activeSentence === sentenceStart + sentenceIndex;
            return (
              <span key={sentenceIndex} className={isActive ? styles.sentenceActive : undefined}>
                {sentence}{' '}
              </span>
            );
          })}
        </Typography>
      </div>
    </div>
  );
}
