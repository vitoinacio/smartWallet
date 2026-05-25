import { formatedBrl } from '@/core/utils/formatedBrl';

interface ExtratoResumoProps {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export function ExtratoResumo({
  totalReceitas,
  totalDespesas,
  saldo,
}: ExtratoResumoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">Receitas</p>
        <p className="text-2xl font-bold text-green-600">
          R$ {formatedBrl(totalReceitas.toString())}
        </p>
      </div>
      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">Despesas</p>
        <p className="text-2xl font-bold text-red-600">
          R$ {formatedBrl(totalDespesas.toString())}
        </p>
      </div>
      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">Saldo</p>
        <p
          className={`text-2xl font-bold ${
            saldo >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          R$ {formatedBrl(Math.abs(saldo).toString())}
          {saldo < 0 && <span className="text-sm ml-1">(negativo)</span>}
        </p>
      </div>
    </div>
  );
}
