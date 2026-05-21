import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatedBrl } from '@/core/utils/formatedBrl';

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

export function GraficoRosca({ dados, titulo = 'Despesas por Categoria' }: GraficoRoscaProps) {
  const dadosFormatados = dados.map((item, index) => ({
    ...item,
    cor: item.cor || CORES_PADRAO[index % CORES_PADRAO.length],
  }));

  const total = dadosFormatados.reduce((acc, item) => acc + item.valor, 0);

  if (dadosFormatados.length === 0 || total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{titulo}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">Sem dados para exibir</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
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