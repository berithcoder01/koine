import React, { useState } from 'react';
import { GreekText } from '@/components/greek/GreekText';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { dbQueries } from '@/services/database/queries';
import type { StrongEntry } from '@/types/greek.types';
import { SafeArea } from '@/components/layout/SafeArea';
import { Button } from '@/components/ui/Button';

interface ContentItem {
  id: string;
  type: string;
  title: string;
  body: string;
  greek_example?: string;
  strongs_refs?: string;
}

interface Props {
  items: ContentItem[];
  onComplete: () => void;
}

const TYPE_ICONS: Record<string, string> = {
  grammar: '📐',
  orthography: '✏️',
  pronunciation: '🔊',
  cultural: '📜',
  example: '💡',
  rule: '📌',
};

export const LessonContentView: React.FC<Props> = ({ items, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStrong, setSelectedStrong] = useState<string | null>(null);
  const [strongEntry, setStrongEntry] = useState<StrongEntry | null>(null);

  const item = items[currentIndex];
  const isLast = currentIndex === items.length - 1;

  const strongRefs = item?.strongs_refs
    ? item.strongs_refs.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const renderBody = (body: string) => {
    return body.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-3" />;
      if (trimmed.startsWith('• ')) {
        return (
          <li key={i} className="text-text-primary text-sm leading-relaxed ml-4 list-disc">
            {trimmed.slice(2)}
          </li>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={i} className="text-text-primary font-bold text-base mt-4 mb-2">
            {trimmed.slice(3)}
          </h3>
        );
      }
      return (
        <p key={i} className="text-text-primary text-sm leading-relaxed mb-2">
          {trimmed}
        </p>
      );
    });
  };

  const handleStrongClick = async (strongId: string) => {
    setSelectedStrong(strongId);
    const entry = await dbQueries.getStrongById(strongId);
    setStrongEntry(entry);
  };

  if (!item) return null;

  return (
    <SafeArea withBottomNav={false} className="h-dvh overflow-hidden flex flex-col bg-background">
      <div className="flex-1 px-4 pt-6 pb-4 overflow-y-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{TYPE_ICONS[item.type] || '📖'}</span>
          <div>
            <p className="text-xs text-text-secondary font-bold uppercase tracking-wide">
              {item.type === 'grammar' && 'Gramática'}
              {item.type === 'orthography' && 'Ortografia'}
              {item.type === 'pronunciation' && 'Pronúncia'}
              {item.type === 'cultural' && 'Contexto Cultural'}
              {item.type === 'example' && 'Exemplo'}
              {item.type === 'rule' && 'Regra'}
            </p>
            <h2 className="text-xl font-bold text-text-primary">{item.title}</h2>
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-5 shadow-sm">
          {renderBody(item.body)}
        </div>

        {item.greek_example && (
          <div className="bg-primary/5 rounded-2xl p-5 mt-4">
            <p className="text-xs text-text-secondary font-bold mb-2">Exemplo em Grego</p>
            <GreekText text={item.greek_example} size="xl" />
          </div>
        )}

        {strongRefs.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-text-secondary font-bold mb-2">
              Palavras-chave neste conteúdo
            </p>
            <div className="flex gap-2 flex-wrap">
              {strongRefs.map((ref) => (
                <button
                  key={ref}
                  onClick={() => handleStrongClick(ref)}
                  className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                >
                  {ref}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-4 pb-safe pb-6 pt-3 bg-surface border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-text-secondary">
            Conteúdo {currentIndex + 1} de {items.length}
          </span>
          <div className="flex gap-1">
            {items.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentIndex ? 'bg-primary' : 'bg-default-300'
                }`}
              />
            ))}
          </div>
        </div>
        <Button
          label={isLast ? 'Ir para os Exercícios' : 'Próximo'}
          onClick={() => {
            if (isLast) onComplete();
            else setCurrentIndex((i) => i + 1);
          }}
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
