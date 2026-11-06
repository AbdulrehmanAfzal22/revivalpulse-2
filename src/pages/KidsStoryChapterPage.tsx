import NarratorControls from 'features/speech/NarratorControls';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Gem, Play, ScrollText, Square } from 'lucide-react';
import Card from 'components/ui/Card';
import Typography from 'components/ui/Typography';
import EmptyState from 'components/feedback/EmptyState';
import StoryScene from 'features/kids/components/StoryScene';
import StoryParagraphPanel from 'features/kids/components/StoryParagraphPanel';
import StoryLanguageToggle from 'features/kids/components/StoryLanguageToggle';
import KidsBackButton from 'features/kids/components/KidsBackButton';
import { useNarration, toSentences } from 'features/kids/hooks/useNarration';
import { resolvePanelScenes, resolveScene } from 'features/kids/storyScenes/scenes';
import { clipFor, panelSceneId, paintingFor, useStoryMedia } from 'features/kids/storyScenes/storyMedia';
import { useKidsProgressStore } from 'stores/kidsProgressStore';
import { getKidsStoryV2 } from 'data/kids/storiesV2';
import { getSahabiV2 } from 'data/kids/sahabiV2';
import {
  buildKidsStoryChapterPath,
  buildKidsStoryChaptersPath,
  buildKidsSahabiChapterPath,
  buildKidsSahabiChaptersPath,
} from 'constants/routes';
import useTranslation from 'hooks/useTranslation';
import { localText, localDirection, useStoryLanguage } from 'features/kids/hooks/useStoryLanguage';
import styles from './KidsStoryChapterPage.module.css';

function resolveStory(storyId: string) {
  return getKidsStoryV2(storyId) ?? getSahabiV2(storyId);
}

function isSahabi(storyType: string): boolean {
  return storyType === 'sahabi';
}

function StoryCheck({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const options = useMemo(() => ['Patience and trust in Allah', 'Giving up when life is hard', 'Being proud of ourselves'].sort(() => Math.random() - 0.5), []);
  const correct = selected === 'Patience and trust in Allah';

  return (
    <Card elevation="raised" className={styles.storyCheck}>
      <Typography variant="h3" as="h2">What did we learn?</Typography>
      <Typography variant="body">Choose the best lesson from this story.</Typography>
      <div className={styles.checkOptions}>
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === 'Patience and trust in Allah';
          return (
            <button
              key={option}
              type="button"
              className={[styles.checkOption, selected && isCorrect && styles.checkCorrect, isSelected && !isCorrect && styles.checkWrong].filter(Boolean).join(' ')}
              onClick={() => {
                setSelected(option);
                if (isCorrect) window.setTimeout(onSuccess, 700);
              }}
              disabled={selected !== null}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected && !correct && (
        <button type="button" className={styles.tryAgain} onClick={() => setSelected(null)}>Try again</button>
      )}
      {selected && <span className={styles.checkFeedback} role="status">{correct ? t('kids.correct') : 'Almost! The best lesson is "Patience and trust in Allah."'}</span>}
    </Card>
  );
}

/** Visible fallback notice shown when Urdu isn't ready for a story yet. */
function UrduFallbackNotice() {
  const { t } = useTranslation();
  return (
    <div className={styles.urduNotice} role="status">
      {t('kids.urduComingSoon')}
    </div>
  );
}

/** Phase 3 — a single chapter detail page (Prophets and Sahabah share this). */
export default function KidsStoryChapterPage() {
  const { storyId, chapterId } = useParams<{ storyId: string; chapterId: string }>();
  const story = resolveStory(storyId ?? '');
  const { t } = useTranslation();
  const { language, setLanguage } = useStoryLanguage();
  const markContentViewed = useKidsProgressStore((state) => state.markContentViewed);
  const [completed, setCompleted] = useState(false);
  const storyMissingUrdu = story ? !story.chapters.some((c) => c.title.ur?.trim()) : false;

  const index = story && chapterId ? story.chapters.findIndex((chapter) => chapter.id === chapterId) : -1;
  const chapter = story && index >= 0 ? story.chapters[index] : undefined;

  const paragraphs = useMemo(
    () => (chapter ? chapter.paragraphs.map((paragraph) => localText(paragraph, language)) : []),
    [chapter, language],
  );
  const media = useStoryMedia(storyId ?? '');
  const scene = useMemo(() => resolveScene(chapter, story?.illustrationSymbol ?? ''), [chapter, story]);
  // One picture per paragraph, chosen by that paragraph's own words, and never
  // a scene an earlier paragraph in this part already showed unless the words
  // truly are about it again — in which case `frame` records the repeat so the
  // second showing is drawn from a different distance.
  const panelScenes = useMemo(
    () => (chapter ? resolvePanelScenes(chapter, story?.illustrationSymbol ?? '', storyId) : []),
    [chapter, story, storyId],
  );
  // Per-paragraph recorded narration and painted art; absent means the drawn
  // scene shows and the browser voice reads the words.
  const panelMedia = useMemo(() => {
    if (!chapter) return { clips: [], paintings: [] };
    return {
      clips: chapter.paragraphs.map((_, index) => {
        const sceneId = panelSceneId(chapter.id, index);
        const hasUrdu = !!chapter.paragraphs[index]?.ur?.trim();
        return clipFor(storyId ?? '', media.storyClips, sceneId, language === 'ur' && hasUrdu ? 'ur' : 'en', false);
      }),
      paintings: chapter.paragraphs.map((_, index) =>
        paintingFor(storyId ?? '', media.storyPaintings, panelSceneId(chapter.id, index)),
      ),
    };
  }, [chapter, storyId, media.storyClips, media.storyPaintings, language]);
  const paragraphLanguages = useMemo(() => chapter?.paragraphs.map(p => language === 'ur' && p.ur?.trim() ? 'ur-PK' : 'en-US') ?? [], [chapter, language]);
  const narration = useNarration(paragraphs, language, { clips: panelMedia.clips, languages: paragraphLanguages });
  // Global sentence numbering has to match useNarration's own flattening, so the
  // reader can highlight the sentence currently being spoken.
  const sentenceGroups = useMemo(() => {
    let start = 0;
    return paragraphs.map((paragraph) => {
      const sentences = toSentences(paragraph);
      const group = { sentences, start };
      start += sentences.length;
      return group;
    });
  }, [paragraphs]);

  if (!story) {
    return <EmptyState title={t('emptyState.kids.storyNotFound')} />;
  }

  const showUrduFallback = language === 'ur' && storyMissingUrdu;

  if (!chapter) {
    return <EmptyState title={t('emptyState.kids.storyNotFound')} />;
  }

  const previous = index > 0 ? story.chapters[index - 1] : undefined;
  const next = index < story.chapters.length - 1 ? story.chapters[index + 1] : undefined;
  const isFinalChapter = !next;
  const textDirection = localDirection(chapter.title, language);
  const pathFor = (targetChapterId: string) =>
    isSahabi(story.type)
      ? buildKidsSahabiChapterPath(story.id, targetChapterId)
      : buildKidsStoryChapterPath(story.id, targetChapterId);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <StoryLanguageToggle language={language} onChange={setLanguage} />
        <KidsBackButton to={isSahabi(story.type) ? buildKidsSahabiChaptersPath(story.id) : buildKidsStoryChaptersPath(story.id)} />
      </div>

      <NarratorControls />
      {narration.error && <p role="status">{narration.error}</p>}
      <div className={styles.scenePanel}>
        <StoryScene
          scene={scene}
          accent={story.accentColor}
          painting={scene.painting}
          seed={`${storyId}/${chapter.id}/cover`}
          className={styles.sceneMedia}
        />

        <div className={styles.sceneScrim} aria-hidden="true" />

        {narration.supported && (
          <button
            type="button"
            className={[styles.narrateButton, narration.isSpeaking && styles.narrateButtonActive].filter(Boolean).join(' ')}
            onClick={narration.toggle}
          >
            {narration.isSpeaking ? <Square size={15} fill="currentColor" aria-hidden="true" /> : <Play size={15} fill="currentColor" aria-hidden="true" />}
            <span>{narration.isSpeaking ? t('kids.stopReading') : t('kids.listenToStory')}</span>
          </button>
        )}

        <div className={styles.sceneCaption} dir={textDirection}>
          <span className={styles.partPill} style={{ backgroundColor: story.accentColor }}>
            {t('kids.storyPart', { current: index + 1, total: story.chapters.length })}
          </span>
          <Typography variant="h2" as="h1" className={styles.sceneTitle}>
            {localText(chapter.title, language)}
          </Typography>
          <span className={styles.sceneStoryName}>{story.nameEnglish}</span>
        </div>
      </div>

      <div className={styles.chapterRail} aria-label={t('kids.chapters')}>
        {story.chapters.map((item, chapterIndex) => (
          <Link key={item.id} to={pathFor(item.id)} className={chapterIndex === index ? styles.chapterDotActive : styles.chapterDot} aria-label={`${t('kids.chapters')} ${chapterIndex + 1}`} />
        ))}
      </div>

      {showUrduFallback && <UrduFallbackNotice />}

      <div className={styles.panels}>
        {sentenceGroups.map((group, paragraphIndex) => (
          <StoryParagraphPanel
            key={`${chapter.id}-${paragraphIndex}`}
            scene={panelScenes[paragraphIndex]?.spec ?? scene}
            accent={story.accentColor}
            painting={panelMedia.paintings[paragraphIndex]}
            seed={`${storyId}/${chapter.id}/p${paragraphIndex}`}
            frame={panelScenes[paragraphIndex]?.frame ?? 0}
            sentences={group.sentences}
            sentenceStart={group.start}
            activeSentence={narration.activeSentence}
            panelIndex={paragraphIndex}
            totalPanels={sentenceGroups.length}
            isPlaying={narration.playingParagraph === paragraphIndex}
            canListen={narration.supported || Boolean(panelMedia.clips[paragraphIndex])}
            language={paragraphLanguages[paragraphIndex]?.startsWith('ur') ? 'ur' : 'en'}
            onToggle={() => narration.toggleParagraph(paragraphIndex, panelMedia.clips[paragraphIndex])}
          />
        ))}
      </div>

      {chapter.ayahNote && (
        <div className={styles.ayahRibbon} dir={localDirection(chapter.ayahNote, language)}>
          <span className={styles.ayahRibbonMark} aria-hidden="true" />
          <div className={styles.ayahRibbonBody}>
            <div className={styles.ayahNoteTitle}>{t('kids.ayahExplained')}</div>
            <Typography variant="body" as="p">
              {localText(chapter.ayahNote, language)}
            </Typography>
          </div>
        </div>
      )}

      {chapter.lesson && (
        <Card elevation="raised" className={styles.lessonCard}>
          <div className={styles.lessonTitle}>
            <Gem size={16} aria-hidden="true" />
            <span>Lesson</span>
          </div>
          <Typography variant="body" as="p" dir={localDirection(chapter.lesson, language)}>
            {localText(chapter.lesson, language)}
          </Typography>
        </Card>
      )}

      <details className={styles.sourcesDetails}>
        <summary className={styles.sourcesSummary}>
          <ScrollText size={16} aria-hidden="true" />
          <span>{t('kids.storySources')}</span>
        </summary>
        <div className={styles.sourcesSection}>
          {chapter.sources.map((source) => (
            <Card key={`${source.type}-${source.reference}`} elevation="raised" className={styles.sourceCard}>
              <div className={styles.sourceLabel} dir={localDirection(source.label, language)}>
                {localText(source.label, language)}
              </div>
              <div className={styles.sourceMeta}>
                <span className={styles.sourceType}>
                  {source.type === 'quran' ? t('kids.sourceQuran') : t('kids.sourceHadith')}
                </span>
                <span className={styles.sourceReference} dir="ltr">
                  {source.reference}
                </span>
                {source.needsVerification && (
                  <span className={styles.sourceWarning}>{t('kids.sourceNeedVerification')}</span>
                )}
                {source.reviewed && (
                  <span className={styles.sourceReviewed}>
                    {t('kids.sourceReviewed', { by: source.reviewedBy ?? '', date: source.reviewedDate ?? '' })}
                  </span>
                )}
              </div>
              {source.explanation && (
                <div className={styles.sourceExplanation} dir={localDirection(source.explanation, language)}>
                  {localText(source.explanation, language)}
                </div>
              )}
            </Card>
          ))}
        </div>
      </details>

      {isFinalChapter && !completed && <StoryCheck onSuccess={() => { markContentViewed('story', story.id); setCompleted(true); }} />}
      {completed && <Typography variant="body" className={styles.completedNote} role="status">Story complete! You earned a star.</Typography>}

      <div className={styles.pager}>
        {previous && (
          <Link to={pathFor(previous.id)} className={styles.pagerLink}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span className={styles.pagerStack}>
              <span className={styles.pagerLabel}>{t('kids.readPreviousChapter')}</span>
              <span className={styles.pagerTitle} dir={localDirection(previous.title, language)}>{localText(previous.title, language)}</span>
            </span>
          </Link>
        )}
        {next && (
          <Link to={pathFor(next.id)} className={[styles.pagerLink, styles.pagerNext].filter(Boolean).join(' ')}>
            <span className={styles.pagerStack}>
              <span className={styles.pagerLabel}>{t('kids.readNextChapter')}</span>
              <span className={styles.pagerTitle} dir={localDirection(next.title, language)}>{localText(next.title, language)}</span>
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
