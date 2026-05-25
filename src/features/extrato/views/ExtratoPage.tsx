import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useExtrato } from '../viewModels';
import { ExtratoFiltroMes, ExtratoResumo, ExtratoTabela } from './components';
import { FileText } from 'lucide-react';

const ExtratoPage = () => {
  const { t } = useTranslation('extrato');
  const [exportandoPDF, setExportandoPDF] = useState(false);

  const {
    transacoes,
    totalReceitas,
    totalDespesas,
    saldo,
    filtro,
    alterarMes,
    alterarAno,
    labelMes,
    nomeCategoria,
    gerarCSV,
    gerarExcel,
    gerarPDF,
    podeExportar,
  } = useExtrato();

  const handleExportPDF = () => {
    setExportandoPDF(true);
    gerarPDF();
    setExportandoPDF(false);
  };

  return (
    <main className="w-full mt-6 px-4 lg:px-6 pb-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <section>
          <div className="flex items-center gap-3 mb-1">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">{t('title')}</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('subtitle')}
          </p>
        </section>

        <section>
          <ExtratoFiltroMes
            filtro={filtro}
            labelMes={labelMes}
            onAlterarMes={alterarMes}
            onAlterarAno={alterarAno}
          />
        </section>

        <section>
          <ExtratoResumo
            totalReceitas={totalReceitas}
            totalDespesas={totalDespesas}
            saldo={saldo}
          />
        </section>

        <section>
          <ExtratoTabela
            transacoes={transacoes}
            nomeCategoria={nomeCategoria}
            onExportCSV={gerarCSV}
            onExportExcel={gerarExcel}
            onExportPDF={handleExportPDF}
            podeExportar={podeExportar}
            exportandoPDF={exportandoPDF}
          />
        </section>
      </div>
    </main>
  );
};

export default ExtratoPage;
