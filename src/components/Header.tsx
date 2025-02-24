import { ReactElement} from "react"
import HeaderContainer from "./layout/header/HeaderContainer"
import HeaderIcon from "./layout/header/HeaderIcon"
import { cn } from "@/lib/utils";
import useTheme from "@/hooks/useTheme";

interface HeaderProps {
    children?: ReactElement;
    className?: string;
}

const Header = ({children, className}: HeaderProps) => {
    useTheme()

  return (
    <HeaderContainer className={cn("bg-sidebar h-14 relative justify-center dark:bg-zinc-900",className)}>
        <HeaderIcon isLogoName={true}  width={30} variant="logoBranca"  className="text-popover dark:text-primary"/>
        {children}
    </HeaderContainer>
  )
}

export default Header