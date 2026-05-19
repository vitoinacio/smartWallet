import useUserInfo from '@/core/viewModels/useUserInfo';
import { Card, CardContent } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';
import Loading from '@/core/components/Loading';

export function SaudacaoUsuario() {
  const { userData, loading } = useUserInfo();

  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getDataFormatada = () => {
    const hoje = new Date();
    return hoje.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardContent className="p-6">
          <Loading size={32} message="" className="text-white" />
        </CardContent>
      </Card>
    );
  }

  const nome = userData?.nome || 'Usuário';

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {getSaudacao()}, {nome.split(' ')[0]}!
            </h2>
            <p className="text-blue-100 mt-1">
              Aqui está o resumo das suas finanças
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-blue-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm capitalize">{getDataFormatada()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-sm">{nome}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}