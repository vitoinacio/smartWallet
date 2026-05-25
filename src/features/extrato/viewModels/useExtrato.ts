import { useState, useMemo, useCallback } from 'react';
import { toast } from '@/components/ui/sonner';
import { Transacao, CATEGORIAS } from '@/features/financeiro/models';
import { formatarDate } from '@/core/utils/formatedDate';
import { FiltroExtrato } from '../models';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
applyPlugin(jsPDF);

const STORAGE_KEY = 'smartwallet_mock_transacoes';

function getTransacoes(): Transacao[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function useExtrato() {
  const hoje = new Date();
  const [filtro, setFiltro] = useState<FiltroExtrato>({
    mes: hoje.getMonth() + 1,
    ano: hoje.getFullYear(),
  });

  const alterarMes = useCallback((mes: number) => {
    setFiltro((prev) => ({ ...prev, mes }));
  }, []);

  const alterarAno = useCallback((ano: number) => {
    setFiltro((prev) => ({ ...prev, ano }));
  }, []);

  const transacoes = useMemo(() => {
    const todas = getTransacoes();
    return todas.filter((t) => {
      const data = new Date(t.data);
      return (
        data.getMonth() + 1 === filtro.mes &&
        data.getFullYear() === filtro.ano
      );
    });
  }, [filtro.mes, filtro.ano]);

  const ordenadas = useMemo(() => {
    return [...transacoes].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }, [transacoes]);

  const totalReceitas = useMemo(() => {
    return transacoes
      .filter((t) => t.tipo === 'receita')
      .reduce((acc, t) => acc + t.valor, 0);
  }, [transacoes]);

  const totalDespesas = useMemo(() => {
    return transacoes
      .filter((t) => t.tipo === 'despesa')
      .reduce((acc, t) => acc + t.valor, 0);
  }, [transacoes]);

  const saldo = totalReceitas - totalDespesas;

  const labelMes = `${MESES[filtro.mes - 1]} de ${filtro.ano}`;

  const nomeCategoria = useCallback((id: string): string => {
    return CATEGORIAS.find((c) => c.id === id)?.nome || id;
  }, []);

  const formatarValorReais = useCallback((centavos: number) => {
    return (centavos / 100).toFixed(2).replace('.', ',');
  }, []);

  const statusLabel = useCallback((status: Transacao['status']) => {
    return status === 'pago' ? 'Pago' : status === 'pendente' ? 'Pendente' : 'Vencido';
  }, []);

  const gerarCSV = useCallback(() => {
    const BOM = '\uFEFF';
    const cabecalho = 'Data;Descrição;Tipo;Categoria;Valor;Status;Observação';
    const linhas = ordenadas.map((t) => {
      const obs = t.observacao ? `"${t.observacao.replace(/"/g, '""')}"` : '';
      return `${formatarDate(t.data)};${t.descricao};${t.tipo === 'receita' ? 'Receita' : 'Despesa'};${nomeCategoria(t.categoria)};${formatarValorReais(t.valor)};${statusLabel(t.status)};${obs}`;
    });
    const conteudo = BOM + cabecalho + '\n' + linhas.join('\n');
    const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extrato_${filtro.mes}_${filtro.ano}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exportado com sucesso!');
  }, [ordenadas, filtro, nomeCategoria, formatarValorReais, statusLabel]);

  const gerarExcel = useCallback(() => {
    const dados = ordenadas.map((t) => ({
      Data: formatarDate(t.data),
      Descrição: t.descricao,
      Tipo: t.tipo === 'receita' ? 'Receita' : 'Despesa',
      Categoria: nomeCategoria(t.categoria),
      Valor: t.valor / 100,
      Status: statusLabel(t.status),
      Observação: t.observacao || '',
    }));

    const ws = XLSX.utils.json_to_sheet(dados);
    const colWidths = [
      { wch: 12 }, { wch: 35 }, { wch: 10 }, { wch: 18 },
      { wch: 14 }, { wch: 12 }, { wch: 30 },
    ];
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Extrato');
    XLSX.writeFile(wb, `extrato_${filtro.mes}_${filtro.ano}.xlsx`);
    toast.success('Excel exportado com sucesso!');
  }, [ordenadas, filtro, nomeCategoria, statusLabel]);

  const gerarPDF = useCallback(() => {
    try {
      toast.loading('Gerando PDF...');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const ml = 20;
      const mr = 20;
      const cw = pageWidth - ml - mr;
      const primary: [number, number, number] = [37, 99, 235];
      const green: [number, number, number] = [22, 163, 74];
      const red: [number, number, number] = [220, 38, 38];
      const gray: [number, number, number] = [75, 85, 99];
      const bg: [number, number, number] = [241, 245, 249];

      let y = 20;

      const header = () => {
        pdf.setFillColor(...primary);
        pdf.rect(0, 0, pageWidth, 35, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(22);
        pdf.text('SmartWallet', ml, 16);
        pdf.setFontSize(10);
        pdf.text('Gestão Financeira', ml, 24);
        pdf.setFontSize(16);
        pdf.text('Extrato Mensal', pageWidth - ml, 16, { align: 'right' });
      };

      const footer = () => {
        pdf.setDrawColor(200, 200, 200);
        pdf.line(ml, 287, pageWidth - ml, 287);
        pdf.setTextColor(...gray);
        pdf.setFontSize(8);
        const agora = new Date();
        const d = `${String(agora.getDate()).padStart(2, '0')}/${String(agora.getMonth() + 1).padStart(2, '0')}/${agora.getFullYear()}`;
        const h = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
        pdf.text(`Gerado em ${d} às ${h}`, ml, 293);
      };

      header();
      y = 50;

      pdf.setTextColor(...gray);
      pdf.setFontSize(14);
      pdf.text(`Período: ${labelMes}`, pageWidth / 2, y, { align: 'center' });
      y += 12;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(ml, y, pageWidth - ml, y);
      y += 8;

      const bw = (cw - 16) / 3;
      const by = y;
      const bh = 22;

      const cards = [
        { label: 'Receitas', value: totalReceitas, color: green },
        { label: 'Despesas', value: totalDespesas, color: red },
        { label: 'Saldo', value: saldo, color: saldo >= 0 ? green : red },
      ];

      cards.forEach((item, i) => {
        const bx = ml + (bw + 8) * i;
        pdf.setFillColor(...bg);
        pdf.roundedRect(bx, by, bw, bh, 2, 2, 'F');
        pdf.setTextColor(...gray);
        pdf.setFontSize(9);
        pdf.text(item.label, bx + bw / 2, by + 8, { align: 'center' });
        pdf.setTextColor(...item.color);
        pdf.setFontSize(13);
        pdf.setFont('helvetica', 'bold');
        const v = (item.value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        pdf.text(v, bx + bw / 2, by + 18, { align: 'center' });
        pdf.setFont('helvetica', 'normal');
      });

      y = by + bh + 12;

      const rows = ordenadas.map((t) => [
        formatarDate(t.data),
        t.descricao,
        nomeCategoria(t.categoria),
        t.tipo === 'receita' ? 'Receita' : 'Despesa',
        (t.valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        statusLabel(t.status),
      ]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (pdf as any).autoTable({
        startY: y,
        margin: { left: ml, right: mr },
        tableWidth: cw,
        head: [['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor', 'Status']],
        body: rows,
        styles: { fontSize: 8, cellPadding: 3, lineColor: [220, 220, 220], lineWidth: 0.1, textColor: [55, 65, 81] },
        headStyles: { fillColor: primary, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9, halign: 'left' },
        columnStyles: {
          0: { cellWidth: 22 },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 28 },
          3: { cellWidth: 20 },
          4: { cellWidth: 28, halign: 'right' },
          5: { cellWidth: 20, halign: 'center' },
        },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        didParseCell: (cellData: any) => {
          if (cellData.section === 'body' && cellData.column.index === 4) {
            cellData.cell.styles.textColor = cellData.row.raw?.[3] === 'Receita' ? green : red;
          }
        },
        didDrawPage: () => footer(),
      });

      pdf.save(`extrato_${filtro.mes}_${filtro.ano}.pdf`);
      toast.dismiss();
      toast.success('PDF exportado com sucesso!');
    } catch {
      toast.dismiss();
      toast.error('Erro ao gerar PDF');
    }
  }, [filtro, ordenadas, labelMes, totalReceitas, totalDespesas, saldo, nomeCategoria, statusLabel]);

  const podeExportar = ordenadas.length > 0;

  return {
    transacoes: ordenadas,
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
  };
}
