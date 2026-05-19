import { useState, useEffect } from 'react';
import { TransacaoRecente } from '../models';
import { getDebitosData } from '@/core/services/api/debitos';

export function useTransacoesRecentes(limite: number = 5) {
  const [transacoes, setTransacoes] = useState<TransacaoRecente[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const buscarTransacoes = async () => {
      try {
        setIsLoading(true);
        const response = await getDebitosData();

        const transacoesMapeadas: TransacaoRecente[] = response.data
          .slice(0, limite)
          .map((item) => ({
            id: item.id_deb,
            descricao: item.identificacao,
            valor: parseFloat(item.valor) || 0,
            tipo: 'despesa' as const,
            data: item.datavenc,
            status: item.pago ? 'pago' as const : 'pendente' as const,
          }));

        setTransacoes(transacoesMapeadas);
      } catch {
        setTransacoes([]);
      } finally {
        setIsLoading(false);
      }
    };

    buscarTransacoes();
  }, [limite]);

  return { transacoes, isLoading };
}