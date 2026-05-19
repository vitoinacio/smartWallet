import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import Loading from '@/core/components/Loading';

interface SettingsPerfilProps {
  userData: {
    nome?: string;
    email?: string;
    sexo?: string;
    datanasc?: string;
    foto?: string | null;
  } | null;
  loading: boolean;
  onLogout: () => void;
}

export function SettingsPerfil({ userData, loading, onLogout }: SettingsPerfilProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <Loading message="Carregando perfil..." />
        </CardContent>
      </Card>
    );
  }

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Perfil</CardTitle>
          <CardDescription>Visualize suas informações pessoais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData?.foto || ''} alt={userData?.nome} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {userData?.nome ? getInitials(userData.nome) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{userData?.nome || 'Usuário'}</h3>
              <p className="text-sm text-muted-foreground">{userData?.email || 'Email não cadastrado'}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome
              </Label>
              <Input 
                value={userData?.nome || ''} 
                disabled 
                className="bg-muted"
              />
            </div>

            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input 
                value={userData?.email || ''} 
                disabled 
                className="bg-muted"
              />
            </div>

            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data de Nascimento
              </Label>
              <Input 
                value={userData?.datanasc || ''} 
                disabled 
                className="bg-muted"
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Para alterar informações do perfil, entre em contato com o suporte.
          </p>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
          <CardDescription>Ações irreversíveis</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair da Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}