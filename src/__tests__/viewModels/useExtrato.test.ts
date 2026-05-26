import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useExtrato } from '@/features/extrato/viewModels/useExtrato'
import type { Transacao } from '@/features/financeiro/models'

vi.mock('@/components/ui/sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), loading: vi.fn(), dismiss: vi.fn() },
}))

vi.mock('jspdf', () => {
  const mockPdf = {
    text: vi.fn().mockReturnThis(),
    setFontSize: vi.fn().mockReturnThis(),
    setFont: vi.fn().mockReturnThis(),
    setTextColor: vi.fn().mockReturnThis(),
    setFillColor: vi.fn().mockReturnThis(),
    setDrawColor: vi.fn().mockReturnThis(),
    rect: vi.fn().mockReturnThis(),
    roundedRect: vi.fn().mockReturnThis(),
    line: vi.fn().mockReturnThis(),
    save: vi.fn(),
    addPage: vi.fn(),
    internal: { pageSize: { width: 210, height: 297 } },
    autoTable: vi.fn(),
  }
  return { default: vi.fn(() => mockPdf) }
})

vi.mock('jspdf-autotable', () => ({
  applyPlugin: vi.fn(),
}))

vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: vi.fn(() => ({})),
    book_new: vi.fn(() => ({})),
    book_append_sheet: vi.fn(),
  },
  writeFile: vi.fn(),
}))

const STORAGE_KEY = 'smartwallet_mock_transacoes'

function createTransacao(overrides: Partial<Transacao> = {}): Transacao {
  return {
    id: 1,
    descricao: 'Transacao Teste',
    valor: 10000,
    tipo: 'receita',
    categoria: 'salario',
    data: '2026-05-15',
    status: 'pago',
    notificar: false,
    ...overrides,
  }
}

function seedLocalStorage(transacoes: Transacao[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transacoes))
}

describe('useExtrato', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-15'))
    localStorage.clear()
    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL: vi.fn(() => 'blob:mock'),
      revokeObjectURL: vi.fn(),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initial state has mes/ano set to current month', () => {
    const { result } = renderHook(() => useExtrato())
    expect(result.current.filtro.mes).toBe(5)
    expect(result.current.filtro.ano).toBe(2026)
  })

  it('alterarMes updates the mes filter', () => {
    seedLocalStorage([createTransacao()])
    const { result } = renderHook(() => useExtrato())
    act(() => result.current.alterarMes(6))
    expect(result.current.filtro.mes).toBe(6)
  })

  it('alterarAno updates the ano filter', () => {
    seedLocalStorage([createTransacao()])
    const { result } = renderHook(() => useExtrato())
    act(() => result.current.alterarAno(2027))
    expect(result.current.filtro.ano).toBe(2027)
  })

  it('transacoes filters by mes correctly', () => {
    const t1 = createTransacao({ id: 1, data: '2026-05-10' })
    const t2 = createTransacao({ id: 2, data: '2026-06-15', tipo: 'despesa' })
    seedLocalStorage([t1, t2])
    const { result } = renderHook(() => useExtrato())
    expect(result.current.transacoes).toHaveLength(1)
    expect(result.current.transacoes[0].id).toBe(1)
  })

  it('transacoes filters by ano correctly', () => {
    const t1 = createTransacao({ id: 1, data: '2026-05-10' })
    const t2 = createTransacao({ id: 2, data: '2025-05-15', tipo: 'despesa' })
    seedLocalStorage([t1, t2])
    const { result } = renderHook(() => useExtrato())
    expect(result.current.transacoes).toHaveLength(1)
    expect(result.current.transacoes[0].id).toBe(1)
  })

  it('totalReceitas sums receitas correctly', () => {
    const t1 = createTransacao({ id: 1, valor: 50000, tipo: 'receita' })
    const t2 = createTransacao({ id: 2, valor: 30000, tipo: 'receita' })
    const t3 = createTransacao({ id: 3, valor: 20000, tipo: 'despesa' })
    seedLocalStorage([t1, t2, t3])
    const { result } = renderHook(() => useExtrato())
    expect(result.current.totalReceitas).toBe(80000)
  })

  it('totalDespesas sums despesas correctly', () => {
    const t1 = createTransacao({ id: 1, valor: 15000, tipo: 'despesa' })
    const t2 = createTransacao({ id: 2, valor: 25000, tipo: 'despesa' })
    const t3 = createTransacao({ id: 3, valor: 100000, tipo: 'receita' })
    seedLocalStorage([t1, t2, t3])
    const { result } = renderHook(() => useExtrato())
    expect(result.current.totalDespesas).toBe(40000)
  })

  it('saldo equals totalReceitas - totalDespesas', () => {
    const t1 = createTransacao({ id: 1, valor: 100000, tipo: 'receita' })
    const t2 = createTransacao({ id: 2, valor: 30000, tipo: 'despesa' })
    seedLocalStorage([t1, t2])
    const { result } = renderHook(() => useExtrato())
    expect(result.current.saldo).toBe(70000)
  })

  it('empty state when no transactions in period', () => {
    seedLocalStorage([createTransacao({ data: '2025-01-01' })])
    const { result } = renderHook(() => useExtrato())
    expect(result.current.transacoes).toHaveLength(0)
    expect(result.current.totalReceitas).toBe(0)
    expect(result.current.totalDespesas).toBe(0)
    expect(result.current.saldo).toBe(0)
    expect(result.current.podeExportar).toBe(false)
  })

  it('podeExportar reflects transaction presence', () => {
    seedLocalStorage([createTransacao()])
    const { result } = renderHook(() => useExtrato())
    expect(result.current.podeExportar).toBe(true)
  })

  it('gerarCSV generates CSV and triggers download without throwing', () => {
    seedLocalStorage([createTransacao()])
    const { result } = renderHook(() => useExtrato())
    expect(() => act(() => result.current.gerarCSV())).not.toThrow()
  })

  it('gerarPDF generates PDF and triggers download without throwing', async () => {
    seedLocalStorage([createTransacao()])
    const { result } = renderHook(() => useExtrato())
    await expect(act(async () => result.current.gerarPDF())).resolves.not.toThrow()
  })
})
