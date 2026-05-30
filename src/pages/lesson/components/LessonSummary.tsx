// src/pages/lesson/components/LessonSummary.tsx
import React from 'react';
import { Button } from '@/components/ui/Button';
import { XPBadge } from '@/components/ui/XPBadge';

interface Props {
  score: number;
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  onContinue: () => void;
}

export const LessonSummary: React.FC<Props> = ({
  score, correctCount, totalCount, xpEarned, onContinue,
}) => {
  const isPerfect = score === 100;
  const emoji = score >= 80 ? '🎉' : score >= 60 ? '📚' : '💪';

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 gap-8">
      <div className="text-center">
        <p className="text-7xl mb-4">{emoji}</p>
        <h1 className="text-2xl font-bold text-textPrimary mb-2">
          {score >= 80 ? 'Módulo Concluído!' : 'Bom progresso!'}
        </h1>
        {isPerfect && (
          <p className="text-secondary font-bold">✨ Lição Perfeita!</p>
        )}
      </div>

      <div className="w-full max-w-sm grid grid-cols-3 gap-3">
        <div className="bg-surface rounded-2xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-primary">{score}%</p>
          <p className="text-xs text-textSecondary mt-1">Acerto</p>
        </div>
        <div className="bg-surface rounded-2xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-success">{correctCount}</p>
          <p className="text-xs text-textSecondary mt-1">Corretas</p>
        </div>
        <div className="bg-surface rounded-2xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-textPrimary">{totalCount - correctCount}</p>
          <p className="text-xs text-textSecondary mt-1">Erros</p>
        </div>
      </div>

      <XPBadge xp={xpEarned} />

      <div className="w-full max-w-sm">
        <Button label="Continuar" onClick={onContinue} fullWidth size="lg" />
      </div>
    </div>
  );
};
