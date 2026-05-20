import { login } from '@/core/utils/cognito';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

export function useLoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const navigate = useNavigate();

  const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email || !senha) {
      toast.error('Preencha todos os campos!');
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Por favor, insira um e-mail válido.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await login({
        email,
        senha,
      });

      if (response?.status === 200 || response?.status === 201) {
        sessionStorage.setItem('UserProvider', email);
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      const err = error as { message?: string }
      const errorMessage = err?.message || 'Erro ao tentar fazer login';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    senha,
    setSenha,
    handleSubmit,
    isLoading,
  };
}