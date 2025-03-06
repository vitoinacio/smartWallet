import { Button } from '@/components/ui/button';
import HeaderContainer from './HeaderContainer';
import HeaderIcon from './HeaderIcon';
import HeaderNav from './HeaderNav';
import { links } from './HeaderNav';
import useScroll from '@/hooks/useScroll';
import { Menu, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Switch from '../../Switch';
import useTheme from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { isScroll } = useScroll();
  const { handleTheme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <>
      <HeaderContainer
        className={isScroll ? 'bg-sidebar h-16' : 'bg-popover h-20'}
      >
        {!isMobile ? (
          <>
            <HeaderIcon
              isLogoName={true}
              variant={isScroll ? 'logoBranca' : 'logoAzul'}
              className={
                isScroll ? 'text-popover' : 'text-sidebar dark:text-blue-800'
              }
            />
            <div>
              <HeaderNav
                className={isScroll ? 'text-popover' : 'text-gray-600'}
              />
            </div>

            <div className="flex gap-4 items-center">
              <Switch
                onClick={handleTheme}
                on={<Moon className="w-4 dark:text-black" />}
                off={<Sun className="w-4 dark:text-black" />}
              />
              <a href="/CreateAccount">
                <Button
                  variant="default"
                  className={
                    isScroll
                      ? 'text-sidebar hover:text-white bg-slate-200 dark:text-blue-800 dark:hover:bg-blue-900 dark:hover:text-white'
                      : 'bg-sidebar hover:bg-sidebar-foreground dark:bg-slate-200 dark:hover:bg-sidebar-accent dark:hover:text-sidebar-primary'
                  }
                >
                  Criar Conta
                </Button>
              </a>
              <a href="/login">
                <Button
                  variant="secondary"
                  className={
                    isScroll
                      ? 'text-blue-800 hover:bg-blue-950 hover:text-white'
                      : 'text-sidebar bg-slate-200 hover:bg-sidebar hover:text-popover dark:hover:text-sidebar-primary'
                  }
                >
                  Login
                </Button>
              </a>
            </div>
          </>
        ) : (
          <>
            <HeaderIcon
              isLogoName={false}
              variant={isScroll ? 'logoBranca' : 'logoAzul'}
              className={isScroll ? 'text-popover' : 'text-sidebar'}
            />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className={isScroll ? 'text-popover' : 'text-sidebar'} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-11 p-2">
                <DropdownMenuLabel className="flex justify-between">
                  Menu{' '}
                  <Switch
                    onClick={handleTheme}
                    on={<Moon className="w-4 dark:text-black" />}
                    off={<Sun className="w-4 dark:text-black" />}
                  />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {links.map((link, index) => (
                  <a href={link.path} key={index}>
                    <DropdownMenuItem>{link.title}</DropdownMenuItem>
                  </a>
                ))}
                <div className="flex gap-3 mt-4 mb-3">
                  <a href="/CreateAccount">
                    <Button
                      variant="default"
                      className="bg-sidebar hover:bg-sidebar-foreground dark:text-blue-800 dark:hover:text-popover"
                    >
                      Criar Conta
                    </Button>
                  </a>
                  <a href="/login">
                    <Button
                      variant="secondary"
                      className="text-sidebar bg-slate-200 hover:bg-sidebar hover:text-popover dark:hover:text-blue-800"
                    >
                      Login
                    </Button>
                  </a>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
