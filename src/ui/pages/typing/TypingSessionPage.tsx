import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { ProgressBar } from '@/ui/components/ProgressBar';
import { GreekText } from '@/ui/greek/GreekText';
import { GreekKeyboard } from '@/ui/components/GreekKeyboard/GreekKeyboard';
import { useGreekKeyboard } from '@/ui/components/GreekKeyboard/useGreekKeyboard';
import { compareGreekWords, getLetterFeedback, normalizeGreek } from '@/features/typing/typingUtils';
import { WordPopup } from '@/ui/greek/WordPopup';
import { useTypingSession } from '@/features/typing/useTypingSession';
import { Button } from '@/ui/components/Button';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { useTextToSpeech } from '@/features/tts/useTextToSpeech';
import { useGamificationActions } from '@/features/gamification/useGamificationActions';
import { useGamificationStore } from '@/features/gamification/gamificationStore';
import { XP_VALUES } from '@/core/constants/config';
import { findStrongById } from '@/content/strong';
import { BookOpen, Volume2, ArrowRight, ArrowLeft } from 'lucide-react';

const SAMPLE_WORDS = [
  { greek: 'ἀγάπη', glossPT: 'amor', strongsId: 'G26', reference: '1 João 4:8' },
  { greek: 'λόγος', glossPT: 'palavra', strongsId: 'G3056', reference: 'João 1:1' },
  { greek: 'θεός', glossPT: 'Deus', strongsId: 'G2316', reference: 'João 1:1' },
  { greek: 'Ἰησοῦς', glossPT: 'Jesus', strongsId: 'G2424' },
  { greek: 'Χριστός', glossPT: 'Cristo', strongsId: 'G5547' },
  { greek: 'πνεῦμα', glossPT: 'espírito', strongsId: 'G4151' },
  { greek: 'πίστις', glossPT: 'fé', strongsId: 'G4102' },
  { greek: 'ἐλπίς', glossPT: 'esperança', strongsId: 'G1680' },
  { greek: 'εἰρήνη', glossPT: 'paz', strongsId: 'G1515' },
  { greek: 'χάρις', glossPT: 'graça', strongsId: 'G5485' },
  { greek: 'ζωή', glossPT: 'vida', strongsId: 'G2222' },
  { greek: 'φῶς', glossPT: 'luz', strongsId: 'G5457' },
  { greek: 'ἀλήθεια', glossPT: 'verdade', strongsId: 'G225' },
  { greek: 'κύριος', glossPT: 'Senhor', strongsId: 'G2962' },
  { greek: 'υἱός', glossPT: 'filho', strongsId: 'G5207' },
];

export const TypingSessionPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') === 'translate' ? 'translate' : 'copy';

  const session = useTypingSession(mode);
  const navigation = useAppNavigation();
  const { recordStudyActivity } = useGamificationActions();
  const addXP = useGamificationStore(s => s.addXP);
  const [currentResult, setCurrentResult] = useState<{
    isCorrect: boolean; score: number; input: string;
  } | null>(null);
  const [strongsId, setStrongsId] = useState<string | null>(null);
  const [letterFeedback, setLetterFeedback] = useState<{ char: string; isCorrect: boolean }[]>([]);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionCompleteRef = useRef(false);

  useEffect(() => {
    if (session.isComplete && !sessionCompleteRef.current) {
      sessionCompleteRef.current = true;
      const { total, correct } = session.getStats();
      const score = total > 0 ? Math.round((correct / total) * 100) : 0;
      const xp = score >= 80 ? XP_VALUES.TYPING_SESSION_COMPLETE : 2;
      addXP(xp);
      recordStudyActivity();
    }
  }, [session.isComplete]);

  useEffect(() => {
    session.loadWords(SAMPLE_WORDS);
    return () => { if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current); };
  }, []);

  const handleAdvance = useCallback(() => {
    if (advanceTimerRef.current) { clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null; }
    session.advanceWord();
    setCurrentResult(null);
    setLetterFeedback([]);
  }, [session]);

  const { speak } = useTextToSpeech();

  const speakWord = useCallback((greek: string, strongsId?: string) => {
    if (!greek) return;
    const entry = strongsId ? findStrongById(strongsId) : undefined;
    speak({ text: entry?.translit ?? greek, lang: entry?.translit ? 'pt-BR' : 'el-GR' });
  }, [speak]);

  const handleSubmit = useCallback(async (value: string) => {
    const comparison = compareGreekWords(value, session.currentWord?.greek ?? '', false);
    const feedback = getLetterFeedback(value, session.currentWord?.greek ?? '', false);

    await session.recordAnswer(value);

    setCurrentResult({ isCorrect: comparison.isCorrect, score: comparison.score, input: value });
    setLetterFeedback(feedback);

    if (comparison.isCorrect) {
      speakWord(session.currentWord?.greek ?? '', session.currentWord?.strongsId);
      advanceTimerRef.current = setTimeout(() => { handleAdvance(); }, 3500);
    }
  }, [session, speak, handleAdvance]);

  const keyboard = useGreekKeyboard(handleSubmit);

  useEffect(() => {
    keyboard.clear();
  }, [session.currentIndex, keyboard.clear]);

  useEffect(() => {
    if (currentResult || !session.currentWord) return;
    const feedback = getLetterFeedback(keyboard.input, session.currentWord.greek, false);
    setLetterFeedback(feedback);
  }, [keyboard.input, session.currentWord, currentResult]);

  const handleViewLexicon = () => {
    if (session.currentWord?.strongsId) {
      setStrongsId(session.currentWord.strongsId);
    }
  };

  const { total, correct } = session.getStats();

  if (session.isComplete) {
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    return (
      <SafeArea>
        <div className="flex flex-col items-center justify-center h-full px-6 gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={clsx(
              'w-24 h-24 rounded-full flex items-center justify-center',
              score >= 80 ? 'bg-success/20' : score >= 50 ? 'bg-secondary/20' : 'bg-error/20',
            )}
          >
            <span className="text-4xl">{score >= 80 ? '🎉' : score >= 50 ? '👍' : '💪'}</span>
          </motion.div>

          <h2 className="text-text-primary dark:text-white font-extrabold text-2xl text-center">
            Sessão Completa!
          </h2>

          <div className="bg-surface/50 dark:bg-surface-alt/30 border border-border/40 rounded-3xl p-6 w-full max-w-xs text-center">
            <p className="text-text-secondary text-sm mb-1">Pontuação</p>
            <p className={clsx(
              'text-4xl font-black',
              score >= 80 ? 'text-success' : score >= 50 ? 'text-secondary' : 'text-error',
            )}>
              {score}%
            </p>
            <p className="text-text-secondary text-xs mt-2">
              {correct}/{total} corretas
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button
              label="Tentar Novamente"
              onClick={() => session.loadWords(SAMPLE_WORDS)}
              fullWidth
              size="lg"
              radius="full"
              className="bg-secondary text-zinc-900 shadow-md"
            />
          </div>
        </div>
      </SafeArea>
    );
  }

  if (!session.currentWord) {
    return (
      <SafeArea>
        <div className="flex items-center justify-center h-full">
          <p className="text-text-secondary">Carregando...</p>
        </div>
      </SafeArea>
    );
  }

  const word = session.currentWord;
  const highlightLetters = [...new Set(
    normalizeGreek(word.greek).split('').filter(c => c.match(/[α-ως]/))
  )];

  return (
    <SafeArea withBottomNav={false} className="h-dvh overflow-hidden flex flex-col bg-background">
      <div className="flex-shrink-0 px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={navigation.goBack}
            className="w-10 h-10 !rounded-full bg-surface dark:bg-surface-alt flex items-center justify-center border border-border/40 shadow-sm active:scale-95 transition-transform shrink-0"
            aria-label="Voltar"
          >
            <ArrowLeft size={20} className="text-text-primary dark:text-white" />
          </button>
          <span className="text-text-secondary text-xs font-bold uppercase tracking-wider">
            Sessão de Digitação
          </span>
          <div className="flex-1" />
          <span className="bg-secondary/20 text-secondary text-[10px] font-black px-3 py-1 rounded-full">
            {session.currentIndex + 1}/{session.totalWords}
          </span>
        </div>
        <ProgressBar value={session.progress} color="bg-secondary" height={5} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <div className="flex flex-col gap-4 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={session.currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-surface border border-secondary/20 dark:border-secondary/15 rounded-[24px] p-6 text-center relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />
              <div className="relative">
                {mode === 'translate' ? (
                  <>
                    <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                      Digite em grego
                    </p>
                    <p className="text-text-primary text-xl font-extrabold leading-relaxed">
                      {word.glossPT}
                    </p>
                    <button
                      onClick={() => speakWord(word.greek, word.strongsId)}
                      className="mt-2 mx-auto w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center active:scale-90 transition-all"
                    >
                      <Volume2 size={16} className="text-secondary" />
                    </button>
                    {word.reference && (
                      <p className="text-text-secondary text-xs mt-1">{word.reference}</p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                      Copie a palavra
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <GreekText text={word.greek} size="xl" />
                      <button
                        onClick={() => speakWord(word.greek, word.strongsId)}
                        className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center active:scale-90 transition-all shrink-0"
                      >
                        <Volume2 size={16} className="text-secondary" />
                      </button>
                    </div>
                    {word.glossPT && (
                      <p className="text-text-secondary text-xs mt-1">{word.glossPT}</p>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {currentResult ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                'rounded-2xl p-4 text-center',
                currentResult.isCorrect
                  ? 'bg-success/10 border border-success/20'
                  : 'bg-error/10 border border-error/20',
              )}
            >
              <p className={clsx(
                'font-bold text-lg mb-1',
                currentResult.isCorrect ? 'text-success' : 'text-error',
              )}>
                {currentResult.isCorrect ? 'Correto!' : 'Não foi dessa vez'}
              </p>
              {!currentResult.isCorrect && (
                <>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <span className="text-text-secondary text-sm">Correto:</span>
                    <GreekText text={word.greek} size="lg" />
                  </div>
                  {word.glossPT && (
                    <p className="text-text-secondary text-xs mt-1">({word.glossPT})</p>
                  )}
                  <button
                    onClick={handleAdvance}
                    className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-error/15 text-error text-sm font-bold active:scale-95 transition-all"
                  >
                    Próxima <ArrowRight size={14} />
                  </button>
                </>
              )}
              {currentResult.isCorrect && word.strongsId && (
                <button
                  onClick={handleViewLexicon}
                  className="mt-3 inline-flex items-center gap-1.5 text-primary text-xs font-bold hover:underline"
                >
                  <BookOpen size={14} />
                  Ver no Léxico
                </button>
              )}
            </motion.div>
          ) : (
            <>
              <div className="bg-surface/50 dark:bg-surface-alt/30 border border-border/40 rounded-2xl p-4">
                <div className="flex items-center justify-center gap-1.5 min-h-[48px] flex-wrap">
                  {letterFeedback.length > 0 ? (
                    letterFeedback.map((fb, i) => (
                      <span
                        key={i}
                        className={clsx(
                          'font-greek text-2xl font-bold transition-colors duration-200',
                          fb.isCorrect ? 'text-success' : 'text-text-primary',
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
                  {keyboard.input.length > 0 && (
                    <span className="w-0.5 h-7 bg-secondary animate-pulse ml-0.5" />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 pb-2">
        <GreekKeyboard
          onInput={keyboard.handleInput}
          onDelete={keyboard.handleDelete}
          onSubmit={keyboard.handleSubmit}
          highlightLetters={highlightLetters}
          inputValue={keyboard.input}
          disabled={!!currentResult}
        />
      </div>

      <WordPopup strongsId={strongsId} onClose={() => { setStrongsId(null); }} />
    </SafeArea>
  );
};
