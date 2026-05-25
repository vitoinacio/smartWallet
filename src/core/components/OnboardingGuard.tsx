import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isComplete } from '@/features/onboarding/services/onboarding.service';

interface OnboardingGuardProps {
  children: ReactNode;
}

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const onboardingDone = isComplete();

  if (!onboardingDone) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}
