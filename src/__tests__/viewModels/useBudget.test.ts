import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useBudget } from '@/features/financeiro/viewModels/useBudget'
import { Transacao } from '@/features/financeiro/models'

vi.mock('@/components/ui/sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn() },
}))

const mesAtual = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
const BUDGET_KEY = 'smartwallet_budgets'

function transacao(overrides?: Partial<Transacao>): Transacao {
  return {
    id: 1,
    descricao: 'Despesa',
    valor: 100,
    tipo: 'despesa',
    categoria: 'alimentacao',
    data: `${mesAtual}-15`,
    status: 'pago',
    notificar: false,
    ...overrides,
  }
}

describe('useBudget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('retorna budgets vazio e progressos vazio no estado inicial', () => {
    const { result } = renderHook(() => useBudget([]))

    expect(result.current.budgets).toEqual([])
    expect(result.current.progressos).toEqual([])
    expect(result.current.categoriasDisponiveis.length).toBeGreaterThan(0)
  })

  it('adicionarBudget cria um novo orçamento', async () => {
    const { result } = renderHook(() => useBudget([]))

    await act(async () => {
      result.current.adicionarBudget('alimentacao', 1000)
    })

    expect(result.current.budgets).toHaveLength(1)
    expect(result.current.budgets[0].categoria).toBe('alimentacao')
    expect(result.current.budgets[0].limite).toBe(1000)
  })

  it('adicionarBudget persiste dados no localStorage', async () => {
    const { result } = renderHook(() => useBudget([]))

    await act(async () => {
      result.current.adicionarBudget('transporte', 500)
    })

    const stored = JSON.parse(localStorage.getItem(BUDGET_KEY) || '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0].categoria).toBe('transporte')
    expect(stored[0].limite).toBe(500)
  })

  it('adicionarBudget atualiza orçamento existente para mesma categoria/mês', async () => {
    const { result } = renderHook(() => useBudget([]))

    await act(async () => {
      result.current.adicionarBudget('alimentacao', 800)
    })
    expect(result.current.budgets[0].limite).toBe(800)

    await act(async () => {
      result.current.adicionarBudget('alimentacao', 1200)
    })
    expect(result.current.budgets).toHaveLength(1)
    expect(result.current.budgets[0].limite).toBe(1200)
  })

  it('removerBudget exclui orçamento', async () => {
    const { result } = renderHook(() => useBudget([]))

    await act(async () => {
      result.current.adicionarBudget('alimentacao', 600)
      result.current.adicionarBudget('transporte', 300)
    })
    expect(result.current.budgets).toHaveLength(2)

    await act(async () => {
      result.current.removerBudget('alimentacao')
    })
    expect(result.current.budgets).toHaveLength(1)
    expect(result.current.budgets[0].categoria).toBe('transporte')
  })

  it('removerBudget persiste exclusão no localStorage', async () => {
    const { result } = renderHook(() => useBudget([]))

    await act(async () => {
      result.current.adicionarBudget('moradia', 2000)
    })
    expect(JSON.parse(localStorage.getItem(BUDGET_KEY) || '[]')).toHaveLength(1)

    await act(async () => {
      result.current.removerBudget('moradia')
    })
    expect(JSON.parse(localStorage.getItem(BUDGET_KEY) || '[]')).toHaveLength(0)
  })

  it('calcula progresso do orçamento corretamente (gasto vs limite)', async () => {
    const transacoes: Transacao[] = [
      transacao({ id: 1, categoria: 'alimentacao', valor: 200 }),
      transacao({ id: 2, categoria: 'alimentacao', valor: 150 }),
      transacao({ id: 3, categoria: 'transporte', valor: 100 }),
    ]

    const { result } = renderHook(() => useBudget(transacoes))

    await act(async () => {
      result.current.adicionarBudget('alimentacao', 500)
    })

    const progresso = result.current.progressos.find((p) => p.categoria === 'alimentacao')
    expect(progresso).toBeDefined()
    expect(progresso!.gasto).toBe(350)
    expect(progresso!.limite).toBe(500)
    expect(progresso!.percentual).toBe(70)
    expect(progresso!.status).toBe('ok')
  })

  it('altera status para warning quando gasto atinge 80% e excedido em 100%', async () => {
    const transacoes: Transacao[] = [
      transacao({ id: 1, categoria: 'lazer', valor: 90 }),
    ]

    const { result } = renderHook(() => useBudget(transacoes))

    await act(async () => {
      result.current.adicionarBudget('lazer', 100)
    })

    expect(result.current.progressos[0].percentual).toBe(90)
    expect(result.current.progressos[0].status).toBe('warning')
  })

  it('categoriasDisponiveis exclui categorias de receita', () => {
    const { result } = renderHook(() => useBudget([]))

    const ids = result.current.categoriasDisponiveis.map((c) => c.id)
    expect(ids).not.toContain('salario')
    expect(ids).not.toContain('investimento')
    expect(ids).not.toContain('freelance')
    expect(ids).not.toContain('outros_receita')
    expect(ids).toContain('alimentacao')
    expect(ids).toContain('transporte')
  })
})
