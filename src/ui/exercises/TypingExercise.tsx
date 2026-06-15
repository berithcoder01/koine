import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { GreekText } from '@/ui/greek/GreekText';
import { GreekKeyboard } from '@/ui/components/GreekKeyboard/GreekKeyboard';
import { useGreekKeyboard } from '@/ui/components/GreekKeyboard/useGreekKeyboard';
import { compareGreekWords, getLetterFeedback, normalizeGreek } from '@/features/typing/typingUtils';
import { useTextToSpeech } from '@/features/tts/useTextToSpeech';
import { Volume2 } from 'lucide-react';

interface Props {
  exercise: any;
  correctAnswer: string;
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const TypingExercise: React.FC<Props> = ({
  exercise,
  correctAnswer,
  onAnswer,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ isCorrect: boolean; explanation?: string } | null>(null);
  const [letterFeedback, setLetterFeedback] = useState<{ char: string; isCorrect: boolean }[]>([]);
  const strictDiacritics = false;

  const greekForm: string = exercise.question_greek ?? correctAnswer ?? '';
  const isTranslateMode = !!(exercise.questionPT && !greekForm);
  const displayGreek = isTranslateMode ? '' : greekForm;

  const handleTypingSubmit = useCallback((value: string) => {
    if (submitted) return;
    setSubmitted(true);

    const comparison = compareGreekWords(value, correctAnswer, strictDiacritics);
    const feedback = getLetterFeedback(value, correctAnswer, strictDiacritics);
    setLetterFeedback(feedback);
    setResult({
      isCorrect: comparison.isCorrect,
      explanation: exercise.explanation,
    });

    setTimeout(() => {
      onAnswer(comparison.isCorrect, exercise.explanation, correctAnswer);
    }, 1200);
  }, [submitted, correctAnswer, strictDiacritics, exercise.explanation, onAnswer]);

  const keyboard = useGreekKeyboard(handleTypingSubmit);
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (submitted) return;
    const feedback = getLetterFeedback(keyboard.input, correctAnswer, strictDiacritics);
    setLetterFeedback(feedback);
  }, [keyboard.input, correctAnswer, strictDiacritics, submitted]);

  const highlightLetters = displayGreek
    ? [...new Set(normalizeGreek(displayGreek).split('').filter(c => c.match(/[α-ως]/)))]
    : [];

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
          {isTranslateMode ? (
            <>
              <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                Digite em grego
              </p>
              <p className="text-text-primary text-xl font-extrabold leading-relaxed">
                {exercise.questionPT}
              </p>
              {correctAnswer && (
                <button
                  onClick={() => speak(correctAnswer)}
                  className="mt-2 mx-auto w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center active:scale-90 transition-all"
                >
                  <Volume2 size={16} className="text-secondary" />
                </button>
              )}
            </>
          ) : (
            <>
              <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                Copie a palavra
              </p>
              <div className="flex items-center justify-center gap-3">
                <GreekText text={displayGreek} size="xl" />
                {displayGreek && (
                  <button
                    onClick={() => speak(displayGreek)}
                    className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center active:scale-90 transition-all shrink-0"
                  >
                    <Volume2 size={16} className="text-secondary" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>

      <div className="bg-surface/50 dark:bg-surface-alt/30 border border-border/40 rounded-2xl p-4">
        <div className="flex items-center justify-center gap-1.5 min-h-[48px] flex-wrap">
          {letterFeedback.length > 0 ? (
            letterFeedback.map((fb, i) => (
              <span
                key={i}
                className={clsx(
                  'font-greek text-2xl font-bold transition-colors duration-200',
                  fb.isCorrect ? 'text-success' : 'text-error',
                )}
              >
                {fb.char || ' '}
              </span>
            ))
          ) : (
            <span className="text-text-secondary/40 text-sm">
              Toque nas teclas para digitar...
            </span>
          )}
          {keyboard.input.length > 0 && !submitted && (
            <span className="w-0.5 h-7 bg-secondary animate-pulse ml-0.5" />
          )}
        </div>
      </div>

      {!submitted && (
        <>
          <GreekKeyboard
            onInput={keyboard.handleInput}
            onDelete={keyboard.handleDelete}
            onSubmit={keyboard.handleSubmit}
            highlightLetters={highlightLetters}
            inputValue={keyboard.input}
            disabled={submitted}
          />

          {exercise.hint && (
            <p className="text-text-secondary text-sm text-center">
              {exercise.hint}
            </p>
          )}
        </>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={clsx(
            'rounded-2xl p-4 text-center',
            result.isCorrect
              ? 'bg-success/10 border border-success/20'
              : 'bg-error/10 border border-error/20',
          )}
        >
          <p className={clsx(
            'font-bold text-lg mb-1',
            result.isCorrect ? 'text-success' : 'text-error',
          )}>
            {result.isCorrect ? 'Correto!' : 'Não foi dessa vez'}
          </p>
          {!result.isCorrect && (
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-text-secondary text-sm">Correto:</span>
              <GreekText text={correctAnswer} size="lg" />
            </div>
          )}
          {result.explanation && (
            <p className="text-text-secondary text-sm mt-2">{result.explanation}</p>
          )}
        </motion.div>
      )}
    </div>
  );
};
