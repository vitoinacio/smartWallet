import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDebitosData } from '@/utils/cognito';
import toast from '@/components/ui/sonner';

export function useDebitosForm() {
  const [title, setTitle] = useState<string>('');
  const [valor, setValor] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [notifi, setNotifi] = useState<string>('');
  const [obs, setObs] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setIsLoading(true);

    if (!title || !valor || !data || !notifi) {
      setErrorMessage('Todos os campos obrigatórios devem ser preenchidos.');
      toast({
        title: 'Todos os campos obrigatórios devem ser preenchidos.',
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000,
        theme: 'light',
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await setDebitosData({
        title,
        valor,
        data,
        notifi,
        obs: obs || '',
      });

      if (response?.status === 200 || response?.status === 201) {
        sessionStorage.setItem('UserProvider', title);
        toast({
          title: 'Dados financeiros enviados com sucesso!',
          position: 'bottom-right',
          type: 'success',
          autoClose: 3000,
          theme: 'light',
          hideProgressBar: false,
          pauseOnHover: true,
          closeOnClick: true,
          draggable: true,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Erro ao enviar os dados financeiros. Tente novamente.',
          position: 'bottom-right',
          type: 'error',
          autoClose: 3000,
          theme: 'light',
          hideProgressBar: false,
          pauseOnHover: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorType = err.response?.data.__type;
      let message = 'Erro inesperado ao enviar os dados financeiros.';

      switch (errorType) {
        case 'LimitExceededException':
          message = 'Você excedeu o número de tentativas. Tente novamente mais tarde.';
          break;
        case 'InvalidParameterException':
          message = 'Parâmetro inválido. Verifique os dados e tente novamente.';
          break;
        default:
          message = 'Erro ao tentar enviar os dados financeiros.';
          break;
      }

      setErrorMessage(message);
      toast({
        title: message,
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000,
        theme: 'light',
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
    title,
    setTitle,
    valor,
    setValor,
    data,
    setData,
    notifi,
    setNotifi,
    obs,
    setObs,
    isLoading,
    errorMessage,
    handleSubmit,
  };
}