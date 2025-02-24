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

const FormSchema = z.object({
  email:  z.string().email("Insira um e-mail válido."),
})

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
        <section className='flex w-full pt-10 justify-between items-center max-md:flex-col-reverse'>
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
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
        <p>homne</p>
      </main>
    </div>
  );
};

export default Home;