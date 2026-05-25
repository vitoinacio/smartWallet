import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, PiggyBank, Bell, Shield, Smartphone, Wallet } from 'lucide-react';

export function FuncionalidadesSection() {
  const { t } = useTranslation('home');
  const funcionalidades = [
    { icon: <TrendingUp className="w-6 h-6" />, title: t('funcionalidades.dashboard'), description: t('funcionalidades.dashboardDesc') },
    { icon: <PiggyBank className="w-6 h-6" />, title: t('funcionalidades.debitos'), description: t('funcionalidades.debitosDesc') },
    { icon: <Bell className="w-6 h-6" />, title: t('funcionalidades.notificacoes'), description: t('funcionalidades.notificacoesDesc') },
    { icon: <Shield className="w-6 h-6" />, title: t('funcionalidades.dadosSeguros'), description: t('funcionalidades.dadosSegurosDesc') },
    { icon: <Smartphone className="w-6 h-6" />, title: t('funcionalidades.acessoMobile'), description: t('funcionalidades.acessoMobileDesc') },
    { icon: <Wallet className="w-6 h-6" />, title: t('funcionalidades.gratuito'), description: t('funcionalidades.gratuitoDesc') },
  ];

  return (
    <section id="funcionalidades" className="py-20 px-6 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-green-500 text-green-700 dark:text-green-400">
            {t('funcionalidades.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('funcionalidades.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funcionalidades.map((item, index) => (
            <Card key={index} className="bg-white dark:bg-neutral-800 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}