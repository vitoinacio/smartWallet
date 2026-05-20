import { useTransacoes, useResumo, useFiltros } from '../viewModels';
import {
  ResumoCards,
  TransacaoForm,
  TransacaoLista,
  FiltrosBar,
} from './components';

const Financeiro = () => {
  const { transacoes, isLoading, criarTransacao, excluirTransacao } =
    useTransacoes();
  const resumo = useResumo(transacoes);
  const { filtros, transacoesFiltradas, definirPeriodo, filtrarPorTipo, limparFiltros } =
    useFiltros(transacoes);

  const temFiltros = filtros.tipo !== undefined || filtros.categoria !== undefined;

  return (
    <main className="w-full mt-6 px-4 lg:px-6 pb-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Resumo Financeiro</h2>
          <ResumoCards resumo={resumo} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-1">
            <TransacaoForm onSubmit={criarTransacao} isLoading={isLoading} />
          </section>

          <section className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              <FiltrosBar
                filtros={filtros}
                onPeriodoChange={definirPeriodo}
                onTipoChange={filtrarPorTipo}
                onLimpar={limparFiltros}
                temFiltros={temFiltros}
              />

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Transações ({transacoesFiltradas.length})
                </h3>
                <TransacaoLista
                  transacoes={transacoesFiltradas}
                  isLoading={isLoading}
                  onExcluir={excluirTransacao}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

    </main>
  );
};

export default Financeiro;