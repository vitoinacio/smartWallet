import { useTranslation } from 'react-i18next';
import {
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
import { CATEGORIAS } from '../../models';
import { UseFormReturn } from 'react-hook-form';
import { TransacaoFormData } from '../../models';

interface TransacaoCategoriaSelectProps {
  form: UseFormReturn<TransacaoFormData>;
  tipo: 'receita' | 'despesa';
}

const CATEGORIAS_RECEITA = ['salario', 'investimento', 'freelance', 'outros_receita'];
const CATEGORIAS_DESPESA = ['alimentacao', 'transporte', 'moradia', 'lazer', 'saude', 'educacao', 'contas', 'outros_despesa'];

export function TransacaoCategoriaSelect({ form, tipo }: TransacaoCategoriaSelectProps) {
  const { t } = useTranslation('financeiro');
  const categoriasFiltradas = CATEGORIAS.filter((c) =>
    tipo === 'receita' ? CATEGORIAS_RECEITA.includes(c.id) : CATEGORIAS_DESPESA.includes(c.id)
  );

  return (
    <FormField
      control={form.control}
      name="categoria"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('form.categoria')}</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t('form.selecione')} />
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
  );
}