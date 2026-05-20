import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { TransacaoFormData } from '../../models';

interface TransacaoInputsProps {
  form: UseFormReturn<TransacaoFormData>;
  onFormatValor: (value: string) => string;
}

export function TransacaoInputs({ form, onFormatValor }: TransacaoInputsProps) {
  return (
    <>
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
                onChange={(e) => field.onChange(onFormatValor(e.target.value))}
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
            <FormLabel>Observação (opcional)</FormLabel>
            <FormControl>
              <Input placeholder="Detalhes..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}