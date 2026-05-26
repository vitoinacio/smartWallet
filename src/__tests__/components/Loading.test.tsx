import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loading from '@/core/components/Loading'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = { loading: 'Carregando...' }
      return map[key] ?? key
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

describe('Loading', () => {
  it('renders Loader2 icon', () => {
    render(<Loading />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders message text when provided', () => {
    render(<Loading message="Aguarde..." />)
    expect(screen.getByText('Aguarde...')).toBeInTheDocument()
  })

  it('renders with default size', () => {
    render(<Loading />)
    const spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toHaveAttribute('width', '60')
    expect(spinner).toHaveAttribute('height', '60')
  })

  it('applies custom className', () => {
    const { container } = render(<Loading className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
