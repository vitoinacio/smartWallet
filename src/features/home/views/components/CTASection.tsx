import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onCriarConta: () => void;
  onJaTenhoConta: () => void;
}

export function CTASection({ onCriarConta, onJaTenhoConta }: CTASectionProps) {
  return (
    <section id="cta" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-blue-700 to-blue-600 dark:from-blue-800 dark:to-blue-900 p-8 md:p-12 text-center rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pronto para controlar suas finanças?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já descobriram como é simples gerenciar dinheiro com o SmartWallet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onCriarConta} className="bg-white text-blue-700 hover:bg-gray-100 dark:bg-gray-200 dark:text-blue-800">
              Criar Conta Grátis <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" onClick={onJaTenhoConta} className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700">
              Já tenho conta
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}