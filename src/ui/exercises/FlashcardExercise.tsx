import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GreekText } from '@/ui/greek/GreekText';
import { Button } from '@/ui/components/Button';

interface Props {
  exercise: any;
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

export const FlashcardExercise: React.FC<Props> = ({ exercise, onAnswer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <p className="text-text-secondary text-xs font-black uppercase tracking-widest">
        Toque para revelar
      </p>

      <motion.button
        onClick={() => setFlipped(true)}
        whileTap={{ scale: 0.97 }}
        className="w-full max-w-sm aspect-[3/2] rounded-3xl shadow-xl"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-secondary to-[#E5A850] rounded-3xl flex items-center justify-center shadow-lg"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/30 blur-2xl pointer-events-none" />
            <GreekText
              text={exercise.question_greek ?? exercise.question_pt}
              size="xl"
              color="text-[#1A1A1A]"
              className="relative"
            />
          </div>

          <div
            className="absolute inset-0 bg-gradient-to-br from-white to-[#FAFAF8] dark:from-surface dark:to-surface-alt rounded-3xl flex flex-col items-center justify-center p-6 gap-3 border border-secondary/20 dark:border-secondary/15 shadow-[0_2px_16px_rgba(249,185,92,0.08)]"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-zinc-900 dark:text-secondary font-extrabold text-2xl text-center">
              {JSON.parse(exercise.correct_answer)}
            </p>
            {exercise.hint_text && (
              <p className="text-text-secondary text-sm text-center leading-relaxed">{exercise.hint_text}</p>
            )}
          </div>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 w-full max-w-sm"
          >
            <Button
              label="Não sabia"
              onClick={() => onAnswer(false)}
              variant="bordered"
              size="lg"
              radius="full"
              className="flex-1"
            />
            <Button
              label="Sabia ✓"
              onClick={() => onAnswer(true)}
              size="lg"
              radius="full"
              className="flex-1 bg-secondary text-zinc-900 shadow-md hover:bg-secondary-light transition-all"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
