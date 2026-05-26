import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useTheme from '@/core/viewModels/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('returns default theme as light', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('handleTheme toggles theme from light to dark', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.handleTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('handleTheme adds dark class to html element', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.handleTheme())
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('handleTheme toggles back to light and removes dark class', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.handleTheme())
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    act(() => result.current.handleTheme())
    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('persists theme to localStorage after handleTheme', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.handleTheme())
    expect(localStorage.getItem('theme')).toBe('dark')
    act(() => result.current.handleTheme())
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('reads existing dark theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
