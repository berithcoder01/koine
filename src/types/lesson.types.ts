// src/types/lesson.types.ts
export type ExerciseType = 
  | 'flashcard'
  | 'multiple_choice'
  | 'word_order'
  | 'fill_blank'
  | 'tpr_digital'
  | 'narration'
  | 'canvas';

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
  targetLetter?: string; // para canvas
  hintText?: string;
}

export interface LessonResult {
  lessonId: string;
  score: number; // 0-100
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  isPerfect: boolean;
  completedAt: Date;
}
