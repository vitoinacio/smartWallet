import { cn } from "@/lib/utils"

const HeaderContainer = ({ children, clasName}: { children: React.ReactNode, clasName : string }) => {
  return (
    <header className={cn("w-full bg-popover fixed flex justify-between h-20 items-center duration-300 pl-24 pr-24 max-md:pl-10 max-md:pr-10",clasName)}>
        {children}
    </header>
  )
}

export default HeaderContainer