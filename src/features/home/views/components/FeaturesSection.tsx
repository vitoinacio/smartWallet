import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartLine, HandCoins, ClipboardPenLine } from 'lucide-react';

const features = [
  {
    icon: <ChartLine className="w-8 h-8" />,
    title: 'Análise de Categorias',
    description: 'Divida suas despesas em categorias personalizáveis, como alimentação, transporte e lazer.',
    highlight: 'Identifique onde você mais gasta',
  },
  {
    icon: <HandCoins className="w-8 h-8" />,
    title: 'Controle Total',
    description: 'Mantenha suas finanças organizadas com facilidade. Acompanhe, ajuste e alcance suas metas.',
    highlight: 'Simplifique a gestão do seu dinheiro',
  },
  {
    icon: <ClipboardPenLine className="w-8 h-8" />,
    title: 'Planejamento Financeiro',
    description: 'Estabeleça metas de economia e planeje seus gastos com antecedência.',
    highlight: 'Orçamentos personalizados',
  },
];

export function FeaturesSection() {
  return (
    <section id="recursos" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-blue-500 text-blue-700 dark:text-blue-400">
            Recursos Principais
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tudo que você precisa para <span className="text-blue-700 dark:text-blue-500">controlar seu dinheiro</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Uma solução completa para gestão financeira pessoal, com ferramentas poderosas e interface intuitiva.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-xl group">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  {feature.highlight}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}