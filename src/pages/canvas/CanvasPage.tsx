// src/pages/canvas/CanvasPage.tsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useAppNavigation } from '@/hooks/useNavigation';
import { dbQueries } from '@/services/database/queries';
import { Button } from '@/components/ui/Button';
import { GreekText } from '@/components/greek/GreekText';
import { APP_CONFIG, XP_VALUES } from '@/constants/config';
import { SafeArea } from '@/components/layout/SafeArea';

interface Point { x: number; y: number; }

export const CanvasPage: React.FC = () => {
  const { letterId } = useParams<{ letterId: string }>();
  const navigation = useAppNavigation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [letter, setLetter] = useState<any>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [allStrokes, setAllStrokes] = useState<Point[][]>([]);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'pass' | 'fail'>('idle');
  const [canvasSize, setCanvasSize] = useState(300);

  useEffect(() => {
    const size = Math.min(window.innerWidth - 32, 340);
    setCanvasSize(size);
  }, []);

  useEffect(() => {
    if (letterId) loadLetter(letterId);
  }, [letterId]);

  useEffect(() => {
    if (letter && canvasRef.current) {
      drawBackground();
    }
  }, [letter, canvasSize]);

  const loadLetter = async (id: string) => {
    const result = await dbQueries.getAllLetters();
    const found = result.find((l: any) => l.id === id);
    setLetter(found ?? null);
  };

  const drawBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas || !letter) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#1A3A5C';
    ctx.font = `bold ${canvas.width * 0.65}px SBL Greek, Gentium Plus, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter.lowerCase, canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 1;

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

  const getCanvasPoint = (e: React.TouchEvent | React.MouseEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const source = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    return {
      x: (source.clientX - rect.left) * (canvas.width / rect.width),
      y: (source.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const pt = getCanvasPoint(e);
    setPoints([pt]);
  };

  const draw = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pt = getCanvasPoint(e);

    setPoints(prev => {
      const newPoints = [...prev, pt];
      if (newPoints.length > 1) {
        const last = newPoints[newPoints.length - 2];
        ctx.beginPath();
        ctx.strokeStyle = '#2A5C8A';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
      }
      return newPoints;
    });
  }, [isDrawing]);

  const endDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    setIsDrawing(false);
    setAllStrokes(prev => [...prev, points]);
  };

  const handleVerify = () => {
    if (allStrokes.length === 0) return;
    const calculatedScore = calculateScore(allStrokes, canvasSize);
    setScore(calculatedScore);
    const passed = calculatedScore >= APP_CONFIG.CANVAS_PASS_SCORE;
    setFeedback(passed ? 'pass' : 'fail');

    if (passed) {
      Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    } else {
      Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
      setAttempts(prev => prev + 1);
    }
  };

  const handleClear = () => {
    setAllStrokes([]);
    setPoints([]);
    setFeedback('idle');
    setScore(null);
    drawBackground();
  };

  return (
    <SafeArea withBottomNav={false}>
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={navigation.goBack} className="text-2xl text-textSecondary">←</button>
        <h1 className="font-bold text-textPrimary">Escreva a letra</h1>
        <div className="w-8" />
      </div>

      {letter && (
        <>
          <div className="flex items-center justify-center gap-6 px-4 py-4">
            <GreekText text={`${letter.upperCase} ${letter.lowerCase}`} size="xl" />
            <div>
              <p className="text-textPrimary font-bold text-lg capitalize">{letter.name}</p>
              <p className="text-textSecondary text-sm">Som: {letter.sound}</p>
            </div>
          </div>

          <div className="flex justify-center px-4">
            <div className={`rounded-3xl overflow-hidden border-4 transition-colors ${
              feedback === 'pass' ? 'border-success' :
              feedback === 'fail' ? 'border-error' :
              'border-border'
            }`}>
              <canvas
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
                className="block bg-background touch-none"
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
              />
            </div>
          </div>

          {score !== null && (
            <div className={`mx-4 mt-4 rounded-2xl p-4 text-center ${
              feedback === 'pass' ? 'bg-success/10' : 'bg-error/10'
            }`}>
              <p className={`text-2xl font-bold ${feedback === 'pass' ? 'text-success' : 'text-error'}`}>
                {feedback === 'pass' ? '✅' : '❌'} {score}/100
              </p>
              <p className="text-textSecondary text-sm mt-1">
                {feedback === 'pass'
                  ? `+${XP_VALUES.CANVAS_FIRST_TRY} XP`
                  : `Tentativa ${attempts + 1}/${APP_CONFIG.CANVAS_MAX_ATTEMPTS}`}
              </p>
            </div>
          )}

          <div className="flex gap-3 px-4 mt-4">
            <Button label="Apagar" onClick={handleClear} variant="outline" fullWidth />
            {feedback === 'idle' && (
              <Button label="Verificar" onClick={handleVerify} fullWidth />
            )}
            {feedback === 'pass' && (
              <Button label="Próximo →" onClick={navigation.goBack} variant="secondary" fullWidth />
            )}
            {feedback === 'fail' && attempts < APP_CONFIG.CANVAS_MAX_ATTEMPTS && (
              <Button label="Tentar novamente" onClick={handleClear} fullWidth />
            )}
            {feedback === 'fail' && attempts >= APP_CONFIG.CANVAS_MAX_ATTEMPTS && (
              <Button label="Continuar mesmo assim" onClick={navigation.goBack} variant="ghost" fullWidth />
            )}
          </div>
        </>
      )}
    </SafeArea>
  );
};

function calculateScore(strokes: Point[][], canvasSize: number): number {
  const allPoints = strokes.flat();
  if (allPoints.length < 10) return 20;

  const centerX = canvasSize / 2;
  const centerY = canvasSize / 2;
  const radius = canvasSize * 0.27;

  const pointsInCenter = allPoints.filter(p =>
    Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2) < radius,
  ).length;

  const coverage = pointsInCenter / allPoints.length;
  const score = Math.min(100, Math.round(coverage * 120));

  return Math.max(10, Math.min(100, score));
}
