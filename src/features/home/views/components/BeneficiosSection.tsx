import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Wallet } from 'lucide-react';

const beneficios = [
  'Visualização completa das suas finanças',
  'Organização automática por categorias',
  'Alertas de contas a pagar',
  'Metas de economia personalizadas',
  'Relatórios detalhados de gastos',
  'Interface simples e intuitiva',
];

interface BeneficiosSectionProps {
  onCriarConta: () => void;
}

export function BeneficiosSection({ onCriarConta }: BeneficiosSectionProps) {
  return (
    <section id="beneficios" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="outline" className="mb-4 border-purple-500 text-purple-700 dark:text-purple-400">
              Benefícios
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Por que usar o <span className="text-purple-700 dark:text-purple-400">SmartWallet</span>?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Deixamos sua vida financeira mais simples, organizada e sob controle. Veja o que você ganha:
            </p>
            <div className="space-y-4">
              {beneficios.map((beneficio, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">{beneficio}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-20" />
            <Card className="relative bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <Wallet className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Plano Gratuito</h3>
                <p className="text-gray-600 dark:text-gray-400">Use todas as funcionalidades</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">R$ 0</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Para sempre</p>
                <Button onClick={onCriarConta} className="w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                  Começar Gratuitamente
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}