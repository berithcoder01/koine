import React from 'react';
import type { WordOfTheDay } from '@/content/word-of-the-day/types';

interface Props {
  word: WordOfTheDay;
  isVisualized: boolean;
  onPress: () => void;
}

export const PalavraDoDiaCard: React.FC<Props> = ({ word, isVisualized, onPress }) => (
  <div
    onClick={onPress}
    className="w-full relative overflow-hidden bg-gradient-to-br from-[#B5A3FC] to-[#8B7CF0] text-white p-5 rounded-[24px] shadow-lg cursor-pointer select-none flex flex-col justify-between min-h-[160px] shrink-0 active:scale-[0.98] transition-transform"
    role="button"
    tabIndex={0}
    aria-label={`Palavra do dia: ${word.grego} — ${word.significado_curto}`}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onPress(); }}
  >
    {/* Greek letter decoration */}
    <div
      aria-hidden
      className="absolute -right-2 -top-4 text-[100px] font-serif select-none pointer-events-none opacity-[0.12]"
    >
      Α
    </div>

    {/* Top row: badge */}
    <div className="flex items-center mb-3 relative z-10 w-full">
      <div className="flex items-center gap-1.5">
        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
          Palavra do Dia
        </span>
        {!isVisualized && (
          <span className="bg-amber-300 text-amber-900 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
            Novo
          </span>
        )}
      </div>
    </div>

    {/* Greek word */}
    <div className="mb-2 relative z-10 w-full">
      <div className="text-3xl font-black font-greek tracking-wide leading-tight mb-0.5 break-all">
        {word.grego}
      </div>
      <div className="text-[11px] text-white/80 font-bold uppercase tracking-wider">
        {word.transliteracao} · {word.categoria}
      </div>
    </div>

    {/* Meaning */}
    <div className="text-sm leading-relaxed text-white/90 mb-3 relative z-10 w-full font-medium">
      {word.significado_curto}
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between border-t border-white/20 pt-2.5 mt-1 relative z-10 w-full">
      <span className="text-[11px] text-white/85 font-semibold">
        Toque para descobrir ↓
      </span>
      <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
        Ler mais
      </span>
    </div>
  </div>
);
