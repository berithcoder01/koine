// src/components/exercises/ExerciseFeedback.tsx
import React, { useEffect, useState } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { clsx } from 'clsx';
import { dbQueries } from '@/services/database/queries';
import { stripGreekPunctuation } from '@/utils/greek';
import type { StrongEntry } from '@/types/greek.types';

interface ExerciseFeedbackProps {
  isCorrect: boolean;
  explanation?: string;
  correctAnswer?: string;
  onContinue: () => void;
  xpEarned?: number;
  strongGreekWord?: string;
}

export const ExerciseFeedback: React.FC<ExerciseFeedbackProps> = ({
  isCorrect,
  explanation,
  correctAnswer,
  onContinue,
  xpEarned,
  strongGreekWord,
}) => {
  const [strong, setStrong] = useState<StrongEntry | null>(null);
  const [showStrong, setShowStrong] = useState(false);

  useEffect(() => {
    if (strongGreekWord && !isCorrect) {
      const cleanWord = stripGreekPunctuation(strongGreekWord);
      dbQueries.searchStrong(cleanWord).then((results) => {
        if (results.length > 0) {
          setStrong(results[0]);
        } else {
          dbQueries.searchVocabulary(cleanWord).then((vocabResults) => {
            if (vocabResults.length > 0 && vocabResults[0].strongs_id) {
              dbQueries.getStrongById(vocabResults[0].strongs_id).then(setStrong);
            }
          });
        }
      });
    }
  }, [strongGreekWord, isCorrect]);

  useEffect(() => {
    const triggerHaptic = async () => {
      try {
        if (isCorrect) {
          await Haptics.impact({ style: ImpactStyle.Light });
        } else {
          await Haptics.impact({ style: ImpactStyle.Medium });
        }
      } catch {
        // Haptics not available (e.g. web browser)
      }
    };
    triggerHaptic();
  }, [isCorrect]);

  if (showStrong && strong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 rounded-t-3xl p-6 pb-8 z-30 animate-fadeIn bg-surface max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-text-primary font-bold">Definição Strong ({strong.id})</p>
          <button onClick={() => setShowStrong(false)} className="text-text-secondary text-sm">
            Voltar
          </button>
        </div>
        {strong.origin && (
          <p className="text-text-secondary text-xs mb-3 leading-relaxed">{strong.origin}</p>
        )}
        {strong.definitions.length > 0 && (
          <ul className="space-y-2">
            {strong.definitions.map((def, i) => (
              <li key={i} className="text-text-primary text-sm leading-relaxed pl-4 relative">
                <span className="absolute left-0 top-0 text-primary font-bold">{i + 1}.</span>
                {def}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onContinue}
          className="w-full bg-primary text-white dark:text-[#18181B] font-bold rounded-2xl py-3 mt-4 min-h-[48px]"
        >
          Continuar
        </button>
      </div>
    );
  }

  return (
    <div className={clsx(
      'fixed bottom-0 left-0 right-0 rounded-t-3xl p-6 pb-8 z-30',
      'animate-fadeIn max-h-[70vh] overflow-y-auto',
      isCorrect ? 'bg-success' : 'bg-error',
    )}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{isCorrect ? '✅' : '❌'}</span>
        <div>
          <p className="text-white font-bold text-lg">
            {isCorrect ? 'Correto!' : 'Quase lá!'}
          </p>
          {isCorrect && xpEarned && (
            <p className="text-white/80 text-sm">+{xpEarned} XP ganhos</p>
          )}
        </div>
      </div>

      {!isCorrect && correctAnswer && (
        <div className="bg-white/10 rounded-xl p-3 mb-3">
          <p className="text-white/70 text-xs mb-1">Resposta correta:</p>
          <p className="text-white font-semibold font-greek">{correctAnswer}</p>
        </div>
      )}

      {explanation && (
        <p className="text-white/90 text-sm mb-4">{explanation}</p>
      )}

      <div className="flex gap-2">
        {strong && (
          <button
            onClick={() => setShowStrong(true)}
            className="flex-1 bg-white/15 text-white font-bold rounded-xl py-3 min-h-[48px] text-sm"
          >
            Ver definição no Strong
          </button>
        )}
        <button
          onClick={onContinue}
          className={clsx(
            'bg-white/20 text-white font-bold rounded-xl py-3 min-h-[48px] transition-colors duration-150',
            strong ? 'flex-1' : 'w-full',
          )}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
