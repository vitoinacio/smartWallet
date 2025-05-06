import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '@/utils/cognito';
import toast from '@/components/ui/sonner';
import useTheme from './useTheme';

export function useSignupPage() {
  const [nome, setNome] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [dataNasc, setDataNasc] = useState<string>('');
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {theme} = useTheme()

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setIsLoading(true);

    // Validação dos campos obrigatórios
    if (!nome || !email || !senha || !sexo || !dataNasc) {
      setErrorMessage('Todos os campos são obrigatórios.');
      toast({
        title: 'Todos os campos são obrigatórios.',
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000,
        theme: theme,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
      });
      setIsLoading(false);
      return;
    }

    if (!isTermsAccepted) {
      setErrorMessage('Você precisa aceitar os termos para continuar.');
      toast({
        title: 'Por favor, aceite os termos.',
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000,
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
      const response = await createAccount({
        nome,
        sexo,
        email,
        senha,
        dataNasc,
      });

      if (response?.status === 200 || response?.status === 201) {
        sessionStorage.setItem('UserProvider', email);
        toast({
          title: 'Cadastro realizado com sucesso!',
          position: 'bottom-right',
          type: 'success',
          autoClose: 3000,
          theme: theme,
          hideProgressBar: false,
          pauseOnHover: true,
          closeOnClick: true,
          draggable: true,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Erro ao criar o usuário. Tente novamente.',
          position: 'bottom-right',
          type: 'error',
          autoClose: 3000,
          theme: theme,
          hideProgressBar: false,
          pauseOnHover: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorType = err.response?.data.__type;
      let message = 'Erro ao criar a conta.';

      switch (errorType) {
        case 'LimitExceededException':
          message = 'Você excedeu o número de tentativas. Tente novamente mais tarde.';
          break;
        case 'InvalidParameterException':
          if (err.response?.data.message === 'nome should be an email.') {
            message = 'O campo nome deve ser um e-mail válido.';
          }
          break;
        case 'nomeExistsException':
          message = 'O e-mail informado já está registrado.';
          break;
        case 'UserLambdaValidationException':
          message = 'Não é possível criar este usuário.';
          break;
        default:
          message = 'Erro inesperado ao criar a conta.';
          break;
      }

      setErrorMessage(message);
      toast({
        title: message,
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000,
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
    nome,
    setNome,
    senha,
    setSenha,
    email,
    setEmail,
    sexo,
    setSexo,
    dataNasc,
    setDataNasc,
    isTermsAccepted,
    setIsTermsAccepted,
    isLoading,
    errorMessage,
    handleSubmit,
  };
}