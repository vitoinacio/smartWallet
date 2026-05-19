export interface DashboardEntrada {
  valor: string;
  dataAtualizacao?: string;
}

export interface DashboardResumo {
  entrada: number;
  saida: number;
  restante: number;
  percentualGasto: number;
}

export interface TransacaoRecente {
  id: number;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  data: string;
  status: 'pago' | 'pendente' | 'vencido';
}

export interface DadosGrafico {
  mes: string;
  receitas: number;
  despesas: number;
}

export type PeriodoSelecionado = 'semana' | 'mes' | 'trimestre' | 'ano';

export interface DashboardState {
  entrada: DashboardEntrada;
  resumo: DashboardResumo;
  transacoesRecentes: TransacaoRecente[];
  grafico: DadosGrafico[];
  isLoading: boolean;
  erro: string | null;
}