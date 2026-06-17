import React, { useState } from 'react';
import { clsx } from 'clsx';

interface Props {
  book: string;
  chapter: number;
  verse: number;
  textPT: string;
  source?: string;
  version?: string;
  isVisible: boolean;
  onToggleVisibility?: () => void;
  className?: string;
}

const BOOK_FULL_NAMES: Record<string, string> = {
  MT: 'Mateus', MK: 'Marcos', LK: 'Lucas', JN: 'João',
  AC: 'Atos', RO: 'Romanos', '1CO': '1 Coríntios', '2CO': '2 Coríntios',
  GA: 'Gálatas', EP: 'Efésios', PH: 'Filipenses', CO: 'Colossenses',
  '1TH': '1 Tessalonicenses', '2TH': '2 Tessalonicenses',
  '1TI': '1 Timóteo', '2TI': '2 Timóteo', TI: 'Tito', PHM: 'Filemom',
  HE: 'Hebreus', JA: 'Tiago', '1PE': '1 Pedro', '2PE': '2 Pedro',
  '1JN': '1 João', '2JN': '2 João', '3JN': '3 João', JUDE: 'Judas', RE: 'Apocalipse',
};

export const VerseTranslationCard: React.FC<Props> = ({
  book,
  chapter,
  verse,
  textPT,
  source = 'blivre',
  version = '2018-02',
  isVisible,
  onToggleVisibility,
  className,
}) => {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);

  const bookName = BOOK_FULL_NAMES[book] ?? book;
  const reference = `${bookName} ${chapter}:${verse}`;

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `"${textPT}"\n— ${reference}\n\nVia Koiné: grego para a vida.`;

    // Prefer Web Share API on mobile
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: reference,
          text: shareText,
        });
        return;
      } catch {
        // usuário cancelou, sem erro
      }
    }

    // Fallback: copiar para clipboard
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // sem permissão, ignora
    }
  };

  return (
    <div
      className={clsx(
        'bg-secondary/8 dark:bg-secondary/10 border border-secondary/20 dark:border-secondary/20 rounded-2xl p-4 transition-all',
        className,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary">
            📖 Tradução
          </span>
          <span className="text-[10px] text-text-secondary/60 font-semibold">
            {book} {chapter}:{verse}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isVisible && (
            <button
              type="button"
              onClick={handleShare}
              className="text-[10px] font-bold uppercase tracking-wide text-text-secondary hover:text-secondary transition-colors flex items-center gap-1"
              aria-label="Compartilhar versículo"
            >
              {copied ? '✓ Copiado' : '🔗 Compartilhar'}
            </button>
          )}
          {onToggleVisibility && isVisible && (
            <button
              type="button"
              onClick={onToggleVisibility}
              className="text-[10px] font-bold uppercase tracking-wide text-text-secondary hover:text-primary transition-colors"
              aria-label="Esconder tradução"
            >
              🙈 Ocultar
            </button>
          )}
        </div>
      </div>

      {isVisible ? (
        <p
          className={clsx(
            'text-text-primary dark:text-zinc-200 koine-text-verse leading-relaxed font-medium transition-opacity',
            hover && 'opacity-90',
          )}
        >
          {textPT}
        </p>
      ) : (
        <div className="py-2 flex flex-col items-center justify-center text-center">
          <p className="text-text-secondary/80 dark:text-zinc-400 text-xs font-semibold mb-3">
            Tente traduzir mentalmente este versículo antes de revelar!
          </p>
          <button
            type="button"
            onClick={onToggleVisibility}
            className="px-5 py-2.5 bg-secondary/15 hover:bg-secondary/25 dark:bg-secondary/20 dark:hover:bg-secondary/30 text-secondary dark:text-secondary-light font-extrabold text-xs tracking-wider uppercase rounded-full shadow-sm hover:shadow-md transition-all active:scale-[0.97]"
          >
            👁️ Revelar Tradução
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-secondary/15">
        <span className="text-[9px] text-text-secondary/50 font-semibold">
          {source.toUpperCase()} · {version}
        </span>
        <span className="text-[9px] text-text-secondary/40 italic">
          Almeida Corrigida Fiel
        </span>
      </div>
    </div>
  );
};
