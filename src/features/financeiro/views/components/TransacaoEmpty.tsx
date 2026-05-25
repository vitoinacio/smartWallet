import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/core/components/EmptyState';
import { Receipt } from 'lucide-react';

export function TransacaoEmpty() {
  const { t } = useTranslation('financeiro');
  return (
    <EmptyState
      icon={Receipt}
      title={t('empty.title')}
      description={t('empty.hint')}
    />
  );
}