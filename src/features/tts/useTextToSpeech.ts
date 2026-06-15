import { useCallback } from 'react';
import { Capacitor } from '@capacitor/core';

interface SpeakOptions {
  text: string;
  lang?: string;
}

export function useTextToSpeech() {
  const speak = useCallback(async (textOrOptions: string | SpeakOptions) => {
    if (!textOrOptions) return;

    const opts: SpeakOptions = typeof textOrOptions === 'string'
      ? { text: textOrOptions }
      : textOrOptions;

    const text = opts.text;
    const lang = opts.lang ?? 'el-GR';

    try {
      if (Capacitor.isNativePlatform()) {
        const { TextToSpeech } = await import('@capacitor-community/text-to-speech');
        await TextToSpeech.speak({
          text,
          lang,
          rate: 0.9,
          pitch: 1.0,
          volume: 1.0,
        });
      } else if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.warn('[TTS] Failed to speak:', err);
    }
  }, []);

  return { speak };
}
