import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Moon, Sun, Bell, Mail, Clock, Languages } from 'lucide-react';
import { AppSettings } from '../../models';

interface SettingsAppProps {
  settings: AppSettings;
  onUpdate: (key: keyof AppSettings, value: boolean | string) => void;
  theme: 'light' | 'dark';
}

export function SettingsApp({ settings, onUpdate, theme }: SettingsAppProps) {
  const { t } = useTranslation('settings');
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('app.title')}</CardTitle>
          <CardDescription>{t('app.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <Label className="font-medium">{t('app.temaEscuro')}</Label>
                <p className="text-sm text-muted-foreground">
                  {theme === 'dark' ? t('app.modoEscuroAtivo') : t('app.modoClaroAtivo')}
                </p>
              </div>
            </div>
            <Checkbox
              checked={theme === 'dark'}
              onCheckedChange={() => onUpdate('tema', theme === 'light' ? 'dark' : 'light')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('app.notificacoes')}</CardTitle>
          <CardDescription>{t('app.notificacoesSub')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">{t('app.push')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('app.pushDesc')}
                </p>
              </div>
            </div>
            <Checkbox
              checked={settings.notificacoes}
              onCheckedChange={(checked) => onUpdate('notificacoes', checked === true)}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">{t('app.emailConfirm')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('app.emailConfirmDesc')}
                </p>
              </div>
            </div>
            <Checkbox
              checked={settings.emailConfirmacao}
              onCheckedChange={(checked) => onUpdate('emailConfirmacao', checked === true)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('idioma.title')}</CardTitle>
          <CardDescription>{t('idioma.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 rounded-lg border">
            <Languages className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <Label className="font-medium">{t('idioma.title')}</Label>
            </div>
            <Select
              value={i18n.language}
              onValueChange={(value) => i18n.changeLanguage(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">{t('idioma.ptBR')}</SelectItem>
                <SelectItem value="en-US">{t('idioma.enUS')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('app.sessao')}</CardTitle>
          <CardDescription>{t('app.sessaoSub')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">{t('app.lembrarLogin')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('app.lembrarLoginDesc')}
                </p>
              </div>
            </div>
            <Checkbox
              checked={settings.lembrarLogin}
              onCheckedChange={(checked) => onUpdate('lembrarLogin', checked === true)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}