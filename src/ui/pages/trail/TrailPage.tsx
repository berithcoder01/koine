// src/pages/trail/TrailPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { BottomNav } from '@/ui/layouts/BottomNav';
import { ProgressBar } from '@/ui/components/ProgressBar';
import { StreakBadge } from '@/ui/components/StreakBadge';
import { useProgressStore } from '@/features/progress/progressStore';
import { useAuthStore } from '@/features/auth/authStore';
import { useGamificationStore } from '@/features/gamification/gamificationStore';
import { dbQueries } from '@/features/database/queries';
import { UnitNode } from './components/UnitNode';
import { UnitDetailSheet } from './components/UnitDetailSheet';
import { WeeklyCalendar } from './components/WeeklyCalendar';
import { PalavraDoDiaCard } from './components/PalavraDoDia';
import { PalavraDoDiaSheet } from './components/PalavraDoDiaSheet';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { Button } from '@/ui/components';
import { useWordOfTheDay } from '@/content/word-of-the-day/useWordOfTheDay';
import { AvatarDisplay } from '@/ui/components/AvatarDisplay';
import { clsx } from 'clsx';
import { MODULES as CONTENT_MODULES, type Module as ContentModule } from '@/content/curriculum/modules';
import { CYCLE_1_UNIT_GROUPS, CYCLE_2_UNIT_GROUPS, CYCLE_3_UNIT_GROUPS, CYCLE_4_UNIT_GROUPS, CYCLE_5_UNIT_GROUPS, CYCLE_6_UNIT_GROUPS, CYCLE_7_UNIT_GROUPS, CYCLE_8_UNIT_GROUPS, type UnitGroup } from '@/content/curriculum/unit-groups';
import { LockedCycleCard } from './components/LockedCycleCard';

type NodeStatus = 'locked' | 'available' | 'in_progress' | 'complete';

// ─── Leitura: posição salva (localStorage) ───────────────────────
const READER_STORAGE_KEY = 'koine.reader.lastPosition';

interface ReaderPosition {
  book: string;
  chapter: number;
  verse?: number;
  updatedAt: number;
}

function getSavedReaderPosition(): ReaderPosition | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(READER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ReaderPosition;
    return parsed?.book ? parsed : null;
  } catch {
    return null;
  }
}

const BOOK_NAMES: Record<string, string> = {
  MT: 'Mateus', MK: 'Marcos', LK: 'Lucas', JN: 'João',
  AC: 'Atos', RO: 'Romanos', '1CO': '1 Coríntios', '2CO': '2 Coríntios',
  GA: 'Gálatas', EP: 'Efésios', PH: 'Filipenses', CO: 'Colossenses',
  '1TH': '1 Tessalonicenses', '2TH': '2 Tessalonicenses',
  '1TI': '1 Timóteo', '2TI': '2 Timóteo', TI: 'Tito', PHM: 'Filemom',
  HE: 'Hebreus', JA: 'Tiago', '1PE': '1 Pedro', '2PE': '2 Pedro',
  '1JN': '1 João', '2JN': '2 João', '3JN': '3 João', JUDE: 'Judas', RE: 'Apocalipse',
};

const getBookName = (abbr: string): string => BOOK_NAMES[abbr] ?? abbr;

interface Module {
  id: string;
  title: string;
  cycle_id: number;
  module_order: number;
  anchor_verse: string;
  anchor_reference: string;
  xp_total: number;
  total_exercises: number;
  method_primary: string;
}

const trailModuleFromContent = (m: ContentModule): Module => ({
  id: m.id,
  title: m.title,
  cycle_id: m.cycle,
  module_order: m.order,
  anchor_verse: m.anchorVerse,
  anchor_reference: m.anchorReference,
  xp_total: m.xp,
  total_exercises: m.exercises,
  method_primary: m.method,
});

const CYCLE_1_UNITS: UnitGroup[] = CYCLE_1_UNIT_GROUPS;
const CYCLE_2_UNITS: UnitGroup[] = CYCLE_2_UNIT_GROUPS;
const CYCLE_3_UNITS: UnitGroup[] = CYCLE_3_UNIT_GROUPS;
const CYCLE_4_UNITS: UnitGroup[] = CYCLE_4_UNIT_GROUPS;
const CYCLE_5_UNITS: UnitGroup[] = CYCLE_5_UNIT_GROUPS;
const CYCLE_6_UNITS: UnitGroup[] = CYCLE_6_UNIT_GROUPS;
const CYCLE_7_UNITS: UnitGroup[] = CYCLE_7_UNIT_GROUPS;
const CYCLE_8_UNITS: UnitGroup[] = CYCLE_8_UNIT_GROUPS;

const getUnitCardTheme = (index: number) => {
  const themes = [
    {
      bg: 'bg-card-blue/60 dark:bg-card-blue/10',
      border: 'border-card-blue-border/50 dark:border-card-blue-border/20',
      text: 'text-card-blue-text dark:text-blue-300',
    },
    {
      bg: 'bg-card-green/60 dark:bg-card-green/10',
      border: 'border-card-green-border/50 dark:border-card-green-border/20',
      text: 'text-card-green-text dark:text-green-300',
    },
    {
      bg: 'bg-card-amber/60 dark:bg-card-amber/10',
      border: 'border-card-amber-border/50 dark:border-card-amber-border/20',
      text: 'text-card-amber-text dark:text-amber-300',
    },
    {
      bg: 'bg-card-rose/60 dark:bg-card-rose/10',
      border: 'border-card-rose-border/50 dark:border-card-rose-border/20',
      text: 'text-card-rose-text dark:text-rose-300',
    },
    {
      bg: 'bg-card-purple/60 dark:bg-card-purple/10',
      border: 'border-card-purple-border/50 dark:border-card-purple-border/20',
      text: 'text-card-purple-text dark:text-purple-300',
    },
  ];
  return themes[index % themes.length];
};

export const TrailPage: React.FC = () => {
  const { completedLessons } = useProgressStore();
  const { user, avatarId } = useAuthStore();
  const { streakDays, streakRecord } = useGamificationStore();
  const navigation = useAppNavigation();
  const wod = useWordOfTheDay();
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [wodSheetOpen, setWodSheetOpen] = useState(false);
  const [srsCount, setSrsCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const results: Module[][] = [];
      for (let cycle = 1; cycle <= 8; cycle++) {
        const modules = await dbQueries.getModulesByCycle(cycle);
        results.push(modules);
      }
      const allModules = results.flat();
      if (allModules.length > 0) {
        setModules(allModules);
      } else {
        throw new Error('Database returned empty modules');
      }
      const count = await dbQueries.getSRSCardCount();
      setSrsCount(count);
    } catch (error) {
      console.warn('[TrailPage] SQLite loading failed, using content fallback modules:', error);
      setModules(CONTENT_MODULES.map(trailModuleFromContent));
      try {
        const count = await dbQueries.getSRSCardCount();
        setSrsCount(count);
      } catch {}
    }
  };

  const isCycleUnlocked = useCallback((cycleId: number): boolean => {
    if (cycleId <= 1) return true;
    const prevCycleId = cycleId - 1;
    const completedKeys = Object.keys(completedLessons);
    return completedKeys.some(id => id.startsWith(`C${prevCycleId}-`));
  }, [completedLessons]);

  const getModuleStatus = useCallback((moduleId: string): NodeStatus => {
    const completedKeys = Object.keys(completedLessons);
    if (completedKeys.includes(moduleId)) return 'complete';

    const module = modules.find(m => m.id === moduleId);
    if (!module) return 'locked';

    // First module of cycle 1 is always available
    if (module.cycle_id === 1 && module.module_order <= 1) return 'available';

    // Find the previous module across cycles
    let prevModuleId: string;
    if (module.module_order === 1) {
      // First module of a new cycle — previous is the last module of the previous cycle
      const prevCycleModules = modules.filter(m => m.cycle_id === module.cycle_id - 1);
      const lastPrev = prevCycleModules.sort((a, b) => b.module_order - a.module_order)[0];
      prevModuleId = lastPrev?.id ?? '';
    } else {
      prevModuleId = `C${module.cycle_id}-M${String(module.module_order - 1).padStart(2, '0')}`;
    }

    if (prevModuleId && completedKeys.includes(prevModuleId)) return 'available';
    return 'locked';
  }, [completedLessons, modules]);

  const completedCount = Object.keys(completedLessons).length;
  const cycle1 = modules.filter(m => m.cycle_id === 1);
  const cycle2 = modules.filter(m => m.cycle_id === 2);
  const cycle3 = modules.filter(m => m.cycle_id === 3);
  const cycle4 = modules.filter(m => m.cycle_id === 4);
  const cycle5 = modules.filter(m => m.cycle_id === 5);
  const cycle6 = modules.filter(m => m.cycle_id === 6);
  const cycle7 = modules.filter(m => m.cycle_id === 7);
  const cycle8 = modules.filter(m => m.cycle_id === 8);

  const renderUnitGrid = (units: UnitGroup[], cycleModules: Module[]) => {
    if (cycleModules.length === 0) {
      return (
        <div className="w-full text-center py-8">
          <p className="text-text-secondary text-sm">Carregando módulos...</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-6">
        {units.map((unit, index) => {
          const unitModules = unit.moduleIds
            .map(id => cycleModules.find(m => m.id === id))
            .filter(Boolean) as Module[];
          if (unitModules.length === 0) return null;

          const theme = getUnitCardTheme(index);

          return (
            <div
              key={unit.id}
              className={clsx(
                'border rounded-3xl p-5 shadow-sm animate-fadeIn transition-all duration-200',
                theme.bg,
                theme.border,
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-4">
                <h3 className={clsx('font-black text-sm tracking-tight', theme.text)}>
                  {unit.title}
                </h3>
                <p className="text-text-secondary dark:text-zinc-400 text-xs mt-1 leading-relaxed">
                  {unit.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
                {unitModules.map(mod => (
                  <UnitNode
                    key={mod.id}
                    module={mod}
                    status={getModuleStatus(mod.id)}
                    onPress={() => getModuleStatus(mod.id) !== 'locked' && setSelectedModule(mod)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBanner = (title: string, subtitle: string) => (
    <div className="bg-gradient-to-r from-secondary/15 to-transparent rounded-2xl p-5 border-l-4 border-secondary select-none">
      <p className="font-black text-lg text-text-primary dark:text-white">{title}</p>
      <p className="text-text-secondary dark:text-zinc-400 text-xs mt-1 leading-relaxed">{subtitle}</p>
    </div>
  );

  return (
    <SafeArea scrollable>
      {/* ── CABEÇALHO TRANSPARENTE ─────────────────────────── */}
      <div className="flex-shrink-0 bg-transparent px-4 pt-6 pb-2 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AvatarDisplay avatarId={avatarId} displayName={user?.displayName} size="sm" />
            <div>
              <p className="text-text-secondary dark:text-zinc-400 text-xs font-semibold">
                Olá, {user?.displayName?.split(' ')[0] ?? 'Aluno'} 👋
              </p>
              <h1 className="text-text-primary dark:text-white font-extrabold text-xl tracking-tight mt-0.5">
                Sua trilha de grego
              </h1>
            </div>
          </div>
          <StreakBadge streak={streakDays} record={streakRecord} />
        </div>
      </div>

      {/* ── BANNER "CONTINUAR LEITURA" ─────────────────────────── */}
      {(() => {
        const saved = getSavedReaderPosition();
        if (!saved) return null;
        return (
          <div className="mx-4 mt-3 mb-4 bg-secondary/10 dark:bg-secondary/5 border border-secondary/20 dark:border-secondary/10 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center shrink-0">
                <span className="text-lg">📖</span>
              </div>
              <div>
                <p className="text-text-primary dark:text-white font-bold text-sm">
                  Continuar leitura
                </p>
                <p className="text-text-secondary text-xs font-medium mt-0.5">
                  {getBookName(saved.book)} {saved.chapter}:{saved.verse ?? 1}
                </p>
              </div>
            </div>
            <Button
              radius="full"
              className="bg-secondary text-white dark:text-[#18181B] font-black text-sm w-12 h-12 min-h-[48px] p-0 flex items-center justify-center shrink-0 shadow-[0_4px_0_rgba(0,0,0,0.2)] dark:shadow-[0_4px_0_rgba(0,0,0,0.4)] active:!shadow-[0_0px_0_rgba(0,0,0,0)] active:!translate-y-1 active:!scale-100 transition-all duration-150"
              onPress={() => navigation.goToReader(saved.book, saved.chapter, saved.verse ?? 1)}
            >
              Ir
            </Button>
          </div>
        );
      })()}

      {/* ── ÁREA ROLÁVEL ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col items-stretch gap-6 pb-28">

        {wod.word && (
          <PalavraDoDiaCard
            word={wod.word}
            isVisualized={wod.isVisualized}
            onPress={() => setWodSheetOpen(true)}
          />
        )}

        {/* Calendário Semanal de Ofensiva */}
        <WeeklyCalendar />

        {/* Progresso Geral (Card Fluido) */}
        <div className="bg-surface/50 dark:bg-surface-alt/25 border border-border/20 dark:border-border/10 rounded-3xl p-4 shadow-sm transition-all duration-200 shrink-0">
          <div className="flex justify-between items-center mb-2">
            <p className="text-text-primary dark:text-white text-[10px] font-black uppercase tracking-wide">Progresso Geral</p>
            <p className="text-secondary dark:text-secondary-light text-sm font-black">
              {completedCount}/{modules.length} módulos
            </p>
          </div>
          <ProgressBar
            value={modules.length > 0 ? (completedCount / modules.length) * 100 : 0}
            color="bg-secondary"
            height={6}
          />
        </div>

        {/* Card Revisão SRS (inline — Duolingo-style) */}
        <div className={clsx(
          'w-full bg-surface border rounded-3xl p-5 shadow-sm flex items-center gap-4 transition-all duration-300 shrink-0',
          srsCount > 0
            ? 'border-secondary/40 dark:border-secondary/30 animate-pulse-slow'
            : 'border-border/40 dark:border-border/10',
        )}>
          <div className={clsx(
            'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
            srsCount > 0 ? 'bg-secondary/20' : 'bg-primary/10',
          )}>
            <span className={clsx(
              'text-xl font-black',
              srsCount > 0 ? 'text-secondary' : 'text-primary',
            )}>{Math.min(srsCount, 99)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-text-primary dark:text-white font-bold text-sm">
              {srsCount > 0 ? 'Revisão Disponível' : 'Revisão'}
            </h3>
            <p className="text-text-secondary dark:text-zinc-400 text-xs mt-0.5">
              {srsCount > 0
                ? `${srsCount} cartão${srsCount !== 1 ? 'es' : ''} pendente${srsCount !== 1 ? 's' : ''} — pratique agora!`
                : 'Nenhuma revisão pendente'}
            </p>
          </div>
          {srsCount > 0 && (
            <Button
              size="sm"
              radius="full"
              className="bg-secondary text-white dark:text-[#18181B] font-bold text-xs shadow-sm cursor-pointer transition-all active:scale-95 px-4 shrink-0"
              onPress={() => navigation.goToReview()}
            >
              Revisar
            </Button>
          )}
        </div>

        {/* ── CICLO I ──────────────────────────────────────── */}
        <div className="w-full">
          {renderBanner('Ciclo I: Alfabeto e Fonética', 'A base do Grego Koine: aprenda as vogais, consoantes e a fonética das escrituras sagradas.')}
          <div className="mt-5">
            {renderUnitGrid(CYCLE_1_UNITS, cycle1)}
          </div>
        </div>

        {/* ── CICLO II ──────────────────────────────────────── */}
        <div className="w-full">
          {renderBanner('Ciclo II: Verbos Presente', 'Conjugue o verbo εἰμί, domine os pronomes e forme as primeiras frases completas em grego.')}
          <div className="mt-5">
            {isCycleUnlocked(2) ? (
              renderUnitGrid(CYCLE_2_UNITS, cycle2)
            ) : (
              <LockedCycleCard cycleId={2} requiredCycleId={1} />
            )}
          </div>
        </div>

        {/* ── CICLO III ──────────────────────────────────────── */}
        <div className="w-full">
          {renderBanner('Ciclo III: Substantivos e Artigos', 'Declinações funcionais: acusativo, genitivo, dativo e a base da sintaxe grega.')}
          <div className="mt-5">
            {isCycleUnlocked(3) ? (
              renderUnitGrid(CYCLE_3_UNITS, cycle3)
            ) : (
              <LockedCycleCard cycleId={3} requiredCycleId={2} />
            )}
          </div>
        </div>

        {/* ── CICLO IV ──────────────────────────────────────── */}
        <div className="w-full">
          {renderBanner('Ciclo IV: Verbos — Presente e Movimento', 'Conjugação completa do presente ativo, verbos de movimento e contratos.')}
          <div className="mt-5">
            {isCycleUnlocked(4) ? (
              renderUnitGrid(CYCLE_4_UNITS, cycle4)
            ) : (
              <LockedCycleCard cycleId={4} requiredCycleId={3} />
            )}
          </div>
        </div>

        {/* ── CICLO V ──────────────────────────────────────── */}
        <div className="w-full">
          {renderBanner('Ciclo V: Adjetivos e Pronomes', 'Concordância, atributivo/predicativo, demonstrativos e relativos.')}
          <div className="mt-5">
            {isCycleUnlocked(5) ? (
              renderUnitGrid(CYCLE_5_UNITS, cycle5)
            ) : (
              <LockedCycleCard cycleId={5} requiredCycleId={4} />
            )}
          </div>
        </div>

        {/* ── CICLO VI ──────────────────────────────────────── */}
        <div className="w-full">
          {renderBanner('Ciclo VI: Verbos Aoristo e Futuro', 'Aspecto perfectivo, tema sigmático, futuro ativo e passivo.')}
          <div className="mt-5">
            {isCycleUnlocked(6) ? (
              renderUnitGrid(CYCLE_6_UNITS, cycle6)
            ) : (
              <LockedCycleCard cycleId={6} requiredCycleId={5} />
            )}
          </div>
        </div>

        {/* ── CICLO VII ──────────────────────────────────────── */}
        <div className="w-full">
          {renderBanner('Ciclo VII: Partículas e Preposições', 'Preposições com casos e conectivos de transição do NT.')}
          <div className="mt-5">
            {isCycleUnlocked(7) ? (
              renderUnitGrid(CYCLE_7_UNITS, cycle7)
            ) : (
              <LockedCycleCard cycleId={7} requiredCycleId={6} />
            )}
          </div>
        </div>

        {/* ── CICLO VIII ──────────────────────────────────────── */}
        <div className="w-full">
          {renderBanner('Ciclo VIII: Leitura Livre do NT', 'Prólogo de João, 1 João, Romanos — leitura independente.')}
          <div className="mt-5">
            {isCycleUnlocked(8) ? (
              renderUnitGrid(CYCLE_8_UNITS, cycle8)
            ) : (
              <LockedCycleCard cycleId={8} requiredCycleId={7} />
            )}
          </div>
        </div>


      </div>

      <UnitDetailSheet
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onStart={(moduleId) => {
          setSelectedModule(null);
          const mod = modules.find(m => m.id === moduleId);
          if (mod && mod.total_exercises === 0) {
            navigation.goToIntro(moduleId);
          } else {
            navigation.goToLesson(moduleId);
          }
        }}
      />

      {wod.word && (
        <PalavraDoDiaSheet
          word={wod.word}
          isOpen={wodSheetOpen}
          isSaved={wod.isSaved}
          onClose={() => setWodSheetOpen(false)}
          onMarkVisualized={wod.markVisualized}
          onToggleSaved={wod.toggleSaved}
        />
      )}

      <BottomNav srsCount={srsCount} />
    </SafeArea>
  );
};
