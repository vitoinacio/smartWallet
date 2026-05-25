import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { toast } from '@/components/ui/sonner';
import { useEntrada } from '@/features/dashboard/viewModels';
import { MetaEconomia, EconomiaProgress } from '../models';

const STORAGE_KEY = 'smartwallet_metas';
const MOCK_TRANSACOES_KEY = 'smartwallet_mock_transacoes';

function getMesAtual(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function gerarId(): string {
  return `meta-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function getStoredMetas(): MetaEconomia[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveMetas(metas: MetaEconomia[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
}

function getSaldo30Dias(): number {
  try {
    const stored = localStorage.getItem(MOCK_TRANSACOES_KEY);
    if (!stored) return 0;
    const transacoes = JSON.parse(stored);
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

    const recentes = transacoes.filter((t: { data: string }) => new Date(t.data) >= trintaDiasAtras);
    const receitas = recentes
      .filter((t: { tipo: string }) => t.tipo === 'receita')
      .reduce((acc: number, t: { valor: number }) => acc + t.valor, 0);
    const despesas = recentes
      .filter((t: { tipo: string }) => t.tipo === 'despesa')
      .reduce((acc: number, t: { valor: number }) => acc + t.valor, 0);

    return receitas - despesas;
  } catch {
    return 0;
  }
}

export function useMetas() {
  const { entrada } = useEntrada();
  const [metas, setMetas] = useState<MetaEconomia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const alertasMostrados = useRef<Set<string>>(new Set());
  const percentuaisAnteriores = useRef<Record<string, number>>({});

  const entradaNumerica = useMemo(() => {
    const valor = entrada.valor.replace(/[^0-9]/g, '');
    return parseInt(valor) / 100 || 0;
  }, [entrada.valor]);

  const sugestaoValorPadrao = useMemo(() => {
    return Math.round(entradaNumerica * 0.1 * 100);
  }, [entradaNumerica]);

  const carregarMetas = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await new Promise((r) => setTimeout(r, 200));

      const stored = getStoredMetas();
      const mesAtual = getMesAtual();

      const atualizadas = stored.map((m) => {
        if (m.tipo === 'mensal' && m.mes !== mesAtual) {
          return { ...m, valorAtual: 0, mes: mesAtual };
        }
        return m;
      });

      if (atualizadas.length > 0 && getSaldo30Dias() < 0) {
        toast.warning('Seu saldo dos últimos 30 dias está negativo. Revise suas metas.', {
          duration: 5000,
        });
      }

      setMetas(atualizadas);
      saveMetas(atualizadas);
    } catch {
      setError('Erro ao carregar metas');
      toast.error('Erro ao carregar metas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarMetas();
  }, [carregarMetas]);

  const criarMeta = useCallback(
    (
      dados: Omit<MetaEconomia, 'id' | 'valorAtual' | 'ativa' | 'mes'>
    ) => {
      const mesAtual = getMesAtual();
      const novaMeta: MetaEconomia = {
        id: gerarId(),
        nome: dados.nome,
        valorAlvo: dados.valorAlvo,
        valorAtual: 0,
        mes: mesAtual,
        tipo: dados.tipo,
        categoria: dados.categoria,
        ativa: true,
      };

      const novasMetas = [...getStoredMetas(), novaMeta];
      saveMetas(novasMetas);
      setMetas(novasMetas);
      toast.success(`Meta "${dados.nome}" criada com sucesso!`);
    },
    []
  );

  const atualizarMeta = useCallback(
    (id: string, dados: Partial<Omit<MetaEconomia, 'id'>>) => {
      const metasAtuais = getStoredMetas();
      const index = metasAtuais.findIndex((m) => m.id === id);
      if (index < 0) return;

      metasAtuais[index] = { ...metasAtuais[index], ...dados };
      saveMetas(metasAtuais);
      setMetas([...metasAtuais]);
      toast.success('Meta atualizada!');
    },
    []
  );

  const excluirMeta = useCallback((id: string) => {
    const metasAtuais = getStoredMetas().filter((m) => m.id !== id);
    saveMetas(metasAtuais);
    setMetas(metasAtuais);
    toast.success('Meta excluída!');
  }, []);

  const adicionarProgresso = useCallback(
    (id: string, valor: number) => {
      const metasAtuais = getStoredMetas();
      const index = metasAtuais.findIndex((m) => m.id === id);
      if (index < 0) return;

      const meta = metasAtuais[index];
      metasAtuais[index] = { ...meta, valorAtual: meta.valorAtual + valor };
      saveMetas(metasAtuais);
      setMetas([...metasAtuais]);
    },
    []
  );

  const estenderMeta = useCallback((id: string, novoValorAlvo: number) => {
    const metasAtuais = getStoredMetas();
    const index = metasAtuais.findIndex((m) => m.id === id);
    if (index < 0) return;

    metasAtuais[index] = { ...metasAtuais[index], valorAlvo: novoValorAlvo };
    saveMetas(metasAtuais);
    setMetas([...metasAtuais]);
    toast.success('Meta estendida com sucesso!');
  }, []);

  const progressos = useMemo((): EconomiaProgress[] => {
    return metas.map((meta) => {
      const percentual =
        meta.valorAlvo > 0 ? (meta.valorAtual / meta.valorAlvo) * 100 : 0;
      const restante = meta.valorAlvo - meta.valorAtual;

      let status: EconomiaProgress['status'] = 'ok';
      if (percentual >= 100) status = 'atingida';
      else if (percentual >= 80) status = 'warning';

      return { meta, percentual, restante, status };
    });
  }, [metas]);

  useEffect(() => {
    progressos.forEach((p) => {
      const anterior = percentuaisAnteriores.current[p.meta.id] ?? 0;

      [50, 75, 100].forEach((threshold) => {
        const chave = `${p.meta.id}-${threshold}`;
        if (alertasMostrados.current.has(chave)) return;

        if (anterior < threshold && p.percentual >= threshold) {
          alertasMostrados.current.add(chave);

          if (threshold === 100) {
            toast.success(
              `Meta "${p.meta.nome}" atingida! Parabéns!`,
              { duration: 6000 }
            );
          } else if (threshold === 75) {
            toast.info(
              `Meta "${p.meta.nome}" está em ${p.percentual.toFixed(0)}%! Quase lá!`,
              { duration: 4000 }
            );
          } else {
            toast.info(
              `Meta "${p.meta.nome}" já atingiu ${p.percentual.toFixed(0)}%!`,
              { duration: 4000 }
            );
          }
        }
      });

      percentuaisAnteriores.current[p.meta.id] = p.percentual;
    });
  }, [progressos]);

  return {
    metas: metas.filter((m) => m.ativa),
    progressos,
    isLoading,
    error,
    sugestaoValorPadrao,
    criarMeta,
    atualizarMeta,
    excluirMeta,
    adicionarProgresso,
    estenderMeta,
    recarregar: carregarMetas,
  };
}
