import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { dbQueries } from '@/features/database/queries';
import { Button } from '@/ui/components/Button';
import { GreekText } from '@/ui/greek/GreekText';
import { APP_CONFIG, XP_VALUES } from '@/core/constants/config';
import { useGamificationStore } from '@/features/gamification/gamificationStore';
import { useProgressStore } from '@/features/progress/progressStore';
import { useGamificationActions } from '@/features/gamification/useGamificationActions';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useProgressSync } from '@/features/progress/useProgressSync';
import { gridValidate } from '@/core/utils/gridValidator';
import { clsx } from 'clsx';

interface Point { x: number; y: number; }
const COMPLETED_KEY = 'koine-canvas-completed';

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch { return new Set(); }
}

function saveCompleted(ids: Set<string>) {
  try { localStorage.setItem(COMPLETED_KEY, JSON.stringify([...ids])); } catch {}
}

const ALPHABET_LETTERS = [
  'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta',
  'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi',
  'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
];

export const CanvasPage: React.FC = () => {
  const { letterId } = useParams<{ letterId: string }>();
  const navigation = useAppNavigation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const addXP = useGamificationStore(s => s.addXP);
  const markUnitComplete = useProgressStore(s => s.markUnitComplete);
  const markCanvasLetterComplete = useProgressStore(s => s.markCanvasLetterComplete);
  const { syncToFirestore } = useProgressSync();
  const { checkAchievements, recordStudyActivity } = useGamificationActions();
  const xpAwardedRef = useRef(false);

  const [allLetters, setAllLetters] = useState<any[]>([]);
  const [letter, setLetter] = useState<any>(null);
  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef<Point[]>([]);
  const [allStrokes, setAllStrokes] = useState<Point[][]>([]);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'pass' | 'fail'>('idle');
  const [canvasSize, setCanvasSize] = useState(300);
  const [completedLetters, setCompletedLetters] = useState<Set<string>>(loadCompleted);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const size = Math.min(window.innerWidth - 32, 340);
    setCanvasSize(size);
  }, []);

  useEffect(() => { loadAllLetters(); }, []);

  useEffect(() => {
    if (letterId && allLetters.length > 0) {
      const found = allLetters.find((l: any) => l.id === letterId);
      setLetter(found ?? allLetters[0]);
    }
  }, [letterId, allLetters]);

  useEffect(() => {
    if (letter && canvasRef.current) { resetCanvas(); }
  }, [letter, canvasSize]);

  const loadAllLetters = async () => {
    try {
      const result = await dbQueries.getAllLetters();
      setAllLetters(result ?? []);
    } catch { setAllLetters([]); }
  };

  const currentIndex = allLetters.findIndex((l: any) => l.id === letter?.id);
  const prevLetter = currentIndex > 0 ? allLetters[currentIndex - 1] : null;
  const nextLetter = currentIndex < allLetters.length - 1 ? allLetters[currentIndex + 1] : null;

  const navigateLetter = (dir: 'prev' | 'next') => {
    const target = dir === 'prev' ? prevLetter : nextLetter;
    if (!target) return;
    xpAwardedRef.current = false;
    setLetter(target);
    resetCanvas();
    window.history.replaceState(null, '', `/canvas/${target.id}`);
  };

  const resetCanvas = () => {
    setAllStrokes([]);
    isDrawingRef.current = false;
    currentStrokeRef.current = [];
    setFeedback('idle');
    setScore(null);
    setAttempts(0);
    setTimeout(() => drawBackground(), 0);
  };

  const drawBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas || !letter) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Ghost letter guide
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#1A3A5C';
    ctx.font = `bold ${canvas.width * 0.75}px SBL Greek, Gentium Plus, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter.lowerCase, canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 1;
    // Crosshair guide lines
    ctx.strokeStyle = '#D4CCBC';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  // Touch e Mouse handlers nativos para evitar re-renderizações desnecessárias e lag de traço
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getCanvasPoint = (e: MouseEvent | TouchEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      const source = 'touches' in e ? e.touches[0] : (e as MouseEvent);
      return {
        x: (source.clientX - rect.left) * (canvas.width / rect.width),
        y: (source.clientY - rect.top) * (canvas.height / rect.height),
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isDrawingRef.current = true;
      const pt = getCanvasPoint(e);
      currentStrokeRef.current = [pt];
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const ctx = canvas.getContext('2d')!;
      const pt = getCanvasPoint(e);
      const points = currentStrokeRef.current;
      points.push(pt);

      if (points.length > 1) {
        const last = points[points.length - 2];
        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
      }
    };

    const handleEnd = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;
      const finalStroke = [...currentStrokeRef.current];
      if (finalStroke.length > 0) {
        setAllStrokes(prev => [...prev, finalStroke]);
      }
      currentStrokeRef.current = [];
    };

    // Touch events (passive: false para evitar scroll do Android)
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd, { passive: false });

    // Mouse events
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);

      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('mouseleave', handleEnd);
    };
  }, [canvasSize, letter]);

  const handleVerify = async () => {
    if (allStrokes.length === 0 || !letter) return;
    const calculatedScore = await calculateScore(allStrokes, canvasSize, letter.lowerCase);
    setScore(calculatedScore);
    const passed = calculatedScore >= APP_CONFIG.CANVAS_PASS_SCORE;
    setFeedback(passed ? 'pass' : 'fail');

    if (passed) {
      Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
      if (!xpAwardedRef.current && letter && !completedLetters.has(letter.id)) {
        xpAwardedRef.current = true;
        const xpAmount = attempts === 0
          ? XP_VALUES.CANVAS_FIRST_TRY
          : XP_VALUES.CANVAS_SECOND_TRY;
        addXP(xpAmount);
        recordStudyActivity();
        markCanvasLetterComplete(letter.id);
        const next = new Set(completedLetters);
        next.add(letter.id);
        setCompletedLetters(next);
        saveCompleted(next);
        const allLetterIds = ALPHABET_LETTERS;
        const allDone = allLetterIds.every(id => next.has(id));
        if (allDone) {
          const ps = useProgressStore.getState();
          if (!ps.completedUnits.includes('C1')) {
            markUnitComplete('C1');
          }
          setAllDone(true);
        }
        await checkAchievements(xpAmount);
        syncToFirestore();
      }
    } else {
      Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
      setAttempts(prev => prev + 1);
    }
  };

  const handleClear = () => {
    setAllStrokes([]);
    isDrawingRef.current = false;
    currentStrokeRef.current = [];
    setFeedback('idle');
    setScore(null);
    drawBackground();
  };

  return (
    <SafeArea withBottomNav={false}>
      <div className="flex-shrink-0 bg-transparent px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigation.goToReview()}
            className="w-10 h-10 !rounded-full bg-surface dark:bg-surface-alt flex items-center justify-center border border-border/40 shadow-sm active:scale-95 transition-transform"
            aria-label="Voltar"
          >
            <ArrowLeft size={20} className="text-text-primary dark:text-white" />
          </button>
          <div>
            <h1 className="text-text-primary dark:text-white font-extrabold text-xl tracking-tight">
              Prática de Escrita
            </h1>
            <p className="text-text-secondary text-xs font-semibold">
              {letter ? `${letter.name} — Som: ${letter.sound}` : 'Carregando...'}
            </p>
          </div>
        </div>
      </div>

      {letter && (
        <>
          <div className="flex items-center justify-center gap-4 px-4 py-2">
            <button
              disabled={!prevLetter}
              onClick={() => navigateLetter('prev')}
              className="w-10 h-10 !rounded-full bg-surface dark:bg-surface-alt border border-border/30 flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-transform"
            >
              <ChevronLeft size={18} className="text-text-primary" />
            </button>
            <div className="relative">
              <GreekText text={`${letter.upperCase} ${letter.lowerCase}`} size="xl" />
              {completedLetters.has(letter.id) && (
                <span className="absolute -top-1 -right-3 text-success text-sm">✓</span>
              )}
            </div>
            <button
              disabled={!nextLetter}
              onClick={() => navigateLetter('next')}
              className="w-10 h-10 !rounded-full bg-surface dark:bg-surface-alt border border-border/30 flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-transform"
            >
              <ChevronRight size={18} className="text-text-primary" />
            </button>
          </div>

          <p className="text-text-secondary dark:text-zinc-400 text-[10px] text-center -mt-1 mb-2">
            {currentIndex + 1} / {allLetters.length}
            <span className="ml-2 text-success">
              {completedLetters.size} concluídas
            </span>
          </p>

          <div className="flex justify-center px-4">
            <div className={`rounded-3xl overflow-hidden border-4 transition-colors ${
              feedback === 'pass' ? 'border-success' :
              feedback === 'fail' ? 'border-error' :
              'border-border/40 dark:border-border/20'
            }`}>
              <canvas
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
                className="block bg-background touch-none"
              />
            </div>
          </div>

          {allDone && (
            <div className="mx-4 mt-4 rounded-2xl p-5 text-center bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 animate-fadeIn">
              <p className="text-4xl mb-2">🏛️</p>
              <p className="text-text-primary dark:text-white font-black text-lg">Alfabeto Completo!</p>
              <p className="text-text-secondary text-sm mt-1">Você desenhou todas as 24 letras gregas</p>
            </div>
          )}

          {score !== null && (
            <div className={`mx-4 mt-4 rounded-2xl p-4 text-center ${
              feedback === 'pass' ? 'bg-success/15 dark:bg-success/5' : 'bg-error/15 dark:bg-error/5'
            }`}>
              <p className={`text-2xl font-bold ${feedback === 'pass' ? 'text-success' : 'text-error'}`}>
                {feedback === 'pass' ? '✅' : '❌'} {score}/100
              </p>
              <p className="text-text-secondary dark:text-zinc-400 text-sm mt-1">
                {feedback === 'pass'
                  ? xpAwardedRef.current
                    ? `+${attempts === 0 ? XP_VALUES.CANVAS_FIRST_TRY : XP_VALUES.CANVAS_SECOND_TRY} XP`
                    : 'Letra já concluída anteriormente'
                  : `Tentativa ${attempts + 1}/${APP_CONFIG.CANVAS_MAX_ATTEMPTS}`}
              </p>
            </div>
          )}

          <div className="flex gap-3 px-4 mt-4">
            {feedback === 'idle' && (
              <>
                <Button label="Apagar" onClick={handleClear} variant="outline" fullWidth radius="lg" />
                <Button label="Verificar" onClick={handleVerify} fullWidth radius="lg" />
              </>
            )}
            {feedback === 'pass' && nextLetter && (
              <>
                <Button label="Apagar" onClick={handleClear} variant="outline" fullWidth radius="lg" />
                <Button label={`Próximo: ${nextLetter.name} →`} onClick={() => navigateLetter('next')} variant="secondary" fullWidth radius="lg" />
              </>
            )}
            {feedback === 'pass' && !nextLetter && (
              <>
                <Button label="Apagar" onClick={handleClear} variant="outline" fullWidth radius="lg" />
                <Button label={allDone ? 'Ver Conquistas →' : 'Concluído ✓'} onClick={() => navigation.goToReview()} variant="secondary" fullWidth radius="lg" />
              </>
            )}
            {feedback === 'fail' && attempts < APP_CONFIG.CANVAS_MAX_ATTEMPTS && (
              <>
                <Button label="Apagar" onClick={handleClear} variant="outline" fullWidth radius="lg" />
                <Button label="Tentar novamente" onClick={handleClear} fullWidth radius="lg" />
              </>
            )}
            {feedback === 'fail' && attempts >= APP_CONFIG.CANVAS_MAX_ATTEMPTS && (
              <Button label="Pular letra" onClick={resetCanvas} variant="ghost" fullWidth radius="lg" />
            )}
          </div>

          <div className="flex justify-center gap-1.5 px-4 mt-4 pb-4">
            {allLetters.map((l: any) => (
              <div
                key={l.id}
                className={clsx(
                  'w-2 h-2 rounded-full transition-colors',
                  completedLetters.has(l.id)
                    ? 'bg-success'
                    : l.id === letter?.id
                      ? 'bg-primary'
                      : 'bg-border/40 dark:bg-border/20',
                )}
              />
            ))}
          </div>
        </>
      )}
    </SafeArea>
  );
};

async function calculateScore(strokes: Point[][], canvasSize: number, letterChar: string): Promise<number> {
  if (strokes.length === 0) return 0;
  return gridValidate(strokes, letterChar, canvasSize);
}
