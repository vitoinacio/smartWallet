import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AcoesRapidas } from '@/features/dashboard/views/components/AcoesRapidas'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'acoesRapidas.addDespesa': 'Nova Despesa',
        'acoesRapidas.verFinancas': 'Ver Finanças',
        'acoesRapidas.configuracoes': 'Configurações',
        'acoesRapidas.title': 'Ações Rápidas',
      }
      return map[key] ?? key
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

describe('AcoesRapidas', () => {
  it('renders "Ações Rápidas" title', () => {
    render(
      <MemoryRouter>
        <AcoesRapidas />
      </MemoryRouter>
    )
    expect(screen.getByText('Ações Rápidas')).toBeInTheDocument()
  })

  it('renders "Nova Despesa" link', () => {
    render(
      <MemoryRouter>
        <AcoesRapidas />
      </MemoryRouter>
    )
    expect(screen.getByText('Nova Despesa')).toBeInTheDocument()
  })

  it('renders "Ver Finanças" link', () => {
    render(
      <MemoryRouter>
        <AcoesRapidas />
      </MemoryRouter>
    )
    expect(screen.getByText('Ver Finanças')).toBeInTheDocument()
  })

  it('renders "Configurações" link', () => {
    render(
      <MemoryRouter>
        <AcoesRapidas />
      </MemoryRouter>
    )
    expect(screen.getByText('Configurações')).toBeInTheDocument()
  })
})
