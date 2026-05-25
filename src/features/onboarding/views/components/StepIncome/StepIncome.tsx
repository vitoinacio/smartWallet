import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { SkipForward, ArrowLeft } from 'lucide-react';

interface StepIncomeProps {
  rendaMensal: number;
  categoriasInteresse: string[];
  errorRenda?: string;
  errorCategorias?: string;
  onRendaChange: (value: number) => void;
  onCategoriasChange: (value: string[]) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export function StepIncome({
  rendaMensal,
  categoriasInteresse,
  errorRenda,
  errorCategorias,
  onRendaChange,
  onCategoriasChange,
  onNext,
  onSkip,
  onBack,
}: StepIncomeProps) {
  const { t } = useTranslation('onboarding');

  const CATEGORIAS = [
    { id: 'salario', nome: t('income.categoriaSalario') },
    { id: 'freelance', nome: t('income.categoriaFreelance') },
    { id: 'investimento', nome: t('income.categoriaInvestimentos') },
    { id: 'alimentacao', nome: t('income.categoriaAlimentacao') },
    { id: 'transporte', nome: t('income.categoriaTransporte') },
    { id: 'moradia', nome: t('income.categoriaMoradia') },
    { id: 'lazer', nome: t('income.categoriaLazer') },
    { id: 'saude', nome: t('income.categoriaSaude') },
    { id: 'educacao', nome: t('income.categoriaEducacao') },
    { id: 'contas', nome: t('income.categoriaContasFixas') },
  ];

  const toggleCategoria = (id: string) => {
    if (categoriasInteresse.includes(id)) {
      onCategoriasChange(categoriasInteresse.filter((c) => c !== id));
    } else {
      onCategoriasChange([...categoriasInteresse, id]);
    }
  };

  const handleRendaInput = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, '');
    onRendaChange(parseInt(numeric) / 100 || 0);
  };

  const displayRenda = rendaMensal > 0
    ? `R$ ${rendaMensal.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    : '';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t('income.title')}</h2>
        <p className="text-muted-foreground">{t('income.subtitle')}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="renda">{t('income.rendaLabel')}</Label>
        <Input
          id="renda"
          placeholder="R$ 0,00"
          value={displayRenda}
          onChange={(e) => handleRendaInput(e.target.value)}
          aria-invalid={!!errorRenda}
        />
        {errorRenda && <p className="text-sm text-destructive">{errorRenda}</p>}
      </div>

      <Separator />

      <div className="space-y-3">
        <Label>{t('income.categoriasLabel')}</Label>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIAS.map((cat) => (
            <label
              key={cat.id}
              className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                categoriasInteresse.includes(cat.id)
                  ? 'border-primary bg-primary/5'
                  : 'hover:bg-muted/50'
              }`}
            >
              <Checkbox
                checked={categoriasInteresse.includes(cat.id)}
                onCheckedChange={() => toggleCategoria(cat.id)}
              />
              <span className="text-sm font-medium">{cat.nome}</span>
            </label>
          ))}
        </div>
        {errorCategorias && <p className="text-sm text-destructive">{errorCategorias}</p>}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('income.voltar')}
        </Button>
        <Button variant="outline" onClick={onSkip} className="flex-1">
          <SkipForward className="w-4 h-4 mr-2" />
          {t('income.skip')}
        </Button>
        <Button onClick={onNext} className="flex-1">
          {t('income.continue')}
        </Button>
      </div>
    </div>
  );
}
