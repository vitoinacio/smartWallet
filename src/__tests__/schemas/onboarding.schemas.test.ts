import { describe, it, expect } from 'vitest'
import { STEP_WELCOME_SCHEMA, STEP_INCOME_SCHEMA, STEP_GOAL_SCHEMA } from '@/features/onboarding/models/OnboardingTypes'

describe('STEP_WELCOME_SCHEMA', () => {
  it('accepts valid name (min 2 chars)', () => {
    const result = STEP_WELCOME_SCHEMA.safeParse({ nome: 'João' })
    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const result = STEP_WELCOME_SCHEMA.safeParse({ nome: '' })
    expect(result.success).toBe(false)
  })

  it('rejects single character name', () => {
    const result = STEP_WELCOME_SCHEMA.safeParse({ nome: 'A' })
    expect(result.success).toBe(false)
  })

  it('error message contains 2 caracteres', () => {
    const result = STEP_WELCOME_SCHEMA.safeParse({ nome: 'A' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('2 caracteres')
    }
  })
})

describe('STEP_INCOME_SCHEMA', () => {
  it('accepts valid rendaMensal and categoriasInteresse', () => {
    const result = STEP_INCOME_SCHEMA.safeParse({ rendaMensal: 5000, categoriasInteresse: ['alimentacao'] })
    expect(result.success).toBe(true)
  })

  it('rejects zero rendaMensal (must be positive)', () => {
    const result = STEP_INCOME_SCHEMA.safeParse({ rendaMensal: 0, categoriasInteresse: ['alimentacao'] })
    expect(result.success).toBe(false)
  })

  it('rejects negative rendaMensal', () => {
    const result = STEP_INCOME_SCHEMA.safeParse({ rendaMensal: -100, categoriasInteresse: ['alimentacao'] })
    expect(result.success).toBe(false)
  })

  it('rejects empty categoriasInteresse array', () => {
    const result = STEP_INCOME_SCHEMA.safeParse({ rendaMensal: 5000, categoriasInteresse: [] })
    expect(result.success).toBe(false)
  })

  it('error message for renda contains renda mensal', () => {
    const result = STEP_INCOME_SCHEMA.safeParse({ rendaMensal: 0, categoriasInteresse: ['alimentacao'] })
    expect(result.success).toBe(false)
    if (!result.success) {
      const rendaIssue = result.error.issues.find(i => i.path[0] === 'rendaMensal')
      expect(rendaIssue?.message).toContain('renda mensal')
    }
  })

  it('error message for categorias contains categoria', () => {
    const result = STEP_INCOME_SCHEMA.safeParse({ rendaMensal: 5000, categoriasInteresse: [] })
    expect(result.success).toBe(false)
    if (!result.success) {
      const catIssue = result.error.issues.find(i => i.path[0] === 'categoriasInteresse')
      expect(catIssue?.message).toContain('categoria')
    }
  })
})

describe('STEP_GOAL_SCHEMA', () => {
  it('accepts valid metaValor and metaPrazo', () => {
    const result = STEP_GOAL_SCHEMA.safeParse({ metaValor: 10000, metaPrazo: '2026-12-31' })
    expect(result.success).toBe(true)
  })

  it('rejects zero metaValor', () => {
    const result = STEP_GOAL_SCHEMA.safeParse({ metaValor: 0, metaPrazo: '2026-12-31' })
    expect(result.success).toBe(false)
  })

  it('rejects negative metaValor', () => {
    const result = STEP_GOAL_SCHEMA.safeParse({ metaValor: -50, metaPrazo: '2026-12-31' })
    expect(result.success).toBe(false)
  })

  it('rejects empty metaPrazo', () => {
    const result = STEP_GOAL_SCHEMA.safeParse({ metaValor: 10000, metaPrazo: '' })
    expect(result.success).toBe(false)
  })

  it('error message for metaValor contains valor', () => {
    const result = STEP_GOAL_SCHEMA.safeParse({ metaValor: 0, metaPrazo: '2026-12-31' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const valorIssue = result.error.issues.find(i => i.path[0] === 'metaValor')
      expect(valorIssue?.message).toContain('valor')
    }
  })
})
