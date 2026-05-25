import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartLine, HandCoins, ClipboardPenLine } from 'lucide-react';

export function FeaturesSection() {
  const { t } = useTranslation('home');
  const features = [
    {
      icon: <ChartLine className="w-8 h-8" />,
      title: t('features.analiseCategorias'),
      description: t('features.analiseDesc'),
      highlight: t('features.highlight1'),
    },
    {
      icon: <HandCoins className="w-8 h-8" />,
      title: t('features.controleTotal'),
      description: t('features.controleDesc'),
      highlight: t('features.highlight2'),
    },
    {
      icon: <ClipboardPenLine className="w-8 h-8" />,
      title: t('features.planejamento'),
      description: t('features.planejamentoDesc'),
      highlight: t('features.highlight3'),
    },
  ];

  return (
    <section id="recursos" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-blue-500 text-blue-700 dark:text-blue-400">
            {t('features.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('features.subtitle')}
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