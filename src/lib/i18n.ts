import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ptBRCommon from '../locales/pt-BR/common.json';
import ptBRLayout from '../locales/pt-BR/layout.json';
import ptBRHome from '../locales/pt-BR/home.json';
import ptBRAuth from '../locales/pt-BR/auth.json';
import ptBROnboarding from '../locales/pt-BR/onboarding.json';
import ptBRDashboard from '../locales/pt-BR/dashboard.json';
import ptBRFinanceiro from '../locales/pt-BR/financeiro.json';
import ptBRMetas from '../locales/pt-BR/metas.json';
import ptBRExtrato from '../locales/pt-BR/extrato.json';
import ptBRSettings from '../locales/pt-BR/settings.json';
import ptBRLegal from '../locales/pt-BR/legal.json';
import enUSCommon from '../locales/en-US/common.json';
import enUSLayout from '../locales/en-US/layout.json';
import enUSHome from '../locales/en-US/home.json';
import enUSAuth from '../locales/en-US/auth.json';
import enUSOnboarding from '../locales/en-US/onboarding.json';
import enUSDashboard from '../locales/en-US/dashboard.json';
import enUSFinanceiro from '../locales/en-US/financeiro.json';
import enUSMetas from '../locales/en-US/metas.json';
import enUSExtrato from '../locales/en-US/extrato.json';
import enUSSettings from '../locales/en-US/settings.json';
import enUSLegal from '../locales/en-US/legal.json';

const resources = {
  'pt-BR': {
    common: ptBRCommon,
    layout: ptBRLayout,
    home: ptBRHome,
    auth: ptBRAuth,
    onboarding: ptBROnboarding,
    dashboard: ptBRDashboard,
    financeiro: ptBRFinanceiro,
    metas: ptBRMetas,
    extrato: ptBRExtrato,
    settings: ptBRSettings,
    legal: ptBRLegal,
  },
  'en-US': {
    common: enUSCommon,
    layout: enUSLayout,
    home: enUSHome,
    auth: enUSAuth,
    onboarding: enUSOnboarding,
    dashboard: enUSDashboard,
    financeiro: enUSFinanceiro,
    metas: enUSMetas,
    extrato: enUSExtrato,
    settings: enUSSettings,
    legal: enUSLegal,
  },
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
