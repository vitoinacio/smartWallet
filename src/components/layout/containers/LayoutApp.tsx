import { ReactElement } from 'react'
import Sidebar from '../sidebar'

interface LayoutAppProps {
  children: ReactElement;
}

const LayoutApp = ({children} : LayoutAppProps) => {
  return (
    <div className='flex'>
        <Sidebar children={"Menu"}/>
        {children}
    </div>
  )
}

export default LayoutApp