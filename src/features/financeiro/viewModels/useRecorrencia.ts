import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from '@/components/ui/sonner';
import {
  Recorrencia,
  InstanciaRecorrencia,
  TEMPLATES_RECURRENCIA,
} from '../models/RecorrenciaTypes';
import { Transacao } from '../models/TransacaoTypes';

const RECURRENCIA_STORAGE_KEY = 'smartwallet_recorrencias';
const INSTANCIA_STORAGE_KEY = 'smartwallet_instancias_recorrencia';

function getMesAtual(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function getStoredRecorrencias(): Recorrencia[] {
  try {
    const stored = localStorage.getItem(RECURRENCIA_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecorrencias(recorrencias: Recorrencia[]): void {
  localStorage.setItem(RECURRENCIA_STORAGE_KEY, JSON.stringify(recorrencias));
}

function getStoredInstancias(): InstanciaRecorrencia[] {
  try {
    const stored = localStorage.getItem(INSTANCIA_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveInstancias(instancias: InstanciaRecorrencia[]): void {
  localStorage.setItem(INSTANCIA_STORAGE_KEY, JSON.stringify(instancias));
}

function gerarInstanciasDoMes(
  recorrencias: Recorrencia[],
  instanciasExistentes: InstanciaRecorrencia[]
): InstanciaRecorrencia[] {
  const mesAtual = getMesAtual();
  const novasInstancias: InstanciaRecorrencia[] = [];
  let maxId =
    instanciasExistentes.length > 0
      ? Math.max(...instanciasExistentes.map((i) => i.id))
      : 0;

  recorrencias.forEach((rec) => {
    if (!rec.ativa) return;

    const jaExiste = instanciasExistentes.some(
      (i) =>
        i.recorrenciaId === rec.id && i.data.startsWith(mesAtual)
    );

    if (jaExiste) return;

    const hoje = new Date();
    const dataVenc = new Date(hoje.getFullYear(), hoje.getMonth(), rec.diaVencimento);

    if (dataVenc < new Date(rec.dataInicio)) return;
    if (rec.dataFim && dataVenc > new Date(rec.dataFim)) return;

    const status = dataVenc < hoje ? 'vencido' : 'pendente';

    maxId++;
    novasInstancias.push({
      id: maxId,
      recorrenciaId: rec.id,
      descricao: rec.descricao,
      valor: rec.valor,
      tipo: rec.tipo,
      categoria: rec.categoria,
      data: dataVenc.toISOString().split('T')[0],
      status,
      observacao: rec.observacao,
      notificar: rec.notificar,
      geradaAutomaticamente: true,
    });
  });

  return novasInstancias;
}

export function useRecorrencia() {
  const [recorrencias, setRecorrencias] = useState<Recorrencia[]>([]);
  const [instancias, setInstancias] = useState<InstanciaRecorrencia[]>([]);

  useEffect(() => {
    const recs = getStoredRecorrencias();
    const insts = getStoredInstancias();

    const novas = gerarInstanciasDoMes(recs, insts);
    if (novas.length > 0) {
      const todas = [...insts, ...novas];
      saveInstancias(todas);
      setInstancias(todas);
    } else {
      setInstancias(insts);
    }

    setRecorrencias(recs);
  }, []);

  const criarRecorrencia = useCallback(
    (data: {
      descricao: string;
      valor: number;
      tipo: 'receita' | 'despesa';
      categoria: string;
      frequencia: 'semanal' | 'mensal' | 'trimestral' | 'anual';
      diaVencimento: number;
      dataInicio: string;
      observacao?: string;
      notificar: boolean;
      templateId?: string;
    }) => {
      const recs = getStoredRecorrencias();
      const id = `rec-${Date.now()}`;
      const nova: Recorrencia = { ...data, id, ativa: true };
      recs.push(nova);
      saveRecorrencias(recs);
      setRecorrencias([...recs]);

      const insts = getStoredInstancias();
      const novas = gerarInstanciasDoMes(recs, insts);
      if (novas.length > 0) {
        const todas = [...insts, ...novas];
        saveInstancias(todas);
        setInstancias(todas);
      }

      toast.success(`Recorrência "${data.descricao}" criada!`);
    },
    []
  );

  const excluirRecorrencia = useCallback((id: string) => {
    const recs = getStoredRecorrencias().filter((r) => r.id !== id);
    saveRecorrencias(recs);
    setRecorrencias([...recs]);

    const insts = getStoredInstancias().filter((i) => i.recorrenciaId !== id);
    saveInstancias(insts);
    setInstancias([...insts]);

    toast.success('Recorrência excluída');
  }, []);

  const toggleRecorrencia = useCallback((id: string) => {
    const recs = getStoredRecorrencias().map((r) =>
      r.id === id ? { ...r, ativa: !r.ativa } : r
    );
    saveRecorrencias(recs);
    setRecorrencias([...recs]);
  }, []);

  const instanciasDoMes = useMemo(() => {
    const mesAtual = getMesAtual();
    return instancias.filter((i) => i.data.startsWith(mesAtual));
  }, [instancias]);

  const transacoesDasInstancias = useMemo(
    (): Transacao[] =>
      instanciasDoMes.map((i) => ({
        id: i.id,
        descricao: i.descricao,
        valor: i.valor,
        tipo: i.tipo,
        categoria: i.categoria,
        data: i.data,
        status: i.status,
        observacao: i.observacao,
        notificar: i.notificar,
      })),
    [instanciasDoMes]
  );

  const templates = useMemo(() => TEMPLATES_RECURRENCIA, []);

  return {
    recorrencias,
    instancias: instanciasDoMes,
    templates,
    transacoesRecorrentes: transacoesDasInstancias,
    criarRecorrencia,
    excluirRecorrencia,
    toggleRecorrencia,
  };
}
