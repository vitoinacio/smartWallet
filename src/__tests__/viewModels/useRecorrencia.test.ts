import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRecorrencia } from '@/features/financeiro/viewModels/useRecorrencia'

vi.mock('@/components/ui/sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const REC_KEY = 'smartwallet_recorrencias'
const INST_KEY = 'smartwallet_instancias_recorrencia'

describe('useRecorrencia', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('returns empty recorrencias array on mount', () => {
    const { result } = renderHook(() => useRecorrencia())
    expect(Array.isArray(result.current.recorrencias)).toBe(true)
    expect(result.current.recorrencias).toHaveLength(0)
  })

  it('criarRecorrencia adds a new recurrence', () => {
    const { result } = renderHook(() => useRecorrencia())
    act(() => {
      result.current.criarRecorrencia({
        descricao: 'Netflix',
        valor: 39.90,
        tipo: 'despesa',
        categoria: 'lazer',
        frequencia: 'mensal',
        diaVencimento: 15,
        dataInicio: '2020-01-01',
        notificar: false,
      })
    })
    expect(result.current.recorrencias).toHaveLength(1)
    expect(result.current.recorrencias[0].descricao).toBe('Netflix')
    expect(result.current.recorrencias[0].valor).toBe(39.90)
  })

  it('criarRecorrencia generates proper ID with rec- prefix', () => {
    const { result } = renderHook(() => useRecorrencia())
    act(() => {
      result.current.criarRecorrencia({
        descricao: 'Salário',
        valor: 5000,
        tipo: 'receita',
        categoria: 'salario',
        frequencia: 'mensal',
        diaVencimento: 1,
        dataInicio: '2020-01-01',
        notificar: false,
      })
    })
    expect(result.current.recorrencias[0].id).toMatch(/^rec-/)
  })

  it('excluirRecorrencia removes a recurrence and its instances', () => {
    const { result } = renderHook(() => useRecorrencia())
    act(() => {
      result.current.criarRecorrencia({
        descricao: 'Aluguel',
        valor: 1500,
        tipo: 'despesa',
        categoria: 'moradia',
        frequencia: 'mensal',
        diaVencimento: 5,
        dataInicio: '2020-01-01',
        notificar: true,
      })
    })
    const id = result.current.recorrencias[0].id
    act(() => {
      result.current.excluirRecorrencia(id)
    })
    expect(result.current.recorrencias).toHaveLength(0)
  })

  it('toggleRecorrencia flips active state', () => {
    const { result } = renderHook(() => useRecorrencia())
    act(() => {
      result.current.criarRecorrencia({
        descricao: 'Internet',
        valor: 120,
        tipo: 'despesa',
        categoria: 'contas',
        frequencia: 'mensal',
        diaVencimento: 10,
        dataInicio: '2020-01-01',
        notificar: true,
      })
    })
    const id = result.current.recorrencias[0].id
    expect(result.current.recorrencias[0].ativa).toBe(true)
    act(() => {
      result.current.toggleRecorrencia(id)
    })
    expect(result.current.recorrencias[0].ativa).toBe(false)
    act(() => {
      result.current.toggleRecorrencia(id)
    })
    expect(result.current.recorrencias[0].ativa).toBe(true)
  })

  it('loads templates from TEMPLATES_RECURRENCIA', () => {
    const { result } = renderHook(() => useRecorrencia())
    expect(Array.isArray(result.current.templates)).toBe(true)
    expect(result.current.templates.length).toBeGreaterThan(0)
    expect(result.current.templates[0]).toHaveProperty('id')
    expect(result.current.templates[0]).toHaveProperty('nome')
    expect(result.current.templates[0]).toHaveProperty('valorSugerido')
    expect(result.current.templates[0]).toHaveProperty('frequencia')
  })

  it('generates instances for active recurrences on create', () => {
    const { result } = renderHook(() => useRecorrencia())
    act(() => {
      result.current.criarRecorrencia({
        descricao: 'Salário',
        valor: 5000,
        tipo: 'receita',
        categoria: 'salario',
        frequencia: 'mensal',
        diaVencimento: 1,
        dataInicio: '2020-01-01',
        notificar: false,
      })
    })
    expect(result.current.instancias.length).toBeGreaterThanOrEqual(1)
  })

  it('persists recurrence to localStorage', () => {
    const { result } = renderHook(() => useRecorrencia())
    act(() => {
      result.current.criarRecorrencia({
        descricao: 'Academia',
        valor: 100,
        tipo: 'despesa',
        categoria: 'saude',
        frequencia: 'mensal',
        diaVencimento: 1,
        dataInicio: '2024-01-01',
        notificar: false,
      })
    })
    const stored = JSON.parse(localStorage.getItem(REC_KEY)!)
    expect(stored).toHaveLength(1)
    expect(stored[0].descricao).toBe('Academia')
  })

  it('excluirRecorrencia removes related instances from localStorage', () => {
    const { result } = renderHook(() => useRecorrencia())
    act(() => {
      result.current.criarRecorrencia({
        descricao: 'Curso',
        valor: 297,
        tipo: 'despesa',
        categoria: 'educacao',
        frequencia: 'mensal',
        diaVencimento: 3,
        dataInicio: '2020-01-01',
        notificar: false,
      })
    })
    const id = result.current.recorrencias[0].id
    expect(JSON.parse(localStorage.getItem(INST_KEY)!).length).toBeGreaterThanOrEqual(1)
    act(() => {
      result.current.excluirRecorrencia(id)
    })
    const storedInsts = JSON.parse(localStorage.getItem(INST_KEY)!)
    expect(storedInsts.every((i: { recorrenciaId: string }) => i.recorrenciaId !== id)).toBe(true)
  })
})
