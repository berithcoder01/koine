import React, { useState, useEffect } from 'react';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { ArrowLeft } from 'lucide-react';
import bank from '@/content/word-of-the-day/bank.json';
import { getWordOfTheDayState, toggleWordSaved, isWordSaved } from '@/content/word-of-the-day/storage';
import type { WordOfTheDay } from '@/content/word-of-the-day/types';
import { PalavraDoDiaSheet } from '@/ui/pages/trail/components/PalavraDoDiaSheet';

const WORDS = bank as WordOfTheDay[];

export const SavedWordsPage: React.FC = () => {
  const navigation = useAppNavigation();
  const [savedWords, setSavedWords] = useState<WordOfTheDay[]>([]);
  const [selectedWord, setSelectedWord] = useState<WordOfTheDay | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const state = getWordOfTheDayState();
    const saved = WORDS.filter(w => state.savedIds.includes(w.id));
    setSavedWords(saved);
  }, [tick]);

  const handleWordClick = (word: WordOfTheDay) => {
    setSelectedWord(word);
    setIsSheetOpen(true);
  };

  const handleToggleSaved = () => {
    if (selectedWord) {
      toggleWordSaved(selectedWord.id);
      setTick(t => t + 1);
    }
  };

  return (
    <SafeArea scrollable>
      {/* Header */}
      <div className="flex-shrink-0 bg-transparent px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={navigation.goBack}
            className="w-10 h-10 !rounded-full bg-surface dark:bg-surface-alt flex items-center justify-center border border-border/40 shadow-sm active:scale-95 transition-transform"
            aria-label="Voltar"
          >
            <ArrowLeft size={20} className="text-text-primary dark:text-white" />
          </button>
          <div>
            <h1 className="text-text-primary dark:text-white font-extrabold text-xl tracking-tight">
              Palavras Salvas
            </h1>
            <p className="text-text-secondary text-xs font-semibold">
              {savedWords.length} {savedWords.length === 1 ? 'palavra' : 'palavras'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-20">
        {savedWords.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📖</p>
            <p className="text-text-primary font-extrabold text-lg">Nenhuma palavra salva</p>
            <p className="text-text-secondary text-sm mt-2 max-w-[250px] mx-auto">
              Quando você salvar palavras na aba Palavra do Dia, elas aparecerão aqui para você revisar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {savedWords.map((word) => (
              <div
                key={word.id}
                onClick={() => handleWordClick(word)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleWordClick(word); }}
                className="bg-surface dark:bg-surface-alt/50 border border-border/40 dark:border-border/10 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer flex flex-col justify-between min-h-[110px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-greek font-black text-2xl text-secondary dark:text-secondary-light">
                      {word.grego}
                    </h3>
                    <span className="text-rose-500 text-lg">♥</span>
                  </div>
                  <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                    {word.transliteracao}
                  </p>
                </div>
                <p className="text-text-primary dark:text-zinc-200 text-sm font-medium line-clamp-2">
                  {word.significado_curto}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sheet Modal */}
      {selectedWord && (
        <PalavraDoDiaSheet
          word={selectedWord}
          isOpen={isSheetOpen}
          isSaved={isWordSaved(selectedWord.id)}
          onClose={() => setIsSheetOpen(false)}
          onMarkVisualized={() => {}} // Not needed here
          onToggleSaved={handleToggleSaved}
        />
      )}
    </SafeArea>
  );
};
