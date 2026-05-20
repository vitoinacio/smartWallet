import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useSignupPage } from '../../viewModels/useSignupPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import Loading from '@/core/components/Loading';
import { Eye, EyeClosed } from 'lucide-react';

const signupSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  sexo: z
    .string()
    .min(1, 'O sexo é obrigatório')
    .refine((val) => val !== '', { message: 'Selecione seu sexo.' }),
  email: z.string().email('Insira um e-mail válido.'),
  senha: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  dataNasc: z.string().date('Insira a data de nascimento'),
  termos: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar os termos e condições.',
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface CadastroFormProps {
  onVoltarLogin?: () => void;
}

const CadastroForm = ({ onVoltarLogin }: CadastroFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { setNome, setSexo, setEmail, setSenha, setDataNasc, isLoading, handleSubmit } = useSignupPage();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nome: '',
      sexo: '',
      email: '',
      senha: '',
      dataNasc: '',
      termos: false,
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    setNome(values.nome);
    setSexo(values.sexo);
    setEmail(values.email);
    setSenha(values.senha);
    setDataNasc(values.dataNasc);
    handleSubmit({
      preventDefault: () => {},
    } as any);
  };

  return (
    <Card className="w-full border-0 shadow-2xl bg-white dark:bg-neutral-800">
      <CardContent className="px-8 pb-8 pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nome completo
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu nome completo"
                      className="h-12 bg-gray-50 dark:bg-neutral-700 border-gray-200 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setNome(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sexo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Sexo
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSexo(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 bg-gray-50 dark:bg-neutral-700 border-gray-200 dark:border-neutral-600">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Feminino">Feminino</SelectItem>
                        <SelectItem value="LGBTQIAP+">LGBTQIAP+</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataNasc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Data de nasc.
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="h-12 bg-gray-50 dark:bg-neutral-700 border-gray-200 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setDataNasc(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="h-12 bg-gray-50 dark:bg-neutral-700 border-gray-200 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
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
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Senha
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="h-12 pr-12 bg-gray-50 dark:bg-neutral-700 border-gray-200 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setSenha(e.target.value);
                        }}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termos"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-gray-600 dark:text-gray-400">
                      Eu aceito os{' '}
                      <a href="/termos" className="text-blue-700 hover:underline" target="_blank">
                        Termos de Uso
                      </a>{' '}
                      e a{' '}
                      <a href="/privacidade" className="text-blue-700 hover:underline" target="_blank">
                        Política de Privacidade
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? <Loading size={20} message="" className="pt-3" /> : 'Criar conta'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CadastroForm;