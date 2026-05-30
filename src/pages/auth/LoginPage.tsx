import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Divider } from '@/components/ui';
import { ROUTES } from '@/constants/routes';
import { signInWithEmail, signInWithGoogle } from '@/services/auth';

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
    setLoading(true);
    setError('');
    try {
      await signInWithEmail(email, password);
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
    } catch {
      setError('Erro ao entrar com Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-primary px-6 pt-12 pb-8">
        <p className="greek-text text-secondary text-4xl font-bold mb-1">Κοινή</p>
        <p className="text-white/70 text-sm">Bem-vindo de volta</p>
      </div>

      <div className="flex-1 px-6 py-8 animate-fadeIn">
        {error && (
          <div className="bg-danger-50 border border-danger rounded-xl p-3 mb-4">
            <p className="text-danger text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-4 mb-6">
          <Input
            type="email"
            value={email}
            onValueChange={setEmail}
            placeholder="seu@email.com"
            label="E-mail"
            variant="bordered"
            radius="lg"
            size="lg"
          />
          <Input
            type="password"
            value={password}
            onValueChange={setPassword}
            placeholder="••••••••"
            label="Senha"
            variant="bordered"
            radius="lg"
            size="lg"
          />
        </div>

        <Button
          onPress={handleLogin}
          isLoading={loading}
          isDisabled={loading}
          fullWidth
          size="lg"
          color="primary"
          radius="lg"
          className="font-semibold"
        >
          Entrar
        </Button>

        <div className="flex items-center gap-3 my-6">
          <Divider className="flex-1" />
          <span className="text-text-secondary text-sm">ou</span>
          <Divider className="flex-1" />
        </div>

        <Button
          onPress={handleGoogleLogin}
          isDisabled={loading}
          variant="bordered"
          fullWidth
          size="lg"
          radius="lg"
          className="font-semibold"
          startContent={<span className="text-xl">G</span>}
        >
          Entrar com Google
        </Button>

        <div className="mt-4">
          <Button
            onPress={() => navigate(ROUTES.AUTH_REGISTER)}
            variant="bordered"
            color="primary"
            fullWidth
            size="lg"
            radius="lg"
            className="font-semibold"
          >
            Criar Conta Gratuita
          </Button>
        </div>

        <p className="text-center text-text-secondary text-sm mt-4">
          7 dias grátis do Premium • Sem cartão de crédito
        </p>
      </div>
    </div>
  );
};
