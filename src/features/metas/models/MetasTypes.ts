export interface MetaEconomia {
  id: string;
  nome: string;
  valorAlvo: number;
  valorAtual: number;
  mes: string;
  tipo: 'mensal' | 'anual';
  categoria?: string;
  ativa: boolean;
}

export interface EconomiaProgress {
  meta: MetaEconomia;
  percentual: number;
  restante: number;
  status: 'ok' | 'warning' | 'atingida';
}
