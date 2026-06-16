import { useRef, useState, useCallback, useEffect } from 'react';

interface StepAudio {
  start: number;
  end: number;
}

interface LessonAudio {
  file: string;
  duration: number;
  steps: Record<string, StepAudio>;
}

interface AudioManifest {
  lessons: Record<string, LessonAudio>;
}

const SHORT_ID_RE = /-(L\d+)$/;

export function useApostilaAudio(lessonId: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setIsLoaded] = useState(false);
  const [manifest, setManifest] = useState<AudioManifest | null>(null);

  // Extract L01 from apostila-L01
  const manifestKey = (lessonId && SHORT_ID_RE.test(lessonId))
    ? lessonId.match(SHORT_ID_RE)![1]
    : lessonId;
  console.log('[useApostilaAudio] lessonId=', lessonId, 'manifestKey=', manifestKey);

  useEffect(() => {
    console.log('[useApostilaAudio] Fetching manifest...');
    fetch('/audio/manifest.json', { redirect: 'follow' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        return res.json();
      })
      .then((data: AudioManifest) => {
        console.log('[useApostilaAudio] Manifest loaded:', Object.keys(data.lessons));
        setManifest(data);
        setIsLoaded(true);
      })
      .catch(err => {
        console.error('[useApostilaAudio] Failed to load manifest:', err);
        setIsLoaded(true);
      });
  }, []);

  const playStep = useCallback((stepNumber: number) => {
    console.log('[useApostilaAudio] playStep called stepNumber=', stepNumber, 'manifestKey=', manifestKey);
    if (!manifest) {
      console.warn('[useApostilaAudio] manifest not loaded');
      return;
    }
    const lesson = manifest.lessons[manifestKey];
    if (!lesson) {
      console.warn('[useApostilaAudio] lesson not found in manifest, keys=', Object.keys(manifest.lessons), 'requestedKey=', manifestKey);
      return;
    }
    console.log('[useApostilaAudio] lesson found:', lesson.file, 'duration=', lesson.duration);
    const step = lesson.steps[String(stepNumber)];
    if (!step) {
      console.warn('[useApostilaAudio] step not found, steps=', Object.keys(lesson.steps));
      return;
    }
    console.log('[useApostilaAudio] step found: start=', step.start, 'end=', step.end);

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio('/' + lesson.file);
      audio.preload = 'auto';
      audio.currentTime = step.start;
      audio.onended = () => setIsPlaying(false);
      audio.ontimeupdate = () => {
        if (audio.currentTime >= step.end) {
          audio.pause();
          setIsPlaying(false);
        }
      };
      audio.onerror = (e) => {
        console.error('[useApostilaAudio] audio.onerror:', e);
        setIsPlaying(false);
      };
      audio.play().catch(e => {
        console.error('[useApostilaAudio] play() failed:', e);
        setIsPlaying(false);
      });
      audioRef.current = audio;
      setIsPlaying(true);
    } catch (e) {
      console.error('[useApostilaAudio] playStep catch:', e);
      setIsPlaying(false);
    }
  }, [manifestKey, manifest]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { playStep, stop, isPlaying, isAudioAvailable: !!manifest?.lessons[manifestKey] };
}
