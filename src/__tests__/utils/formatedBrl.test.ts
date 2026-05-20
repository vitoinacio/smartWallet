import { describe, it, expect } from 'vitest'
import { formatedBrl } from '@/core/utils/formatedBrl'

describe('formatedBrl', () => {
  it('should format number to BRL currency string', () => {
    expect(formatedBrl('1000')).toBe('10,00')
    expect(formatedBrl('100000')).toBe('1.000,00')
  })

  it('should handle empty string', () => {
    expect(formatedBrl('')).toBe('')
  })

  it('should handle non-numeric input', () => {
    expect(formatedBrl('abc')).toBe('')
  })

  it('should handle zero', () => {
    expect(formatedBrl('0')).toBe('0,00')
  })

  it('should handle large numbers', () => {
    expect(formatedBrl('100000000')).toBe('1.000.000,00')
  })

  it('should handle decimal values', () => {
    expect(formatedBrl('1050')).toBe('10,50')
    expect(formatedBrl('1005')).toBe('10,05')
  })
})