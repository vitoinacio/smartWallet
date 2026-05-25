import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ConfirmDialog } from '@/core/components/ConfirmDialog';
import { User, Mail, Calendar, LogOut } from 'lucide-react';

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
  const { t } = useTranslation('settings');
  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-4 w-72 mt-1" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="grid gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
            <Skeleton className="h-4 w-80" />
          </CardContent>
        </Card>
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-36 mt-1" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
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
          <CardTitle>{t('perfil.title')}</CardTitle>
          <CardDescription>{t('perfil.subtitle')}</CardDescription>
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
              <h3 className="text-lg font-semibold">{userData?.nome || t('perfil.usuario')}</h3>
              <p className="text-sm text-muted-foreground">{userData?.email || t('perfil.emailNaoCadastrado')}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {t('perfil.nome')}
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
                {t('perfil.email')}
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
                {t('perfil.dataNascimento')}
              </Label>
              <Input 
                value={userData?.datanasc || ''} 
                disabled 
                className="bg-muted"
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {t('perfil.alterarInfo')}
          </p>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600">{t('perfil.zonaPerigo')}</CardTitle>
          <CardDescription>{t('perfil.acoesIrreversiveis')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ConfirmDialog
            title={t('perfil.sairConta')}
            description={t('perfil.sairConfirm')}
            confirmText={t('perfil.sair')}
            confirmClassName="bg-red-600 hover:bg-red-700"
            onConfirm={onLogout}
          >
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t('perfil.sairConta')}
            </Button>
          </ConfirmDialog>
        </CardContent>
      </Card>
    </div>
  );
}