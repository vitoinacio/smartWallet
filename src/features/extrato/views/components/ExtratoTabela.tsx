import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('extrato');
  if (transacoes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 border rounded-xl bg-card">
        <Receipt className="w-16 h-16 text-muted-foreground/40" />
        <div className="text-center">
          <p className="text-lg font-medium">{t('tabela.empty')}</p>
          <p className="text-sm text-muted-foreground">
            {t('tabela.emptyHint')}
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
          {t('tabela.csv')}
        </button>
        <button
          onClick={onExportExcel}
          disabled={!podeExportar}
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4 text-green-600" />
          {t('tabela.excel')}
        </button>
        <button
          onClick={onExportPDF}
          disabled={!podeExportar || exportandoPDF}
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FilePdf className="w-4 h-4 text-red-500" />
          {exportandoPDF ? t('tabela.gerando') : t('tabela.pdf')}
        </button>
      </div>

      <div className="rounded-xl border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{t('tabela.data')}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{t('tabela.descricao')}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">{t('tabela.categoria')}</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">{t('tabela.valor')}</th>
              <th className="text-center px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">{t('tabela.status')}</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((transacao) => (
              <tr key={transacao.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {formatarDate(transacao.data)}
                </td>
                <td className="px-4 py-3">
                  <div>
                    <span className="font-medium">{transacao.descricao}</span>
                    {transacao.observacao && (
                      <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                        {transacao.observacao}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                  {nomeCategoria(transacao.categoria)}
                </td>
                <td
                  className={`px-4 py-3 whitespace-nowrap text-right font-medium ${
                    transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transacao.tipo === 'receita' ? '+' : '-'}R$ {formatedBrl(transacao.valor.toString())}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center hidden sm:table-cell">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      transacao.status === 'pago'
                        ? 'bg-green-100 text-green-700'
                        : transacao.status === 'pendente'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {transacao.status === 'pago' ? t('tabela.pago') : transacao.status === 'pendente' ? t('tabela.pendente') : t('tabela.vencido')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        {t('tabela.encontradas', { count: transacoes.length })}
      </p>
    </div>
  );
}
