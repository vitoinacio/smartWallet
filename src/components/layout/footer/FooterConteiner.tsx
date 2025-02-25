import { cn } from "@/lib/utils";
import { ReactElement } from "react"

interface FooterConteinerProps {
    children: ReactElement,
    className?: string;
}

const FooterConteiner = ({children, className}: FooterConteinerProps) => {
  return (
    <footer className={cn('bg-sidebar dark:bg-popover p-5 flex flex-col items-center justify-around gap-4', className)}>
        {children}
    </footer>
  )
}

export default FooterConteiner