import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEntrada } from '@/hooks/useEntrada';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Loading from '../Loading';
import { useEffect, useState } from 'react';
import { financeiroUser } from '@/utils/User';

const entradaSchema = z.object({
  entrada: z.string().min(1, 'Informe a entrada'),
});

type EntradaFormValues = z.infer<typeof entradaSchema>;

const InfoCards = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const { setEntrada, handleSubmit, isLoading, entrada } = useEntrada();

  const form = useForm<EntradaFormValues>({
    resolver: zodResolver(entradaSchema),
    defaultValues: {
      entrada: entrada || '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await financeiroUser();
        if (data) {
          const entradaUser = data.entrada;
          setEntrada(entradaUser);
        }
      } catch (error) {
        console.error('Erro ao buscar dados financeiros:', error);
      }
    };

    fetchData();
  }, [setEntrada]);

  const onSubmit = (values: EntradaFormValues) => {
    setEntrada(values.entrada);
    setEdit(false);

    handleSubmit({
      preventDefault: () => {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  return (
    <div className="w-full flex gap-[6%] justify-around">
      <Card className="flex flex-[28%] flex-col items-center duration-100">
        <CardHeader className="p-3">
          <CardTitle className="text-blue-900 dark:text-blue-600">
            <h3>Entrada</h3>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent
          onClick={() => setEdit(true)}
          className="flex w-full justify-between text-center text-xl font-bold text-blue-900 dark:text-blue-600 pt-2 gap-5"
        >
          <p>R$</p>
          {edit ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="text-blue-dark max-md:space-y-4 flex flex-col gap-3"
              >
                <FormField
                  control={form.control}
                  name="entrada"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Informe a entrada"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setEntrada(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={edit ? false : true} type="submit">
                  {isLoading ? (
                    <Loading message="" className="flex items-center mt-4" />
                  ) : (
                    'Add'
                  )}
                </Button>
              </form>
            </Form>
          ) : entrada ? (
            entrada
          ) : (
            '00,00'
          )}
        </CardContent>
      </Card>
      <Card className="flex flex-[28%] flex-col items-center duration-100">
        <CardHeader className="p-3">
          <CardTitle className="text-orange-800 dark:text-orange-600">
            <h3>Saída</h3>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex w-full justify-between text-center text-xl font-bold text-orange-800 dark:text-orange-600 pt-2">
          <p>R$</p>
          <p>500,00</p>
        </CardContent>
      </Card>
      <Card className="flex flex-[28%] flex-col items-center duration-100">
        <CardHeader className="p-3">
          <CardTitle className="text-green-900 dark:text-green-600">
            <h3>Restante</h3>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex w-full justify-between text-center text-xl font-bold text-green-900 dark:text-green-600 pt-2">
          <p>R$</p>
          <p>300,00</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoCards;
