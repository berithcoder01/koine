import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { BottomSheet } from '@/ui/components/BottomSheet';
import { Button } from '@/ui/components';
import { GreekText } from '@/ui/greek/GreekText';
import { nextWordPreview } from '@/content/word-of-the-day/selectWord';
import type { WordOfTheDay } from '@/content/word-of-the-day/types';

interface Props {
  word: WordOfTheDay;
  isOpen: boolean;
  isSaved: boolean;
  onClose: () => void;
  onMarkVisualized: () => void;
  onToggleSaved: () => void;
}

const difficultyLabel: Record<WordOfTheDay['dificuldade'], string> = {
  facil: 'Fácil',
  media: 'Média',
  dificil: 'Difícil',
};

const difficultyColor: Record<WordOfTheDay['dificuldade'], string> = {
  facil: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  media: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  dificil: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
};

export const PalavraDoDiaSheet: React.FC<Props> = ({
  word,
  isOpen,
  isSaved,
  onClose,
  onMarkVisualized,
  onToggleSaved,
}) => {
  const tomorrow = nextWordPreview([word]) ?? word;

  useEffect(() => {
    if (isOpen) onMarkVisualized();
  }, [isOpen, onMarkVisualized]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} height="full">
      <div className="flex flex-col gap-5 pb-6">
        <header className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-greek font-extrabold text-text-primary dark:text-white leading-tight">
              {word.grego}
            </h2>
            <p className="text-text-secondary text-sm font-semibold mt-1">
              {word.transliteracao} · {word.categoria}
            </p>
            <p className="text-text-primary dark:text-zinc-200 text-sm font-medium mt-2">
              {word.significado_curto}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className={clsx(
                'text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full',
                difficultyColor[word.dificuldade],
              )}>
                {difficultyLabel[word.dificuldade]}
              </span>
              {word.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary/10 text-secondary dark:bg-secondary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span aria-hidden className="text-3xl select-none shrink-0 font-serif opacity-20">Α</span>
        </header>

        <Section icon="📖" title="Etimologia">
          <p className="text-text-primary dark:text-zinc-200 text-sm leading-relaxed font-medium">
            {word.etimologia}
          </p>
        </Section>

        <Section icon="🔍" title="Curiosidade">
          <p className="text-text-primary dark:text-zinc-200 text-sm leading-relaxed font-medium">
            {word.curiosidade}
          </p>
        </Section>

        <Section icon="📍" title="No Novo Testamento">
          <p className="text-text-secondary text-xs uppercase tracking-wide font-semibold mb-2">
            {word.ocorrencias_nt} ocorrências · {word.primeiro_texto}
          </p>
          <div className="bg-background rounded-xl p-4 border border-border/30">
            <GreekText text={word.primeiro_trecho} size="md" />
          </div>
        </Section>

        <Section icon="🔜" title="Próxima palavra">
          <div className="flex items-center justify-between gap-3">
            <p className="text-text-secondary text-xs font-medium">Amanhã você vai ver:</p>
            <span className="font-greek font-extrabold text-text-primary dark:text-white text-lg">
              {tomorrow.grego}
            </span>
          </div>
        </Section>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="pt-2"
        >
          <Button
            size="lg"
            radius="full"
            fullWidth
            className={clsx(
              'font-extrabold shadow-sm transition-all active:scale-95',
              isSaved
                ? 'bg-rose-500 text-white dark:text-white border border-rose-500'
                : 'bg-secondary text-white dark:text-[#18181B]',
            )}
            onPress={onToggleSaved}
          >
            {isSaved ? '♥ Salva' : '♡ Salvar'}
          </Button>
        </motion.div>
      </div>
    </BottomSheet>
  );
};

interface SectionProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ icon, title, children }) => (
  <section className="bg-surface/60 dark:bg-surface-alt/30 border border-border/30 dark:border-border/10 rounded-2xl p-4">
    <h3 className="text-[11px] font-black uppercase tracking-widest text-text-secondary dark:text-zinc-400 mb-2 flex items-center gap-2">
      <span aria-hidden>{icon}</span>
      {title}
    </h3>
    {children}
  </section>
);
