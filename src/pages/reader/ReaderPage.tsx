import React, { useState, useEffect } from 'react';
import { SafeArea } from '@/components/layout/SafeArea';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useAppNavigation } from '@/hooks/useNavigation';
import { PassageSelectorSheet } from './components/PassageSelectorSheet';
import { MorphologyPanel } from './components/MorphologyPanel';
import { ntService } from '@/services/ntService';

interface GreekToken {
  id: string;
  token: string;
  lemma: string;
  strongs_id: string;
  parsing: string;
  gloss_pt: string;
  position: number;
}

const SAMPLE_VERSES: Record<string, GreekToken[]> = {
  'JN-1-1': [
    { id: '1', token: 'Ἐν', lemma: 'ἐν', strongs_id: 'G1722', parsing: 'PREP', gloss_pt: 'em', position: 1 },
    { id: '2', token: 'ἀρχῇ', lemma: 'ἀρχή', strongs_id: 'G746', parsing: 'N-DSF', gloss_pt: 'princípio', position: 2 },
    { id: '3', token: 'ἦν', lemma: 'εἰμί', strongs_id: 'G1510', parsing: 'V-IAI-3S', gloss_pt: 'era', position: 3 },
    { id: '4', token: 'ὁ', lemma: 'ὁ', strongs_id: 'G3588', parsing: 'T-NSM', gloss_pt: 'o', position: 4 },
    { id: '5', token: 'λόγος,', lemma: 'λόγος', strongs_id: 'G3056', parsing: 'N-NSM', gloss_pt: 'Verbo/Palavra', position: 5 },
    { id: '6', token: 'καὶ', lemma: 'καί', strongs_id: 'G2532', parsing: 'CONJ', gloss_pt: 'e', position: 6 },
    { id: '7', token: 'ὁ', lemma: 'ὁ', strongs_id: 'G3588', parsing: 'T-NSM', gloss_pt: 'o', position: 7 },
    { id: '8', token: 'λόγος', lemma: 'λόγος', strongs_id: 'G3056', parsing: 'N-NSM', gloss_pt: 'Verbo/Palavra', position: 8 },
    { id: '9', token: 'ἦν', lemma: 'εἰμί', strongs_id: 'G1510', parsing: 'V-IAI-3S', gloss_pt: 'era', position: 9 },
    { id: '10', token: 'πρὸς', lemma: 'πρός', strongs_id: 'G4314', parsing: 'PREP', gloss_pt: 'com/para', position: 10 },
    { id: '11', token: 'τὸν', lemma: 'ὁ', strongs_id: 'G3588', parsing: 'T-ASM', gloss_pt: 'o', position: 11 },
    { id: '12', token: 'θεόν,', lemma: 'θεός', strongs_id: 'G2316', parsing: 'N-ASM', gloss_pt: 'Deus', position: 12 },
    { id: '13', token: 'καὶ', lemma: 'καί', strongs_id: 'G2532', parsing: 'CONJ', gloss_pt: 'e', position: 13 },
    { id: '14', token: 'θεὸς', lemma: 'θεός', strongs_id: 'G2316', parsing: 'N-NSM', gloss_pt: 'Deus', position: 14 },
    { id: '15', token: 'ἦν', lemma: 'εἰμί', strongs_id: 'G1510', parsing: 'V-IAI-3S', gloss_pt: 'era', position: 15 },
    { id: '16', token: 'ὁ', lemma: 'ὁ', strongs_id: 'G3588', parsing: 'T-NSM', gloss_pt: 'o', position: 16 },
    { id: '17', token: 'λόγος.', lemma: 'λόγος', strongs_id: 'G3056', parsing: 'N-NSM', gloss_pt: 'Verbo/Palavra', position: 17 },
  ],
};

type ReaderMode = 'assisted' | 'challenge' | 'immersion';

const MODE_CONFIG: Record<ReaderMode, { label: string; icon: string; description: string }> = {
  assisted:  { label: 'Assistido', icon: '📖', description: 'Tradução visível ao lado do grego' },
  challenge: { label: 'Desafio',   icon: '🎯', description: 'Tente traduzir sem assistência' },
  immersion: { label: 'Imersão',   icon: '🌊', description: 'Apenas grego + definição Strong (sem português)' },
};

export const ReaderPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigation = useAppNavigation();
  const isPremium = user?.isPremium ?? false;

  const [currentRef, setCurrentRef] = useState({ book: 'JN', chapter: 1, verse: 1 });
  const [tokens, setTokens] = useState<GreekToken[]>([]);
  const [selectedToken, setSelectedToken] = useState<GreekToken | null>(null);
  const [showPassageSelector, setShowPassageSelector] = useState(false);
  const [readerMode, setReaderMode] = useState<ReaderMode>('assisted');

  useEffect(() => {
    loadVerse(currentRef.book, currentRef.chapter, currentRef.verse);
  }, [currentRef]);

  const loadVerse = async (book: string, chapter: number, verse: number) => {
    const key = `${book}-${chapter}-${verse}`;
    const fromNT = await ntService.getVerse(book, chapter, verse);
    setTokens(fromNT.length > 0 ? fromNT : (SAMPLE_VERSES[key] ?? []));
  };

  if (!isPremium) {
    return (
      <SafeArea>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <span className="text-6xl mb-6">📖</span>
          <h2 className="text-xl font-bold text-text-primary mb-3">
            Leitor Interlinear
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            Leia o Novo Testamento em grego com tradução palavra a palavra e análise morfológica completa.
            Disponível no Premium.
          </p>
          <Button
            label="Ver Planos Premium"
            onClick={() => navigation.goToPaywall()}
            fullWidth
            size="lg"
          />
          <p className="text-text-secondary text-xs mt-3">7 dias grátis • Sem cartão</p>
        </div>
        <BottomNav />
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <div className="bg-primary px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-white font-bold text-lg">Leitor do NT</h1>
          <div className="flex gap-1">
            {(Object.entries(MODE_CONFIG) as [ReaderMode, typeof MODE_CONFIG['assisted']][]).map(([mode, cfg]) => (
              <button
                key={mode}
                onClick={() => setReaderMode(mode)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                  readerMode === mode ? 'bg-secondary text-white' : 'bg-white/20 text-white'
                }`}
              >
                {cfg.icon} {cfg.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowPassageSelector(true)}
          className="w-full bg-white/10 rounded-xl px-4 py-2 text-left"
        >
          <p className="text-white/60 text-xs">Passagem atual</p>
          <p className="text-white font-bold">
            João {currentRef.chapter}:{currentRef.verse}
          </p>
        </button>
      </div>

      <div className="px-4 py-6">
        <div className="bg-surface rounded-2xl p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {tokens.map((token) => (
              <button
                key={token.id}
                onClick={() => {
                  if (readerMode === 'immersion' || readerMode === 'challenge') {
                    setSelectedToken(token);
                  }
                }}
                className={`flex flex-col items-center rounded-lg px-1 py-1 transition-colors ${
                  selectedToken?.id === token.id
                    ? 'bg-primary/10'
                    : 'hover:bg-background'
                }`}
              >
                <span className="greek-text text-xl text-primary font-medium leading-tight">
                  {token.token}
                </span>
                {readerMode === 'assisted' && (
                  <span className="text-xs text-text-secondary mt-0.5 max-w-[60px] text-center leading-tight">
                    {token.gloss_pt}
                  </span>
                )}
              </button>
            ))}
          </div>

          {readerMode !== 'assisted' && (
            <p className="text-text-secondary text-xs mt-4 text-center italic">
              {MODE_CONFIG[readerMode].description}
            </p>
          )}
        </div>

        <p className="text-center text-text-secondary text-sm mt-3">
          João {currentRef.chapter}:{currentRef.verse} — SBLGNT
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setCurrentRef(prev => ({ ...prev, verse: Math.max(1, prev.verse - 1) }))}
            className="flex-1 bg-surface rounded-xl py-3 text-text-secondary font-medium shadow-sm"
          >
            ← Anterior
          </button>
          <button
            onClick={() => setCurrentRef(prev => ({ ...prev, verse: prev.verse + 1 }))}
            className="flex-1 bg-primary text-white rounded-xl py-3 font-medium shadow-sm"
          >
            Próximo →
          </button>
        </div>
      </div>

      <MorphologyPanel
        token={selectedToken}
        onClose={() => setSelectedToken(null)}
        immersionMode={readerMode === 'immersion'}
      />

      <PassageSelectorSheet
        isOpen={showPassageSelector}
        onClose={() => setShowPassageSelector(false)}
        onSelect={(book, chapter, verse) => {
          setCurrentRef({ book, chapter, verse });
          setShowPassageSelector(false);
        }}
      />

      <BottomNav />
    </SafeArea>
  );
};
