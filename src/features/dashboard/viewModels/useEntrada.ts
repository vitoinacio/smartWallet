import { useState, useEffect, useCallback } from 'react';
import toast from '@/components/ui/sonner';
import useTheme from '@/core/viewModels/useTheme';
import { getFinanceiro, setDashboardData } from '@/core/services/api/dashboard';
import { DashboardEntrada } from '../models';

export function useEntrada() {
  const [entrada, setEntradaState] = useState<DashboardEntrada>({ valor: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { theme } = useTheme();

  const buscarEntrada = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getFinanceiro(theme);
      const valor = response.data[0]?.entrada || '0';
      setEntradaState({ valor });
    } catch {
      setEntradaState({ valor: '0' });
    } finally {
      setIsLoading(false);
    }
  }, [theme]);

  useEffect(() => {
    buscarEntrada();
  }, [buscarEntrada]);

  const setEntrada = (valor: string) => {
    setEntradaState({ valor });
  };

  const atualizarEntrada = async (novoValor: string) => {
    if (!novoValor.trim()) return;

    try {
      setIsLoading(true);
      await setDashboardData({ entrada: novoValor, theme });
      
      toast({
        title: 'Entrada atualizada com sucesso!',
        position: 'bottom-right',
        type: 'success',
        autoClose: 3000,
        theme,
      });

      setEntradaState({ valor: novoValor });
      setIsEditing(false);
    } catch {
      toast({
        title: 'Erro ao atualizar entrada',
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000,
        theme,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const iniciarEdicao = () => setIsEditing(true);
  const cancelarEdicao = () => {
    setIsEditing(false);
    setEntradaState((prev) => ({ ...prev }));
  };

  return {
    entrada,
    isLoading,
    isEditing,
    setEntrada,
    atualizarEntrada,
    iniciarEdicao,
    cancelarEdicao,
    buscarEntrada,
  };
}