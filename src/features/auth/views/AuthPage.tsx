import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, PiggyBank, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import LoginForm from '../views/components/LoginForm';
import CadastroForm from '../views/components/CadastroForm';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';

type AuthMode = 'login' | 'cadastro';

export default function AuthPage() {
  const location = useLocation();
  const [mode, setMode] = useState<AuthMode>('login');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (location.pathname === '/CreateAccount') {
      setMode('cadastro');
    } else {
      setMode('login');
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleToggle = () => {
      toggleMode();
    };
    window.addEventListener('toggleAuthMode', handleToggle);
    return () => window.removeEventListener('toggleAuthMode', handleToggle);
  }, [mode, isAnimating]);

  const toggleMode = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setMode((prev) => (prev === 'login' ? 'cadastro' : 'login'));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="min-h-screen flex overflow-hidden relative bg-gray-50 dark:bg-neutral-900">
      {/* Container com slide para animação */}
      <div className="flex transition-transform duration-500 ease-in-out"
           style={{ 
             transform: mode === 'login' ? 'translateX(0)' : 'translateX(-50%)',
             width: '200%'
           }}>
        
        {/* PAINEL 1 - Login: conteúdo azul à esquerda, formulário à direita */}
        <div className="w-screen min-h-screen flex">
          {/* Painel de Conteúdo Login - Esquerda (azul) */}
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

              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Controle suas<br />
                <span className="text-blue-200">finanças</span>
              </h1>
              <p className="text-base text-blue-100 mb-6 max-w-md">
                Tenha o controle total das suas finanças pessoais de forma simples.
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1 text-blue-200" />
                  <span className="text-xs">Gráficos</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <PiggyBank className="w-5 h-5 mx-auto mb-1 text-blue-200" />
                  <span className="text-xs">Economia</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Wallet className="w-5 h-5 mx-auto mb-1 text-blue-200" />
                  <span className="text-xs">Controle</span>
                </div>
              </div>

              <div className="">
                <button
                  onClick={toggleMode}
                  disabled={isAnimating}
                  className="group flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-xl transition-all duration-300 disabled:opacity-50"
                >
                  <span className="text-white font-medium">Criar conta grátis</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Formulário Login - Direita */}
          <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-8 bg-gray-50 dark:bg-neutral-900">
            <div className="w-full max-w-md">
              <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-blue-700 dark:text-white">SmartWallet</span>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bem-vindo de volta</h2>
                <p className="text-gray-500 dark:text-gray-400">Entre com suas credenciais para continuar</p>
              </div>

              <LoginForm />
            </div>
          </div>
        </div>

        {/* PAINEL 2 - Cadastro: formulário à esquerda, conteúdo azul à direita */}
        <div className="w-screen min-h-screen flex">
          {/* Formulário Cadastro - Esquerda */}
          <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-8 bg-gray-50 dark:bg-neutral-900">
            <div className="w-full max-w-md">
              <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-blue-700 dark:text-white">SmartWallet</span>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Crie sua conta</h2>
                <p className="text-gray-500 dark:text-gray-400">Preencha seus dados para começar</p>
              </div>

              <CadastroForm />
            </div>
          </div>

          {/* Painel de Conteúdo Cadastro - Direita (azul) */}
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

              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Transforme suas<br />
                <span className="text-blue-200">finanças agora</span>
              </h1>
              <p className="text-base text-blue-100 mb-6 max-w-md">
                Tudo que você precisa para organizar sua vida financeira em um só lugar.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: TrendingUp, text: 'Controle', color: 'text-green-400' },
                  { icon: PiggyBank, text: 'Economia', color: 'text-orange-400' },
                  { icon: Wallet, text: 'Metas', color: 'text-purple-400' },
                  { icon: CheckCircle2, text: 'Simples', color: 'text-blue-400' },
                ].map((item, index) => (
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

              <div className="">
                <button
                  onClick={toggleMode}
                  disabled={isAnimating}
                  className="group flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-xl transition-all duration-300 disabled:opacity-50"
                >
                  <ArrowRight className="w-4 h-4 text-white rotate-180 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-white font-medium">Fazer login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}