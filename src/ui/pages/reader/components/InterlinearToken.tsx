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
  translitPT?: string;
}

interface Props {
  token: InterlinearTokenData;
  selected?: boolean;
  showGloss: boolean;
  showLemma?: boolean;
  showParsing?: boolean;
  showTranslit?: boolean;
  alignedWord?: string;
  onPress?: () => void;
}

export const InterlinearToken: React.FC<Props> = ({
  token,
  selected = false,
  showGloss,
  showLemma = false,
  showParsing = false,
  showTranslit = false,
  alignedWord,
  onPress,
}) => {
  const isTranslit = token.glossSource === 'translit';
  const displayWord = alignedWord ?? token.glossPT;
  const isCompact = !showGloss && !showTranslit && !showLemma && !showParsing;

  return (
    <button
      type="button"
      onClick={onPress}
      className={clsx(
        'group flex flex-col items-center rounded-lg transition-all',
        'active:scale-95',
        isCompact
          ? 'px-1 py-0.5 min-w-0 max-w-none'
          : 'px-1.5 py-1.5 min-w-[36px] max-w-[150px]',
        selected
          ? 'bg-primary/15 dark:bg-primary/20 ring-2 ring-primary/40'
          : 'hover:bg-background/60 dark:hover:bg-background/30',
      )}
      aria-label={`${token.token}${token.glossPT ? ` — ${token.glossPT}` : ''}`}
    >
      <span
        className="greek-text koine-text-greek text-primary dark:text-secondary-light font-medium leading-tight break-words"
      >
        {token.token}
      </span>

      {showTranslit && token.translitPT && (
        <span className="koine-text-gloss mt-0.5 text-center leading-tight text-secondary/70 italic font-medium">
          {token.translitPT}
        </span>
      )}

      {showGloss && displayWord && (
        <span
          className={clsx(
            'koine-text-gloss mt-0.5 text-center leading-tight',
            isTranslit && !alignedWord
              ? 'text-text-secondary/70 italic'
              : 'text-text-secondary font-semibold',
          )}
        >
          {displayWord}
        </span>
      )}

      {showLemma && token.lemma && token.lemma !== token.token && (
        <span className="koine-text-label text-text-secondary/60 italic mt-0.5 text-center leading-tight">
          {token.lemma}
        </span>
      )}

      {showParsing && token.parsing && (
        <span className="koine-text-label text-text-secondary/50 font-mono mt-0.5">
          {token.parsing}
        </span>
      )}
    </button>
  );
};

