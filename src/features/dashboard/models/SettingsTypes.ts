export interface UserProfile {
  nome: string;
  email: string;
  sexo: string;
  dataNasc: string;
}

export interface AppSettings {
  tema: 'light' | 'dark';
  notificacoes: boolean;
  emailConfirmacao: boolean;
  lembrarLogin: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string | null;
}

export interface DataManagement {
  exportarDados: boolean;
  limparDados: boolean;
  termoExportacao: boolean;
}

export const SETTINGS_TABS = [
  { id: 'perfil', label: 'Perfil', icon: 'User' },
  { id: 'app', label: 'Aplicativo', icon: 'Smartphone' },
  { id: 'seguranca', label: 'Segurança', icon: 'Shield' },
  { id: 'dados', label: 'Dados', icon: 'Database' },
  { id: 'sobre', label: 'Sobre', icon: 'Info' },
] as const;

export type SettingsTab = typeof SETTINGS_TABS[number]['id'];