import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FiltrosTransacao, TipoTransacao } from '../../models';
import { Filter, X } from 'lucide-react';

interface FiltrosBarProps {
  filtros: FiltrosTransacao;
  onPeriodoChange: (periodo: FiltrosTransacao['periodo']) => void;
  onTipoChange: (tipo: TipoTransacao | undefined) => void;
  onLimpar: () => void;
  temFiltros: boolean;
}

export function FiltrosBar({
  filtros,
  onPeriodoChange,
  onTipoChange,
  onLimpar,
  temFiltros,
}: FiltrosBarProps) {
  const { t } = useTranslation('financeiro');
  return (
    <Card className="bg-muted/30">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">{t('filtros.title')}</span>
          </div>

          <Select
            value={filtros.periodo}
            onValueChange={(value) =>
              onPeriodoChange(value as FiltrosTransacao['periodo'])
            }
          >
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder={t('filtros.periodo')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">{t('filtros.ultimaSemana')}</SelectItem>
              <SelectItem value="mes">{t('filtros.ultimoMes')}</SelectItem>
              <SelectItem value="ano">{t('filtros.ultimoAno')}</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filtros.tipo || 'todos'}
            onValueChange={(value) =>
              onTipoChange(value === 'todos' ? undefined : (value as TipoTransacao))
            }
          >
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder={t('filtros.tipo')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">{t('filtros.todos')}</SelectItem>
              <SelectItem value="receita">{t('filtros.receitas')}</SelectItem>
              <SelectItem value="despesa">{t('filtros.despesas')}</SelectItem>
            </SelectContent>
          </Select>

          {temFiltros && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLimpar}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              {t('filtros.limpar')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}