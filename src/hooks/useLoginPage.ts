import toast from '@/components/ui/sonner';
import { login } from '@/utils/cognito';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from './useTheme';

export function useLoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const {theme} = useTheme()

  const navigate = useNavigate();

  const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email || !senha) {
      toast({
        title: 'Preencha todos os campos!',
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000, // 3 segundos
        theme: theme,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
      });
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: 'Por favor, insira um e-mail válido.',
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000, // 3 segundos
        theme: theme,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
      });
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
        toast({
          title: 'Login realizado com sucesso!',
          position: 'bottom-right',
          type: 'success',
          autoClose: 3000, // 3 segundos
          theme: theme,
          hideProgressBar: false,
          pauseOnHover: true,
          closeOnClick: true,
          draggable: true,
        });
        navigate('/dashboard');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Aqui você captura o erro e exibe a mensagem de erro no toast
      const errorMessage = error?.message || 'Erro ao tentar fazer login';
      toast({
        title: errorMessage,
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000, // 3 segundos
        theme: theme,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
      });
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