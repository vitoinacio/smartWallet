import { useMemo } from 'react';
import { Transacao, ResumoFinanceiro } from '../models';

export function useResumo(transacoes: Transacao[]): ResumoFinanceiro {
  return useMemo(() => {
    const receitas = transacoes
      .filter((t) => t.tipo === 'receita' && t.status === 'pago')
      .reduce((acc, t) => acc + t.valor, 0);

    const despesas = transacoes
      .filter((t) => t.tipo === 'despesa' && t.status === 'pago')
      .reduce((acc, t) => acc + t.valor, 0);

    const pendentes = transacoes.filter(
      (t) => t.tipo === 'despesa' && t.status === 'pendente'
    ).length;

    const vencidas = transacoes.filter(
      (t) => t.tipo === 'despesa' && t.status === 'vencido'
    ).length;

    return {
      totalReceitas: receitas,
      totalDespesas: despesas,
      saldo: receitas - despesas,
      transacoesPendentes: pendentes,
      transacoesVencidas: vencidas,
    };
  }, [transacoes]);
}