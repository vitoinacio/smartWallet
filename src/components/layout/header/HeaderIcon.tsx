import { cn } from "@/lib/utils"

interface HeaderIconProps {
  isLogoName: boolean;
  className?: string;
  variant?: "logoAzul" | "logoBranca";
}

const HeaderIcon = ({isLogoName, className, variant}: HeaderIconProps) => {
  return (
    <>
        <span className="flex items-center">
            <img src={`${variant}.png`} alt="Logo" />
            {isLogoName ? <p className={cn("text-sidebar dark:text-primary text-xl", className)}>mart<strong>Wallet</strong></p> : ""}
        </span>
    </>
  )
}

export default HeaderIcon