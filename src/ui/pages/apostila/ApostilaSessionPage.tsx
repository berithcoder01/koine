import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { BottomNav } from '@/ui/layouts/BottomNav';
import { clsx } from 'clsx';
import { Play, Pause, Volume2, Check, Sparkles } from 'lucide-react';
import { useApostilaSession } from '@/features/apostila/useApostilaSession';
import { WriteCounter } from '@/ui/components/WriteCounter';
import { ProgressBar } from '@/ui/components/ProgressBar';
import { APOSTILA_LESSONS } from '@/content/apostila/lessons';

export const ApostilaSessionPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const session = useApostilaSession(lessonId ?? '');

  if (!lessonId || !session) {
    navigate('/apostila');
    return null;
  }

  const { state, incrementWriteCount, revealDictation, advanceStep, playCurrentAudio } = session;
  const { lesson, currentStep, progressPercent, writeCount, isDictationRevealed, isCompleted, isAudioPlaying } = state;

  const isDictationWaiting = currentStep.type === 'dictation' && !isDictationRevealed;

  const handleActionPress = () => {
    switch (currentStep.type) {
      case 'intro':
      case 'pause':
        advanceStep();
        break;
      case 'word_intro':
      case 'alphabet_trace':
      case 'read_aloud':
        advanceStep();
        break;
      case 'write_practice':
        if (writeCount < (currentStep.writeRepetitions ?? 8)) {
          incrementWriteCount();
        } else {
          advanceStep();
        }
        break;
      case 'dictation':
        if (!isDictationRevealed) {
          revealDictation();
        } else {
          advanceStep();
        }
        break;
    }
  };

  const getActionButtonLabel = () => {
    switch (currentStep.type) {
      case 'intro':
        return 'Começar ▶';
      case 'word_intro':
        return 'Entendido, continuar';
      case 'alphabet_trace':
        return 'Vou praticar agora';
      case 'write_practice':
        return writeCount < (currentStep.writeRepetitions ?? 8) ? '✓ Escrevi uma vez' : 'Continuar ▶';
      case 'dictation':
        return isDictationRevealed ? 'Continuar ▶' : 'Revelar resposta';
      case 'read_aloud':
        return 'Continuar ▶';
      case 'pause':
        return 'Pronto, continuar ▶';
      default:
        return 'Continuar ▶';
    }
  };

  const renderStepContent = () => {
    switch (currentStep.type) {
      case 'intro':
      case 'pause':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-secondary/15 flex items-center justify-center mx-auto">
              {currentStep.type === 'intro' ? (
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ) : (
                <Sparkles size={32} className="text-secondary" />
              )}
            </div>
            <div className="max-w-lg">
              <h3 className="font-black text-lg text-text-primary dark:text-white mb-3">{currentStep.displayText}</h3>
              <p className="text-text-secondary dark:text-zinc-400 text-base leading-relaxed whitespace-pre-line">{currentStep.narration}</p>
            </div>
          </motion.div>
        );

      case 'word_intro':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <span className="text-5xl font-bold text-primary dark:text-primary-light font-serif">
                {currentStep.greekForm}
              </span>
            </div>

            <div className="max-w-lg text-center gap-3">
              <p className="text-text-secondary dark:text-zinc-400 text-sm font-medium">{currentStep.transliteration}</p>
              <p className="text-text-secondary dark:text-zinc-400 text-[11px]">{currentStep.pronunciation}</p>
              <p className="text-text-primary dark:text-white font-semibold text-lg">{currentStep.translation}</p>
            </div>

            {currentStep.etymology && (
              <div className="w-full max-w-lg bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-4 border border-border/20">
                <p className="text-[10px] font-bold text-text-secondary dark:text-zinc-400 uppercase tracking-wider mb-1">Origem</p>
                <p className="text-text-secondary dark:text-zinc-400 text-xs leading-relaxed">{currentStep.etymology}</p>
              </div>
            )}

            {currentStep.contextVerse && (
              <div className="w-full max-w-lg bg-secondary/5 border border-secondary/20 rounded-2xl p-4 border-l-4 border-secondary">
                <p className="text-[10px] font-bold text-secondary dark:text-secondary-light uppercase tracking-wider mb-1">{currentStep.contextVerse}</p>
                <p className="text-text-secondary dark:text-zinc-400 text-xs leading-relaxed">"{currentStep.contextVerseText}"</p>
              </div>
            )}
          </motion.div>
        );

      case 'alphabet_trace':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex gap-8">
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold text-text-secondary dark:text-zinc-400 uppercase tracking-wider">Maiúscula</p>
                <span className="text-6xl font-bold text-text-primary dark:text-white font-serif">{currentStep.greekForm?.split(' ')[0]}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold text-text-secondary dark:text-zinc-400 uppercase tracking-wider">Minúscula</p>
                <span className="text-6xl font-bold text-text-primary dark:text-white font-serif">{currentStep.greekForm?.split(' ')[1]}</span>
              </div>
            </div>

            <p className="max-w-lg text-center text-text-secondary dark:text-zinc-400 text-sm leading-relaxed">
              {currentStep.narration}
            </p>

            {currentStep.showStrokeOrder && (
              <div className="w-48 h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-border/20 flex items-center justify-center">
                <span className="text-text-secondary dark:text-zinc-400 text-xs">Animação de traços aqui</span>
              </div>
            )}
          </motion.div>
        );

      case 'write_practice':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-6xl font-bold text-primary dark:text-primary-light font-serif">
              {currentStep.greekForm}
            </span>

            <div className="w-full max-w-md text-center">
              <p className="text-text-secondary dark:text-zinc-400 text-[11px] font-medium mb-2">
                {currentStep.writeInstruction}
              </p>
              <p className="text-text-secondary dark:text-zinc-400 text-sm leading-relaxed">
                {currentStep.narration}
              </p>
            </div>

            <WriteCounter
              total={currentStep.writeRepetitions ?? 8}
              current={writeCount}
              onIncrement={incrementWriteCount}
              isComplete={writeCount >= (currentStep.writeRepetitions ?? 8)}
            />
          </motion.div>
        );

      case 'dictation':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            {!isDictationRevealed ? (
              <>
                <div className="w-24 h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center mx-auto border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                  <span className="text-text-secondary dark:text-zinc-400 text-lg">?</span>
                </div>
                <div className="max-w-lg text-center">
                  <p className="text-text-secondary dark:text-zinc-400 text-sm font-medium mb-2">{currentStep.displayText}</p>
                  <p className="text-text-primary dark:text-white font-semibold text-lg">{currentStep.narration}</p>
                </div>
              </>
            ) : (
              <>
                <span className="text-5xl font-bold text-primary dark:text-primary-light animate-fadeIn font-serif">
                  {currentStep.greekForm}
                </span>
                <div className="max-w-lg text-center">
                  <p className="text-text-secondary dark:text-zinc-400 text-sm">{currentStep.translation}</p>
                  <p className="text-text-secondary dark:text-zinc-400 text-[11px] mt-2">
                    {currentStep.transliteration ? <><em>{currentStep.transliteration}</em></> : null}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        );

      case 'read_aloud':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-4xl font-bold text-primary dark:text-primary-light text-center leading-relaxed font-serif">
              {currentStep.greekForm}
            </span>

            <div className="max-w-lg text-center">
              <p className="text-text-secondary dark:text-zinc-400 text-sm">{currentStep.transliteration}</p>
              <p className="text-text-primary dark:text-white font-semibold text-lg mt-2">{currentStep.translation}</p>
            </div>

            <div className="w-full max-w-md flex items-center gap-3">
              <button
                onClick={playCurrentAudio}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 bg-primary border-primary text-white font-bold text-sm transition-all duration-200 active:scale-[0.98]"
              >
                <Volume2 size={18} />
                Ouvir novamente
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const handleClose = () => {
    if (!isCompleted) {
      window.speechSynthesis.cancel();
    }
    navigate('/apostila');
  };

  const nextLesson = APOSTILA_LESSONS.find(l => l.lessonNumber === lesson.lessonNumber + 1);

  if (isCompleted) {
    return (
      <SafeArea scrollable withBottomNav className="flex flex-col">
        <div className="flex-shrink-0 px-4 pt-6 pb-5">
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-surface dark:bg-surface-alt/40 border border-border/30 dark:border-border/15 flex items-center justify-center active:scale-95 transition-all"
          >
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col items-center gap-6 pb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="font-extrabold text-2xl text-text-primary dark:text-white mb-1">
              {lesson.title} concluída!
            </h2>
            <p className="text-text-secondary dark:text-zinc-400 text-sm mb-6">
              Você ganhou <span className="font-bold text-secondary">{lesson.xpReward} XP</span>
            </p>

            <div className="w-full max-w-md bg-surface dark:bg-surface-alt/40 border border-border/30 dark:border-border/10 rounded-3xl p-5 text-left mb-6">
              <h3 className="font-bold text-sm text-text-primary dark:text-white mb-3">Você escreveu:</h3>
              <ul className="space-y-2 text-text-secondary dark:text-zinc-400 text-sm">
                {lesson.steps
                  .filter(s => s.type === 'write_practice')
                  .map(s => (
                    <li key={s.id} className="flex items-center gap-2">
                      <span className="text-base font-bold text-primary font-serif">{s.greekForm}</span>
                      <span>× {s.writeRepetitions ?? 5}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-md">
              {nextLesson && (
                <button
                  onClick={() => navigate(`/apostila/${nextLesson.id}`)}
                  className={clsx(
                    'w-full px-6 py-4 rounded-full border-2 font-bold text-base transition-all duration-200 active:scale-[0.98]',
                    'bg-primary border-primary text-white hover:bg-primary/90 active:scale-95'
                  )}
                >
                  Ir para a Lição {nextLesson.lessonNumber} ▶
                </button>
              )}
              <button
                onClick={handleClose}
                className={clsx(
                  'w-full px-6 py-4 rounded-full border-2 font-bold text-base transition-all duration-200 active:scale-[0.98]',
                  'bg-surface border-border/30 dark:border-border/15 text-text-primary dark:text-white hover:bg-surface-alt/50 active:scale-[0.98]'
                )}
              >
                Voltar às lições
              </button>
            </div>
          </motion.div>
        </div>

        <BottomNav />
      </SafeArea>
    );
  }

  const showPaperBadge = currentStep.showPaperBadge || currentStep.type === 'write_practice' || currentStep.type === 'dictation';
  const showVoiceBadge = currentStep.showVoiceBadge || currentStep.type === 'read_aloud';

  return (
    <SafeArea scrollable withBottomNav className="flex flex-col">
      <div className="flex-shrink-0 px-4 pt-4 pb-3 flex items-center justify-between">
        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-full bg-surface dark:bg-surface-alt/40 border border-border/30 dark:border-border/15 flex items-center justify-center active:scale-95 transition-all"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex-1 text-center">
          <h1 className="text-text-primary dark:text-white font-extrabold text-base tracking-tight truncate pr-10">
            {lesson.title}
          </h1>
        </div>

        <button
          onClick={playCurrentAudio}
          className={clsx(
            'w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-all',
            isAudioPlaying
              ? 'bg-primary/15 border-primary/30 text-primary'
              : 'bg-surface dark:bg-surface-alt/40 border border-border/30 dark:border-border/15 text-text-secondary'
          )}
          aria-label={isAudioPlaying ? 'Pausar áudio' : 'Ouvir narração'}
        >
          {isAudioPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      <ProgressBar value={progressPercent} color="secondary" height={4} className="flex-shrink-0 px-4" />

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-6 pb-28">
        <div className="flex flex-col items-center gap-4">
          {renderStepContent()}

          {(showPaperBadge || showVoiceBadge) && (
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {showPaperBadge && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                  ✏️ Escreva no papel
                </div>
              )}
              {showVoiceBadge && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold">
                  🔊 Repita em voz alta
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleActionPress}
            disabled={isDictationWaiting}
            className={clsx(
              'w-full px-6 py-4 rounded-full border-2 font-bold text-base transition-all duration-200 active:scale-[0.98]',
              isDictationWaiting
                ? 'bg-surface border-border/30 dark:border-border/15 text-text-disabled cursor-not-allowed'
                : 'bg-primary border-primary text-white hover:bg-primary/90 active:scale-95'
            )}
          >
            {getActionButtonLabel()}
          </button>
        </div>
      </div>

      <BottomNav />
    </SafeArea>
  );
};