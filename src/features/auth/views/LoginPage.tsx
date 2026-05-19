import LoginForm from "../views/components/LoginForm"
import { ToastContainer } from "react-toastify"
import { Wallet, TrendingUp, PiggyBank } from "lucide-react"

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Decorativo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 relative overflow-hidden">
        {/* Formas decorativas */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl" />
        </div>
        
        {/* Conteúdo do lado esquerdo */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Wallet className="w-8 h-8" />
            </div>
            <span className="text-3xl font-bold">SmartWallet</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Controle suas finanças<br />
            <span className="text-blue-200">de forma inteligente</span>
          </h1>
          
          <p className="text-lg text-blue-100 mb-12 max-w-md">
            Acesse sua conta e tenha o controle total das suas finanças pessoais de forma simples e eficiente.
          </p>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <span className="text-sm">Gráficos</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <PiggyBank className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <span className="text-sm">Economia</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Wallet className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <span className="text-sm">Controle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-neutral-900">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-700 dark:text-white">
              SmartWallet
            </span>
          </div>
          
          <LoginForm />
        </div>
      </div>
      
      <ToastContainer />
    </div>
  )
}

export default Login