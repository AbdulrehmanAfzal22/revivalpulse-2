import { pickVoice, speechLocale } from 'features/speech/voices';
import { useNarratorPreferences } from 'features/speech/preferences';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Phase 12 — text-to-speech read-aloud for early/non-readers.
 *
 * Wraps the browser's speechSynthesis with a safe, minimal surface:
 *  - `speak(text, lang?)` cancels whatever is playing, then reads the text.
 *  - `speaking` flips true/false via the utterance's events so UI can render
 *    a live speaker state (e.g. a button that visually "plays").
 *  - `supported` is false on browsers without TTS (tests, old webviews,
 *    some Android WebViews) — callers hide the buttons entirely then.
 *  - Everything is cancelled on unmount so a child navigating away never
 *    leaves a voice talking in the background.
 *
 * NOTE: content language is currently English (see quizBank.ts review flag);
 * `lang` is passed through to the voice picker so non-English TTS can be
 * requested later without touching the hook.
 */
export interface ReadAloudController {
  supported: boolean;
  speaking: boolean;
  speak: (text: string, lang?: string) => void;
  stop: () => void;
}

export default function useReadAloud(): ReadAloudController {
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string, lang?: string) => {
      if (!supported) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const locale = speechLocale(text, lang ?? 'en-US');
      const preferences = useNarratorPreferences.getState();
      const voice = pickVoice(synth.getVoices(), locale, locale.startsWith('ur') ? preferences.urduVoice : preferences.englishVoice);
      if (!voice) return;
      utterance.lang = locale;
      utterance.voice = voice;
      utterance.rate = (locale.startsWith('ur') ? 0.9 : 0.94) * preferences.speed;
      utterance.pitch = 1;
      utteranceRef.current = utterance;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      // Chrome requires a resume() nudge after cancel() — harmless elsewhere.
      synth.speak(utterance);
      if (synth.paused) synth.resume();
    },
    [supported],
  );

  useEffect(() => stop, [stop]);

  return { supported, speaking, speak, stop };
}
