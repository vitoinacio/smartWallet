import { useOnboarding } from '../viewModels/useOnboarding';
import { ProgressIndicator } from './components/ProgressIndicator';
import { StepWelcome } from './components/StepWelcome';
import { StepIncome } from './components/StepIncome';
import { StepGoal } from './components/StepGoal';
import { Loader2 } from 'lucide-react';

function OnboardingPage() {
  const {
    currentStep,
    formData,
    avatarPreview,
    isSaving,
    isLoading,
    errors,
    setFormData,
    setMeta,
    onAvatarChange,
    nextStep,
    prevStep,
    onSkip,
    onFinish,
  } = useOnboarding();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800 p-4">
      <div className="w-full max-w-lg">
        <div className="bg-card rounded-2xl shadow-lg border p-8">
          <ProgressIndicator currentStep={currentStep} totalSteps={3} />

          <div className="min-h-[320px]">
            {currentStep === 0 && (
              <StepWelcome
                nome={formData.nome}
                avatarPreview={avatarPreview}
                error={errors.nome}
                onNomeChange={(value) => setFormData('nome', value)}
                onAvatarChange={onAvatarChange}
                onNext={nextStep}
                onSkip={onSkip}
              />
            )}

            {currentStep === 1 && (
              <StepIncome
                rendaMensal={formData.rendaMensal}
                categoriasInteresse={formData.categoriasInteresse}
                errorRenda={errors.rendaMensal}
                errorCategorias={errors.categoriasInteresse}
                onRendaChange={(value) => setFormData('rendaMensal', value)}
                onCategoriasChange={(value) => setFormData('categoriasInteresse', value)}
                onNext={() => nextStep()}
                onSkip={onSkip}
                onBack={prevStep}
              />
            )}

            {currentStep === 2 && (
              <StepGoal
                metaValor={formData.metaEconomia.valor}
                metaPrazo={formData.metaEconomia.prazo}
                errorValor={errors.metaValor}
                errorPrazo={errors.metaPrazo}
                onMetaValorChange={(value) => setMeta('valor', value)}
                onMetaPrazoChange={(value) => setMeta('prazo', value)}
                onFinish={onFinish}
                onBack={prevStep}
                onSkip={onSkip}
                isSaving={isSaving}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;
