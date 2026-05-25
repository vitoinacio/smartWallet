import { useTranslation } from 'react-i18next';
import { BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';
import useUserInfo from '@/core/viewModels/useUserInfo';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface NavUserProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

const NavUser = ({ user }: NavUserProps) => {
  const { t } = useTranslation('layout');
  const { userData, loading } = useUserInfo();
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const logout = () => {
    sessionStorage.removeItem('UserProvider');
    sessionStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {loading ? (
                <>
                  <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
                  <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </>
              ) : (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={userData?.foto ? userData?.foto : user.avatar}
                      alt={userData?.nome}
                    />
                    <AvatarFallback className="rounded-lg">
                      {userData?.nome ? (() => {
                        const parts = userData.nome.split(' ');
                        const first = parts[0]?.[0] || '';
                        const last = parts[1]?.[0] || '';
                        return (first + last).toUpperCase();
                      })() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userData?.nome}
                    </span>
                    <span className="truncate text-xs">{userData?.email}</span>
                  </div>
                </>
              )}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
            aria-labelledby="user-dropdown-menu"
          >
            <DropdownMenuLabel id="user-dropdown-menu" className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
                    <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={userData?.foto ? userData?.foto : user.avatar}
                        alt={userData?.nome}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userData?.nome}
                      </span>
                      <span className="truncate text-xs">
                        {userData?.email}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                {t('navUser.perfil')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
              <LogOut />
              {t('navUser.sair')}
            </DropdownMenuItem>
          </DropdownMenuContent>

          <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('navUser.sairConfirmTitle')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('navUser.sairConfirmMessage')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('common:cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={logout} className="bg-red-600 hover:bg-red-700">
                  {t('navUser.sair')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
