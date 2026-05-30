// src/pages/trail/TrailPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { SafeArea } from '@/components/layout/SafeArea';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StreakBadge } from '@/components/ui/StreakBadge';
import { useProgressStore } from '@/store/progressStore';
import { useAuthStore } from '@/store/authStore';
import { useGamificationStore } from '@/store/gamificationStore';
import { dbQueries } from '@/services/database/queries';
import { UnitNode } from './components/UnitNode';
import { UnitDetailSheet } from './components/UnitDetailSheet';
import { WeeklyCalendar } from './components/WeeklyCalendar';
import { useAppNavigation } from '@/hooks/useNavigation';
import { Button } from '@/components/ui';

type NodeStatus = 'locked' | 'available' | 'in_progress' | 'complete';

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

export const TrailPage: React.FC = () => {
  const { completedLessons } = useProgressStore();
  const { user } = useAuthStore();
  const { streakDays } = useGamificationStore();
  const navigation = useAppNavigation();
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [srsCount, setSrsCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const c1 = await dbQueries.getModulesByCycle(1);
      const c2 = await dbQueries.getModulesByCycle(2);
      if (c1.length > 0 || c2.length > 0) {
        setModules([...c1, ...c2]);
      } else {
        throw new Error('Database returned empty modules');
      }
      const count = await dbQueries.getSRSCardCount();
      setSrsCount(count);
    } catch (error) {
      console.warn('[TrailPage] SQLite loading failed, using robust fallback modules:', error);
      const fallbackModules: Module[] = [
        { id: 'C1-M01', cycle_id: 1, module_order: 1, title: 'Vogais Base: Α, Ε, Ι', anchor_verse: 'ἠγάπησεν', anchor_reference: 'João 3:16', method_primary: 'Flashcard + Canvas 2D + Áudio', xp_total: 60, total_exercises: 10 },
        { id: 'C1-M02', cycle_id: 1, module_order: 2, title: 'Vogais: Ο, Υ, Ω', anchor_verse: 'χωρὶς αὐτοῦ', anchor_reference: 'João 1:3', method_primary: 'Flashcard + Canvas 2D + Distinção de sons', xp_total: 60, total_exercises: 10 },
        { id: 'C1-M03', cycle_id: 1, module_order: 3, title: 'Consoantes Η, Ν, Τ', anchor_verse: 'Ἐν ἀρχῇ ἦν', anchor_reference: 'João 1:1', method_primary: 'Flashcard + Canvas 2D + Sílabas', xp_total: 65, total_exercises: 10 },
        { id: 'C1-M04', cycle_id: 1, module_order: 4, title: 'Consoantes Σ, Κ, Λ', anchor_verse: 'Καὶ ὁ λόγος σὰρξ ἐγένετο', anchor_reference: 'João 1:14', method_primary: 'Flashcard + Canvas 2D + TPR Digital', xp_total: 65, total_exercises: 10 },
        { id: 'C1-M05', cycle_id: 1, module_order: 5, title: 'Consoantes Π, Ρ, Μ', anchor_verse: 'ἐν τῷ λόγῳ τῷ ἐμῷ', anchor_reference: 'João 8:31', method_primary: 'Canvas 2D + Ordenar Sílabas + Áudio', xp_total: 65, total_exercises: 10 },
        { id: 'C1-M06', cycle_id: 1, module_order: 6, title: 'Oclusivas Β, Δ, Γ', anchor_verse: 'κληρονομήσουσιν τὴν γῆν', anchor_reference: 'Mateus 5:5', method_primary: 'Canvas 2D + Múltipla Escolha + TPR', xp_total: 65, total_exercises: 10 },
        { id: 'C1-M07', cycle_id: 1, module_order: 7, title: 'Aspiradas Φ, Χ, Θ', anchor_verse: 'τὸ φῶς τῶν ἀνθρώπων', anchor_reference: 'João 1:4', method_primary: 'Canvas 2D + Flashcard fonético', xp_total: 70, total_exercises: 10 },
        { id: 'C1-M08', cycle_id: 1, module_order: 8, title: 'Letras Raras Ζ, Ξ, Ψ', anchor_verse: 'ἵνα ζωὴν ἔχωσιν', anchor_reference: 'João 10:10', method_primary: 'Canvas 2D + Múltipla Escolha + Narração', xp_total: 70, total_exercises: 10 },
        { id: 'C1-M09', cycle_id: 1, module_order: 9, title: 'Diacríticos e Vogais Longas', anchor_verse: 'Αὐτὸς γάρ ἐστιν ἡ εἰρήνη', anchor_reference: 'Efésios 2:14', method_primary: 'Flashcard + Áudio comparativo', xp_total: 70, total_exercises: 10 },
        { id: 'C1-M10', cycle_id: 1, module_order: 10, title: 'Revisão Total + João 1:1', anchor_verse: 'Ἐν ἀρχῇ ἦν ὁ λόγος', anchor_reference: 'João 1:1', method_primary: 'Quiz + Narração completa', xp_total: 100, total_exercises: 11 },
        { id: 'C2-M01', cycle_id: 2, module_order: 1, title: 'εἰμί Singular: Eu sou, Tu és, Ele é', anchor_verse: 'ἐγώ εἰμι ἡ ἀνάστασις', anchor_reference: 'João 11:25', method_primary: 'Flashcard + MC + TPR', xp_total: 60, total_exercises: 10 },
        { id: 'C2-M02', cycle_id: 2, module_order: 2, title: 'εἰμί Plural: Nós somos, Vós sois, Eles são', anchor_verse: 'ὑμεῖς ἐστε τὸ φῶς', anchor_reference: 'Mateus 5:14', method_primary: 'Ordenar + Narração', xp_total: 60, total_exercises: 10 },
        { id: 'C2-M03', cycle_id: 2, module_order: 3, title: 'Pronomes Pessoais Sujeito', anchor_verse: 'ἐγώ εἰμι ὁ ποιμὴν ὁ καλός', anchor_reference: 'João 10:11', method_primary: 'TPR Digital + Flashcard', xp_total: 65, total_exercises: 10 },
        { id: 'C2-M04', cycle_id: 2, module_order: 4, title: 'Artigo Definido (Nominativo)', anchor_verse: 'καὶ ὁ λόγος ἦν πρὸς τὸν θεόν', anchor_reference: 'João 1:1', method_primary: 'Ordenar + Preencher Lacuna', xp_total: 65, total_exercises: 10 },
        { id: 'C2-M05', cycle_id: 2, module_order: 5, title: 'Substantivos Nominativo — 2ª Declinação', anchor_verse: 'τὸν υἱὸν τὸν μονογενῆ', anchor_reference: 'João 3:16', method_primary: 'Flashcard + Canvas', xp_total: 70, total_exercises: 10 },
        { id: 'C2-M06', cycle_id: 2, module_order: 6, title: 'Predicado Nominal', anchor_verse: 'ὁ θεὸς ἀγάπη ἐστίν', anchor_reference: '1 João 4:8', method_primary: 'Narração + TBLT', xp_total: 70, total_exercises: 10 },
        { id: 'C2-M07', cycle_id: 2, module_order: 7, title: 'Verbos: λέγω, ἔχω, πιστεύω', anchor_verse: 'ὁ πιστεύων εἰς τὸν υἱόν', anchor_reference: 'João 3:36', method_primary: 'Flashcard + Ordenar', xp_total: 70, total_exercises: 10 },
        { id: 'C2-M08', cycle_id: 2, module_order: 8, title: 'Revisão + 1 João 4:8 (Troféu)', anchor_verse: 'ὁ θεὸς ἀγάπη ἐστίν', anchor_reference: '1 João 4:8', method_primary: 'Quiz + Narração completa', xp_total: 100, total_exercises: 11 },
      ];
      setModules(fallbackModules);
      try {
        const count = await dbQueries.getSRSCardCount();
        setSrsCount(count);
      } catch {}
    }
  };

  const getModuleStatus = useCallback((moduleId: string): NodeStatus => {
    const completedKeys = Object.keys(completedLessons);
    if (completedKeys.includes(moduleId)) return 'complete';

    const module = modules.find(m => m.id === moduleId);
    if (!module) return 'locked';

    if (module.cycle_id === 1 && module.module_order === 1) return 'available';

    let prevModuleId: string;
    if (module.cycle_id === 1) {
      prevModuleId = `C1-M${String(module.module_order - 1).padStart(2, '0')}`;
    } else if (module.module_order === 1) {
      prevModuleId = 'C1-M10';
    } else {
      prevModuleId = `C2-M${String(module.module_order - 1).padStart(2, '0')}`;
    }

    if (completedKeys.includes(prevModuleId)) return 'available';
    return 'locked';
  }, [completedLessons, modules]);

  const completedCount = Object.keys(completedLessons).length;
  const cycle1 = modules.filter(m => m.cycle_id === 1);
  const cycle2 = modules.filter(m => m.cycle_id === 2);

  return (
    <SafeArea scrollable>
      {/* ── CABEÇALHO FIXO ─────────────────────────────────── */}
      <div className="flex-shrink-0 bg-surface-alt dark:bg-background px-4 pt-6 pb-5 transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-text-secondary dark:text-zinc-400 text-xs font-semibold">
              Olá, {user?.displayName?.split(' ')[0] ?? 'Aluno'}
            </p>
            <h1 className="text-text-primary dark:text-white font-extrabold text-2xl tracking-tight mt-0.5">
              Sua trilha de grego
            </h1>
          </div>
          <StreakBadge streak={streakDays} />
        </div>

        <div className="bg-surface dark:bg-surface-alt/40 border border-border/40 dark:border-border/10 rounded-3xl p-4 shadow-sm transition-all duration-200">
          <div className="flex justify-between items-center mb-2">
            <p className="text-text-primary dark:text-white text-sm font-semibold">Progresso Geral</p>
            <p className="text-secondary dark:text-secondary-light text-sm font-bold">
              {completedCount}/{modules.length} módulos
            </p>
          </div>
          <ProgressBar
            value={modules.length > 0 ? (completedCount / modules.length) * 100 : 0}
            color="bg-secondary"
            height={6}
          />
        </div>
      </div>

      {/* ── ÁREA ROLÁVEL ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col items-stretch gap-6 pb-28">

        {/* Calendário Semanal de Ofensiva */}
        <WeeklyCalendar />

        {/* Card Desafio Diário */}
        <div className="w-full bg-card-purple dark:bg-card-purple/10 border border-card-purple-border dark:border-card-purple-border/25 rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col gap-3">
          <div className="absolute right-4 top-2 text-6xl opacity-10 select-none pointer-events-none">⚡</div>
          <div>
            <span className="bg-card-purple-text/10 text-card-purple-text text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Desafio do Dia
            </span>
            <h3 className="text-text-primary dark:text-white font-extrabold text-base mt-2">
              Sessão de Foco
            </h3>
            <p className="text-text-secondary dark:text-zinc-400 text-xs mt-1">
              Estude um módulo hoje para manter sua ofensiva e ganhar bônus de XP!
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-card-purple-text dark:text-purple-300 font-extrabold text-xs">
              🎁 +20 XP de Bônus
            </span>
            <Button
              size="sm"
              radius="full"
              className="bg-card-purple-text text-white font-bold text-xs shadow-md shadow-purple-600/10 cursor-pointer"
              onPress={() => {
                const firstAvailable = modules.find(m => getModuleStatus(m.id) === 'available');
                if (firstAvailable) setSelectedModule(firstAvailable);
              }}
            >
              Começar
            </Button>
          </div>
        </div>

        {/* ── CICLO 1 ──────────────────────────────────────── */}
        <div className="w-full">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-border/60 dark:bg-border/10" />
            <p className="text-[10px] font-extrabold text-text-secondary dark:text-zinc-400 uppercase tracking-widest">
              Ciclo I — Alfabeto e Fonética
            </p>
            <div className="h-px flex-1 bg-border/60 dark:bg-border/10" />
          </div>

          {cycle1.length === 0 ? (
            <div className="w-full text-center py-8">
              <p className="text-text-secondary text-sm">Carregando módulos...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cycle1.map((module, index) => {
                const status = getModuleStatus(module.id);
                const isEven = index % 2 === 0;
                return (
                  <div key={module.id} className={`flex ${isEven ? 'justify-start pl-8' : 'justify-end pr-8'} mb-3`}>
                    <UnitNode
                      module={module}
                      status={status}
                      onPress={() => status !== 'locked' && setSelectedModule(module)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── CICLO 2 ──────────────────────────────────────── */}
        <div className="w-full">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-border/60 dark:bg-border/10" />
            <p className="text-[10px] font-extrabold text-text-secondary dark:text-zinc-400 uppercase tracking-widest">
              Ciclo II — Verbos Presente
            </p>
            <div className="h-px flex-1 bg-border/60 dark:bg-border/10" />
          </div>

          {cycle2.length === 0 ? (
            <div className="w-full text-center py-6">
              <p className="text-text-secondary text-xs">Complete o Ciclo I para desbloquear</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cycle2.map((module, index) => {
                const status = getModuleStatus(module.id);
                const isEven = index % 2 === 0;
                return (
                  <div key={module.id} className={`flex ${isEven ? 'justify-start pl-8' : 'justify-end pr-8'} mb-3`}>
                    <UnitNode
                      module={module}
                      status={status}
                      onPress={() => status !== 'locked' && setSelectedModule(module)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── CICLO 3 (bloqueado) ───────────────────────────── */}
        <div className="w-full bg-surface dark:bg-surface-alt/50 border border-border/40 dark:border-border/10 rounded-3xl p-6 text-center shadow-sm">
          <p className="text-text-primary dark:text-white font-extrabold mb-1">🔒 Ciclo III — Substantivos e Artigos</p>
          <p className="text-text-secondary dark:text-zinc-400 text-xs">Complete o Ciclo II para continuar</p>
        </div>
      </div>

      <UnitDetailSheet
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onStart={(moduleId) => {
          setSelectedModule(null);
          navigation.goToLesson(moduleId);
        }}
      />

      <BottomNav srsCount={srsCount} />
    </SafeArea>
  );
};
