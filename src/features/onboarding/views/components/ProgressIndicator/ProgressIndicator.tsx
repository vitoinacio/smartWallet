import { useTranslation } from 'react-i18next';
import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const { t } = useTranslation('onboarding');
  const percent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <Progress value={percent} className="h-2" />
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={index}
            className={`text-xs font-medium transition-colors ${
              index <= currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {t(`stepLabels.${index}`)}
          </span>
        ))}
      </div>
    </div>
  );
}
