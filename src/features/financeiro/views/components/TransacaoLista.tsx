import { Transacao } from '../../models';
import { SkeletonTransacoes } from './SkeletonTransacoes';
import { TransacaoItem } from './TransacaoItem';
import { TransacaoEmpty } from './TransacaoEmpty';

interface TransacaoListaProps {
  transacoes: Transacao[];
  isLoading: boolean;
  onExcluir: (id: number) => void;
}

export function TransacaoLista({ transacoes, isLoading, onExcluir }: TransacaoListaProps) {
  if (isLoading) {
    return <SkeletonTransacoes />;
  }

  if (transacoes.length === 0) {
    return <TransacaoEmpty />;
  }

  return (
    <div className="space-y-3">
      {transacoes.map((transacao) => (
        <TransacaoItem
          key={transacao.id}
          transacao={transacao}
          onExcluir={onExcluir}
        />
      ))}
    </div>
  );
}