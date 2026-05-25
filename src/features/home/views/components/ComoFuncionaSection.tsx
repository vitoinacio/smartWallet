import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, TrendingUp, Bell } from 'lucide-react';

export function ComoFuncionaSection() {
  const { t } = useTranslation('home');
  const features = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: t('comoFunciona.controleDebitos'),
      description: t('comoFunciona.controleDebitosDesc'),
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('comoFunciona.dashboardCompleto'),
      description: t('comoFunciona.dashboardCompletoDesc'),
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: t('comoFunciona.alertasVencimento'),
      description: t('comoFunciona.alertasVencimentoDesc'),
    },
  ];

  return (
    <section id="como-funciona" className="py-20 px-6 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-cyan-500 text-cyan-700 dark:text-cyan-400">
            {t('comoFunciona.subtitle')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('comoFunciona.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <Card key={index} className="bg-white dark:bg-neutral-800">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 mb-3">
                  {item.icon}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}