import { ReactElement } from 'react'
import Header from '@/components/Header';
import Footer from '../footer/Footer';

interface LayoutIndexProps {
  children: ReactElement;
}

const LayoutIndex = ({children} : LayoutIndexProps) => {
  return (
    <div className='flex flex-col items-center h-screen'>
        <Header/>
        {children}
        <Footer fit={false} className='w-full absolute bottom-0 p-1'/>
    </div>
  )
}

export default LayoutIndex