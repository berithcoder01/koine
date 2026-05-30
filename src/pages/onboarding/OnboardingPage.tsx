// src/pages/onboarding/OnboardingPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { dbQueries } from '@/services/database/queries';

interface OnboardingSlide {
  icon: string;
  title: string;
  description: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    icon: '📖',
    title: 'Leia o NT no Original',
    description: 'Aprenda o grego coiné — a língua do Novo Testamento — e acesse as Escrituras diretamente na fonte.',
  },
  {
    icon: '🎮',
    title: 'Aprenda Jogando',
    description: 'Exercícios interativos, escrita de letras, flashcards e narrativas bíblicas. Como o Duolingo, mas para o grego bíblico.',
  },
  {
    icon: '🏛️',
    title: 'Metodologia Comprovada',
    description: 'Baseado em Comprehensible Input (Krashen), TBLT e CLT. Você usa o grego em frases reais desde a primeira lição.',
  },
];

type DailyGoal = 'casual' | 'regular' | 'intensive';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<DailyGoal>('regular');

  const handleNext = async () => {
    if (step < SLIDES.length - 1) {
      setStep(step + 1);
    } else if (step === SLIDES.length - 1) {
      setStep(3);
    } else {
      await dbQueries.setSetting('daily_goal', selectedGoal);
      navigate(ROUTES.AUTH_LOGIN);
    }
  };

  const handleSkip = () => navigate(ROUTES.AUTH_LOGIN);

  if (step < SLIDES.length) {
    const slide = SLIDES[step];
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex justify-end p-4 pt-safe">
          {step > 0 && (
            <button onClick={handleSkip} className="text-textSecondary text-sm">
              Pular
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 animate-fadeIn">
          <span className="text-8xl mb-8">{slide.icon}</span>
          <h1 className="text-2xl font-bold text-textPrimary text-center mb-4">
            {slide.title}
          </h1>
          <p className="text-textSecondary text-center leading-relaxed">
            {slide.description}
          </p>
        </div>

        <div className="pb-safe p-8">
          <div className="flex justify-center gap-2 mb-6">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${
                  i === step ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-border'
                }`}
              />
            ))}
          </div>
          <Button label="Próximo" onClick={handleNext} fullWidth />
        </div>
      </div>
    );
  }

  const goals = [
    { type: 'casual' as DailyGoal, label: 'Casual', minutes: 5, icon: '🌱', desc: '5 min por dia' },
    { type: 'regular' as DailyGoal, label: 'Regular', minutes: 10, icon: '📚', desc: '10 min por dia' },
    { type: 'intensive' as DailyGoal, label: 'Intensivo', minutes: 15, icon: '🔥', desc: '15 min por dia' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col px-6 pt-safe pt-12 animate-fadeIn">
        <h1 className="text-2xl font-bold text-textPrimary mb-2">
          Qual é sua meta diária?
        </h1>
        <p className="text-textSecondary mb-8">
          Você pode mudar isso depois nas configurações.
        </p>

        <div className="flex flex-col gap-3">
          {goals.map((goal) => (
            <button
              key={goal.type}
              onClick={() => setSelectedGoal(goal.type)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                selectedGoal === goal.type
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-surface'
              }`}
            >
              <span className="text-3xl">{goal.icon}</span>
              <div className="flex-1 text-left">
                <p className="font-bold text-textPrimary">{goal.label}</p>
                <p className="text-textSecondary text-sm">{goal.desc}</p>
              </div>
              {selectedGoal === goal.type && (
                <span className="text-primary text-xl">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 pb-safe">
        <Button label="Começar a Aprender" onClick={handleNext} fullWidth variant="primary" />
      </div>
    </div>
  );
};
