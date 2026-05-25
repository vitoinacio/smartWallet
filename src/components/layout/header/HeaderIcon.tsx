import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils"

interface HeaderIconProps {
  isLogoName: boolean;
  className?: string;
  variant?: "logoAzul" | "logoBranca";
  width?: number;
}

const HeaderIcon = ({isLogoName, className, variant, width}: HeaderIconProps) => {
  const { t } = useTranslation('layout');
  return (
    <a href="/" className="flex items-center gap-2 group">
        <img 
            src={`/${variant}.svg`} 
            alt={t('header.title')}
            width={width} 
            className="transition-transform group-hover:scale-105"
        />
        {isLogoName && (
            <span className={cn("text-xl font-semibold text-gray-900 dark:text-white", className)}>
                Smart<span className="text-blue-700 dark:text-blue-400">Wallet</span>
            </span>
        )}
    </a>
  )
}

export default HeaderIcon