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

const mockResizeObserver = vi.fn()
mockResizeObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})
window.ResizeObserver = mockResizeObserver

Storage.prototype.getItem = vi.fn((key: string) => {
  if (key === 'transacoes') return '[]'
  if (key === 'theme') return 'light'
  return null
})
Storage.prototype.setItem = vi.fn()
Storage.prototype.removeItem = vi.fn()
Storage.prototype.clear = vi.fn()