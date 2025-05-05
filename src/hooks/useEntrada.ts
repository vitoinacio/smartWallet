import toast from '@/components/ui/sonner';
import { setFinanceiroData } from '@/utils/cognito';
import { FormEvent, useState } from 'react';
import useTheme from './useTheme';

export function useEntrada() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [entrada, setEntrada] = useState<string>('0.00');

  const {theme} = useTheme()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    if (!entrada) {
      toast({
        title: 'Preencha a entrada!',
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
      const response = await setFinanceiroData({ entrada });

      if (response?.status === 200 || response?.status === 201) {
        toast({
          title: 'Entrada adicionada com sucesso!',
          position: 'bottom-right',
          type: 'success',
          autoClose: 3000, // 3 segundos
          theme: theme,
          hideProgressBar: false,
          pauseOnHover: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error,
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

  return { entrada, setEntrada, handleSubmit, isLoading };
}
