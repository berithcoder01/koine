import React, { useState, useEffect } from 'react';
import { BottomSheet } from '@/ui/components/BottomSheet';
import { BookChapterGrid } from './BookChapterGrid';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (book: string, chapter: number, verse: number) => void;
  currentBook?: string;
  currentChapter?: number;
  currentVerse?: number;
}

export const PassageSelectorSheet: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelect,
  currentBook = 'JN',
  currentChapter = 1,
  currentVerse = 1,
}) => {
  const [initBook, setInitBook] = useState(currentBook);
  const [initChapter, setInitChapter] = useState(currentChapter);
  const [initVerse, setInitVerse] = useState(currentVerse);

  useEffect(() => {
    if (isOpen) {
      setInitBook(currentBook);
      setInitChapter(currentChapter);
      setInitVerse(currentVerse);
    }
  }, [isOpen, currentBook, currentChapter, currentVerse]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} height="auto">
      <div className="flex flex-col gap-4 pb-4">
        <header className="flex items-start gap-3">
          <div
            className="w-10 h-10 bg-secondary/15 flex items-center justify-center shrink-0"
            style={{ borderRadius: '9999px' }}
          >
            <span className="text-xl">📖</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-extrabold text-text-primary dark:text-white leading-tight">
              Selecionar Passagem
            </h2>
            <p className="text-text-secondary text-xs font-semibold mt-0.5">
              Novo Testamento · SBLGNT + BLivre
            </p>
          </div>
        </header>

        <BookChapterGrid
          initialBook={initBook}
          initialChapter={initChapter}
          initialVerse={initVerse}
          onSelect={(book, chapter, verse) => {
            onSelect(book, chapter, verse);
            onClose();
          }}
        />
      </div>
    </BottomSheet>
  );
};
