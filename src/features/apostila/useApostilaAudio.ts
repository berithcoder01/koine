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

export function useApostilaAudio(lessonId: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [manifest, setManifest] = useState<AudioManifest | null>(null);

  useEffect(() => {
    fetch('/audio/manifest.json')
      .then(res => res.json())
      .then((data: AudioManifest) => {
        setManifest(data);
        setIsLoaded(true);
      })
      .catch(() => {
        setIsLoaded(true);
      });
  }, []);

  const playStep = useCallback((stepNumber: number) => {
    if (!manifest) return;
    const lesson = manifest.lessons[lessonId];
    if (!lesson) return;
    const step = lesson.steps[String(stepNumber)];
    if (!step) return;

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(lesson.file);
      audio.preload = 'auto';
      audio.currentTime = step.start;
      audio.onended = () => setIsPlaying(false);
      audio.ontimeupdate = () => {
        if (audio.currentTime >= step.end) {
          audio.pause();
          setIsPlaying(false);
        }
      };
      audio.onerror = () => setIsPlaying(false);
      audio.play();
      audioRef.current = audio;
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [lessonId, manifest]);

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

  return { playStep, stop, isPlaying, isAudioAvailable: !!manifest?.lessons[lessonId] };
}
