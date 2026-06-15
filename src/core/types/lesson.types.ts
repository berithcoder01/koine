// src/types/lesson.types.ts

export type ExerciseType =
  | 'flashcard'
  | 'multiple_choice'
  | 'word_order'
  | 'fill_blank'
  | 'tpr_digital'
  | 'narration'
  | 'canvas'
  | 'matching_pairs'
  | 'flashcard_confirm'
  | 'typing_copy'
  | 'typing_translate';

export interface Exercise {
  id: string;
  type: ExerciseType;
  lessonId: string;
  order: number;
  content: ExerciseContent;
  xpReward: number;
}

export interface ExerciseContent {
  question?: string;
  questionGreek?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  imageUrl?: string;
  audioUrl?: string;
  targetLetter?: string;
  hintText?: string;
}

export interface LessonResult {
  lessonId: string;
  score: number;
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  isPerfect: boolean;
  completedAt: Date;
}

export type LearningUnitType =
  | 'letter'
  | 'phoneme'
  | 'word'
  | 'grammar_rule'
  | 'phrase'
  | 'verse_chunk';

export interface PhaseExercise {
  type: ExerciseType;
  questionPT?: string;
  questionGreek?: string;
  correctAnswer: string | string[];
  options?: string[];
  explanation: string;
  xpReward?: number;
  targetLetter?: string; // used by 'canvas' exercises; falls back to unit.greekForm when absent
}

export interface LearningUnit {
  id: string;
  moduleId: string;
  order: number;
  type: LearningUnitType;
  greekForm: string;
  transliteration?: string;
  glossPT: string;
  phoneticSound?: string;
  explanation: string;
  mnemonicHint?: string;
  audioUrl?: string;
  imageUrl?: string;
  contextVerse?: string;
  contextReference?: string;
  phase2_recognition: PhaseExercise[];
  phase3_association: PhaseExercise[];
  phase4_recall: PhaseExercise[];
  phase5_application?: PhaseExercise[];
  srsKey: string;
}

export interface ModuleSession {
  moduleId: string;
  units: LearningUnit[];
  currentUnitIndex: number;
  currentPhase: 1 | 2 | 3 | 4 | 5 | 6;
  currentExerciseIndex: number;
  results: SessionResult[];
  startedAt: Date;
}

export interface SessionResult {
  unitId: string;
  phase: number;
  exerciseType: ExerciseType;
  isCorrect: boolean;
  xpEarned: number;
}

export type MasteryLevel = 'reinforcement' | 'review' | 'mastered';

export interface ModuleProgress {
  moduleId: string;
  masteryLevel: MasteryLevel;
  score: number;
  completedAt: string;
  itemsForSRS: string[];
}
