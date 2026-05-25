import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Recorrencia, CATEGORIAS } from '@/features/financeiro/models';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { Pause, Play, Trash2, Repeat, CalendarClock } from 'lucide-react';
import { EmptyState } from '@/core/components/EmptyState';
import { ConfirmDialog } from '@/core/components/ConfirmDialog';

interface RecorrenciaListProps {
  recorrencias: Recorrencia[];
  onToggle: (id: string) => void;
  onExcluir: (id: string) => void;
}

export function RecorrenciaList({ recorrencias, onToggle, onExcluir }: RecorrenciaListProps) {
  const { t } = useTranslation('financeiro');
  if (recorrencias.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Repeat className="w-5 h-5" />
            {t('recorrencia.titulo')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={CalendarClock}
            title={t('recorrencia.empty')}
            description={t('recorrencia.emptyHint')}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Repeat className="w-5 h-5" />
          {t('recorrencia.titulo')} ({recorrencias.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recorrencias.map((rec) => {
            const categoria = CATEGORIAS.find((c) => c.id === rec.categoria);
            return (
              <div
                key={rec.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-opacity ${
                  rec.ativa ? '' : 'opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${rec.ativa ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{rec.descricao}</span>
                      <Badge variant={rec.tipo === 'receita' ? 'default' : 'destructive'} className="text-xs">
                        {rec.tipo === 'receita' ? t('recorrencia.receita') : t('recorrencia.despesa')}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {t(`recorrencia.${rec.frequencia}`)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {categoria?.nome || rec.categoria} · {t('recorrencia.diaVencimento')} {rec.diaVencimento} · R$ {formatedBrl(rec.valor.toString())}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onToggle(rec.id)}
                  >
                    {rec.ativa ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <ConfirmDialog
                    title={t('recorrencia.excluir')}
                    description={t('recorrencia.excluirConfirm', { descricao: rec.descricao })}
                    onConfirm={() => onExcluir(rec.id)}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </ConfirmDialog>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
