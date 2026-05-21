import { useState, useEffect } from 'react';
import { TransacaoRecente } from '../models';
import { getDebitosData } from '@/core/services/api/debitos';
import { mockService } from '@/mocks/transacoes';
import { isTestUser } from '@/core/utils/isTestUser';

export function useTransacoesRecentes(limite: number = 5) {
  const [transacoes, setTransacoes] = useState<TransacaoRecente[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const buscarTransacoes = async () => {
      try {
        setIsLoading(true);

        if (isTestUser()) {
          const recentes = mockService
            .getTransacoes()
            .slice(0, limite)
            .map((t) => ({
              id: t.id,
              descricao: t.descricao,
              valor: t.valor,
              tipo: t.tipo as 'receita' | 'despesa',
              categoria: t.categoria,
              data: t.data,
              status: t.status,
            }));
          setTransacoes(recentes);
          return;
        }

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
