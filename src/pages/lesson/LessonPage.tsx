// src/pages/lesson/LessonPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppNavigation } from '@/hooks/useNavigation';
import { useProgressStore } from '@/store/progressStore';
import { useGamificationStore } from '@/store/gamificationStore';
import { dbQueries } from '@/services/database/queries';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ExerciseFeedback } from '@/components/exercises/ExerciseFeedback';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { XP_VALUES } from '@/constants/config';
import { LessonSummary } from './components/LessonSummary';
import { FlashcardExercise } from './exercises/FlashcardExercise';
import { MultipleChoiceExercise } from './exercises/MultipleChoiceExercise';
import { WordOrderExercise } from './exercises/WordOrderExercise';
import { FillBlankExercise } from './exercises/FillBlankExercise';
import { TPRExercise } from './exercises/TPRExercise';
import { NarrationExercise } from './exercises/NarrationExercise';

interface ExerciseResult {
  exerciseId: string;
  isCorrect: boolean;
  xpEarned: number;
}

export const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigation = useAppNavigation();
  const { markLessonComplete } = useProgressStore();
  const { addXP } = useGamificationStore();

  const [exercises, setExercises] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastResult, setLastResult] = useState<{
    isCorrect: boolean;
    explanation?: string;
    correctAnswer?: string;
    xpEarned: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [finalXP, setFinalXP] = useState(0);

  useEffect(() => {
    if (lessonId) loadExercises(lessonId);
  }, [lessonId]);

  const loadExercises = async (moduleId: string) => {
    const data = await dbQueries.getExercisesByModule(moduleId);
    if (data.length === 0) {
      setExercises(generatePlaceholderExercises(moduleId));
    } else {
      setExercises(data);
    }
    setIsLoading(false);
  };

  const generatePlaceholderExercises = (moduleId: string) => [
    { id: `${moduleId}-ex1`, module_id: moduleId, exercise_order: 1, type: 'flashcard', question_greek: 'λόγος', correct_answer: JSON.stringify('palavra'), explanation: 'λόγος = palavra, discurso', xp_reward: 2 },
    { id: `${moduleId}-ex2`, module_id: moduleId, exercise_order: 2, type: 'multiple_choice', question_pt: 'Como se diz "amor" em grego?', options: JSON.stringify(['ἀγάπη', 'εἰρήνη', 'χάρις', 'ζωή']), correct_answer: JSON.stringify('ἀγάπη'), explanation: 'ἀγάπη = amor', xp_reward: 2 },
    { id: `${moduleId}-ex3`, module_id: moduleId, exercise_order: 3, type: 'word_order', question_pt: 'Monte a frase: "Deus é amor"', correct_answer: JSON.stringify(['ὁ', 'θεός', 'ἀγάπη', 'ἐστίν']), explanation: 'ὁ θεός ἀγάπη ἐστίν', xp_reward: 2 },
    { id: `${moduleId}-ex4`, module_id: moduleId, exercise_order: 4, type: 'fill_blank', question_pt: 'Complete: ἐγώ ___ μαθητής', correct_answer: JSON.stringify('εἰμί'), explanation: 'ἐγώ εἰμί = eu sou', xp_reward: 2 },
    { id: `${moduleId}-ex5`, module_id: moduleId, exercise_order: 5, type: 'flashcard', question_greek: 'εἰρήνη', correct_answer: JSON.stringify('paz'), explanation: 'εἰρήνη = paz', xp_reward: 2 },
  ];

  const handleAnswer = (isCorrect: boolean, explanation?: string, correctAnswer?: string) => {
    const xpEarned = isCorrect ? XP_VALUES.EXERCISE_CORRECT : 0;
    const result: ExerciseResult = {
      exerciseId: exercises[currentIndex].id,
      isCorrect,
      xpEarned,
    };
    setResults(prev => [...prev, result]);
    setLastResult({ isCorrect, explanation, correctAnswer, xpEarned });
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishLesson();
    }
  };

  const finishLesson = () => {
    const correctCount = results.filter(r => r.isCorrect).length;
    const score = Math.round((correctCount / exercises.length) * 100);
    const xpFromExercises = results.reduce((s, r) => s + r.xpEarned, 0);
    const lessonXP = score >= 80 ? XP_VALUES.LESSON_COMPLETE : Math.floor(XP_VALUES.LESSON_COMPLETE * 0.5);
    const totalEarned = xpFromExercises + lessonXP;

    if (lessonId) {
      markLessonComplete(lessonId, score);
    }
    addXP(totalEarned);
    setFinalXP(totalEarned);
    setIsComplete(true);
  };

  if (isLoading) return <LoadingScreen message="Preparando lição..." />;

  const currentExercise = exercises[currentIndex];
  const progress = (currentIndex / exercises.length) * 100;

  if (isComplete) {
    const correctCount = results.filter(r => r.isCorrect).length;
    const score = Math.round((correctCount / exercises.length) * 100);
    return (
      <LessonSummary
        score={score}
        correctCount={correctCount}
        totalCount={exercises.length}
        xpEarned={finalXP}
        onContinue={navigation.goToTrail}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center gap-4 px-4 pt-safe pt-4 pb-3 bg-surface shadow-sm">
        <button onClick={navigation.goBack} className="text-textSecondary text-2xl">✕</button>
        <div className="flex-1">
          <ProgressBar value={progress} color="bg-primary" height={6} />
        </div>
        <span className="text-xs text-textSecondary font-medium">
          {currentIndex + 1}/{exercises.length}
        </span>
      </div>

      <div className="flex-1 p-4">
        {currentExercise && renderExercise(currentExercise, handleAnswer)}
      </div>

      {showFeedback && lastResult && (
        <ExerciseFeedback
          isCorrect={lastResult.isCorrect}
          explanation={lastResult.explanation}
          correctAnswer={lastResult.correctAnswer}
          xpEarned={lastResult.xpEarned}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

function renderExercise(
  exercise: any,
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void,
) {
  let correctAnswer: any;
  let options: string[] = [];

  try { correctAnswer = JSON.parse(exercise.correct_answer); } catch { correctAnswer = exercise.correct_answer; }
  try { options = exercise.options ? JSON.parse(exercise.options) : []; } catch { options = []; }

  switch (exercise.type) {
    case 'flashcard':
      return <FlashcardExercise exercise={exercise} onAnswer={onAnswer} />;
    case 'multiple_choice':
      return <MultipleChoiceExercise exercise={exercise} options={options} correctAnswer={correctAnswer} onAnswer={onAnswer} />;
    case 'word_order':
      return <WordOrderExercise exercise={exercise} correctAnswer={correctAnswer} onAnswer={onAnswer} />;
    case 'fill_blank':
      return <FillBlankExercise exercise={exercise} correctAnswer={correctAnswer} onAnswer={onAnswer} />;
    case 'tpr_digital':
      return <TPRExercise exercise={exercise} onAnswer={onAnswer} />;
    case 'narration':
      return <NarrationExercise exercise={exercise} onAnswer={onAnswer} />;
    default:
      return <FlashcardExercise exercise={exercise} onAnswer={onAnswer} />;
  }
}
