import React, { useState } from 'react';
import { SafeArea } from '@/components/layout/SafeArea';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { GreekText } from '@/components/greek/GreekText';
import { useAuthStore } from '@/store/authStore';
import { useProgressStore } from '@/store/progressStore';
import { useGamificationStore } from '@/store/gamificationStore';
import { signOut } from '@/services/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAppNavigation } from '@/hooks/useNavigation';
import {
  ACHIEVEMENTS, getLevel, getXPForNextLevel, getLevelProgress
} from '@/constants/achievements';

export const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const { completedLessons, completedUnits } = useProgressStore();
  const { totalXP, streakDays, streakRecord, unlockedVerses } = useGamificationStore();
  const navigate = useNavigate();
  const navigation = useAppNavigation();
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'trophies'>('stats');

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
    unlockedVerses,
    srsCardCount: 0,
    fastLessonCompleted: false,
  };

  const earnedAchievements = ACHIEVEMENTS.filter(a => a.condition(progressObj));
  const lockedAchievements = ACHIEVEMENTS.filter(a => !a.condition(progressObj));

  const handleLogout = async () => {
    await signOut();
    navigate(ROUTES.AUTH_LOGIN);
  };

  return (
    <SafeArea>
      <div className="bg-primary px-4 pt-4 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-secondary/30 border-2 border-secondary flex items-center justify-center">
            <span className="text-3xl">
              {user?.displayName?.[0]?.toUpperCase() ?? '👤'}
            </span>
          </div>
          <div>
            <p className="text-white font-bold text-lg">
              {user?.displayName ?? 'Aluno'}
            </p>
            {isPremium && (
              <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full font-bold">
                ✨ Premium
              </span>
            )}
          </div>
          <button
            onClick={navigation.goToSettings}
            className="ml-auto text-white/60 text-2xl"
          >
            ⚙️
          </button>
        </div>

        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-secondary font-bold text-xl">Nível {level}</span>
              <span className="text-white/60 text-sm">🔥 {streakDays} dias</span>
            </div>
            <span className="text-white/70 text-sm">{totalXP.toLocaleString('pt-BR')} XP</span>
          </div>
          <ProgressBar value={levelProgress} color="bg-secondary" height={8} />
          <p className="text-white/50 text-xs mt-1">{xpToNext} XP para o próximo nível</p>
        </div>
      </div>

      <div className="flex border-b border-border">
        {(['stats', 'achievements', 'trophies'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-secondary'
            }`}
          >
            {tab === 'stats' ? '📊 Stats' : tab === 'achievements' ? '🏅 Conquistas' : '🏆 Troféus'}
          </button>
        ))}
      </div>

      <div className="px-4 py-4">
        {activeTab === 'stats' && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '⚡', label: 'XP Total', value: totalXP.toLocaleString('pt-BR') },
              { icon: '🔥', label: 'Streak', value: `${streakDays} dias` },
              { icon: '🏆', label: 'Recorde', value: `${streakRecord} dias` },
              { icon: '📚', label: 'Lições', value: `${lessonCount}` },
              { icon: '🏛️', label: 'Ciclos', value: `${completedUnits.length}/8` },
              { icon: '📖', label: 'Versículos', value: `${unlockedVerses.length}` },
            ].map(stat => (
              <div key={stat.label} className="bg-surface rounded-2xl p-4 shadow-sm">
                <p className="text-2xl mb-1">{stat.icon}</p>
                <p className="text-text-primary font-bold text-xl">{stat.value}</p>
                <p className="text-text-secondary text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="flex flex-col gap-3">
            {earnedAchievements.length > 0 && (
              <>
                <p className="text-xs text-text-secondary uppercase tracking-wide font-bold">
                  Desbloqueadas ({earnedAchievements.length})
                </p>
                {earnedAchievements.map(a => (
                  <div key={a.id} className="bg-surface rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                    <span className="text-3xl">{a.icon}</span>
                    <div className="flex-1">
                      <p className="text-text-primary font-bold">{a.title}</p>
                      <p className="text-text-secondary text-xs">{a.description}</p>
                    </div>
                    <span className="text-secondary font-bold text-xs">+{a.xpReward} XP</span>
                  </div>
                ))}
              </>
            )}

            {lockedAchievements.length > 0 && (
              <>
                <p className="text-xs text-text-secondary uppercase tracking-wide font-bold mt-2">
                  Bloqueadas ({lockedAchievements.length})
                </p>
                {lockedAchievements.map(a => (
                  <div key={a.id} className="bg-surface rounded-2xl p-4 flex items-center gap-3 shadow-sm opacity-50">
                    <span className="text-3xl grayscale">{a.icon}</span>
                    <div className="flex-1">
                      <p className="text-text-primary font-bold">{a.title}</p>
                      <p className="text-text-secondary text-xs">{a.description}</p>
                    </div>
                    <span className="text-text-secondary text-xs">🔒</span>
                  </div>
                ))}
              </>
            )}

            {earnedAchievements.length === 0 && lockedAchievements.length === 0 && (
              <p className="text-text-secondary text-center py-8">Complete lições para desbloquear conquistas!</p>
            )}
          </div>
        )}

        {activeTab === 'trophies' && (
          <div className="flex flex-col gap-3">
            {unlockedVerses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-4xl mb-3">🏆</p>
                <p className="text-text-primary font-bold">Nenhum troféu ainda</p>
                <p className="text-text-secondary text-sm mt-1">
                  Complete ciclos para desbloquear versículos troféu
                </p>
              </div>
            ) : (
              unlockedVerses.map(verseId => (
                <div key={verseId} className="bg-primary rounded-2xl p-4 shadow-md">
                  <p className="text-secondary text-xs font-bold mb-2 uppercase tracking-wide">
                    ✦ Versículo Troféu
                  </p>
                  <GreekText text={verseId} size="md" color="text-white" />
                </div>
              ))
            )}

            {!isPremium && (
              <div className="bg-secondary/10 border border-secondary rounded-2xl p-4 mt-2 text-center">
                <p className="text-secondary font-bold mb-1">✨ Mais troféus com o Premium</p>
                <p className="text-text-secondary text-sm mb-3">
                  Desbloqueie os Ciclos III–VIII e colecionem versículos do NT inteiro
                </p>
                <Button label="Ver Premium" onClick={() => navigation.goToPaywall()} variant="secondary" />
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full mt-6 py-3 text-error text-sm font-medium"
        >
          Sair da conta
        </button>
      </div>

      <BottomNav />
    </SafeArea>
  );
};
