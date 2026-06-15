import React, { useState } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { GreekText } from '@/ui/greek/GreekText';
import { Button } from '@/ui/components/Button';
import { OptionButton, OptionState } from '@/ui/exercises/OptionButton';

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
    }, 900);
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
  const isCorrectShown = selected !== null && selected.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  const isWrongShown = selected !== null && !isCorrectShown;

  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white dark:bg-surface border border-secondary/20 dark:border-secondary/15 rounded-[24px] p-6 shadow-[0_2px_16px_rgba(249,185,92,0.08)] text-center relative overflow-hidden"
      >
        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-lagune/8 blur-2xl pointer-events-none" />
        <div className="relative">
          {isGreekQuestion ? (
            <GreekText text={questionText} size="xl" />
          ) : (
            <p className="text-text-primary text-lg font-extrabold leading-relaxed">
              {beforeBlank}
              <motion.span
                animate={{
                  borderColor: isCorrectShown
                    ? '#96C7B3'
                    : isWrongShown
                      ? '#D7897F'
                      : '#F9B95C',
                  backgroundColor: isCorrectShown
                    ? '#F0F7F4'
                    : isWrongShown
                      ? '#FBF1F0'
                      : '#FEF8EF',
                }}
                transition={{ duration: 0.2 }}
                className={clsx(
                  'inline-block min-w-[80px] border-b-[3px] mx-1 px-2 text-center',
                  isGreekAnswer && 'font-greek text-xl',
                )}
              >
                {selected ?? '\u00A0\u00A0\u00A0\u00A0\u00A0'}
              </motion.span>
              {afterBlank}
            </p>
          )}
        </div>
      </motion.div>

      {useChoices ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="flex flex-col gap-3"
        >
          {options.map((option, index) => {
            const optIsGreek = /[^\u0000-\u007F]/.test(option);
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <OptionButton
                  label={option}
                  state={getChoiceState(option)}
                  onClick={() => handleChoiceSelect(option)}
                  disabled={selected !== null}
                  isGreek={optIsGreek}
                  fullWidth
                  index={index}
                />
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && inputValue.trim() && handleKeyboardVerify()}
            placeholder="Digite sua resposta..."
            className={clsx(
              'w-full bg-white dark:bg-surface border-2 border-border/60 dark:border-border/20',
              'rounded-2xl px-4 py-4 text-center text-lg outline-none',
              'transition-colors duration-150 shadow-sm',
              'focus:border-secondary focus:shadow-md',
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

          <Button
            label="VERIFICAR"
            onClick={handleKeyboardVerify}
            disabled={inputValue.trim().length === 0}
            fullWidth
            size="lg"
            radius="full"
            className="bg-secondary text-zinc-900 shadow-md hover:bg-secondary-light transition-all"
          />
        </div>
      )}
    </div>
  );
};
