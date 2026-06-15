import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { ntService } from '@/features/reader/ntService';

const SBLGNT_BOOKS: { id: string; name: string; testament: 'NT' }[] = [
  { id: 'MT', name: 'Mateus',          testament: 'NT' },
  { id: 'MK', name: 'Marcos',          testament: 'NT' },
  { id: 'LK', name: 'Lucas',           testament: 'NT' },
  { id: 'JN', name: 'João',            testament: 'NT' },
  { id: 'AC', name: 'Atos',            testament: 'NT' },
  { id: 'RO', name: 'Romanos',         testament: 'NT' },
  { id: '1CO', name: '1 Coríntios',    testament: 'NT' },
  { id: '2CO', name: '2 Coríntios',    testament: 'NT' },
  { id: 'GA', name: 'Gálatas',         testament: 'NT' },
  { id: 'EP', name: 'Efésios',         testament: 'NT' },
  { id: 'PH', name: 'Filipenses',      testament: 'NT' },
  { id: 'CO', name: 'Colossenses',     testament: 'NT' },
  { id: '1TH', name: '1 Tessalonicenses', testament: 'NT' },
  { id: '2TH', name: '2 Tessalonicenses', testament: 'NT' },
  { id: '1TI', name: '1 Timóteo',      testament: 'NT' },
  { id: '2TI', name: '2 Timóteo',      testament: 'NT' },
  { id: 'TI', name: 'Tito',            testament: 'NT' },
  { id: 'PHM', name: 'Filemom',        testament: 'NT' },
  { id: 'HE', name: 'Hebreus',         testament: 'NT' },
  { id: 'JA', name: 'Tiago',           testament: 'NT' },
  { id: '1PE', name: '1 Pedro',        testament: 'NT' },
  { id: '2PE', name: '2 Pedro',        testament: 'NT' },
  { id: '1JN', name: '1 João',         testament: 'NT' },
  { id: '2JN', name: '2 João',         testament: 'NT' },
  { id: '3JN', name: '3 João',         testament: 'NT' },
  { id: 'JUDE', name: 'Judas',         testament: 'NT' },
  { id: 'RE', name: 'Apocalipse',      testament: 'NT' },
];

interface Props {
  onSelect: (book: string, chapter: number, verse: number) => void;
  initialBook?: string;
  initialChapter?: number;
  initialVerse?: number;
  showVerseStep?: boolean;
  bookChapters?: Record<string, number>;
}

type Step = 'book' | 'chapter' | 'verse';

// Garante pílula perfeita independente do Tailwind purge
const pill: React.CSSProperties = { borderRadius: '9999px' };

export const BookChapterGrid: React.FC<Props> = ({
  onSelect,
  initialBook = 'JN',
  initialChapter = 1,
  initialVerse = 1,
  showVerseStep = false,
  bookChapters,
}) => {
  const [step, setStep] = useState<Step>('book');
  const [book, setBook] = useState(initialBook);
  const [chapter, setChapter] = useState(initialChapter);
  const [versesAvailable, setVersesAvailable] = useState<number[]>([1]);

  useEffect(() => {
    if (book) {
      ntService.getChapter(book, 1).catch(() => []);
    }
  }, [book]);

  useEffect(() => {
    if (book && chapter) {
      ntService
        .getChapter(book, chapter)
        .then((vs) => setVersesAvailable(vs.length > 0 ? vs : [1]))
        .catch(() => setVersesAvailable([1]));
    }
  }, [book, chapter]);

  const bookName = SBLGNT_BOOKS.find((b) => b.id === book)?.name ?? book;

  return (
    <div className="flex flex-col gap-3">
      {/* Segmented Control Header — container pílula */}
      <div
        className="flex items-center bg-surface-alt/50 dark:bg-black/20 p-1.5 mb-3 shadow-inner border border-border/10"
        style={pill}
      >
        <button
          type="button"
          onClick={() => setStep('book')}
          style={pill}
          className={clsx(
            'flex-1 flex items-center justify-center py-3.5 text-xs font-black uppercase tracking-widest transition-all active:scale-95 leading-none',
            step === 'book'
              ? 'bg-surface dark:bg-surface-alt text-text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary',
          )}
        >
          Livro
        </button>
        <button
          type="button"
          onClick={() => setStep('chapter')}
          disabled={!book}
          style={pill}
          className={clsx(
            'flex-1 flex items-center justify-center py-3.5 text-xs font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-30 leading-none',
            step === 'chapter'
              ? 'bg-surface dark:bg-surface-alt text-text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary',
          )}
        >
          Capítulo
        </button>
        {showVerseStep && (
          <button
            type="button"
            onClick={() => setStep('verse')}
            disabled={!chapter}
            style={pill}
            className={clsx(
              'flex-1 flex items-center justify-center py-3.5 text-xs font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-30 leading-none',
              step === 'verse'
                ? 'bg-surface dark:bg-surface-alt text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            Versículo
          </button>
        )}
      </div>

      <div className="mb-4 text-center">
        <p className="text-text-secondary text-xs font-semibold">
          {step === 'book' && "Selecione um livro do NT"}
          {step === 'chapter' && `Capítulo em ${bookName}`}
          {step === 'verse' && `${bookName} · Cap. ${chapter}`}
        </p>
      </div>

      {/* Step content */}
      <div className="max-h-[55vh] overflow-y-auto px-1 pb-4 overscroll-contain">
        {step === 'book' && (
          <div className="flex flex-col gap-3">
            {SBLGNT_BOOKS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setBook(b.id);
                  setChapter(1);
                  setStep('chapter');
                }}
                style={{ borderRadius: '9999px', padding: '18px 36px', minHeight: '60px' }}
                className={clsx(
                  'w-full flex items-center justify-between text-left transition-all active:scale-[0.98]',
                  book === b.id
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-surface dark:bg-surface-alt/60 text-text-primary hover:bg-surface-alt border border-border/40 dark:border-border/10 shadow-sm',
                )}
              >
                <span className="font-extrabold text-base">{b.name}</span>
                {book === b.id && <span className="text-lg font-bold">✓</span>}
              </button>
            ))}
          </div>
        )}

        {step === 'chapter' && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {Array.from(
              { length: bookChapters?.[book] ?? 22 },
              (_, i) => i + 1,
            ).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setChapter(n);
                  if (showVerseStep) {
                    setStep('verse');
                  } else {
                    onSelect(book, n, 1);
                  }
                }}
                style={pill}
                className={clsx(
                  'aspect-square text-base font-extrabold flex items-center justify-center transition-all active:scale-90 shadow-sm min-h-[64px]',
                  chapter === n
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-surface dark:bg-surface-alt/60 text-text-primary border border-border/40 dark:border-border/10 hover:bg-surface-alt',
                )}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {step === 'verse' && (
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
            {versesAvailable.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onSelect(book, chapter, n)}
                style={pill}
                className={clsx(
                  'aspect-square text-base font-extrabold flex items-center justify-center transition-all active:scale-90 shadow-sm min-h-[56px]',
                  initialVerse === n
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-surface dark:bg-surface-alt/60 text-text-primary border border-border/40 dark:border-border/10 hover:bg-surface-alt',
                )}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
