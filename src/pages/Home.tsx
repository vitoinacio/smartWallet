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
import { ChartLine, ClipboardPenLine, HandCoins, } from 'lucide-react';

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
        <section id='oqueOferecemos' className='flex flex-col w-full pt-10 items-center gap-11 scroll-mt-8'>
          <div className='flex flex-col text-center relative gap-3'>
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
          <h2 className='text-4xl font-bold text-blue-800'>Quem Somos ?</h2>
          <div className='flex flex-col gap-5 text-center'>
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
      </main>
    </div>
  );
};

export default Home;