import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLoginPage } from '@/features/auth/viewModels/useLoginPage'
import type { FormEvent } from 'react'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'login.preenchaCampos': 'Preencha todos os campos!',
        'login.emailInvalido': 'Por favor, insira um e-mail válido.',
        'login.sucesso': 'Login realizado com sucesso!',
        'login.erro': 'Erro ao tentar fazer login',
      }
      return map[key] ?? key
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

vi.mock('@/components/ui/sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const createMockEvent = () => ({ preventDefault: vi.fn() }) as unknown as FormEvent

describe('useLoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initial state has empty email and senha', () => {
    const { result } = renderHook(() => useLoginPage())
    expect(result.current.email).toBe('')
    expect(result.current.senha).toBe('')
  })

  it('setEmail updates the email field', () => {
    const { result } = renderHook(() => useLoginPage())
    act(() => { result.current.setEmail('teste@test.com') })
    expect(result.current.email).toBe('teste@test.com')
  })

  it('setSenha updates the senha field', () => {
    const { result } = renderHook(() => useLoginPage())
    act(() => { result.current.setSenha('123456') })
    expect(result.current.senha).toBe('123456')
  })

  it('login with empty email shows error toast', async () => {
    const { result } = renderHook(() => useLoginPage())
    const { toast } = await import('@/components/ui/sonner')
    await act(async () => {
      await result.current.handleSubmit(createMockEvent())
    })
    expect(toast.error).toHaveBeenCalledWith('Preencha todos os campos!')
  })

  it('login with invalid email format shows error toast', async () => {
    const { result } = renderHook(() => useLoginPage())
    const { toast } = await import('@/components/ui/sonner')
    act(() => {
      result.current.setEmail('invalid-email')
      result.current.setSenha('123456')
    })
    await act(async () => {
      await result.current.handleSubmit(createMockEvent())
    })
    expect(toast.error).toHaveBeenCalledWith('Por favor, insira um e-mail válido.')
  })

  it('login with valid credentials calls toast.success and navigates', async () => {
    const { result } = renderHook(() => useLoginPage())
    const { toast } = await import('@/components/ui/sonner')
    act(() => {
      result.current.setEmail('teste@gmail.com')
      result.current.setSenha('teste123')
    })
    await act(async () => {
      await result.current.handleSubmit(createMockEvent())
    })
    expect(toast.success).toHaveBeenCalledWith('Login realizado com sucesso!')
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })

  it('login with invalid credentials shows error toast', async () => {
    const { result } = renderHook(() => useLoginPage())
    const { toast } = await import('@/components/ui/sonner')
    act(() => {
      result.current.setEmail('wrong@email.com')
      result.current.setSenha('wrongpass')
    })
    await act(async () => {
      await result.current.handleSubmit(createMockEvent())
    })
    expect(toast.error).toHaveBeenCalled()
  })
})
