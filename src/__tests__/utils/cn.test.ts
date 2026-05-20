import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('foo', 'bar')
    expect(result).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('base', isActive && 'active')
    expect(result).toBe('base active')
  })

  it('should handle false conditions', () => {
    const isActive = false
    const result = cn('base', isActive && 'active')
    expect(result).toBe('base')
  })

  it('should merge tailwind classes with conflicts', () => {
    const result = cn('p-4 p-6', 'bg-red-500 bg-blue-500')
    expect(result).toContain('p-6')
    expect(result).toContain('bg-blue-500')
  })

  it('should handle empty inputs', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle undefined and null', () => {
    const result = cn('foo', undefined, null, 'bar')
    expect(result).toBe('foo bar')
  })
})