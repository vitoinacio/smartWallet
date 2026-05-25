import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('financeiro');
  return (
    <>
      <FormField
        control={form.control}
        name="descricao"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('form.descricao')}</FormLabel>
            <FormControl>
              <Input placeholder={t('form.descricaoPlaceholder')} {...field} />
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
            <FormLabel>{t('form.valor')}</FormLabel>
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
            <FormLabel>{t('form.dataVencimento')}</FormLabel>
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
            <FormLabel>{t('form.observacao')}</FormLabel>
            <FormControl>
              <Input placeholder={t('form.observacaoPlaceholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}