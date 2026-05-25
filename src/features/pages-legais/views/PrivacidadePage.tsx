import { useTranslation } from "react-i18next"
import { Wallet, ArrowLeft, Shield, Eye, Lock, Database, Bell, UserCheck, Sun, Moon } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import useTheme from "@/core/viewModels/useTheme"

const PoliticaPrivacidade = () => {
  const { t } = useTranslation('legal')
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
                {t('common:back')}
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
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-700 dark:text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {t('privacidade.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('termos.ultimaAtualizacao')}
            </p>
          </div>

          {/* Introdução */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-500" />
              {t('privacidade.compromisso')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacidade.compromissoTexto')}
            </p>
          </section>

          {/* Informações Coletadas */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-500" />
              {t('privacidade.coletamos')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('privacidade.coletamosTexto')}
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('privacidade.coletamosConta')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('privacidade.coletamosContaTexto')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('privacidade.coletamosFinanceiros')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('privacidade.coletamosFinanceirosTexto')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('privacidade.coletamosUso')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('privacidade.coletamosUsoTexto')}
                </p>
              </div>
            </div>
          </section>

          {/* Como usamos as informações */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-500" />
              {t('privacidade.usamos')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('privacidade.usamosTexto')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>{t('privacidade.usamosItem1')}</li>
              <li>{t('privacidade.usamosItem2')}</li>
              <li>{t('privacidade.usamosItem3')}</li>
              <li>{t('privacidade.usamosItem4')}</li>
              <li>{t('privacidade.usamosItem5')}</li>
              <li>{t('privacidade.usamosItem6')}</li>
            </ul>
          </section>

          {/* Compartilhamento de Dados */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-500" />
              {t('privacidade.compartilhamento')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('privacidade.compartilhamentoTexto1')}<strong>{t('privacidade.compartilhamentoNunca')}</strong>{t('privacidade.compartilhamentoTexto2')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li><strong>{t('privacidade.compartilhamentoItem1Strong')}</strong>{t('privacidade.compartilhamentoItem1Texto')}</li>
              <li><strong>{t('privacidade.compartilhamentoItem2Strong')}</strong>{t('privacidade.compartilhamentoItem2Texto')}</li>
              <li><strong>{t('privacidade.compartilhamentoItem3Strong')}</strong>{t('privacidade.compartilhamentoItem3Texto')}</li>
            </ul>
          </section>

          {/* Segurança */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              {t('privacidade.seguranca')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('privacidade.segurancaTexto')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('privacidade.segurancaTitulo1')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('privacidade.segurancaTexto1')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('privacidade.segurancaTitulo2')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('privacidade.segurancaTexto2')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('privacidade.segurancaTitulo3')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('privacidade.segurancaTexto3')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('privacidade.segurancaTitulo4')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('privacidade.segurancaTexto4')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Seus Direitos */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-500" />
              {t('privacidade.direitos')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('privacidade.direitosTexto')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li><strong>{t('privacidade.direitosItem1Strong')}</strong>{t('privacidade.direitosItem1Texto')}</li>
              <li><strong>{t('privacidade.direitosItem2Strong')}</strong>{t('privacidade.direitosItem2Texto')}</li>
              <li><strong>{t('privacidade.direitosItem3Strong')}</strong>{t('privacidade.direitosItem3Texto')}</li>
              <li><strong>{t('privacidade.direitosItem4Strong')}</strong>{t('privacidade.direitosItem4Texto')}</li>
              <li><strong>{t('privacidade.direitosItem5Strong')}</strong>{t('privacidade.direitosItem5Texto')}</li>
            </ul>
          </section>

          {/* Notificações */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              {t('privacidade.notificacoes')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('privacidade.notificacoesTexto')}
            </p>
          </section>

          {/* Retenção de Dados */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-500" />
              {t('privacidade.retencao')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacidade.retencaoTexto')}
            </p>
          </section>

          {/* Crianças */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacidade.criancas')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacidade.criancasTexto')}
            </p>
          </section>

          {/* Alterações */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacidade.alteracoes')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacidade.alteracoesTexto')}
            </p>
          </section>

          {/* Contato */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacidade.contato')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('privacidade.contatoTexto')}
            </p>
            <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> {t('privacidade.contatoEmail')}<br />
                <strong>Website:</strong> {t('privacidade.contatoSite')}
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer simples */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-neutral-700">
        <p>{t('privacidade.footer')}</p>
      </footer>
    </div>
  )
}

export default PoliticaPrivacidade