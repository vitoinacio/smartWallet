import { useTranslation } from 'react-i18next';
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
import { formatedBrl } from '@/core/utils/formatedBrl';
import { formatarDate } from '@/core/utils/formatedDate';
import { Transacao, CATEGORIAS } from '../../models';
import { Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface TransacaoItemProps {
  transacao: Transacao;
  onExcluir: (id: number) => void;
}

function IconeStatus({ status }: { status: string }) {
  switch (status) {
    case 'pago':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'vencido':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-amber-500" />;
  }
}

export function TransacaoItem({ transacao, onExcluir }: TransacaoItemProps) {
  const { t } = useTranslation('financeiro');
  const obterCategoria = (id: string) =>
    CATEGORIAS.find((c) => c.id === id) || { nome: 'Outros', cor: 'bg-gray-500' };
  const categoria = obterCategoria(transacao.categoria);
  const isDespesa = transacao.tipo === 'despesa';

  return (
    <Card className={`border-l-4 ${isDespesa ? 'border-l-red-500' : 'border-l-green-500'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${categoria.cor}`}>
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
                  <span className="capitalize">{t('item.' + transacao.status)}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`text-lg font-bold ${isDespesa ? 'text-red-600' : 'text-green-600'}`}>
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
                  <AlertDialogTitle>{t('item.excluir')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('item.excluirConfirm', { nome: transacao.descricao })}
                    {t('item.excluirHint')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('item.cancelar')}</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onExcluir(transacao.id)} className="bg-red-600 hover:bg-red-700">
                    {t('item.excluir')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {transacao.observacao && (
          <p className="text-sm text-muted-foreground mt-2 pl-13">
            {t('item.obs')}: {transacao.observacao}
          </p>
        )}
      </CardContent>
    </Card>
  );
}