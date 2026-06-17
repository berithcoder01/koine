import React, { useState } from 'react';
import { clsx } from 'clsx';
import { InterlinearToken, type InterlinearTokenData } from './InterlinearToken';
import { MorphologyPanel } from './MorphologyPanel';

interface Props {
  book: string;
  chapter: number;
  verse: number;
  tokens: InterlinearTokenData[];
  showGloss: boolean;
  showLemma?: boolean;
  showParsing?: boolean;
  showTranslit?: boolean;
  fluentPT?: string | null;
  alignedWords?: string[];
  highlighted?: boolean;
  filterStrong?: string | null;
  onVersePress?: (verse: number) => void;
  onMorphologyOpen?: (token: InterlinearTokenData) => void;
  onMorphologyClose?: () => void;
  onFilterByStrong?: (strongId: string) => void;
  className?: string;
}

export const InterlinearVerse: React.FC<Props> = ({
  book,
  chapter,
  verse,
  tokens,
  showGloss,
  showLemma = false,
  showParsing = false,
  showTranslit = false,
  fluentPT,
  alignedWords,
  highlighted = false,
  filterStrong = null,
  onVersePress,
  onMorphologyOpen,
  onMorphologyClose,
  onFilterByStrong,
  className,
}) => {
  const [selectedToken, setSelectedToken] = useState<InterlinearTokenData | null>(null);

  const handleTokenPress = (token: InterlinearTokenData) => {
    setSelectedToken(token);
    onMorphologyOpen?.(token);
  };

  const handleClose = () => {
    setSelectedToken(null);
    onMorphologyClose?.();
  };

  const hasFilter = !!filterStrong;
  const matches = hasFilter
    ? tokens.filter((t) => t.strongs_id === filterStrong).length
    : 0;

  return (
    <div
      onClick={() => onVersePress?.(verse)}
      className={clsx(
        'bg-surface dark:bg-surface-alt/40 rounded-2xl p-4 shadow-sm border transition-all duration-300 cursor-pointer',
        highlighted
          ? 'border-secondary/60 dark:border-secondary/40 ring-2 ring-secondary/30 dark:ring-secondary/20'
          : 'border-border/20 dark:border-border/10',
        className,
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary dark:text-zinc-400">
          {book} {chapter}:{verse}
        </span>
        <div className="flex items-center gap-2">
          {hasFilter && (
            <span className="text-[9px] font-bold text-secondary dark:text-secondary-light">
              {matches} {matches === 1 ? 'match' : 'matches'}
            </span>
          )}
          <span className="text-[9px] text-text-secondary/50 font-semibold">SBLGNT</span>
        </div>
      </div>

      <div className={clsx(
        "flex flex-wrap items-start",
        showGloss || showTranslit || showLemma || showParsing
          ? "gap-1"
          : "gap-x-0.5 gap-y-1"
      )}>
        {tokens.map((token) => {
          const isMatch = hasFilter && token.strongs_id === filterStrong;
          const isDimmed = hasFilter && !isMatch;
          return (
            <span
              key={`${token.position}-${token.token}`}
              className={clsx(
                'transition-opacity duration-200 rounded-lg',
                isMatch && 'bg-secondary/15 dark:bg-secondary/25 -mx-1 px-1 ring-1 ring-secondary/40',
                isDimmed && 'opacity-30',
              )}
            >
              <InterlinearToken
                token={token}
                selected={selectedToken?.position === token.position}
                showGloss={showGloss}
                showLemma={showLemma}
                showParsing={showParsing}
                showTranslit={showTranslit}
                alignedWord={alignedWords?.[token.position - 1]}
                onPress={() => handleTokenPress(token)}
              />
            </span>
          );
        })}
      </div>

      {fluentPT && !alignedWords && (
        <p className="text-text-secondary dark:text-zinc-300 koine-text-verse leading-relaxed font-medium italic border-t border-border/20 dark:border-border/10 pt-3 mt-3">
          {fluentPT}
        </p>
      )}

      {selectedToken && (
        <MorphologyPanel
          token={selectedToken as any}
          onClose={handleClose}
          onFilterByStrong={onFilterByStrong}
          activeFilterStrong={filterStrong}
          immersionMode={!showGloss}
        />
      )}
    </div>
  );
};
