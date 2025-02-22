import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// eslint-disable-next-line react-refresh/only-export-components
export const links = [
    {
        title: "Quem somos ?",
        path: "#"
    },
    {
        title: "O que oferecemos ?",
        path: "#"
    },
    {
        title: "Conheça nosso produto",
        path: "#"
    },
]

const HeaderNav = ({className}:{className:string}) => {
  return (
    <>
        {links.map((link, index) => (
            <a key={index} href={link.path}>
                <Button className={cn("text-primary dark:text-primary", className)} variant="link">{link.title}</Button>
            </a>
        ))}
    </>
  )
}

export default HeaderNav