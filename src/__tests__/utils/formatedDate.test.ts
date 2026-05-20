import { describe, it, expect } from 'vitest'
import { formatarDate } from '@/core/utils/formatedDate'

describe('formatarDate', () => {
  // Note: JavaScript Date with ISO strings like '2024-01-15' interprets as UTC midnight.
  // When converted to local time, it may show the previous day depending on timezone.
  // Using full ISO datetime strings to ensure consistent behavior.

  it('should format ISO datetime string to DD/MM/YYYY', () => {
    expect(formatarDate('2024-01-15T12:00:00')).toBe('15/01/2024')
    expect(formatarDate('2024-12-31T23:59:59')).toBe('31/12/2024')
  })

  it('should handle single digit day and month', () => {
    expect(formatarDate('2024-01-05T10:00:00')).toBe('05/01/2024')
    expect(formatarDate('2024-09-01T00:00:00')).toBe('01/09/2024')
  })

  it('should handle ISO date string', () => {
    const result = formatarDate('2024-03-20T14:30:00')
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
    expect(result).toBe('20/03/2024')
  })

  it('should return empty string for invalid date', () => {
    expect(formatarDate('invalid-date')).toBe('')
    expect(formatarDate('')).toBe('')
  })

  it('should return empty string for non-string input', () => {
    expect(formatarDate(null)).toBe('')
    expect(formatarDate(undefined)).toBe('')
  })

  it('should handle leap year date', () => {
    const result = formatarDate('2024-02-29T12:00:00')
    expect(result).toBe('29/02/2024')
  })

  it('should validate output format', () => {
    const result = formatarDate('2024-06-15T08:30:00')
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
  })
})