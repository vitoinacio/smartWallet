import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { BarChart3 } from 'lucide-react';

interface DadosMes {
  mes: string;
  receitas: number;
  despesas: number;
}

interface GraficoBarrasProps {
  dados: DadosMes[];
  titulo?: string;
}

export function GraficoBarras({ dados, titulo }: GraficoBarrasProps) {
  const { t } = useTranslation('dashboard');
  const tituloResolvido = titulo || t('graficoBarras.title');
  if (dados.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{tituloResolvido}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[300px] gap-3">
          <BarChart3 className="w-12 h-12 text-muted-foreground/40" />
          <div className="text-center">
            <p className="text-sm font-medium">{t('graficoBarras.empty')}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('graficoBarras.emptyHint')}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tituloResolvido}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="mes"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border)' }}
            />
            <YAxis
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border)' }}
              tickFormatter={(value) => `R$ ${formatedBrl(value.toString())}`}
            />
            <Tooltip
              formatter={(value) => {
                const num = typeof value === 'number' ? value : 0;
                return [`R$ ${formatedBrl(num.toString())}`, ''];
              }}
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'var(--foreground)' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span className="text-muted-foreground">{value}</span>
              )}
            />
            <Bar
              dataKey="receitas"
              name={t('graficoBarras.receitas')}
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Bar
              dataKey="despesas"
              name={t('graficoBarras.despesas')}
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}