import { useEffect, useState } from 'react';
import toast from '@/components/ui/sonner';
import useTheme from './useTheme';
import { getDebitosData } from '@/service/api/debitos';
import { DataInfoDebitoType } from '@/types/DebitosTypes';

const useGetDebitosForm = () => {
  const [debitosList, setDebitosList] = useState<DataInfoDebitoType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchDebitos = async () => {
      try {
        setIsLoading(true);
        const response = await getDebitosData();
        setDebitosList(response.data);
      } catch {
        setIsLoading(false);
        toast({
          title: 'Erro',
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
    fetchDebitos();
  }, [theme]);

  return {
    debitosList,
    isLoading,
  };
};

export default useGetDebitosForm;
