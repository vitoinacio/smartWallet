import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/sonner';
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
      toast.error('Erro ao buscar transações');
    } finally {
      setIsLoading(false);
    }
  }, []);

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

      toast.success('Transação adicionada com sucesso!');

      await buscarTransacoes();
    } catch {
      const message = 'Erro ao adicionar transação';
      setError(message);
      toast.error('Erro ao adicionar transação');
    } finally {
      setIsLoading(false);
    }
  };

  const excluirTransacao = async (id: number) => {
    setIsLoading(true);

    try {
      await deleteDebitosData(id);
      
      toast.success('Transação excluída com sucesso!');

      await buscarTransacoes();
    } catch {
      toast.error('Erro ao excluir transação');
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