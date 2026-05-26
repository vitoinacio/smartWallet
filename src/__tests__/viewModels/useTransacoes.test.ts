import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useTransacoes } from '@/features/financeiro/viewModels/useTransacoes'
import { Transacao, TransacaoFormData } from '@/features/financeiro/models'

vi.mock('@/core/utils/isTestUser', () => ({
  isTestUser: () => true,
}))

vi.mock('@/components/ui/sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const { mockGetTransacoes, mockCriarTransacao, mockExcluirTransacao } = vi.hoisted(() => ({
  mockGetTransacoes: vi.fn(),
  mockCriarTransacao: vi.fn(),
  mockExcluirTransacao: vi.fn(),
}))

vi.mock('@/mocks/transacoes', () => ({
  mockService: {
    getTransacoes: mockGetTransacoes,
    criarTransacao: mockCriarTransacao,
    excluirTransacao: mockExcluirTransacao,
  },
}))

function makeTransacao(overrides?: Partial<Transacao>): Transacao {
  return {
    id: 1,
    descricao: 'Test',
    valor: 100,
    tipo: 'despesa',
    categoria: 'contas',
    data: '2024-01-15',
    status: 'pago',
    notificar: false,
    ...overrides,
  }
}

function makeFormData(overrides?: Partial<TransacaoFormData>): TransacaoFormData {
  return {
    descricao: 'Nova despesa',
    valor: '200',
    tipo: 'despesa',
    categoria: 'alimentacao',
    data: '2024-02-01',
    observacao: '',
    notificar: false,
    ...overrides,
  }
}

let transacoesData: Transacao[] = []

describe('useTransacoes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    transacoesData = []

    mockGetTransacoes.mockImplementation(() => transacoesData)
    mockCriarTransacao.mockImplementation((data: Omit<Transacao, 'id'>): Transacao => {
      const maxId = transacoesData.length > 0 ? Math.max(...transacoesData.map((t) => t.id)) : 0
      const nova: Transacao = { ...data, id: maxId + 1 }
      transacoesData = [...transacoesData, nova]
      return nova
    })
    mockExcluirTransacao.mockImplementation((id: number): boolean => {
      const prev = transacoesData.length
      transacoesData = transacoesData.filter((t) => t.id !== id)
      return transacoesData.length < prev
    })
  })

  it('starts with empty transacoes, false isLoading, null error', () => {
    const { result } = renderHook(() => useTransacoes())

    expect(result.current.transacoes).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('loads transactions via buscarTransacoes on mount', async () => {
    transacoesData = [
      makeTransacao({ id: 1, descricao: 'Aluguel', valor: 1800 }),
      makeTransacao({ id: 2, descricao: 'Internet', valor: 120 }),
    ]

    const { result } = renderHook(() => useTransacoes())

    await waitFor(() => {
      expect(result.current.transacoes).toHaveLength(2)
    })
    expect(result.current.transacoes[0].descricao).toBe('Aluguel')
    expect(result.current.transacoes[1].descricao).toBe('Internet')
  })

  it('adiciona uma transacao via criarTransacao', async () => {
    const { result } = renderHook(() => useTransacoes())
    const { toast } = await import('@/components/ui/sonner')

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      await result.current.criarTransacao(makeFormData({ descricao: 'Supermercado', valor: '350' }))
    })

    expect(result.current.transacoes).toHaveLength(1)
    expect(result.current.transacoes[0].descricao).toBe('Supermercado')
    expect(toast.success).toHaveBeenCalledWith('Transação adicionada com sucesso!')
  })

  it('gera IDs únicos ao criar múltiplas transações', async () => {
    transacoesData = [makeTransacao({ id: 5, descricao: 'Existente' })]

    const { result } = renderHook(() => useTransacoes())

    await waitFor(() => expect(result.current.transacoes).toHaveLength(1))

    await act(async () => {
      await result.current.criarTransacao(makeFormData({ descricao: 'Nova 1' }))
    })

    const ids = result.current.transacoes.map((t) => t.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
    expect(ids).toContain(6)
  })

  it('remove transação via excluirTransacao', async () => {
    transacoesData = [
      makeTransacao({ id: 1, descricao: 'Aluguel' }),
      makeTransacao({ id: 2, descricao: 'Internet' }),
    ]

    const { result } = renderHook(() => useTransacoes())
    const { toast } = await import('@/components/ui/sonner')

    await waitFor(() => expect(result.current.transacoes).toHaveLength(2))

    await act(async () => {
      await result.current.excluirTransacao(1)
    })

    expect(result.current.transacoes).toHaveLength(1)
    expect(result.current.transacoes[0].id).toBe(2)
    expect(toast.success).toHaveBeenCalledWith('Transação excluída com sucesso!')
  })

  it('excluirTransacao com ID inexistente mantém transacoes inalteradas', async () => {
    transacoesData = [makeTransacao({ id: 1, descricao: 'Aluguel' })]

    const { result } = renderHook(() => useTransacoes())

    await waitFor(() => expect(result.current.transacoes).toHaveLength(1))

    await act(async () => {
      await result.current.excluirTransacao(999)
    })

    expect(result.current.transacoes).toHaveLength(1)
  })

  it('isLoading retorna false após a montagem inicial', async () => {
    const { result } = renderHook(() => useTransacoes())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('define error ao falhar criarTransacao', async () => {
    mockCriarTransacao.mockImplementation(() => {
      throw new Error('Falha simulada')
    })

    const { result } = renderHook(() => useTransacoes())
    const { toast } = await import('@/components/ui/sonner')

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      await result.current.criarTransacao(makeFormData())
    })

    expect(result.current.error).toBe('Erro ao adicionar transação')
    expect(toast.error).toHaveBeenCalledWith('Erro ao adicionar transação')
  })

  it('dispara toast.error ao falhar buscarTransacoes', async () => {
    mockGetTransacoes.mockImplementation(() => {
      throw new Error('Falha no mock')
    })

    const { result } = renderHook(() => useTransacoes())
    const { toast } = await import('@/components/ui/sonner')

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro ao buscar transações')
    })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.transacoes).toEqual([])
  })

  it('buscarTransacoes recarrega transacoes após alterações', async () => {
    const { result } = renderHook(() => useTransacoes())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      await result.current.criarTransacao(makeFormData({ descricao: 'Compra A' }))
    })
    expect(result.current.transacoes).toHaveLength(1)

    await act(async () => {
      await result.current.buscarTransacoes()
    })
    expect(result.current.transacoes).toHaveLength(1)

    transacoesData.push(makeTransacao({ id: 99, descricao: 'Adicionado externamente', valor: 500 }))
    await act(async () => {
      await result.current.buscarTransacoes()
    })
    expect(result.current.transacoes).toHaveLength(2)
  })
})
