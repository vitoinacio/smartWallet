import { describe, it, expect } from 'vitest'
import { renderHook, act, render, screen } from '@testing-library/react'
import { SidebarProvider, useSidebarState } from '@/core/viewModels/useSidebar'

describe('useSidebarState', () => {
  it('returns isCollapsed default as false', () => {
    const { result } = renderHook(() => useSidebarState(), {
      wrapper: SidebarProvider,
    })
    expect(result.current.isCollapsed).toBe(false)
  })

  it('setIsCollapsed(true) changes isCollapsed to true', () => {
    const { result } = renderHook(() => useSidebarState(), {
      wrapper: SidebarProvider,
    })
    act(() => result.current.setIsCollapsed(true))
    expect(result.current.isCollapsed).toBe(true)
  })

  it('setIsCollapsed(false) sets isCollapsed back to false', () => {
    const { result } = renderHook(() => useSidebarState(), {
      wrapper: SidebarProvider,
    })
    act(() => result.current.setIsCollapsed(true))
    expect(result.current.isCollapsed).toBe(true)
    act(() => result.current.setIsCollapsed(false))
    expect(result.current.isCollapsed).toBe(false)
  })

  it('throws error when used outside SidebarProvider', () => {
    expect(() => {
      renderHook(() => useSidebarState())
    }).toThrow('useSidebarState must be used within SidebarProvider')
  })

  it('renders children correctly inside SidebarProvider', () => {
    render(
      <SidebarProvider>
        <div data-testid="child">Child Content</div>
      </SidebarProvider>
    )
    expect(screen.getByTestId('child')).toHaveTextContent('Child Content')
  })
})
