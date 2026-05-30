// src/pages/profile/ProfilePage.tsx
import React from 'react';
import { SafeArea } from '@/components/layout/SafeArea';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAuthStore } from '@/store/authStore';
import { useProgressStore } from '@/store/progressStore';
import { useGamificationStore } from '@/store/gamificationStore';
import { signOut } from '@/services/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { XPBadge } from '@/components/ui/XPBadge';
import { StreakBadge } from '@/components/ui/StreakBadge';
import { useAppNavigation } from '@/hooks/useNavigation';

const ACHIEVEMENTS = [
  { id: 'first_lesson', icon: '🎓', title: 'Primeiro Passo', desc: 'Complete sua primeira lição', condition: (l: number) => l >= 1 },
  { id: 'streak_7', icon: '🔥', title: 'Ofensiva de 7 dias', desc: 'Estude 7 dias seguidos', condition: (_l: number, s: number) => s >= 7 },
  { id: 'all_letters', icon: '✍️', title: 'Alfabeto Completo', desc: 'Pratique todas as 24 letras', condition: () => false },
  { id: 'vocabulary_50', icon: '📚', title: '50 Palavras', desc: 'Aprenda 50 palavras', condition: () => false },
  { id: 'cycle_1', icon: '🏆', title: 'Ciclo I Completo', desc: 'Finalize o Ciclo I', condition: () => false },
  { id: 'perfect_lesson', icon: '⭐', title: 'Lição Perfeita', desc: 'Acerte 100% em uma lição', condition: (_l: number, _s: number, bs: number) => bs >= 100 },
];

export const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const { completedLessons, completedUnits } = useProgressStore();
  const { totalXP, streakDays, achievements } = useGamificationStore();
  const navigate = useNavigate();
  const navigation = useAppNavigation();

  const handleLogout = async () => {
    await signOut();
    navigate(ROUTES.AUTH_LOGIN);
  };

  const lessonCount = Object.keys(completedLessons).length;
  const bestScore = Object.values(completedLessons).reduce((max, l) => Math.max(max, l.score), 0);

  return (
    <SafeArea>
      <div className="px-4 pt-4 pb-24 space-y-4">
        <h1 className="text-xl font-bold text-textPrimary">Perfil</h1>

        <div className="bg-primary rounded-2xl p-5 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">{user?.photoURL ? '👤' : '🎓'}</span>
          </div>
          <p className="text-white font-bold text-lg">{user?.displayName ?? 'Aluno'}</p>
          <p className="text-white/60 text-sm">{user?.email}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-surface rounded-2xl p-3 text-center shadow-sm">
            <XPBadge xp={totalXP} />
            <p className="text-textSecondary text-xs mt-1">Total</p>
          </div>
          <div className="bg-surface rounded-2xl p-3 text-center shadow-sm">
            <StreakBadge streak={streakDays} />
            <p className="text-textSecondary text-xs mt-1">Sequência</p>
          </div>
          <div className="bg-surface rounded-2xl p-3 text-center shadow-sm">
            <p className="text-primary font-bold text-xl">{lessonCount}</p>
            <p className="text-textSecondary text-xs mt-1">Lições</p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-textPrimary text-sm">Progresso Geral</p>
            <p className="text-primary text-sm font-bold">{completedUnits.length} módulos</p>
          </div>
          <ProgressBar value={Math.min((completedUnits.length / 18) * 100, 100)} color="bg-primary" height={6} />
          <p className="text-textSecondary text-xs mt-2">{completedUnits.length}/18 módulos concluídos</p>
        </div>

        <div className="bg-surface rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-textPrimary text-sm mb-3">Conquistas</p>
          <div className="grid grid-cols-3 gap-3">
            {ACHIEVEMENTS.map((a) => {
              const unlocked = a.condition(lessonCount, streakDays, bestScore);
              const savedAchievement = achievements.find(e => e.id === a.id);
              const isUnlocked = unlocked || !!savedAchievement;
              return (
                <div key={a.id} className={`text-center ${!isUnlocked ? 'opacity-40' : ''}`}>
                  <span className="text-2xl">{a.icon}</span>
                  <p className="text-[10px] text-textSecondary mt-1 leading-tight">{a.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={navigation.goToSettings}
          className="w-full bg-surface rounded-2xl p-4 shadow-sm flex items-center justify-between"
        >
          <span className="text-textPrimary font-medium">Configurações</span>
          <span className="text-textSecondary">→</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-error/10 text-error font-medium py-3 rounded-xl active:bg-error/20 transition-colors"
        >
          Sair da conta
        </button>
      </div>
      <BottomNav />
    </SafeArea>
  );
};
