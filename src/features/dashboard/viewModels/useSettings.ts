import { useState, useEffect, useCallback } from 'react';
import toast from '@/components/ui/sonner';
import useTheme from '@/core/viewModels/useTheme';
import useUserInfo from '@/core/viewModels/useUserInfo';
import { AppSettings, SettingsTab } from '../models';

const SETTINGS_STORAGE_KEY = 'app_settings';

export function useSettings() {
  const { theme, handleTheme } = useTheme();
  const { userData, loading: loadingUser } = useUserInfo();
  
  const [activeTab, setActiveTab] = useState<SettingsTab>('perfil');
  const [appSettings, setAppSettings] = useState<AppSettings>({
    tema: 'light',
    notificacoes: true,
    emailConfirmacao: true,
    lembrarLogin: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setAppSettings(parsed);
      if (parsed.tema !== theme) {
        handleTheme();
      }
    }
  }, []);

  const updateAppSettings = useCallback((key: keyof AppSettings, value: boolean | string) => {
    const newSettings = { ...appSettings, [key]: value };
    setAppSettings(newSettings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));

    if (key === 'tema' && value !== theme) {
      handleTheme();
    }

    toast({
      title: 'Configuração salva',
      position: 'bottom-right',
      type: 'success',
      autoClose: 2000,
      theme,
    });
  }, [appSettings, theme, handleTheme]);

  const exportData = useCallback(async () => {
    toast({
      title: 'Preparando exportação...',
      position: 'bottom-right',
      type: 'info',
      autoClose: 2000,
      theme,
    });

    setTimeout(() => {
      const data = {
        usuario: userData,
        configuracoes: appSettings,
        dataExportacao: new Date().toISOString(),
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `smartwallet_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: 'Dados exportados com sucesso!',
        position: 'bottom-right',
        type: 'success',
        autoClose: 3000,
        theme,
      });
    }, 1000);
  }, [userData, appSettings, theme]);

  const clearAllData = useCallback(async () => {
    localStorage.clear();
    sessionStorage.clear();
    
    toast({
      title: 'Dados limpos com sucesso',
      position: 'bottom-right',
      type: 'success',
      autoClose: 3000,
      theme,
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }, [theme]);

  const logout = useCallback(() => {
    sessionStorage.removeItem('UserProvider');
    sessionStorage.removeItem('userData');
    window.location.href = '/';
  }, []);

  return {
    activeTab,
    setActiveTab,
    appSettings,
    updateAppSettings,
    userData,
    loadingUser,
    exportData,
    clearAllData,
    logout,
    theme,
  };
}