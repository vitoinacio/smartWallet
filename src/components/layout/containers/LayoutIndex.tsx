import { ReactElement } from 'react'
import Header from '@/components/Header';

interface LayoutIndexProps {
  children: ReactElement;
}

const LayoutIndex = ({children} : LayoutIndexProps) => {
  return (
    <div className='flex flex-col items-center'>
        <Header/>
        {children}
    </div>
  )
}

export default LayoutIndex