import { useState, useEffect, useCallback } from 'react';
import toast from '@/components/ui/sonner';
import useTheme from '@/core/viewModels/useTheme';
import {
  getDebitosData,
  setDebitosData,
  deleteDebitosData,
} from '@/core/services/api/debitos';
import {
  Transacao,
  TransacaoFormData,
  TipoTransacao,
  StatusPagamento,
} from '../models';

const mapearStatus = (pago: boolean, dataVenc: string): StatusPagamento => {
  if (pago) return 'pago';
  const hoje = new Date();
  const vencimento = new Date(dataVenc);
  return vencimento < hoje ? 'vencido' : 'pendente';
};

export function useTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const buscarTransacoes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getDebitosData();
      
      const transacoesMapeadas: Transacao[] = response.data.map((item) => ({
        id: item.id_deb,
        descricao: item.identificacao,
        valor: parseFloat(item.valor) || 0,
        tipo: 'despesa' as TipoTransacao,
        categoria: 'contas',
        data: item.datavenc,
        status: mapearStatus(item.pago, item.datavenc),
        observacao: item.observacao,
        notificar: item.notificacao,
      }));
      
      setTransacoes(transacoesMapeadas);
    } catch {
      toast({
        title: 'Erro ao buscar transações',
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000,
        theme,
      });
    } finally {
      setIsLoading(false);
    }
  }, [theme]);

  useEffect(() => {
    buscarTransacoes();
  }, [buscarTransacoes]);

  const criarTransacao = async (data: TransacaoFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      await setDebitosData({
        title: data.descricao,
        valor: data.valor,
        data: data.data,
        notifi: data.notificar,
        obs: data.observacao || '',
      });

      toast({
        title: 'Transação adicionada com sucesso!',
        position: 'bottom-right',
        type: 'success',
        autoClose: 3000,
        theme,
      });

      await buscarTransacoes();
    } catch {
      const message = 'Erro ao adicionar transação';
      setError(message);
      toast({
        title: message,
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000,
        theme,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const excluirTransacao = async (id: number) => {
    setIsLoading(true);

    try {
      await deleteDebitosData(id);
      
      toast({
        title: 'Transação excluída com sucesso!',
        position: 'bottom-right',
        type: 'success',
        autoClose: 3000,
        theme,
      });

      await buscarTransacoes();
    } catch {
      toast({
        title: 'Erro ao excluir transação',
        position: 'bottom-right',
        type: 'error',
        autoClose: 3000,
        theme,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    transacoes,
    isLoading,
    error,
    criarTransacao,
    excluirTransacao,
    buscarTransacoes,
  };
}