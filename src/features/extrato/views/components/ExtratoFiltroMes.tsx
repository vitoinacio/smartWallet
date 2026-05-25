import { FiltroExtrato } from '../../models';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExtratoFiltroMesProps {
  filtro: FiltroExtrato;
  labelMes: string;
  onAlterarMes: (mes: number) => void;
  onAlterarAno: (ano: number) => void;
}

export function ExtratoFiltroMes({
  filtro,
  labelMes,
  onAlterarMes,
  onAlterarAno,
}: ExtratoFiltroMesProps) {
  const mesAnterior = () => {
    if (filtro.mes === 1) {
      onAlterarMes(12);
      onAlterarAno(filtro.ano - 1);
    } else {
      onAlterarMes(filtro.mes - 1);
    }
  };

  const mesSeguinte = () => {
    if (filtro.mes === 12) {
      onAlterarMes(1);
      onAlterarAno(filtro.ano + 1);
    } else {
      onAlterarMes(filtro.mes + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={mesAnterior}
        aria-label="Mês anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-lg font-semibold min-w-[200px] text-center select-none">
        {labelMes}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={mesSeguinte}
        aria-label="Mês seguinte"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
