import { Wallet, ArrowLeft, Shield, FileText, CheckCircle, AlertCircle, Sun, Moon } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import useTheme from "@/core/viewModels/useTheme"

const TermosDeUso = () => {
  const { handleTheme, theme } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Smart<span className="text-blue-700 dark:text-blue-400">Wallet</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleTheme} className="dark:text-white">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 md:p-12">
          {/* Título */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-700 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Termos de Uso
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Última atualização: Janeiro de 2025
            </p>
          </div>

          {/* Introdução */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Introdução
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Bem-vindo ao SmartWallet! Estes Termos de Uso regem o uso do nosso aplicativo 
              de gestão financeira pessoal. Ao acessar e usar o SmartWallet, você concorda em 
              cumprir estes termos. Se você não concordar com qualquer parte destes termos, 
              não deverá usar nosso serviço.
            </p>
          </section>

          {/* Aceitação dos Termos */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Aceitação dos Termos
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Ao criar uma conta no SmartWallet, você declara que:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>Tem pelo menos 18 anos de idade ou maioridade legal em sua jurisdição</li>
              <li>Possui capacidade legal para celebrar contratos vinculantes</li>
              <li>Todas as informações fornecidas são verdadeiras, precisas e completas</li>
              <li>Você está autorizado a usar este serviço em conformidade com as leis aplicáveis</li>
            </ul>
          </section>

          {/* Uso do Serviço */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Uso do Serviço
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Você concorda em usar o SmartWallet apenas para fins legais e de acordo com estes termos. 
              Você não poderá:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>Usar o serviço de forma fraudulenta ou enganosa</li>
              <li>Violar quaisquer leis ou regulamentos aplicáveis</li>
              <li>Infringir direitos de terceiros, incluindo direitos de propriedade intelectual</li>
              <li>Transmitir vírus, malware ou qualquer código malicioso</li>
              <li>Tentar acessar sem autorização os sistemas do SmartWallet</li>
              <li>Usar robôs ou métodos automatizados para acessar o serviço</li>
            </ul>
          </section>

          {/* Conta do Usuário */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Conta do Usuário
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Você é responsável por manter a confidencialidade de sua conta e senha. 
              Você deve notificar imediatamente o SmartWallet sobre qualquer uso não autorizado 
              de sua conta. O SmartWallet não será responsável por quaisquer perdas decorrentes 
              do uso não autorizado de sua conta.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Importante:</strong> Mantenha suas credenciais de login em segurança. 
                Nunca compartilhe sua senha com terceiros.
              </p>
            </div>
          </section>

          {/* Dados e Privacidade */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Dados e Privacidade
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              O SmartWallet coleta e processa seus dados pessoais conforme descrito em nossa 
              Política de Privacidade. Ao usar o serviço, você consente com tal processamento.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Todos os seus dados financeiros são armazenados de forma segura e criptografada. 
              Utilizamos medidas de segurança técnicas e organizacionais adequadas para proteger 
              suas informações.
            </p>
          </section>

          {/* Limitação de Responsabilidade */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Limitação de Responsabilidade
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              O SmartWallet é fornecido "como está" sem garantias de qualquer tipo, expressas 
              ou implícitas. Não garantimos que o serviço será sempre disponível, seguro ou livre 
              de erros.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Em nenhuma circunstância o SmartWallet será responsável por quaisquer danos diretos, 
              indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou inabilidade 
              de usar o serviço.
            </p>
          </section>

          {/* Alterações nos Termos */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              Alterações nos Termos
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              O SmartWallet reserva-se o direito de modificar estes termos a qualquer momento. 
              As alterações serão comunicadas através do aplicativo. O uso contínuo do serviço 
              após a publicação das alterações constitui sua aceitação dos novos termos.
            </p>
          </section>

          {/* Contato */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Entre em Contato
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> smartwallet@example.com<br />
                <strong>Website:</strong> www.smartwallet.com.br
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer simples */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-neutral-700">
        <p>© 2025 SmartWallet. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default TermosDeUso