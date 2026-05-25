import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardResumo } from '../../models';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { TrendingUp, TrendingDown, Wallet, Percent } from 'lucide-react';

interface ResumoFinanceiroProps {
  resumo: DashboardResumo;
}

export function ResumoFinanceiro({ resumo }: ResumoFinanceiroProps) {
  const { t } = useTranslation('dashboard');
  const getCorPercentual = () => {
    if (resumo.percentualGasto >= 90) return 'bg-red-500';
    if (resumo.percentualGasto >= 70) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            {t('resumo.entradaMensal')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            R$ {formatedBrl(resumo.entrada.toString())}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            {t('resumo.totalGasto')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            R$ {formatedBrl(resumo.saida.toString())}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Wallet className="w-4 h-4 text-blue-500" />
            {t('resumo.saldoRestante')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              resumo.restante >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            R$ {formatedBrl(resumo.restante.toString())}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Percent className="w-4 h-4 text-purple-500" />
            {t('resumo.orcamentoUsado')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {resumo.percentualGasto.toFixed(1)}%
          </div>
          <div className="w-full bg-muted h-2 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full ${getCorPercentual()} transition-all duration-500`}
              style={{ width: `${resumo.percentualGasto}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}