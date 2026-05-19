import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { TransacaoFormData, CATEGORIAS } from '../../models';
import Loading from '@/core/components/Loading';
import { Plus } from 'lucide-react';

const transacaoSchema = z.object({
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  valor: z.string().min(1, 'Valor é obrigatório'),
  tipo: z.enum(['receita', 'despesa']),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  data: z.string().min(1, 'Data é obrigatória'),
  observacao: z.string().optional(),
  notificar: z.boolean(),
});

interface TransacaoFormProps {
  onSubmit: (data: TransacaoFormData) => Promise<void>;
  isLoading: boolean;
}

export function TransacaoForm({ onSubmit, isLoading }: TransacaoFormProps) {
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('despesa');

  const form = useForm<z.infer<typeof transacaoSchema>>({
    resolver: zodResolver(transacaoSchema),
    defaultValues: {
      descricao: '',
      valor: '',
      tipo: 'despesa',
      categoria: '',
      data: '',
      observacao: '',
      notificar: true,
    },
  });

  const categoriasFiltradas = CATEGORIAS.filter((c) =>
    tipo === 'receita'
      ? ['salario', 'investimento', 'freelance', 'outros_receita'].includes(c.id)
      : ['alimentacao', 'transporte', 'moradia', 'lazer', 'saude', 'educacao', 'contas', 'outros_despesa'].includes(c.id)
  );

  const handleSubmit = async (values: z.infer<typeof transacaoSchema>) => {
    await onSubmit(values);
    form.reset();
  };

  if (isLoading) {
    return <Loading size={32} message="Processando..." />;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Plus className="w-5 h-5" />
          Nova Transação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setTipo(value as 'receita' | 'despesa');
                        form.setValue('categoria', '');
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="receita">Receita</SelectItem>
                        <SelectItem value="despesa">Despesa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriasFiltradas.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Supermercado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="0,00"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          const formatted = value
                            ? (parseInt(value) / 100).toFixed(2).replace('.', ',')
                            : '';
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Vencimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observação (opicional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Detalhes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notificar"
                checked={form.watch('notificar')}
                onChange={(e) => form.setValue('notificar', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="notificar" className="text-sm text-muted-foreground">
                Notificar quando estiver próxima do vencimento
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? <Loading size={20} /> : 'Adicionar Transação'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}