import { useMemo } from 'react';
import { useEntrada, useResumo, useTransacoesRecentes } from '../viewModels';
import {
  SaudacaoUsuario,
  ResumoFinanceiro,
  EntradaEditor,
  TransacoesRecentes,
  AcoesRapidas,
} from './components';

const Dashboard = () => {
  const { entrada, isLoading, isEditing, atualizarEntrada, iniciarEdicao, cancelarEdicao } =
    useEntrada();
  const { transacoes, isLoading: isLoadingTransacoes } = useTransacoesRecentes(5);

  const entradaNumerica = useMemo(() => {
    const valor = entrada.valor.replace(/[^0-9]/g, '');
    return parseInt(valor) / 100 || 0;
  }, [entrada.valor]);

  const resumoCalculado = useResumo({ entrada: entradaNumerica, transacoes });

  return (
    <main className="w-full mt-6 px-4 lg:px-6 pb-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <SaudacaoUsuario />

        <section>
          <h2 className="text-xl font-semibold mb-4">Visão Geral</h2>
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
          </section>

          <section className="lg:col-span-2">
            <TransacoesRecentes
              transacoes={transacoes}
              isLoading={isLoadingTransacoes}
            />
          </section>
        </div>
      </div>

    </main>
  );
};

export default Dashboard;
