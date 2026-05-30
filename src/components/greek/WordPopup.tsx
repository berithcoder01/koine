import React, { useEffect, useState } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { GreekText } from '@/components/greek/GreekText';
import { dbQueries } from '@/services/database/queries';
import type { StrongEntry } from '@/types/greek.types';

interface WordPopupProps {
  strongsId: string | null;
  onClose: () => void;
}

export const WordPopup: React.FC<WordPopupProps> = ({ strongsId, onClose }) => {
  const [entry, setEntry] = useState<StrongEntry | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!strongsId) {
      setEntry(null);
      return;
    }
    setLoading(true);
    dbQueries.getStrongById(strongsId).then((result) => {
      setEntry(result);
      setLoading(false);
    });
  }, [strongsId]);

  if (!strongsId) return null;

  return (
    <BottomSheet isOpen={!!strongsId} onClose={onClose} height="auto" title="Dicionário Strong">
      {loading && (
        <div className="flex justify-center py-8">
          <p className="text-text-secondary">Carregando...</p>
        </div>
      )}

      {!loading && !entry && (
        <div className="py-4">
          <p className="text-text-secondary">Definição não encontrada para {strongsId}</p>
        </div>
      )}

      {!loading && entry && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <GreekText text={entry.greek} size="xl" />
            <div>
              <p className="text-text-primary font-bold text-lg">
                {entry.translit}
                {entry.pronunciation && (
                  <span className="text-text-secondary text-sm font-normal ml-2">
                    ({entry.pronunciation})
                  </span>
                )}
              </p>
              {entry.name && (
                <p className="text-text-secondary text-sm">{entry.name}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
              {entry.id}
            </span>
            {entry.pos && (
              <span className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full">
                {entry.pos}
              </span>
            )}
          </div>

          {entry.origin && (
            <div className="bg-background rounded-xl p-3">
              <p className="text-xs text-text-secondary font-bold mb-1">Origem</p>
              <p className="text-text-primary text-sm leading-relaxed">{entry.origin}</p>
            </div>
          )}

          {entry.definitions.length > 0 && (
            <div>
              <p className="text-xs text-text-secondary font-bold mb-2">Definições</p>
              <ul className="space-y-2">
                {entry.definitions.map((def, index) => (
                  <li key={index} className="text-text-primary text-sm leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-0 text-primary font-bold">
                      {index + 1}.
                    </span>
                    {def}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </BottomSheet>
  );
};
