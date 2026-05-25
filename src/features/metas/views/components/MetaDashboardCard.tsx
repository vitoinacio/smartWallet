import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EconomiaProgress } from '../../models';
import { Progress } from '@/components/ui/progress';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { Link } from 'react-router-dom';
import { Target, ChevronRight } from 'lucide-react';

interface MetaDashboardCardProps {
  progressos: EconomiaProgress[];
  isLoading: boolean;
}

function getBarColor(status: EconomiaProgress['status']) {
  switch (status) {
    case 'ok':
      return 'bg-blue-500';
    case 'warning':
      return 'bg-amber-500';
    case 'atingida':
      return 'bg-green-500';
  }
}

export function MetaDashboardCard({
  progressos,
  isLoading,
}: MetaDashboardCardProps) {
  const ativas = progressos.filter((p) => p.meta.ativa);
  const atingidas = ativas.filter((p) => p.status === 'atingida').length;
  const totalEconomizado = ativas.reduce(
    (acc, p) => acc + p.meta.valorAtual,
    0
  );

  if (isLoading) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-4 h-4" />
            Metas de Economia
          </CardTitle>
          <Link to="/metas">
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
              Ver todas
              <ChevronRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {ativas.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma meta definida ainda.{' '}
            <Link
              to="/metas"
              className="text-primary underline underline-offset-2"
            >
              Criar meta
            </Link>
          </p>
        ) : (
          <>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {atingidas}/{ativas.length} metas atingidas
              </span>
              <span>Total: R$ {formatedBrl(totalEconomizado.toString())}</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {ativas.slice(0, 4).map((p) => {
                const percentualExibido = Math.min(p.percentual, 100);
                return (
                  <div key={p.meta.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium truncate">
                        {p.meta.nome}
                      </span>
                      <span
                        className={`${
                          p.status === 'atingida'
                            ? 'text-green-600'
                            : p.status === 'warning'
                              ? 'text-amber-600'
                              : 'text-blue-600'
                        }`}
                      >
                        {p.percentual.toFixed(0)}%
                      </span>
                    </div>
                    <Progress
                      value={percentualExibido}
                      className={`h-1.5 ${getBarColor(p.status)}`}
                    />
                  </div>
                );
              })}
            </div>

            {ativas.length > 4 && (
              <p className="text-xs text-muted-foreground text-center">
                +{ativas.length - 4} metas restantes
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
