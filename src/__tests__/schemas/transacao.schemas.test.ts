import { describe, it, expect } from 'vitest'
import { TRANSACAO_SCHEMA } from '@/features/financeiro/models/TransacaoTypes'

const VALID_DATA = {
  descricao: 'Salário',
  valor: '5000',
  tipo: 'receita' as const,
  categoria: 'salario',
  data: '2024-01-15',
  notificar: false,
  observacao: 'Mensal',
}

describe('TRANSACAO_SCHEMA', () => {
  it('accepts valid complete transaction data', () => {
    const result = TRANSACAO_SCHEMA.safeParse(VALID_DATA)
    expect(result.success).toBe(true)
  })

  it('rejects empty descricao', () => {
    const result = TRANSACAO_SCHEMA.safeParse({ ...VALID_DATA, descricao: '' })
    expect(result.success).toBe(false)
  })

  it('rejects empty valor string', () => {
    const result = TRANSACAO_SCHEMA.safeParse({ ...VALID_DATA, valor: '' })
    expect(result.success).toBe(false)
  })

  it('rejects missing valor', () => {
    const { valor, ...semValor } = VALID_DATA
    const result = TRANSACAO_SCHEMA.safeParse(semValor)
    expect(result.success).toBe(false)
  })

  it('accepts valid tipo values (receita, despesa)', () => {
    const receita = TRANSACAO_SCHEMA.safeParse({ ...VALID_DATA, tipo: 'receita' })
    const despesa = TRANSACAO_SCHEMA.safeParse({ ...VALID_DATA, tipo: 'despesa' })
    expect(receita.success).toBe(true)
    expect(despesa.success).toBe(true)
  })

  it('rejects invalid tipo', () => {
    const result = TRANSACAO_SCHEMA.safeParse({ ...VALID_DATA, tipo: 'investimento' })
    expect(result.success).toBe(false)
  })

  it('rejects empty categoria', () => {
    const result = TRANSACAO_SCHEMA.safeParse({ ...VALID_DATA, categoria: '' })
    expect(result.success).toBe(false)
  })

  it('rejects empty data', () => {
    const result = TRANSACAO_SCHEMA.safeParse({ ...VALID_DATA, data: '' })
    expect(result.success).toBe(false)
  })

  it('rejects missing notificar field', () => {
    const { notificar, ...semNotificar } = VALID_DATA
    const result = TRANSACAO_SCHEMA.safeParse(semNotificar)
    expect(result.success).toBe(false)
  })

  it('accepts data without optional observacao', () => {
    const { observacao, ...semObservacao } = VALID_DATA
    const result = TRANSACAO_SCHEMA.safeParse(semObservacao)
    expect(result.success).toBe(true)
  })

  it('safeParse returns success with parsed data for valid input', () => {
    const result = TRANSACAO_SCHEMA.safeParse(VALID_DATA)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.descricao).toBe('Salário')
      expect(result.data.valor).toBe('5000')
      expect(result.data.tipo).toBe('receita')
    }
  })

  it('safeParse returns error with issues for invalid data', () => {
    const result = TRANSACAO_SCHEMA.safeParse({ descricao: '', valor: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0)
      const paths = result.error.issues.map(i => i.path[0])
      expect(paths).toContain('descricao')
      expect(paths).toContain('valor')
    }
  })
})
