import { ReactElement } from 'react'

interface LayoutIndexProps {
  children: ReactElement;
}

const LayoutIndex = ({children}: LayoutIndexProps) => {
  return (
    <div className="min-h-screen">
        {children}
    </div>
  )
}

export default LayoutIndex