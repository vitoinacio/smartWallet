import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '@/core/utils/cognito';
import { toast } from '@/components/ui/sonner';

export function useSignupPage() {
  const [nome, setNome] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [dataNasc, setDataNasc] = useState<string>('');
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const getRedirectAfterLogin = (): string => {
    const saved = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin');
    return saved || '/dashboard';
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    if (!nome || !email || !senha || !sexo || !dataNasc) {
      setErrorMessage('Todos os campos são obrigatórios.');
      toast.error('Todos os campos são obrigatórios.');
      setIsLoading(false);
      return;
    }
    if (!isTermsAccepted) {
      setErrorMessage('Você precisa aceitar os termos para continuar.');
      toast.error('Por favor, aceite os termos.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await createAccount({ nome, sexo, email, senha, dataNasc });
      if (response?.status === 200 || response?.status === 201) {
        sessionStorage.setItem('UserProvider', email);
        toast.success('Cadastro realizado com sucesso!');
        navigate(getRedirectAfterLogin());
      } else {
        toast.error('Erro ao criar o usuário. Tente novamente.');
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