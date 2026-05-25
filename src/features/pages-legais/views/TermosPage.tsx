import { useTranslation } from "react-i18next"
import { Wallet, ArrowLeft, Shield, FileText, CheckCircle, AlertCircle, Sun, Moon } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import useTheme from "@/core/viewModels/useTheme"

const TermosDeUso = () => {
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
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-700 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {t('termos.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('termos.ultimaAtualizacao')}
            </p>
          </div>

          {/* Introdução */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {t('termos.introducao')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('termos.introducaoTexto')}
            </p>
          </section>

          {/* Aceitação dos Termos */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {t('termos.aceitacao')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('termos.aceitacaoTexto')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>{t('termos.aceitacaoItem1')}</li>
              <li>{t('termos.aceitacaoItem2')}</li>
              <li>{t('termos.aceitacaoItem3')}</li>
              <li>{t('termos.aceitacaoItem4')}</li>
            </ul>
          </section>

          {/* Uso do Serviço */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {t('termos.uso')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('termos.usoTexto')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li>{t('termos.usoItem1')}</li>
              <li>{t('termos.usoItem2')}</li>
              <li>{t('termos.usoItem3')}</li>
              <li>{t('termos.usoItem4')}</li>
              <li>{t('termos.usoItem5')}</li>
              <li>{t('termos.usoItem6')}</li>
            </ul>
          </section>

          {/* Conta do Usuário */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              {t('termos.conta')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('termos.contaTexto')}
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>{t('termos.contaDicaStrong')}</strong> {t('termos.contaDicaTexto')}
              </p>
            </div>
          </section>

          {/* Dados e Privacidade */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              {t('termos.dadosPrivacidade')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('termos.dadosTexto1')}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('termos.dadosTexto2')}
            </p>
          </section>

          {/* Limitação de Responsabilidade */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              {t('termos.limitacao')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('termos.limitacaoTexto1')}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('termos.limitacaoTexto2')}
            </p>
          </section>

          {/* Alterações nos Termos */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              {t('termos.alteracoes')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('termos.alteracoesTexto')}
            </p>
          </section>

          {/* Contato */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('termos.contato')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t('termos.contatoTexto')}
            </p>
            <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> {t('termos.contatoEmail')}<br />
                <strong>Website:</strong> {t('termos.contatoSite')}
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer simples */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-neutral-700">
        <p>{t('termos.footer')}</p>
      </footer>
    </div>
  )
}

export default TermosDeUso