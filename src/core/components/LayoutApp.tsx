import { ReactElement } from 'react';
import { AppSidebar } from '@/components/layout/sidebar/AppSidebar';
import { SidebarProvider, useSidebarState } from '@/core/viewModels/useSidebar';

interface LayoutAppProps {
  children: ReactElement;
}

function LayoutContent({ children }: { children: ReactElement }) {
  const { isCollapsed } = useSidebarState();
  
  return (
    <main className={`flex-1 w-full min-h-screen transition-all duration-300 pt-14 lg:pt-0 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
      {children}
    </main>
  );
}

const LayoutApp = ({ children }: LayoutAppProps) => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <LayoutContent>{children}</LayoutContent>
      </div>
    </SidebarProvider>
  );
};

export default LayoutApp;