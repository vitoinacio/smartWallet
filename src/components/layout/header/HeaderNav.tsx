import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils"

// eslint-disable-next-line react-refresh/only-export-components
export const links = [
    {
        title: "header.nav.recursos",
        path: "#recursos"
    },
    {
        title: "header.nav.funcionalidades",
        path: "#funcionalidades"
    },
    {
        title: "header.nav.beneficios",
        path: "#beneficios"
    },
    {
        title: "header.nav.sobre",
        path: "#sobre"
    },
    {
        title: "header.nav.comoFunciona",
        path: "#como-funciona"
    },
]

const HeaderNav = ({className}:{className?:string}) => {
  const { t } = useTranslation('layout');
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
                {t(link.title)}
            </a>
        ))}
    </nav>
  )
}

export default HeaderNav