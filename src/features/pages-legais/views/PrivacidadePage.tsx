import { Wallet, ArrowLeft, Shield, Eye, Lock, Database, Bell, UserCheck } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const PoliticaPrivacidade = () => {
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
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 md:p-12">
          {/* Título */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-700 dark:text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Política de Privacidade
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Última atualização: Janeiro de 2025
            </p>
          </div>

          {/* Introdução */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-500" />
              Nossa Commitment com a Privacidade
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              A SmartWallet leva sua privacidade a sério. Esta Política de Privacidade descreve 
              como coletamos, usamos, compartilhamos e protegemos suas informações pessoais. 
              Ao usar nosso aplicativo, você concorda com as práticas descritas nesta política.
            </p>
          </section>

          {/* Informações Coletadas */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-500" />
              Informações que Coletamos
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Coletamos as seguintes categorias de informações:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Informações de Conta
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nome, email, senha criptografada, data de nascimento e sexo fornecidos 
                  durante o cadastro.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Dados Financeiros
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Informações sobre suas receitas, débitos e transações financeiras 
                  que você adiciona manualmente ao aplicativo.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Dados de Uso
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Informações sobre como você usa o aplicativo, incluindo preferências 
                  de tema e configurações.
                </p>
              </div>
            </div>
          </section>

          {/* Como usamos as informações */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-500" />
              Como Usamos suas Informações
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>Fornecer e manter nossos serviços</li>
              <li>Personalizar sua experiência no aplicativo</li>
              <li>Enviar notificações sobre débitos e lembretes</li>
              <li>Melhorar e desenvolver novos recursos</li>
              <li>Comunicar atualizações e suporte</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          {/* Compartilhamento de Dados */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-500" />
              Compartilhamento de Dados
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              A SmartWallet <strong>nunca</strong> vende suas informações pessoais. 
              Compartilhamos seus dados apenas nas seguintes circunstâncias:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li><strong>Prestadores de serviços:</strong> Empresas que nos ajudam a operar o aplicativo (hospedagem, infraestrutura)</li>
              <li><strong>Requisitos legais:</strong> Quando exigido por lei ou autoridades competentes</li>
              <li><strong>Proteção de direitos:</strong> Para proteger nossos direitos ou segurança</li>
            </ul>
          </section>

          {/* Segurança */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Segurança dos Dados
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Implementamos medidas de segurança robustas para proteger suas informações:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Criptografia</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dados criptografados em repouso e em trânsito</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Autenticação</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Login seguro com credenciais criptografadas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">AWS</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Infraestrutura segura em nuvem AWS</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Monitoramento</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monitoramento contínuo de segurança</p>
                </div>
              </div>
            </div>
          </section>

          {/* Seus Direitos */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-500" />
              Seus Direitos
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Você tem os seguintes direitos sobre seus dados:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li><strong>Acesso:</strong> Solicitar uma cópia dos seus dados</li>
              <li><strong>Correção:</strong> Solicitar correção de dados incorretos</li>
              <li><strong>Exclusão:</strong> Solicitar a remoção dos seus dados</li>
              <li><strong>Portabilidade:</strong> Receber seus dados em formato legível</li>
              <li><strong>Retirada:</strong> Retirar o consentimento a qualquer momento</li>
            </ul>
          </section>

          {/* Notificações */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              Notificações
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Você pode configurar as notificações que deseja receber nas configurações do aplicativo. 
              Você pode desativar notificações a qualquer momento.
            </p>
          </section>

          {/* Retenção de Dados */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-500" />
              Retenção de Dados
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Mantemos seus dados apenas pelo tempo necessário para fornecer nossos serviços. 
              Quando você excluir sua conta, removeremos seus dados dentro de 30 dias, exceto 
              quando exigido por lei manter certos dados por mais tempo.
            </p>
          </section>

          {/* Crianças */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Crianças
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              O SmartWallet não é direcionado a crianças menores de 13 anos. Não coletamos 
              intencionalmente informações de crianças. Se você acredita que coletamos informações 
              de uma criança, entre em contato conosco imediatamente.
            </p>
          </section>

          {/* Alterações */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Alterações nesta Política
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
              alterações significativas através do aplicativo. A data no topo desta página 
              indica quando a política foi atualizada pela última vez.
            </p>
          </section>

          {/* Contato */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Entre em Contato
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, 
              entre em contato conosco:
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

export default PoliticaPrivacidade