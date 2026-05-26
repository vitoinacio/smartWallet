import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getRedirectAfterLogin } from '@/core/utils/redirectAfterLogin'

describe('getRedirectAfterLogin', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('returns saved path when it is not an auth route', () => {
    sessionStorage.setItem('redirectAfterLogin', '/dashboard')
    const result = getRedirectAfterLogin()
    expect(result).toBe('/dashboard')
  })

  it('returns /dashboard default when no path is saved', () => {
    const result = getRedirectAfterLogin()
    expect(result).toBe('/dashboard')
  })

  it('ignores auth routes /login and returns default', () => {
    sessionStorage.setItem('redirectAfterLogin', '/login')
    const result = getRedirectAfterLogin()
    expect(result).toBe('/dashboard')
  })

  it('ignores /criar route', () => {
    sessionStorage.setItem('redirectAfterLogin', '/criar')
    const result = getRedirectAfterLogin()
    expect(result).toBe('/dashboard')
  })

  it('removes the saved path after reading', () => {
    sessionStorage.setItem('redirectAfterLogin', '/dashboard')
    getRedirectAfterLogin()
    expect(sessionStorage.getItem('redirectAfterLogin')).toBeNull()
  })
})
