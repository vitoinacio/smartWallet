import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '@/utils/cognito';
import { toast } from 'sonner';

export function useSignupPage() {
  const [nome, setNome] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [dataNasc, setDataNasc] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [bairro, setBairro] = useState<string>('');
  const [rua, setRua] = useState<string>('');
  const [numeroCasa, setNumeroCasa] = useState<string>('');
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Clear previous error message before submitting
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await createAccount({
        nome,
        sexo,
        email,
        senha,
        dataNasc,
        cpf,
        tel,
        cep,
        cidade,
        bairro,
        rua,
        numeroCasa,
      });

      toast('Cadastro realizado', {
        description: 'Seu cadastro foi criado com sucesso!',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorType = err.response?.data.__type;
      let message = 'Erro ao criar a conta.';

      // Custom error messages based on error type
      if (errorType === 'LimitExceededException') {
        message = 'Você excedeu o número de tentativas. Tente novamente mais tarde.';
      } else if (errorType === 'InvalidParameterException' && err.response?.data.message === 'nome should be an email.') {
        message = 'O campo nome deve ser um e-mail válido.';
      } else if (errorType === 'nomeExistsException') {
        message = 'O e-mail informado já está registrado.';
      } else if (errorType === 'UserLambdaValidationException') {
        message = 'Não é possível criar este usuário.';
      }

      setErrorMessage(message);
      toast.error(message); // Show error toast
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
    cpf,
    setCpf,
    tel,
    setTel,
    cep,
    setCep,
    cidade,
    setCidade,
    bairro,
    setBairro,
    rua,
    setRua,
    numeroCasa,
    setNumeroCasa,
    isTermsAccepted,
    setIsTermsAccepted,
    isLoading,
    errorMessage,
    handleSubmit,
  };
}
