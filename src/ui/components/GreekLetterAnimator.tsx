import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StrokeDef {
  d: string;
  duration: number;
}

interface LetterDef {
  strokes: StrokeDef[];
  viewBox: string;
}

const LETTERS: Record<string, LetterDef> = {
  'α': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M68 18 C58 18 42 38 40 55 C38 72 28 82 22 82', duration: 0.9 },
      { d: 'M38 48 Q52 44 62 48', duration: 0.5 },
    ],
  },
  'ε': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M62 20 C38 20 28 32 28 50 C28 68 38 80 62 80', duration: 0.8 },
      { d: 'M28 50 Q50 42 62 50', duration: 0.5 },
    ],
  },
  'η': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M22 18 L22 80', duration: 0.6 },
      { d: 'M22 32 C22 22 38 18 48 18 L48 50 C48 68 48 82 48 88', duration: 0.9 },
    ],
  },
  'ι': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M48 12 L48 68 C48 78 42 82 38 82', duration: 0.8 },
    ],
  },
  'ο': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M50 18 C32 18 18 32 18 50 C18 68 32 82 50 82 C68 82 82 68 82 50 C82 32 68 18 50 18 Z', duration: 1.2 },
    ],
  },
  'υ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M22 18 L38 62 C42 72 48 78 50 78 C52 78 58 72 62 62 L78 18', duration: 1.0 },
    ],
  },
  'ω': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M12 18 C12 62 28 78 42 78 C48 78 50 68 50 62', duration: 0.9 },
      { d: 'M50 62 C50 68 52 78 58 78 C72 78 88 62 88 18', duration: 0.9 },
    ],
  },
  'β': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M35 8 L35 88', duration: 0.7 },
      { d: 'M35 22 C52 22 68 28 68 42 C68 56 48 58 35 58', duration: 0.9 },
      { d: 'M35 58 C55 58 72 62 72 75 C72 88 55 90 35 88', duration: 0.9 },
    ],
  },
  'γ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M18 12 L48 58 C50 62 50 65 50 68 C50 75 48 82 48 85', duration: 1.0 },
      { d: 'M82 12 L52 58 C50 62 50 65 50 68', duration: 0.9 },
    ],
  },
  'δ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M55 12 C45 8 35 15 32 25 C25 45 30 65 45 80 C55 88 65 90 72 88', duration: 1.0 },
      { d: 'M55 12 C55 42 55 62 55 88', duration: 0.7 },
    ],
  },
  'ζ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M28 12 L68 12 L48 48 L72 48', duration: 0.8 },
      { d: 'M48 48 L35 72 C32 78 28 82 25 85', duration: 0.8 },
    ],
  },
  'θ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M50 15 C30 15 18 30 18 50 C18 70 30 85 50 85 C70 85 82 70 82 50 C82 30 70 15 50 15 Z', duration: 1.0 },
      { d: 'M32 50 L68 50', duration: 0.4 },
    ],
  },
  'κ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M32 10 L32 90', duration: 0.6 },
      { d: 'M65 10 L32 50 L65 90', duration: 0.9 },
    ],
  },
  'λ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M35 8 L52 90', duration: 0.7 },
      { d: 'M68 8 L42 52', duration: 0.6 },
    ],
  },
  'μ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M12 18 L12 80', duration: 0.5 },
      { d: 'M12 30 C12 20 28 18 38 18 L38 52 C38 68 38 78 38 82', duration: 0.9 },
      { d: 'M38 30 C38 20 55 18 65 18 L65 80', duration: 0.9 },
    ],
  },
  'ν': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M18 12 L18 80', duration: 0.5 },
      { d: 'M18 12 L82 80', duration: 0.7 },
    ],
  },
  'π': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M12 18 L88 18', duration: 0.6 },
      { d: 'M32 18 L32 85', duration: 0.6 },
      { d: 'M68 18 L68 85', duration: 0.6 },
    ],
  },
  'ρ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M32 8 L32 88', duration: 0.6 },
      { d: 'M32 22 C52 22 68 28 68 45 C68 62 52 68 32 68', duration: 0.9 },
    ],
  },
  'σ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M65 12 L78 8', duration: 0.3 },
      { d: 'M65 12 C42 12 25 25 22 45 C18 68 30 82 50 85 C65 88 75 82 78 72', duration: 1.0 },
    ],
  },
  'τ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M22 22 L78 22', duration: 0.5 },
      { d: 'M50 22 L45 85', duration: 0.7 },
    ],
  },
  'φ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M50 5 L50 95', duration: 0.7 },
      { d: 'M50 30 C32 30 22 42 22 55 C22 68 35 80 50 80 C65 80 78 68 78 55 C78 42 68 30 50 30 Z', duration: 1.0 },
    ],
  },
  'χ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M18 10 L82 90', duration: 0.8 },
      { d: 'M82 10 L18 90', duration: 0.8 },
    ],
  },
  'ψ': {
    viewBox: '0 0 100 100',
    strokes: [
      { d: 'M50 8 L50 90', duration: 0.7 },
      { d: 'M22 22 C22 62 50 72 50 72 C50 72 78 62 78 22', duration: 1.0 },
    ],
  },
};

interface GreekLetterAnimatorProps {
  letter: string;
  onComplete?: () => void;
  autoPlay?: boolean;
}

export const GreekLetterAnimator: React.FC<GreekLetterAnimatorProps> = ({
  letter,
  onComplete,
  autoPlay = true,
}) => {
  const [currentStroke, setCurrentStroke] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const letterDef = LETTERS[letter] || LETTERS['α'];
  const { strokes, viewBox } = letterDef;

  useEffect(() => {
    if (!autoPlay) return;

    setCurrentStroke(0);
    let delay = 0;

    strokes.forEach((stroke, i) => {
      timerRef.current = setTimeout(() => {
        setCurrentStroke(i);
      }, delay * 1000);
      delay += stroke.duration + 0.3;
    });

    timerRef.current = setTimeout(() => {
      setIsComplete(true);
      onComplete?.();
    }, (delay + 0.5) * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [letter, autoPlay]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48 bg-white dark:bg-zinc-800 rounded-3xl border-2 border-border/20 flex items-center justify-center overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="w-36 h-36"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Ghost letter (faint) */}
          {strokes.map((stroke, i) => (
            <path
              key={`ghost-${i}`}
              d={stroke.d}
              stroke="currentColor"
              strokeWidth={4}
              className="text-zinc-200 dark:text-zinc-700"
              fill="none"
            />
          ))}

          {/* Animated strokes */}
          <AnimatePresence>
            {strokes.map((stroke, i) => {
              if (i > currentStroke) return null;
              const isActive = i === currentStroke && !isComplete;

              return (
                <motion.path
                  key={`stroke-${i}`}
                  d={stroke.d}
                  stroke="#EA662C"
                  strokeWidth={isActive ? 5 : 4}
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: stroke.duration,
                    ease: 'easeInOut',
                  }}
                  onAnimationComplete={() => {
                    if (i === strokes.length - 1) {
                      setIsComplete(true);
                      onComplete?.();
                    }
                  }}
                />
              );
            })}
          </AnimatePresence>
        </svg>

        {/* Letter label */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-xs font-bold text-text-secondary dark:text-zinc-400 uppercase tracking-wider">
            {letter}
          </span>
        </div>
      </div>

      {/* Stroke counter */}
      <div className="flex items-center gap-2">
        {strokes.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < currentStroke
                ? 'bg-secondary'
                : i === currentStroke
                ? 'bg-secondary scale-125'
                : 'bg-zinc-300 dark:bg-zinc-600'
            }`}
          />
        ))}
      </div>

      {/* Instruction text */}
      <p className="text-text-secondary dark:text-zinc-400 text-xs text-center max-w-[200px]">
        {isComplete
          ? 'Traçado completo! Agora é sua vez.'
          : currentStroke >= 0
          ? `Traço ${currentStroke + 1} de ${strokes.length}`
          : 'Preparando...'}
      </p>
    </div>
  );
};
