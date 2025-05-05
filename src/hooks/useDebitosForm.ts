import { useState, FormEvent } from 'react';
import toast from '@/components/ui/sonner';
import useTheme from './useTheme';
import { setDebitosData } from '@/service/api/debitos';

export function useDebitosForm() {
  const [title, setTitle] = useState<string>('');
  const [valor, setValor] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [notifi, setNotifi] = useState<string>('');
  const [obs, setObs] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {theme} = useTheme()

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
      const response = await setDebitosData({
        title,
        valor,
        data,
        notifi: notifi === 'Sim' ? true : false,
        obs: obs || '',
      });

      if (response?.status === 200 || response?.status === 201) {
        toast({
          title: 'Debito adicionado com sucesso!',
          position: 'bottom-right',
          type: 'success',
          autoClose: 3000,
          theme: theme,
          hideProgressBar: false,
          pauseOnHover: true,
          closeOnClick: true,
          draggable: true,
        });
      } else {
        toast({
          title: 'Erro ao adicionar o debito, Tente novamente!',
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
      let message = 'Erro inesperado ao adicionar o debito.';

      switch (errorType) {
        case 'LimitExceededException':
          message = 'Você excedeu o número de tentativas. Tente novamente mais tarde.';
          break;
        case 'InvalidParameterException':
          message = 'Parâmetro inválido. Verifique os dados e tente novamente.';
          break;
        default:
          message = 'Erro ao tentar adicionar o debito.';
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