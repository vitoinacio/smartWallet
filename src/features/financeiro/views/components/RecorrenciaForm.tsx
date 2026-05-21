import { useState } from 'react';
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
          Nova Recorrência
        </Button>
        <Button onClick={() => setMostrarTemplates(true)} variant="ghost" size="sm">
          <Sparkles className="w-4 h-4 mr-2" />
          Usar Template
        </Button>
      </div>
    );
  }

  if (mostrarTemplates) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            Templates de Recorrência
            <Button variant="ghost" size="sm" onClick={() => setMostrarTemplates(false)}>
              Cancelar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {TEMPLATES_RECURRENCIA.map((t) => (
              <button
                key={t.id}
                onClick={() => usarTemplate(t)}
                className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-accent transition-colors text-left"
              >
                <span className="text-2xl">{t.icone === 'MonitorPlay' ? '📺' : t.icone === 'Music' ? '🎵' : t.icone === 'Home' ? '🏠' : t.icone === 'Building' ? '🏢' : t.icone === 'Wifi' ? '📡' : t.icone === 'Zap' ? '⚡' : t.icone === 'Droplets' ? '💧' : t.icone === 'Heart' ? '❤️' : t.icone === 'Dumbbell' ? '💪' : t.icone === 'Briefcase' ? '💼' : '📋'}</span>
                <span className="text-sm font-medium">{t.nome}</span>
                <span className="text-xs text-muted-foreground">R$ {formatedBrl(t.valorSugerido.toString())}/{t.frequencia === 'mensal' ? 'mês' : t.frequencia === 'anual' ? 'ano' : t.frequencia === 'trimestral' ? 'trim' : 'sem'}</span>
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
        <CardTitle className="text-lg">Nova Recorrência</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Netflix" />
            </div>
            <div className="space-y-2">
              <Label>Valor (R$)</Label>
              <Input type="number" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0,00" min="0" step="0.01" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={(v) => setTipo(v as 'receita' | 'despesa')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="despesa">Despesa</SelectItem>
                  <SelectItem value="receita">Receita</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Frequência</Label>
              <Select value={frequencia} onValueChange={(v) => setFrequencia(v as 'semanal' | 'mensal' | 'trimestral' | 'anual')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Dia Vencimento</Label>
              <Input type="number" value={diaVencimento} onChange={(e) => setDiaVencimento(e.target.value)} min="1" max="31" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data Início</Label>
              <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-2">
                <Checkbox id="notificar" checked={notificar} onCheckedChange={(v) => setNotificar(v as boolean)} />
                <Label htmlFor="notificar">Notificar antes do vencimento</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={!descricao || !valor}>
              Criar Recorrência
            </Button>
            <Button type="button" variant="ghost" onClick={() => setMostrarForm(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
