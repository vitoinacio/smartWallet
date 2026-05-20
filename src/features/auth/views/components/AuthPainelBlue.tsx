import { Wallet, TrendingUp, PiggyBank, ArrowRight, CheckCircle2, Star, LucideIcon, Lock, ShieldCheck } from 'lucide-react';

interface AuthPainelBlueProps {
  variant: 'login' | 'cadastro' | 'recuperar';
  onToggle: () => void;
  isAnimating: boolean;
}

export function AuthPainelBlue({ variant, onToggle, isAnimating }: AuthPainelBlueProps) {
  const isLogin = variant === 'login';
  const isRecuperar = variant === 'recuperar';

  return (
    <div className="hidden lg:flex flex-col justify-center px-8 lg:px-16 xl:px-24 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Wallet className="w-8 h-8" />
          </div>
          <span className="text-3xl font-bold">SmartWallet</span>
        </div>

        {isLogin && (
          <>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Controle suas<br />
              <span className="text-blue-200">finanças</span>
            </h1>
            <p className="text-base text-blue-100 mb-6 max-w-md">
              Tenha o controle total das suas finanças pessoais de forma simples.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <AuthPainelFeature icon={TrendingUp} text="Gráficos" />
              <AuthPainelFeature icon={PiggyBank} text="Economia" />
              <AuthPainelFeature icon={Wallet} text="Controle" />
            </div>
          </>
        )}

        {isRecuperar && (
          <>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Esqueceu sua<br />
              <span className="text-blue-200">senha?</span>
            </h1>
            <p className="text-base text-blue-100 mb-6 max-w-md">
              Não se preocupe! Vamos ajudá-lo a recuperar o acesso à sua conta.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <AuthPainelFeature icon={Lock} text="Segurança" />
              <AuthPainelFeature icon={ShieldCheck} text="Rápido" />
              <AuthPainelFeature icon={Mail} text="E-mail" />
              <AuthPainelFeature icon={CheckCircle2} text="Simple" />
            </div>
          </>
        )}

        {!isRecuperar && !isLogin && (
          <>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Transforme suas<br />
              <span className="text-blue-200">finanças agora</span>
            </h1>
            <p className="text-base text-blue-100 mb-6 max-w-md">
              Tudo que você precisa para organizar sua vida financeira em um só lugar.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {authFeatures.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-blue-50 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm rounded-lg px-3 py-2 w-fit mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-100 text-sm font-medium">100% Gratuito</span>
            </div>
          </>
        )}

        <button
          onClick={onToggle}
          disabled={isAnimating}
          className="group flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          {isLogin ? (
            <>
              <span className="text-white font-medium">Criar conta grátis</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </>
          ) : isRecuperar ? (
            <>
              <ArrowRight className="w-4 h-4 text-white rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span className="text-white font-medium">Voltar ao login</span>
            </>
          ) : (
            <>
              <ArrowRight className="w-4 h-4 text-white rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span className="text-white font-medium">Fazer login</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function AuthPainelFeature({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
      <Icon className="w-5 h-5 mx-auto mb-1 text-blue-200" />
      <span className="text-xs">{text}</span>
    </div>
  );
}

const authFeatures = [
  { icon: TrendingUp, text: 'Controle', color: 'text-green-400' },
  { icon: PiggyBank, text: 'Economia', color: 'text-orange-400' },
  { icon: Wallet, text: 'Metas', color: 'text-purple-400' },
  { icon: CheckCircle2, text: 'Simples', color: 'text-blue-400' },
];

import { Mail } from 'lucide-react';