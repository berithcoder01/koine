import React, { useState } from 'react';
import { useAppNavigation } from '@/features/navigation/useNavigation';
import { useTheme } from '@/features/theme/ThemeContext';
import { useSettingsStore } from '@/features/settings/settingsStore';
import { useAuthStore } from '@/features/auth/authStore';
import { useGamificationStore } from '@/features/gamification/gamificationStore';
import { signOut } from '@/features/auth/auth';
import { DailyGoalSetting } from '@/ui/settings/DailyGoalSetting';
import { useNotifications } from '@/features/settings/useNotifications';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/core/constants/routes';
import { SafeArea } from '@/ui/layouts/SafeArea';
import { BottomNav } from '@/ui/layouts/BottomNav';
import { AvatarDisplay } from '@/ui/components/AvatarDisplay';
import { BottomSheet } from '@/ui/components/BottomSheet';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import type { HapticIntensity } from '@/features/settings/settingsStore';

interface ToggleRowProps {
  icon: string;
  label: string;
  description?: string;
  value: boolean;
  onChange: (val: boolean) => void;
  expandable?: boolean;
  expanded?: boolean;
  onToggleExpand?: () => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ icon, label, description, value, onChange, expandable, expanded, onToggleExpand }) => (
  <div className="flex items-center justify-between py-4 px-1">
    <div className="flex items-center gap-3">
      <span className="text-2xl w-8 text-center shrink-0">{icon}</span>
      <div>
        <p className="text-text-primary dark:text-white text-base font-semibold">{label}</p>
        {description && (
          <p className="text-text-secondary dark:text-zinc-400 text-xs">{description}</p>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {expandable && onToggleExpand && (
        <button onClick={onToggleExpand} className="p-1">
          {expanded ? <ChevronUp size={16} className="text-text-secondary" /> : <ChevronDown size={16} className="text-text-secondary" />}
        </button>
      )}
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        style={{ borderRadius: '9999px' }}
        className={clsx(
          'relative w-14 h-8 !rounded-full transition-colors duration-300 shrink-0',
          value ? 'bg-secondary' : 'bg-border dark:bg-zinc-600'
        )}
      >
        <div
          className={clsx(
            'absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-200',
            value ? 'left-[calc(100%-1.75rem)]' : 'left-1'
          )}
        />
      </button>
    </div>
  </div>
);

interface NavRowProps {
  icon: string;
  label: string;
  description?: string;
  onPress: () => void;
  badge?: string;
}

const NavRow: React.FC<NavRowProps> = ({ icon, label, description, onPress, badge }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onPress}
    className="w-full flex items-center justify-between py-4 px-1 text-left cursor-pointer focus-visible:outline-none select-none"
  >
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <span className="text-2xl w-8 text-center shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-text-primary dark:text-white text-base font-semibold truncate">{label}</p>
        {description && (
          <p className="text-text-secondary dark:text-zinc-400 text-xs truncate">{description}</p>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2 shrink-0 ml-2">
      {badge && (
        <span className="bg-secondary/20 text-secondary text-[11px] font-bold px-2.5 py-1 rounded-full">
          {badge}
        </span>
      )}
      <span className="text-text-secondary dark:text-zinc-500 text-lg">›</span>
    </div>
  </div>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
  index?: number;
}

const Section: React.FC<SectionProps> = ({ title, children, index = 0 }) => (
  <div
    className="animate-fadeIn"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <p className="text-[10px] font-extrabold text-text-secondary dark:text-zinc-400 uppercase tracking-widest mb-2 px-1">
      {title}
    </p>
    <div className="bg-surface/50 dark:bg-surface-alt/30 border border-border/40 dark:border-border/10 rounded-3xl px-4 py-1 divide-y divide-border/40 dark:divide-border/10 shadow-sm">
      {children}
    </div>
  </div>
);

const HAPTIC_OPTIONS: { value: HapticIntensity; label: string }[] = [
  { value: 'light', label: 'Leve' },
  { value: 'medium', label: 'Médio' },
  { value: 'heavy', label: 'Forte' },
];

export const SettingsPage: React.FC = () => {
  const navigation = useAppNavigation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, avatarId } = useAuthStore();
  const { streakDays, totalXP } = useGamificationStore();
  const {
    audioEnabled,
    masterVolume,
    narrationVolume,
    effectsVolume,
    hapticEnabled,
    hapticIntensity,
    notificationsEnabled,
    notificationTime,
    setAudioEnabled,
    setMasterVolume,
    setNarrationVolume,
    setEffectsVolume,
    setHapticEnabled,
    setHapticIntensity,
  } = useSettingsStore();

  const notif = useNotifications();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeSheet, setActiveSheet] = useState<'privacy' | 'terms' | null>(null);

  const [expandedNotifications, setExpandedNotifications] = useState(false);
  const [expandedSounds, setExpandedSounds] = useState(false);
  const [expandedHaptics, setExpandedHaptics] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate(ROUTES.AUTH_LOGIN);
  };

  const handleNotificationToggle = async (_val: boolean) => {
    await notif.toggle();
  };

  return (
    <SafeArea scrollable withBottomNav>
      {/* ── HEADER ── */}
      <div className="px-4 pt-6 pb-3">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={navigation.goBack}
            style={{ borderRadius: '9999px' }}
            className="w-12 h-12 !rounded-full flex items-center justify-center bg-surface dark:bg-surface-alt shadow-sm cursor-pointer transition-colors"
          >
            <ChevronLeft size={20} className="text-text-primary dark:text-white" />
          </button>
          <h1 className="text-text-primary dark:text-white font-extrabold text-2xl tracking-tight">
            Configurações
          </h1>
        </div>

        {/* Profile Card */}
        <div
          onClick={navigation.goToProfile}
          style={{ borderRadius: '24px' }}
          className="w-full flex flex-col bg-surface dark:bg-surface-alt/30 border border-border/40 dark:border-border/10 rounded-3xl p-5 shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-3 w-full">
            <AvatarDisplay avatarId={avatarId} displayName={user?.displayName} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-text-primary dark:text-white font-bold text-sm leading-tight truncate">
                {user?.displayName ?? 'Aluno'}
              </p>
              <p className="text-text-secondary dark:text-zinc-400 text-[11px] mt-0.5 truncate">
                {user?.email ?? 'Conta local'}
              </p>
            </div>
            <span className="text-text-secondary dark:text-zinc-500 text-lg shrink-0">›</span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-border/30 dark:border-border/10 w-full">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm shrink-0">⚡</span>
              <span className="text-secondary dark:text-secondary-light font-black text-xs tabular-nums truncate">{totalXP.toLocaleString('pt-BR')} XP</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm shrink-0">🔥</span>
              <span className="text-text-secondary dark:text-zinc-400 text-xs font-semibold truncate">{streakDays} dias</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTEÚDO ROLÁVEL ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-6 pb-28">

        <Section title="Aparência" index={0}>
          <ToggleRow
            icon="🌙"
            label="Tema Escuro"
            description={theme === 'dark' ? 'Ativo — modo noturno' : 'Inativo — modo claro'}
            value={theme === 'dark'}
            onChange={toggleTheme}
          />
        </Section>

        <Section title="Meta Diária de Estudo" index={1}>
          <DailyGoalSetting />
        </Section>

        <Section title="Notificações" index={2}>
          <ToggleRow
            icon="🔔"
            label="Lembretes Diários"
            description="Receba um lembrete para estudar"
            value={notificationsEnabled}
            onChange={handleNotificationToggle}
            expandable
            expanded={expandedNotifications}
            onToggleExpand={() => setExpandedNotifications(!expandedNotifications)}
          />
          {expandedNotifications && notificationsEnabled && (
            <div className="pb-4 px-1 space-y-3">
              <div>
                <p className="text-xs font-semibold text-text-secondary dark:text-zinc-400 mb-2">Horário do lembrete</p>
                <input
                  type="time"
                  value={notificationTime}
                  onChange={(e) => notif.changeTime(e.target.value)}
                  className="w-full bg-surface-alt dark:bg-zinc-800 border border-border/30 dark:border-border/10 rounded-2xl px-4 py-3 text-text-primary dark:text-white text-sm font-semibold focus:outline-none focus:border-secondary"
                />
              </div>
              <div className="bg-secondary/5 border border-secondary/15 rounded-2xl p-3">
                <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Preview</p>
                <p className="text-xs text-text-secondary dark:text-zinc-400">
                  Todo dia às <span className="font-bold text-text-primary dark:text-white">{notificationTime}</span> você receberá um lembrete para estudar grego.
                </p>
              </div>
            </div>
          )}
        </Section>

        <Section title="Sons" index={3}>
          <ToggleRow
            icon="🎵"
            label="Sons"
            description="Efeitos sonoros e narração"
            value={audioEnabled}
            onChange={setAudioEnabled}
            expandable
            expanded={expandedSounds}
            onToggleExpand={() => setExpandedSounds(!expandedSounds)}
          />
          {expandedSounds && audioEnabled && (
            <div className="pb-4 px-1 space-y-4">
              <SliderRow
                label="Volume Geral"
                value={masterVolume}
                onChange={setMasterVolume}
              />
              <SliderRow
                label="Narração"
                value={narrationVolume}
                onChange={setNarrationVolume}
              />
              <SliderRow
                label="Efeitos Sonoros"
                value={effectsVolume}
                onChange={setEffectsVolume}
              />
            </div>
          )}
        </Section>

        <Section title="Vibração" index={4}>
          <ToggleRow
            icon="📳"
            label="Feedback Háptico"
            description="Vibração ao interagir com o app"
            value={hapticEnabled}
            onChange={setHapticEnabled}
            expandable
            expanded={expandedHaptics}
            onToggleExpand={() => setExpandedHaptics(!expandedHaptics)}
          />
          {expandedHaptics && hapticEnabled && (
            <div className="pb-4 px-1">
              <p className="text-xs font-semibold text-text-secondary dark:text-zinc-400 mb-2">Intensidade</p>
              <div className="flex gap-2">
                {HAPTIC_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setHapticIntensity(opt.value)}
                    className={clsx(
                      'flex-1 py-2.5 rounded-full border-2 text-xs font-bold transition-all duration-200',
                      hapticIntensity === opt.value
                        ? 'bg-secondary/15 border-secondary text-secondary'
                        : 'bg-surface-alt dark:bg-zinc-800 border-border/30 dark:border-border/10 text-text-secondary dark:text-zinc-400'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Section>

        <Section title="Conta" index={5}>
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

        <Section title="Sobre o Aplicativo" index={6}>
          <NavRow
            icon="📖"
            label="Política de Privacidade"
            description="Como seus dados são usados"
            onPress={() => setActiveSheet('privacy')}
          />
          <NavRow
            icon="📋"
            label="Termos de Uso"
            description="Regras e condições do serviço"
            onPress={() => setActiveSheet('terms')}
          />
          <div className="flex items-center justify-between py-4 px-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl w-8 text-center">⚡</span>
              <p className="text-text-primary dark:text-white text-base font-semibold">Versão</p>
            </div>
            <span className="text-text-secondary dark:text-zinc-400 text-sm font-semibold">1.0.0</span>
          </div>
        </Section>

        {/* ── LOGOUT ── */}
        <div className="animate-fadeIn" style={{ animationDelay: '400ms' }}>
          <p className="text-[10px] font-extrabold text-text-secondary dark:text-zinc-400 uppercase tracking-widest mb-2 px-1">
            Conta
          </p>
          {!showLogoutConfirm ? (
            <div className="bg-surface/50 dark:bg-surface-alt/30 border border-border/40 dark:border-border/10 rounded-3xl p-4 shadow-sm">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center gap-3 py-1 cursor-pointer"
              >
                <span className="text-xl w-7 text-center shrink-0">🚪</span>
                <span className="text-text-primary dark:text-white text-sm font-semibold">Sair da Conta</span>
                <span className="ml-auto text-text-secondary dark:text-zinc-500 text-lg">›</span>
              </button>
            </div>
          ) : (
            <div className="bg-surface/50 dark:bg-surface-alt/30 border border-border/40 dark:border-border/10 rounded-3xl p-5 shadow-sm">
              <p className="text-text-primary dark:text-white font-bold text-sm text-center mb-1">
                Confirmar saída?
              </p>
              <p className="text-text-secondary dark:text-zinc-400 text-xs text-center mb-4">
                Você precisará fazer login novamente.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3.5 bg-surface dark:bg-background border border-border/40 dark:border-border/10 !rounded-full text-text-primary font-bold text-sm text-center cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3.5 bg-error text-white !rounded-full font-bold text-sm text-center cursor-pointer"
                >
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* BottomSheet da Política de Privacidade */}
      <BottomSheet
        isOpen={activeSheet === 'privacy'}
        onClose={() => setActiveSheet(null)}
        title="Política de Privacidade"
        height="auto"
      >
        <div className="space-y-4 text-sm leading-relaxed text-text-secondary dark:text-zinc-400">
          <p>
            Esta Política de Privacidade explica como o <strong>Koine</strong> coleta, usa e protege suas informações ao usar nosso aplicativo de aprendizado de Grego Koiné.
          </p>
          
          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">1. Informações que Coletamos</h4>
            <p>
              Coletamos apenas as informações necessárias para fornecer e melhorar sua experiência de aprendizado:
            </p>
            <ul className="list-disc pl-5 mt-1.5 space-y-1">
              <li><strong>Dados de Cadastro:</strong> Nome de exibição e e-mail para criação e sincronização da sua conta via Firebase.</li>
              <li><strong>Progresso de Estudo:</strong> Lições concluídas, XP (pontos de experiência), dias de ofensiva (streak), cartões de revisão e versículos desbloqueados.</li>
              <li><strong>Dados de Pagamento:</strong> Seus dados de assinatura do plano Premium são processados com segurança pelas lojas oficiais (App Store e Google Play) intermediados pelo RevenueCat. Não temos acesso aos seus dados de cartão de crédito.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">2. Como Usamos Seus Dados</h4>
            <p>Seus dados são usados exclusivamente para:</p>
            <ul className="list-disc pl-5 mt-1.5 space-y-1">
              <li>Sincronizar seu progresso de estudo entre diferentes dispositivos.</li>
              <li>Fornecer recursos personalizados de aprendizado e gamificação (conquistas, troféus e revisões).</li>
              <li>Melhorar o desempenho técnico e a usabilidade do aplicativo.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">3. Compartilhamento de Dados</h4>
            <p>
              O Koine <strong>não vende, aluga ou compartilha</strong> suas informações pessoais com terceiros para fins de marketing ou publicidade. Seus dados são armazenados de forma segura em servidores de parceiros confiáveis de infraestrutura tecnológica (Google Firebase).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">4. Seus Direitos</h4>
            <p>
              Você pode, a qualquer momento, editar seu nome no aplicativo ou solicitar a exclusão definitiva da sua conta e de todos os dados de progresso associados enviando um e-mail para o suporte.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">5. Alterações</h4>
            <p>
              Esta política pode ser atualizada ocasionalmente. O uso continuado do aplicativo após quaisquer alterações constitui sua aceitação dos novos termos.
            </p>
          </div>
          
          <p className="text-xs text-text-secondary/65 pt-2">
            Última atualização: Junho de 2026.
          </p>
        </div>
      </BottomSheet>

      {/* BottomSheet dos Termos de Uso */}
      <BottomSheet
        isOpen={activeSheet === 'terms'}
        onClose={() => setActiveSheet(null)}
        title="Termos de Uso"
        height="auto"
      >
        <div className="space-y-4 text-sm leading-relaxed text-text-secondary dark:text-zinc-400">
          <p>
            Ao baixar, acessar ou usar o aplicativo <strong>Koine</strong>, você concorda em cumprir estes Termos de Uso. Se você não concorda com estes termos, por favor, não utilize o serviço.
          </p>

          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">1. Licença de Uso</h4>
            <p>
              Concedemos a você uma licença pessoal, revogável, não exclusiva e intransferível para usar o aplicativo exclusivamente para fins de estudo pessoal e não comercial da língua grega.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">2. Registro de Conta</h4>
            <p>
              Para acessar certas funções (como salvar progresso), você precisará registrar uma conta. Você é o único responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades que ocorrem sob sua conta.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">3. Assinatura Premium</h4>
            <p>O Koine oferece um modelo gratuito com compras dentro do aplicativo (Premium):</p>
            <ul className="list-disc pl-5 mt-1.5 space-y-1">
              <li>O plano gratuito oferece acesso limitado a lições básicas (Ciclos I e II).</li>
              <li>O plano Premium desbloqueia acesso ilimitado aos Ciclos III–VIII, versículos do Novo Testamento e recursos adicionais de estudo.</li>
              <li>Os pagamentos são processados pela sua respectiva loja de aplicativos (Apple App Store ou Google Play). Cancelamentos e reembolsos devem ser gerenciados diretamente através dessas plataformas.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">4. Conduta do Usuário</h4>
            <p>
              É expressamente proibido: usar o aplicativo de forma a causar danos à infraestrutura, tentar extrair o banco de dados lexicográfico para uso comercial, ou realizar engenharia reversa do código do aplicativo.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">5. Limitação de Responsabilidade</h4>
            <p>
              O aplicativo é fornecido "como está". Embora busquemos a máxima precisão acadêmica nas lições e definições lexicográficas (Strong), não garantimos a ausência total de pequenos erros de digitação ou divergências gramaticais.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary dark:text-white text-base mb-1">6. Rescisão</h4>
            <p>
              Podemos suspender ou encerrar seu acesso ao aplicativo a qualquer momento se determinarmos que houve violação grave destes termos de uso.
            </p>
          </div>

          <p className="text-xs text-text-secondary/65 pt-2">
            Última atualização: Junho de 2026.
          </p>
        </div>
      </BottomSheet>

      <BottomNav />
    </SafeArea>
  );
};

// ── Slider Row (inline) ──
interface SliderRowProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

const SliderRow: React.FC<SliderRowProps> = ({ label, value, onChange, min = 0, max = 100 }) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-xs font-semibold text-text-secondary dark:text-zinc-400">{label}</span>
      <span className="text-xs font-bold text-text-primary dark:text-white">{value}%</span>
    </div>
    <div className="relative w-full h-6 flex items-center">
      <div className="absolute w-full h-1.5 bg-border/20 dark:bg-border/10 rounded-full" />
      <div
        className="absolute h-1.5 bg-secondary rounded-full"
        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
      />
      <div
        className="absolute w-5 h-5 bg-white border-2 border-secondary rounded-full shadow-md pointer-events-none"
        style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 10px)` }}
      />
    </div>
  </div>
);
