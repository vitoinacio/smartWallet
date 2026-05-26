import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
  useAuthAnimation,
  authPageVariants,
} from '@/features/auth/viewModels/useAuthAnimation'

const debugConfig = (config) => { console.log('DEBUG transitionConfig:', JSON.stringify(config)); return config; };
import type { AuthTransitionConfig } from '@/features/auth/viewModels/useAuthAnimation'

const mockLocation = { pathname: '/login' }

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useLocation: () => mockLocation,
}))

describe('useAuthAnimation', () => {
  it('returns animationKey as a string', () => {
    const { result } = renderHook(() => useAuthAnimation())
    expect(typeof result.current.animationKey).toBe('string')
    expect(result.current.animationKey).toBe('initial-/login')
  })

  it('returns transitionConfig with enter/exit positions', () => {
    const { result } = renderHook(() => useAuthAnimation())
    const { transitionConfig } = result.current
    expect(transitionConfig).toHaveProperty('enter')
    expect(transitionConfig).toHaveProperty('exit')
    expect(transitionConfig.enter).toHaveProperty('x')
    expect(transitionConfig.enter).toHaveProperty('y')
    expect(transitionConfig.exit).toHaveProperty('x')
    expect(transitionConfig.exit).toHaveProperty('y')
  })

  it('tracks currentRoute and previousRoute', () => {
    const { result } = renderHook(() => useAuthAnimation())
    expect(result.current.currentRoute).toBe('/login')
    expect(result.current.previousRoute).toBeNull()
  })

  it('animationKey and previousRoute update when route changes', () => {
    const { result, rerender } = renderHook(() => useAuthAnimation())
    expect(result.current.animationKey).toBe('initial-/login')
    expect(result.current.previousRoute).toBeNull()
    expect(result.current.currentRoute).toBe('/login')

    mockLocation.pathname = '/criar'
    rerender()

    expect(result.current.animationKey).toBe('/login-/criar')
    expect(result.current.previousRoute).toBe('/login')
    expect(result.current.currentRoute).toBe('/criar')
  })

  it('computes transitionConfig based on route transition direction', () => {
    const { result, rerender } = renderHook(() => useAuthAnimation())

    console.log("DEBUG enter.x:", result.current.transitionConfig.enter.x); console.log("DEBUG currentRoute:", result.current.currentRoute); console.log("DEBUG previousRoute:", result.current.previousRoute); expect(result.current.transitionConfig.enter.x).toBe(-120)

    mockLocation.pathname = '/criar'
    rerender()

    expect(result.current.transitionConfig.enter.x).toBe(120)
    expect(result.current.transitionConfig.enter.y).toBe(0)
    expect(result.current.transitionConfig.exit.x).toBe(-120)
    expect(result.current.transitionConfig.exit.y).toBe(0)

    mockLocation.pathname = '/recuperar'
    rerender()

    expect(result.current.transitionConfig.enter.x).toBe(0)
    expect(result.current.transitionConfig.enter.y).toBe(96)
    expect(result.current.transitionConfig.exit.x).toBe(0)
    expect(result.current.transitionConfig.exit.y).toBe(-96)

    mockLocation.pathname = '/login'
    rerender()

    expect(result.current.transitionConfig.enter.x).toBe(0)
    expect(result.current.transitionConfig.enter.y).toBe(-96)
    expect(result.current.transitionConfig.exit.x).toBe(0)
    expect(result.current.transitionConfig.exit.y).toBe(96)
  })
})

describe('authPageVariants', () => {
  const config: AuthTransitionConfig = {
    enter: { x: 120, y: 0 },
    exit: { x: -120, y: 0 },
  }

  it('has initial, animate, and exit keys', () => {
    expect(authPageVariants).toHaveProperty('initial')
    expect(authPageVariants).toHaveProperty('animate')
    expect(authPageVariants).toHaveProperty('exit')
  })

  it('initial variant returns opacity 0 and enter position with scale 0.995', () => {
    const result = (authPageVariants.initial as (c: AuthTransitionConfig) => typeof config)(config)
    expect(result).toEqual({
      opacity: 0,
      x: 120,
      y: 0,
      scale: 0.995,
    })
  })

  it('animate variant returns identity state', () => {
    expect(authPageVariants.animate).toEqual({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    })
  })

  it('exit variant returns opacity 0 and exit position with scale 0.995', () => {
    const result = (authPageVariants.exit as (c: AuthTransitionConfig) => typeof config)(config)
    expect(result).toEqual({
      opacity: 0,
      x: -120,
      y: 0,
      scale: 0.995,
    })
  })
})
