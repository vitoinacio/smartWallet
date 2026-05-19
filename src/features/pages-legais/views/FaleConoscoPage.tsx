import { Wallet, ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, Headphones, Briefcase, Heart, Send, Sun, Moon } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import useTheme from "@/core/viewModels/useTheme"

const FaleConosco = () => {
  const { handleTheme, theme } = useTheme()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => setEnviado(false), 5000)
    setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
  }

  const contactItems = [
    { icon: Mail, title: "Email", value: "smartwallet@example.com", subtitle: "Respondemos em até 24h", color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" },
    { icon: Phone, title: "Telefone", value: "(21) 99999-9999", subtitle: "Seg-Sex: 9h às 18h", color: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400" },
    { icon: MapPin, title: "Endereço", value: "Rio de Janeiro, RJ", subtitle: "Atendimento 100% online", color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400" },
    { icon: Clock, title: "Horário", value: "Seg-Sex", subtitle: "9h00 - 18h00 (GMT-3)", color: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400" },
  ]

  const helpItems = [
    { icon: Headphones, title: "Suporte", desc: "Problemas técnicos", color: "text-blue-600 dark:text-blue-400" },
    { icon: Briefcase, title: "Parcerias", desc: "Propostas comerciais", color: "text-green-600 dark:text-green-400" },
    { icon: Heart, title: "Feedback", desc: "Sugestões", color: "text-purple-600 dark:text-purple-400" },
    { icon: MessageSquare, title: "Geral", desc: "Outras dúvidas", color: "text-amber-600 dark:text-amber-400" },
  ]

  const faqItems = [
    { q: "O SmartWallet é gratuito?", a: "Sim! O SmartWallet é 100% gratuito. Não cobramos mensalidade." },
    { q: "Meus dados estão seguros?", a: "Sim! Criptografia de ponta e infraestrutura AWS." },
    { q: "Como recupero minha senha?", a: "Na tela de login, clique em 'Esqueceu a senha'." },
    { q: "Atendimento presencial?", a: "Todo atendimento é online, prático e rápido." },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Smart<span className="text-blue-600">Wallet</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleTheme} className="dark:text-white">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Fale Conosco
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Estamos aqui para ajudar. Entre em contato!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Cards */}
            <div className="space-y-3">
              {contactItems.map((item, index) => (
                <Card key={index} className="bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-gray-600 dark:text-gray-400">{item.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{item.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Help Topics */}
            <Card className="bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Como podemos ajudar?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {helpItems.map((item, index) => (
                    <div key={index} className="p-3 rounded-lg border border-gray-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
                      <item.icon className={`w-5 h-5 mb-2 ${item.color}`} />
                      <p className="font-medium text-sm text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <Card className="bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700">
              <CardContent className="p-8">
                {enviado ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Mensagem enviada!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Obrigado pelo contato. Retornaremos em breve.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Nome completo
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.nome}
                          onChange={(e) => setFormData({...formData, nome: e.target.value})}
                          placeholder="Seu nome"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="seu@email.com"
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Assunto
                      </label>
                      <Select value={formData.assunto} onValueChange={(value) => setFormData({...formData, assunto: value})}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Selecione um assunto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="suporte">Suporte Técnico</SelectItem>
                          <SelectItem value="parceria">Parcerias Comerciais</SelectItem>
                          <SelectItem value="feedback">Feedback e Sugestões</SelectItem>
                          <SelectItem value="duvida">Dúvidas Gerais</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mensagem
                      </label>
                      <Textarea
                        required
                        rows={5}
                        value={formData.mensagem}
                        onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                        placeholder="Descreva sua dúvida ou mensagem..."
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 font-medium"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                )}

                <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-4">
                  Respondemos em até 24 horas úteis
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Perguntas Frequentes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-neutral-800">
        <p>© 2025 SmartWallet. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default FaleConosco