// src/pages/reader/ReaderPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SafeArea } from '@/components/layout/SafeArea';
import { BottomNav } from '@/components/layout/BottomNav';
import { GreekText } from '@/components/greek/GreekText';
import { dbQueries } from '@/services/database/queries';
import { EmptyState } from '@/components/ui/EmptyState';

const BOOKS = [
  { abbr: 'JN', name: 'João' },
  { abbr: 'MT', name: 'Mateus' },
  { abbr: 'RM', name: 'Romanos' },
  { abbr: '1JN', name: '1 João' },
  { abbr: 'EF', name: 'Efésios' },
  { abbr: 'FL', name: 'Filipenses' },
];

interface WordInfo {
  word: string;
  gloss: string;
  lemma: string;
}

export const ReaderPage: React.FC = () => {
  const { book, chapter } = useParams<{ book?: string; chapter?: string; verse?: string }>();
  const [selectedBook, setSelectedBook] = useState<string>(book ?? '');
  const [selectedChapter, setSelectedChapter] = useState<number>(chapter ? parseInt(chapter) : 1);
  const [verses, setVerses] = useState<Record<number, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<WordInfo | null>(null);

  useEffect(() => {
    if (book) {
      setSelectedBook(book);
      if (chapter) setSelectedChapter(parseInt(chapter));
    }
  }, [book, chapter]);

  useEffect(() => {
    if (selectedBook) loadChapter();
  }, [selectedBook, selectedChapter]);

  const loadChapter = async () => {
    setLoading(true);
    const verseNums = await dbQueries.getChapter(selectedBook, selectedChapter);
    const loadedVerses: Record<number, any[]> = {};
    for (const v of verseNums) {
      const words = await dbQueries.getVerse(selectedBook, selectedChapter, v.verse);
      if (words.length > 0) loadedVerses[v.verse] = words;
    }
    setVerses(loadedVerses);
    setLoading(false);
  };

  if (!selectedBook) {
    return (
      <SafeArea>
        <div className="px-4 pt-4 pb-24">
          <h1 className="text-xl font-bold text-textPrimary mb-4">Leitor Interlinear</h1>
          <p className="text-textSecondary text-sm mb-4">Selecione um livro do Novo Testamento</p>
          <div className="grid grid-cols-2 gap-3">
            {BOOKS.map(b => (
              <button
                key={b.abbr}
                onClick={() => setSelectedBook(b.abbr)}
                className="bg-surface rounded-2xl p-4 shadow-sm text-left active:scale-95 transition-transform"
              >
                <p className="font-bold text-primary">{b.abbr}</p>
                <p className="text-textSecondary text-sm">{b.name}</p>
              </button>
            ))}
          </div>
        </div>
        <BottomNav />
      </SafeArea>
    );
  }

  const bookInfo = BOOKS.find(b => b.abbr === selectedBook);
  const verseKeys = Object.keys(verses).map(Number).sort((a, b) => a - b);

  return (
    <SafeArea>
      <div className="px-4 pt-4 pb-24">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => setSelectedBook('')} className="text-2xl text-textSecondary">←</button>
          <div className="flex-1">
            <h1 className="font-bold text-textPrimary">{bookInfo?.name ?? selectedBook}</h1>
            <p className="text-textSecondary text-sm">Capítulo {selectedChapter}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setSelectedChapter(c => Math.max(1, c - 1))} className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-textSecondary">-</button>
            <button onClick={() => setSelectedChapter(c => c + 1)} className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-textSecondary">+</button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12"><p className="text-textSecondary">Carregando...</p></div>
        ) : verseKeys.length === 0 ? (
          <EmptyState icon="📖" title="Nenhum versículo encontrado" description="Conteúdo ainda não disponível para este capítulo." actionLabel="Voltar" onAction={() => setSelectedBook('')} />
        ) : (
          <div className="space-y-4">
            {verseKeys.map(vNum => (
              <div key={vNum} className="bg-surface rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-primary bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0">{vNum}</span>
                  <div className="flex-1">
                    <GreekText
                      text={verses[vNum].map((w: any) => w.token).join(' ')}
                      size="md"
                      onWordPress={(word) => {
                        const found = verses[vNum].find((w: any) => w.token === word);
                        if (found) setSelectedWord({ word, gloss: found.gloss_pt ?? found.lemma, lemma: found.lemma });
                      }}
                    />
                    <p className="text-textSecondary text-xs mt-2 leading-relaxed">
                      {verses[vNum].map((w: any) => w.gloss_pt ?? w.lemma).join(' ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedWord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setSelectedWord(null)}>
          <div className="bg-surface rounded-2xl p-6 max-w-sm w-full animate-fadeIn" onClick={e => e.stopPropagation()}>
            <GreekText text={selectedWord.word} size="xl" />
            <p className="text-primary font-bold text-lg mt-3">{selectedWord.gloss}</p>
            <p className="text-textSecondary text-sm mt-1">Lemma: {selectedWord.lemma}</p>
            <button onClick={() => setSelectedWord(null)} className="w-full mt-4 bg-primary text-white py-2 rounded-xl font-medium">Fechar</button>
          </div>
        </div>
      )}

      <BottomNav />
    </SafeArea>
  );
};
