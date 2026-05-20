import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loading from '@/core/components/Loading';
import { Mail, ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';

const recuperarSenhaSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Insira um e-mail válido'),
});

type RecuperarSenhaFormValues = z.infer<typeof recuperarSenhaSchema>;

export function RecuperarSenhaForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const form = useForm<RecuperarSenhaFormValues>({
    resolver: zodResolver(recuperarSenhaSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async () => {
    setStatus('loading');
    setErrorMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setStatus('success');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch {
      setStatus('error');
      setErrorMessage('Erro ao enviar e-mail. Tente novamente.');
    }
  };

  if (status === 'success') {
    return (
      <Card className="border-0 shadow-2xl bg-white dark:bg-neutral-800">
        <CardContent className="px-8 pb-8 pt-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              E-mail enviado!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Verifique sua caixa de entrada para redefinir sua senha.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Redirecionando para o login...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-2xl bg-white dark:bg-neutral-800">
      <CardContent className="px-8 pb-8 pt-6">
        {status === 'error' && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Informe seu e-mail para receber o link de recuperação de senha.
              </p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    E-mail
                  </FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-11 h-12 bg-gray-50 dark:bg-neutral-700 border-gray-200 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
                      disabled={status === 'loading'}
                      {...field}
                    />
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium text-base"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <Loading size={20} message="" className="text-white" />
              ) : (
                <>
                  Enviar
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}