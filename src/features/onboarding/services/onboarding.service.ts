import { OnboardingData, ONBOARDING_DEFAULT } from '../models/OnboardingTypes';

const STORAGE_KEY = 'smartwallet_onboarding';

export function save(data: OnboardingData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function load(): OnboardingData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function clear(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function isComplete(): boolean {
  const data = load();
  return data?.completo === true;
}

export function markComplete(data: OnboardingData): OnboardingData {
  const completed = { ...data, completo: true, updatedAt: new Date().toISOString() };
  save(completed);
  return completed;
}

export function getDefault(): OnboardingData {
  return { ...ONBOARDING_DEFAULT };
}
