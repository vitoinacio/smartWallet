import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';

const FormSchema = z.object({
  email: z.string().email('Insira um e-mail válido.'),
});

interface HeroSectionProps {
  onSubmitEmail: (data: z.infer<typeof FormSchema>) => void;
}

export function HeroSection({ onSubmitEmail }: HeroSectionProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '' },
  });

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,58,138,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_40%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-1">
              <Star className="w-3 h-3 mr-1" />
              100% Gratuito
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Gestão financeira <span className="text-blue-700 dark:text-blue-500">simplificada</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                Tenha controle total das suas finanças em uma plataforma moderna, intuitiva e gratuita.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitEmail)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Comece agora mesmo</FormLabel>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <FormControl>
                            <Input placeholder="Seu melhor email" {...field} className="flex-1" />
                          </FormControl>
                          <Button type="submit" className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 whitespace-nowrap">
                            Começar <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                        <FormDescription className="text-sm text-gray-500">É rápido e gratuito. Sem compromisso.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /><span>Sem cartão</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /><span>Sem mensalidade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /><span>Sem iklan</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent blur-3xl" />
            <img src="/dashboard.svg" alt="Dashboard SmartWallet" className="relative w-full max-w-lg drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}