import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";

interface FooterLinkProps {
    className?: string,
    src: string,
    type: "Button" | "Icon",
    children: string | ReactElement,
}

const FooterLink = ({className, src, type, children} : FooterLinkProps) => {
  return (
    <>
        {type === "Button" ? 
                <a href={src}><Button className={cn('text-popover dark:text-primary', className)} variant={"link"}>{children}</Button></a> 
            :
                <a href={src} className={cn("", className)}>{children}</a>
        }
    </>
  )
}

export default FooterLink;