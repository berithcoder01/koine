import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Button, Divider } from '@/ui/components';
import { TypewriterText } from '@/ui/components/TypewriterText';
import { ROUTES } from '@/core/constants/routes';
import { signInWithEmail, signInWithGoogle } from '@/features/auth/auth';
import { isValidEmail } from '@/core/utils/validators';

const TYPING_PHRASES = [
  'Estude grego onde você estiver.',
  'Faça no seu tempo.',
  'Domine o Novo Testamento.',
  'Aprenda com sabedoria.',
  'Cresça na Palavra.',
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    if (!isValidEmail(email)) {
      setError('E-mail inválido');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signInWithEmail(email.trim().toLowerCase(), password);
      navigate(ROUTES.TRAIL);
    } catch {
      setError('E-mail ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      navigate(ROUTES.TRAIL);
    } catch (err: any) {
      console.error('[Login] Google login failed:', err);
      const msg = err?.message || String(err);
      if (msg.includes('native')) setError('Erro ao conectar com Google. Tente novamente.');
      else if (msg.includes('credential')) setError('Falha ao validar credencial Google.');
      else if (msg.includes('progress')) setError('Login ok, mas houve erro ao salvar dados.');
      else setError('Erro ao entrar com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 relative overflow-hidden select-none font-ui" style={{ backgroundColor: '#EA662C' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto z-10"
      >
        {/* Logotipo Centralizado */}
        <div className="text-center mb-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block"
          >
            <span className="logo-text text-white text-5xl tracking-wide select-none filter drop-shadow-sm">
              Κοινή
            </span>
          </motion.div>
        </div>

        {/* Texto Animado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-8 h-8"
        >
          <TypewriterText phrases={TYPING_PHRASES} className="text-white" />
        </motion.div>

        {/* Card do Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="bg-surface border border-border/40 dark:border-border/10 rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]"
        >
          {/* Botão Google - PRIORIDADE MÁXIMA */}
          <motion.div whileTap={{ scale: 0.985 }} className="mb-4">
            <Button
              onPress={handleGoogleLogin}
              isDisabled={loading}
              variant="bordered"
              fullWidth
              size="lg"
              radius="md"
              className="font-semibold border-gray-200 dark:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-gray-700 dark:text-text-primary"
              startContent={
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
              }
            >
              Entrar com Google
            </Button>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <Divider className="flex-1 bg-gray-200 dark:bg-zinc-600" />
            <span className="text-gray-400 dark:text-zinc-500 text-xs uppercase font-semibold tracking-wider">ou</span>
            <Divider className="flex-1 bg-gray-200 dark:bg-zinc-600" />
          </div>

          {/* Campos de E-mail e Senha */}
          <div className="flex flex-col gap-4 mb-5">
            <Input
              type="email"
              value={email}
              onValueChange={setEmail}
              placeholder="seu@email.com"
              label="E-mail"
              variant="bordered"
              radius="md"
              size="lg"
            />
            <Input
              type="password"
              value={password}
              onValueChange={setPassword}
              placeholder="••••••••"
              label="Senha"
              variant="bordered"
              radius="md"
              size="lg"
            />
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 dark:bg-error/15 border border-red-200 dark:border-error/30 rounded-2xl p-3.5 mb-5 overflow-hidden"
            >
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Botão Entrar */}
          <motion.div whileTap={{ scale: 0.985 }}>
            <Button
              onPress={handleLogin}
              isLoading={loading}
              isDisabled={loading}
              fullWidth
              size="lg"
              radius="md"
              className="font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Entrar
            </Button>
          </motion.div>

          {/* Link Criar Conta */}
          <div className="mt-5 text-center">
            <Button
              onPress={() => navigate(ROUTES.AUTH_REGISTER)}
              variant="light"
              radius="md"
              className="text-gray-900 dark:text-text-primary font-semibold text-sm underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Criar Conta Gratuita
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-white/70 text-xs mt-6 select-none font-medium tracking-wide"
        >
          7 dias grátis do Premium • Sem cartão de crédito
        </motion.p>
      </motion.div>
    </div>
  );
};
