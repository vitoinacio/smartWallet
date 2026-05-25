import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BudgetProgress, CATEGORIAS } from '@/features/financeiro/models';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { Trash2, AlertTriangle, CheckCircle, XCircle, PiggyBank } from 'lucide-react';
import { EmptyState } from '@/core/components/EmptyState';
import { ConfirmDialog } from '@/core/components/ConfirmDialog';

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
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            Orçamentos do Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={PiggyBank}
            title="Nenhum orçamento definido"
            description="Adicione orçamentos por categoria para controlar seus gastos"
          />
        </CardContent>
      </Card>
    );
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
                  <ConfirmDialog
                    title="Remover Orçamento"
                    description={`Tem certeza que deseja remover o orçamento de "${categoria?.nome || p.categoria}"? Esta ação não pode ser desfeita.`}
                    onConfirm={() => onRemover(p.categoria)}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </ConfirmDialog>
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