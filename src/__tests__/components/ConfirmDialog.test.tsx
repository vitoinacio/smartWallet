import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConfirmDialog } from '@/core/components/ConfirmDialog'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        cancel: 'Cancelar',
        delete: 'Excluir',
      }
      return map[key] ?? key
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

vi.mock('@radix-ui/react-alert-dialog', async () => {
  const React = await import('react')
  const { createContext, useContext, useState, createElement, cloneElement, isValidElement } = React

  const Ctx = createContext<{
    open: boolean
    setOpen: (v: boolean | ((prev: boolean) => boolean)) => void
  } | null>(null)

  function useCtx() {
    const ctx = useContext(Ctx)
    if (!ctx) throw new Error('AlertDialog components must be used within AlertDialog.Root')
    return ctx
  }

  const Root = ({ children }: any) => {
    const [open, setOpen] = useState(false)
    return createElement(Ctx.Provider, { value: { open, setOpen } }, children)
  }

  const Trigger = ({ children, asChild, ...props }: any) => {
    const { setOpen } = useCtx()
    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<{ onClick?: (...args: any[]) => void }>, {
        onClick: (...args: any[]) => {
          ;(children as any).props?.onClick?.(...args)
          setOpen(true)
        },
      })
    }
    return createElement('button', {
      type: 'button',
      onClick: () => setOpen(true),
      'data-testid': 'alert-dialog-trigger',
      ...props,
    }, children)
  }

  const Content = ({ children, ...props }: any) => {
    const { open } = useCtx()
    return open ? createElement('div', { 'data-testid': 'alert-dialog-content', ...props }, children) : null
  }

  const Action = ({ children, onClick, ...props }: any) =>
    createElement('button', {
      type: 'button',
      onClick,
      'data-testid': 'alert-dialog-action',
      ...props,
    }, children)

  const Cancel = ({ children, ...props }: any) => {
    const { setOpen } = useCtx()
    return createElement('button', {
      type: 'button',
      onClick: () => setOpen(false),
      'data-testid': 'alert-dialog-cancel',
      ...props,
    }, children)
  }

  const Title = ({ children, ...props }: any) =>
    createElement('h2', { 'data-testid': 'alert-dialog-title', ...props }, children)

  const Description = ({ children, ...props }: any) =>
    createElement('p', { 'data-testid': 'alert-dialog-description', ...props }, children)

  const PassThrough = ({ children }: any) => children
  const Null = () => null

  return {
    Root,
    Trigger,
    Portal: PassThrough,
    Overlay: Null,
    Content,
    Header: PassThrough,
    Footer: (props: any) => createElement('div', { 'data-testid': 'alert-dialog-footer', ...props }),
    Title,
    Description,
    Action,
    Cancel,
  }
})

describe('ConfirmDialog', () => {
  it('renders trigger children', () => {
    render(
      <ConfirmDialog title="Title" description="Desc" onConfirm={vi.fn()}>
        <button>Open Dialog</button>
      </ConfirmDialog>
    )
    expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument()
  })

  it('opens dialog when trigger is clicked', () => {
    render(
      <ConfirmDialog title="Title" description="Desc" onConfirm={vi.fn()}>
        <button>Open</button>
      </ConfirmDialog>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByTestId('alert-dialog-content')).toBeInTheDocument()
  })

  it('shows title and description in dialog', () => {
    render(
      <ConfirmDialog title="Delete item" description="Are you sure?" onConfirm={vi.fn()}>
        <button>Open</button>
      </ConfirmDialog>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Delete item')).toBeInTheDocument()
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
  })

  it('calls onConfirm when confirm button is clicked', () => {
    const onConfirm = vi.fn()
    render(
      <ConfirmDialog title="Title" description="Desc" onConfirm={onConfirm}>
        <button>Open</button>
      </ConfirmDialog>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    fireEvent.click(screen.getByTestId('alert-dialog-action'))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('shows custom confirmText', () => {
    render(
      <ConfirmDialog title="Title" description="Desc" confirmText="Sim" onConfirm={vi.fn()}>
        <button>Open</button>
      </ConfirmDialog>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Sim')).toBeInTheDocument()
  })

  it('shows custom cancelText', () => {
    render(
      <ConfirmDialog title="Title" description="Desc" cancelText="Não" onConfirm={vi.fn()}>
        <button>Open</button>
      </ConfirmDialog>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Não')).toBeInTheDocument()
  })
})
