import { Transacao } from '../../models';
import Loading from '@/core/components/Loading';
import { TransacaoItem } from './TransacaoItem';
import { TransacaoEmpty } from './TransacaoEmpty';

interface TransacaoListaProps {
  transacoes: Transacao[];
  isLoading: boolean;
  onExcluir: (id: number) => void;
}

export function TransacaoLista({ transacoes, isLoading, onExcluir }: TransacaoListaProps) {
  if (isLoading) {
    return <Loading message="Carregando transações..." />;
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