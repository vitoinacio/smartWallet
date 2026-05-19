import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Key, Smartphone, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function SettingsSeguranca() {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleAlterarSenha = () => {
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não conferem');
      return;
    }
    if (novaSenha.length < 8) {
      alert('A senha deve ter pelo menos 8 caracteres');
      return;
    }
    alert('Funcionalidade em desenvolvimento');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Autenticação
          </CardTitle>
          <CardDescription>Gerencie a segurança da sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Autenticação em 2 Fatores</Label>
                <p className="text-sm text-muted-foreground">
                  Adicione uma camada extra de segurança
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Alterar Senha
          </CardTitle>
          <CardDescription>Atualize sua senha de acesso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Senha Atual</Label>
            <Input 
              type="password" 
              placeholder="••••••••"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Nova Senha</Label>
            <Input 
              type="password" 
              placeholder="••••••••"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Mínimo de 8 caracteres com letras e números
            </p>
          </div>

          <div className="grid gap-2">
            <Label>Confirmar Nova Senha</Label>
            <Input 
              type="password" 
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          <Button 
            className="w-full"
            onClick={handleAlterarSenha}
            disabled={!senhaAtual || !novaSenha || !confirmarSenha}
          >
            <Key className="h-4 w-4 mr-2" />
            Alterar Senha
          </Button>
        </CardContent>
      </Card>

      <Card className="border-amber-200 dark:border-amber-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            Sessões Ativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Você está conectado neste dispositivo. Para sair de todos os dispositivos, 
              clique em "Sair da Conta" na seção Perfil.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}