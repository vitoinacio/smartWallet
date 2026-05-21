import { Transacao } from '@/features/financeiro/models';

const MOCK_STORAGE_KEY = 'smartwallet_mock_transacoes';
const MOCK_ENTRADA_KEY = 'smartwallet_mock_entrada';

const hoje = new Date();
const mesAtual = hoje.getMonth();
const anoAtual = hoje.getFullYear();

function data(offsetDias: number): string {
  const d = new Date(anoAtual, mesAtual, 1 + offsetDias);
  return d.toISOString().split('T')[0];
}

const transacoesIniciais: Transacao[] = [
  { id: 1, descricao: 'Salário - Desenvolvedor', valor: 8500, tipo: 'receita', categoria: 'salario', data: data(1), status: 'pago', notificar: false },
  { id: 2, descricao: 'Freelance - App Mobile', valor: 3200, tipo: 'receita', categoria: 'freelance', data: data(5), status: 'pago', notificar: false },
  { id: 3, descricao: 'Dividendos - Ações', valor: 450, tipo: 'receita', categoria: 'investimento', data: data(10), status: 'pago', notificar: false },
  { id: 4, descricao: 'Aluguel', valor: 1800, tipo: 'despesa', categoria: 'moradia', data: data(1), status: 'pago', notificar: true },
  { id: 5, descricao: 'Condomínio', valor: 450, tipo: 'despesa', categoria: 'moradia', data: data(5), status: 'pago', notificar: true },
  { id: 6, descricao: 'Supermercado', valor: 680, tipo: 'despesa', categoria: 'alimentacao', data: data(3), status: 'pago', notificar: false },
  { id: 7, descricao: 'Restaurante', valor: 120, tipo: 'despesa', categoria: 'alimentacao', data: data(8), status: 'pago', notificar: false },
  { id: 8, descricao: 'iFood', valor: 85, tipo: 'despesa', categoria: 'alimentacao', data: data(12), status: 'pendente', notificar: false },
  { id: 9, descricao: 'Combustível', valor: 250, tipo: 'despesa', categoria: 'transporte', data: data(2), status: 'pago', notificar: false },
  { id: 10, descricao: 'Estacionamento', valor: 45, tipo: 'despesa', categoria: 'transporte', data: data(7), status: 'pago', notificar: false },
  { id: 11, descricao: 'Internet', valor: 120, tipo: 'despesa', categoria: 'contas', data: data(10), status: 'pago', notificar: true },
  { id: 12, descricao: 'Energia', valor: 180, tipo: 'despesa', categoria: 'contas', data: data(15), status: 'pendente', notificar: true },
  { id: 13, descricao: 'Água', valor: 90, tipo: 'despesa', categoria: 'contas', data: data(20), status: 'pendente', notificar: true },
  { id: 14, descricao: 'Netflix + Spotify', valor: 55, tipo: 'despesa', categoria: 'lazer', data: data(1), status: 'pago', notificar: false },
  { id: 15, descricao: 'Cinema', valor: 80, tipo: 'despesa', categoria: 'lazer', data: data(14), status: 'pendente', notificar: false },
  { id: 16, descricao: 'Plano de Saúde', valor: 420, tipo: 'despesa', categoria: 'saude', data: data(5), status: 'pago', notificar: true },
  { id: 17, descricao: 'Farmácia', valor: 65, tipo: 'despesa', categoria: 'saude', data: data(11), status: 'pago', notificar: false },
  { id: 18, descricao: 'Curso TypeScript', valor: 297, tipo: 'despesa', categoria: 'educacao', data: data(3), status: 'pago', notificar: false },
  { id: 19, descricao: 'Livros Técnicos', valor: 150, tipo: 'despesa', categoria: 'educacao', data: data(18), status: 'pendente', notificar: false },
];

function getStoredTransacoes(): Transacao[] {
  try {
    const stored = localStorage.getItem(MOCK_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(transacoesIniciais));
  return transacoesIniciais;
}

function saveTransacoes(transacoes: Transacao[]): void {
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(transacoes));
}

export const mockService = {
  getTransacoes: (): Transacao[] => getStoredTransacoes(),

  criarTransacao: (data: Omit<Transacao, 'id'>): Transacao => {
    const transacoes = getStoredTransacoes();
    const maxId = transacoes.length > 0 ? Math.max(...transacoes.map((t) => t.id)) : 0;
    const nova: Transacao = { ...data, id: maxId + 1 };
    transacoes.push(nova);
    saveTransacoes(transacoes);
    return nova;
  },

  excluirTransacao: (id: number): boolean => {
    const transacoes = getStoredTransacoes();
    const filtradas = transacoes.filter((t) => t.id !== id);
    if (filtradas.length === transacoes.length) return false;
    saveTransacoes(filtradas);
    return true;
  },

  getEntrada: (): string => {
    try {
      return localStorage.getItem(MOCK_ENTRADA_KEY) || '0';
    } catch {
      return '0';
    }
  },

  setEntrada: (valor: string): void => {
    localStorage.setItem(MOCK_ENTRADA_KEY, valor);
  },

  reset: (): void => {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(transacoesIniciais));
    localStorage.removeItem(MOCK_ENTRADA_KEY);
  },
};
