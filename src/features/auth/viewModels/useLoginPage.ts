import { login } from '@/core/utils/cognito';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/sonner';
import { getRedirectAfterLogin } from '@/core/utils/redirectAfterLogin';

export function useLoginPage() {
  const { t } = useTranslation('auth');
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
      toast.error(t('login.preenchaCampos'));
      setIsLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      toast.error(t('login.emailInvalido'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await login({ email, senha });
      if (response?.status === 200 || response?.status === 201) {
        sessionStorage.setItem('UserProvider', email);
        toast.success(t('login.sucesso'));
        navigate(getRedirectAfterLogin());
      }
    } catch (error: unknown) {
      const err = error as { message?: string }
      const errorMessage = err?.message || t('login.erro');
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, senha, setSenha, handleSubmit, isLoading };
}