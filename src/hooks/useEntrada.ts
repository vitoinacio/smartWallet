import { FormEvent, useEffect, useState } from 'react';
import useTheme from './useTheme';
import { getFinanceiro, setDashboardData } from '@/service/api/dashboard';
import { Response } from '@/types/DashboardTypes';

export function useEntrada() {
  const [isLoading, setIsLoading] = useState(false);
  const [entrada, setEntrada] = useState<string>('');
  const { theme } = useTheme();

  useEffect(()=>{
    const getFinanceiroData = async () => {
      try {
        setIsLoading(true)
        const response : Response = await getFinanceiro(theme)
        setEntrada(response.data[0].entrada)
      } catch {
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    getFinanceiroData()
  },[theme])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!entrada.trim()) return;

    try {
      setIsLoading(true);
      await setDashboardData({ entrada, theme });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    entrada,
    setEntrada,
    handleSubmit,
    isLoading,
  };
}