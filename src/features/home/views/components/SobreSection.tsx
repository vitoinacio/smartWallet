import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Users, Globe } from 'lucide-react';

export function SobreSection() {
  return (
    <section id="sobre" className="py-20 px-6 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-amber-500 text-amber-700 dark:text-amber-400">
            Sobre Nós
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Quem somos</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Bem-vindo à Smart Wallet!</strong> Somos líderes em soluções inovadoras para gestão financeira pessoal. Nossa missão é capacitar você a tomar decisões financeiras mais inteligentes e informadas.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Entendemos que a gestão de despesas pode ser um desafio. Por isso, desenvolvemos ferramentas que tornam o acompanhamento dos seus gastos simples e direto, oferecendo uma visão clara e detalhada de suas finanças.
            </p>
            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="gap-2">
                <Users className="w-4 h-4" /> Nossa Equipe
              </Button>
              <Button variant="outline" className="gap-2">
                <Globe className="w-4 h-4" /> Nossa Missão
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-600 to-orange-500 rounded-3xl blur-2xl opacity-20" />
            <Card className="relative bg-white dark:bg-neutral-800 p-8 rounded-2xl">
              <div className="flex items-center justify-center mb-6">
                <img src="/logoAzul.svg" alt="SmartWallet" className="h-16" />
              </div>
              <div className="text-center space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">2025</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Founded</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Gratuito</div>
                  </div>
                </div>
                <Separator />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  "Transformando a forma como você gerencia suas finanças pessoais"
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}