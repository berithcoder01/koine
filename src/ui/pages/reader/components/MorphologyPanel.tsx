import React from 'react';
import { findStrongById } from '@/content/strong';
import { useTextToSpeech } from '@/features/tts/useTextToSpeech';

interface GreekToken {
  id: string;
  token: string;
  lemma: string;
  strongs_id: string;
  parsing: string;
  gloss_pt: string;
  position: number;
}

interface Props {
  token: GreekToken | null;
  onClose: () => void;
  onFilterByStrong?: (strongId: string) => void;
  activeFilterStrong?: string | null;
  immersionMode?: boolean;
}

export const MorphologyPanel: React.FC<Props> = ({
  token,
  onClose,
  onFilterByStrong,
  activeFilterStrong,
  immersionMode = false,
}) => {
  const { speak } = useTextToSpeech();

  if (!token) return null;

  const entry = findStrongById(token.strongs_id);
  const isActive = activeFilterStrong === token.strongs_id;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface dark:bg-surface-alt border-t border-border/40 rounded-t-3xl shadow-lg animate-fadeIn max-h-[75vh] flex flex-col">
      {/* Handle de arrasto visual */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 bg-border/50" style={{ borderRadius: '9999px' }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
        <h3 className="text-text-primary dark:text-white font-bold text-sm">
          {immersionMode ? 'Strong' : 'Análise Morfológica'}
        </h3>
        <button
          onClick={onClose}
          className="text-text-secondary text-lg cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-background dark:hover:bg-surface-alt/60 transition-colors"
          style={{ borderRadius: '9999px' }}
        >
          ✕
        </button>
      </div>

      {/* Conteúdo rolável */}
      <div className="overflow-y-auto px-5 pb-6 flex-1 min-h-0">
        {/* ── Palavra + Transliteração + Badges ──────────────── */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="greek-text font-bold text-primary dark:text-secondary-light leading-tight" style={{ fontSize: 'calc(1.875rem * var(--koine-font-scale))' }}>
                {token.token}
              </p>
              <button
                onClick={() => speak({ text: entry?.translit ?? token.token, lang: entry?.translit ? 'pt-BR' : 'el-GR' })}
                className="text-primary/60 hover:text-primary dark:text-secondary-light/60 dark:hover:text-secondary-light transition-colors mt-1 cursor-pointer"
                title="Ouvir pronúncia"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .87.154 1.713.43 2.495.342 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.944.945 2.561.276 2.561-1.06V4.06zM18.364 6.636a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM15.536 9.122a1 1 0 011.414 0 5 5 0 010 7.072 1 1 0 11-1.414-1.414 3 3 0 000-4.243 1 1 0 010-1.415z" />
                </svg>
              </button>
            </div>
            {entry?.translit && (
              <p className="text-text-secondary koine-text-body mt-0.5 italic">{entry.translit}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span
              className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary-light text-[11px] font-bold px-2.5 py-1 font-mono"
              style={{ borderRadius: '9999px' }}
            >
              {token.strongs_id}
            </span>
            {entry?.pos && (
              <span
                className="bg-secondary/15 dark:bg-secondary/20 text-secondary dark:text-secondary-light text-[10px] font-bold px-2.5 py-1"
                style={{ borderRadius: '9999px' }}
              >
                {entry.pos}
              </span>
            )}
          </div>
        </div>

        {/* ── Gloss + Lemma + Parsing ────────────────────────── */}
        {!immersionMode && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <p className="text-text-secondary text-[10px] uppercase tracking-wider font-bold">Gloss</p>
              <p className="text-text-primary font-semibold koine-text-body">{token.gloss_pt}</p>
            </div>
            <div>
              <p className="text-text-secondary text-[10px] uppercase tracking-wider font-bold">Lemma</p>
              <p className="greek-text text-text-primary koine-text-greek">{token.lemma}</p>
            </div>
            <div>
              <p className="text-text-secondary text-[10px] uppercase tracking-wider font-bold">Parsing</p>
              <p className="text-text-primary font-mono koine-text-body">{token.parsing}</p>
            </div>
          </div>
        )}

        {/* ── Botão Filtrar no capítulo ──────────────────────── */}
        {onFilterByStrong && (
          <button
            onClick={() => onFilterByStrong(token.strongs_id)}
            className={`w-full mb-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] ${
              isActive
                ? 'bg-secondary text-white dark:text-[#18181B] shadow-md'
                : 'bg-secondary/10 dark:bg-secondary/15 text-secondary dark:text-secondary-light border border-secondary/30'
            }`}
          >
            {isActive ? '✓ Filtrando no capítulo' : `🔍 Filtrar "${token.strongs_id}" no capítulo`}
          </button>
        )}

        {/* ── Origem / Etimologia ────────────────────────────── */}
        {entry?.origin && (
          <div className="mb-4 bg-background/60 dark:bg-surface-alt/40 rounded-2xl p-4">
            <p className="text-text-secondary text-[10px] uppercase tracking-wider font-bold mb-1.5">Origem</p>
            <p className="text-text-primary dark:text-zinc-200 koine-text-body leading-relaxed">{entry.origin}</p>
          </div>
        )}

        {/* ── Definições (todas) ─────────────────────────────── */}
        {entry && entry.definitions.length > 0 && (
          <div>
            <p className="text-text-secondary text-[10px] uppercase tracking-wider font-bold mb-2.5">
              Definições {entry.definitions.length > 1 && <span className="normal-case font-normal">({entry.definitions.length})</span>}
            </p>
            <ul className="space-y-2.5">
              {entry.definitions.map((def, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                  <span className="text-primary dark:text-secondary-light font-bold shrink-0 mt-0.5">{i + 1}.</span>
                  <span className="text-text-primary dark:text-zinc-200 koine-text-body">{def}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Sem dados Strong ───────────────────────────────── */}
        {!entry && (
          <div className="text-center py-4">
            <p className="text-text-secondary text-xs">
              Dados Strong indisponíveis para {token.strongs_id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
