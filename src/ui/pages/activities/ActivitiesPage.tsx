import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { BottomNav } from '@/ui/layouts/BottomNav';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { useProgressStore } from '@/features/progress/progressStore';
import { dbQueries } from '@/features/database/queries';
import { ROUTES } from '@/core/constants/routes';
import { clsx } from 'clsx';
import { PenLine, Lock } from 'lucide-react';

interface LetterInfo {
  id: string;
  upperCase: string;
  lowerCase: string;
  name: string;
  sound: string;
  module: number;
}

export const ActivitiesPage: React.FC = () => {
  const navigation = useAppNavigation();
  const navigate = useNavigate();
  const { completedLessons } = useProgressStore();
  const [letters, setLetters] = useState<LetterInfo[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  useEffect(() => {
    loadLetters();
  }, []);

  const loadLetters = async () => {
    try {
      const all = await dbQueries.getAllLetters();
      setLetters(all.map((l: any) => ({
        id: l.id,
        upperCase: l.upperCase,
        lowerCase: l.lowerCase,
        name: l.name,
        sound: l.sound,
        module: l.module ?? 1,
      })));
    } catch {
      const fallback = [
        { id: 'alpha', upperCase: 'Α', lowerCase: 'α', name: 'alfa', sound: '/a/', module: 1 },
        { id: 'beta', upperCase: 'Β', lowerCase: 'β', name: 'beta', sound: '/b/', module: 6 },
        { id: 'gamma', upperCase: 'Γ', lowerCase: 'γ', name: 'gama', sound: '/g/', module: 6 },
        { id: 'delta', upperCase: 'Δ', lowerCase: 'δ', name: 'delta', sound: '/d/', module: 6 },
        { id: 'epsilon', upperCase: 'Ε', lowerCase: 'ε', name: 'épsilon', sound: '/e/', module: 1 },
        { id: 'zeta', upperCase: 'Ζ', lowerCase: 'ζ', name: 'zeta', sound: '/dz/', module: 8 },
        { id: 'eta', upperCase: 'Η', lowerCase: 'η', name: 'eta', sound: '/ē/', module: 3 },
        { id: 'theta', upperCase: 'Θ', lowerCase: 'θ', name: 'teta', sound: '/th/', module: 7 },
        { id: 'iota', upperCase: 'Ι', lowerCase: 'ι', name: 'iota', sound: '/i/', module: 1 },
        { id: 'kappa', upperCase: 'Κ', lowerCase: 'κ', name: 'kappa', sound: '/k/', module: 4 },
        { id: 'lambda', upperCase: 'Λ', lowerCase: 'λ', name: 'lambda', sound: '/l/', module: 4 },
        { id: 'mu', upperCase: 'Μ', lowerCase: 'μ', name: 'mi', sound: '/m/', module: 5 },
        { id: 'nu', upperCase: 'Ν', lowerCase: 'ν', name: 'nu', sound: '/n/', module: 3 },
        { id: 'xi', upperCase: 'Ξ', lowerCase: 'ξ', name: 'xi', sound: '/ks/', module: 8 },
        { id: 'omicron', upperCase: 'Ο', lowerCase: 'ο', name: 'ômicron', sound: '/o/', module: 2 },
        { id: 'pi', upperCase: 'Π', lowerCase: 'π', name: 'pi', sound: '/p/', module: 5 },
        { id: 'rho', upperCase: 'Ρ', lowerCase: 'ρ', name: 'rô', sound: '/r/', module: 5 },
        { id: 'sigma', upperCase: 'Σ', lowerCase: 'σ', name: 'sigma', sound: '/s/', module: 4 },
        { id: 'tau', upperCase: 'Τ', lowerCase: 'τ', name: 'tau', sound: '/t/', module: 3 },
        { id: 'upsilon', upperCase: 'Υ', lowerCase: 'υ', name: 'ípsilon', sound: '/y/', module: 2 },
        { id: 'phi', upperCase: 'Φ', lowerCase: 'φ', name: 'fi', sound: '/f/', module: 7 },
        { id: 'chi', upperCase: 'Χ', lowerCase: 'χ', name: 'qui', sound: '/kh/', module: 7 },
        { id: 'psi', upperCase: 'Ψ', lowerCase: 'ψ', name: 'psi', sound: '/ps/', module: 8 },
        { id: 'omega', upperCase: 'Ω', lowerCase: 'ω', name: 'ômega', sound: '/ō/', module: 2 },
      ];
      setLetters(fallback);
    }
  };

  const completedCount = Object.keys(completedLessons).length;
  const mostAdvancedModule = Math.min(10, Math.ceil(completedCount / 3) + 1);

  const isUnlocked = (module: number): boolean => module <= mostAdvancedModule;
  const isLocked = (module: number): boolean => !isUnlocked(module);

  const handleLetterPress = (letterId: string) => {
    setSelectedLetter(letterId);
    navigation.goToCanvas(letterId);
  };

  return (
    <SafeArea scrollable withBottomNav>
      {/* ── HEADER ── */}
      <div className="flex-shrink-0 px-4 pt-6 pb-5 transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-text-secondary dark:text-zinc-400 text-xs font-semibold">Extra</p>
            <h1 className="text-text-primary dark:text-white font-extrabold text-2xl tracking-tight mt-0.5">
              Atividades
            </h1>
          </div>
          <span className="bg-secondary/20 text-secondary dark:text-secondary-light text-xs font-bold px-3 py-1 rounded-full">
            {completedCount} módulos
          </span>
        </div>

        <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-4">
          <p className="font-black text-sm text-text-primary dark:text-white">
            Pratique fora da trilha
          </p>
          <p className="text-text-secondary dark:text-zinc-400 text-xs mt-1 leading-relaxed">
            Atividades extras para acelerar seu aprendizado. Complete módulos na trilha para liberar mais conteúdo.
          </p>
        </div>
      </div>

      {/* ── CONTEÚDO ROLÁVEL ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-6 pb-28">

        {/* ── TRILHA PARALELA: HISTÓRIA DO NT ── */}
        <div className="animate-fadeIn">
          <div
            onClick={() => navigate(ROUTES.HISTORY_TRAIL)}
            className="w-full relative overflow-hidden bg-gradient-to-br from-[#EA662C] to-[#D4571F] text-white p-5 rounded-[24px] shadow-lg cursor-pointer select-none flex flex-col justify-between min-h-[160px] active:scale-[0.98] transition-transform"
            role="button"
            tabIndex={0}
            aria-label="Trilha Paralela: História do Novo Testamento"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(ROUTES.HISTORY_TRAIL); }}
          >
            {/* Decorative Greek letter */}
            <div
              aria-hidden
              className="absolute -right-2 -top-4 text-[100px] font-serif select-none pointer-events-none opacity-[0.12]"
            >
              Ω
            </div>

            {/* Top row: badge */}
            <div className="flex items-center mb-3 relative z-10 w-full">
              <div className="flex items-center gap-1.5">
                <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  Trilha Paralela
                </span>
                <span className="bg-white/20 text-white text-[10px] font-black tracking-wider px-3 py-1 rounded-full">
                  930 XP
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="mb-2 relative z-10 w-full">
              <div className="text-xl font-black tracking-tight leading-tight mb-1">
                História do Novo Testamento
              </div>
              <div className="text-[11px] text-white/80 font-bold">
                15 módulos · 4 blocos históricos
              </div>
            </div>

            {/* Description */}
            <div className="text-sm leading-relaxed text-white/90 mb-3 relative z-10 w-full font-medium">
              Contexto histórico, geográfico e cultural para entender o mundo do NT
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/20 pt-2.5 mt-1 relative z-10 w-full">
              <span className="text-[11px] text-white/85 font-semibold">
                Toque para explorar ↓
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                Começar
              </span>
            </div>
          </div>
        </div>

        {/* ── ATIVIDADE: TREINO DE DIGITAÇÃO ── */}
        <div className="animate-fadeIn">
          <div
            onClick={() => navigate(ROUTES.TYPING)}
            className="w-full relative overflow-hidden bg-gradient-to-br from-[#6398A9] to-[#4A7A8A] text-white p-5 rounded-[24px] shadow-lg cursor-pointer select-none flex flex-col justify-between min-h-[120px] active:scale-[0.98] transition-transform"
            role="button"
            tabIndex={0}
            aria-label="Treino de Digitação"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(ROUTES.TYPING); }}
          >
            <div
              aria-hidden
              className="absolute -right-2 -top-4 text-[80px] font-serif select-none pointer-events-none opacity-[0.12]"
            >
              α
            </div>

            <div className="flex items-center mb-2 relative z-10 w-full">
              <div className="flex items-center gap-1.5">
                <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  Atividade Extra
                </span>
                <span className="bg-white/20 text-white text-[10px] font-black tracking-wider px-3 py-1 rounded-full">
                  10+ XP
                </span>
              </div>
            </div>

            <div className="relative z-10 w-full">
              <div className="text-xl font-black tracking-tight leading-tight mb-1">
                Treino de Digitação
              </div>
              <div className="text-[11px] text-white/80 font-bold">
                Digite palavras gregas com o teclado virtual
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/20 pt-2.5 mt-2 relative z-10 w-full">
              <span className="text-[11px] text-white/85 font-semibold">
                Toque para começar ↓
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                Praticar
              </span>
            </div>
          </div>
        </div>

        {/* ── ATIVIDADE: PRÁTICA DE ESCRITA ── */}
        <div className="animate-fadeIn">
          <div className="bg-surface/50 dark:bg-surface-alt/30 border border-border/40 dark:border-border/10 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <PenLine size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-text-primary dark:text-white font-bold text-sm">Prática de Escrita</h2>
                <p className="text-text-secondary dark:text-zinc-400 text-[11px]">
                  Desenhe as letras gregas para fixar a memória muscular
                </p>
              </div>
            </div>

            <p className="text-text-secondary dark:text-zinc-400 text-[10px] font-semibold uppercase tracking-wider mb-3">
              Selecione uma letra
            </p>

            <div className="grid grid-cols-6 gap-2">
              {letters.map((letter) => {
                const locked = isLocked(letter.module);
                return (
                  <button
                    key={letter.id}
                    disabled={locked}
                    onClick={() => !locked && handleLetterPress(letter.id)}
                    className={clsx(
                      'aspect-square rounded-2xl border flex flex-col items-center justify-center gap-0.5 transition-all duration-200',
                      locked
                        ? 'bg-surface-alt/50 border-border/20 opacity-40 cursor-not-allowed'
                        : 'bg-surface dark:bg-surface-alt/40 border-border/30 dark:border-border/10 cursor-pointer hover:border-primary/40 active:scale-95',
                    )}
                  >
                    {locked ? (
                      <Lock size={14} className="text-text-secondary" />
                    ) : (
                      <>
                        <span className="text-text-primary dark:text-white font-bold text-lg leading-none">
                          {letter.upperCase}
                        </span>
                        <span className="text-text-secondary dark:text-zinc-400 text-[9px] leading-none">
                          {letter.lowerCase}
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/20">
              <span className="text-text-secondary dark:text-zinc-400 text-[10px]">
                {letters.filter(l => isUnlocked(l.module)).length}/{letters.length} disponíveis
              </span>
              {selectedLetter && (
                <span className="text-primary text-[10px] font-semibold">
                  Praticando: {letters.find(l => l.id === selectedLetter)?.name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── TRILHA PARALELA: VOCABULÁRIO DO NT ── */}
        <div className="animate-fadeIn">
          <div
            onClick={() => navigate(ROUTES.VOCAB_TRAIL)}
            className="w-full relative overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white p-5 rounded-[24px] shadow-lg cursor-pointer select-none flex flex-col justify-between min-h-[160px] active:scale-[0.98] transition-transform"
            role="button"
            tabIndex={0}
            aria-label="Trilha Paralela: Vocabulário do Novo Testamento"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(ROUTES.VOCAB_TRAIL); }}
          >
            <div
              aria-hidden
              className="absolute -right-2 -top-4 text-[100px] font-serif select-none pointer-events-none opacity-[0.12]"
            >
              Λ
            </div>

            <div className="flex items-center mb-3 relative z-10 w-full">
              <div className="flex items-center gap-1.5">
                <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  Trilha Paralela
                </span>
                <span className="bg-white/20 text-white text-[10px] font-black tracking-wider px-3 py-1 rounded-full">
                  100 palavras
                </span>
              </div>
            </div>

            <div className="mb-2 relative z-10 w-full">
              <div className="text-xl font-black tracking-tight leading-tight mb-1">
                Vocabulário do Novo Testamento
              </div>
              <div className="text-[11px] text-white/80 font-bold">
                11 módulos · 4 blocos temáticos
              </div>
            </div>

            <div className="text-sm leading-relaxed text-white/90 mb-3 relative z-10 w-full font-medium">
              As 100 palavras mais frequentes e teologicamente centrais do NT grego
            </div>

            <div className="flex items-center justify-between border-t border-white/20 pt-2.5 mt-1 relative z-10 w-full">
              <span className="text-[11px] text-white/85 font-semibold">
                Toque para explorar ↓
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                Começar
              </span>
            </div>
          </div>
        </div>

        {/* ── TRILHA PARALELA: ESTUDO COM APOSTILA ── */}
        <div className="animate-fadeIn">
          <div
            onClick={() => navigate(ROUTES.APOSTILA)}
            className="w-full relative overflow-hidden bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white p-5 rounded-[24px] shadow-lg cursor-pointer select-none flex flex-col justify-between min-h-[160px] active:scale-[0.98] transition-transform"
            role="button"
            tabIndex={0}
            aria-label="Trilha Paralela: Estudo com Apostila"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(ROUTES.APOSTILA); }}
          >
            <div
              aria-hidden
              className="absolute -right-2 -top-4 text-[100px] font-serif select-none pointer-events-none opacity-[0.12]"
            >
              📄
            </div>

            <div className="flex items-center mb-3 relative z-10 w-full">
              <div className="flex items-center gap-1.5">
                <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  Trilha Paralela
                </span>
                <span className="bg-white/20 text-white text-[10px] font-black tracking-wider px-3 py-1 rounded-full">
                  20 lições
                </span>
              </div>
            </div>

            <div className="mb-2 relative z-10 w-full">
              <div className="text-xl font-black tracking-tight leading-tight mb-1">
                Estudo com Apostila
              </div>
              <div className="text-[11px] text-white/80 font-bold">
                4 blocos · Alfabeto a Frases do NT
              </div>
            </div>

            <div className="text-sm leading-relaxed text-white/90 mb-3 relative z-10 w-full font-medium">
              Imprima a apostila, abra o app, estude como se tivesse um professor ao seu lado
            </div>

            <div className="flex items-center justify-between border-t border-white/20 pt-2.5 mt-1 relative z-10 w-full">
              <span className="text-[11px] text-white/85 font-semibold">
                {useProgressStore.getState().completedApostilaLessons.length}/20 lições
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                Começar
              </span>
            </div>
          </div>
        </div>

        {/* ── ATIVIDADE FUTURA: LEITURA GUIADA ── */}
        <div className="animate-fadeIn opacity-60 pointer-events-none select-none">
          <div className="bg-surface/50 dark:bg-surface-alt/30 border border-border/40 dark:border-border/10 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                <Lock size={16} className="text-text-secondary" />
              </div>
              <div>
                <h2 className="text-text-primary dark:text-white font-bold text-sm">Leitura Guiada</h2>
                <p className="text-text-secondary dark:text-zinc-400 text-[11px]">
                  Complete o Ciclo II para desbloquear
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <BottomNav />
    </SafeArea>
  );
};
