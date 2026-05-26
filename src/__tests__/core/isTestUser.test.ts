import { describe, it, expect, beforeEach } from 'vitest'
import { isTestUser } from '@/core/utils/isTestUser'

describe('isTestUser', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('returns true when sessionStorage has teste@gmail.com', () => {
    sessionStorage.setItem('UserProvider', 'teste@gmail.com')
    expect(isTestUser()).toBe(true)
  })

  it('returns false when sessionStorage has a different email', () => {
    sessionStorage.setItem('UserProvider', 'other@email.com')
    expect(isTestUser()).toBe(false)
  })

  it('returns false when sessionStorage is empty', () => {
    expect(isTestUser()).toBe(false)
  })
})
