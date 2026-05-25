import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createAccount } from '@/core/utils/cognito';
import { toast } from '@/components/ui/sonner';
import { getRedirectAfterLogin } from '@/core/utils/redirectAfterLogin';

export function useSignupPage() {
  const { t } = useTranslation('auth');
  const [nome, setNome] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [dataNasc, setDataNasc] = useState<string>('');
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    if (!nome || !email || !senha || !sexo || !dataNasc) {
      setErrorMessage(t('cadastro.camposObrigatorios'));
      toast.error(t('cadastro.camposObrigatorios'));
      setIsLoading(false);
      return;
    }
    if (!isTermsAccepted) {
      setErrorMessage(t('cadastro.aceitarTermosErro'));
      toast.error(t('cadastro.aceitarTermosToast'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await createAccount({ nome, sexo, email, senha, dataNasc });
      if (response?.status === 200 || response?.status === 201) {
        sessionStorage.setItem('UserProvider', email);
        toast.success(t('cadastro.sucesso'));
        navigate(getRedirectAfterLogin());
      } else {
        toast.error(t('cadastro.erro'));
      }
    } catch {
      // error já tratado no fluxo da UI
    } finally {
      setIsLoading(false);
    }
  };

  return { nome, setNome, senha, setSenha, email, setEmail, sexo, setSexo,
    dataNasc, setDataNasc, isTermsAccepted, setIsTermsAccepted, isLoading, errorMessage, handleSubmit };
}