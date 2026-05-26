import { describe, it, expect, beforeEach } from 'vitest'
import { save, load, clear, isComplete, markComplete, getDefault } from '@/features/onboarding/services/onboarding.service'
import { ONBOARDING_DEFAULT } from '@/features/onboarding/models/OnboardingTypes'

describe('onboarding.service', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('save() stores data in localStorage with key smartwallet_onboarding', () => {
    save(ONBOARDING_DEFAULT)
    const stored = localStorage.getItem('smartwallet_onboarding')
    expect(stored).toBe(JSON.stringify(ONBOARDING_DEFAULT))
  })

  it('load() returns saved data', () => {
    save(ONBOARDING_DEFAULT)
    const result = load()
    expect(result).toEqual(ONBOARDING_DEFAULT)
  })

  it('load() returns null when nothing saved', () => {
    expect(load()).toBeNull()
  })

  it('load() returns null when localStorage has invalid JSON', () => {
    localStorage.setItem('smartwallet_onboarding', 'invalid-json')
    expect(load()).toBeNull()
  })

  it('clear() removes data from localStorage', () => {
    save(ONBOARDING_DEFAULT)
    clear()
    expect(localStorage.getItem('smartwallet_onboarding')).toBeNull()
  })

  it('isComplete() returns true when completo is true', () => {
    save({ ...ONBOARDING_DEFAULT, completo: true })
    expect(isComplete()).toBe(true)
  })

  it('isComplete() returns false when completo is false', () => {
    save(ONBOARDING_DEFAULT)
    expect(isComplete()).toBe(false)
  })

  it('markComplete() sets completo to true and updatedAt to ISO string', () => {
    const result = markComplete(ONBOARDING_DEFAULT)
    expect(result.completo).toBe(true)
    expect(typeof result.updatedAt).toBe('string')
    expect(() => new Date(result.updatedAt)).not.toThrow()
  })

  it('markComplete() saves to localStorage', () => {
    markComplete(ONBOARDING_DEFAULT)
    const stored = load()
    expect(stored?.completo).toBe(true)
    expect(stored?.updatedAt).toEqual(expect.any(String))
  })

  it('getDefault() returns a fresh copy of ONBOARDING_DEFAULT (not the same reference)', () => {
    const default1 = getDefault()
    const default2 = getDefault()
    expect(default1).toEqual(ONBOARDING_DEFAULT)
    expect(default1).not.toBe(default2)
    expect(default1).not.toBe(ONBOARDING_DEFAULT)
  })
})
