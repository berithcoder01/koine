import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { useProgressStore } from '@/features/progress/progressStore';
import { useLessonEngine } from '@/features/lesson-engine/useLessonEngine';
import { useGuidedAudio } from '@/features/audio/useGuidedAudio';
import { LoadingScreen } from '@/ui/components/LoadingScreen';
import { EmptyState } from '@/ui/components/EmptyState';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { ExerciseShell } from '@/ui/exercises/ExerciseShell';
import { ExerciseFeedback } from '@/ui/exercises/ExerciseFeedback';
import { ExposureCard } from './components/ExposureCard';
import { LessonSummary } from './components/LessonSummary';
import { useProgressSync } from '@/features/progress/useProgressSync';
import { useGamificationActions } from '@/features/gamification/useGamificationActions';
import { FlashcardExercise } from '@/ui/exercises/FlashcardExercise';
import { MultipleChoiceExercise } from '@/ui/exercises/MultipleChoiceExercise';
import { FillBlankExercise } from '@/ui/exercises/FillBlankExercise';
import { WordOrderExercise } from '@/ui/exercises/WordOrderExercise';
import { MatchingPairsExercise, parsePairsFromExercise } from '@/ui/exercises/MatchingPairsExercise';
import { TPRExercise } from '@/ui/exercises/TPRExercise';
import { CanvasExercise } from '@/ui/exercises/CanvasExercise';
import { TypingExercise } from '@/ui/exercises/TypingExercise';
import type { PhaseExercise } from '@/core/types/lesson.types';

export const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigation = useAppNavigation();
  const { markLessonComplete } = useProgressStore();
  const engine = useLessonEngine(lessonId ?? '');
  const { syncUnitProgress, syncToFirestore } = useProgressSync();
  const { onLessonComplete } = useGamificationActions();
  const gamificationApplied = useRef(false);
  const lessonCompleted = useRef(false);

  const audio = useGuidedAudio(lessonId);
  const playedUnitRef = useRef<string | null>(null);

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{
    isCorrect: boolean; explanation?: string; correctAnswer?: string; xpEarned: number;
  } | null>(null);

  useEffect(() => {
    if (lessonId) engine.initSession();
  }, [lessonId]);

  // Auto-play audio exposure group when entering Phase 1 for a new unit
  useEffect(() => {
    if (!engine.session) return;

    if (engine.isCurrentPhaseExposure()) {
      const unit = engine.getCurrentUnit();
      if (!unit) return;

      if (audio.state === 'idle' && playedUnitRef.current !== unit.id) {
        const unitNumber = engine.session.currentUnitIndex + 1;
        audio.playGroup(`phase_exp_u${unitNumber}`);
        playedUnitRef.current = unit.id;
      }
    } else {
      playedUnitRef.current = null;
      if (audio.state !== 'idle') audio.stop();
    }
  }, [
    engine.session?.currentPhase,
    engine.session?.currentUnitIndex,
    audio.state,
  ]);

  const totalExercisesInLesson = (): { completed: number; total: number } => {
    const session = engine.session;
    if (!session) return { completed: 0, total: 0 };
    let completed = 0;
    let total = 0;
    for (let ui = 0; ui < session.units.length; ui++) {
      const unit = session.units[ui];
      for (let ph = 2; ph <= 5; ph++) {
        const exercises = (() => {
          switch (ph) {
            case 2: return unit.phase2_recognition;
            case 3: return unit.phase3_association;
            case 4: return unit.phase4_recall;
            case 5: return unit.phase5_application ?? [];
            default: return [];
          }
        })();
        total += exercises.length;
        if (ui < session.currentUnitIndex ||
            (ui === session.currentUnitIndex && ph < session.currentPhase)) {
          completed += exercises.length;
        } else if (ui === session.currentUnitIndex && ph === session.currentPhase) {
          completed += Math.min(session.currentExerciseIndex, exercises.length);
        }
      }
    }
    return { completed, total };
  };

  // Session completion logic — centralizado aqui
  useEffect(() => {
    if (engine.isSessionComplete() && !lessonCompleted.current) {
      lessonCompleted.current = true;
      const session = engine.session;
      if (!session) return;

      markLessonComplete(lessonId ?? '', (() => {
        const { score } = engine.calculateMastery();
        return score;
      })());

      engine.enrollItemsInSRS();
      const { level, totalXP } = engine.calculateMastery();
      for (const unit of session.units) {
        const unitResults = session.results.filter(r => r.unitId === unit.id);
        const correct = unitResults.filter(r => r.isCorrect).length;
        const total = unitResults.length;
        const score = total > 0 ? Math.round((correct / total) * 100) : 0;
        syncUnitProgress(unit.id, session.currentPhase, score, level);
      }
      if (!gamificationApplied.current) {
        gamificationApplied.current = true;
        onLessonComplete(lessonId ?? '', level === 'mastered' ? 100 : level === 'review' ? 70 : 50, totalXP);
        syncToFirestore();
      }
    }
  }, [engine.session?.currentPhase]);

  if (engine.isLoading) return <LoadingScreen message="Preparando lição..." />;

  if (!engine.session) return (
    <SafeArea>
      <EmptyState
        icon="⚠️"
        title="Não foi possível carregar"
        description="O banco de dados ainda está sendo preparado. Tente novamente."
        actionLabel="Tentar Novamente"
        onAction={() => engine.initSession()}
      />
    </SafeArea>
  );

  const handleAnswer = (isCorrect: boolean, explanation?: string, correctAnswer?: string) => {
    const xpEarned = isCorrect ? 2 : 0;
    engine.recordAnswer(isCorrect, xpEarned);
    setFeedbackData({ isCorrect, explanation, correctAnswer, xpEarned });
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    engine.advanceAfterExercise();
  };

  // Phase 1 — Exposure
  if (engine.isCurrentPhaseExposure()) {
    const unit = engine.getCurrentUnit();
    if (!unit) return <LoadingScreen message="Carregando conteúdo..." />;
    const { current, total } = engine.unitProgress();
    return (
      <ExposureCard
        unit={unit}
        onContinue={() => {
          audio.stop();
          engine.advanceExposure();
        }}
        unitNumber={current}
        totalUnits={total}
        isAudioPlaying={audio.state === 'playing'}
      />
    );
  }

  // Phase 6 — Complete
  if (engine.isSessionComplete()) {
    const { score, level, totalXP } = engine.calculateMastery();
    const results = engine.session?.results ?? [];
    const evaluated = results.filter(r => r.phase >= 2);
    const correct = evaluated.filter(r => r.isCorrect).length;
    return (
      <LessonSummary
        score={score}
        masteryLevel={level}
        correctCount={correct}
        totalCount={evaluated.length}
        xpEarned={totalXP}
        onContinue={navigation.goToTrail}
      />
    );
  }

  // Phases 2-5 — Exercises
  const currentExercise = engine.getCurrentExercise();
  const exercises = engine.getCurrentPhaseExercises();
  const phase = engine.session?.currentPhase ?? 2;

  if (!currentExercise || exercises.length === 0) {
    return <LoadingScreen message="Carregando..." />;
  }

  const phaseNames: Record<number, string> = {
    2: 'Reconhecimento', 3: 'Associação', 4: 'Recordação', 5: 'Aplicação',
  };

  const { completed, total: exerciseTotal } = totalExercisesInLesson();
  const progress = exerciseTotal > 0 ? (completed / exerciseTotal) * 100 : 0;

  return (
    <ExerciseShell
      instruction={`${phaseNames[phase] ?? ''} — Unidade ${engine.session.currentUnitIndex + 1}/${engine.session.units.length}`}
      progress={progress}
      stepLabel={`${completed + 1}/${exerciseTotal}`}
      onExit={navigation.goBack}
      footer={<div />}
    >
      {renderPhaseExercise(currentExercise, handleAnswer, engine.getCurrentUnit()?.greekForm)}

      {showFeedback && feedbackData && (
        <ExerciseFeedback
          isCorrect={feedbackData.isCorrect}
          explanation={feedbackData.explanation}
          correctAnswer={feedbackData.correctAnswer}
          xpEarned={feedbackData.xpEarned}
          onContinue={handleContinue}
        />
      )}
    </ExerciseShell>
  );
};

function renderPhaseExercise(
  ex: PhaseExercise,
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void,
  fallbackLetter?: string,
) {
  const exercise = {
    ...ex,
    question_greek: ex.questionGreek ?? '',
    question_pt: ex.questionPT ?? '',
    correct_answer: JSON.stringify(ex.correctAnswer),
    options: ex.options ? JSON.stringify(ex.options) : null,
    xp_reward: ex.xpReward ?? 2,
    // Canvas exercises use targetLetter from the exercise data, or fall back to the unit's greekForm (Option A)
    targetLetter: ex.targetLetter ?? fallbackLetter,
  };

  let correctAnswer: any;
  let options: string[] = [];
  try { correctAnswer = JSON.parse(exercise.correct_answer); } catch { correctAnswer = exercise.correct_answer; }
  try { options = exercise.options ? JSON.parse(exercise.options) : []; } catch { options = []; }

  const exerciseKey = `${ex.type}-${ex.questionPT ?? ex.correctAnswer}`;

  switch (ex.type) {
    case 'flashcard':
    case 'flashcard_confirm':
      return <FlashcardExercise key={exerciseKey} exercise={exercise} onAnswer={onAnswer} />;

    case 'multiple_choice':
      return (
        <MultipleChoiceExercise
          key={exerciseKey}
          exercise={exercise}
          options={options}
          correctAnswer={correctAnswer}
          onAnswer={onAnswer}
        />
      );

    case 'matching_pairs':
      return (
        <MatchingPairsExercise
          key={exerciseKey}
          exercise={exercise}
          pairs={parsePairsFromExercise(exercise)}
          onAnswer={onAnswer}
        />
      );

    case 'fill_blank':
      return (
        <FillBlankExercise
          key={exerciseKey}
          exercise={exercise}
          correctAnswer={correctAnswer}
          onAnswer={onAnswer}
        />
      );

    case 'word_order':
      return (
        <WordOrderExercise
          key={exerciseKey}
          exercise={exercise}
          correctAnswer={correctAnswer}
          onAnswer={onAnswer}
        />
      );

    case 'tpr_digital':
      return <TPRExercise key={exerciseKey} exercise={exercise} onAnswer={onAnswer} />;

    case 'canvas':
      return (
        <CanvasExercise
          key={exerciseKey}
          exercise={exercise}
          onAnswer={onAnswer}
        />
      );

    case 'typing_copy':
    case 'typing_translate':
      return (
        <TypingExercise
          key={exerciseKey}
          exercise={exercise}
          correctAnswer={correctAnswer}
          onAnswer={onAnswer}
        />
      );

    default:
      return <FlashcardExercise key={exerciseKey} exercise={exercise} onAnswer={onAnswer} />;
  }
}
