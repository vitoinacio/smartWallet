import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import Loading from '@/components/Loading';
import { Eye, EyeClosed } from 'lucide-react';
import { useLoginPage } from '@/hooks/useLoginPage';

const signupSchema = z.object({
  email: z.string().email('Insira um e-mail válido.'),
  senha: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const LoginForm = () => {
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
    // Atualiza os estados com os valores do formulário
    setEmail(values.email);
    setSenha(values.senha);

    // Agora envia os dados completos após a segunda etapa
    handleSubmit({
      preventDefault: () => {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  return (
    <Card className="max-w-[350px]">
      <CardHeader className="flex text-center max-md:p-6 p-4">
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="text-blue-dark max-md:space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="max-md:hidden text-xs">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Digite seu Email"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setEmail(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="max-md:hidden text-xs">Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua Senha"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setSenha(e.target.value);
                        }}
                      />
                      <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeClosed size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-3 flex justify-center items-center bg-sidebar hover:bg-blue-950 dark:bg-blue-900 dark:text-primary dark:hover:bg-blue-950"
              disabled={isLoading}
            >
              {isLoading ? <Loading size={20} message='' className='pt-3' /> : 'Login'}
            </Button>

            <div className="flex items-center justify-center">
              Ainda não possui Conta?{' '}
              <a href="/CreateAccount">
                <Button variant="link" type="button" className="text-blue-700">
                  Cadastre-se
                </Button>
              </a>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
