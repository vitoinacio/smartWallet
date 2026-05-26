import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/core/viewModels/AuthContext'

describe('AuthContext', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('reads userEmail from sessionStorage key UserProvider', () => {
    sessionStorage.setItem('UserProvider', 'test@test.com')

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MemoryRouter>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      ),
    })

    expect(result.current.userEmail).toBe('test@test.com')
  })

  it('isLoggedIn is true when sessionStorage has an email', () => {
    sessionStorage.setItem('UserProvider', 'test@test.com')

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MemoryRouter>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      ),
    })

    expect(result.current.isLoggedIn).toBe(true)
  })

  it('isLoggedIn is false when sessionStorage is empty', () => {
    sessionStorage.clear()

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MemoryRouter>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      ),
    })

    expect(result.current.isLoggedIn).toBe(false)
  })

  it('useAuth returns userEmail from sessionStorage', () => {
    sessionStorage.setItem('UserProvider', 'user@example.com')

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MemoryRouter>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      ),
    })

    expect(result.current.userEmail).toBe('user@example.com')
  })

  it('useAuth returns defaults when no AuthProvider wrapper', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.isLoggedIn).toBe(false)
    expect(result.current.userEmail).toBeNull()
  })
})
