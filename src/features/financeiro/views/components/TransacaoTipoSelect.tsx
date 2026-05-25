import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('financeiro');
  return (
    <FormField
      control={form.control}
      name="tipo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('form.tipo')}</FormLabel>
          <Select
            value={field.value}
            onValueChange={onTipoChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t('form.selecione')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="receita">{t('form.receita')}</SelectItem>
              <SelectItem value="despesa">{t('form.despesa')}</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}