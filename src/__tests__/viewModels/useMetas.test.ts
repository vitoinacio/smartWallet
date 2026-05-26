import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useMetas } from '@/features/metas/viewModels/useMetas'

vi.mock('@/components/ui/sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}))

vi.mock('@/features/dashboard/viewModels', () => ({
  useEntrada: () => ({ entrada: { valor: '500000' } }),
}))

const STORAGE_KEY = 'smartwallet_metas'

describe('useMetas', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('returns empty metas array and isLoading true on mount', () => {
    const { result } = renderHook(() => useMetas())
    expect(Array.isArray(result.current.metas)).toBe(true)
    expect(result.current.metas).toHaveLength(0)
    expect(result.current.isLoading).toBe(true)
  })

  it('loads metas from localStorage and sets isLoading false after mount', async () => {
    const { result } = renderHook(() => useMetas())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.metas).toHaveLength(0)
    expect(result.current.error).toBeNull()
  })

  it('criarMeta adds a new savings goal', async () => {
    const { result } = renderHook(() => useMetas())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => {
      result.current.criarMeta({
        nome: 'Viagem para Europa',
        valorAlvo: 50000,
        tipo: 'anual',
        categoria: 'lazer',
      })
    })
    expect(result.current.metas).toHaveLength(1)
    expect(result.current.metas[0].nome).toBe('Viagem para Europa')
    expect(result.current.metas[0].valorAlvo).toBe(50000)
  })

  it('criarMeta generates proper ID with meta- prefix', async () => {
    const { result } = renderHook(() => useMetas())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => {
      result.current.criarMeta({
        nome: 'Reserva de Emergência',
        valorAlvo: 30000,
        tipo: 'anual',
      })
    })
    expect(result.current.metas[0].id).toMatch(/^meta-/)
  })

  it('criarMeta sets tipo mensal correctly', async () => {
    const { result } = renderHook(() => useMetas())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => {
      result.current.criarMeta({
        nome: 'Economia mensal',
        valorAlvo: 2000,
        tipo: 'mensal',
      })
    })
    expect(result.current.metas[0].tipo).toBe('mensal')
  })

  it('criarMeta sets tipo anual correctly', async () => {
    const { result } = renderHook(() => useMetas())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => {
      result.current.criarMeta({
        nome: 'Reserva anual',
        valorAlvo: 24000,
        tipo: 'anual',
      })
    })
    expect(result.current.metas[0].tipo).toBe('anual')
  })

  it('excluirMeta removes a goal', async () => {
    const { result } = renderHook(() => useMetas())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => {
      result.current.criarMeta({
        nome: 'Fundo de Investimento',
        valorAlvo: 100000,
        tipo: 'anual',
      })
    })
    const id = result.current.metas[0].id
    act(() => {
      result.current.excluirMeta(id)
    })
    expect(result.current.metas).toHaveLength(0)
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored).toHaveLength(0)
  })

  it('adicionarProgresso adds to valorAtual', async () => {
    const { result } = renderHook(() => useMetas())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => {
      result.current.criarMeta({
        nome: 'Novo Notebook',
        valorAlvo: 8000,
        tipo: 'anual',
      })
    })
    const id = result.current.metas[0].id
    act(() => {
      result.current.adicionarProgresso(id, 3000)
    })
    expect(result.current.metas[0].valorAtual).toBe(3000)
    expect(result.current.progressos[0].percentual).toBe(37.5)
  })

  it('adicionarProgresso allows adding beyond target value', async () => {
    const { result } = renderHook(() => useMetas())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => {
      result.current.criarMeta({
        nome: 'Poupança',
        valorAlvo: 5000,
        tipo: 'anual',
      })
    })
    const id = result.current.metas[0].id
    act(() => {
      result.current.adicionarProgresso(id, 7000)
    })
    expect(result.current.metas[0].valorAtual).toBe(7000)
    expect(result.current.progressos[0].percentual).toBeGreaterThan(100)
  })

  it('atualizarMeta updates meta fields', async () => {
    const { result } = renderHook(() => useMetas())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => {
      result.current.criarMeta({
        nome: 'Curso',
        valorAlvo: 3000,
        tipo: 'anual',
      })
    })
    const id = result.current.metas[0].id
    act(() => {
      result.current.atualizarMeta(id, { nome: 'Curso Online' })
    })
    expect(result.current.metas[0].nome).toBe('Curso Online')
    expect(result.current.metas[0].valorAlvo).toBe(3000)
  })

  it('estenderMeta changes target amount', async () => {
    const { result } = renderHook(() => useMetas())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => {
      result.current.criarMeta({
        nome: 'Aposentadoria',
        valorAlvo: 50000,
        tipo: 'anual',
      })
    })
    const id = result.current.metas[0].id
    act(() => {
      result.current.estenderMeta(id, 100000)
    })
    expect(result.current.metas[0].valorAlvo).toBe(100000)
  })
})
