import { Button } from '@/components/ui/button';
import HeaderContainer from './HeaderContainer';
import HeaderIcon from './HeaderIcon';
import HeaderNav from './HeaderNav';
import { links } from './HeaderNav';
import { Menu, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useTheme from '@/core/viewModels/useTheme';
import { useIsMobile } from '@/core/viewModels/use-mobile';

const Header = () => {
  const { handleTheme, theme } = useTheme();
  const isMobile = useIsMobile();

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
              aria-label="Alternar tema"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-gray-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>
            
            <a href="/login">
              <Button 
                variant="ghost"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Entrar
              </Button>
            </a>
            
            <a href="/CreateAccount">
              <Button 
                className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6"
              >
                Criar Conta
              </Button>
            </a>
          </div>
        </>
      ) : (
        <>
          <div />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-200">
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-4" align="end">
              <DropdownMenuLabel className="flex justify-between items-center">
                Menu
                <button
                  onClick={handleTheme}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-neutral-800"
                >
                  {theme === 'light' ? (
                    <Moon className="w-3 h-3 text-gray-600" />
                  ) : (
                    <Sun className="w-3 h-3 text-amber-400" />
                  )}
                </button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {links.map((link, index) => (
                <a href={link.path} key={index}>
                  <DropdownMenuItem>{link.title}</DropdownMenuItem>
                </a>
              ))}
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-2 p-2">
                <a href="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Entrar
                  </Button>
                </a>
                <a href="/CreateAccount" className="w-full">
                  <Button className="w-full bg-blue-700 hover:bg-blue-800">
                    Criar Conta
                  </Button>
                </a>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;