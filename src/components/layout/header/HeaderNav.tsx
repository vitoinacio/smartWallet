import { cn } from "@/lib/utils"

// eslint-disable-next-line react-refresh/only-export-components
export const links = [
    {
        title: "Recursos",
        path: "#recursos"
    },
    {
        title: "Benefícios",
        path: "#beneficios"
    },
    {
        title: "Sobre Nós",
        path: "#sobre"
    },
]

const HeaderNav = ({className}:{className?:string}) => {
  return (
    <nav className="hidden md:flex items-center gap-1">
        {links.map((link, index) => (
            <a 
                key={index} 
                href={link.path}
                className={cn(
                    "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200",
                    className
                )}
            >
                {link.title}
            </a>
        ))}
    </nav>
  )
}

export default HeaderNav