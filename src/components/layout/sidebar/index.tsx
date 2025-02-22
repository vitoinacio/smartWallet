import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className='w-auto'>
      <AppSidebar />
      <main>
        <div className=' flex items-center m-1 absolute'>
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
