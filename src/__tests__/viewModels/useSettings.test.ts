import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSettings } from '@/features/dashboard/viewModels/useSettings'

const mockHandleTheme = vi.hoisted(() => vi.fn())

const defaultUserData = vi.hoisted(() => ({
  id: 1,
  nome: 'Usuário Teste',
  email: 'user@test.com',
  sexo: 'M',
  datanasc: '1990-01-01',
  senha: '123456',
  cpf: null,
  tel: null,
  cep: null,
  cidade: null,
  bairro: null,
  rua: null,
  numerocasa: null,
  foto: null,
  dtcriacao: '2026-01-01',
  twofa: false,
}))

const mockUseUserInfo = vi.hoisted(() => vi.fn(() => ({
  userData: null,
  loading: false,
})))

vi.mock('@/core/viewModels/useTheme', () => ({
  default: () => ({ theme: 'light', handleTheme: mockHandleTheme }),
}))

vi.mock('@/core/viewModels/useUserInfo', () => ({
  default: () => mockUseUserInfo(),
}))

vi.mock('@/components/ui/sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn(), loading: vi.fn(), dismiss: vi.fn() },
}))

const SETTINGS_KEY = 'app_settings'

describe('useSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    mockUseUserInfo.mockReturnValue({ userData: null, loading: false })
  })

  it('initial appSettings have default values', () => {
    const { result } = renderHook(() => useSettings())
    expect(result.current.appSettings).toEqual({
      tema: 'light',
      notificacoes: true,
      emailConfirmacao: true,
      lembrarLogin: false,
    })
  })

  it('activeTab defaults to perfil', () => {
    const { result } = renderHook(() => useSettings())
    expect(result.current.activeTab).toBe('perfil')
  })

  it('setActiveTab changes the active tab', () => {
    const { result } = renderHook(() => useSettings())
    act(() => result.current.setActiveTab('seguranca'))
    expect(result.current.activeTab).toBe('seguranca')
  })

  it('updateAppSettings modifies a single setting and persists to localStorage', () => {
    const { result } = renderHook(() => useSettings())
    act(() => result.current.updateAppSettings('notificacoes', false))
    expect(result.current.appSettings.notificacoes).toBe(false)
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY)!)
    expect(saved.notificacoes).toBe(false)
  })

  it('updateAppSettings tema calls handleTheme when value differs', () => {
    const { result } = renderHook(() => useSettings())
    act(() => result.current.updateAppSettings('tema', 'dark'))
    expect(mockHandleTheme).toHaveBeenCalledTimes(1)
  })

  it('updateAppSettings tema does not call handleTheme when same value', () => {
    const { result } = renderHook(() => useSettings())
    act(() => result.current.updateAppSettings('tema', 'light'))
    expect(mockHandleTheme).not.toHaveBeenCalled()
  })

  it('loads saved settings from localStorage on mount', () => {
    const saved = { tema: 'dark', notificacoes: false, emailConfirmacao: false, lembrarLogin: true }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(saved))
    const { result } = renderHook(() => useSettings())
    expect(result.current.appSettings).toEqual(saved)
  })

  it('loads saved settings and calls handleTheme if tema differs on mount', () => {
    const saved = { tema: 'dark', notificacoes: true, emailConfirmacao: true, lembrarLogin: false }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(saved))
    renderHook(() => useSettings())
    expect(mockHandleTheme).toHaveBeenCalled()
  })

  it('returns userData and loading from useUserInfo', () => {
    mockUseUserInfo.mockReturnValue({ userData: defaultUserData, loading: false })
    const { result } = renderHook(() => useSettings())
    expect(result.current.userData).toEqual(defaultUserData)
    expect(result.current.loadingUser).toBe(false)
  })
})
