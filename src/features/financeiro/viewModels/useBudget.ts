import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { toast } from '@/components/ui/sonner';
import { Budget, BudgetProgress, MetaEconomia } from '../models/BudgetTypes';
import { Transacao, CATEGORIAS, Categoria } from '../models/TransacaoTypes';

const BUDGET_STORAGE_KEY = 'smartwallet_budgets';
const META_STORAGE_KEY = 'smartwallet_meta_economia';

function getMesAtual(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function getStoredBudgets(): Budget[] {
  try {
    const stored = localStorage.getItem(BUDGET_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveBudgets(budgets: Budget[]): void {
  localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgets));
}

function getStoredMeta(): MetaEconomia {
  try {
    const stored = localStorage.getItem(META_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { percentual: 20, valorAlvo: 0 };
  } catch {
    return { percentual: 20, valorAlvo: 0 };
  }
}

function saveMeta(meta: MetaEconomia): void {
  localStorage.setItem(META_STORAGE_KEY, JSON.stringify(meta));
}

export function useBudget(transacoes: Transacao[]) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [meta, setMeta] = useState<MetaEconomia>(getStoredMeta());

  useEffect(() => {
    setBudgets(getStoredBudgets());
  }, []);

  const mesAtual = useMemo(() => getMesAtual(), []);

  const budgetsDoMes = useMemo(
    () => budgets.filter((b) => b.mes === mesAtual),
    [budgets, mesAtual]
  );

  const transacoesDoMes = useMemo(
    () =>
      transacoes.filter((t) => {
        const data = new Date(t.data);
        const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
        return mes === mesAtual && t.tipo === 'despesa';
      }),
    [transacoes, mesAtual]
  );

  const progressos = useMemo((): BudgetProgress[] => {
    return budgetsDoMes.map((budget) => {
      const gasto = transacoesDoMes
        .filter((t) => t.categoria === budget.categoria)
        .reduce((acc, t) => acc + t.valor, 0);

      const percentual = budget.limite > 0 ? (gasto / budget.limite) * 100 : 0;

      let status: 'ok' | 'warning' | 'excedido' = 'ok';
      if (percentual >= 100) status = 'excedido';
      else if (percentual >= 80) status = 'warning';

      return {
        categoria: budget.categoria,
        limite: budget.limite,
        gasto,
        percentual,
        status,
      };
    });
  }, [budgetsDoMes, transacoesDoMes]);

  const adicionarBudget = useCallback((categoria: string, limite: number) => {
    const budgets = getStoredBudgets();
    const mes = getMesAtual();

    const existente = budgets.findIndex(
      (b) => b.categoria === categoria && b.mes === mes
    );

    if (existente >= 0) {
      budgets[existente].limite = limite;
    } else {
      budgets.push({
        id: `${mes}-${categoria}`,
        categoria,
        limite,
        mes,
      });
    }

    saveBudgets(budgets);
    setBudgets([...budgets]);
  }, []);

  const removerBudget = useCallback((categoria: string) => {
    const budgets = getStoredBudgets().filter(
      (b) => !(b.categoria === categoria && b.mes === getMesAtual())
    );
    saveBudgets(budgets);
    setBudgets([...budgets]);
  }, []);

  const atualizarMeta = useCallback((percentual: number) => {
    const novaMeta: MetaEconomia = {
      percentual,
      valorAlvo: 0,
    };
    saveMeta(novaMeta);
    setMeta(novaMeta);
  }, []);

  const categoriasDisponiveis = useMemo(
    () => CATEGORIAS.filter((c: Categoria) => !['salario', 'investimento', 'freelance', 'outros_receita'].includes(c.id)),
    []
  );

  const alertasMostrados = useRef<Set<string>>(new Set());

  useEffect(() => {
    progressos.forEach((p) => {
      const chave = `${p.categoria}-${p.status}`;
      if (alertasMostrados.current.has(chave)) return;

      const categoria = CATEGORIAS.find((c) => c.id === p.categoria);
      const nome = categoria?.nome || p.categoria;

      if (p.status === 'excedido') {
        toast.error(`Orçamento de ${nome} excedido!`);
        alertasMostrados.current.add(chave);
      } else if (p.status === 'warning') {
        toast.warning(`Orçamento de ${nome} em ${p.percentual.toFixed(0)}%`);
        alertasMostrados.current.add(chave);
      }
    });
  }, [progressos]);

  return {
    budgets: budgetsDoMes,
    progressos,
    meta,
    categoriasDisponiveis,
    adicionarBudget,
    removerBudget,
    atualizarMeta,
  };
}
