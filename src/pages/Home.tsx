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
      // toast({
      //   title: "You submitted the following values:",
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // })
    }

  return (
    <div className="flex flex-col">
      <Header />
      <main className="mt-20 pl-24 pr-24 bg-gray-50 dark:bg-inherit">
        <section className='flex w-full pt-10 justify-between items-center'>
          <div className='flex flex-col gap-9'>
            <div>
              <h1 className='text-4xl font-bold text-blue-800 max-md:text-xl'>Gestão e controle financeiro</h1>
              <p className='text-2xl max-md:text-sm'>Para você, completo e gratuito*</p>
            </div>
            <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maior praticidade para você !</FormLabel>
                      <div  className='flex items-center max-md:flex-col max-md:items-start'>
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
            <img src="dashboard.png" alt="" width={500} />
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