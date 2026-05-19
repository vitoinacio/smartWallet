import { useState, useMemo, useCallback } from 'react';
import { Transacao, FiltrosTransacao, TipoTransacao } from '../models';

export function useFiltros(transacoes: Transacao[]) {
  const [filtros, setFiltros] = useState<FiltrosTransacao>({
    periodo: 'mes',
    tipo: undefined,
    categoria: undefined,
  });

  const definirPeriodo = useCallback((periodo: FiltrosTransacao['periodo']) => {
    setFiltros((prev) => ({ ...prev, periodo }));
  }, []);

  const filtrarPorTipo = useCallback((tipo: TipoTransacao | undefined) => {
    setFiltros((prev) => ({ ...prev, tipo }));
  }, []);

  const filtrarPorCategoria = useCallback((categoria: string | undefined) => {
    setFiltros((prev) => ({ ...prev, categoria }));
  }, []);

  const transacoesFiltradas = useMemo(() => {
    let resultado = [...transacoes];

    const hoje = new Date();
    let dataInicio: Date;

    switch (filtros.periodo) {
      case 'semana':
        dataInicio = new Date(hoje.setDate(hoje.getDate() - 7));
        break;
      case 'mes':
        dataInicio = new Date(hoje.setMonth(hoje.getMonth() - 1));
        break;
      case 'ano':
        dataInicio = new Date(hoje.setFullYear(hoje.getFullYear() - 1));
        break;
      case 'custom':
        dataInicio = filtros.dataInicio
          ? new Date(filtros.dataInicio)
          : new Date(0);
        break;
      default:
        dataInicio = new Date(0);
    }

    resultado = resultado.filter(
      (t) => new Date(t.data) >= dataInicio
    );

    if (filtros.tipo) {
      resultado = resultado.filter((t) => t.tipo === filtros.tipo);
    }

    if (filtros.categoria) {
      resultado = resultado.filter((t) => t.categoria === filtros.categoria);
    }

    return resultado.sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );
  }, [transacoes, filtros]);

  const limparFiltros = useCallback(() => {
    setFiltros({ periodo: 'mes', tipo: undefined, categoria: undefined });
  }, []);

  return {
    filtros,
    transacoesFiltradas,
    definirPeriodo,
    filtrarPorTipo,
    filtrarPorCategoria,
    limparFiltros,
  };
}