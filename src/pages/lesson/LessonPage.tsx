import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppNavigation } from '@/hooks/useNavigation';
import { useProgressStore } from '@/store/progressStore';
import { useGamificationStore } from '@/store/gamificationStore';
import { dbQueries } from '@/services/database/queries';
import { ExerciseFeedback, ExerciseShell } from '@/components/exercises';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { XP_VALUES } from '@/constants/config';
import { stripGreekPunctuation } from '@/utils/greek';
import { LessonSummary } from './components/LessonSummary';
import { VocabularyStep } from './components/VocabularyStep';
import { LessonContentView } from './components/LessonContentView';
import { FlashcardExercise } from './exercises/FlashcardExercise';
import { MultipleChoiceExercise } from './exercises/MultipleChoiceExercise';
import { WordOrderExercise } from './exercises/WordOrderExercise';
import { FillBlankExercise } from './exercises/FillBlankExercise';
import { MatchingPairsExercise, parsePairsFromExercise } from './exercises/MatchingPairsExercise';
import { TPRExercise } from './exercises/TPRExercise';
import { NarrationExercise } from './exercises/NarrationExercise';

const INSTRUCTION_MAP: Record<string, string> = {
  flashcard:        'Toque para revelar',
  multiple_choice:  'Selecione a resposta correta',
  word_order:       'Monte a frase na ordem correta',
  fill_blank:       'Complete o espaço vazio:',
  matching_pairs:   'Combine os pares:',
  tpr_digital:      'Selecione a imagem correta',
  narration:        'Descreva o que você vê',
};

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

  type LessonStep = 'vocabulary' | 'content' | 'exercises';

  const [exercises, setExercises] = useState<any[]>([]);
  const [vocabulary, setVocabulary] = useState<any[]>([]);
  const [lessonContent, setLessonContent] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<LessonStep>('vocabulary');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastResult, setLastResult] = useState<{
    isCorrect: boolean;
    explanation?: string;
    correctAnswer?: string;
    xpEarned: number;
    strongGreekWord?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [finalXP, setFinalXP] = useState(0);

  useEffect(() => {
    if (lessonId) {
      console.log('[LessonPage] useEffect triggered, lessonId =', lessonId);
      loadLessonData(lessonId);
    } else {
      console.warn('[LessonPage] useEffect: lessonId is falsy!', lessonId);
      setError('Nenhum módulo selecionado. Volte e tente novamente.');
      setIsLoading(false);
    }
  }, [lessonId]);

  const withTimeout = <T,>(promise: Promise<T>, ms: number, label: string): Promise<T> =>
    Promise.race([
      promise,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout: ${label} excedeu ${ms}ms`)), ms),
      ),
    ]);

  const loadLessonData = async (moduleId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('[LessonPage] loadLessonData START, moduleId =', moduleId);

      const QUERY_TIMEOUT = 8000; // 8 seconds max per query

      console.log('[LessonPage] Querying exercises...');
      let exData: any[] = [];
      try {
        exData = await withTimeout(
          dbQueries.getExercisesByModule(moduleId),
          QUERY_TIMEOUT,
          'getExercisesByModule',
        );
      } catch (e: any) {
        console.warn('[LessonPage] exercises query failed:', e?.message);
      }

      console.log('[LessonPage] Querying vocabulary...');
      let vocabData: any[] = [];
      try {
        vocabData = await withTimeout(
          dbQueries.getVocabularyByModule(moduleId),
          QUERY_TIMEOUT,
          'getVocabularyByModule',
        );
      } catch (e: any) {
        console.warn('[LessonPage] vocabulary query failed:', e?.message);
      }

      console.log('[LessonPage] Querying lesson content...');
      let contentData: any[] = [];
      try {
        contentData = await withTimeout(
          dbQueries.getLessonContent(moduleId),
          QUERY_TIMEOUT,
          'getLessonContent',
        );
      } catch (e: any) {
        console.warn('[LessonPage] lesson content query failed:', e?.message);
      }

      console.log(`[LessonPage] Results — exercises: ${exData.length}, vocab: ${vocabData.length}, content: ${contentData.length}`);

      setExercises(exData.length ? exData : generatePlaceholderExercises(moduleId));
      setVocabulary(vocabData);
      setLessonContent(contentData);
      setCurrentStep(vocabData.length > 0 ? 'vocabulary' : contentData.length > 0 ? 'content' : 'exercises');
      console.log('[LessonPage] loadLessonData DONE');
    } catch (err: any) {
      console.error('[LessonPage] Erro crítico ao carregar lição:', err);
      setError(err?.message || JSON.stringify(err) || 'Falha ao conectar com o banco de dados');
    } finally {
      setIsLoading(false);
    }
  };

  const generatePlaceholderExercises = (moduleId: string) => [
    {
      id: `${moduleId}-ex1`, module_id: moduleId, exercise_order: 1,
      type: 'flashcard', question_greek: 'λόγος',
      correct_answer: JSON.stringify('palavra'), explanation: 'λόγος = palavra, discurso', xp_reward: 2,
    },
    {
      id: `${moduleId}-ex2`, module_id: moduleId, exercise_order: 2,
      type: 'multiple_choice', question_pt: 'Como se diz "amor" em grego?',
      options: JSON.stringify(['ἀγάπη', 'εἰρήνη', 'χάρις', 'ζωή']),
      correct_answer: JSON.stringify('ἀγάπη'), explanation: 'ἀγάπη = amor', xp_reward: 2,
    },
    {
      id: `${moduleId}-ex3`, module_id: moduleId, exercise_order: 3,
      type: 'matching_pairs',
      options: JSON.stringify([['λόγος','palavra'],['ἀγάπη','amor'],['εἰρήνη','paz'],['χάρις','graça'],['ζωή','vida']]),
      correct_answer: JSON.stringify('matching'), explanation: 'Vocabulário básico', xp_reward: 4,
    },
    {
      id: `${moduleId}-ex4`, module_id: moduleId, exercise_order: 4,
      type: 'fill_blank', question_pt: 'Complete: ἐγώ ___ μαθητής',
      options: JSON.stringify(['εἰμί', 'ἐστίν', 'ἐσμέν']),
      correct_answer: JSON.stringify('εἰμί'), explanation: 'ἐγώ εἰμί = eu sou', xp_reward: 2,
    },
    {
      id: `${moduleId}-ex5`, module_id: moduleId, exercise_order: 5,
      type: 'word_order', question_pt: 'Monte a frase: "Deus é amor"',
      correct_answer: JSON.stringify(['ὁ', 'θεός', 'ἀγάπη', 'ἐστίν']),
      explanation: 'ὁ θεός ἀγάπη ἐστίν', xp_reward: 2,
    },
  ];

  const handleAnswer = (isCorrect: boolean, explanation?: string, correctAnswer?: string) => {
    const xpEarned = isCorrect ? (exercises[currentIndex]?.xp_reward ?? XP_VALUES.EXERCISE_CORRECT) : 0;
    setResults(prev => [...prev, { exerciseId: exercises[currentIndex].id, isCorrect, xpEarned }]);

    const ex = exercises[currentIndex];
    const rawWord = ex?.question_greek || (correctAnswer && /[\u0370-\u03FF]/.test(correctAnswer) ? correctAnswer : undefined);
    const greekWord = rawWord ? stripGreekPunctuation(rawWord) : undefined;

    setLastResult({ isCorrect, explanation, correctAnswer, xpEarned, strongGreekWord: greekWord });
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
    if (lessonId) markLessonComplete(lessonId, score);
    addXP(totalEarned);
    setFinalXP(totalEarned);
    setIsComplete(true);
  };

  if (isLoading) return <LoadingScreen message="Preparando lição..." />;

  if (error) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 p-6">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-text-primary font-bold text-lg mb-2">Erro ao carregar lição</h2>
        <p className="text-text-secondary text-sm text-center mb-6 max-w-xs">{error}</p>
        <div className="flex gap-3">
          <button
            onClick={() => lessonId && loadLessonData(lessonId)}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold"
          >
            Tentar novamente
          </button>
          <button
            onClick={navigation.goBack}
            className="bg-surface text-text-primary px-6 py-3 rounded-xl font-semibold border border-border"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

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

  if (currentStep === 'vocabulary' && vocabulary.length > 0) {
    return (
      <VocabularyStep
        words={vocabulary.map((v: any) => ({
          token: v.token,
          lemma: v.lemma,
          gloss_pt: v.gloss_pt,
          strongs_id: v.strongs_id,
        }))}
        onContinue={() => setCurrentStep(lessonContent.length > 0 ? 'content' : 'exercises')}
      />
    );
  }

  if (currentStep === 'content' && lessonContent.length > 0) {
    return (
      <LessonContentView
        items={lessonContent.map((c: any) => ({
          id: c.id,
          type: c.type,
          title: c.title,
          body: c.body,
          greek_example: c.greek_example,
          strongs_refs: c.strongs_refs,
        }))}
        onComplete={() => setCurrentStep('exercises')}
      />
    );
  }

  const currentExercise = exercises[currentIndex];
  const progress = exercises.length > 0 ? (currentIndex / exercises.length) * 100 : 0;
  const instruction = INSTRUCTION_MAP[currentExercise?.type] ?? 'Responda:';

  return (
    <ExerciseShell
      instruction={instruction}
      progress={progress}
      stepLabel={exercises.length > 0 ? `${currentIndex + 1}/${exercises.length}` : ''}
      onExit={navigation.goBack}
      footer={<div />}
    >
      {currentExercise && renderExercise(currentExercise, handleAnswer)}

      {showFeedback && lastResult && (
        <ExerciseFeedback
          isCorrect={lastResult.isCorrect}
          explanation={lastResult.explanation}
          correctAnswer={lastResult.correctAnswer}
          xpEarned={lastResult.xpEarned}
          strongGreekWord={lastResult.strongGreekWord}
          onContinue={handleContinue}
        />
      )}
    </ExerciseShell>
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
      return (
        <MultipleChoiceExercise
          exercise={exercise}
          options={options}
          correctAnswer={correctAnswer}
          onAnswer={onAnswer}
        />
      );

    case 'matching_pairs':
      return (
        <MatchingPairsExercise
          exercise={exercise}
          pairs={parsePairsFromExercise(exercise)}
          onAnswer={onAnswer}
        />
      );

    case 'fill_blank':
      return (
        <FillBlankExercise
          exercise={exercise}
          correctAnswer={correctAnswer}
          onAnswer={onAnswer}
        />
      );

    case 'word_order':
      return (
        <WordOrderExercise
          exercise={exercise}
          correctAnswer={correctAnswer}
          onAnswer={onAnswer}
        />
      );

    case 'tpr_digital':
      return <TPRExercise exercise={exercise} onAnswer={onAnswer} />;

    case 'narration':
      return <NarrationExercise exercise={exercise} onAnswer={onAnswer} />;

    default:
      return <FlashcardExercise exercise={exercise} onAnswer={onAnswer} />;
  }
}
