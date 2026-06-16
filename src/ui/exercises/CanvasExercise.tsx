import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useHaptics } from '@/features/settings/useHaptics';
import { APP_CONFIG } from '@/core/constants/config';
import { Button } from '@/ui/components/Button';
import { gridValidate } from '@/core/utils/gridValidator';

interface Point { x: number; y: number; }

interface CanvasExerciseProps {
  exercise: {
    targetLetter?: string;
    question_pt?: string;
    explanation: string;
    xp_reward?: number;
  };
  onAnswer: (isCorrect: boolean, explanation?: string, correctAnswer?: string) => void;
}

async function calculateScore(strokes: Point[][], canvasSize: number, letterChar: string): Promise<number> {
  if (strokes.length === 0) return 0;
  return gridValidate(strokes, letterChar, canvasSize);
}

export const CanvasExercise: React.FC<CanvasExerciseProps> = ({ exercise, onAnswer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { light, medium } = useHaptics();
  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef<Point[]>([]);
  const [allStrokes, setAllStrokes] = useState<Point[][]>([]);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'pass' | 'fail'>('idle');
  const [canvasSize, setCanvasSize] = useState(300);

  const targetLetter = exercise.targetLetter ?? '?';

  useEffect(() => {
    const size = Math.min(window.innerWidth - 48, 320);
    setCanvasSize(size);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      setTimeout(() => drawBackground(), 0);
    }
  }, [canvasSize, targetLetter]);

  const drawBackground = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ghost letter guide
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#1A3A5C';
    ctx.font = `bold ${canvas.width * 0.75}px SBL Greek, Gentium Plus, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(targetLetter, canvas.width / 2, canvas.height / 2);
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
  }, [targetLetter]);

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
  }, [canvasSize]);

  const handleVerify = async () => {
    if (allStrokes.length === 0) return;
    const calculatedScore = await calculateScore(allStrokes, canvasSize, targetLetter);
    setScore(calculatedScore);
    const passed = calculatedScore >= APP_CONFIG.CANVAS_PASS_SCORE;
    setFeedback(passed ? 'pass' : 'fail');

    if (passed) {
      light();
    } else {
      medium();
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

  const handleConfirmPass = () => {
    onAnswer(true, exercise.explanation);
  };

  const handleSkip = () => {
    onAnswer(false, `Prática de escrita da letra "${targetLetter}" — tente novamente mais tarde.`);
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-2">
      {/* Instruction */}
      <div className="text-center">
        <p className="text-text-secondary dark:text-zinc-400 text-sm">
          {exercise.question_pt ?? `Trace a letra "${targetLetter}" no canvas abaixo`}
        </p>
      </div>

      {/* Canvas */}
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

      {/* Score feedback */}
      {score !== null && (
        <div className={`w-full rounded-2xl p-3 text-center ${
          feedback === 'pass' ? 'bg-success/15 dark:bg-success/5' : 'bg-error/15 dark:bg-error/5'
        }`}>
          <p className={`text-xl font-bold ${feedback === 'pass' ? 'text-success' : 'text-error'}`}>
            {feedback === 'pass' ? '✅' : '❌'} {score}/100
          </p>
          <p className="text-text-secondary dark:text-zinc-400 text-xs mt-1">
            {feedback === 'pass'
              ? 'Ótimo traçado!'
              : `Tentativa ${attempts}/${APP_CONFIG.CANVAS_MAX_ATTEMPTS} — continue praticando`}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 w-full">
        {feedback === 'idle' && (
          <>
            <Button label="Apagar" onClick={handleClear} variant="outline" fullWidth radius="lg" />
            <Button label="Verificar" onClick={handleVerify} fullWidth radius="lg" />
          </>
        )}
        {feedback === 'pass' && (
          <>
            <Button label="Apagar" onClick={handleClear} variant="outline" fullWidth radius="lg" />
            <Button label="Continuar →" onClick={handleConfirmPass} variant="secondary" fullWidth radius="lg" />
          </>
        )}
        {feedback === 'fail' && attempts < APP_CONFIG.CANVAS_MAX_ATTEMPTS && (
          <>
            <Button label="Apagar" onClick={handleClear} variant="outline" fullWidth radius="lg" />
            <Button label="Tentar novamente" onClick={handleClear} fullWidth radius="lg" />
          </>
        )}
        {feedback === 'fail' && attempts >= APP_CONFIG.CANVAS_MAX_ATTEMPTS && (
          <Button label="Pular exercício" onClick={handleSkip} variant="ghost" fullWidth radius="lg" />
        )}
      </div>
    </div>
  );
};
