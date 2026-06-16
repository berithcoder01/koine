import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export type ReaderMode = 'assisted' | 'challenge' | 'immersion' | 'interlinear' | 'transliteration';

interface ModeConfig {
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
}

const MODE_CONFIG: Record<ReaderMode, ModeConfig> = {
  assisted: {
    label: 'Assistido',
    shortLabel: 'Guia',
    icon: '📖',
    description: 'Tradução visível ao lado do grego',
  },
  challenge: {
    label: 'Desafio',
    shortLabel: 'Foco',
    icon: '🎯',
    description: 'Tente traduzir sem assistência',
  },
  immersion: {
    label: 'Imersão',
    shortLabel: 'Grego',
    icon: '🌊',
    description: 'Apenas grego + definição Strong (sem PT)',
  },
  interlinear: {
    label: 'Interlinear',
    shortLabel: 'Linear',
    icon: '🔤',
    description: 'Grego na linha, gloss PT logo abaixo',
  },
  transliteration: {
    label: 'Transliteração',
    shortLabel: 'Translit',
    icon: '🗣️',
    description: 'Grego + transliteração romanizada + tradução',
  },
};

interface Props {
  mode: ReaderMode;
  onChange: (mode: ReaderMode) => void;
  className?: string;
  compact?: boolean;
}


export const ReaderModeSelector: React.FC<Props> = ({
  mode,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeConfig = MODE_CONFIG[mode];
  const modes = Object.entries(MODE_CONFIG) as [ReaderMode, ModeConfig][];
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={clsx("relative z-40 mb-2", className)} ref={containerRef}>
      {/* Botão principal — única pílula, sem pílula interna */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-surface dark:bg-surface-alt border border-border/40 dark:border-border/10 shadow-sm select-none active:scale-[0.98] transition-transform"
        style={{ borderRadius: '9999px', padding: '16px 28px', minHeight: '60px' }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">{activeConfig.icon}</span>
          <span className="font-extrabold text-sm text-text-primary dark:text-white">
            {activeConfig.label}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-text-secondary text-xs opacity-60 font-bold"
        >
          ▼
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-surface dark:bg-surface-alt border border-border/20 dark:border-border/10 p-2 shadow-xl flex flex-col gap-1 overflow-hidden origin-top"
            style={{ borderRadius: '24px' }}
          >
            {modes.map(([m, cfg]) => {
              const isActive = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => { onChange(m); setIsOpen(false); }}
                  className={clsx(
                    "flex items-center gap-3 transition-all text-left w-full",
                    isActive
                      ? 'bg-secondary/15'
                      : 'hover:bg-surface-alt dark:hover:bg-zinc-800/50 active:bg-surface-alt dark:active:bg-zinc-700'
                  )}
                  style={{ borderRadius: '9999px', padding: '16px 28px', minHeight: '60px' }}
                >
                  <span className="text-xl leading-none">{cfg.icon}</span>
                  <div className="flex flex-col">
                    <span className={clsx(
                      "text-sm font-bold",
                      isActive ? 'text-secondary dark:text-secondary-light' : 'text-text-primary dark:text-white'
                    )}>
                      {cfg.label}
                    </span>
                    <span className="text-[10px] text-text-secondary opacity-90">
                      {cfg.description}
                    </span>
                  </div>
                  {isActive && (
                    <span className="ml-auto text-secondary text-sm font-bold">✓</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const getModeConfig = (mode: ReaderMode): ModeConfig => MODE_CONFIG[mode];
