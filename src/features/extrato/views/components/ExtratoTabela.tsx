import { Transacao } from '@/features/financeiro/models';
import { formatarDate } from '@/core/utils/formatedDate';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { FileDown, FileSpreadsheet, FileText as FilePdf, Receipt } from 'lucide-react';

interface ExtratoTabelaProps {
  transacoes: Transacao[];
  nomeCategoria: (id: string) => string;
  onExportCSV: () => void;
  onExportExcel: () => void;
  onExportPDF: () => void;
  podeExportar: boolean;
  exportandoPDF: boolean;
}

export function ExtratoTabela({
  transacoes,
  nomeCategoria,
  onExportCSV,
  onExportExcel,
  onExportPDF,
  podeExportar,
  exportandoPDF,
}: ExtratoTabelaProps) {
  if (transacoes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 border rounded-xl bg-card">
        <Receipt className="w-16 h-16 text-muted-foreground/40" />
        <div className="text-center">
          <p className="text-lg font-medium">Nenhuma transação no período</p>
          <p className="text-sm text-muted-foreground">
            Selecione outro mês ou adicione transações no Financeiro
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-end gap-2">
        <button
          onClick={onExportCSV}
          disabled={!podeExportar}
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FileDown className="w-4 h-4" />
          CSV
        </button>
        <button
          onClick={onExportExcel}
          disabled={!podeExportar}
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4 text-green-600" />
          Excel
        </button>
        <button
          onClick={onExportPDF}
          disabled={!podeExportar || exportandoPDF}
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FilePdf className="w-4 h-4 text-red-500" />
          {exportandoPDF ? 'Gerando...' : 'PDF'}
        </button>
      </div>

      <div className="rounded-xl border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Data</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Descrição</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Categoria</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Valor</th>
              <th className="text-center px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t) => (
              <tr key={t.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {formatarDate(t.data)}
                </td>
                <td className="px-4 py-3">
                  <div>
                    <span className="font-medium">{t.descricao}</span>
                    {t.observacao && (
                      <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                        {t.observacao}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                  {nomeCategoria(t.categoria)}
                </td>
                <td
                  className={`px-4 py-3 whitespace-nowrap text-right font-medium ${
                    t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {t.tipo === 'receita' ? '+' : '-'}R$ {formatedBrl(t.valor.toString())}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center hidden sm:table-cell">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      t.status === 'pago'
                        ? 'bg-green-100 text-green-700'
                        : t.status === 'pendente'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {t.status === 'pago' ? 'Pago' : t.status === 'pendente' ? 'Pendente' : 'Vencido'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        {transacoes.length} transaç{transacoes.length === 1 ? 'ão' : 'ões'} encontrada{transacoes.length === 1 ? '' : 's'}
      </p>
    </div>
  );
}
