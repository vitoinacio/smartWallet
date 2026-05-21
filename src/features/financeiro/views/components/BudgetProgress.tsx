import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BudgetProgress, CATEGORIAS } from '@/features/financeiro/models';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface BudgetProgressListProps {
  progressos: BudgetProgress[];
  onRemover: (categoria: string) => void;
}

function getIconeStatus(status: BudgetProgress['status']) {
  switch (status) {
    case 'ok':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case 'excedido':
      return <XCircle className="w-4 h-4 text-red-500" />;
  }
}

function getCorBarra(status: BudgetProgress['status']) {
  switch (status) {
    case 'ok':
      return 'bg-green-500';
    case 'warning':
      return 'bg-amber-500';
    case 'excedido':
      return 'bg-red-500';
  }
}

export function BudgetProgressList({ progressos, onRemover }: BudgetProgressListProps) {
  if (progressos.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Orçamentos do Mês
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {progressos.map((p) => {
          const categoria = CATEGORIAS.find((c) => c.id === p.categoria);
          const restante = p.limite - p.gasto;

          return (
            <div key={p.categoria} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIconeStatus(p.status)}
                  <span className="font-medium">{categoria?.nome || p.categoria}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    R$ {formatedBrl(p.gasto.toString())} / R$ {formatedBrl(p.limite.toString())}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onRemover(p.categoria)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Progress
                  value={Math.min(p.percentual, 100)}
                  className={`h-2 ${getCorBarra(p.status)}`}
                />
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{p.percentual.toFixed(1)}% utilizado</span>
                {restante >= 0 ? (
                  <span className="text-green-600">
                    Restante: R$ {formatedBrl(restante.toString())}
                  </span>
                ) : (
                  <span className="text-red-600">
                    Excedido: R$ {formatedBrl(Math.abs(restante).toString())}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}