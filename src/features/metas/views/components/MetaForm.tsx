import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatedBrl } from '@/core/utils/formatedBrl';
import { Plus, Target } from 'lucide-react';

interface MetaFormProps {
  sugestaoValor: number;
  onCriar: (dados: {
    nome: string;
    valorAlvo: number;
    tipo: 'mensal' | 'anual';
    categoria?: string;
  }) => void;
}

const CATEGORIAS_SUGESTAO = [
  { id: 'reserva', nome: 'Reserva de Emergência' },
  { id: 'viagem', nome: 'Viagem' },
  { id: 'investimento', nome: 'Investimento' },
  { id: 'educacao', nome: 'Educação' },
  { id: 'saude', nome: 'Saúde' },
  { id: 'lazer', nome: 'Lazer' },
  { id: 'outros', nome: 'Outros' },
];

export function MetaForm({ sugestaoValor, onCriar }: MetaFormProps) {
  const { t } = useTranslation('metas');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nome, setNome] = useState('');
  const [valorAlvo, setValorAlvo] = useState('');
  const [tipo, setTipo] = useState<'mensal' | 'anual'>('mensal');
  const [categoria, setCategoria] = useState('');

  const formatValorMeta = useCallback((value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue
      ? (parseInt(numericValue) / 100).toFixed(2).replace('.', ',')
      : '';
  }, []);

  const centavosParaMask = useCallback((centavos: number) => {
    if (centavos <= 0) return '';
    return (centavos / 100).toFixed(2).replace('.', ',');
  }, []);

  const maskParaCentavos = useCallback((masked: string) => {
    return parseInt(masked.replace(/\D/g, '')) || 0;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const centavos = maskParaCentavos(valorAlvo);
    if (!nome || centavos <= 0) return;

    onCriar({
      nome,
      valorAlvo: centavos,
      tipo,
      categoria: categoria || undefined,
    });

    setNome('');
    setValorAlvo('');
    setTipo('mensal');
    setCategoria('');
    setMostrarForm(false);
  };

  const usarSugestao = () => {
    setValorAlvo(centavosParaMask(sugestaoValor));
  };

  if (!mostrarForm) {
    return (
      <Button
        onClick={() => setMostrarForm(true)}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        {t('form.novaMeta')}
      </Button>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5" />
          {t('form.definir')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meta-nome">{t('form.nome')}</Label>
            <Input
              id="meta-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder={t('form.nomePlaceholder')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meta-valor">{t('form.valorAlvo')} (R$)</Label>
              <div className="flex gap-2">
                <Input
                  id="meta-valor"
                  type="text"
                  inputMode="numeric"
                  value={valorAlvo}
                  onChange={(e) => setValorAlvo(formatValorMeta(e.target.value))}
                  placeholder="0,00"
                  className="flex-1"
                />
                {sugestaoValor > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0 text-xs"
                    onClick={usarSugestao}
                    title={t('form.sugestao')}
                  >
                    10%
                  </Button>
                )}
              </div>
              {sugestaoValor > 0 && (
                <p className="text-xs text-muted-foreground">
                  {t('form.sugestao')}: R$ {formatedBrl(sugestaoValor.toString())} (10% da renda)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta-tipo">{t('form.tipo')}</Label>
              <Select
                value={tipo}
                onValueChange={(v) => setTipo(v as 'mensal' | 'anual')}
              >
                <SelectTrigger id="meta-tipo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensal">{t('form.mensal')}</SelectItem>
                  <SelectItem value="anual">{t('form.anual')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta-categoria">{t('form.categoria')} (opcional)</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger id="meta-categoria">
                <SelectValue placeholder={t('form.selecione')} />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIAS_SUGESTAO.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={!nome || maskParaCentavos(valorAlvo) <= 0}
            >
              {t('form.criar')}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setMostrarForm(false);
                setNome('');
                setValorAlvo('');
              }}
            >
              {t('form.cancelar')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
