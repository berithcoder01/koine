// src/features/apostila/apostilaTypes.ts

export type ApostilaStepType =
  | 'intro'
  | 'word_intro'
  | 'write_practice'
  | 'dictation'
  | 'alphabet_trace'
  | 'read_aloud'
  | 'pause';

export interface ApostilaStep {
  id: string;
  type: ApostilaStepType;
  narration: string;
  audioUrl?: string;
  displayText?: string;
  greekForm?: string;
  transliteration?: string;
  pronunciation?: string;
  translation?: string;
  etymology?: string;
  contextVerse?: string;
  contextVerseText?: string;
  writeRepetitions?: number;
  writeInstruction?: string;
  revealAfterConfirm?: boolean;
  showStrokeOrder?: boolean;
  showPaperBadge?: boolean;
  showVoiceBadge?: boolean;
  showGreekLarge?: boolean;
}

export interface ApostilaLesson {
  id: string;
  lessonNumber: number;
  title: string;
  description: string;
  apostilaPdfPage: number;
  xpReward: number;
  estimatedMinutes: number;
  steps: ApostilaStep[];
  requiresPrevious?: boolean;
}

export interface ApostilaSessionState {
  lesson: ApostilaLesson;
  currentStepIndex: number;
  currentStep: ApostilaStep;
  totalSteps: number;
  progressPercent: number;
  writeCount: number;
  isDictationRevealed: boolean;
  isCompleted: boolean;
  isAudioPlaying: boolean;
}