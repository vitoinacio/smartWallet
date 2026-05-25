import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

export function SettingsSobre() {
  const { t } = useTranslation('settings');
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <span className="text-2xl font-bold text-primary-foreground">SW</span>
          </div>
          <CardTitle className="text-2xl">{t('sobre.title')}</CardTitle>
          <CardDescription>{t('sobre.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-2">
            <Badge variant="outline">{t('sobre.versao')}</Badge>
            <Badge variant="secondary">{t('sobre.beta')}</Badge>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            {t('sobre.descricao')}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('sobre.linksUteis')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-between" asChild>
            <a href="/termos" target="_blank">
              {t('sobre.termos')}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          
          <Button variant="ghost" className="w-full justify-between" asChild>
            <a href="/privacidade" target="_blank">
              {t('sobre.privacidade')}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          
          <Button variant="ghost" className="w-full justify-between" asChild>
            <a href="/fale-conosco" target="_blank">
              {t('sobre.faleConosco')}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('sobre.tecnologias')}</CardTitle>
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
            {t('sobre.direitos')}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {t('sobre.feitoCom')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}