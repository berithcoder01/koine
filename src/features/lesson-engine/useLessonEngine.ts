import { useState, useCallback } from 'react';
import type {
  LearningUnit,
  ModuleSession,
  SessionResult,
  MasteryLevel,
  PhaseExercise,
  ExerciseType,
} from '@/core/types/lesson.types';
import { dbQueries } from '@/features/database/queries';
import { format } from 'date-fns';

function generateFallbackUnits(moduleId: string): LearningUnit[] {
  return [
    {
      id: `${moduleId}-FB1`, moduleId, order: 1, type: 'word',
      greekForm: 'λόγος', transliteration: 'logos', glossPT: 'palavra / verbo',
      explanation: `Unidade de exemplo para ${moduleId}. O banco SQLite não está disponível.`,
      mnemonicHint: 'Fallback — SQLite indisponível',
      contextVerse: 'Ἐν ἀρχῇ ἦν ὁ λόγος',
      contextReference: 'João 1:1',
      srsKey: `${moduleId}_fallback_1`,
      phase2_recognition: [{ type: 'multiple_choice', questionPT: 'Toque para continuar (modo fallback)', correctAnswer: 'Continuar', options: ['Continuar'], explanation: 'SQLite indisponível — modo de contingência ativo.' }],
      phase3_association: [{ type: 'flashcard', questionPT: 'Modo fallback ativo', correctAnswer: 'Reinicie o app para tentar SQLite novamente', explanation: 'O banco de dados local não pôde ser carregado.' }],
      phase4_recall: [{ type: 'tpr_digital', questionPT: 'Você entendeu?', correctAnswer: 'Sim', options: ['Sim', 'Não'], explanation: 'Os dados avançados serão carregados quando o banco estiver disponível.' }],
    },
    {
      id: `${moduleId}-FB2`, moduleId, order: 2, type: 'word',
      greekForm: 'θέλημα', transliteration: 'thelēma', glossPT: 'vontade',
      explanation: 'Dados do módulo não disponíveis via SQLite.',
      srsKey: `${moduleId}_fallback_2`,
      phase2_recognition: [{ type: 'multiple_choice', questionPT: 'Continuar para o resumo?', correctAnswer: 'Sim', options: ['Sim', 'Não'], explanation: 'Você concluiu a unidade fallback.' }],
      phase3_association: [{ type: 'flashcard', questionPT: 'Módulo em modo de contingência', correctAnswer: 'Reinicie o app para tentar SQLite novamente', explanation: 'O banco de dados local não pôde ser carregado.' }],
      phase4_recall: [{ type: 'tpr_digital', questionPT: 'Deseja concluir?', correctAnswer: 'Sim', options: ['Sim', 'Não'], explanation: 'Fallback concluído.' }],
    },
  ];
}

export const useLessonEngine = (moduleId: string) => {
  const [session, setSession] = useState<ModuleSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [srsEnrolled, setSrsEnrolled] = useState(false);

  const initSession = useCallback(async (retries = 3): Promise<void> => {
    setIsLoading(true);
    try {
      const units = await dbQueries.getLearningUnitsByModule(moduleId);
      if (!units || units.length === 0) {
        if (retries > 0) {
          console.warn(`[LessonEngine] No units for ${moduleId}, retrying (${retries} left)...`);
          await new Promise(r => setTimeout(r, 2000));
          return initSession(retries - 1);
        }
        console.warn(`[LessonEngine] Using fallback units for ${moduleId} (SQLite unavailable)`);
        const fallback = generateFallbackUnits(moduleId);
        setSession({
          moduleId,
          units: fallback,
          currentUnitIndex: 0,
          currentPhase: 1,
          currentExerciseIndex: 0,
          results: [],
          startedAt: new Date(),
        });
        setIsLoading(false);
        return;
      }
      setSession({
        moduleId,
        units,
        currentUnitIndex: 0,
        currentPhase: 1,
        currentExerciseIndex: 0,
        results: [],
        startedAt: new Date(),
      });
    } catch (err) {
      console.warn(`[LessonEngine] SQLite failed for ${moduleId}, using fallback:`, err);
      const fallback = generateFallbackUnits(moduleId);
      setSession({
        moduleId,
        units: fallback,
        currentUnitIndex: 0,
        currentPhase: 1,
        currentExerciseIndex: 0,
        results: [],
        startedAt: new Date(),
      });
    }
    setIsLoading(false);
  }, [moduleId]);

  const getCurrentUnit = (): LearningUnit | null =>
    session?.units[session.currentUnitIndex] ?? null;

  const getPhaseExercises = (unit: LearningUnit | null, phase: number): PhaseExercise[] => {
    if (!unit) return [];
    switch (phase) {
      case 2: return unit.phase2_recognition;
      case 3: return unit.phase3_association;
      case 4: return unit.phase4_recall;
      case 5: return unit.phase5_application ?? [];
      default: return [];
    }
  };

  const getCurrentPhaseExercises = (): PhaseExercise[] => {
    const unit = getCurrentUnit();
    if (!unit || !session) return [];
    const exercises = getPhaseExercises(unit, session.currentPhase);
    return exercises;
  };

  const getCurrentExercise = (): PhaseExercise | null => {
    const exercises = getCurrentPhaseExercises();
    if (!session) return null;
    return exercises[session.currentExerciseIndex] ?? null;
  };

  const isCurrentPhaseExposure = (): boolean => session?.currentPhase === 1;
  const isCurrentPhaseApplication = (): boolean => session?.currentPhase === 5;
  const isLastUnit = (): boolean =>
    session ? session.currentUnitIndex >= session.units.length - 1 : false;

  const advanceExposure = useCallback(() => {
    setSession(prev =>
      prev ? { ...prev, currentPhase: 2, currentExerciseIndex: 0 } : prev
    );
  }, []);

  const recordAnswer = useCallback((isCorrect: boolean, xpEarned: number) => {
    setSession(prev => {
      if (!prev) return prev;
      const unit = prev.units[prev.currentUnitIndex];
      const exercises = getPhaseExercises(unit, prev.currentPhase);
      const ex = exercises[prev.currentExerciseIndex];
      const result: SessionResult = {
        unitId: unit.id,
        phase: prev.currentPhase,
        exerciseType: (ex?.type ?? 'multiple_choice') as ExerciseType,
        isCorrect,
        xpEarned,
      };
      return { ...prev, results: [...prev.results, result] };
    });
  }, []);

  const advanceAfterExercise = useCallback(() => {
    setSession(prev => {
      if (!prev) return prev;
      const unit = prev.units[prev.currentUnitIndex];
      const phaseExercises = getPhaseExercises(unit, prev.currentPhase);

      const nextPhase = () => {
        const next = (prev.currentPhase + 1) as 2 | 3 | 4 | 5;
        const isLast = prev.currentUnitIndex >= prev.units.length - 1;
        if (next === 5) {
          const hasPhase5 = unit.phase5_application && unit.phase5_application.length > 0;
          if (isLast && hasPhase5) return 5;
          if (isLast) return 6;
        }
        if (next >= 5) return isLast ? 6 : 1;
        return next;
      };

      const advanceToNextPhase = (): ModuleSession => {
        const phase = nextPhase();
        const nextUnitIdx = phase === 1 ? prev.currentUnitIndex + 1 : prev.currentUnitIndex;
        if (nextUnitIdx >= prev.units.length) {
          return { ...prev, currentPhase: 6, currentExerciseIndex: 0 };
        }
        return { ...prev, currentPhase: phase as any, currentUnitIndex: nextUnitIdx, currentExerciseIndex: 0 };
      };

      const hasMoreExercises = prev.currentExerciseIndex < phaseExercises.length - 1;
      if (hasMoreExercises) {
        return { ...prev, currentExerciseIndex: prev.currentExerciseIndex + 1 };
      }

      // Current phase done — advance
      return advanceToNextPhase();
    });
  }, []);

  const isSessionComplete = (): boolean => session?.currentPhase === 6;

  const calculateMastery = (): {
    score: number;
    level: MasteryLevel;
    itemsForSRS: string[];
    totalXP: number;
  } => {
    if (!session) {
      return { score: 0, level: 'reinforcement', itemsForSRS: [], totalXP: 0 };
    }

    const evaluatedResults = session.results.filter(r => r.phase >= 2);
    const correct = evaluatedResults.filter(r => r.isCorrect).length;
    const total = evaluatedResults.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;

    const level: MasteryLevel =
      score >= 90 ? 'mastered' :
      score >= 70 ? 'review' :
      'reinforcement';

    const itemsForSRS = session.units.map(u => u.srsKey);
    const totalXP = session.results.reduce((s, r) => s + r.xpEarned, 0);

    return { score, level, itemsForSRS, totalXP };
  };

  const enrollItemsInSRS = async (): Promise<void> => {
    if (!session || srsEnrolled) return;
    const { level } = calculateMastery();
    const efMap: Record<string, number> = {
      reinforcement: 1.3,
      review: 1.8,
      mastered: 2.5,
    };
    const intervalDays = level === 'reinforcement' ? 1 : level === 'review' ? 3 : 7;
    const today = new Date();
    const nextReview = format(new Date(today.getTime() + intervalDays * 86400000), 'yyyy-MM-dd');

    for (const unit of session.units) {
      await dbQueries.upsertSRSCard({
        wordId: unit.srsKey,
        token: unit.greekForm,
        glossPT: unit.glossPT,
        interval: intervalDays,
        easeFactor: efMap[level],
        repetitions: 1,
        nextReview,
        status: level === 'mastered' ? 'familiar' : 'aprendendo',
      });
    }
    setSrsEnrolled(true);
  };

  const unitProgress = (): { current: number; total: number } => ({
    current: (session?.currentUnitIndex ?? 0) + 1,
    total: session?.units.length ?? 0,
  });

  const phaseLabel = (): string => {
    switch (session?.currentPhase) {
      case 1: return 'Exposição';
      case 2: return 'Reconhecimento';
      case 3: return 'Associação';
      case 4: return 'Recordação';
      case 5: return 'Aplicação';
      case 6: return 'Concluído';
      default: return '';
    }
  };

  return {
    session,
    isLoading,
    initSession,
    getCurrentUnit,
    getCurrentPhaseExercises,
    getCurrentExercise,
    isCurrentPhaseExposure,
    isCurrentPhaseApplication,
    isLastUnit,
    advanceExposure,
    recordAnswer,
    advanceAfterExercise,
    isSessionComplete,
    calculateMastery,
    enrollItemsInSRS,
    unitProgress,
    phaseLabel,
  };
};
