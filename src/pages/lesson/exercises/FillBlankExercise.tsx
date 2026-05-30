import React, { useState } from 'react';
import { clsx } from 'clsx';
import { GreekText } from '@/components/greek/GreekText';
import { OptionButton, OptionState } from '@/components/exercises/OptionButton';

interface Props {
  exercise: any;
  correctAnswer: string;
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

function splitBlank(question: string): [string, string] {
  const marker = question.includes('_____') ? '_____' : '___';
  const idx = question.indexOf(marker);
  if (idx === -1) return [question + ' ', ''];
  return [question.slice(0, idx), question.slice(idx + marker.length)];
}

export const FillBlankExercise: React.FC<Props> = ({
  exercise,
  correctAnswer,
  onAnswer,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const useChoices = !!(exercise.options);
  let options: string[] = [];
  if (useChoices) {
    try { options = JSON.parse(exercise.options); } catch { options = []; }
  }

  const questionText: string = exercise.question_pt ?? exercise.question_greek ?? '';
  const isGreekQuestion = !!exercise.question_greek && !exercise.question_pt;
  const [beforeBlank, afterBlank] = splitBlank(questionText);

  const handleChoiceSelect = (option: string) => {
    if (selected !== null) return;
    setSelected(option);
    const isCorrect = option.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    setTimeout(() => {
      onAnswer(isCorrect, exercise.explanation, correctAnswer);
    }, 700);
  };

  const handleKeyboardVerify = () => {
    const isCorrect = inputValue.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    onAnswer(isCorrect, exercise.explanation, correctAnswer);
  };

  const getChoiceState = (option: string): OptionState => {
    if (selected === null) return 'idle';
    if (option.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) return 'correct';
    if (option === selected) return 'wrong';
    return 'idle';
  };

  const isGreekAnswer = /[^\u0000-\u007F]/.test(correctAnswer);

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
        {isGreekQuestion ? (
          <div className="text-center">
            <GreekText text={questionText} size="lg" />
          </div>
        ) : (
          <p className="text-text-primary text-lg font-semibold leading-relaxed text-center">
            {beforeBlank}
            <span
              className={clsx(
                'inline-block min-w-[80px] border-b-2 mx-1 text-center transition-colors duration-200',
                selected
                  ? selected.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
                    ? 'border-success text-success'
                    : 'border-error text-error'
                  : 'border-secondary text-secondary',
                isGreekAnswer && 'font-greek',
              )}
            >
              {selected ?? '\u00A0\u00A0\u00A0\u00A0\u00A0'}
            </span>
            {afterBlank}
          </p>
        )}
      </div>

      {useChoices ? (
        <div className="flex flex-col gap-3">
          {options.map((option, index) => {
            const optIsGreek = /[^\u0000-\u007F]/.test(option);
            return (
              <OptionButton
                key={index}
                label={option}
                state={getChoiceState(option)}
                onClick={() => handleChoiceSelect(option)}
                disabled={selected !== null}
                isGreek={optIsGreek}
                fullWidth
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && inputValue.trim() && handleKeyboardVerify()}
            placeholder="Digite sua resposta..."
            className={clsx(
              'w-full bg-surface border-2 rounded-2xl px-4 py-4 text-center text-lg outline-none',
              'transition-colors duration-150',
              'border-border focus:border-text-primary',
              isGreekAnswer && 'font-greek',
            )}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />

          {exercise.hint_text && (
            <p className="text-text-secondary text-sm text-center">
              💡 {exercise.hint_text}
            </p>
          )}

          <button
            onClick={handleKeyboardVerify}
            disabled={inputValue.trim().length === 0}
            className="w-full bg-text-primary text-background font-bold rounded-2xl py-4 text-base
                       disabled:opacity-40 disabled:cursor-not-allowed
                       active:opacity-80 transition-all duration-150"
          >
            VERIFICAR
          </button>
        </div>
      )}
    </div>
  );
};
