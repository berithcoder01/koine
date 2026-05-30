// src/pages/profile/SettingsPage.tsx
import React, { useState } from 'react';
import { useAppNavigation } from '@/hooks/useNavigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';
import { useGamificationStore } from '@/store/gamificationStore';
import { signOut } from '@/services/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

// ─── Reusable sub-components ──────────────────────────────────────────────────

interface ToggleRowProps {
  icon: string;
  label: string;
  description?: string;
  value: boolean;
  onChange: (val: boolean) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ icon, label, description, value, onChange }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3">
      <span className="text-xl w-7 text-center">{icon}</span>
      <div>
        <p className="text-text-primary dark:text-white text-sm font-semibold">{label}</p>
        {description && (
          <p className="text-text-secondary text-[11px]">{description}</p>
        )}
      </div>
    </div>
    <button
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={clsx(
        'relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
        value ? 'bg-secondary' : 'bg-border dark:bg-zinc-600'
      )}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        className={clsx(
          'absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm',
          value ? 'left-[calc(100%-1.5rem)]' : 'left-1'
        )}
      />
    </button>
  </div>
);

interface NavRowProps {
  icon: string;
  label: string;
  description?: string;
  onPress: () => void;
  danger?: boolean;
  badge?: string;
}

const NavRow: React.FC<NavRowProps> = ({ icon, label, description, onPress, danger, badge }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onPress}
    className="w-full flex items-center justify-between py-3 text-left"
  >
    <div className="flex items-center gap-3">
      <span className={clsx('text-xl w-7 text-center', danger && 'grayscale-0')}>{icon}</span>
      <div>
        <p className={clsx(
          'text-sm font-semibold',
          danger ? 'text-error' : 'text-text-primary dark:text-white'
        )}>
          {label}
        </p>
        {description && (
          <p className="text-text-secondary text-[11px]">{description}</p>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <span className="bg-secondary/20 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      {!danger && (
        <span className="text-text-secondary dark:text-zinc-500 text-sm">›</span>
      )}
    </div>
  </motion.button>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mb-4">
    <p className="text-[10px] font-extrabold text-text-secondary dark:text-zinc-400 uppercase tracking-widest mb-2 px-1">
      {title}
    </p>
    <div className="bg-surface dark:bg-surface-alt/60 border border-border/40 dark:border-border/10 rounded-3xl px-4 divide-y divide-border/40 dark:divide-border/10 shadow-sm">
      {children}
    </div>
  </div>
);

// ─── Daily Goal Selector ──────────────────────────────────────────────────────

type GoalOption = { type: 'casual' | 'regular' | 'intensive'; label: string; minutes: number; emoji: string };

const GOAL_OPTIONS: GoalOption[] = [
  { type: 'casual',    label: 'Casual',    minutes: 5,  emoji: '🌱' },
  { type: 'regular',   label: 'Regular',   minutes: 10, emoji: '⚡' },
  { type: 'intensive', label: 'Intensivo', minutes: 15, emoji: '🔥' },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export const SettingsPage: React.FC = () => {
  const navigation = useAppNavigation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuthStore();
  const { streakDays, totalXP } = useGamificationStore();
  const {
    audioEnabled,
    hapticEnabled,
    notificationsEnabled,
    dailyGoalType,
    setAudioEnabled,
    setHapticEnabled,
    setNotificationsEnabled,
    setDailyGoal,
  } = useSettingsStore();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate(ROUTES.AUTH_LOGIN);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
      className="min-h-screen bg-background dark:bg-background pt-[env(safe-area-inset-top)] pb-10"
    >
      {/* ── Header ── */}
      <div className="px-4 pt-6 pb-4 flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={navigation.goBack}
          className="w-10 h-10 bg-surface dark:bg-surface-alt border border-border/40 dark:border-border/10 rounded-2xl flex items-center justify-center shadow-sm"
        >
          <span className="text-lg text-text-primary dark:text-white">‹</span>
        </motion.button>
        <h1 className="text-xl font-extrabold text-text-primary dark:text-white tracking-tight">
          Configurações
        </h1>
      </div>

      <div className="px-4">

        {/* ── Profile Card ── */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={navigation.goToProfile}
          className="w-full flex items-center gap-4 bg-surface dark:bg-surface-alt/60 border border-border/40 dark:border-border/10 rounded-3xl p-4 mb-5 shadow-sm cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-card-amber dark:bg-card-amber-border/20 border border-card-amber-border flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-black text-card-amber-text">
              {user?.displayName?.[0]?.toUpperCase() ?? '👤'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-text-primary dark:text-white font-bold text-base truncate">
              {user?.displayName ?? 'Aluno'}
            </p>
            <p className="text-text-secondary text-xs truncate">
              {user?.email ?? 'Conta local'}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-secondary font-black text-sm">{totalXP.toLocaleString('pt-BR')} XP</p>
            <p className="text-text-secondary text-[10px]">🔥 {streakDays} dias</p>
          </div>
        </motion.div>

        {/* ── Seção: Aparência ── */}
        <Section title="Aparência">
          <ToggleRow
            icon="🌙"
            label="Tema Escuro"
            description={theme === 'dark' ? 'Ativo — modo noturno' : 'Inativo — modo claro'}
            value={theme === 'dark'}
            onChange={toggleTheme}
          />
        </Section>

        {/* ── Seção: Meta Diária ── */}
        <Section title="Meta Diária de Estudo">
          <div className="py-3">
            <p className="text-text-secondary text-[11px] mb-3">
              Quanto tempo você quer estudar por dia?
            </p>
            <div className="flex gap-2">
              {GOAL_OPTIONS.map((opt) => (
                <motion.button
                  key={opt.type}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setDailyGoal(opt.type)}
                  className={clsx(
                    'flex-1 flex flex-col items-center py-3 rounded-2xl border transition-all duration-200',
                    dailyGoalType === opt.type
                      ? 'bg-secondary/15 border-secondary text-secondary'
                      : 'bg-surface-alt dark:bg-surface/30 border-border/30 dark:border-border/10 text-text-secondary'
                  )}
                >
                  <span className="text-lg mb-0.5">{opt.emoji}</span>
                  <span className="text-[10px] font-bold">{opt.label}</span>
                  <span className="text-[9px] opacity-70">{opt.minutes} min</span>
                </motion.button>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Seção: Notificações ── */}
        <Section title="Notificações e Sons">
          <ToggleRow
            icon="🔔"
            label="Notificações"
            description="Lembretes diários de estudo"
            value={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
          <ToggleRow
            icon="🎵"
            label="Sons"
            description="Efeitos sonoros nas lições"
            value={audioEnabled}
            onChange={setAudioEnabled}
          />
          <ToggleRow
            icon="📳"
            label="Vibração"
            description="Feedback háptico ao interagir"
            value={hapticEnabled}
            onChange={setHapticEnabled}
          />
        </Section>

        {/* ── Seção: Conta ── */}
        <Section title="Conta">
          <NavRow
            icon="✨"
            label="Koine Premium"
            description="Desbloqueie todos os ciclos"
            onPress={navigation.goToPaywall}
            badge="Ver planos"
          />
          <NavRow
            icon="👤"
            label="Meu Perfil"
            description="Conquistas, stats e troféus"
            onPress={navigation.goToProfile}
          />
        </Section>

        {/* ── Seção: Sobre ── */}
        <Section title="Sobre o Aplicativo">
          <NavRow
            icon="📖"
            label="Política de Privacidade"
            description="Como seus dados são usados"
            onPress={() => {}}
          />
          <NavRow
            icon="📋"
            label="Termos de Uso"
            description="Regras e condições do serviço"
            onPress={() => {}}
          />
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="text-xl w-7 text-center">⚡</span>
              <p className="text-text-primary dark:text-white text-sm font-semibold">Versão</p>
            </div>
            <span className="text-text-secondary text-xs font-semibold">1.0.0</span>
          </div>
        </Section>

        {/* ── Botão de Logout ── */}
        {!showLogoutConfirm ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full py-4 mt-2 bg-card-rose dark:bg-card-rose/80 border border-card-rose-border rounded-3xl flex items-center justify-center gap-2 transition-all duration-200"
          >
            <span className="text-lg">🚪</span>
            <span className="text-error font-bold text-sm">Sair da Conta</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card-rose dark:bg-card-rose/80 border border-card-rose-border rounded-3xl p-5 mt-2"
          >
            <p className="text-text-primary dark:text-white font-bold text-sm text-center mb-1">
              Confirmar saída?
            </p>
            <p className="text-text-secondary text-xs text-center mb-4">
              Você precisará fazer login novamente.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 bg-surface dark:bg-surface-alt border border-border/40 rounded-2xl text-text-primary dark:text-white text-sm font-bold"
              >
                Cancelar
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleLogout}
                className="flex-1 py-3 bg-error rounded-2xl text-white text-sm font-bold shadow-md shadow-error/20"
              >
                Sair
              </motion.button>
            </div>
          </motion.div>
        )}

        <p className="text-center text-text-secondary text-[10px] mt-6 mb-2">
          Koine — Grego do Novo Testamento
        </p>

      </div>
    </motion.div>
  );
};
