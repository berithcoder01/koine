import React, { useEffect, useState } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { GreekText } from '@/components/greek/GreekText';
import { decodeParsing } from '@/utils/greekUtils';
import { dbQueries } from '@/services/database/queries';
import type { StrongEntry } from '@/types/greek.types';

interface TokenData {
  token: string;
  lemma: string;
  strongs_id: string;
  parsing: string;
  gloss_pt: string;
}

interface Props {
  token: TokenData | null;
  onClose: () => void;
  immersionMode?: boolean;
}

export const MorphologyPanel: React.FC<Props> = ({ token, onClose, immersionMode = false }) => {
  const [strong, setStrong] = useState<StrongEntry | null>(null);

  useEffect(() => {
    setStrong(null);
    if (token?.strongs_id) {
      dbQueries.getStrongById(token.strongs_id).then(setStrong);
    }
  }, [token?.strongs_id]);

  if (!token) return null;

  const morphologyLabels = decodeParsing(token.parsing);

  return (
    <BottomSheet isOpen={!!token} onClose={onClose} height="auto" title="Análise Morfológica">
      <div className="flex items-center gap-4 mb-6">
        <GreekText text={token.token} size="xl" />
        <div>
          {!immersionMode && (
            <p className="text-text-primary font-bold text-lg">{token.gloss_pt}</p>
          )}
          <p className={`text-sm ${immersionMode ? 'text-text-primary font-bold text-lg' : 'text-text-secondary'}`}>
            {immersionMode ? (
              <span className="greek-text">{token.lemma}</span>
            ) : (
              <>Lexema: <span className="greek-text">{token.lemma}</span></>
            )}
          </p>
          {immersionMode && token.strongs_id && (
            <p className="text-primary text-xs font-bold mt-1">{token.strongs_id}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="bg-primary/5 rounded-xl px-3 py-2 inline-flex">
          <span className="text-primary text-sm font-bold">{token.strongs_id}</span>
        </div>
        {strong?.pos && (
          <div className="bg-secondary/10 rounded-xl px-3 py-2 inline-flex">
            <span className="text-secondary text-sm font-bold">{strong.pos}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {morphologyLabels.map((label, index) => (
          <div key={index} className="bg-background rounded-xl p-3">
            <p className="text-text-primary font-semibold text-sm">{label}</p>
          </div>
        ))}
      </div>

      {strong && strong.definitions.length > 0 && (
        <div className="mt-5 pt-4 border-t border-default-200">
          <p className="text-xs text-text-secondary font-bold mb-3">
            Definição Strong ({strong.id})
          </p>
          {strong.origin && (
            <p className="text-text-primary text-xs mb-3 leading-relaxed opacity-70">
              {strong.origin}
            </p>
          )}
          <ul className="space-y-2">
            {strong.definitions.map((def, index) => (
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
    </BottomSheet>
  );
};
