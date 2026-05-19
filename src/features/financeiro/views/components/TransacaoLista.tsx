import { Transacao, CATEGORIAS } from '../../models';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { formatarDate } from '@/core/utils/formatedDate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Loading from '@/core/components/Loading';
import { Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface TransacaoListaProps {
  transacoes: Transacao[];
  isLoading: boolean;
  onExcluir: (id: number) => void;
}

const obterCategoria = (id: string) =>
  CATEGORIAS.find((c) => c.id === id) || { nome: 'Outros', cor: 'bg-gray-500' };

const IconeStatus = ({ status }: { status: string }) => {
  switch (status) {
    case 'pago':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'vencido':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-amber-500" />;
  }
};

export function TransacaoLista({
  transacoes,
  isLoading,
  onExcluir,
}: TransacaoListaProps) {
  if (isLoading) {
    return <Loading message="Carregando transações..." />;
  }

  if (transacoes.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          Nenhuma transação encontrada. Adicione sua primeira transação!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {transacoes.map((transacao) => {
        const categoria = obterCategoria(transacao.categoria);
        const isDespesa = transacao.tipo === 'despesa';

        return (
          <Card
            key={transacao.id}
            className={`border-l-4 ${
              isDespesa ? 'border-l-red-500' : 'border-l-green-500'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${categoria.cor}`}
                  >
                    {categoria.nome.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{transacao.descricao}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{categoria.nome}</span>
                      <span>•</span>
                      <span>{formatarDate(transacao.data)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <IconeStatus status={transacao.status} />
                        <span className="capitalize">{transacao.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`text-lg font-bold ${
                      isDespesa ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {isDespesa ? '-' : '+'}R$ {formatedBrl(transacao.valor.toString())}
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Transação</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir &quot;{transacao.descricao}&quot;?
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onExcluir(transacao.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {transacao.observacao && (
                <p className="text-sm text-muted-foreground mt-2 pl-13">
                  Obs: {transacao.observacao}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}