'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/header/Index';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ChartLine,
  ClipboardPenLine,
  HandCoins,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  PiggyBank,
  Bell,
  Shield,
  Smartphone,
  CreditCard,
  Wallet,
  Star,
  Users,
  Globe,
} from 'lucide-react';
import Footer from '@/components/layout/footer/Footer';
import { useNavigate } from 'react-router-dom';


const FormSchema = z.object({
  email: z.string().email('Insira um e-mail válido.'),
});

const features = [
  {
    icon: <ChartLine className="w-8 h-8" />,
    title: 'Análise de Categorias',
    description:
      'Divida suas despesas em categorias personalizáveis, como alimentação, transporte e lazer.',
    highlight: 'Identifique onde você mais gasta',
  },
  {
    icon: <HandCoins className="w-8 h-8" />,
    title: 'Controle Total',
    description:
      'Mantenha suas finanças organizadas com facilidade. Acompanhe, ajuste e alcance suas metas.',
    highlight: 'Simplifique a gestão do seu dinheiro',
  },
  {
    icon: <ClipboardPenLine className="w-8 h-8" />,
    title: 'Planejamento Financeiro',
    description:
      'Estabeleça metas de economia e planeje seus gastos com antecedência.',
    highlight: 'Orçamentos personalizados',
  },
];

const funcionalidades = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Dashboard Interativo',
    description: 'Visualize seus gastos em gráficos claros e intuitivos',
  },
  {
    icon: <PiggyBank className="w-6 h-6" />,
    title: 'Controle de Débitos',
    description: 'Gerencie suas contas a pagar com alertas de vencimento',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Notificações Inteligentes',
    description: 'Receba alertas sobre despesas próximas do limite',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Dados Seguros',
    description: 'Sua informação protegida com segurança AWS',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Acesso Mobile',
    description: 'Use em qualquer dispositivo, a qualquer hora',
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: 'Gratuito',
    description: 'Todas as funcionalidades sem custo algum',
  },
];

const beneficios = [
  'Visualização completa das suas finanças',
  'Organização automática por categorias',
  'Alertas de contas a pagar',
  'Metas de economia personalizadas',
  'Relatórios detalhados de gastos',
  'Interface simples e intuitiva',
];

const Home = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    localStorage.setItem('emailInputHome', data.email);
    navigate('/CreateAccount');
  }

  return (
    <div className="flex flex-col">
      <Header />
      <main className="pt-20 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,58,138,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_40%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-1"
                >
                  <Star className="w-3 h-3 mr-1" />
                  100% Gratuito
                </Badge>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    Gestão financeira{' '}
                    <span className="text-blue-700 dark:text-blue-500">
                      simplificada
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                    Tenha controle total das suas finanças em uma plataforma
                    moderna, intuitiva e gratuita.
                  </p>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-200">
                              Comece agora mesmo
                            </FormLabel>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <FormControl>
                                <Input
                                  placeholder="Seu melhor email"
                                  {...field}
                                  className="flex-1"
                                />
                              </FormControl>
                              <Button
                                type="submit"
                                className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 whitespace-nowrap"
                              >
                                Começar
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </Button>
                            </div>
                            <FormDescription className="text-sm text-gray-500">
                              É rápido e gratuito. Sem compromisso.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Sem cartão</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Sem mensalidade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Sem iklan</span>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent blur-3xl" />
                <img
                  src="/dashboard.svg"
                  alt="Dashboard SmartWallet"
                  className="relative w-full max-w-lg drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-blue-700 dark:bg-blue-900 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
                <div className="text-blue-200 text-sm">Usuários</div>
              </div>
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">R$ 2M+</div>
                <div className="text-blue-200 text-sm">Gerenciados</div>
              </div>
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
                <div className="text-blue-200 text-sm">Débitos Controlados</div>
              </div>
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">4.9</div>
                <div className="text-blue-200 text-sm">Avaliação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="recursos" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-blue-500 text-blue-700 dark:text-blue-400"
              >
                Recursos Principais
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Tudo que você precisa para{' '}
                <span className="text-blue-700 dark:text-blue-500">
                  controlar seu dinheiro
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Uma solução completa para gestão financeira pessoal, com
                ferramentas poderosas e interface intuitiva.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-xl group"
                >
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {feature.description}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      {feature.highlight}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Funcionalidades Grid */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-neutral-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-green-500 text-green-700 dark:text-green-400"
              >
                Por que escolher a gente?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Funcionalidades que fazem a{' '}
                <span className="text-green-600 dark:text-green-400">
                  diferença
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {funcionalidades.map((item, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-neutral-800 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios Section */}
        <section id="beneficios" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 border-purple-500 text-purple-700 dark:text-purple-400"
                >
                  Benefícios
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Por que usar o{' '}
                  <span className="text-purple-700 dark:text-purple-400">
                    SmartWallet
                  </span>
                  ?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Deixamos sua vida financeira mais simples, organizada e sob
                  controle. Veja o que você ganha:
                </p>
                <div className="space-y-4">
                  {beneficios.map((beneficio, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-200">
                        {beneficio}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-20" />
                <Card className="relative bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                      <Wallet className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Plano Gratuito
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Use todas as funcionalidades
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      R$ 0
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Para sempre
                    </p>
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                      Começar Gratuitamente
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre nós Section */}
        <section id="sobre" className="py-20 px-6 bg-gray-50 dark:bg-neutral-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-amber-500 text-amber-700 dark:text-amber-400"
              >
                Sobre Nós
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Quem somos
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong className="text-gray-900 dark:text-white">
                    Bem-vindo à Smart Wallet!
                  </strong>{' '}
                  Somos líderes em soluções inovadoras para gestão financeira
                  pessoal. Nossa missão é capacitar você a tomar decisões
                  financeiras mais inteligentes e informadas.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Entendemos que a gestão de despesas pode ser um desafio. Por
                  isso, desenvolvemos ferramentas que tornam o acompanhamento
                  dos seus gastos simples e direto, oferecendo uma visão clara
                  e detalhada de suas finanças.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="gap-2">
                    <Users className="w-4 h-4" />
                    Nossa Equipe
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Globe className="w-4 h-4" />
                    Nossa Missão
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-600 to-orange-500 rounded-3xl blur-2xl opacity-20" />
                <Card className="relative bg-white dark:bg-neutral-800 p-8 rounded-2xl">
                  <div className="flex items-center justify-center mb-6">
                    <img
                      src="/logoAzul.svg"
                      alt="SmartWallet"
                      className="h-16"
                    />
                  </div>
                  <div className="text-center space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                          2025
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Founded
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                          100%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Gratuito
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      "Transformando a forma como você gerencia suas finanças
                      pessoais"
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-700 to-blue-600 dark:from-blue-800 dark:to-blue-900 p-8 md:p-12 text-center rounded-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pronto para controlar suas finanças?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de usuários que já descobriram como é
                simples gerenciar dinheiro com o SmartWallet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-gray-100 dark:bg-gray-200 dark:text-blue-800"
                  onClick={() => navigate('/CreateAccount')}
                >
                  Criar Conta Grátis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700"
                  onClick={() => navigate('/login')}
                >
                  Já tenho conta
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Detail */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-neutral-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-cyan-500 text-cyan-700 dark:text-cyan-400"
              >
                Como Funciona
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Recursos em{' '}
                <span className="text-cyan-700 dark:text-cyan-400">destaque</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-neutral-800">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 mb-3">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <CardTitle>Controle de Débitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Adicione, edite e acompanhe todas as suas contas a pagar.
                    Nunca mais perca uma data de vencimento.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-neutral-800">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-700 dark:text-green-400 mb-3">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <CardTitle>Dashboard Completo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Visualize suas entradas, saídas e restante em um único
                    painel. Gráficos claros para melhores decisões.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-neutral-800">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-700 dark:text-purple-400 mb-3">
                    <Bell className="w-6 h-6" />
                  </div>
                  <CardTitle>Alertas de Vencimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Receba notificações sobre contas próximas do vencimento.
                    Configure alertas personalizados.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer fit={true} />
    </div>
  );
};

export default Home;