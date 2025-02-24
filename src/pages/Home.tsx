'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import { Toaster } from '@/components/ui/sonner';
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartLine, ClipboardPenLine, GithubIcon, HandCoins, LinkedinIcon, Mail, } from 'lucide-react';

const FormSchema = z.object({
  email:  z.string().email("Insira um e-mail válido."),
})

const CardItems = [
  {
    title: "Análise de Categorias",
    icon: <ChartLine/>,
    description: "Divida suas despesas em categorias personalizáveis, como alimentação, transporte e lazer. Identifique facilmente quais áreas estão pesando mais no seu orçamento e onde pode economizar.",
  },
  {
    title: "Controle seus gastos",
    icon: <HandCoins />,
    description: " Mantenha suas finanças organizadas com facilidade. Nossa ferramenta permite acompanhar seus gastos, ajustar seu orçamento e alcançar suas metas financeiras. Simplifique a gestão do seu dinheiro e fique no controle.",
  },
  {
    title: "Planejamento Financeiro",
    icon: <ClipboardPenLine/>,
    description: "Estabeleça metas de economia e planeje seus gastos com antecedência. Crie orçamentos mensais personalizados e receba sugestões automáticas de ajustes para atingir suas metas de forma eficiente.",
  },
]

const Home = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email: "",
      },
    })
   
    function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log(data)
    }
    
    return (
      <div className="flex flex-col">
      <Header />
      <main className="mt-20 pl-24 pr-24 max-md:pl-10 max-md:pr-10  bg-gray-50 dark:bg-neutral-900">
        <section className='flex w-full pt-10 max-md:gap-4 justify-between items-center max-md:flex-col-reverse'>
          <div className='flex flex-col gap-9'>
            <div className='max-md:text-center'>
              <h1 className='text-4xl font-bold text-blue-800 max-md:text-xl max-md:text-center'>Gestão e controle financeiro</h1>
              <p className='text-2xl max-md:text-sm'>Para você, completo e gratuito*</p>
            </div>
            <div className='max-md:items-center max-md:text-center'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 max-md:w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base text-blue-900'>Maior praticidade para você !</FormLabel>
                      <div  className='flex items-center max-md:items-start'>
                        <FormControl>
                          <Input placeholder="Email..." {...field} className='max-w-sm' />
                        </FormControl>
                        <Button type="submit" className='bg-blue-800 dark:text-slate-200 dark:hover:bg-blue-950'>Submit</Button>
                      </div>
                      <FormDescription>
                        Inscreva-se agora !
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            </div>
          </div>
          <div className='flex items-center justify-center flex-1 max-md:none'>
            <img src="dashboard.svg" alt="" width={500} className='max-md:w-60' />
          </div>
        </section>
        <section id='oqueOferecemos' className='flex flex-col w-full pt-10 pb-10 items-center gap-11 scroll-mt-8'>
          <div className='flex flex-col text-center relative gap-5'>
              <h2 className='text-4xl font-bold max-md:text-xl  text-blue-800'>O controle total em suas mãos</h2>
              <p className='text-3xl max-md:text-sm'>Com o controle, você está a um passo de suas metas e objetivos !</p>
          </div>
          <div className='flex gap-4 max-md:flex-col'>
            {CardItems.map(({title, icon, description}, Index) => (
              <Card key={Index} className='flex flex-col items-center hover:scale-105 duration-100'>
                <CardHeader>
                  <CardTitle className='text-blue-950 dark:text-blue-800'>{title}</CardTitle>
                  <CardDescription className='flex justify-center'>{icon}</CardDescription>
                </CardHeader>
                <CardContent className='text-center'>
                  <p>{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section id="QuemSomos" className='flex flex-col w-full pt-10 items-center gap-11 scroll-mt-8'>
          <h2 className='text-4xl font-bold text-blue-800 max-md:text-xl'>Quem Somos ?</h2>
          <div className='flex flex-col gap-7 text-center'>
            <div className='flex w-full items-center justify-center'>
              <img src="logoAzul.svg" alt="logo" width={200}/>
            </div>
            <p>
              <strong>Bem-vindo à Smart Wallet!</strong> Somos líderes em
              soluções inovadoras para gestão financeira pessoal. Nossa missão é
              capacitar você a tomar decisões financeiras mais inteligentes e
              informadas com a ajuda de nossos dashboards de gastos intuitivos e
              eficazes.
            </p>
            <p>
              Na Smart Wallet, entendemos que a gestão de despesas pode ser um
              desafio. Por isso, desenvolvemos ferramentas que tornam o
              acompanhamento dos seus gastos simples e direto. Nossos dashboards
              oferecem uma visão clara e detalhada de suas finanças, permitindo
              que você monitore seu orçamento e identifique áreas de economia
              com facilidade.
            </p>
            <p>
              Estamos comprometidos em fornecer soluções que não só atendem às
              suas necessidades atuais, mas também se adaptam ao seu estilo de
              vida em constante mudança. Nossa abordagem combina design elegante
              e funcionalidade avançada para criar produtos que você realmente
              usa e aprecia.
            </p>
            <p>
              Na Smart Wallet, acreditamos que a gestão financeira eficaz é a
              chave para uma vida financeira saudável. Junte-se a nós e descubra
              como nossos dashboards podem transformar a maneira como você
              gerencia seus gastos e alcança seus objetivos financeiros.
            </p>
          </div>
        </section>
        <section id="ConhecaNossoProduto" className='flex flex-col w-full pt-10 pb-20 items-center gap-11 scroll-mt-8'>
          <div className='flex flex-col text-center gap-7'>
            <h2 className='text-4xl font-bold text-blue-800 max-md:text-xl pt-10 pb-10'>Gestão de Gastos</h2>
            <p className='pb-10'>
              Na Smart Wallet, sabemos que a gestão eficaz dos seus gastos é
              crucial para uma vida financeira saudável. Nossos dashboards de
              gastos foram projetados para ajudar você a controlar e otimizar
              suas despesas de maneira simples e eficiente.
            </p>
            <div className='grid grid-cols-2 justify-between max-md:grid-cols-1'>
              <p>
                <strong>Análise Detalhada:</strong> Nossos dashboards fornecem
                uma visão abrangente das suas finanças, categorizando suas
                despesas e oferecendo insights detalhados sobre onde seu
                dinheiro está sendo gasto. Com gráficos e relatórios intuitivos,
                você pode facilmente identificar padrões e áreas onde é possível
                economizar.
              </p>
              <img src="src/img/telaDashboard.png" alt="imagem da dasboard" />
            </div>
            <div className='grid grid-cols-2 justify-between max-md:grid-cols-1 max-md:flex max-md:flex-col-reverse'>
              <img src="src/img/telaPlanejamento.png" alt="imagem da dasboard" />
              <p>
                <strong>Controle de Orçamento:</strong> Defina e acompanhe seu
                orçamento com facilidade. Nossos recursos de planejamento
                permitem que você estabeleça metas financeiras e monitore seu
                progresso ao longo do tempo. Ajuste seu orçamento com base em
                suas necessidades e veja como suas finanças estão se saindo em
                relação às suas metas.
              </p>
            </div>
            <div className='grid grid-cols-2 justify-between max-md:grid-cols-1'>
              <p>
                <strong>Alertas e Notificações:</strong> Mantenha-se informado
                com alertas personalizados que o ajudam a evitar gastos
                excessivos. Receba notificações sobre despesas que estão se
                aproximando dos limites do seu orçamento e ajuste seus hábitos
                de gasto de acordo.
              </p>
              <img src="src/img/telaNotif.png" alt="imagem da dasboard" />
            </div>
            <p className='pt-10'>
              Com a Smart Wallet, a gestão dos seus gastos se torna uma tarefa
              fácil e agradável. Nossa plataforma foi projetada para fornecer
              todas as ferramentas necessárias para que você tenha total
              controle sobre suas finanças e alcance seus objetivos financeiros
              com confiança.
            </p>
          </div>
        </section>
      </main>
      <footer className='bg-sidebar dark:bg-popover p-5 flex flex-col items-center justify-around gap-4'>
        <div className='flex gap-10 justify-around max-md:flex-col max-md:gap-3 max-md:items-center'>
          <a href="#"><Button className='text-popover dark:text-primary' variant={"link"}>Termos de uso</Button></a>
          <a href="#"><Button className='text-popover dark:text-primary' variant={"link"}>Politica de privacidade</Button></a>
          <a href="#"><Button className='text-popover dark:text-primary' variant={"link"}>Fale conosco</Button></a>
        </div>
        <div className='flex gap-8 justify-around text-popover dark:text-primary'>
          <a href="https://github.com/vitoinacio/ProjetoDashboard"><GithubIcon className='hover:scale-125 duration-200 text-popover dark:text-primary'/></a>
          <a href="https://www.linkedin.com/in/victorhugoinacio/"><LinkedinIcon className='hover:scale-125 duration-200 text-popover dark:text-primary'/></a>
          <a href="mailto:victor.hugo.ina10@gmail.com"><Mail className='hover:scale-125 duration-200 text-popover dark:text-primary'/></a>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-popover dark:text-primary'>
            &copy; 2025 Smart Wallet
          </p>
          <p className='text-popover dark:text-primary'>CNPJ 00.000.000/0000-00</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;