import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SaudacaoUsuario } from '@/features/dashboard/views/components/SaudacaoUsuario'
import useUserInfo from '@/core/viewModels/useUserInfo'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'saudacao.boaNoite': 'Boa noite',
        'saudacao.bomDia': 'Bom dia',
        'saudacao.boaTarde': 'Boa tarde',
        'saudacao.data': 'Data',
        'saudacao.usuario': 'Usuário',
        'saudacao.subtitle': 'Bem-vindo ao SmartWallet',
      }
      return map[key] ?? key
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

vi.mock('@/core/viewModels/useUserInfo', () => ({
  default: vi.fn(() => ({
    userData: { nome: 'João Silva' },
    loading: false,
    error: null,
  })),
}))

describe('SaudacaoUsuario', () => {
  const defaultUserInfo = {
    userData: { nome: 'João Silva' },
    loading: false,
    error: null,
  }

  beforeEach(() => {
    vi.mocked(useUserInfo).mockImplementation(() => defaultUserInfo)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows greeting with user name', () => {
    vi.setSystemTime(new Date('2026-05-25T10:00:00'))
    render(<SaudacaoUsuario />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Bom dia, João!')
  })

  it('shows date', () => {
    vi.setSystemTime(new Date('2026-05-25T10:00:00'))
    render(<SaudacaoUsuario />)
    expect(screen.getByText(/segunda-feira/i)).toBeInTheDocument()
  })

  it('shows skeleton when loading', () => {
    vi.mocked(useUserInfo).mockReturnValue({
      userData: null,
      loading: true,
      error: null,
    })
    const { container } = render(<SaudacaoUsuario />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('shows correct greeting for evening', () => {
    vi.setSystemTime(new Date('2026-05-25T20:00:00'))
    render(<SaudacaoUsuario />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Boa noite, João!')
  })
})
