import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IonIcon } from '@/ui/components/IonIcon';
import { arrowBack, chevronForward, chevronUp, chevronDown } from 'ionicons/icons';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { VOCAB_BLOCKS, getModulesByBlock, getUnitsByModule } from '@/content/vocabulary/vocab-data';
import { useProgressStore } from '@/features/progress/progressStore';
import type { VocabModule } from '@/content/vocabulary/vocab-data';

const BLOCK_FRIENDLY: Record<string, string> = {
  V1: 'Bloco 1',
  V2: 'Bloco 2',
  V3: 'Bloco 3',
  V4: 'Bloco 4',
};

const BLOCK_THEMES: Record<string, {
  bg: string; border: string; text: string;
  bullet: string; badgeBg: string; badgeText: string;
}> = {
  V1: {
    bg: 'bg-card-blue/60 dark:bg-card-blue/10',
    border: 'border-card-blue-border/50 dark:border-card-blue-border/20',
    text: 'text-card-blue-text',
    bullet: 'bg-card-blue',
    badgeBg: 'bg-card-blue/15 dark:bg-card-blue/10',
    badgeText: 'text-card-blue-text',
  },
  V2: {
    bg: 'bg-card-green/60 dark:bg-card-green/10',
    border: 'border-card-green-border/50 dark:border-card-green-border/20',
    text: 'text-card-green-text',
    bullet: 'bg-card-green',
    badgeBg: 'bg-card-green/15 dark:bg-card-green/10',
    badgeText: 'text-card-green-text',
  },
  V3: {
    bg: 'bg-card-purple/60 dark:bg-card-purple/10',
    border: 'border-card-purple-border/50 dark:border-card-purple-border/20',
    text: 'text-card-purple-text',
    bullet: 'bg-card-purple',
    badgeBg: 'bg-card-purple/15 dark:bg-card-purple/10',
    badgeText: 'text-card-purple-text',
  },
  V4: {
    bg: 'bg-card-amber/60 dark:bg-card-amber/10',
    border: 'border-card-amber-border/50 dark:border-card-amber-border/20',
    text: 'text-card-amber-text',
    bullet: 'bg-card-amber',
    badgeBg: 'bg-card-amber/15 dark:bg-card-amber/10',
    badgeText: 'text-card-amber-text',
  },
};

const ModulePill: React.FC<{
  module: VocabModule;
  blockId: string;
  completedCount: number;
  totalCount: number;
  onPress: () => void;
}> = ({ module, blockId, completedCount, totalCount, onPress }) => {
  const theme = BLOCK_THEMES[blockId];
  const allDone = completedCount === totalCount && totalCount > 0;
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onPress}
      className="w-full flex items-center gap-3 bg-surface/80 dark:bg-surface-alt/40 border border-border/30 dark:border-border/15 rounded-full px-4 py-3 shadow-sm active:shadow-md transition-all text-left"
    >
      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${theme.bullet}`} />

      <div className="flex-1 min-w-0">
        <p className="text-text-primary dark:text-white font-bold text-sm truncate leading-tight">
          {module.title}
        </p>
        <p className="text-text-secondary dark:text-zinc-400 text-[10px] mt-0.5 truncate">
          Módulo {module.order} · {completedCount}/{totalCount} unidades
        </p>
      </div>

      <div className={`flex items-center gap-1.5 shrink-0 ${theme.badgeBg} px-2.5 py-1 rounded-full`}>
        {allDone ? (
          <span className={`text-[10px] font-black ${theme.badgeText}`}>✓</span>
        ) : (
          <span className={`text-[10px] font-black ${theme.badgeText}`}>
            {module.xp} XP
          </span>
        )}
      </div>

      <IonIcon icon={chevronForward} className="text-text-disabled dark:text-zinc-600 text-base shrink-0" />
    </motion.button>
  );
};

export const VocabTrailPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedBlock, setExpandedBlock] = useState<string | null>('V1');
  const { completedVocabUnits } = useProgressStore();

  const toggleBlock = (blockId: string) => {
    setExpandedBlock((prev) => (prev === blockId ? null : blockId));
  };

  const handleModulePress = (moduleId: string) => {
    navigate(`/vocab/${moduleId}`);
  };

  const getModuleProgress = (moduleId: string) => {
    const units = getUnitsByModule(moduleId);
    const done = units.filter(u => completedVocabUnits.includes(u.id)).length;
    return { completedCount: done, totalCount: units.length };
  };

  const completedUnitsCount = completedVocabUnits.length;

  return (
    <SafeArea scrollable withBottomNav={false} className="select-none">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-surface dark:bg-surface-alt border border-border/40 dark:border-border/15 flex items-center justify-center shadow-sm active:scale-95 transition-all"
        >
          <IonIcon icon={arrowBack} className="text-text-primary dark:text-white text-xl" />
        </button>
        <div className="flex-1">
          <h1 className="text-text-primary dark:text-white font-extrabold text-xl tracking-tight">
            Vocabulário do NT
          </h1>
          <p className="text-text-secondary dark:text-zinc-400 text-xs">
            100 palavras essenciais do Novo Testamento
          </p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-2 pb-28">
        {/* Trophy verse banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-secondary/15 to-transparent rounded-3xl p-5 border-l-4 border-secondary mb-6"
        >
          <p className="greek-text text-text-primary dark:text-white text-sm leading-relaxed mb-1">
            οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον...
          </p>
          <p className="text-text-secondary dark:text-zinc-400 text-xs">
            João 3:16 · Versículo de abertura da Trilha de Vocabulário
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-surface/80 dark:bg-surface-alt/30 border border-secondary/20 dark:border-secondary/10 rounded-3xl p-4 text-center shadow-sm">
            <p className="text-secondary dark:text-secondary-light text-lg font-black">11</p>
            <p className="text-text-secondary dark:text-zinc-400 text-[10px] font-bold uppercase">Módulos</p>
          </div>
          <div className="bg-surface/80 dark:bg-surface-alt/30 border border-secondary/20 dark:border-secondary/10 rounded-3xl p-4 text-center shadow-sm">
            <p className="text-secondary dark:text-secondary-light text-lg font-black">100</p>
            <p className="text-text-secondary dark:text-zinc-400 text-[10px] font-bold uppercase">Palavras</p>
          </div>
          <div className="bg-surface/80 dark:bg-surface-alt/30 border border-secondary/20 dark:border-secondary/10 rounded-3xl p-4 text-center shadow-sm">
            <p className="text-secondary dark:text-secondary-light text-lg font-black">{completedUnitsCount}</p>
            <p className="text-text-secondary dark:text-zinc-400 text-[10px] font-bold uppercase">Lidas</p>
          </div>
        </div>

        {/* Blocks */}
        <div className="flex flex-col gap-4">
          {VOCAB_BLOCKS.map((block, idx) => {
            const theme = BLOCK_THEMES[block.id];
            const modules = getModulesByBlock(block.id);
            const isExpanded = expandedBlock === block.id;

            return (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
              >
                <button
                  onClick={() => toggleBlock(block.id)}
                  className={`w-full text-left border rounded-3xl p-5 shadow-sm transition-all duration-200 active:scale-[0.98] ${theme.bg} ${theme.border}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-[10px] font-extrabold uppercase tracking-wider ${theme.text}`}>
                      {BLOCK_FRIENDLY[block.id]}
                    </p>
                    <IonIcon
                      icon={isExpanded ? chevronUp : chevronDown}
                      className="text-text-secondary dark:text-zinc-400 text-lg"
                    />
                  </div>
                  <h3 className="text-text-primary dark:text-white font-black text-base leading-tight mb-1">
                    {block.title}
                  </h3>
                  <p className="text-text-secondary dark:text-zinc-400 text-xs leading-relaxed">
                    {block.description}
                  </p>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 ml-2 flex flex-col gap-2.5"
                  >
                    {modules.map((mod) => {
                      const { completedCount, totalCount } = getModuleProgress(mod.id);
                      return (
                        <ModulePill
                          key={mod.id}
                          module={mod}
                          blockId={block.id}
                          completedCount={completedCount}
                          totalCount={totalCount}
                          onPress={() => handleModulePress(mod.id)}
                        />
                      );
                    })}

                    <div className="bg-secondary/10 dark:bg-secondary/5 rounded-3xl p-5 mt-1">
                      <p className="text-text-secondary dark:text-zinc-400 text-xs leading-relaxed">
                        <span className="font-bold text-text-primary dark:text-zinc-300">Meta: </span>
                        {block.metaGoal}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SafeArea>
  );
};
