import { cn } from "@/lib/utils"

interface HeaderContainerProps {
  children: React.ReactNode,
  className?: string
}

const HeaderContainer = ({ children, className}: HeaderContainerProps) => {
  return (
    <header className={cn("w-full bg-popover z-10 fixed flex justify-between h-20 items-center duration-300 pl-24 pr-24 max-md:pl-10 max-md:pr-10",className)}>
        {children}
    </header>
  )
}

export default HeaderContainer