import { ReactElement } from 'react'
import { AppSidebar } from '@/components/layout/sidebar/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

interface LayoutAppProps {
  children: ReactElement;
}

const LayoutApp = ({children}: LayoutAppProps) => {
  return (
    <SidebarProvider>
      <div className='flex'>
        <AppSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}

export default LayoutApp