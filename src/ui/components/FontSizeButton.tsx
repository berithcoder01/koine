// src/ui/components/FontSizeButton.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useTheme, type FontSize } from '@/features/theme/ThemeContext';
import { clsx } from 'clsx';

const SIZE_OPTIONS: { value: FontSize; label: string; icon: string }[] = [
  { value: 'small',  label: 'Pequena', icon: 'A' },
  { value: 'medium', label: 'Média',   icon: 'A' },
  { value: 'large',  label: 'Grande',  icon: 'A' },
];

export const FontSizeButton: React.FC = () => {
  const { fontSize, setFontSize } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      {/* Botão circular — mesmo padrão do app */}
      <button
        id="font-size-toggle-btn"
        aria-label="Ajustar tamanho do texto"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        style={{ borderRadius: '9999px' }}
        className="w-12 h-12 !rounded-full flex items-center justify-center bg-surface dark:bg-surface-alt shadow-sm cursor-pointer transition-colors active:scale-95"
      >
        {/* Ícone duplo Aa — pequeno e grande */}
        <span
          className="flex items-baseline leading-none select-none text-text-primary dark:text-white font-bold"
          aria-hidden="true"
        >
          <span className="text-[10px]">A</span>
          <span className="text-[16px] ml-[1px]">A</span>
        </span>
      </button>

      {/* Dropdown popup */}
      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-50 bg-surface dark:bg-surface-alt border border-border/40 dark:border-border/10 rounded-2xl shadow-xl overflow-hidden animate-fadeIn"
          style={{ minWidth: '160px' }}
        >
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-text-secondary dark:text-zinc-400 px-4 pt-3 pb-1.5">
            Tamanho do Texto
          </p>
          {SIZE_OPTIONS.map((opt, i) => (
            <button
              key={opt.value}
              id={`font-size-opt-${opt.value}`}
              onClick={() => { setFontSize(opt.value); setOpen(false); }}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer',
                i < SIZE_OPTIONS.length - 1 && 'border-b border-border/20 dark:border-border/10',
                fontSize === opt.value
                  ? 'text-secondary bg-secondary/5'
                  : 'text-text-primary dark:text-white',
              )}
            >
              {/* Ícone de tamanho proporcional ao nível */}
              <span
                className="font-bold leading-none text-center shrink-0"
                style={{
                  fontSize: opt.value === 'small' ? '11px' : opt.value === 'medium' ? '15px' : '20px',
                  width: '20px',
                }}
              >
                {opt.icon}
              </span>
              <span className="text-sm font-semibold">{opt.label}</span>
              {fontSize === opt.value && (
                <span className="ml-auto text-secondary text-base leading-none">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
