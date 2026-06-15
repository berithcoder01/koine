import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IonIcon } from '@/ui/components/IonIcon';
import { arrowBack, location, time, person, diamond, chevronForward, checkmarkCircle, play, pause } from 'ionicons/icons';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { getModuleById } from '@/content/history/history-modules';
import { getUnitsByModule } from '@/content/history/history-units';
import { HISTORY_BLOCKS } from '@/content/history/history-blocks';
import { BottomSheet } from '@/ui/components/BottomSheet';
import { useGamificationStore } from '@/features/gamification/gamificationStore';
import { useProgressStore } from '@/features/progress/progressStore';
import { useGamificationActions } from '@/features/gamification/useGamificationActions';
import { XP_VALUES } from '@/core/constants/config';
import { renderMarkdown } from '@/core/utils/markdown';
import { useGuidedAudio } from '@/features/audio/useGuidedAudio';
import { ArtifactImageOverlay } from '@/ui/components/ArtifactImageOverlay';
import type { HistoryUnit } from '@/core/types/history.types';

const BLOCK_FRIENDLY: Record<string, string> = {
  H1: 'Parte 1',
  H2: 'Parte 2',
  H3: 'Parte 3',
  H4: 'Parte 4',
};

export const HistoryModulePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const addXP = useGamificationStore(s => s.addXP);
  const { completedHistoryUnits, markHistoryUnitComplete } = useProgressStore();
  const { checkAchievements, recordStudyActivity } = useGamificationActions();

  const audio = useGuidedAudio(moduleId);
  const module = moduleId ? getModuleById(moduleId) : undefined;
  const units = moduleId ? getUnitsByModule(moduleId) : [];
  const block = module ? HISTORY_BLOCKS.find((b) => b.id === module.blockId) : undefined;
  const [selectedUnit, setSelectedUnit] = useState<HistoryUnit | null>(null);
  const [imageZoomOpen, setImageZoomOpen] = useState(false);

  const handlePlayIntro = useCallback(() => {
    if (audio.state === 'playing') {
      audio.stop();
    } else if (audio.state === 'paused') {
      audio.resume();
    } else {
      audio.playGroup('phase_intro');
    }
  }, [audio]);

  const handleSelectUnit = useCallback((unit: HistoryUnit) => {
    setSelectedUnit(unit);
    const unitNum = unit.unitOrder;
    audio.playGroup(`phase_exp_u${unitNum}`);
  }, [audio]);

  const handleCloseSheet = useCallback(() => {
    audio.stop();
    setSelectedUnit(null);
  }, [audio]);

  const isUnitRead = (unitId: string) => completedHistoryUnits.includes(unitId);

  const handleMarkAsRead = async (unit: HistoryUnit) => {
    if (isUnitRead(unit.id)) return;
    markHistoryUnitComplete(unit.id);
    addXP(XP_VALUES.HISTORY_UNIT_READ);
    recordStudyActivity();
    await checkAchievements(XP_VALUES.HISTORY_UNIT_READ);
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
        <button
          onClick={handlePlayIntro}
          className="w-10 h-10 rounded-full bg-secondary/15 border border-secondary/30 flex items-center justify-center active:scale-90 transition-all shrink-0"
          aria-label={audio.state === 'playing' ? 'Pausar' : 'Ouvir introdução'}
        >
          <IonIcon
            icon={audio.state === 'playing' ? pause : play}
            className="text-secondary text-lg"
          />
        </button>
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

        {/* Module info — stacked layout */}
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center gap-2 bg-surface/50 dark:bg-surface-alt/25 border border-border/20 dark:border-border/10 rounded-3xl p-4">
            <IonIcon icon={time} className="text-secondary dark:text-secondary-light text-base shrink-0" />
            <div>
              <p className="text-text-secondary dark:text-zinc-500 text-[9px] font-bold uppercase">Período</p>
              <p className="text-text-primary dark:text-white text-xs font-semibold">{module.period}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-surface/50 dark:bg-surface-alt/25 border border-border/20 dark:border-border/10 rounded-3xl p-4">
            <IonIcon icon={location} className="text-secondary dark:text-secondary-light text-base shrink-0" />
            <div className="min-w-0">
              <p className="text-text-secondary dark:text-zinc-500 text-[9px] font-bold uppercase">Lugares</p>
              <p className="text-text-primary dark:text-white text-xs font-semibold break-words">{module.places}</p>
            </div>
          </div>
        </div>

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
              onClick={() => handleSelectUnit(unit)}
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
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <div className="flex items-center gap-1">
                      <IonIcon icon={time} className="text-text-disabled dark:text-zinc-600 text-xs" />
                      <span className="text-text-secondary dark:text-zinc-500 text-[10px]">{unit.periodLabel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IonIcon icon={location} className="text-text-disabled dark:text-zinc-600 text-xs" />
                      <span className="text-text-secondary dark:text-zinc-500 text-[10px]">{unit.locationLabel}</span>
                    </div>
                    {unit.keyFigure !== 'N/A' && (
                      <div className="flex items-center gap-1">
                        <IonIcon icon={person} className="text-text-disabled dark:text-zinc-600 text-xs" />
                        <span className="text-text-secondary dark:text-zinc-500 text-[10px]">{unit.keyFigure}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-text-secondary dark:text-zinc-400 text-xs leading-relaxed line-clamp-2">
                    {unit.content.split('\n').filter(l => !l.startsWith('|') && l.trim()).slice(0, 2).join(' ')}
                  </p>
                  {unit.bibleConnection && (
                    <div className="mt-2 flex items-start gap-1.5">
                      <IonIcon icon={diamond} className="text-secondary dark:text-secondary-light text-xs mt-0.5 shrink-0" />
                      <p className="text-secondary dark:text-secondary-light text-[10px] font-medium line-clamp-1">
                        {unit.bibleConnection}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── BOTTOMSHEET: Conteúdo da Unidade ── */}
      <BottomSheet
        isOpen={!!selectedUnit}
        onClose={handleCloseSheet}
        title={selectedUnit?.title}
        height="auto"
      >
        {selectedUnit && (
          <div className="flex flex-col gap-4">
            {/* Metadata pills */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-secondary/10 dark:bg-secondary/5 rounded-full px-3 py-1.5">
                <IonIcon icon={time} className="text-secondary dark:text-secondary-light text-xs" />
                <span className="text-text-primary dark:text-white text-[11px] font-semibold">
                  {selectedUnit.periodLabel}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-secondary/10 dark:bg-secondary/5 rounded-full px-3 py-1.5">
                <IonIcon icon={location} className="text-secondary dark:text-secondary-light text-xs" />
                <span className="text-text-primary dark:text-white text-[11px] font-semibold">
                  {selectedUnit.locationLabel}
                </span>
              </div>
              {selectedUnit.keyFigure !== 'N/A' && (
                <div className="flex items-center gap-1.5 bg-secondary/10 dark:bg-secondary/5 rounded-full px-3 py-1.5">
                  <IonIcon icon={person} className="text-secondary dark:text-secondary-light text-xs" />
                  <span className="text-text-primary dark:text-white text-[11px] font-semibold">
                    {selectedUnit.keyFigure}
                  </span>
                </div>
              )}
            </div>

            {/* Conteúdo completo */}
            <div className="text-text-primary dark:text-zinc-300 text-sm leading-relaxed">
              {renderMarkdown(selectedUnit.content)}
            </div>

            {/* Conexão bíblica */}
            {selectedUnit.bibleConnection && (
              <div className="flex items-start gap-2 bg-secondary/10 dark:bg-secondary/5 rounded-3xl p-5">
                <IonIcon icon={diamond} className="text-secondary dark:text-secondary-light text-base mt-0.5 shrink-0" />
                <p className="text-secondary dark:text-secondary-light text-xs font-semibold leading-relaxed">
                  {selectedUnit.bibleConnection}
                </p>
              </div>
            )}

            {/* Artefato */}
            {selectedUnit.artifactImage && (
              <div
                className="rounded-3xl overflow-hidden border border-border/20 dark:border-border/10 cursor-pointer active:scale-[0.98] transition-transform"
                onClick={() => setImageZoomOpen(true)}
              >
                <img
                  src={selectedUnit.artifactImage}
                  alt={selectedUnit.artifactNote}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}
            {selectedUnit.artifactNote && (
              <div className="bg-surface/50 dark:bg-surface-alt/25 border border-border/20 dark:border-border/10 rounded-3xl p-5">
                <p className="text-text-secondary dark:text-zinc-500 text-[9px] font-bold uppercase mb-1">Artefato</p>
                <p className="text-text-secondary dark:text-zinc-400 text-xs leading-relaxed">
                  {selectedUnit.artifactNote}
                </p>
              </div>
            )}

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

      {selectedUnit?.artifactImage && (
        <ArtifactImageOverlay
          isOpen={imageZoomOpen}
          onClose={() => setImageZoomOpen(false)}
          src={selectedUnit.artifactImage}
          alt={selectedUnit.artifactNote}
        />
      )}
    </SafeArea>
  );
};
