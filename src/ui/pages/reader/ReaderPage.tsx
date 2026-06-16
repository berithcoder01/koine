import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { BottomNav } from '@/ui/layouts/BottomNav';
import { PassageSelectorSheet } from './components/PassageSelectorSheet';
import { InterlinearVerse } from './components/InterlinearVerse';
import { VerseTranslationCard } from './components/VerseTranslationCard';
import { ReaderModeSelector, type ReaderMode, getModeConfig } from './components/ReaderModeSelector';
import { ntService, type ChapterVerse } from '@/features/reader/ntService';
import type { InterlinearTokenData } from './components/InterlinearToken';
import { alignFluentToTokens } from '@/core/utils/alignFluentToTokens';

const SAMPLE_CHAPTER: ChapterVerse[] = [
  {
    verse: 1,
    fluentPT: { bookAbbr: 'JN', bookName: 'João', ch: 1, v: 1, text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.', source: 'blivre', version: '2018-02' },
    tokens: [
      { id: 'JN-1-1-1', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 1, token: 'Ἐν', lemma: 'ἐν', strongs_id: 'G1722', parsing: 'PREP', glossPT: 'em' },
      { id: 'JN-1-1-2', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 2, token: 'ἀρχῇ', lemma: 'ἀρχή', strongs_id: 'G746', parsing: 'N-DSF', glossPT: 'princípio' },
      { id: 'JN-1-1-3', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 3, token: 'ἦν', lemma: 'εἰμί', strongs_id: 'G1510', parsing: 'V-IAI-3S', glossPT: 'era' },
      { id: 'JN-1-1-4', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 4, token: 'ὁ', lemma: 'ὁ', strongs_id: 'G3588', parsing: 'T-NSM', glossPT: 'o' },
      { id: 'JN-1-1-5', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 5, token: 'λόγος,', lemma: 'λόγος', strongs_id: 'G3056', parsing: 'N-NSM', glossPT: 'Verbo' },
      { id: 'JN-1-1-6', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 6, token: 'καὶ', lemma: 'καί', strongs_id: 'G2532', parsing: 'CONJ', glossPT: 'e' },
      { id: 'JN-1-1-7', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 7, token: 'ὁ', lemma: 'ὁ', strongs_id: 'G3588', parsing: 'T-NSM', glossPT: 'o' },
      { id: 'JN-1-1-8', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 8, token: 'λόγος', lemma: 'λόγος', strongs_id: 'G3056', parsing: 'N-NSM', glossPT: 'Verbo' },
      { id: 'JN-1-1-9', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 9, token: 'ἦν', lemma: 'εἰμί', strongs_id: 'G1510', parsing: 'V-IAI-3S', glossPT: 'era' },
      { id: 'JN-1-1-10', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 10, token: 'πρὸς', lemma: 'πρός', strongs_id: 'G4314', parsing: 'PREP', glossPT: 'com' },
      { id: 'JN-1-1-11', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 11, token: 'τὸν', lemma: 'ὁ', strongs_id: 'G3588', parsing: 'T-ASM', glossPT: 'o' },
      { id: 'JN-1-1-12', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 12, token: 'θεόν,', lemma: 'θεός', strongs_id: 'G2316', parsing: 'N-ASM', glossPT: 'Deus' },
      { id: 'JN-1-1-13', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 13, token: 'καὶ', lemma: 'καί', strongs_id: 'G2532', parsing: 'CONJ', glossPT: 'e' },
      { id: 'JN-1-1-14', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 14, token: 'θεὸς', lemma: 'θεός', strongs_id: 'G2316', parsing: 'N-NSM', glossPT: 'Deus' },
      { id: 'JN-1-1-15', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 15, token: 'ἦν', lemma: 'εἰμί', strongs_id: 'G1510', parsing: 'V-IAI-3S', glossPT: 'era' },
      { id: 'JN-1-1-16', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 16, token: 'ὁ', lemma: 'ὁ', strongs_id: 'G3588', parsing: 'T-NSM', glossPT: 'o' },
      { id: 'JN-1-1-17', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 1, position: 17, token: 'λόγος.', lemma: 'λόγος', strongs_id: 'G3056', parsing: 'N-NSM', glossPT: 'Verbo' },
    ],
  },
  {
    verse: 2,
    fluentPT: { bookAbbr: 'JN', bookName: 'João', ch: 1, v: 2, text: 'Ele estava no princípio com Deus.', source: 'blivre', version: '2018-02' },
    tokens: [
      { id: 'JN-1-2-1', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 2, position: 1, token: 'οὗτος', lemma: 'οὗτος', strongs_id: 'G3778', parsing: 'D-NSM', glossPT: 'Este' },
      { id: 'JN-1-2-2', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 2, position: 2, token: 'ἦν', lemma: 'εἰμί', strongs_id: 'G1510', parsing: 'V-IAI-3S', glossPT: 'era' },
      { id: 'JN-1-2-3', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 2, position: 3, token: 'ἐν', lemma: 'ἐν', strongs_id: 'G1722', parsing: 'PREP', glossPT: 'em' },
      { id: 'JN-1-2-4', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 2, position: 4, token: 'ἀρχῇ', lemma: 'ἀρχή', strongs_id: 'G746', parsing: 'N-DSF', glossPT: 'princípio' },
      { id: 'JN-1-2-5', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 2, position: 5, token: 'πρὸς', lemma: 'πρός', strongs_id: 'G4314', parsing: 'PREP', glossPT: 'com' },
      { id: 'JN-1-2-6', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 2, position: 6, token: 'τὸν', lemma: 'ὁ', strongs_id: 'G3588', parsing: 'T-ASM', glossPT: 'o' },
      { id: 'JN-1-2-7', book_abbr: 'JN', book_name: 'João', chapter: 1, verse: 2, position: 7, token: 'θεόν.', lemma: 'θεός', strongs_id: 'G2316', parsing: 'N-ASM', glossPT: 'Deus' },
    ],
  },
];

interface BookInfo {
  name: string;
  chapters: number;
  bookOrder: number;
}

const BOOK_NAMES: Record<string, BookInfo> = {
  MT:  { name: 'Mateus',     chapters: 28, bookOrder: 1 },
  MK:  { name: 'Marcos',     chapters: 16, bookOrder: 2 },
  LK:  { name: 'Lucas',      chapters: 24, bookOrder: 3 },
  JN:  { name: 'João',       chapters: 21, bookOrder: 4 },
  AC:  { name: 'Atos',       chapters: 28, bookOrder: 5 },
  RO:  { name: 'Romanos',    chapters: 16, bookOrder: 6 },
  '1CO': { name: '1 Coríntios', chapters: 16, bookOrder: 7 },
  '2CO': { name: '2 Coríntios', chapters: 13, bookOrder: 8 },
  GA:  { name: 'Gálatas',    chapters: 6,  bookOrder: 9 },
  EP:  { name: 'Efésios',    chapters: 6,  bookOrder: 10 },
  PH:  { name: 'Filipenses', chapters: 4,  bookOrder: 11 },
  CO:  { name: 'Colossenses', chapters: 4, bookOrder: 12 },
  '1TH': { name: '1 Tessalonicenses', chapters: 5, bookOrder: 13 },
  '2TH': { name: '2 Tessalonicenses', chapters: 3, bookOrder: 14 },
  '1TI': { name: '1 Timóteo', chapters: 6, bookOrder: 15 },
  '2TI': { name: '2 Timóteo', chapters: 4, bookOrder: 16 },
  TI:  { name: 'Tito',       chapters: 3,  bookOrder: 17 },
  PHM: { name: 'Filemom',    chapters: 1,  bookOrder: 18 },
  HE:  { name: 'Hebreus',    chapters: 13, bookOrder: 19 },
  JA:  { name: 'Tiago',      chapters: 5,  bookOrder: 20 },
  '1PE': { name: '1 Pedro',  chapters: 5,  bookOrder: 21 },
  '2PE': { name: '2 Pedro',  chapters: 3,  bookOrder: 22 },
  '1JN': { name: '1 João',   chapters: 5,  bookOrder: 23 },
  '2JN': { name: '2 João',   chapters: 1,  bookOrder: 24 },
  '3JN': { name: '3 João',   chapters: 1,  bookOrder: 25 },
  JUDE: { name: 'Judas',     chapters: 1,  bookOrder: 26 },
  RE:  { name: 'Apocalipse', chapters: 22, bookOrder: 27 },
};

const BOOK_ORDER: string[] = Object.keys(BOOK_NAMES).sort(
  (a, b) => BOOK_NAMES[a].bookOrder - BOOK_NAMES[b].bookOrder,
);

// ─── Persistência localStorage ───────────────────────────────────

const STORAGE_KEY = 'koine.reader.lastPosition';

interface SavedPosition {
  book: string;
  chapter: number;
  verse?: number;
  updatedAt: number;
}

function loadSavedPosition(): { book: string; chapter: number; verse?: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedPosition;
    if (!parsed?.book || !BOOK_NAMES[parsed.book]) return null;
    return { book: parsed.book, chapter: parsed.chapter, verse: parsed.verse };
  } catch {
    return null;
  }
}

function savePosition(book: string, chapter: number, verse?: number): void {
  if (typeof window === 'undefined') return;
  try {
    const payload: SavedPosition = { book, chapter, verse, updatedAt: Date.now() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignora quota
  }
}

const getBookName = (abbr: string): string => BOOK_NAMES[abbr]?.name ?? abbr;
const getBookChapters = (abbr: string): number => BOOK_NAMES[abbr]?.chapters ?? 1;

export const ReaderPage: React.FC = () => {
  // Inicializa com posição salva (se houver) ou padrão
  const [currentRef, setCurrentRef] = useState<{ book: string; chapter: number }>(() => {
    const saved = loadSavedPosition();
    return saved ? { book: saved.book, chapter: saved.chapter } : { book: 'JN', chapter: 1 };
  });
  const [targetVerse, setTargetVerse] = useState<number | null>(() => {
    const saved = loadSavedPosition();
    return saved?.verse ?? null;
  });

  const [chapterData, setChapterData] = useState<ChapterVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPassageSelector, setShowPassageSelector] = useState(false);
  const [readerMode, setReaderMode] = useState<ReaderMode>('assisted');
  const [visiblePT, setVisiblePT] = useState<Set<number>>(new Set());
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  const [filterStrong, setFilterStrong] = useState<string | null>(null);
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const verseRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  const handleVersePress = useCallback((verse: number) => {
    setHighlightedVerse(verse);
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = setTimeout(() => setHighlightedVerse(null), 2000);
  }, []);

  const handleFilterByStrong = useCallback((strongId: string) => {
    setFilterStrong((current) => (current === strongId ? null : strongId));
  }, []);

  // Reset filter when chapter changes
  useEffect(() => {
    setFilterStrong(null);
  }, [currentRef.book, currentRef.chapter]);

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    };
  }, []);

  // Salva posição sempre que muda
  useEffect(() => {
    savePosition(currentRef.book, currentRef.chapter, targetVerse ?? undefined);
  }, [currentRef, targetVerse]);

  // Carrega capítulo ao mudar book/chapter
  useEffect(() => {
    loadChapter(currentRef.book, currentRef.chapter);
  }, [currentRef.book, currentRef.chapter]);

  // Scroll para versículo alvo (quando carrega capítulo)
  useEffect(() => {
    if (!targetVerse || chapterData.length === 0) return;
    const el = verseRefs.current.get(targetVerse);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTargetVerse(null);
      }, 150);
    } else {
      setTargetVerse(null);
    }
  }, [chapterData, targetVerse]);

  const loadChapter = async (book: string, chapter: number) => {
    setLoading(true);
    try {
      const data = await ntService.getChapterWithPT(book, chapter);
      if (data.length > 0) {
        setChapterData(data);
        return;
      }
    } catch (e) {
      console.warn('[ReaderPage] getChapterWithPT falhou, fallback SAMPLE:', e);
    } finally {
      setLoading(false);
    }
    if (book === 'JN' && chapter === 1) {
      setChapterData(SAMPLE_CHAPTER);
    } else {
      setChapterData([]);
    }
  };

  // ─── Navegação entre livros/capítulos ───────────────────────────

  const getAdjacentBook = (currentBook: string, direction: -1 | 1): string | null => {
    const idx = BOOK_ORDER.indexOf(currentBook);
    const nextIdx = idx + direction;
    if (nextIdx < 0 || nextIdx >= BOOK_ORDER.length) return null;
    return BOOK_ORDER[nextIdx];
  };

  const goPrevChapter = () => {
    if (currentRef.chapter > 1) {
      setCurrentRef((prev) => ({ ...prev, chapter: prev.chapter - 1 }));
    } else {
      const prevBook = getAdjacentBook(currentRef.book, -1);
      if (prevBook) {
        const lastCh = getBookChapters(prevBook);
        setCurrentRef({ book: prevBook, chapter: lastCh });
      }
    }
    scrollToTop();
  };

  const goNextChapter = () => {
    const max = getBookChapters(currentRef.book);
    if (currentRef.chapter < max) {
      setCurrentRef((prev) => ({ ...prev, chapter: prev.chapter + 1 }));
    } else {
      const nextBook = getAdjacentBook(currentRef.book, 1);
      if (nextBook) {
        setCurrentRef({ book: nextBook, chapter: 1 });
      }
    }
    scrollToTop();
  };

  const scrollToTop = () => {
    setTimeout(() => {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const goToVerse = useCallback((verse: number) => {
    setTargetVerse(verse);
  }, []);

  const togglePT = (verse: number) => {
    setVisiblePT((prev) => {
      const next = new Set(prev);
      if (next.has(verse)) next.delete(verse);
      else next.add(verse);
      return next;
    });
  };

  const setVerseRef = useCallback((verse: number, el: HTMLDivElement | null) => {
    if (el) verseRefs.current.set(verse, el);
  }, []);

  // ─── Derivados ─────────────────────────────────────────────────

  const showGloss = readerMode === 'assisted' || readerMode === 'interlinear' || readerMode === 'transliteration';
  const showLemma = readerMode === 'interlinear';
  const showParsing = readerMode === 'interlinear';
  const showTranslit = readerMode === 'transliteration';

  // Calcula destino da navegação para mostrar nos botões
  const prevBook = getAdjacentBook(currentRef.book, -1);
  const nextBook = getAdjacentBook(currentRef.book, 1);
  const prevTarget = currentRef.chapter > 1
    ? { book: currentRef.book, chapter: currentRef.chapter - 1 }
    : prevBook
      ? { book: prevBook, chapter: getBookChapters(prevBook) }
      : null;
  const nextTarget = currentRef.chapter < getBookChapters(currentRef.book)
    ? { book: currentRef.book, chapter: currentRef.chapter + 1 }
    : nextBook
      ? { book: nextBook, chapter: 1 }
      : null;

  // ─── Render ────────────────────────────────────────────────────

  return (
    <SafeArea scrollable>
      {/* Capítulo rolável */}
      <div
        ref={scrollContainerRef}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain pb-24 relative"
      >
        {/* Sticky Header com o Title, Mode Selector e Chapter Selector */}
        <div className="sticky top-0 z-30 px-4 pt-[max(env(safe-area-inset-top),1rem)] pb-3 bg-background/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-border/20 dark:border-border/10">
          <h1 className="text-2xl font-extrabold text-text-primary dark:text-white mb-2 tracking-tight">
            Leitor do Novo Testamento
          </h1>
          <p className="text-text-secondary text-[9px] font-bold uppercase tracking-widest leading-none mb-1.5 px-1">
            Modo de Leitura
          </p>
          <ReaderModeSelector
            mode={readerMode}
            onChange={setReaderMode}
          />

          {/* Card de seleção de capítulo fixo (Pill) */}
          <button
            onClick={() => setShowPassageSelector(true)}
            className="w-full bg-surface dark:bg-surface-alt/80 border border-border/40 dark:border-border/10 text-left flex items-center justify-between active:scale-[0.98] transition-transform shadow-sm"
            style={{ borderRadius: '9999px', padding: '10px 28px', minHeight: '60px' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 bg-secondary/15 dark:bg-secondary/20 flex items-center justify-center shrink-0"
                style={{ borderRadius: '9999px' }}
              >
                <span className="text-lg">📖</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-text-secondary text-[9px] font-bold uppercase tracking-widest leading-none mb-1">Capítulo Selecionado</p>
                <p className="text-text-primary dark:text-white font-extrabold text-sm leading-none">
                  {getBookName(currentRef.book)} <span className="opacity-50 font-normal">·</span> Cap. {currentRef.chapter}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-text-secondary text-[10px] font-bold bg-background dark:bg-black/40 px-2.5 py-1 tabular-nums"
                style={{ borderRadius: '9999px' }}
              >
                {chapterData.length} v.
              </span>
              <span className="text-text-secondary font-bold text-lg leading-none ml-1">›</span>
            </div>
          </button>
        </div>

        <div className="px-4 py-3 flex flex-col gap-3 pb-8">

        {showResumeBanner && (
          <div className="mb-3 bg-secondary/15 border border-secondary/30 rounded-xl p-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-text-primary dark:text-white text-xs font-bold">
                📍 Continuar de onde parou?
              </p>
              <p className="text-text-secondary text-[10px]">
                Sua última leitura
              </p>
            </div>
            <button
              onClick={() => setShowResumeBanner(false)}
              className="text-text-secondary text-[10px] font-bold uppercase tracking-wide"
            >
              Ocultar
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-text-secondary text-sm">Carregando capítulo…</div>
          </div>
        ) : chapterData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-4xl mb-3">📭</span>
            <p className="text-text-primary dark:text-white font-bold">
              Capítulo indisponível
            </p>
            <p className="text-text-secondary text-xs mt-1">
              Não há dados interlineares para {getBookName(currentRef.book)} {currentRef.chapter}.
            </p>
          </div>
        ) : (
          <>
            {/* Descrição do modo */}
            {readerMode !== 'assisted' && (
              <p className="text-text-secondary text-xs italic px-2">
                💡 {getModeConfig(readerMode).description}
              </p>
            )}

            {/* Chip de filtro ativo por Strong */}
            {filterStrong && (() => {
              const totalMatches = chapterData.reduce(
                (sum, cv) => sum + cv.tokens.filter((t) => t.strongs_id === filterStrong).length,
                0,
              );
              return (
                <div className="flex items-center justify-between bg-secondary/10 dark:bg-secondary/20 border border-secondary/30 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-secondary dark:text-secondary-light">
                      Filtrando
                    </span>
                    <span className="font-mono text-xs font-bold text-secondary dark:text-secondary-light">
                      {filterStrong}
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      · {totalMatches} {totalMatches === 1 ? 'ocorrência' : 'ocorrências'} no capítulo
                    </span>
                  </div>
                  <button
                    onClick={() => setFilterStrong(null)}
                    className="text-[10px] font-bold uppercase text-secondary dark:text-secondary-light px-2 py-1 rounded-lg hover:bg-secondary/20"
                  >
                    Limpar ✕
                  </button>
                </div>
              );
            })()}

            {chapterData.map((v) => {
              const ptVisible = visiblePT.has(v.verse);
              const isInterlinear = readerMode === 'interlinear';
              const alignedWords = isInterlinear && v.fluentPT?.text
                ? alignFluentToTokens(v.tokens as InterlinearTokenData[], v.fluentPT.text)
                : undefined;
              return (
                <div
                  key={v.verse}
                  ref={(el) => setVerseRef(v.verse, el)}
                  className="flex flex-col gap-2 scroll-mt-4"
                >
                  <InterlinearVerse
                    book={currentRef.book}
                    chapter={currentRef.chapter}
                    verse={v.verse}
                    tokens={v.tokens as InterlinearTokenData[]}
                    showGloss={showGloss}
                    showLemma={showLemma}
                    showParsing={showParsing}
                    showTranslit={showTranslit}
                    alignedWords={alignedWords}
                    highlighted={highlightedVerse === v.verse}
                    filterStrong={filterStrong}
                    onVersePress={handleVersePress}
                    onFilterByStrong={handleFilterByStrong}
                  />
                  {v.fluentPT && readerMode !== 'immersion' && readerMode !== 'interlinear' && readerMode !== 'transliteration' && (
                    <VerseTranslationCard
                      book={currentRef.book}
                      chapter={currentRef.chapter}
                      verse={v.verse}
                      textPT={v.fluentPT.text}
                      isVisible={ptVisible}
                      onToggleVisibility={() => togglePT(v.verse)}
                    />
                  )}
                </div>
              );
            })}

            {/* Footer de navegação do capítulo (com wrap livro) */}
            <div className="flex gap-3 pt-4 pb-2">
              <button
                onClick={goPrevChapter}
                disabled={!prevTarget}
                className="flex-1 bg-surface dark:bg-surface-alt dark:border dark:border-border/10 rounded-xl py-3 text-text-secondary font-medium shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-70">
                  ← Anterior
                </div>
                {prevTarget && (
                  <div className="text-sm font-bold">
                    {prevTarget.book !== currentRef.book && getBookName(prevTarget.book) + ' '}
                    Cap. {prevTarget.chapter}
                  </div>
                )}
              </button>
              <button
                onClick={goNextChapter}
                disabled={!nextTarget}
                className="flex-1 bg-primary dark:bg-secondary text-white rounded-xl py-3 font-medium shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">
                  Próximo →
                </div>
                {nextTarget && (
                  <div className="text-sm font-bold">
                    {nextTarget.book !== currentRef.book && getBookName(nextTarget.book) + ' '}
                    Cap. {nextTarget.chapter}
                  </div>
                )}
              </button>
            </div>
          </>
        )}
        </div>
      </div>

      <PassageSelectorSheet
        isOpen={showPassageSelector}
        onClose={() => setShowPassageSelector(false)}
        onSelect={(book, chapter, verse) => {
          setCurrentRef({ book, chapter });
          if (verse && verse > 1) goToVerse(verse);
          setVisiblePT(new Set());
          setShowPassageSelector(false);
        }}
        currentBook={currentRef.book}
        currentChapter={currentRef.chapter}
        currentVerse={1}
      />

      <BottomNav />
    </SafeArea>
  );
};
