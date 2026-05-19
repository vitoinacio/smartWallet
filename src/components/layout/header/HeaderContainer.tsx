import { cn } from "@/lib/utils"

interface HeaderContainerProps {
  children: React.ReactNode,
  className?: string
}

const HeaderContainer = ({ children, className}: HeaderContainerProps) => {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 border-b border-gray-200 dark:border-neutral-800", className)}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {children}
        </div>
    </header>
  )
}

export default HeaderContainer