import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wallet, LayoutDashboard, TrendingUp, Target, FileText, Settings, LogOut, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useUserInfo from '@/core/viewModels/useUserInfo';
import { ConfirmDialog } from '@/core/components/ConfirmDialog';
import { useSidebarState } from '@/core/viewModels/useSidebar';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { title: 'sidebar.nav.dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'sidebar.nav.financeiro', href: '/financeiro', icon: TrendingUp },
  { title: 'sidebar.nav.metas', href: '/metas', icon: Target },
  { title: 'sidebar.nav.extrato', href: '/extrato', icon: FileText },
];

const bottomNavItems: NavItem[] = [
  { title: 'sidebar.nav.configuracoes', href: '/settings', icon: Settings },
];

function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 1024;
}

export function AppSidebar() {
  const { t } = useTranslation('layout');
  const { isCollapsed, setIsCollapsed } = useSidebarState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, loading } = useUserInfo();

  useEffect(() => {
    const checkMobile = () => setIsMobileView(isMobile());
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved && !isMobileView) {
      setIsCollapsed(JSON.parse(saved));
    } else {
      setIsCollapsed(false);
    }
  }, [isMobileView, setIsCollapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (isMobileView) {
      setMobileOpen(!mobileOpen);
    } else {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      localStorage.setItem('sidebar-collapsed', JSON.stringify(newState));
    }
  };

  const logout = () => {
    sessionStorage.removeItem('UserProvider');
    sessionStorage.removeItem('userData');
    navigate('/');
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
  };

  const SidebarContent = ({ isOverlay = false }: { isOverlay?: boolean }) => (
    <div className={cn("flex flex-col h-full", isOverlay ? "w-72" : isCollapsed ? "w-16" : "w-64")}>
      <div className={cn(
        "flex items-center border-b border-sidebar-border p-4",
        isCollapsed && !isOverlay ? "justify-center" : "justify-between"
      )}>
        <div className={cn("flex items-center gap-3", (isCollapsed || isOverlay) && !isMobileView && "justify-center w-full")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md shrink-0">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          {(!isCollapsed || isOverlay) && (
            <div className="flex flex-col">
              <span className="text-base font-bold">{t('sidebar.title')}</span>
              <span className="text-xs text-sidebar-foreground/70">{t('sidebar.subtitle')}</span>
            </div>
          )}
        </div>
        
        {(!isCollapsed || isOverlay) && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-sidebar-accent shrink-0"
            onClick={toggleSidebar}
          >
            {isOverlay ? <X className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <nav className={cn("flex-1 p-3 space-y-1 overflow-y-auto", (isCollapsed || isOverlay) && !isMobileView ? "p-1" : "")}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-sidebar-accent hover:text-sidebar-foreground text-sidebar-foreground/80",
                (isCollapsed || isOverlay) && !isMobileView && "justify-center px-0"
              )}
              title={isCollapsed && !isOverlay && !isMobileView ? t(item.title) : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(!isCollapsed || isOverlay) && <span>{t(item.title)}</span>}
            </button>
          );
        })}
      </nav>

      <nav className={cn("p-3 border-t border-sidebar-border space-y-1", (isCollapsed || isOverlay) && !isMobileView ? "p-1" : "")}>
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-sidebar-accent hover:text-sidebar-foreground text-sidebar-foreground/80",
                (isCollapsed || isOverlay) && !isMobileView && "justify-center px-0"
              )}
              title={isCollapsed && !isOverlay && !isMobileView ? t(item.title) : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(!isCollapsed || isOverlay) && <span>{t(item.title)}</span>}
            </button>
          );
        })}
      </nav>

      <div className={cn("p-3 border-t border-sidebar-border", (isCollapsed || isOverlay) && !isMobileView ? "p-1" : "")}>
        {loading ? (
          <div className={cn("flex items-center gap-3", (isCollapsed || isOverlay) && !isMobileView ? "justify-center" : "")}>
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            {(!isCollapsed || isOverlay) && (
              <div className="flex-1 min-w-0 space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            )}
          </div>
        ) : (
          <div className={cn("flex items-center gap-3", (isCollapsed || isOverlay) && !isMobileView ? "justify-center" : "")}>
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src={userData?.foto || ''} alt={userData?.nome} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {userData?.nome ? getInitials(userData.nome) : 'U'}
              </AvatarFallback>
            </Avatar>
            
            {(!isCollapsed || isOverlay) && (
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  {userData?.nome || t('sidebar.user')}
                </p>
                <p className="truncate text-xs text-sidebar-foreground/70">
                  {userData?.email || 'usuario@email.com'}
                </p>
              </div>
            )}
            
            {(!isCollapsed || isOverlay) && (
            <ConfirmDialog
              title={t('navUser.sairConfirmTitle')}
              description={t('navUser.sairConfirmMessage')}
              confirmText={t('navUser.sair')}
              confirmClassName="bg-red-600 hover:bg-red-700"
              onConfirm={logout}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                title={t('navUser.sair')}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </ConfirmDialog>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {isMobileView && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 h-10 w-10 bg-background border shadow-md lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {isMobileView ? (
        <>
          {mobileOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}
          <aside
            className={cn(
              "fixed top-0 left-0 h-screen bg-sidebar text-sidebar-foreground z-50 transition-transform duration-300 lg:hidden",
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <SidebarContent isOverlay />
          </aside>
        </>
      ) : (
        <>
          <aside
            className={cn(
              "fixed left-0 top-0 h-screen border-r bg-sidebar text-sidebar-foreground transition-all duration-300 z-40 flex flex-col",
              isCollapsed ? "w-16" : "w-64"
            )}
          >
            <SidebarContent />
          </aside>

          {isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="fixed left-[52px] top-20 h-6 w-6 rounded-full bg-background border shadow-sm hover:bg-muted z-50 hidden lg:flex"
              onClick={toggleSidebar}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          )}
        </>
      )}
    </>
  );
}