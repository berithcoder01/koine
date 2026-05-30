// src/pages/review/ReviewPage.tsx
import React, { useState, useEffect } from 'react';
import { SafeArea } from '@/components/layout/SafeArea';
import { BottomNav } from '@/components/layout/BottomNav';
import { GreekText } from '@/components/greek/GreekText';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { dbQueries } from '@/services/database/queries';
import { useAppNavigation } from '@/hooks/useNavigation';
import type { SRSCard } from '@/types/greek.types';
import { clsx } from 'clsx';

export const ReviewPage: React.FC = () => {
  const navigation = useAppNavigation();
  const [cards, setCards] = useState<SRSCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const pending = await dbQueries.getPendingSRSCards();
    setCards(pending);
  };

  const startReview = () => {
    if (cards.length === 0) return;
    setReviewing(true);
    setCurrentIndex(0);
    setShowAnswer(false);
    setCompleted(0);
  };

  const handleRate = async (quality: number) => {
    const card = cards[currentIndex];
    const newEF = Math.max(1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    let newInterval = card.interval;

    if (quality < 3) {
      newInterval = 1;
    } else {
      if (card.repetitions === 0) newInterval = 1;
      else if (card.repetitions === 1) newInterval = 3;
      else newInterval = Math.round(card.interval * newEF);
    }

    const newRepetitions = quality >= 3 ? card.repetitions + 1 : 0;
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + newInterval);

    const newStatus = newRepetitions >= 5 ? 'dominado' : newRepetitions >= 2 ? 'familiar' : 'aprendendo';

    await dbQueries.upsertSRSCard({
      ...card,
      easeFactor: newEF,
      interval: newInterval,
      repetitions: newRepetitions,
      nextReview: nextDate.toISOString().split('T')[0],
      status: newStatus,
    });

    setCompleted(prev => prev + 1);
    setShowAnswer(false);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setReviewing(false);
      loadCards();
    }
  };

  if (!reviewing) {
    return (
      <SafeArea>
        <div className="px-4 pt-4 pb-24">
          <h1 className="text-xl font-bold text-text-primary mb-4">Revisão SRS</h1>

          {cards.length === 0 ? (
            <EmptyState
              icon="🎉"
              title="Nenhuma revisão pendente"
              description="Você está em dia! Volte amanhã para revisar mais vocabulário."
              actionLabel="Voltar à Trilha"
              onAction={navigation.goToTrail}
            />
          ) : (
            <div className="space-y-4">
              <div className="bg-surface rounded-2xl p-6 shadow-sm text-center">
                <p className="text-4xl font-bold text-primary mb-2">{cards.length}</p>
                <p className="text-text-secondary">cartões para revisar</p>
              </div>

              <div className="bg-secondary/10 rounded-2xl p-4">
                <p className="text-secondary font-bold text-sm mb-1">Como funciona?</p>
                <p className="text-text-secondary text-xs leading-relaxed">
                  Revise o vocabulário usando repetição espaçada. Palavras difíceis aparecem mais frequentemente.
                </p>
              </div>

              <Button label="Começar Revisão" onClick={startReview} fullWidth size="lg" />
            </div>
          )}
        </div>
        <BottomNav srsCount={cards.length} />
      </SafeArea>
    );
  }

  const card = cards[currentIndex];
  const progress = ((currentIndex) / cards.length) * 100;

  return (
    <SafeArea withBottomNav={false}>
      <div className="flex items-center gap-4 px-4 pt-safe pt-4 pb-3 bg-surface shadow-sm">
        <button onClick={() => setReviewing(false)} className="text-text-secondary text-2xl">✕</button>
        <div className="flex-1">
          <ProgressBar value={progress} color="bg-primary" height={6} />
        </div>
        <span className="text-xs text-text-secondary font-medium">
          {currentIndex + 1}/{cards.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <GreekText text={card.token} size="2xl" />

        {!showAnswer ? (
          <Button label="Mostrar Resposta" onClick={() => setShowAnswer(true)} fullWidth size="lg" />
        ) : (
          <div className="w-full space-y-4 animate-fadeIn">
            <div className="bg-surface rounded-2xl p-4 shadow-sm text-center">
              <p className="text-text-primary font-bold text-xl mb-1">{card.glossPT}</p>
              <p className="text-text-secondary text-sm">Intervalo: {card.interval} dias</p>
            </div>

            <p className="text-text-secondary text-sm text-center">Quão bem você sabia?</p>

            <div className="grid grid-cols-4 gap-2">
              {[
                { quality: 1, label: 'Esqueci', color: 'bg-error' },
                { quality: 3, label: 'Difícil', color: 'bg-warning' },
                { quality: 4, label: 'Bom', color: 'bg-primary' },
                { quality: 5, label: 'Fácil', color: 'bg-success' },
              ].map(q => (
                <button
                  key={q.quality}
                  onClick={() => handleRate(q.quality)}
                  className={clsx(
                    'py-3 rounded-xl text-white font-bold text-sm active:scale-95 transition-transform',
                    q.color,
                  )}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {completed > 0 && (
        <div className="px-6 pb-4">
          <p className="text-text-secondary text-sm text-center">
            ✅ {completed} revisões concluídas
          </p>
        </div>
      )}
    </SafeArea>
  );
};
