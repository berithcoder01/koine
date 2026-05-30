// src/components/exercises/ExerciseFeedback.tsx
import React, { useEffect } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { clsx } from 'clsx';

interface ExerciseFeedbackProps {
  isCorrect: boolean;
  explanation?: string;
  correctAnswer?: string;
  onContinue: () => void;
  xpEarned?: number;
}

export const ExerciseFeedback: React.FC<ExerciseFeedbackProps> = ({
  isCorrect,
  explanation,
  correctAnswer,
  onContinue,
  xpEarned,
}) => {
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

  return (
    <div className={clsx(
      'fixed bottom-0 left-0 right-0 rounded-t-3xl p-6 pb-8 z-30',
      'animate-fadeIn',
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
      
      <button
        onClick={onContinue}
        className="w-full bg-white/20 text-white font-bold rounded-xl py-3 min-h-[48px] active:bg-white/30 transition-colors duration-150"
      >
        Continuar
      </button>
    </div>
  );
};
