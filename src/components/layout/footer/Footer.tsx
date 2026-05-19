import { Github, Linkedin, Mail, Wallet, ArrowRight } from "lucide-react"
import FooterConteiner from "./FooterConteiner"
import { Button } from "@/components/ui/button"

interface FooterProps {
    className?: string;
    fit: boolean;
}

const pageLinks = [
    {
        title: 'Termos de uso',
        src: '/termos',
    },
    {
        title: 'Política de privacidade',
        src: '/privacidade',
    },
    {
        title: 'Fale conosco',
        src: '/fale-conosco',
    },
]

const socialLinks = [
    {
        src: 'https://github.com/vitoinacio/smartWallet',
        icon: <Github className="w-5 h-5" />,
        label: 'GitHub',
    },
    {
        src: 'https://www.linkedin.com/in/victorhugoinacio/',
        icon: <Linkedin className="w-5 h-5" />,
        label: 'LinkedIn',
    },
    {
        src: 'mailto:victor.hugo.ina10@gmail.com',
        icon: <Mail className="w-5 h-5" />,
        label: 'Email',
    },
]

const Footer = ({className, fit}: FooterProps) => {
  if (!fit) {
    return (
        <FooterConteiner className={className}>
            <div className="flex flex-col items-center justify-center py-8">
                <p className="text-blue-200 dark:text-neutral-500 text-sm">
                    © 2025 SmartWallet. Todos os direitos reservados.
                </p>
            </div>
        </FooterConteiner>
    )
  }

  return (
    <FooterConteiner className={className}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Logo e descrição */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/20 dark:bg-white/10 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white dark:text-neutral-200" />
                    </div>
                    <span className="text-2xl font-bold text-white dark:text-white">
                        Smart<span className="text-blue-200 dark:text-neutral-400">Wallet</span>
                    </span>
                </div>
                <p className="text-blue-100 dark:text-neutral-400 mb-8 max-w-md leading-relaxed">
                    Sua plataforma gratuita para gestão financeira pessoal. 
                    Controle suas finanças de forma simples e eficiente.
                </p>
                <a href="/CreateAccount">
                    <Button className="bg-white text-blue-900 hover:bg-blue-50 gap-2">
                        Começar Agora
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </a>
            </div>

            {/* Links e redes */}
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h4 className="text-white dark:text-white font-semibold mb-4 text-lg">
                        Navegação
                    </h4>
                    <ul className="space-y-3">
                        {pageLinks.map((link, index) => (
                            <li key={index}>
                                <a 
                                    href={link.src} 
                                    className="text-blue-100 dark:text-neutral-400 hover:text-white dark:hover:text-white transition-colors text-sm"
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white dark:text-white font-semibold mb-4 text-lg">
                        Redes Sociais
                    </h4>
                    <div className="flex gap-3">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/20 dark:bg-white/10 flex items-center justify-center text-white dark:text-neutral-300 hover:bg-white hover:text-blue-900 dark:hover:bg-white dark:hover:text-blue-900 transition-all duration-200"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Divisor */}
        <div className="mt-16 pt-8 border-t border-white/10 dark:border-neutral-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-blue-200 dark:text-neutral-500 text-sm">
                    © 2025 SmartWallet. Todos os direitos reservados.
                </p>
                <p className="text-blue-300/50 dark:text-neutral-600 text-xs">
                    CNPJ: 00.000.000/0000-00
                </p>
            </div>
        </div>
    </FooterConteiner>
  )
}

export default Footer