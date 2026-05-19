import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Wallet, Settings, PiggyBank, ArrowRight } from 'lucide-react';

interface Acao {
  titulo: string;
  descricao: string;
  href: string;
  icone: React.ElementType;
  variant: 'default' | 'outline';
}

const acoes: Acao[] = [
  {
    titulo: 'Adicionar Despesa',
    descricao: 'Nova transação',
    href: '/financeiro',
    icone: Plus,
    variant: 'default',
  },
  {
    titulo: 'Ver Finanças',
    descricao: 'Módulo completo',
    href: '/financeiro',
    icone: Wallet,
    variant: 'outline',
  },
  {
    titulo: 'Configurações',
    descricao: 'Preferências',
    href: '/settings',
    icone: Settings,
    variant: 'outline',
  },
];

export function AcoesRapidas() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <PiggyBank className="w-4 h-4" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {acoes.map((acao, index) => (
          <Link
            key={index}
            to={acao.href}
            className="block"
          >
            <Button
              variant={acao.variant}
              className="w-full justify-between h-11"
            >
              <div className="flex items-center gap-3">
                <acao.icone className="w-4 h-4" />
                <span className="text-sm font-medium">{acao.titulo}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}