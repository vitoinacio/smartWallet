import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TransacaoRecente } from '../../models';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { formatarDate } from '@/core/utils/formatedDate';
import { ArrowRight, Receipt, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TransacoesRecentesProps {
  transacoes: TransacaoRecente[];
  isLoading: boolean;
}

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    pago: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    pendente: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    vencido: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {status === 'pago' ? 'Pago' : status === 'pendente' ? 'Pendente' : 'Vencido'}
    </span>
  );
};

export function TransacoesRecentes({ transacoes, isLoading }: TransacoesRecentesProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-6 w-44" />
          </CardTitle>
          <Skeleton className="h-8 w-28 rounded" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Transações Recentes
        </CardTitle>
        <Link to="/financeiro">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Ver todas <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {transacoes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingDown className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma transação recente</p>
            <p className="text-sm">Adicione suas despesas no módulo financeiro</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transacoes.map((transacao) => (
              <div
                key={transacao.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium">{transacao.descricao}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatarDate(transacao.data)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-red-600">
                      -R$ {formatedBrl(transacao.valor.toString())}
                    </p>
                    <StatusBadge status={transacao.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}