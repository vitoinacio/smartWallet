import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSignupPage } from '@/features/auth/viewModels/useSignupPage'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'cadastro.camposObrigatorios': 'Todos os campos são obrigatórios.',
        'cadastro.aceitarTermosToast': 'Por favor, aceite os termos.',
        'cadastro.sucesso': 'Cadastro realizado com sucesso!',
        'cadastro.erro': 'Erro ao criar o usuário. Tente novamente.',
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

describe('useSignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initial form state has all fields empty', () => {
    const { result } = renderHook(() => useSignupPage())
    expect(result.current.nome).toBe('')
    expect(result.current.email).toBe('')
    expect(result.current.senha).toBe('')
    expect(result.current.sexo).toBe('')
    expect(result.current.dataNasc).toBe('')
    expect(result.current.isTermsAccepted).toBe(false)
    expect(result.current.errorMessage).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  it('setNome updates nome field', () => {
    const { result } = renderHook(() => useSignupPage())
    act(() => { result.current.setNome('João Silva') })
    expect(result.current.nome).toBe('João Silva')
  })

  it('setEmail updates email field', () => {
    const { result } = renderHook(() => useSignupPage())
    act(() => { result.current.setEmail('joao@email.com') })
    expect(result.current.email).toBe('joao@email.com')
  })

  it('setSenha updates senha field', () => {
    const { result } = renderHook(() => useSignupPage())
    act(() => { result.current.setSenha('123456') })
    expect(result.current.senha).toBe('123456')
  })

  it('setSexo updates sexo field', () => {
    const { result } = renderHook(() => useSignupPage())
    act(() => { result.current.setSexo('Masculino') })
    expect(result.current.sexo).toBe('Masculino')
  })

  it('setDataNasc updates dataNasc field', () => {
    const { result } = renderHook(() => useSignupPage())
    act(() => { result.current.setDataNasc('1990-01-01') })
    expect(result.current.dataNasc).toBe('1990-01-01')
  })

  it('setIsTermsAccepted updates isTermsAccepted', () => {
    const { result } = renderHook(() => useSignupPage())
    act(() => { result.current.setIsTermsAccepted(true) })
    expect(result.current.isTermsAccepted).toBe(true)
  })

  it('signup with empty name shows error toast', async () => {
    const { result } = renderHook(() => useSignupPage())
    const { toast } = await import('@/components/ui/sonner')
    act(() => {
      result.current.setEmail('joao@email.com')
      result.current.setSenha('123456')
      result.current.setSexo('Masculino')
      result.current.setDataNasc('1990-01-01')
    })
    await act(async () => {
      await result.current.handleSubmit()
    })
    expect(toast.error).toHaveBeenCalledWith('Todos os campos são obrigatórios.')
  })

  it('signup without accepting terms shows error toast', async () => {
    const { result } = renderHook(() => useSignupPage())
    const { toast } = await import('@/components/ui/sonner')
    act(() => {
      result.current.setNome('João Silva')
      result.current.setEmail('joao@email.com')
      result.current.setSenha('123456')
      result.current.setSexo('Masculino')
      result.current.setDataNasc('1990-01-01')
    })
    await act(async () => {
      await result.current.handleSubmit()
    })
    expect(toast.error).toHaveBeenCalledWith('Por favor, aceite os termos.')
  })

  it('signup with all fields filled calls toast.success and navigates', async () => {
    const { result } = renderHook(() => useSignupPage())
    const { toast } = await import('@/components/ui/sonner')
    act(() => {
      result.current.setNome('João Silva')
      result.current.setEmail('joao@email.com')
      result.current.setSenha('123456')
      result.current.setSexo('Masculino')
      result.current.setDataNasc('1990-01-01')
      result.current.setIsTermsAccepted(true)
    })
    await act(async () => {
      await result.current.handleSubmit()
    })
    expect(toast.success).toHaveBeenCalledWith('Cadastro realizado com sucesso!')
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })
})
