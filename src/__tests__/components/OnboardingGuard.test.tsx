import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { OnboardingGuard } from '@/core/components/OnboardingGuard'

describe('OnboardingGuard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  function renderGuard() {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<OnboardingGuard><span>Onboarding Content</span></OnboardingGuard>}
          />
          <Route path="/onboarding" element={<span>Redirected</span>} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('renders children when onboarding is complete', () => {
    localStorage.setItem('smartwallet_onboarding', JSON.stringify({ completo: true }))

    renderGuard()

    expect(screen.getByText('Onboarding Content')).toBeInTheDocument()
    expect(screen.queryByText('Redirected')).not.toBeInTheDocument()
  })

  it('redirects to /onboarding when onboarding is NOT complete', () => {
    localStorage.setItem('smartwallet_onboarding', JSON.stringify({ completo: false }))

    renderGuard()

    expect(screen.getByText('Redirected')).toBeInTheDocument()
    expect(screen.queryByText('Onboarding Content')).not.toBeInTheDocument()
  })

  it('redirects to /onboarding when localStorage has no onboarding data', () => {
    renderGuard()

    expect(screen.getByText('Redirected')).toBeInTheDocument()
    expect(screen.queryByText('Onboarding Content')).not.toBeInTheDocument()
  })
})
