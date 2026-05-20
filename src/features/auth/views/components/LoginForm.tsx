import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import Loading from '@/core/components/Loading';
import { Eye, EyeClosed, Mail, Lock, ArrowRight } from 'lucide-react';
import { useLoginPage } from '../../viewModels/useLoginPage';
import { Link } from 'react-router-dom';

const signupSchema = z.object({
  email: z.string().email('Insira um e-mail válido.'),
  senha: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface LoginFormProps {
  onEsqueceuSenha?: () => void;
}

const LoginForm = ({ onEsqueceuSenha: _onEsqueceuSenha }: LoginFormProps) => {
  void _onEsqueceuSenha;
  const [showPassword, setShowPassword] = useState(false);

  const { setSenha, setEmail, isLoading, handleSubmit } = useLoginPage();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    setEmail(values.email);
    setSenha(values.senha);
    handleSubmit({
      preventDefault: () => {},
    } as React.FormEvent);
  };

  return (
    <Card className="border-0 shadow-2xl bg-white dark:bg-neutral-800">
      <CardContent className="px-8 pb-8 pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-11 h-12 bg-gray-50 dark:bg-neutral-700 border-gray-200 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Senha
                    </FormLabel>
                    <Link
                      to="/recuperar"
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-11 h-12 bg-gray-50 dark:bg-neutral-700 border-gray-200 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setSenha(e.target.value);
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeClosed className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading size={20} message="" className="text-white" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;