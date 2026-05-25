import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useEntrada, useResumo, useTransacoesRecentes } from '../viewModels';
import { useMetas } from '@/features/metas/viewModels';
import { MetaDashboardCard } from '@/features/metas/views/components';
import {
  SaudacaoUsuario,
  ResumoFinanceiro,
  EntradaEditor,
  TransacoesRecentes,
  AcoesRapidas,
  GraficoRosca,
  GraficoBarras,
} from './components';

const CORES_CATEGORIAS: Record<string, string> = {
  salario: '#22c55e',
  investimento: '#3b82f6',
  freelance: '#14b8a6',
  alimentacao: '#f59e0b',
  transporte: '#f97316',
  moradia: '#8b5cf6',
  lazer: '#ec4899',
  saude: '#ef4444',
  educacao: '#6366f1',
  contas: '#6b7280',
};

const Dashboard = () => {
  const { t } = useTranslation('dashboard');
  const { entrada, isLoading, isEditing, atualizarEntrada, iniciarEdicao, cancelarEdicao } =
    useEntrada();
  const { transacoes, isLoading: isLoadingTransacoes } = useTransacoesRecentes(5);
  const { progressos, isLoading: isLoadingMetas } = useMetas();

  const entradaNumerica = useMemo(() => {
    const valor = entrada.valor.replace(/[^0-9]/g, '');
    return parseInt(valor) / 100 || 0;
  }, [entrada.valor]);

  const resumoCalculado = useResumo({ entrada: entradaNumerica, transacoes });

  const dadosRosca = useMemo(() => {
    const agrupado: Record<string, number> = {};
    transacoes.forEach((t) => {
      const cat = t.categoria || 'outros';
      agrupado[cat] = (agrupado[cat] || 0) + t.valor;
    });
    return Object.entries(agrupado).map(([nome, valor]) => ({
      nome: nome.charAt(0).toUpperCase() + nome.slice(1),
      valor,
      cor: CORES_CATEGORIAS[nome] || '#6b7280',
    }));
  }, [transacoes]);

  const dadosBarras = useMemo(() => {
    const meses: Record<string, { receitas: number; despesas: number }> = {};
    transacoes.forEach((t) => {
      const data = new Date(t.data);
      const mes = data.toLocaleDateString('pt-BR', { month: 'short' });
      if (!meses[mes]) {
        meses[mes] = { receitas: 0, despesas: 0 };
      }
      if (t.tipo === 'receita') {
        meses[mes].receitas += t.valor;
      } else {
        meses[mes].despesas += t.valor;
      }
    });
    return Object.entries(meses).map(([mes, valores]) => ({
      mes: mes.charAt(0).toUpperCase() + mes.slice(1),
      ...valores,
    }));
  }, [transacoes]);

  return (
    <main className="w-full mt-6 px-4 lg:px-6 pb-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <SaudacaoUsuario />

        <section>
          <h2 className="text-xl font-semibold mb-4">{t('title')}</h2>
          <ResumoFinanceiro resumo={resumoCalculado} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-1">
            <EntradaEditor
              entrada={entrada.valor}
              isLoading={isLoading}
              isEditing={isEditing}
              onAtualizar={atualizarEntrada}
              onIniciarEdicao={iniciarEdicao}
              onCancelarEdicao={cancelarEdicao}
            />
            <div className="mt-4">
              <AcoesRapidas />
            </div>
            <div className="mt-4">
              <MetaDashboardCard
                progressos={progressos}
                isLoading={isLoadingMetas}
              />
            </div>
          </section>

          <section className="lg:col-span-2">
            <TransacoesRecentes
              transacoes={transacoes}
              isLoading={isLoadingTransacoes}
            />
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GraficoRosca dados={dadosRosca} />
          <GraficoBarras dados={dadosBarras} />
        </div>
      </div>

    </main>
  );
};

export default Dashboard;
