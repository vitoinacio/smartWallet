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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useSignupPage } from '@/hooks/useSignupPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import Loading from '@/components/Loading';
import { Eye, EyeClosed } from 'lucide-react';

// Definição do schema de validação com Zod
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

const CadastroForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailPreenchido, setEmailPreenchido] = useState<string | null>(null);
  const [isEmailLoaded, setIsEmailLoaded] = useState<boolean>(false); // Estado para controlar quando o e-mail é carregado

  const {
    setNome,
    setSenha,
    setEmail,
    setSexo,
    setDataNasc,
    isLoading,
    handleSubmit,
    setIsTermsAccepted,
  } = useSignupPage();

  // Efeito para verificar se existe um e-mail no localStorage
  useEffect(() => {
    const emailStored = localStorage.getItem('emailInputHome');
    if (emailStored) {
      setEmailPreenchido(emailStored);
      setEmail(emailStored); // Preenche o campo de e-mail com o valor armazenado
      localStorage.removeItem('emailInputHome'); // Remove o item após o preenchimento
    }
    setIsEmailLoaded(true); // Marca como carregado após buscar o e-mail
  }, [setEmail]);

  // Use hook de formulário
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nome: '',
      sexo: '',
      email: emailPreenchido || '', // Preenche com o e-mail do localStorage se disponível
      senha: '',
      dataNasc: '',
      termos: false,
    },
  });

  // Atualiza os valores do formulário com o email carregado após o efeito
  useEffect(() => {
    if (isEmailLoaded && emailPreenchido !== null) {
      form.reset({
        ...form.getValues(),
        email: emailPreenchido, // Atualiza o valor do campo email dinamicamente
      });
    }
  }, [isEmailLoaded, emailPreenchido, form]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Função para envio do formulário
  const onSubmit = (values: SignupFormValues) => {
    // Atualiza os estados com os valores do formulário
    setNome(values.nome);
    setEmail(values.email);
    setSenha(values.senha);
    setSexo(values.sexo);
    setDataNasc(values.dataNasc);
    setIsTermsAccepted(values.termos); // Armazena se o termo foi aceito

    handleSubmit({
      preventDefault: () => {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  // Não renderiza o formulário até que o e-mail tenha sido carregado
  if (!isEmailLoaded) {
    return <Loading size={20} message="Carregando..." />;
  }

  return (
    <Card className="max-w-[350px]">
      <CardHeader className="flex text-center max-md:p-6 p-4">
        <CardTitle>Cadastre-se</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="text-blue-dark max-md:space-y-4"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="max-md:hidden text-xs">Nome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu nome"
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

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="sexo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="max-md:hidden text-xs">Sexo</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSexo(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu Sexo" />
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
                    <FormLabel className="max-md:hidden text-xs">Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input
                        className="max-md:w-32"
                        type="date"
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
                        {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termos"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        className="h-3 flex-[10%] mt-1"
                        type="checkbox"
                        checked={field.value || false}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          setIsTermsAccepted(e.target.checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="max-md:hidden text-xs flex-[90%]">
                      Aceito os Termos e política de privacidade
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-3 flex justify-center items-center bg-sidebar hover:bg-blue-950 dark:bg-blue-900 dark:text-primary dark:hover:bg-blue-950"
              disabled={isLoading}
            >
              {isLoading ? <Loading size={20} message="" className="pt-3" /> : 'Finalizar Cadastro'}
            </Button>

            <div className="flex items-center justify-center">
              Já tem conta?{' '}
              <a href="/login">
                <Button type="button" variant="link" className="text-blue-700">
                  Fazer Login
                </Button>
              </a>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CadastroForm;