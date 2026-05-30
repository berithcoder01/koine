import React, { useState } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';

const NT_BOOKS = [
  { abbr: 'MT', name: 'Mateus', chapters: 28 },
  { abbr: 'MK', name: 'Marcos', chapters: 16 },
  { abbr: 'LK', name: 'Lucas', chapters: 24 },
  { abbr: 'JN', name: 'João', chapters: 21 },
  { abbr: 'AC', name: 'Atos', chapters: 28 },
  { abbr: 'RM', name: 'Romanos', chapters: 16 },
  { abbr: '1CO', name: '1 Coríntios', chapters: 16 },
  { abbr: 'GL', name: 'Gálatas', chapters: 6 },
  { abbr: 'EF', name: 'Efésios', chapters: 6 },
  { abbr: 'FP', name: 'Filipenses', chapters: 4 },
  { abbr: '1JN', name: '1 João', chapters: 5 },
  { abbr: 'AP', name: 'Apocalipse', chapters: 22 },
];

const VERSES_PER_CHAPTER: Record<string, number[]> = {
  'JN-1': [51], 'JN-3': [36], 'JN-10': [42],
  '1JN-4': [21], 'MT-5': [48],
};

const getMaxVerses = (book: string, chapter: number) =>
  VERSES_PER_CHAPTER[`${book}-${chapter}`]?.[0] ?? 30;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (book: string, chapter: number, verse: number) => void;
}

export const PassageSelectorSheet: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
  const [step, setStep] = useState<'book' | 'chapter' | 'verse'>('book');
  const [selectedBook, setSelectedBook] = useState<typeof NT_BOOKS[0] | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const reset = () => { setStep('book'); setSelectedBook(null); setSelectedChapter(null); };

  return (
    <BottomSheet isOpen={isOpen} onClose={() => { onClose(); reset(); }} title="Selecionar Passagem" height="half">
      {step === 'book' && (
        <div className="grid grid-cols-2 gap-2">
          {NT_BOOKS.map(book => (
            <button key={book.abbr}
              onClick={() => { setSelectedBook(book); setStep('chapter'); }}
              className="bg-background rounded-xl p-3 text-left active:bg-primary/5">
              <p className="font-bold text-text-primary text-sm">{book.name}</p>
              <p className="text-text-secondary text-xs">{book.chapters} caps.</p>
            </button>
          ))}
        </div>
      )}

      {step === 'chapter' && selectedBook && (
        <div>
          <button onClick={() => setStep('book')} className="text-primary text-sm mb-3">← {selectedBook.name}</button>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(ch => (
              <button key={ch}
                onClick={() => { setSelectedChapter(ch); setStep('verse'); }}
                className="bg-background rounded-xl py-3 text-center font-bold text-text-primary active:bg-primary/10">
                {ch}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'verse' && selectedBook && selectedChapter && (
        <div>
          <button onClick={() => setStep('chapter')} className="text-primary text-sm mb-3">← Cap. {selectedChapter}</button>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: getMaxVerses(selectedBook.abbr, selectedChapter) }, (_, i) => i + 1).map(v => (
              <button key={v}
                onClick={() => { onSelect(selectedBook.abbr, selectedChapter, v); reset(); }}
                className="bg-background rounded-xl py-3 text-center font-bold text-text-primary active:bg-primary/10">
                {v}
              </button>
            ))}
          </div>
        </div>
      )}
    </BottomSheet>
  );
};
