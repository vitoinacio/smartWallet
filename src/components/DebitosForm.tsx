import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import Loading from '@/components/Loading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDebitosForm } from '@/hooks/useDebitosForm';

const debitosSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  valor: z.string().min(1, 'Valor deve ser maior que 0'),
  data: z.string().nonempty('Data é obrigatória'),
  obs: z.string().optional(),
  notifi: z.string().min(1, 'Notificação é obrigatória'),
});

type DebitosFormValues = z.infer<typeof debitosSchema>;

const DebitosForm = () => {
  const {
    setTitle,
    setValor,
    setData,
    setNotifi,
    setObs,
    isLoading,
    errorMessage,
    handleSubmit,
  } = useDebitosForm();

  const form = useForm<DebitosFormValues>({
    resolver: zodResolver(debitosSchema),
    defaultValues: {
      title: '',
      valor: '',
      data: '',
      obs: '',
      notifi: 'Sim',
    },
  });

  const onSubmit = (values: DebitosFormValues) => {
    setTitle(values.title);
    setObs(values.obs);
    setValor(values.valor);
    setData(values.data);
    setNotifi(values.notifi);

    handleSubmit({
      preventDefault: () => {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  if (isLoading) {
    return <Loading size={20} message="Enviando dados..." />;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex text-center max-md:p-6 p-4">
        <CardTitle>Dados Financeiros</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="text-blue-dark flex items-center gap-3 max-md:flex-col">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-0 max-md:w-full">
                    <FormLabel className="max-md:hidden text-xs">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-md:text-center"
                        type="text"
                        placeholder="Digite o titulo"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setTitle(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="obs"
                render={({ field }) => (
                  <FormItem className="space-y-0 max-md:w-full">
                    <FormLabel className="max-md:hidden text-xs">
                      Observação
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-md:text-center"
                        type="text"
                        placeholder="Digite a observação"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setObs(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem className="space-y-0 max-md:w-full">
                    <FormLabel className="max-md:hidden text-xs">
                      Valor
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-md:text-center"
                        type="text"
                        placeholder="Digite o Valor"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setValor(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem className="space-y-0 max-md:w-full">
                    <FormLabel className="max-md:hidden text-xs">
                      Data de Vencimento
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-md:text-center"
                        type="date"
                        placeholder="Data"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setData(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifi"
                render={({ field }) => (
                  <FormItem className="space-y-0 max-md:w-full">
                    <FormLabel className="max-md:hidden text-xs ">
                      Notificação
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setNotifi(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Notificação" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Sim">Sim</SelectItem>
                        <SelectItem value="Não">Não</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-5 max-md:w-full flex justify-center items-center bg-sidebar hover:bg-blue-950 dark:bg-blue-900 dark:text-primary dark:hover:bg-blue-950"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loading size={20} message="" className="pt-3" />
                ) : (
                  'Adicionar'
                )}
              </Button>
            </div>

            {errorMessage && (
              <div className="text-red-500 text-xs mt-2 text-center w-full">{errorMessage}</div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DebitosForm;
