import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { TransacaoFormData } from '../../models';

interface TransacaoNotificacaoProps {
  form: UseFormReturn<TransacaoFormData>;
}

export function TransacaoNotificacao({ form }: TransacaoNotificacaoProps) {
  const { t } = useTranslation('financeiro');
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="notificar"
        checked={form.watch('notificar')}
        onChange={(e) => form.setValue('notificar', e.target.checked)}
        className="w-4 h-4"
      />
      <label htmlFor="notificar" className="text-sm text-muted-foreground">
        {t('form.notificar')}
      </label>
    </div>
  );
}