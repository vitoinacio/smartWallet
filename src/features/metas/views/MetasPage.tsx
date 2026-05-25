import { useMetas } from '../viewModels';
import { MetaCard, MetaForm, SkeletonMetas } from './components';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { Target, AlertCircle } from 'lucide-react';

const MetasPage = () => {
  const {
    progressos,
    isLoading,
    error,
    sugestaoValorPadrao,
    criarMeta,
    excluirMeta,
    adicionarProgresso,
    estenderMeta,
  } = useMetas();

  if (isLoading) {
    return <SkeletonMetas />;
  }

  if (error) {
    return (
      <main className="w-full mt-6 px-4 lg:px-6 pb-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-lg font-medium text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  const ativas = progressos.filter((p) => p.meta.ativa);
  const totalEconomizado = ativas.reduce(
    (acc, p) => acc + p.meta.valorAtual,
    0
  );
  const totalAlvo = ativas.reduce((acc, p) => acc + p.meta.valorAlvo, 0);

  return (
    <main className="w-full mt-6 px-4 lg:px-6 pb-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <section>
          <div className="flex items-center gap-3 mb-1">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Metas de Economia</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Defina metas de economia e acompanhe seu progresso
          </p>
        </section>

        {ativas.length > 0 && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border bg-card p-4">
                <p className="text-sm text-muted-foreground">Total Economizado</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {formatedBrl(totalEconomizado.toString())}
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <p className="text-sm text-muted-foreground">Total Alvo</p>
                <p className="text-2xl font-bold text-blue-600">
                  R$ {formatedBrl(totalAlvo.toString())}
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <p className="text-sm text-muted-foreground">Metas Ativas</p>
                <p className="text-2xl font-bold text-purple-600">
                  {ativas.length}
                </p>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-1">
              <MetaForm
                sugestaoValor={sugestaoValorPadrao}
                onCriar={criarMeta}
              />
            </div>

            <div className="lg:col-span-2">
              {ativas.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 border rounded-xl bg-card">
                  <Target className="w-16 h-16 text-muted-foreground/40" />
                  <div className="text-center">
                    <p className="text-lg font-medium">Nenhuma meta definida</p>
                    <p className="text-sm text-muted-foreground">
                      Crie sua primeira meta de economia para começar
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {ativas.map((p) => (
                    <MetaCard
                      key={p.meta.id}
                      progress={p}
                      onExcluir={excluirMeta}
                      onAdicionarProgresso={adicionarProgresso}
                      onEstender={estenderMeta}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MetasPage;
