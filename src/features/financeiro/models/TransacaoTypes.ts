export type TipoTransacao = 'receita' | 'despesa';

export type StatusPagamento = 'pago' | 'pendente' | 'vencido';

export interface Categoria {
  id: string;
  nome: string;
  icone: string;
  cor: string;
}

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoria: string;
  data: string;
  status: StatusPagamento;
  observacao?: string;
  notificar: boolean;
}

export interface TransacaoFormData {
  descricao: string;
  valor: string;
  tipo: TipoTransacao;
  categoria: string;
  data: string;
  observacao?: string;
  notificar: boolean;
}

export interface FiltrosTransacao {
  periodo: 'semana' | 'mes' | 'ano' | 'custom';
  tipo?: TipoTransacao;
  categoria?: string;
  dataInicio?: string;
  dataFim?: string;
}

export interface ResumoFinanceiro {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  transacoesPendentes: number;
  transacoesVencidas: number;
}

export const CATEGORIAS: Categoria[] = [
  { id: 'salario', nome: 'Salário', icone: 'Briefcase', cor: 'bg-green-500' },
  { id: 'investimento', nome: 'Investimento', icone: 'TrendingUp', cor: 'bg-blue-500' },
  { id: 'freelance', nome: 'Freelance', icone: 'Laptop', cor: 'bg-cyan-500' },
  { id: 'outros_receita', nome: 'Outros', icone: 'PlusCircle', cor: 'bg-emerald-500' },
  { id: 'alimentacao', nome: 'Alimentação', icone: 'Coffee', cor: 'bg-orange-500' },
  { id: 'transporte', nome: 'Transporte', icone: 'Car', cor: 'bg-yellow-500' },
  { id: 'moradia', nome: 'Moradia', icone: 'Home', cor: 'bg-purple-500' },
  { id: 'lazer', nome: 'Lazer', icone: 'Gamepad2', cor: 'bg-pink-500' },
  { id: 'saude', nome: 'Saúde', icone: 'Heart', cor: 'bg-red-500' },
  { id: 'educacao', nome: 'Educação', icone: 'GraduationCap', cor: 'bg-indigo-500' },
  { id: 'contas', nome: 'Contas Fixas', icone: 'Receipt', cor: 'bg-gray-500' },
  { id: 'outros_despesa', nome: 'Outros', icone: 'MoreHorizontal', cor: 'bg-zinc-500' },
];