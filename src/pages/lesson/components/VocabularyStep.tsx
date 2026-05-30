import React, { useEffect, useState } from 'react';
import { GreekText } from '@/components/greek/GreekText';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { dbQueries } from '@/services/database/queries';
import type { StrongEntry } from '@/types/greek.types';
import { SafeArea } from '@/components/layout/SafeArea';
import { Button } from '@/components/ui/Button';

interface VocabWord {
  token: string;
  lemma: string;
  gloss_pt: string;
  strongs_id?: string;
}

interface Props {
  words: VocabWord[];
  onContinue: () => void;
}

export const VocabularyStep: React.FC<Props> = ({ words, onContinue }) => {
  const [selectedStrong, setSelectedStrong] = useState<string | null>(null);
  const [strongEntry, setStrongEntry] = useState<StrongEntry | null>(null);

  useEffect(() => {
    if (!selectedStrong) {
      setStrongEntry(null);
      return;
    }
    dbQueries.getStrongById(selectedStrong).then(setStrongEntry);
  }, [selectedStrong]);

  return (
    <SafeArea withBottomNav={false} className="h-dvh overflow-hidden flex flex-col bg-background">
      <div className="flex-1 px-4 pt-6 pb-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-text-primary mb-2">Vocabulário do Módulo</h2>
        <p className="text-text-secondary text-sm mb-6">
          Revise as palavras antes de começar os exercícios. Toque em uma palavra para ver sua definição.
        </p>

        <div className="space-y-2">
          {words.map((word) => (
            <button
              key={word.lemma}
              onClick={() => word.strongs_id && setSelectedStrong(word.strongs_id)}
              className="w-full bg-surface rounded-2xl p-4 flex items-center justify-between shadow-sm active:bg-surface-alt transition-colors"
            >
              <div className="flex items-center gap-3">
                <GreekText text={word.token} size="lg" />
                <span className="text-text-secondary text-sm">({word.lemma})</span>
              </div>
              <div className="text-right">
                <p className="text-text-primary font-semibold">{word.gloss_pt}</p>
                {word.strongs_id && (
                  <p className="text-primary text-xs">{word.strongs_id}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-safe pb-6 pt-3 bg-surface border-t border-border">
        <Button
          label="Começar Exercícios"
          onClick={onContinue}
          fullWidth
          size="lg"
        />
      </div>

      <BottomSheet
        isOpen={!!selectedStrong}
        onClose={() => setSelectedStrong(null)}
        height="auto"
        title="Dicionário Strong"
      >
        {strongEntry && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <GreekText text={strongEntry.greek} size="xl" />
              <div>
                <p className="text-text-primary font-bold text-lg">{strongEntry.translit}</p>
                {strongEntry.name && (
                  <p className="text-text-secondary text-sm">{strongEntry.name}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                {strongEntry.id}
              </span>
              {strongEntry.pos && (
                <span className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full">
                  {strongEntry.pos}
                </span>
              )}
            </div>
            {strongEntry.origin && (
              <div className="bg-background rounded-xl p-3">
                <p className="text-xs text-text-secondary font-bold mb-1">Origem</p>
                <p className="text-text-primary text-sm leading-relaxed">{strongEntry.origin}</p>
              </div>
            )}
            {strongEntry.definitions.length > 0 && (
              <div>
                <p className="text-xs text-text-secondary font-bold mb-2">Definições</p>
                <ul className="space-y-2">
                  {strongEntry.definitions.map((def, i) => (
                    <li key={i} className="text-text-primary text-sm leading-relaxed pl-4 relative">
                      <span className="absolute left-0 top-0 text-primary font-bold">{i + 1}.</span>
                      {def}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </BottomSheet>
    </SafeArea>
  );
};
