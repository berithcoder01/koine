import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IonIcon } from '@/ui/components/IonIcon';
import { arrowBack, chevronForward, book, checkmarkCircle, volumeHighOutline } from 'ionicons/icons';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { getModuleById, getUnitsByModule, VOCAB_BLOCKS } from '@/content/vocabulary/vocab-data';
import { BottomSheet } from '@/ui/components/BottomSheet';
import { useGamificationStore } from '@/features/gamification/gamificationStore';
import { useProgressStore } from '@/features/progress/progressStore';
import { useGamificationActions } from '@/features/gamification/useGamificationActions';
import { XP_VALUES } from '@/core/constants/config';
import { renderMarkdown } from '@/core/utils/markdown';
import { useTextToSpeech } from '@/features/tts/useTextToSpeech';
import type { VocabUnit } from '@/content/vocabulary/vocab-data';

const BLOCK_FRIENDLY: Record<string, string> = {
  V1: 'Bloco 1',
  V2: 'Bloco 2',
  V3: 'Bloco 3',
  V4: 'Bloco 4',
};

export const VocabModulePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const addXP = useGamificationStore(s => s.addXP);
  const { completedVocabUnits, markVocabUnitComplete } = useProgressStore();
  const { checkAchievements, recordStudyActivity } = useGamificationActions();
  const { speak } = useTextToSpeech();

  const module = moduleId ? getModuleById(moduleId) : undefined;
  const units = moduleId ? getUnitsByModule(moduleId) : [];
  const block = module ? VOCAB_BLOCKS.find((b) => b.id === module.blockId) : undefined;
  const [selectedUnit, setSelectedUnit] = useState<VocabUnit | null>(null);

  const isUnitRead = (unitId: string) => completedVocabUnits.includes(unitId);

  const handleMarkAsRead = async (unit: VocabUnit) => {
    if (isUnitRead(unit.id)) return;
    markVocabUnitComplete(unit.id);
    addXP(XP_VALUES.VOCAB_UNIT_READ);
    recordStudyActivity();
    await checkAchievements(XP_VALUES.VOCAB_UNIT_READ);
  };

  if (!module || !block) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
        <p className="text-text-secondary">Módulo não encontrado</p>
      </div>
    );
  }

  return (
    <SafeArea scrollable={true} withBottomNav={false} className="flex flex-col overflow-hidden select-none">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-surface dark:bg-surface-alt border border-border/40 dark:border-border/15 flex items-center justify-center shadow-sm active:scale-95 transition-all"
        >
          <IonIcon icon={arrowBack} className="text-text-primary dark:text-white text-xl" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-text-secondary dark:text-zinc-500 text-[10px] font-extrabold uppercase tracking-wider">
            {BLOCK_FRIENDLY[block.id]} · Módulo {module.order}
          </p>
          <h1 className="text-text-primary dark:text-white font-extrabold text-xl tracking-tight truncate">
            {module.title}
          </h1>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-2 pb-28">
        {/* Anchor word banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-secondary/15 to-transparent rounded-3xl p-5 border-l-4 border-secondary mb-5"
        >
          <p className="greek-text text-text-primary dark:text-white text-2xl font-bold mb-1">
            {module.anchorWord}
          </p>
          <p className="text-text-secondary dark:text-zinc-400 text-sm">
            {module.anchorMeaning}
          </p>
        </motion.div>

        {/* Description */}
        <div className="bg-surface/50 dark:bg-surface-alt/25 border border-border/20 dark:border-border/10 rounded-3xl p-5 mb-5">
          <p className="text-text-secondary dark:text-zinc-400 text-sm leading-relaxed">
            {module.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary dark:text-secondary-light text-xs font-bold">
              {module.xp} XP
            </span>
            <span className="text-text-disabled dark:text-zinc-600 text-xs">·</span>
            <span className="text-text-secondary dark:text-zinc-400 text-xs">
              {module.unitCount} unidades
            </span>
          </div>
        </div>

        {/* Units */}
        <h2 className="font-black text-base text-text-primary dark:text-white mb-3">
          Unidades
        </h2>
        <div className="flex flex-col gap-3">
          {units.map((unit, idx) => (
            <motion.button
              key={unit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.25 }}
              onClick={() => setSelectedUnit(unit)}
              className="w-full bg-surface/80 dark:bg-surface-alt/40 border border-border/30 dark:border-border/15 rounded-3xl p-5 shadow-sm text-left active:scale-[0.99] transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isUnitRead(unit.id)
                    ? 'bg-secondary/25 dark:bg-secondary/15'
                    : 'bg-secondary/15 dark:bg-secondary/10'
                }`}>
                  {isUnitRead(unit.id) ? (
                    <IonIcon icon={checkmarkCircle} className="text-secondary dark:text-secondary-light text-sm" />
                  ) : (
                    <span className="text-secondary dark:text-secondary-light text-xs font-black">
                      {unit.unitOrder}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-text-primary dark:text-white font-bold text-sm leading-snug mb-1">
                      {unit.title}
                    </h3>
                    <IonIcon
                      icon={chevronForward}
                      className="text-text-disabled dark:text-zinc-600 text-base shrink-0 mt-0.5"
                    />
                  </div>
                  <p className="text-text-secondary dark:text-zinc-400 text-[10px] font-semibold mb-1">
                    {unit.groupLabel}
                  </p>
                  {unit.words.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {unit.words.slice(0, 4).map((w, i) => (
                        <span
                          key={i}
                          className="bg-secondary/10 dark:bg-secondary/5 text-secondary dark:text-secondary-light text-[9px] font-bold px-2 py-0.5 rounded-full"
                        >
                          {w.greek}
                        </span>
                      ))}
                      {unit.words.length > 4 && (
                        <span className="text-text-secondary dark:text-zinc-500 text-[9px] px-1">
                          +{unit.words.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* BottomSheet: Conteúdo da Unidade */}
      <BottomSheet
        isOpen={!!selectedUnit}
        onClose={() => setSelectedUnit(null)}
        title={selectedUnit?.title}
        height="auto"
      >
        {selectedUnit && (
          <div className="flex flex-col gap-4">
            {/* Group label */}
            <div className="flex items-center gap-1.5 bg-secondary/10 dark:bg-secondary/5 rounded-full px-3 py-1.5 self-start">
              <IonIcon icon={book} className="text-secondary dark:text-secondary-light text-xs" />
              <span className="text-text-primary dark:text-white text-[11px] font-semibold">
                {selectedUnit.groupLabel}
              </span>
            </div>

            {/* Words table */}
            {selectedUnit.words.length > 0 && (
              <div className="bg-surface/50 dark:bg-surface-alt/25 border border-border/20 dark:border-border/10 rounded-3xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-border/20 dark:border-border/10">
                  <p className="text-text-secondary dark:text-zinc-500 text-[9px] font-bold uppercase">
                    Palavras-chave
                  </p>
                </div>
                <div className="divide-y divide-border/20 dark:divide-border/10">
                  {selectedUnit.words.map((word, i) => (
                    <div key={i} className="px-4 py-3 flex items-center gap-3">
                      <button
                        onClick={() => speak({ text: word.translit ?? word.greek, lang: word.translit ? 'pt-BR' : 'el-GR' })}
                        className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center active:scale-90 transition-all shrink-0"
                      >
                        <IonIcon icon={volumeHighOutline} className="text-secondary text-sm" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="greek-text text-text-primary dark:text-white font-bold text-sm">
                          {word.greek}
                        </p>
                        <p className="text-text-secondary dark:text-zinc-400 text-[10px]">
                          {word.translit}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-text-primary dark:text-white text-xs font-semibold">
                          {word.translation}
                        </p>
                        <p className="text-text-secondary dark:text-zinc-500 text-[9px]">
                          {word.frequency.toLocaleString()}×
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conteúdo completo */}
            <div className="text-text-primary dark:text-zinc-300 text-sm leading-relaxed">
              {renderMarkdown(selectedUnit.content)}
            </div>

            {/* Botão marcar como lida */}
            <button
              onClick={() => handleMarkAsRead(selectedUnit)}
              disabled={isUnitRead(selectedUnit.id)}
              className={`w-full py-3.5 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                isUnitRead(selectedUnit.id)
                  ? 'bg-secondary/15 text-secondary cursor-default'
                  : 'bg-secondary text-white active:scale-[0.98] shadow-md'
              }`}
            >
              <IonIcon icon={checkmarkCircle} className="text-lg" />
              {isUnitRead(selectedUnit.id) ? '✓ Lida' : 'Marcar como lida'}
            </button>
          </div>
        )}
      </BottomSheet>
    </SafeArea>
  );
};
