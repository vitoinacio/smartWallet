import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/sonner';
import { ZodError } from 'zod';
import { OnboardingData, OnboardingStep, ONBOARDING_DEFAULT, STEP_WELCOME_SCHEMA, STEP_INCOME_SCHEMA, STEP_GOAL_SCHEMA } from '../models/OnboardingTypes';
import * as onboardingService from '../services/onboarding.service';

interface StepErrors {
  nome?: string;
  rendaMensal?: string;
  categoriasInteresse?: string;
  metaValor?: string;
  metaPrazo?: string;
}

export function useOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(0);
  const [formData, setFormData] = useState<OnboardingData>(ONBOARDING_DEFAULT);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation('onboarding');
  const [errors, setErrors] = useState<StepErrors>({});
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const saved = onboardingService.load();
    if (saved) {
      if (saved.completo) {
        navigate('/dashboard', { replace: true });
        return;
      }
      setFormData(saved);
      if (saved.avatar) {
        setAvatarPreview(saved.avatar);
      }
    }
    setIsLoading(false);
  }, [navigate]);

  const updateField = useCallback(<K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      onboardingService.save(updated);
      return updated;
    });
  }, []);

  const updateMeta = useCallback(<K extends keyof OnboardingData['metaEconomia']>(field: K, value: OnboardingData['metaEconomia'][K]) => {
    setFormData((prev) => {
      const updated = { ...prev, metaEconomia: { ...prev.metaEconomia, [field]: value } };
      onboardingService.save(updated);
      return updated;
    });
  }, []);

  const handleAvatarChange = useCallback((file: File | null) => {
    if (!file) {
      setAvatarPreview(null);
      updateField('avatar', null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (!mountedRef.current) return;
      if (typeof reader.result === 'string') {
        setAvatarPreview(reader.result);
        updateField('avatar', reader.result);
      }
    };
    reader.readAsDataURL(file);
  }, [updateField]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 2) as OnboardingStep);
    setErrors({});
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0) as OnboardingStep);
    setErrors({});
  }, []);

  const goToStep = useCallback((step: OnboardingStep) => {
    setCurrentStep(step);
    setErrors({});
  }, []);

  const validateCurrentStep = useCallback((): boolean => {
    const newErrors: StepErrors = {};
    try {
      if (currentStep === 0) {
        STEP_WELCOME_SCHEMA.parse({ nome: formData.nome });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        err.issues.forEach((issue) => {
          if (issue.path[0] === 'nome') newErrors.nome = issue.message;
        });
      }
    }
    try {
      if (currentStep === 1) {
        STEP_INCOME_SCHEMA.parse({ rendaMensal: formData.rendaMensal, categoriasInteresse: formData.categoriasInteresse });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        err.issues.forEach((issue) => {
          if (issue.path[0] === 'rendaMensal') newErrors.rendaMensal = issue.message;
          if (issue.path[0] === 'categoriasInteresse') newErrors.categoriasInteresse = issue.message;
        });
      }
    }
    try {
      if (currentStep === 2) {
        STEP_GOAL_SCHEMA.parse({ metaValor: formData.metaEconomia.valor, metaPrazo: formData.metaEconomia.prazo });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        err.issues.forEach((issue) => {
          if (issue.path[0] === 'metaValor') newErrors.metaValor = issue.message;
          if (issue.path[0] === 'metaPrazo') newErrors.metaPrazo = issue.message;
        });
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStep, formData]);

  const finishOnboarding = useCallback(async () => {
    if (!validateCurrentStep()) return;
    setIsSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      onboardingService.markComplete(formData);
      toast.success(t('toast.complete'));
      navigate('/dashboard', { replace: true });
    } catch {
      toast.error(t('toast.error'));
    } finally {
      setIsSaving(false);
    }
  }, [formData, navigate, validateCurrentStep, t]);

  const skip = useCallback(() => {
    if (currentStep < 2) {
      nextStep();
    } else {
      finishOnboarding();
    }
  }, [currentStep, nextStep, finishOnboarding]);

  const handleNext = useCallback(() => {
    if (currentStep === 0 && !formData.nome.trim()) {
      nextStep();
      return;
    }
    if (validateCurrentStep()) {
      nextStep();
    }
  }, [currentStep, formData.nome, nextStep, validateCurrentStep]);

  return {
    currentStep,
    formData,
    avatarPreview,
    isSaving,
    isLoading,
    errors,
    setFormData: updateField,
    setMeta: updateMeta,
    onAvatarChange: handleAvatarChange,
    nextStep: handleNext,
    prevStep,
    goToStep,
    onSkip: skip,
    onFinish: finishOnboarding,
  };
}
