import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { useSignupPage } from '@/hooks/useSignupPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import Loading from '@/components/Loading';
import { Eye, EyeClosed } from 'lucide-react';

const signupSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  sexo: z
    .string({
      required_error: 'Selecione seu sexo.',
    })
    .min(1, 'O sexo é obrigatório'),
  email: z.string().email('Insira um e-mail válido.'),
  senha: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  dataNasc: z.string().date('Insira a data de nascimento'),
  cpf: z.string().min(14, 'Informe um cpf valido'),
  tel: z.string().min(11, 'Numero invalido'),
  cep: z.string().min(8, 'Informe um cep valido'),
  cidade: z.string().min(3, 'Informe sua cidade'),
  bairro: z.string().min(3, 'Informe seu bairro'),
  rua: z.string().min(3, 'Informe a rua'),
  numeroCasa: z.string().min(3, 'Informe O numero da casa'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar os termos e condições.',
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const CadastroForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    setNome,
    setSenha,
    setEmail,
    setSexo,
    setDataNasc,
    setCpf,
    setTel,
    setCep,
    setCidade,
    setBairro,
    setRua,
    setNumeroCasa,
    setIsTermsAccepted,
    isLoading,
    handleSubmit,
  } = useSignupPage();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nome: '',
      sexo: '',
      email: '',
      senha: '',
      dataNasc: '',
      cpf: '',
      tel: '',
      cep: '',
      cidade: '',
      bairro: '',
      rua: '',
      numeroCasa: '',
      terms: false,
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    setNome(values.nome);
    setEmail(values.email);
    setSenha(values.senha);
    setSexo(values.sexo);
    setDataNasc(values.dataNasc);
    setCpf(values.cpf);
    setTel(values.tel);
    setCep(values.cep);
    setCidade(values.cidade);
    setBairro(values.bairro);
    setRua(values.rua);
    setNumeroCasa(values.numeroCasa);
    setIsTermsAccepted(true);

    handleSubmit({
      preventDefault: () => {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

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
                    <FormLabel className="max-md:hidden text-xs">
                      Sexo
                    </FormLabel>
                    <Controller
                      name="sexo"
                      control={form.control}
                      render={({ field: controllerField }) => (
                        <Select
                          value={controllerField.value}
                          onValueChange={(value) => {
                            controllerField.onChange(value);
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
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataNasc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="max-md:hidden text-xs">
                      Data de Nascimento
                    </FormLabel>
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
              {isLoading ? <Loading size={20} /> : 'Cadastrar'}
            </Button>

            <div className="flex items-center justify-center">
              Já tem conta?{' '}
              <a href="/login">
                <Button variant="link" className='text-blue-700'>Fazer Login</Button>
              </a>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CadastroForm;
