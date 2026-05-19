import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

export function SettingsSobre() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <span className="text-2xl font-bold text-primary-foreground">SW</span>
          </div>
          <CardTitle className="text-2xl">SmartWallet</CardTitle>
          <CardDescription>Sua gestão financeira pessoal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-2">
            <Badge variant="outline">Versão 1.0.0</Badge>
            <Badge variant="secondary">Beta</Badge>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            SmartWallet é uma aplicação gratuita para gestão financeira pessoal. 
            Controle suas receitas, despesas e alcance suas metas financeiras.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Links Úteis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-between" asChild>
            <a href="/termos" target="_blank">
              Termos de Uso
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          
          <Button variant="ghost" className="w-full justify-between" asChild>
            <a href="/privacidade" target="_blank">
              Política de Privacidade
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          
          <Button variant="ghost" className="w-full justify-between" asChild>
            <a href="/fale-conosco" target="_blank">
              Fale Conosco
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tecnologias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">React 19</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Vite</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
            <Badge variant="outline">shadcn/ui</Badge>
            <Badge variant="outline">Radix UI</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardContent className="py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 SmartWallet. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Desenvolvido com ♥ no Brasil
          </p>
        </CardContent>
      </Card>
    </div>
  );
}