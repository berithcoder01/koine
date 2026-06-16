import { useState, useEffect, useCallback } from 'react';
import { APOSTILA_LESSONS } from '../../content/apostila/lessons';
import { ApostilaSessionState } from './apostilaTypes';
import { useProgressStore } from '../progress/progressStore';
import { useGamificationActions } from '../gamification/useGamificationActions';
import { useApostilaAudio } from './useApostilaAudio';

export function useApostilaSession(lessonId: string) {
  const lesson = APOSTILA_LESSONS.find(l => l.id === lessonId);
  const { markApostilaLessonComplete } = useProgressStore();
  const { onApostilaComplete } = useGamificationActions();
  const { playStep, stop: stopAudio, isPlaying: isAudioPlayingAudio } = useApostilaAudio(lessonId);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [writeCount, setWriteCount] = useState(0);
  const [isDictationRevealed, setIsDictationRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  if (!lesson) return null;

  const currentStep = lesson.steps[currentStepIndex];
  const totalSteps = lesson.steps.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const playNarration = useCallback(() => {
    stopAudio();

    const stepNumber = currentStepIndex + 1;
    playStep(stepNumber);
    setIsAudioPlaying(true);
  }, [currentStepIndex, playStep, stopAudio]);

  useEffect(() => {
    stopAudio();
    setWriteCount(0);
    setIsDictationRevealed(false);
    
    // Auto-play audio on step change
    const timer = setTimeout(() => playNarration(), 100);
    return () => clearTimeout(timer);
  }, [currentStepIndex, playNarration]);

  useEffect(() => {
    if (!isAudioPlayingAudio) {
      setIsAudioPlaying(false);
    }
  }, [isAudioPlayingAudio]);

  const incrementWriteCount = useCallback(() => {
    if (!currentStep) return;
    const target = currentStep.writeRepetitions ?? 8;
    const newCount = writeCount + 1;
    setWriteCount(newCount);

    if (newCount >= target) {
      setTimeout(() => advanceStep(), 1500);
    }
  }, [writeCount, currentStep]);

  const revealDictation = useCallback(() => {
    setIsDictationRevealed(true);
  }, []);

  const advanceStep = useCallback(() => {
    if (currentStepIndex >= totalSteps - 1) {
      completeLesson();
      return;
    }
    stopAudio();
    setCurrentStepIndex(prev => prev + 1);
  }, [currentStepIndex, totalSteps, stopAudio]);

  const completeLesson = useCallback(async () => {
    setIsCompleted(true);
    stopAudio();
    markApostilaLessonComplete(lesson.id);
    await onApostilaComplete(lesson.id, lesson.xpReward);
  }, [lesson, markApostilaLessonComplete, onApostilaComplete, stopAudio]);

  const playCurrentAudio = useCallback(() => {
    playNarration();
  }, [playNarration]);

  const state: ApostilaSessionState = {
    lesson,
    currentStepIndex,
    currentStep,
    totalSteps,
    progressPercent,
    writeCount,
    isDictationRevealed,
    isCompleted,
    isAudioPlaying,
  };

  return {
    state,
    incrementWriteCount,
    revealDictation,
    advanceStep,
    completeLesson,
    playCurrentAudio,
  };
}