import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useResumo } from '@/features/financeiro/viewModels/useResumo'
import { Transacao } from '@/features/financeiro/models'

const createTransacao = (overrides: Partial<Transacao>): Transacao => ({
  id: 1,
  descricao: 'Test',
  valor: 100,
  tipo: 'despesa',
  categoria: 'contas',
  data: '2024-01-15',
  status: 'pago',
  notificar: false,
  ...overrides,
})

describe('useResumo', () => {
  it('should calculate total receitas correctly', () => {
    const transacoes: Transacao[] = [
      createTransacao({ id: 1, tipo: 'receita', valor: 5000, status: 'pago' }),
      createTransacao({ id: 2, tipo: 'receita', valor: 2000, status: 'pago' }),
    ]

    const { result } = renderHook(() => useResumo(transacoes))

    expect(result.current.totalReceitas).toBe(7000)
  })

  it('should calculate total despesas correctly', () => {
    const transacoes: Transacao[] = [
      createTransacao({ id: 1, tipo: 'despesa', valor: 1500, status: 'pago' }),
      createTransacao({ id: 2, tipo: 'despesa', valor: 500, status: 'pago' }),
    ]

    const { result } = renderHook(() => useResumo(transacoes))

    expect(result.current.totalDespesas).toBe(2000)
  })

  it('should calculate saldo correctly', () => {
    const transacoes: Transacao[] = [
      createTransacao({ id: 1, tipo: 'receita', valor: 5000, status: 'pago' }),
      createTransacao({ id: 2, tipo: 'despesa', valor: 2000, status: 'pago' }),
    ]

    const { result } = renderHook(() => useResumo(transacoes))

    expect(result.current.saldo).toBe(3000)
  })

  it('should count pending transactions', () => {
    const transacoes: Transacao[] = [
      createTransacao({ id: 1, tipo: 'despesa', status: 'pago' }),
      createTransacao({ id: 2, tipo: 'despesa', status: 'pendente' }),
      createTransacao({ id: 3, tipo: 'despesa', status: 'pendente' }),
      createTransacao({ id: 4, tipo: 'receita', status: 'pendente' }),
    ]

    const { result } = renderHook(() => useResumo(transacoes))

    expect(result.current.transacoesPendentes).toBe(2)
  })

  it('should count overdue transactions', () => {
    const transacoes: Transacao[] = [
      createTransacao({ id: 1, tipo: 'despesa', status: 'pago' }),
      createTransacao({ id: 2, tipo: 'despesa', status: 'vencido' }),
      createTransacao({ id: 3, tipo: 'despesa', status: 'vencido' }),
      createTransacao({ id: 4, tipo: 'despesa', status: 'vencido' }),
    ]

    const { result } = renderHook(() => useResumo(transacoes))

    expect(result.current.transacoesVencidas).toBe(3)
  })

  it('should handle empty transactions array', () => {
    const { result } = renderHook(() => useResumo([]))

    expect(result.current.totalReceitas).toBe(0)
    expect(result.current.totalDespesas).toBe(0)
    expect(result.current.saldo).toBe(0)
    expect(result.current.transacoesPendentes).toBe(0)
    expect(result.current.transacoesVencidas).toBe(0)
  })

  it('should ignore unpaid receitas for total', () => {
    const transacoes: Transacao[] = [
      createTransacao({ id: 1, tipo: 'receita', valor: 5000, status: 'pago' }),
      createTransacao({ id: 2, tipo: 'receita', valor: 1000, status: 'pendente' }),
    ]

    const { result } = renderHook(() => useResumo(transacoes))

    expect(result.current.totalReceitas).toBe(5000)
  })
})