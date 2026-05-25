import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { EconomiaProgress } from '../../models';
import { formatedBrl } from '@/core/utils/formatedBrl';
import {
  Trash2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Plus,
  X,
} from 'lucide-react';
import { ConfirmDialog } from '@/core/components/ConfirmDialog';

interface MetaCardProps {
  progress: EconomiaProgress;
  onExcluir: (id: string) => void;
  onAdicionarProgresso: (id: string, valor: number) => void;
  onEstender: (id: string, novoValorAlvo: number) => void;
}

function getStatusIcon(status: EconomiaProgress['status']) {
  switch (status) {
    case 'ok':
      return <TrendingUp className="w-4 h-4 text-blue-500" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case 'atingida':
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
  }
}

function getBarColor(status: EconomiaProgress['status']) {
  switch (status) {
    case 'ok':
      return 'bg-blue-500';
    case 'warning':
      return 'bg-amber-500';
    case 'atingida':
      return 'bg-green-500';
  }
}

function getStatusLabel(status: EconomiaProgress['status']) {
  switch (status) {
    case 'ok':
      return 'Em andamento';
    case 'warning':
      return 'Quase lá';
    case 'atingida':
      return 'Atingida!';
  }
}

export function MetaCard({
  progress,
  onExcluir,
  onAdicionarProgresso,
  onEstender,
}: MetaCardProps) {
  const { meta, percentual, restante, status } = progress;
  const [mostrarAdicionar, setMostrarAdicionar] = useState(false);
  const [valorAdicionar, setValorAdicionar] = useState('');
  const [valorEstender, setValorEstender] = useState('');
  const [mostrarEstender, setMostrarEstender] = useState(false);

  const formatValorMeta = useCallback((value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue
      ? (parseInt(numericValue) / 100).toFixed(2).replace('.', ',')
      : '';
  }, []);

  const maskParaCentavos = useCallback((masked: string) => {
    return parseInt(masked.replace(/\D/g, '')) || 0;
  }, []);

  const handleAdicionar = (e: React.FormEvent) => {
    e.preventDefault();
    const centavos = maskParaCentavos(valorAdicionar);
    if (centavos <= 0) return;
    onAdicionarProgresso(meta.id, centavos);
    setValorAdicionar('');
    setMostrarAdicionar(false);
  };

  const handleEstender = (e: React.FormEvent) => {
    e.preventDefault();
    const centavos = maskParaCentavos(valorEstender);
    if (centavos <= meta.valorAlvo) return;
    onEstender(meta.id, centavos);
    setValorEstender('');
    setMostrarEstender(false);
  };

  const percentualExibido = Math.min(percentual, 100);

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status)}
            <CardTitle className="text-base">{meta.nome}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            {status === 'atingida' && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-green-600"
                onClick={() => setMostrarEstender(!mostrarEstender)}
                aria-label="Estender meta"
              >
                + Estender
              </Button>
            )}
            <ConfirmDialog
              title="Excluir Meta"
              description={`Tem certeza que deseja excluir a meta "${meta.nome}"? Esta ação não pode ser desfeita.`}
              onConfirm={() => onExcluir(meta.id)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-red-500 hover:text-red-600"
                aria-label={`Excluir meta ${meta.nome}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </ConfirmDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            R$ {formatedBrl(meta.valorAtual.toString())} / R${' '}
            {formatedBrl(meta.valorAlvo.toString())}
          </span>
          <span
            className={`font-medium ${
              status === 'atingida'
                ? 'text-green-600'
                : status === 'warning'
                  ? 'text-amber-600'
                  : 'text-blue-600'
            }`}
          >
            {percentual.toFixed(1)}%
          </span>
        </div>

        <div className="relative">
          <Progress
            value={percentualExibido}
            className={`h-2.5 ${getBarColor(status)}`}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{getStatusLabel(status)}</span>
          {status !== 'atingida' ? (
            <span>
              Restante: R$ {formatedBrl(String(Math.max(restante, 0)))}
            </span>
          ) : (
            <span className="text-green-600 font-medium">
              Economizado: R$ {formatedBrl(meta.valorAtual.toString())}
            </span>
          )}
        </div>

        {status !== 'atingida' && (
          <div>
            {mostrarAdicionar ? (
              <form
                onSubmit={handleAdicionar}
                className="flex items-center gap-2"
              >
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="0,00"
                  value={valorAdicionar}
                  onChange={(e) => setValorAdicionar(formatValorMeta(e.target.value))}
                  className="h-8 text-sm"
                  aria-label="Valor para adicionar à meta"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-8"
                  disabled={maskParaCentavos(valorAdicionar) <= 0}
                  aria-label="Confirmar adição"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setMostrarAdicionar(false);
                    setValorAdicionar('');
                  }}
                  aria-label="Cancelar"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </form>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => setMostrarAdicionar(true)}
              >
                <Plus className="w-3 h-3 mr-1" />
                Adicionar valor economizado
              </Button>
            )}
          </div>
        )}

        {mostrarEstender && (
          <form onSubmit={handleEstender} className="flex items-center gap-2 pt-1 border-t">
            <span className="text-xs text-muted-foreground shrink-0">
              Novo alvo (R$):
            </span>
            <Input
              type="text"
              inputMode="numeric"
              placeholder={formatedBrl(meta.valorAlvo.toString())}
              value={valorEstender}
              onChange={(e) => setValorEstender(formatValorMeta(e.target.value))}
              className="h-8 text-sm"
              aria-label="Novo valor alvo"
            />
            <Button
              type="submit"
              size="sm"
              className="h-8 text-xs"
              disabled={maskParaCentavos(valorEstender) <= meta.valorAlvo}
            >
              Salvar
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setMostrarEstender(false);
                setValorEstender('');
              }}
              aria-label="Cancelar estender"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
