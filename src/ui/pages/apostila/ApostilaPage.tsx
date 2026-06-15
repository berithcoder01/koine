import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { BottomNav } from '@/ui/layouts/BottomNav';
import { useProgressStore } from '@/features/progress/progressStore';
import { APOSTILA_LESSONS } from '@/content/apostila/lessons';
import { clsx } from 'clsx';
import { Capacitor } from '@capacitor/core';

interface LessonGroup {
  id: string;
  title: string;
  subtitle: string;
  lessons: typeof APOSTILA_LESSONS;
}

const LESSON_GROUPS: LessonGroup[] = [
  {
    id: 'bloco-1',
    title: 'Bloco 1 — Alfabeto',
    subtitle: 'Aprenda as vogais e consoantes do grego bíblico',
    lessons: APOSTILA_LESSONS.filter(l => l.lessonNumber >= 1 && l.lessonNumber <= 6),
  },
  {
    id: 'bloco-2',
    title: 'Bloco 2 — Vocabulário Essencial',
    subtitle: 'As 50 palavras mais frequentes do NT',
    lessons: APOSTILA_LESSONS.filter(l => l.lessonNumber >= 7 && l.lessonNumber <= 16),
  },
  {
    id: 'bloco-3',
    title: 'Bloco 3 — Frases do NT',
    subtitle: 'Textos reais do Novo Testamento',
    lessons: APOSTILA_LESSONS.filter(l => l.lessonNumber >= 17 && l.lessonNumber <= 20),
  },
];

function getLessonStatus(lesson: typeof APOSTILA_LESSONS[0], completed: string[]) {
  if (completed.includes(lesson.id)) return 'completed';
  if (lesson.requiresPrevious) {
    const idx = APOSTILA_LESSONS.findIndex(l => l.id === lesson.id);
    const prev = APOSTILA_LESSONS[idx - 1];
    if (!completed.includes(prev.id)) return 'locked';
  }
  return 'available';
}

function handleDownloadApostila() {
  const url = '/assets/apostila-koineapp.pdf';
  if (Capacitor.isNativePlatform()) {
    // Browser.open is not available without @capacitor/browser
    window.open(url, '_blank');
  } else {
    window.open(url, '_blank');
  }
}

export const ApostilaPage: React.FC = () => {
  const navigate = useNavigate();
  const { completedApostilaLessons } = useProgressStore();

  return (
    <SafeArea scrollable withBottomNav className="flex flex-col">
      {/* ── HEADER ── */}
      <div className="flex-shrink-0 px-4 pt-6 pb-5 transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-text-secondary dark:text-zinc-400 text-xs font-semibold">Extra</p>
            <h1 className="text-text-primary dark:text-white font-extrabold text-2xl tracking-tight mt-0.5">
              Estudo com Apostila
            </h1>
          </div>
          <span className="bg-secondary/20 text-secondary dark:text-secondary-light text-xs font-bold px-3 py-1 rounded-full">
            {completedApostilaLessons.length}/20 lições
          </span>
        </div>

        <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary/15 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-black text-sm text-text-primary dark:text-white">
                Imprima a apostila e use com seu professor digital
              </p>
              <p className="text-text-secondary dark:text-zinc-400 text-xs mt-0.5">
                O app narra, instrui e aguarda você escrever no papel
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadApostila}
            className={clsx(
              'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 font-bold text-sm transition-all duration-200 active:scale-[0.98]',
              'bg-secondary border-secondary text-white hover:bg-secondary/90 active:scale-[0.98]'
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Baixar Apostila PDF
          </button>
        </div>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-6 pb-28">
        {LESSON_GROUPS.map((group, groupIdx) => (
          <motion.div key={group.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: groupIdx * 0.1, duration: 0.3 }}>
            <div className="mb-4">
              <h2 className="text-text-primary dark:text-white font-black text-lg tracking-tight">{group.title}</h2>
              <p className="text-text-secondary dark:text-zinc-400 text-[11px] mt-0.5">{group.subtitle}</p>
            </div>

            <div className="flex flex-col gap-3">
              {group.lessons.map((lesson) => {
                const status = getLessonStatus(lesson, completedApostilaLessons);
                const isLocked = status === 'locked';

                return (
                  <motion.button
                    key={lesson.id}
                    disabled={isLocked}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !isLocked && navigate(`/apostila/${lesson.id}`)}
                    className={clsx(
                      'w-full relative overflow-hidden bg-surface dark:bg-surface-alt/40 border rounded-3xl p-5 shadow-sm transition-all duration-200 text-left',
                      isLocked
                        ? 'opacity-40 cursor-not-allowed'
                        : 'cursor-pointer active:scale-[0.99]'
                    )}
                  >
                    {isLocked && (
                      <div className="absolute inset-0 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-3xl flex items-center justify-center pointer-events-none">
                        <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    )}

                    <div className="flex items-start gap-4 relative z-10">
                      <div className={clsx(
                        'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 flex-col',
                        status === 'completed'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : status === 'available'
                          ? 'bg-secondary/15 text-secondary dark:text-secondary-light'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                      )}>
                        {status === 'completed' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-[10px] font-black uppercase tracking-wider">L{lesson.lessonNumber.toString().padStart(2, '0')}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className={clsx(
                          'font-bold text-sm leading-snug truncate',
                          isLocked ? 'text-text-disabled' : 'text-text-primary dark:text-white'
                        )}>
                          {lesson.title}
                        </h3>
                        <p className={clsx(
                          'text-[10px] mt-1 leading-relaxed truncate',
                          isLocked ? 'text-text-disabled' : 'text-text-secondary dark:text-zinc-400'
                        )}>
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-secondary dark:text-secondary-light text-[9px] font-bold">
                            {lesson.xpReward} XP
                          </span>
                          <span className="text-text-secondary dark:text-zinc-400 text-[9px]">
                            ~{lesson.estimatedMinutes} min
                          </span>
                          <span className="text-text-secondary dark:text-zinc-400 text-[9px]">
                            Página {lesson.apostilaPdfPage}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {status === 'completed' ? (
                          <span className="text-green-500 dark:text-green-400 text-[10px] font-bold">✓ Feito</span>
                        ) : isLocked ? (
                          <span className="text-text-disabled text-[10px] font-medium">Bloqueado</span>
                        ) : (
                          <span className="text-primary dark:text-primary-light text-[10px] font-bold">▶ Iniciar</span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </SafeArea>
  );
};