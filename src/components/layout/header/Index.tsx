import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import HeaderContainer from './HeaderContainer';
import HeaderIcon from './HeaderIcon';
import HeaderNav from './HeaderNav';
import { links } from './HeaderNav';
import i18n from '@/lib/i18n';
import { Menu, Moon, Sun, ArrowRight, Globe } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import useTheme from '@/core/viewModels/useTheme';
import { useIsMobile } from '@/core/viewModels/use-mobile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation('layout');
  const { handleTheme, theme } = useTheme();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setOpen(false);
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavLogin = () => {
    setOpen(false);
    navigate('/login');
  };

  const handleNavCreateAccount = () => {
    setOpen(false);
    navigate('/CreateAccount');
  };

  return (
    <HeaderContainer>
      <HeaderIcon
        isLogoName={true}
        variant="logoAzul"
        className="text-blue-700"
      />
      
      {!isMobile ? (
        <>
          <HeaderNav />
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-700 transition-all duration-200 hover:scale-105"
              aria-label={t('header.toggleTheme')}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-gray-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR')}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-700 transition-all duration-200 hover:scale-105"
              aria-label={i18n.language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
            >
              <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            
            <a href="/login">
              <Button 
                variant="ghost"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                {t('header.login')}
              </Button>
            </a>
            
            <a href="/CreateAccount">
              <Button 
                className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6"
              >
                {t('header.criarConta')}
              </Button>
            </a>
          </div>
        </>
      ) : (
        <>
          <div />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-200">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col h-screen">
              <SheetHeader className="px-6 py-4 border-b border-gray-100 dark:border-neutral-800 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                    <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">SW</span>
                    </div>
                    {t('header.title')}
                  </SheetTitle>
                </div>
              </SheetHeader>
              
              <div className="flex flex-col flex-1 min-h-0">
                {/* Theme & Language Toggle */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-neutral-800 flex-shrink-0 space-y-2">
                  <button
                    onClick={handleTheme}
                    className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {theme === 'dark' ? t('header.lightMode') : t('header.darkMode')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      {theme === 'dark' ? (
                        <Sun className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Moon className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => i18n.changeLanguage(i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR')}
                    className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {i18n.language === 'pt-BR' ? 'English' : 'Português'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                  </button>
                </div>

                {/* Navigation Links - com scroll interno */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                  {links.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigate(link.path)}
                      className="flex items-center justify-between w-full p-4 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200 group"
                    >
                      <span className="font-medium">{t(link.title)}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </nav>

                {/* Action Buttons */}
                <div className="p-6 border-t border-gray-100 dark:border-neutral-800 space-y-3 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-base font-medium border-2"
                    onClick={handleNavLogin}
                  >
                    {t('header.login')}
                  </Button>
                  <Button 
                    className="w-full h-12 text-base font-medium bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={handleNavCreateAccount}
                  >
                    {t('header.criarContaGratis')}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;