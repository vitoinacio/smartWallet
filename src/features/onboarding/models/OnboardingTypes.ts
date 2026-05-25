import { z } from 'zod';

export type OnboardingStep = 0 | 1 | 2;

export interface OnboardingData {
  nome: string;
  avatar: string | null;
  rendaMensal: number;
  categoriasInteresse: string[];
  metaEconomia: {
    valor: number;
    prazo: string;
  };
  completo: boolean;
  updatedAt: string;
}

export const STEP_WELCOME_SCHEMA = z.object({
  nome: z.string().min(2, 'Nome precisa ter ao menos 2 caracteres'),
});

export const STEP_INCOME_SCHEMA = z.object({
  rendaMensal: z.number().positive('Informe sua renda mensal'),
  categoriasInteresse: z.array(z.string()).min(1, 'Selecione ao menos uma categoria'),
});

export const STEP_GOAL_SCHEMA = z.object({
  metaValor: z.number().positive('Defina um valor para sua meta'),
  metaPrazo: z.string().min(1, 'Informe um prazo'),
});

export const ONBOARDING_DEFAULT: OnboardingData = {
  nome: '',
  avatar: null,
  rendaMensal: 0,
  categoriasInteresse: [],
  metaEconomia: { valor: 0, prazo: '' },
  completo: false,
  updatedAt: new Date().toISOString(),
};

export const STEP_LABELS = ['Boas-vindas', 'Renda', 'Meta'];
