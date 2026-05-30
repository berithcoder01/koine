import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@heroui/react';
import { ROUTES } from '@/constants/routes';
import { signUpWithEmail } from '@/services/auth';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signUpWithEmail(email, password, name);
      navigate(ROUTES.TRAIL);
    } catch (err: any) {
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
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-primary px-6 pt-12 pb-8">
        <p className="greek-text text-secondary text-4xl font-bold mb-1">Κοινή</p>
        <p className="text-white/70 text-sm">Crie sua conta</p>
      </div>

      <div className="flex-1 px-6 py-8 animate-fadeIn">
        {error && (
          <div className="bg-danger-50 border border-danger rounded-xl p-3 mb-4">
            <p className="text-danger text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-4 mb-6">
          <Input
            type="text"
            value={name}
            onValueChange={setName}
            placeholder="Seu nome"
            label="Nome"
            variant="bordered"
            radius="lg"
            size="lg"
          />
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
            placeholder="Mínimo 6 caracteres"
            label="Senha"
            variant="bordered"
            radius="lg"
            size="lg"
          />
        </div>

        <Button
          onPress={handleRegister}
          isLoading={loading}
          isDisabled={loading}
          fullWidth
          size="lg"
          color="primary"
          radius="lg"
          className="font-semibold"
        >
          Criar Conta
        </Button>

        <p className="text-center text-textSecondary text-sm mt-4">
          7 dias grátis do Premium • Sem cartão de crédito
        </p>

        <div className="mt-6 text-center">
          <Button
            onPress={() => navigate(ROUTES.AUTH_LOGIN)}
            variant="light"
            color="primary"
            size="sm"
          >
            Já tem uma conta? Entrar
          </Button>
        </div>
      </div>
    </div>
  );
};
