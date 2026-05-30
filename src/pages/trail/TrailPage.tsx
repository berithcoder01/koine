// src/pages/trail/TrailPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { SafeArea } from '@/components/layout/SafeArea';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StreakBadge } from '@/components/ui/StreakBadge';
import { useProgressStore } from '@/store/progressStore';
import { useAuthStore } from '@/store/authStore';
import { dbQueries } from '@/services/database/queries';
import { UnitNode } from './components/UnitNode';
import { UnitDetailSheet } from './components/UnitDetailSheet';
import { useAppNavigation } from '@/hooks/useNavigation';

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
  const navigation = useAppNavigation();
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [srsCount, setSrsCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const c1 = await dbQueries.getModulesByCycle(1);
    const c2 = await dbQueries.getModulesByCycle(2);
    setModules([...c1, ...c2]);
    const count = await dbQueries.getSRSCardCount();
    setSrsCount(count);
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
    <SafeArea>
      <div className="bg-primary px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/60 text-xs">Olá, {user?.displayName?.split(' ')[0] ?? 'Aluno'}</p>
            <p className="text-white font-bold text-lg">Sua trilha de grego</p>
          </div>
          <StreakBadge streak={0} />
        </div>
        <div className="bg-white/10 rounded-2xl p-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-white text-sm font-medium">Progresso</p>
            <p className="text-secondary text-sm font-bold">{completedCount}/{modules.length} módulos</p>
          </div>
          <ProgressBar
            value={modules.length > 0 ? (completedCount / modules.length) * 100 : 0}
            color="bg-secondary"
            height={6}
          />
        </div>
      </div>

      <div className="px-4 py-6 flex flex-col items-center gap-4 overflow-y-auto pb-24">
        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border" />
            <p className="text-xs font-bold text-textSecondary uppercase tracking-wider">
              Ciclo I — Alfabeto e Fonética
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>
          {cycle1.map((module, index) => {
            const status = getModuleStatus(module.id);
            const isEven = index % 2 === 0;
            return (
              <div key={module.id} className={`flex ${isEven ? 'justify-start' : 'justify-end'} mb-3`}>
                <UnitNode
                  module={module}
                  status={status}
                  onPress={() => status !== 'locked' && setSelectedModule(module)}
                />
              </div>
            );
          })}
        </div>

        <div className="w-full flex items-center gap-2 py-2">
          <div className="h-px flex-1 bg-border" />
          <p className="text-xs font-bold text-textSecondary uppercase tracking-wider">
            Ciclo II — Verbos Presente
          </p>
          <div className="h-px flex-1 bg-border" />
        </div>

        {cycle2.map((module, index) => {
          const status = getModuleStatus(module.id);
          const isEven = index % 2 === 0;
          return (
            <div key={module.id} className={`flex ${isEven ? 'justify-start' : 'justify-end'} mb-3`}>
              <UnitNode
                module={module}
                status={status}
                onPress={() => status !== 'locked' && setSelectedModule(module)}
              />
            </div>
          );
        })}

        <div className="w-full bg-primary/5 border border-primary/20 rounded-2xl p-4 mt-4 text-center">
          <p className="text-primary font-bold mb-1">🔒 Ciclo III — Substantivos e Artigos</p>
          <p className="text-textSecondary text-sm">Complete o Ciclo II para continuar</p>
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
