import React, { useState, useEffect, useCallback } from 'react';
import { SafeArea } from '@/components/layout/SafeArea';
import { BottomNav } from '@/components/layout/BottomNav';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { GreekText } from '@/components/greek/GreekText';
import { dbQueries } from '@/services/database/queries';
import type { StrongEntry } from '@/types/greek.types';

const POS_FILTERS = [
  { label: 'Todos', value: '' },
  { label: 'Verbo', value: 'v' },
  { label: 'Substantivo', value: 'n' },
  { label: 'Adjetivo', value: 'adj' },
  { label: 'Advérbio', value: 'adv' },
  { label: 'Preposição', value: 'prep' },
  { label: 'Conjunção', value: 'conj' },
  { label: 'Pronome', value: 'pron' },
  { label: 'Nome próprio', value: 'n pr' },
];

export const LexiconPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StrongEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [posFilter, setPosFilter] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<StrongEntry | null>(null);
  const [mode, setMode] = useState<'greek' | 'portuguese'>('greek');

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = mode === 'greek'
        ? await dbQueries.searchStrong(q)
        : await dbQueries.searchStrongByPortuguese(q);
      setResults(posFilter ? data.filter((e) => e.pos && e.pos.startsWith(posFilter)) : data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [mode, posFilter]);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 250);
    return () => clearTimeout(timer);
  }, [query, search]);

  const [srsFeedback, setSrsFeedback] = useState<string | null>(null);

  const handleAddToSRS = async (entry: StrongEntry) => {
    try {
      await dbQueries.upsertSRSCard({
        wordId: entry.id,
        token: entry.greek,
        glossPT: entry.translit || entry.name || entry.id,
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0,
        nextReview: new Date().toISOString().split('T')[0],
        status: 'aprendendo',
      });
      setSrsFeedback('✅ Adicionada à revisão');
    } catch (err) {
      console.error('[SRS] Falha ao adicionar cartão:', err);
      setSrsFeedback('❌ Erro ao adicionar. Tente novamente.');
    }
    setTimeout(() => setSrsFeedback(null), 2500);
  };

  return (
    <SafeArea>
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Lexicon</h1>
        <p className="text-text-secondary text-sm mb-4">
          Dicionário grego-português com definições do Strong
        </p>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setMode('greek')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              mode === 'greek' ? 'bg-primary text-white' : 'bg-surface text-text-secondary'
            }`}
          >
            Grego
          </button>
          <button
            onClick={() => setMode('portuguese')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              mode === 'portuguese' ? 'bg-primary text-white' : 'bg-surface text-text-secondary'
            }`}
          >
            Português
          </button>
        </div>

        <div className="relative mb-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === 'greek' ? 'Buscar por grego, translit ou Strong ID...' : 'Buscar por português...'}
            className="w-full bg-surface border border-border rounded-2xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 text-sm outline-none focus:border-primary transition-colors"
            autoFocus
          />
        </div>

        <div className="flex gap-1.5 pb-1 overflow-x-auto scrollbar-none">
          {POS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setPosFilter(f.value)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                posFilter === f.value
                  ? 'bg-secondary text-white'
                  : 'bg-surface text-text-secondary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 pb-4 overflow-y-auto">
        {loading && (
          <div className="flex justify-center py-12">
            <p className="text-text-secondary">Buscando...</p>
          </div>
        )}

        {!loading && results.length === 0 && query && (
          <div className="flex flex-col items-center py-12">
            <span className="text-4xl mb-3">📖</span>
            <p className="text-text-secondary text-sm">Nenhum resultado encontrado</p>
          </div>
        )}

        {!loading && !query && (
          <div className="flex flex-col items-center py-12">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-text-secondary text-sm">Digite para buscar no dicionário</p>
            <p className="text-text-secondary/60 text-xs mt-2">
              {mode === 'greek' ? 'Ex: αγαπη, agape, G26' : 'Ex: amor, graça, verdade'}
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-1.5">
            {results.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="w-full bg-surface rounded-2xl p-4 flex items-center justify-between shadow-sm active:bg-surface-alt transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <GreekText text={entry.greek || entry.name || entry.id} size="lg" />
                  <div className="min-w-0">
                    {entry.translit && (
                      <p className="text-text-primary text-sm font-medium truncate">{entry.translit}</p>
                    )}
                    {entry.name && (
                      <p className="text-text-secondary text-xs truncate">{entry.name}</p>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="text-primary text-xs font-bold">{entry.id}</p>
                  {entry.pos && (
                    <p className="text-text-secondary text-[10px]">{entry.pos}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomSheet
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        height="auto"
        title="Dicionário Strong"
      >
        {selectedEntry && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <GreekText text={selectedEntry.greek || selectedEntry.name || selectedEntry.id} size="xl" />
              <div>
                <p className="text-text-primary font-bold text-lg">{selectedEntry.translit}</p>
                {selectedEntry.name && (
                  <p className="text-text-secondary text-sm">{selectedEntry.name}</p>
                )}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                {selectedEntry.id}
              </span>
              {selectedEntry.pos && (
                <span className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full">
                  {selectedEntry.pos}
                </span>
              )}
              <button
                onClick={() => handleAddToSRS(selectedEntry)}
                className="ml-auto bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full active:bg-primary/20 transition-colors"
              >
                + Revisar
              </button>
            </div>

            {selectedEntry.origin && (
              <div className="bg-background rounded-xl p-3">
                <p className="text-xs text-text-secondary font-bold mb-1">Origem</p>
                <p className="text-text-primary text-sm leading-relaxed">{selectedEntry.origin}</p>
              </div>
            )}

            {selectedEntry.pronunciation && (
              <div className="bg-background rounded-xl p-3">
                <p className="text-xs text-text-secondary font-bold mb-1">Pronúncia</p>
                <p className="text-text-primary text-sm">{selectedEntry.pronunciation}</p>
              </div>
            )}

            {selectedEntry.definitions.length > 0 && (
              <div>
                <p className="text-xs text-text-secondary font-bold mb-2">Definições</p>
                <ul className="space-y-2">
                  {selectedEntry.definitions.map((def, i) => (
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

      {srsFeedback && (
        <div className="fixed top-20 left-4 right-4 z-50 bg-surface border border-border rounded-2xl px-4 py-3 shadow-lg text-center text-sm font-medium text-text-primary animate-fadeIn">
          {srsFeedback}
        </div>
      )}

      <BottomNav />
    </SafeArea>
  );
};
