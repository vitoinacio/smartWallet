import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Moon, Sun, Bell, Mail, Clock } from 'lucide-react';
import { AppSettings } from '../../models';

interface SettingsAppProps {
  settings: AppSettings;
  onUpdate: (key: keyof AppSettings, value: boolean | string) => void;
  theme: 'light' | 'dark';
}

export function SettingsApp({ settings, onUpdate, theme }: SettingsAppProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>Personalize a visualização do aplicativo</CardDescription>
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
                <Label className="font-medium">Tema Escuro</Label>
                <p className="text-sm text-muted-foreground">
                  {theme === 'dark' ? 'Modo escuro ativado' : 'Modo claro ativado'}
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
          <CardTitle>Notificações</CardTitle>
          <CardDescription>Gerencie como você recebe notificações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Notificações Push</Label>
                <p className="text-sm text-muted-foreground">
                  Receber alertas sobre contas a pagar
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
                <Label className="font-medium">Confirmação por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receber confirmações de transações
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
          <CardTitle>Sessão</CardTitle>
          <CardDescription>Preferências de login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Lembrar Login</Label>
                <p className="text-sm text-muted-foreground">
                  Manter sessão ativa por mais tempo
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