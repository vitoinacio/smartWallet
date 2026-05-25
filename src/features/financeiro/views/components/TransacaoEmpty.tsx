import { EmptyState } from '@/core/components/EmptyState';
import { Receipt } from 'lucide-react';

export function TransacaoEmpty() {
  return (
    <EmptyState
      icon={Receipt}
      title="Nenhuma transação encontrada"
      description="Adicione sua primeira transação no formulário acima"
    />
  );
}