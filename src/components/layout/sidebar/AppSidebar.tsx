import { CopySlashIcon, LayoutDashboard, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import NavUser from './NavUser';
import NavPages from './NavPages';

// Menu items.
const pages = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Financeiro',
    url: '/financeiro',
    icon: CopySlashIcon,
  },
  {
    name: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

const user = {
		name: "Smart Wallet",
		email: "Smartwallet@example.com",
		avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Smart Wallet</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavPages pages={pages}/>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupContent>
          <NavUser user={user} />
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
}
