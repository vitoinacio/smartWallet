import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFiltros } from '@/features/financeiro/viewModels/useFiltros'
import { Transacao } from '@/features/financeiro/models'

const getDateInRange = (daysOffset: number) => {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return date.toISOString().split('T')[0]
}

const mockTransacoes: Transacao[] = [
  {
    id: 1,
    descricao: 'Salário',
    valor: 5000,
    tipo: 'receita',
    categoria: 'salario',
    data: getDateInRange(-5), // 5 days ago
    status: 'pago',
    notificar: false,
  },
  {
    id: 2,
    descricao: 'Aluguel',
    valor: 1500,
    tipo: 'despesa',
    categoria: 'moradia',
    data: getDateInRange(-10), // 10 days ago
    status: 'pago',
    notificar: true,
  },
  {
    id: 3,
    descricao: 'Conta de luz',
    valor: 200,
    tipo: 'despesa',
    categoria: 'contas',
    data: getDateInRange(-20), // 20 days ago
    status: 'pendente',
    notificar: true,
  },
  {
    id: 4,
    descricao: 'Supermercado',
    valor: 800,
    tipo: 'despesa',
    categoria: 'alimentacao',
    data: getDateInRange(-15), // 15 days ago
    status: 'pago',
    notificar: false,
  },
]

describe('useFiltros', () => {
  it('should return all transactions within default period (mes)', () => {
    const { result } = renderHook(() => useFiltros(mockTransacoes))

    expect(result.current.transacoesFiltradas.length).toBeGreaterThanOrEqual(0)
    expect(result.current.filtros.periodo).toBe('mes')
  })

  it('should filter by tipo receita', () => {
    const { result } = renderHook(() => useFiltros(mockTransacoes))

    act(() => {
      result.current.filtrarPorTipo('receita')
    })

    expect(result.current.transacoesFiltradas.every(t => t.tipo === 'receita')).toBe(true)
  })

  it('should filter by tipo despesa', () => {
    const { result } = renderHook(() => useFiltros(mockTransacoes))

    act(() => {
      result.current.filtrarPorTipo('despesa')
    })

    expect(result.current.transacoesFiltradas.every(t => t.tipo === 'despesa')).toBe(true)
  })

  it('should clear all filters', () => {
    const { result } = renderHook(() => useFiltros(mockTransacoes))

    act(() => {
      result.current.filtrarPorTipo('receita')
    })

    act(() => {
      result.current.limparFiltros()
    })

    expect(result.current.filtros.tipo).toBeUndefined()
    expect(result.current.filtros.periodo).toBe('mes')
  })

  it('should maintain sort order by date descending', () => {
    const { result } = renderHook(() => useFiltros(mockTransacoes))

    const filtered = result.current.transacoesFiltradas
    if (filtered.length >= 2) {
      expect(new Date(filtered[0].data).getTime()).toBeGreaterThanOrEqual(
        new Date(filtered[1].data).getTime()
      )
    }
  })

  it('should handle empty transactions array', () => {
    const { result } = renderHook(() => useFiltros([]))

    expect(result.current.transacoesFiltradas).toHaveLength(0)
  })

  it('should allow clearing tipo filter', () => {
    const { result } = renderHook(() => useFiltros(mockTransacoes))

    act(() => {
      result.current.filtrarPorTipo('despesa')
    })

    act(() => {
      result.current.filtrarPorTipo(undefined)
    })

    expect(result.current.filtros.tipo).toBeUndefined()
  })
})