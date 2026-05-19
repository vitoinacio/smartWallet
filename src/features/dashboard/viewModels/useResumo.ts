import { useMemo } from 'react';
import { DashboardResumo, TransacaoRecente } from '../models';

interface UseResumoParams {
  entrada: number;
  transacoes: TransacaoRecente[];
}

export function useResumo({ entrada, transacoes }: UseResumoParams): DashboardResumo {
  return useMemo(() => {
    const saida = transacoes
      .filter((t) => t.tipo === 'despesa' && t.status === 'pago')
      .reduce((acc, t) => acc + t.valor, 0);

    const restante = entrada - saida;
    const percentualGasto = entrada > 0 ? (saida / entrada) * 100 : 0;

    return {
      entrada,
      saida,
      restante,
      percentualGasto: Math.min(percentualGasto, 100),
    };
  }, [entrada, transacoes]);
}