export interface Budget {
  id: string;
  categoria: string;
  limite: number;
  mes: string; // YYYY-MM
}

export interface BudgetProgress {
  categoria: string;
  limite: number;
  gasto: number;
  percentual: number;
  status: 'ok' | 'warning' | 'excedido';
}

export interface MetaEconomia {
  percentual: number; // 0-100
  valorAlvo: number;
}
