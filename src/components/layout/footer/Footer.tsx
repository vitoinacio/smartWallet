import { GithubIcon, LinkedinIcon, Mail } from "lucide-react"
import FooterConteiner from "./FooterConteiner"
import FooterLink from "./FooterLink"

interface FooterProps {
    className?: string;
    fit: boolean;
}


// liks do footer de paginas
const pageLinks = [
    {
        title: 'Termos de uso',
        src: '#',

    },
    {
        title: 'Politica de privacidade',
        src: '#',
    },
    {
        title: 'Fale conosco',
        src: '#',
    },
]

const styleIcon = 'hover:scale-125 duration-200 text-popover dark:text-primary'

// lista de icones e links de rede sociais do footer
const pageRedeSociais = [
    {
        src: 'https://github.com/vitoinacio/ProjetoDashboard',
        icon: <GithubIcon className={styleIcon}/>,

    },
    {
        src: 'https://www.linkedin.com/in/victorhugoinacio/',
        icon: <LinkedinIcon className={styleIcon}/>,
    },
    {
        src: 'mailto:victor.hugo.ina10@gmail.com',
        icon: <Mail className={styleIcon}/>, 
    },
]

const Footer = ({className, fit} : FooterProps) => {
  return (
    <>
        <FooterConteiner className={className}>
            <>
                {fit && 
                    <>
                        <div className='flex gap-10 justify-around max-md:flex-col max-md:gap-3 max-md:items-center'>
                            {pageLinks.map(({title, src}, index) => (
                                <FooterLink key={index} type="Button" children={title} src={src} />
                            ))}
                        </div>
                        <div className='flex gap-8 justify-around text-popover dark:text-primary'>
                            {pageRedeSociais.map(({src, icon}, index)=>(
                                <FooterLink key={index} type="Icon" children={icon} src={src} />
                            ))}
                        </div>
                    </>
                }
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-popover dark:text-primary'>
                        &copy; 2025 Smart Wallet
                    </p>
                    <p className='text-popover dark:text-primary'>CNPJ 00.000.000/0000-00</p>
                </div>
            </>
        </FooterConteiner>
    </>
  )
}

export default Footer