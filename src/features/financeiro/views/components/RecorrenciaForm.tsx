import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { TEMPLATES_RECURRENCIA } from '@/features/financeiro/models';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { Plus, Sparkles } from 'lucide-react';

interface RecorrenciaFormProps {
  onCriar: (data: {
    descricao: string;
    valor: number;
    tipo: 'receita' | 'despesa';
    categoria: string;
    frequencia: 'semanal' | 'mensal' | 'trimestral' | 'anual';
    diaVencimento: number;
    dataInicio: string;
    observacao?: string;
    notificar: boolean;
  }) => void;
}

export function RecorrenciaForm({ onCriar }: RecorrenciaFormProps) {
  const { t } = useTranslation('financeiro');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarTemplates, setMostrarTemplates] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('despesa');
  const [categoria, setCategoria] = useState('');
  const [frequencia, setFrequencia] = useState<'semanal' | 'mensal' | 'trimestral' | 'anual'>('mensal');
  const [diaVencimento, setDiaVencimento] = useState('1');
  const [dataInicio, setDataInicio] = useState(new Date().toISOString().split('T')[0]);
  const [notificar, setNotificar] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao || !valor) return;

    onCriar({
      descricao,
      valor: parseFloat(valor.replace(',', '.')),
      tipo,
      categoria,
      frequencia,
      diaVencimento: parseInt(diaVencimento),
      dataInicio,
      notificar,
    });

    setDescricao('');
    setValor('');
    setCategoria('');
    setMostrarForm(false);
  };

  const usarTemplate = (template: (typeof TEMPLATES_RECURRENCIA)[number]) => {
    setDescricao(template.nome);
    setValor(template.valorSugerido.toString());
    setCategoria(template.categoria);
    setFrequencia(template.frequencia);
    setDiaVencimento(template.diaVencimento.toString());
    setMostrarTemplates(false);
    setMostrarForm(true);
  };

  if (!mostrarForm && !mostrarTemplates) {
    return (
      <div className="flex gap-2">
        <Button onClick={() => setMostrarForm(true)} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          {t('recorrencia.nova')}
        </Button>
        <Button onClick={() => setMostrarTemplates(true)} variant="ghost" size="sm">
          <Sparkles className="w-4 h-4 mr-2" />
          {t('recorrencia.usarTemplate')}
        </Button>
      </div>
    );
  }

  if (mostrarTemplates) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            {t('recorrencia.templates')}
            <Button variant="ghost" size="sm" onClick={() => setMostrarTemplates(false)}>
              {t('recorrencia.cancelar')}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {TEMPLATES_RECURRENCIA.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => usarTemplate(tmpl)}
                className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-accent transition-colors text-left"
              >
                <span className="text-2xl">{tmpl.icone === 'MonitorPlay' ? '📺' : tmpl.icone === 'Music' ? '🎵' : tmpl.icone === 'Home' ? '🏠' : tmpl.icone === 'Building' ? '🏢' : tmpl.icone === 'Wifi' ? '📡' : tmpl.icone === 'Zap' ? '⚡' : tmpl.icone === 'Droplets' ? '💧' : tmpl.icone === 'Heart' ? '❤️' : tmpl.icone === 'Dumbbell' ? '💪' : tmpl.icone === 'Briefcase' ? '💼' : '📋'}</span>
                <span className="text-sm font-medium">{tmpl.nome}</span>
                <span className="text-xs text-muted-foreground">R$ {formatedBrl(tmpl.valorSugerido.toString())}/{tmpl.frequencia === 'mensal' ? t('recorrencia.mensal').toLowerCase() : tmpl.frequencia === 'anual' ? t('recorrencia.anual').toLowerCase() : tmpl.frequencia === 'trimestral' ? t('recorrencia.trimestral').toLowerCase() : t('recorrencia.semanal').toLowerCase()}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t('recorrencia.nova')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('recorrencia.descricao')}</Label>
              <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder={t('recorrencia.descricaoPlaceholder')} />
            </div>
            <div className="space-y-2">
              <Label>{t('recorrencia.valor')}</Label>
              <Input type="number" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0,00" min="0" step="0.01" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t('recorrencia.tipo')}</Label>
              <Select value={tipo} onValueChange={(v) => setTipo(v as 'receita' | 'despesa')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="despesa">{t('recorrencia.despesa')}</SelectItem>
                  <SelectItem value="receita">{t('recorrencia.receita')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('recorrencia.frequencia')}</Label>
              <Select value={frequencia} onValueChange={(v) => setFrequencia(v as 'semanal' | 'mensal' | 'trimestral' | 'anual')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="semanal">{t('recorrencia.semanal')}</SelectItem>
                  <SelectItem value="mensal">{t('recorrencia.mensal')}</SelectItem>
                  <SelectItem value="trimestral">{t('recorrencia.trimestral')}</SelectItem>
                  <SelectItem value="anual">{t('recorrencia.anual')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('recorrencia.diaVencimento')}</Label>
              <Input type="number" value={diaVencimento} onChange={(e) => setDiaVencimento(e.target.value)} min="1" max="31" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('recorrencia.dataInicio')}</Label>
              <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-2">
                <Checkbox id="notificar" checked={notificar} onCheckedChange={(v) => setNotificar(v as boolean)} />
                <Label htmlFor="notificar">{t('recorrencia.notificar')}</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={!descricao || !valor}>
              {t('recorrencia.criar')}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setMostrarForm(false)}>
              {t('recorrencia.cancelar')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
