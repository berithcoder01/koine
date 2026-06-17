import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IonIcon } from '@/ui/components/IonIcon';
import { arrowBack, chevronForward, chevronUp, chevronDown } from 'ionicons/icons';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { HISTORY_BLOCKS } from '@/content/history/history-blocks';
import { getModulesByBlock } from '@/content/history/history-modules';
import type { HistoryModule } from '@/core/types/history.types';

const BLOCK_FRIENDLY: Record<string, string> = {
  H1: 'Parte 1',
  H2: 'Parte 2',
  H3: 'Parte 3',
  H4: 'Parte 4',
};

const BLOCK_THEMES: Record<string, {
  bg: string; border: string; text: string;
  bullet: string; badgeBg: string; badgeText: string;
}> = {
  H1: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/10',
    border: 'border-amber-500/30 dark:border-amber-500/20',
    text: 'text-amber-700 dark:text-amber-400',
    bullet: 'bg-amber-500',
    badgeBg: 'bg-amber-500/15 dark:bg-amber-500/10',
    badgeText: 'text-amber-700 dark:text-amber-400',
  },
  H2: {
    bg: 'bg-orange-500/10 dark:bg-orange-500/10',
    border: 'border-orange-500/30 dark:border-orange-500/20',
    text: 'text-orange-700 dark:text-orange-400',
    bullet: 'bg-orange-500',
    badgeBg: 'bg-orange-500/15 dark:bg-orange-500/10',
    badgeText: 'text-orange-700 dark:text-orange-400',
  },
  H3: {
    bg: 'bg-rose-500/10 dark:bg-rose-500/10',
    border: 'border-rose-500/30 dark:border-rose-500/20',
    text: 'text-rose-700 dark:text-rose-400',
    bullet: 'bg-rose-500',
    badgeBg: 'bg-rose-500/15 dark:bg-rose-500/10',
    badgeText: 'text-rose-700 dark:text-rose-400',
  },
  H4: {
    bg: 'bg-stone-500/10 dark:bg-stone-500/10',
    border: 'border-stone-500/30 dark:border-stone-500/20',
    text: 'text-stone-700 dark:text-stone-400',
    bullet: 'bg-stone-500',
    badgeBg: 'bg-stone-500/15 dark:bg-stone-500/10',
    badgeText: 'text-stone-700 dark:text-stone-400',
  },
};

const ModulePill: React.FC<{
  module: HistoryModule;
  blockId: string;
  onPress: () => void;
}> = ({ module, blockId, onPress }) => {
  const theme = BLOCK_THEMES[blockId];
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onPress}
      className="w-full flex items-center gap-3 bg-surface/80 dark:bg-surface-alt/40 border border-border/30 dark:border-border/15 rounded-full px-4 py-3 shadow-sm active:shadow-md transition-all text-left"
    >
      {/* Bullet colorido do bloco */}
      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${theme.bullet}`} />

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <p className="text-text-primary dark:text-white font-bold text-sm truncate leading-tight">
          {module.title}
        </p>
        <p className="text-text-secondary dark:text-zinc-400 text-[10px] mt-0.5 truncate">
          Módulo {module.order} · {module.period}
        </p>
      </div>

      {/* XP badge */}
      <div className={`flex items-center gap-1.5 shrink-0 ${theme.badgeBg} px-2.5 py-1 rounded-full`}>
        <span className={`text-[10px] font-black ${theme.badgeText}`}>
          {module.xp} XP
        </span>
      </div>

      {/* Chevron */}
      <IonIcon icon={chevronForward} className="text-text-disabled dark:text-zinc-600 text-base shrink-0" />
    </motion.button>
  );
};

export const HistoryTrailPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedBlock, setExpandedBlock] = useState<string | null>('H1');

  const toggleBlock = (blockId: string) => {
    setExpandedBlock((prev) => (prev === blockId ? null : blockId));
  };

  const handleModulePress = (moduleId: string) => {
    navigate(`/history/${moduleId}`);
  };

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
            História do NT
          </h1>
          <p className="text-text-secondary dark:text-zinc-400 text-xs">
            Contexto histórico, geográfico e cultural
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
            Ἐγένετο δὲ ἐν ταῖς ἡμέραις ἐκείναις...
          </p>
          <p className="text-text-secondary dark:text-zinc-400 text-xs">
            Lucas 2:1 · Versículo de abertura da Trilha
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-surface/80 dark:bg-surface-alt/30 border border-secondary/20 dark:border-secondary/10 rounded-3xl p-4 text-center shadow-sm">
            <p className="text-secondary dark:text-secondary-light text-lg font-black">15</p>
            <p className="text-text-secondary dark:text-zinc-400 text-[10px] font-bold uppercase">Módulos</p>
          </div>
          <div className="bg-surface/80 dark:bg-surface-alt/30 border border-secondary/20 dark:border-secondary/10 rounded-3xl p-4 text-center shadow-sm">
            <p className="text-secondary dark:text-secondary-light text-lg font-black">4</p>
            <p className="text-text-secondary dark:text-zinc-400 text-[10px] font-bold uppercase">Blocos</p>
          </div>
          <div className="bg-surface/80 dark:bg-surface-alt/30 border border-secondary/20 dark:border-secondary/10 rounded-3xl p-4 text-center shadow-sm">
            <p className="text-secondary dark:text-secondary-light text-lg font-black">930</p>
            <p className="text-text-secondary dark:text-zinc-400 text-[10px] font-bold uppercase">XP</p>
          </div>
        </div>

        {/* Blocks */}
        <div className="flex flex-col gap-4">
          {HISTORY_BLOCKS.map((block, idx) => {
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
                {/* Block header — card grande */}
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

                {/* Modules — pílulas horizontais */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 ml-2 flex flex-col gap-2.5"
                  >
                    {modules.map((mod) => (
                      <ModulePill
                        key={mod.id}
                        module={mod}
                        blockId={block.id}
                        onPress={() => handleModulePress(mod.id)}
                      />
                    ))}

                    {/* Block meta goal */}
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
