import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useEntrada } from '@/features/dashboard/viewModels/useEntrada'

vi.mock('@/core/utils/isTestUser', () => ({
  isTestUser: () => true,
}))

vi.mock('@/components/ui/sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const MOCK_ENTRADA_KEY = 'smartwallet_mock_entrada'

describe('useEntrada', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('loads default valor 0 from mockService on mount', async () => {
    const { result } = renderHook(() => useEntrada())
    await waitFor(() => {
      expect(result.current.entrada.valor).toBe('0')
    })
  })

  it('initially isLoading is false and isEditing is false', () => {
    const { result } = renderHook(() => useEntrada())
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isEditing).toBe(false)
  })

  it('loads entrada from mockService on mount', async () => {
    localStorage.setItem(MOCK_ENTRADA_KEY, '5000')
    const { result } = renderHook(() => useEntrada())
    await waitFor(() => {
      expect(result.current.entrada.valor).toBe('5000')
    })
  })

  it('setEntrada updates the state', () => {
    const { result } = renderHook(() => useEntrada())
    act(() => {
      result.current.setEntrada('7500')
    })
    expect(result.current.entrada.valor).toBe('7500')
  })

  it('atualizarEntrada persists to localStorage and updates state', async () => {
    const { result } = renderHook(() => useEntrada())
    const { toast } = await import('@/components/ui/sonner')

    await act(async () => {
      await result.current.atualizarEntrada('8500')
    })

    expect(result.current.entrada.valor).toBe('8500')
    expect(localStorage.getItem(MOCK_ENTRADA_KEY)).toBe('8500')
    expect(toast.success).toHaveBeenCalledWith('Entrada atualizada com sucesso!')
  })

  it('atualizarEntrada with empty/whitespace string does nothing', async () => {
    const { result } = renderHook(() => useEntrada())
    const { toast } = await import('@/components/ui/sonner')

    await act(async () => {
      await result.current.atualizarEntrada('   ')
    })

    expect(result.current.entrada.valor).toBe('0')
    expect(toast.success).not.toHaveBeenCalled()
  })

  it('atualizarEntrada sets isEditing to false after save', async () => {
    const { result } = renderHook(() => useEntrada())

    act(() => {
      result.current.iniciarEdicao()
    })
    expect(result.current.isEditing).toBe(true)

    await act(async () => {
      await result.current.atualizarEntrada('3000')
    })
    expect(result.current.isEditing).toBe(false)
  })

  it('iniciarEdicao sets isEditing to true', () => {
    const { result } = renderHook(() => useEntrada())
    act(() => {
      result.current.iniciarEdicao()
    })
    expect(result.current.isEditing).toBe(true)
  })

  it('cancelarEdicao sets isEditing to false', () => {
    const { result } = renderHook(() => useEntrada())
    act(() => {
      result.current.iniciarEdicao()
      result.current.cancelarEdicao()
    })
    expect(result.current.isEditing).toBe(false)
  })

  it('buscarEntrada reloads entrada from storage', async () => {
    const { result } = renderHook(() => useEntrada())

    localStorage.setItem(MOCK_ENTRADA_KEY, '12345')
    await act(async () => {
      await result.current.buscarEntrada()
    })

    expect(result.current.entrada.valor).toBe('12345')
  })

  it('getRendaMensal equivalent - saved value persists across setEntrada calls', () => {
    const { result } = renderHook(() => useEntrada())

    act(() => {
      result.current.setEntrada('2000')
    })
    expect(result.current.entrada.valor).toBe('2000')

    act(() => {
      result.current.setEntrada('3500')
    })
    expect(result.current.entrada.valor).toBe('3500')
  })
})
