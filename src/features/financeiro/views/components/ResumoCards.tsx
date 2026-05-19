import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumoFinanceiro } from '../../models';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { TrendingUp, TrendingDown, Wallet, AlertCircle } from 'lucide-react';

interface ResumoCardsProps {
  resumo: ResumoFinanceiro;
}

export function ResumoCards({ resumo }: ResumoCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            Receitas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            R$ {formatedBrl(resumo.totalReceitas.toString())}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            Despesas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            R$ {formatedBrl(resumo.totalDespesas.toString())}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Wallet className="w-4 h-4 text-blue-500" />
            Saldo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              resumo.saldo >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            R$ {formatedBrl(resumo.saldo.toString())}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            Pendências
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">
            {resumo.transacoesPendentes + resumo.transacoesVencidas}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {resumo.transacoesVencidas > 0 && (
              <span className="text-red-500">
                {resumo.transacoesVencidas} vencida(s)
              </span>
            )}
            {resumo.transacoesVencidas > 0 &&
              resumo.transacoesPendentes > 0 &&
              ', '}
            {resumo.transacoesPendentes > 0 && (
              <span>{resumo.transacoesPendentes} pendente(s)</span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}