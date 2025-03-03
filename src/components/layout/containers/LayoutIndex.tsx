import { ReactElement } from 'react'
import Header from '@/components/Header';
import Footer from '../footer/Footer';

interface LayoutIndexProps {
  children: ReactElement;
}

const LayoutIndex = ({children} : LayoutIndexProps) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <Header/>
        {children}
        <Footer fit={false} className='w-full absolute bottom-0 p-1 dark:bg-zinc-900'/>
    </div>
  )
}

export default LayoutIndex