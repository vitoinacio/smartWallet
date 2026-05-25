import { useTranslation } from 'react-i18next';
import { useSettings } from '../viewModels';
import { SettingsNav, SettingsPerfil, SettingsApp, SettingsSeguranca, SettingsDados, SettingsSobre } from './components';

const SettingsPage = () => {
  const { t } = useTranslation('settings');
  const {
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
  } = useSettings();

  const renderContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <SettingsPerfil
            userData={userData}
            loading={loadingUser}
            onLogout={logout}
          />
        );
      case 'aplicativo':
        return (
          <SettingsApp
            settings={appSettings}
            onUpdate={updateAppSettings}
            theme={theme}
          />
        );
      case 'seguranca':
        return <SettingsSeguranca />;
      case 'dados':
        return (
          <SettingsDados
            onExport={exportData}
            onClearData={clearAllData}
          />
        );
      case 'sobre':
        return <SettingsSobre />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full mt-6 px-4 lg:px-6 pb-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-6">
              <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>

          <div className="flex-1 max-w-3xl">
            {renderContent()}
          </div>
        </div>
      </div>

    </main>
  );
};

export default SettingsPage;