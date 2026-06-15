import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Button } from '@/ui/components';
import { ROUTES } from '@/core/constants/routes';
import { signUpWithEmail } from '@/features/auth/auth';
import { isValidEmail, isValidPassword } from '@/core/utils/validators';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    console.log('[Register] handleRegister called, name:', name, 'email:', email);
    if (!name || !email || !password) {
      console.log('[Register] validation failed: empty fields');
      setError('Preencha todos os campos');
      return;
    }
    if (!isValidEmail(email)) {
      console.log('[Register] validation failed: invalid email');
      setError('E-mail inválido');
      return;
    }
    if (!isValidPassword(password)) {
      console.log('[Register] validation failed: invalid password');
      setError('A senha deve ter 8+ caracteres, 1 maiúscula e 1 número');
      return;
    }
    setLoading(true);
    setError('');
    try {
      console.log('[Register] calling signUpWithEmail...');
      await signUpWithEmail(email.trim().toLowerCase(), password, name.trim());
      console.log('[Register] signUpWithEmail succeeded, navigating');
      navigate(ROUTES.TRAIL);
    } catch (err: any) {
      console.error('[Register] signUpWithEmail threw:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso');
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 relative overflow-hidden select-none font-ui" style={{ backgroundColor: '#EFE3C4' }}>
      {/* Detalhes estéticos de fundo sutil */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[60%] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'rgba(38, 66, 42, 0.05)' }} />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[60%] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'rgba(38, 66, 42, 0.05)' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto z-10"
      >
        {/* Logotipo Centralizado Premium */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block"
          >
            <span className="greek-text text-text-primary text-5xl font-bold tracking-wide select-none filter drop-shadow-sm">
              Κοινή
            </span>
          </motion.div>
          <p className="text-text-secondary text-sm font-medium mt-2 tracking-wide">
            Estude o Novo Testamento no idioma original
          </p>
        </div>

        {/* Card do Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="bg-surface border border-border/40 dark:border-border/10 rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] backdrop-blur-sm"
        >
          <h2 className="text-text-primary text-xl font-bold mb-5 select-none tracking-tight">
            Crie sua conta
          </h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-error/10 border border-error/20 rounded-2xl p-3.5 mb-5 overflow-hidden"
            >
              <p className="text-error-text dark:text-error text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <div className="flex flex-col gap-4 mb-6">
            <Input
              type="text"
              value={name}
              onValueChange={setName}
              placeholder="Seu nome"
              label="Nome"
              variant="bordered"
              radius="md"
              size="lg"
            />
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
              placeholder="Mínimo 8 caracteres, 1 maiúscula e 1 número"
              label="Senha"
              variant="bordered"
              radius="md"
              size="lg"
            />
          </div>

          <motion.div whileTap={{ scale: 0.985 }}>
            <Button
              onPress={handleRegister}
              isLoading={loading}
              isDisabled={loading}
              fullWidth
              size="lg"
              color="primary"
              radius="md"
              className="font-bold text-white dark:text-gray-900 hover:opacity-95 transition-opacity"
              style={{ backgroundColor: '#26422A' }}
            >
              Criar Conta
            </Button>
          </motion.div>

          <div className="mt-6 text-center">
            <Button
              onPress={() => navigate(ROUTES.AUTH_LOGIN)}
              variant="light"
              radius="md"
              className="font-semibold text-sm underline underline-offset-4 hover:opacity-80 transition-opacity text-text-primary"
            >
              Já tem uma conta? Entrar
            </Button>
          </div>
        </motion.div>

        {/* Footer com informações do Premium */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-xs mt-6 select-none font-medium tracking-wide text-text-secondary/60"
        >
          7 dias grátis do Premium • Sem cartão de crédito
        </motion.p>
      </motion.div>
    </div>
  );
};
