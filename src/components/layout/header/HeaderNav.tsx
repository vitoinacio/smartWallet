import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// eslint-disable-next-line react-refresh/only-export-components
export const links = [
    {
        title: "O que oferecemos ?",
        path: "#oqueOferecemos"
    },
    {
        title: "Quem somos ?",
        path: "#QuemSomos"
    },
    {
        title: "Conheça nosso produto",
        path: "#ConhecaNossoProduto"
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