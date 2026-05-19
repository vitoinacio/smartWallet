import { cn } from "@/lib/utils";

interface FooterConteinerProps {
    children: React.ReactNode,
    className?: string;
}

const FooterConteiner = ({children, className}: FooterConteinerProps) => {
  return (
    <footer className={cn(
        "bg-blue-900 dark:bg-neutral-950",
        className
    )}>
        <div className="max-w-7xl mx-auto px-6 py-16">
            {children}
        </div>
    </footer>
  )
}

export default FooterConteiner