import { cn } from "@/lib/utils"

interface HeaderIconProps {
  isLogoName: boolean;
  className?: string;
  variant?: "logoAzul" | "logoBranca";
  width?: number;
}

const HeaderIcon = ({isLogoName, className, variant, width}: HeaderIconProps) => {
  return (
    <>
        <span className="flex items-center">
            <img src={`${variant}.svg`} alt="Logo" width={width} />
            {isLogoName ? <p className={cn("text-sidebar dark:text-primary text-xl", className)}>mart<strong>Wallet</strong></p> : ""}
        </span>
    </>
  )
}

export default HeaderIcon