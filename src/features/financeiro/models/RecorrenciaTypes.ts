export type FrequenciaRecorrencia = 'semanal' | 'mensal' | 'trimestral' | 'anual';

export interface RecorrenciaTemplate {
  id: string;
  nome: string;
  descricao: string;
  valorSugerido: number;
  categoria: string;
  frequencia: FrequenciaRecorrencia;
  diaVencimento: number;
  icone: string;
}

export interface Recorrencia {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  frequencia: FrequenciaRecorrencia;
  diaVencimento: number; // 1-31
  dataInicio: string; // YYYY-MM-DD
  dataFim?: string; // YYYY-MM-DD (opcional)
  ativa: boolean;
  observacao?: string;
  notificar: boolean;
  templateId?: string;
}

export interface InstanciaRecorrencia {
  id: number;
  recorrenciaId: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: string;
  status: 'pago' | 'pendente' | 'vencido';
  observacao?: string;
  notificar: boolean;
  geradaAutomaticamente: boolean;
}

export const TEMPLATES_RECURRENCIA: RecorrenciaTemplate[] = [
  { id: 'netflix', nome: 'Netflix', descricao: 'Streaming de vídeo', valorSugerido: 39.90, categoria: 'lazer', frequencia: 'mensal', diaVencimento: 15, icone: 'MonitorPlay' },
  { id: 'spotify', nome: 'Spotify', descricao: 'Streaming de música', valorSugerido: 21.90, categoria: 'lazer', frequencia: 'mensal', diaVencimento: 10, icone: 'Music' },
  { id: 'aluguel', nome: 'Aluguel', descricao: 'Aluguel mensal', valorSugerido: 1500, categoria: 'moradia', frequencia: 'mensal', diaVencimento: 1, icone: 'Home' },
  { id: 'condominio', nome: 'Condomínio', descricao: 'Taxa condominial', valorSugerido: 400, categoria: 'moradia', frequencia: 'mensal', diaVencimento: 10, icone: 'Building' },
  { id: 'internet', nome: 'Internet', descricao: 'Plano de internet', valorSugerido: 120, categoria: 'contas', frequencia: 'mensal', diaVencimento: 15, icone: 'Wifi' },
  { id: 'energia', nome: 'Energia', descricao: 'Conta de luz', valorSugerido: 180, categoria: 'contas', frequencia: 'mensal', diaVencimento: 20, icone: 'Zap' },
  { id: 'agua', nome: 'Água', descricao: 'Conta de água', valorSugerido: 90, categoria: 'contas', frequencia: 'mensal', diaVencimento: 25, icone: 'Droplets' },
  { id: 'saude', nome: 'Plano de Saúde', descricao: 'Mensalidade saúde', valorSugerido: 400, categoria: 'saude', frequencia: 'mensal', diaVencimento: 5, icone: 'Heart' },
  { id: 'academia', nome: 'Academia', descricao: 'Mensalidade academia', valorSugerido: 100, categoria: 'saude', frequencia: 'mensal', diaVencimento: 1, icone: 'Dumbbell' },
  { id: 'salario', nome: 'Salário', descricao: 'Salário mensal', valorSugerido: 5000, categoria: 'salario', frequencia: 'mensal', diaVencimento: 1, icone: 'Briefcase' },
];
