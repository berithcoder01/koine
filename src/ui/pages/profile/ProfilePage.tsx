import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { BottomNav } from '@/ui/layouts/BottomNav';
import { ProgressBar } from '@/ui/components/ProgressBar';
import { TrophyCard, DiamondTrophyCard } from '@/ui/components/TrophyCard';
import { AvatarDisplay } from '@/ui/components/AvatarDisplay';
import { AvatarPickerSheet } from '@/ui/components/AvatarPickerSheet';
import { useAuthStore } from '@/features/auth/authStore';
import { useProgressStore } from '@/features/progress/progressStore';
import { useGamificationStore } from '@/features/gamification/gamificationStore';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { dbQueries } from '@/features/database/queries';
import { Settings, Bookmark } from 'lucide-react';
import { clsx } from 'clsx';
import { getWordOfTheDayState } from '@/content/word-of-the-day/storage';
import { MODULES } from '@/content/curriculum/modules';
import { TROPHIES, calculateTrophyTier } from '@/core/constants/trophies';
import {
  ACHIEVEMENTS, getLevel, getXPForNextLevel, getLevelProgress
} from '@/core/constants/achievements';

const getStatCardTheme = (label: string) => {
  switch (label) {
    case 'XP Total':
      return {
        bg: 'bg-card-amber/60 dark:bg-card-amber/10',
        border: 'border-card-amber-border/50 dark:border-card-amber-border/20',
        text: 'text-card-amber-text dark:text-amber-300',
      };
    case 'Perseverança':
    case 'Recorde':
      return {
        bg: 'bg-card-rose/60 dark:bg-card-rose/10',
        border: 'border-card-rose-border/50 dark:border-card-rose-border/20',
        text: 'text-card-rose-text dark:text-rose-300',
      };
    case 'Lições':
      return {
        bg: 'bg-card-blue/60 dark:bg-card-blue/10',
        border: 'border-card-blue-border/50 dark:border-card-blue-border/20',
        text: 'text-card-blue-text dark:text-blue-300',
      };
    case 'Ciclos':
      return {
        bg: 'bg-card-purple/60 dark:bg-card-purple/10',
        border: 'border-card-purple-border/50 dark:border-card-purple-border/20',
        text: 'text-card-purple-text dark:text-purple-300',
      };
    case 'História':
      return {
        bg: 'bg-amber-50/60 dark:bg-amber-900/10',
        border: 'border-amber-200/50 dark:border-amber-700/20',
        text: 'text-amber-700 dark:text-amber-300',
      };
    case 'Canvas':
      return {
        bg: 'bg-emerald-50/60 dark:bg-emerald-900/10',
        border: 'border-emerald-200/50 dark:border-emerald-700/20',
        text: 'text-emerald-700 dark:text-emerald-300',
      };
    case 'Versículos':
    default:
      return {
        bg: 'bg-card-green/60 dark:bg-card-green/10',
        border: 'border-card-green-border/50 dark:border-card-green-border/20',
        text: 'text-card-green-text dark:text-green-300',
      };
  }
};

export const ProfilePage: React.FC = () => {
  const { user, avatarId } = useAuthStore();
  const { completedLessons, completedUnits, completedHistoryUnits, completedCanvasLetters } = useProgressStore();
  const { totalXP, streakDays, streakRecord, unlockedVerses, trophyProgress } = useGamificationStore();
  const navigation = useAppNavigation();
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'trophies'>('stats');
  const [srsCardCount, setSrsCardCount] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    dbQueries.getTotalSRSCardCount().then(setSrsCardCount).catch(() => {});
  }, []);

  const level = getLevel(totalXP);
  const xpToNext = getXPForNextLevel(totalXP);
  const levelProgress = getLevelProgress(totalXP);
  const isPremium = user?.isPremium ?? false;
  const lessonCount = Object.keys(completedLessons).length;

  const progressObj = {
    totalXP,
    streakDays,
    completedLessons: Object.keys(completedLessons),
    completedUnits,
    completedHistoryUnits,
    completedCanvasLetters,
    unlockedVerses,
    srsCardCount,
    fastLessonCompleted: false,
  };

  const earnedAchievements = ACHIEVEMENTS.filter(a => a.condition(progressObj));
  const lockedAchievements = ACHIEVEMENTS.filter(a => !a.condition(progressObj));

  return (
    <SafeArea scrollable withBottomNav>
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="px-4 pt-6 pb-2">
          <div className="flex items-center gap-4 mb-5">
            <button
              onClick={() => setPickerOpen(true)}
              className="shrink-0 active:scale-95 transition-transform cursor-pointer"
              aria-label="Trocar avatar"
            >
              <AvatarDisplay avatarId={avatarId} displayName={user?.displayName} size="lg" />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary dark:text-white font-extrabold text-xl tracking-tight truncate">
                {user?.displayName ?? 'Aluno'}
              </p>
              {isPremium && (
                <span className="inline-block bg-secondary text-white text-xs px-2.5 py-1 rounded-full font-extrabold mt-1">
                  ✨ Premium
                </span>
              )}
            </div>
            <button
              onClick={navigation.goToSettings}
              className="shrink-0 w-12 h-12 !rounded-full flex items-center justify-center bg-surface dark:bg-surface-alt shadow-sm text-text-secondary dark:text-zinc-400 active:scale-95 transition-transform"
              aria-label="Configurações"
            >
              <Settings size={20} />
            </button>
          </div>

          <div className="bg-surface dark:bg-surface-alt/30 border border-border/20 dark:border-border/10 rounded-3xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="text-secondary font-black text-2xl">Nível {level}</span>
                <span className="text-text-secondary dark:text-zinc-400 text-base font-semibold">🔥 {streakDays} dias</span>
              </div>
              <span className="text-text-primary dark:text-zinc-300 text-base font-extrabold tabular-nums">
                {totalXP.toLocaleString('pt-BR')} XP
              </span>
            </div>
            <ProgressBar value={levelProgress} color="bg-secondary" height={10} />
            <p className="text-text-secondary text-sm mt-2 font-medium">{xpToNext} XP para o próximo nível</p>
          </div>

          <div 
            onClick={navigation.goToSavedWords}
            className="mt-4 bg-gradient-to-r from-secondary/10 to-transparent border-l-4 border-l-secondary border border-border/40 dark:border-border/10 rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.98] transition-transform select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigation.goToSavedWords(); }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center shrink-0">
                <Bookmark className="text-secondary dark:text-secondary-light" size={20} />
              </div>
              <div>
                <p className="text-text-primary dark:text-white font-extrabold text-sm">
                  Palavras Salvas
                </p>
                <p className="text-text-secondary dark:text-zinc-400 text-xs font-medium mt-0.5">
                  {getWordOfTheDayState().savedIds.length} {getWordOfTheDayState().savedIds.length === 1 ? 'palavra guardada' : 'palavras guardadas'}
                </p>
              </div>
            </div>
            <span className="text-text-secondary dark:text-zinc-500 font-bold text-xl">›</span>
          </div>
        </div>

        <div className="px-4 mt-5">
          <div className="relative flex p-1.5 bg-zinc-100/90 dark:bg-zinc-800/80 rounded-full shadow-inner border border-zinc-200/30 dark:border-zinc-700/20">
            {(['stats', 'achievements', 'trophies'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative flex-1 py-3 text-sm font-extrabold z-10 active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5 rounded-full focus-visible:outline-none select-none"
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="profile-pill"
                    className="absolute inset-0 rounded-full bg-white dark:bg-surface shadow-sm border border-zinc-200/50 dark:border-zinc-700/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={clsx(
                  'relative z-10 flex items-center gap-1.5 transition-colors',
                  activeTab === tab ? 'text-text-primary dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
                )}>
                  <span className="text-lg leading-none">
                    {tab === 'stats' ? '📊' : tab === 'achievements' ? '🏅' : '🏆'}
                  </span>
                  <span>{tab === 'stats' ? 'Stats' : tab === 'achievements' ? 'Conquistas' : 'Troféus'}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-5 pb-32">
          {activeTab === 'stats' && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '⚡', label: 'XP Total', value: totalXP.toLocaleString('pt-BR') },
                { icon: '🔥', label: 'Perseverança', value: `${streakDays} dias` },
                { icon: '🏆', label: 'Recorde', value: `${streakRecord} dias` },
                { icon: '📚', label: 'Lições', value: `${lessonCount}` },
                { icon: '🏛️', label: 'Ciclos', value: `${completedUnits.length}/8` },
                { icon: '📖', label: 'Versículos', value: `${unlockedVerses.length}` },
                { icon: '📜', label: 'História', value: `${completedHistoryUnits.length}/45` },
                { icon: '✍️', label: 'Canvas', value: `${completedCanvasLetters.length}/24` },
              ].map(stat => {
                const theme = getStatCardTheme(stat.label);
                return (
                  <div
                    key={stat.label}
                    className={clsx(
                      'border rounded-3xl p-4 shadow-sm transition-all duration-200',
                      theme.bg,
                      theme.border
                    )}
                  >
                    <p className="text-3xl mb-2">{stat.icon}</p>
                    <p className="text-text-primary dark:text-white font-black text-2xl leading-tight">{stat.value}</p>
                    <p className={clsx('text-[10px] font-extrabold uppercase tracking-wider mt-1.5', theme.text)}>
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="flex flex-col gap-3">
              {earnedAchievements.length > 0 && (
                <>
                  <p className="text-xs text-text-secondary uppercase tracking-wider font-extrabold px-1">
                    Desbloqueadas ({earnedAchievements.length})
                  </p>
                  {earnedAchievements.map(a => (
                    <div key={a.id} className="bg-gradient-to-br from-secondary/10 to-white dark:from-secondary/10 dark:to-surface border border-secondary/20 dark:border-secondary/15 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                      <span className="text-3xl shrink-0">{a.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-text-primary dark:text-white font-extrabold">{a.title}</p>
                        <p className="text-text-secondary dark:text-zinc-400 text-xs mt-0.5">{a.description}</p>
                      </div>
                      <span className="text-zinc-800 dark:text-secondary font-extrabold text-xs bg-secondary/20 px-2.5 py-1 rounded-full shrink-0">
                        +{a.xpReward} XP
                      </span>
                    </div>
                  ))}
                </>
              )}

              {lockedAchievements.length > 0 && (
                <>
                  <p className="text-xs text-text-secondary uppercase tracking-wider font-extrabold mt-2 px-1">
                    Bloqueadas ({lockedAchievements.length})
                  </p>
                  {lockedAchievements.map(a => (
                    <div key={a.id} className="bg-surface dark:bg-surface-alt border border-border/30 dark:border-border/10 rounded-2xl p-4 flex items-center gap-3 shadow-sm opacity-50">
                      <span className="text-3xl grayscale shrink-0">{a.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-text-primary dark:text-white font-bold">{a.title}</p>
                        <p className="text-text-secondary dark:text-zinc-400 text-xs mt-0.5">{a.description}</p>
                      </div>
                      <span className="text-text-secondary text-sm shrink-0">🔒</span>
                    </div>
                  ))}
                </>
              )}

              {earnedAchievements.length === 0 && lockedAchievements.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-4xl mb-3">🏅</p>
                  <p className="text-text-secondary text-sm">Complete lições para desbloquear conquistas!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'trophies' && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-text-secondary uppercase tracking-wider font-extrabold px-1">
                Troféus ({Object.values(trophyProgress).filter(t => t === 'ouro').length}/{TROPHIES.length} Ouros)
              </p>
              {TROPHIES.map((trophy, index) => {
                const cycleModules = MODULES.filter(m => m.cycle === trophy.cycleId && m.exercises > 0);
                const completedCount = cycleModules.filter(m => Object.keys(completedLessons).includes(m.id)).length;
                const progressPercent = cycleModules.length > 0 ? (completedCount / cycleModules.length) * 100 : 0;
                const tier = calculateTrophyTier(completedCount, cycleModules.length);

                return (
                  <TrophyCard
                    key={trophy.cycleId}
                    trophy={trophy}
                    tier={tier}
                    progressPercent={progressPercent}
                    index={index}
                  />
                );
              })}
              <DiamondTrophyCard
                allOuro={TROPHIES.every(t => {
                  const cycleModules = MODULES.filter(m => m.cycle === t.cycleId && m.exercises > 0);
                  const completedCount = cycleModules.filter(m => Object.keys(completedLessons).includes(m.id)).length;
                  return calculateTrophyTier(completedCount, cycleModules.length) === 'ouro';
                })}
                index={TROPHIES.length}
              />
            </div>
          )}
        </div>
      </div>

      <BottomNav />
      <AvatarPickerSheet isOpen={pickerOpen} onClose={() => setPickerOpen(false)} />
    </SafeArea>
  );
};
