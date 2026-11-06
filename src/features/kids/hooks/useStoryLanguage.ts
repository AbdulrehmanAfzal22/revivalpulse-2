import { useCallback, useMemo, useState } from 'react';
import type { LocalizedText } from 'types/kidsStories.types';

export type StoryLanguage = 'en' | 'ur';

const STORY_LANG_STORAGE_KEY = 'kids.story-language';

function getStoredLanguage(): StoryLanguage {
  try { const stored = window.localStorage.getItem(STORY_LANG_STORAGE_KEY); return stored === 'ur' ? 'ur' : 'en'; } catch { return 'en'; }
}

/** Bilingual helper: prefer the requested language, fall back to English. */
export function localText(text: LocalizedText, language: StoryLanguage): string {
  return text[language]?.trim() ? text[language] as string : text.en;
}

/** Direction follows the displayed field, including untranslated fallbacks. */
export function localDirection(text: LocalizedText, language: StoryLanguage): 'rtl' | 'ltr' {
  return language === 'ur' && !!text.ur?.trim() ? 'rtl' : 'ltr';
}

/** English/Urdu toggle scoped to the Stories feature (not the global UI language). */
export function useStoryLanguage() {
  const [language, setLanguageState] = useState<StoryLanguage>(getStoredLanguage);

  const setLanguage = useCallback((next: StoryLanguage) => {
    setLanguageState(next);
    try { window.localStorage.setItem(STORY_LANG_STORAGE_KEY, next); } catch { /* Reading still works when storage is unavailable. */ }
  }, []);

  return useMemo(() => ({ language, setLanguage }), [language, setLanguage]);
}