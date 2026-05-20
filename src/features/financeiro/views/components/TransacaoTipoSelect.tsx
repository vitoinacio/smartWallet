import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { TransacaoFormData } from '../../models';

interface TransacaoTipoSelectProps {
  form: UseFormReturn<TransacaoFormData>;
  onTipoChange: (value: 'receita' | 'despesa') => void;
}

export function TransacaoTipoSelect({ form, onTipoChange }: TransacaoTipoSelectProps) {
  return (
    <FormField
      control={form.control}
      name="tipo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo</FormLabel>
          <Select
            value={field.value}
            onValueChange={onTipoChange}
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
  );
}