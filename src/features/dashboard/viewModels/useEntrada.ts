import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/sonner';
import { getFinanceiro, setDashboardData } from '@/core/services/api/dashboard';
import { mockService } from '@/mocks/transacoes';
import { isTestUser } from '@/core/utils/isTestUser';
import { DashboardEntrada } from '../models';

export function useEntrada() {
  const [entrada, setEntradaState] = useState<DashboardEntrada>({ valor: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const buscarEntrada = useCallback(async () => {
    try {
      setIsLoading(true);

      if (isTestUser()) {
        const valor = mockService.getEntrada();
        setEntradaState({ valor });
        return;
      }

      const response = await getFinanceiro();
      const valor = response.data[0]?.entrada || '0';
      setEntradaState({ valor });
    } catch {
      setEntradaState({ valor: '0' });
    } finally {
      setIsLoading(false);
    }
  }, []);

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

      if (isTestUser()) {
        mockService.setEntrada(novoValor);
        toast.success('Entrada atualizada com sucesso!');
        setEntradaState({ valor: novoValor });
        setIsEditing(false);
        return;
      }

      await setDashboardData({ entrada: novoValor });
      
      toast.success('Entrada atualizada com sucesso!');

      setEntradaState({ valor: novoValor });
      setIsEditing(false);
    } catch {
      toast.error('Erro ao atualizar entrada');
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
