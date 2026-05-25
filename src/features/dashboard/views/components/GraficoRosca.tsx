import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { PieChart as PieChartIcon } from 'lucide-react';

interface DadosCategoria {
  nome: string;
  valor: number;
  cor: string;
}

interface GraficoRoscaProps {
  dados: DadosCategoria[];
  titulo?: string;
}

const CORES_PADRAO = [
  '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
];

export function GraficoRosca({ dados, titulo }: GraficoRoscaProps) {
  const { t } = useTranslation('dashboard');
  const tituloResolvido = titulo || t('graficoRosca.title');
  const dadosFormatados = dados.map((item, index) => ({
    ...item,
    cor: item.cor || CORES_PADRAO[index % CORES_PADRAO.length],
  }));

  const total = dadosFormatados.reduce((acc, item) => acc + item.valor, 0);

  if (dadosFormatados.length === 0 || total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{tituloResolvido}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[300px] gap-3">
          <PieChartIcon className="w-12 h-12 text-muted-foreground/40" />
          <div className="text-center">
            <p className="text-sm font-medium">{t('graficoRosca.empty')}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('graficoRosca.emptyHint')}
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
          <PieChart>
            <Pie
              data={dadosFormatados}
              dataKey="valor"
              nameKey="nome"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {dadosFormatados.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.cor} />
              ))}
            </Pie>
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
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}