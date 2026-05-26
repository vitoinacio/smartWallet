import '@testing-library/jest-dom'
import { vi } from 'vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

window.scrollTo = vi.fn()

const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
})
window.IntersectionObserver = mockIntersectionObserver

const mockResizeObserver = vi.fn().mockImplementation(function () {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }
})
window.ResizeObserver = mockResizeObserver

const storageMap = new Map<string, string>()
storageMap.set('transacoes', '[]')
storageMap.set('theme', 'light')
Storage.prototype.getItem = vi.fn((key: string) => storageMap.get(key) ?? null)
Storage.prototype.setItem = vi.fn((key: string, value: string) => { storageMap.set(key, value) })
Storage.prototype.removeItem = vi.fn((key: string) => { storageMap.delete(key) })
Storage.prototype.clear = vi.fn(() => { storageMap.clear() })