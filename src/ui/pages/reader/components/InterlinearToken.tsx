import React from 'react';
import { clsx } from 'clsx';

export interface InterlinearTokenData {
  position: number;
  token: string;
  lemma: string;
  strongs_id: string | null;
  parsing: string;
  glossPT?: string;
  glossSource?: string;
}

interface Props {
  token: InterlinearTokenData;
  selected?: boolean;
  showGloss: boolean;
  showLemma?: boolean;
  showParsing?: boolean;
  alignedWord?: string;
  onPress?: () => void;
}

export const InterlinearToken: React.FC<Props> = ({
  token,
  selected = false,
  showGloss,
  showLemma = false,
  showParsing = false,
  alignedWord,
  onPress,
}) => {
  const isTranslit = token.glossSource === 'translit';
  const displayWord = alignedWord ?? token.glossPT;

  return (
    <button
      type="button"
      onClick={onPress}
      className={clsx(
        'group flex flex-col items-center rounded-lg px-1.5 py-1.5 min-w-[36px] max-w-[80px] transition-all',
        'active:scale-95',
        selected
          ? 'bg-primary/15 dark:bg-primary/20 ring-2 ring-primary/40'
          : 'hover:bg-background/60 dark:hover:bg-background/30',
      )}
      aria-label={`${token.token}${token.glossPT ? ` — ${token.glossPT}` : ''}`}
    >
      <span
        className="greek-text text-xl text-primary dark:text-secondary-light font-medium leading-tight break-words"
        style={{ fontFamily: "'SBL Greek', 'Gentium Plus', serif" }}
      >
        {token.token}
      </span>

      {showGloss && displayWord && (
        <span
          className={clsx(
            'text-[10px] mt-0.5 text-center leading-tight',
            isTranslit && !alignedWord
              ? 'text-text-secondary/70 italic'
              : 'text-text-secondary font-semibold',
          )}
        >
          {displayWord}
        </span>
      )}

      {showLemma && token.lemma && token.lemma !== token.token && (
        <span className="text-[9px] text-text-secondary/60 italic mt-0.5 text-center leading-tight">
          {token.lemma}
        </span>
      )}

      {showParsing && token.parsing && (
        <span className="text-[8px] text-text-secondary/50 font-mono mt-0.5">
          {token.parsing}
        </span>
      )}
    </button>
  );
};
