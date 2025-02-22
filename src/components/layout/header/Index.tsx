import { Button } from '@/components/ui/button';
import HeaderContainer from './HeaderContainer';
import HeaderIcon from './HeaderIcon';
import HeaderNav from './HeaderNav';
import { links } from './HeaderNav';
import useScroll from '@/hooks/useScroll';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { isScrolled, windowWidth } = useScroll();

  return (
    <>
      <HeaderContainer clasName={isScrolled ? 'bg-sidebar h-16' : 'bg-popover z-0 h-20'}>
        {!windowWidth ? (
          <>
            <HeaderIcon
              isLogoName={true}
              variant={isScrolled ? 'logoBranca' : 'logoAzul'}
              className={isScrolled ? 'text-popover' : 'text-sidebar dark:text-blue-800'}
            />
            <div>
              <HeaderNav
                className={isScrolled ? 'text-popover' : 'text-gray-600'}
              />
            </div>
            <div className="flex gap-4">
              <Button
                variant="default"
                className={
                  isScrolled
                    ? 'text-sidebar hover:text-white bg-slate-200 dark:text-blue-800 dark:hover:bg-blue-900 dark:hover:text-white'
                    : 'bg-sidebar hover:bg-sidebar-foreground dark:bg-slate-200 dark:hover:bg-sidebar-accent dark:hover:text-sidebar-primary'
                }
              >
                Criar Conta
              </Button>
              <Button
                variant="secondary"
                className={
                  isScrolled
                    ? 'text-blue-800 hover:bg-blue-950 hover:text-white'
                    : 'text-sidebar bg-slate-200 hover:bg-sidebar hover:text-popover dark:hover:text-sidebar-primary'
                }
              >
                Login
              </Button>
            </div>
          </>
        ) : (
          <>
            <HeaderIcon isLogoName={false} variant={isScrolled ? "logoBranca" : "logoAzul"} className={isScrolled ? "text-popover": "text-sidebar"}/>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className={isScrolled ? "text-popover": "text-sidebar"} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-11">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {links.map((link, index) => (
                  <a href={link.path} key={index}>
                    <DropdownMenuItem>{link.title}</DropdownMenuItem>
                  </a>
                ))}
                <div className="flex gap-3 mt-4">
                  <Button
                    variant="default"
                    className="bg-sidebar hover:bg-sidebar-foreground"
                  >
                    Criar Conta
                  </Button>
                  <Button
                    variant="secondary"
                    className="text-sidebar bg-slate-200 hover:bg-sidebar hover:text-popover"
                  >
                    Login
                  </Button>
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
