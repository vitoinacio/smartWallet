import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2, ArrowLeft, SkipForward } from 'lucide-react';

interface StepGoalProps {
  metaValor: number;
  metaPrazo: string;
  errorValor?: string;
  errorPrazo?: string;
  onMetaValorChange: (value: number) => void;
  onMetaPrazoChange: (value: string) => void;
  onFinish: () => void;
  onBack: () => void;
  onSkip: () => void;
  isSaving: boolean;
}

export function StepGoal({
  metaValor,
  metaPrazo,
  errorValor,
  errorPrazo,
  onMetaValorChange,
  onMetaPrazoChange,
  onFinish,
  onBack,
  onSkip,
  isSaving,
}: StepGoalProps) {
  const { t } = useTranslation('onboarding');
  const handleValorInput = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, '');
    onMetaValorChange(parseInt(numeric) / 100 || 0);
  };

  const displayValor = metaValor > 0
    ? `R$ ${metaValor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    : '';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t('goal.title')}</h2>
        <p className="text-muted-foreground">{t('goal.subtitle')}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaValor">{t('goal.valorLabel')}</Label>
        <Input
          id="metaValor"
          placeholder="R$ 0,00"
          value={displayValor}
          onChange={(e) => handleValorInput(e.target.value)}
          aria-invalid={!!errorValor}
        />
        {errorValor && <p className="text-sm text-destructive">{errorValor}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaPrazo">{t('goal.prazoLabel')}</Label>
        <Input
          id="metaPrazo"
          type="date"
          value={metaPrazo}
          onChange={(e) => onMetaPrazoChange(e.target.value)}
          aria-invalid={!!errorPrazo}
        />
        {errorPrazo && <p className="text-sm text-destructive">{errorPrazo}</p>}
      </div>

      <Separator />

      <div className="bg-muted/30 rounded-lg p-4 text-sm space-y-1">
        <p className="text-muted-foreground">
          {t('goal.skipHint')}
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('goal.voltar')}
        </Button>
        <Button variant="outline" onClick={onSkip} className="flex-1">
          <SkipForward className="w-4 h-4 mr-2" />
          {t('goal.skip')}
        </Button>
        <Button onClick={onFinish} className="flex-1" disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {t('goal.finish')}
        </Button>
      </div>
    </div>
  );
}
