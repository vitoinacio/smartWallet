import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TransacaoForm } from '@/features/financeiro/views/components/TransacaoForm'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'form.novaTransacao': 'Nova Transação',
        'form.adicionar': 'Adicionar Transação',
        'form.tipo': 'Tipo',
        'form.selecione': 'Selecione',
        'form.receita': 'Receita',
        'form.despesa': 'Despesa',
        'form.categoria': 'Categoria',
        'form.descricao': 'Descrição',
        'form.descricaoPlaceholder': 'Ex: Supermercado',
        'form.valor': 'Valor (R$)',
        'form.dataVencimento': 'Data de Vencimento',
        'form.observacao': 'Observação (opcional)',
        'form.observacaoPlaceholder': 'Detalhes...',
        'form.notificar': 'Notificar quando estiver próxima do vencimento',
      }
      return map[key] ?? key
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

vi.mock('@radix-ui/react-select', async () => {
  const React = await import('react')
  const { createContext, useContext, useState, createElement } = React

  const Ctx = createContext<{
    value: string
    onValueChange: (v: string) => void
    open: boolean
    setOpen: (v: boolean | ((prev: boolean) => boolean)) => void
  } | null>(null)

  const Root = ({ children, value, onValueChange }: any) => {
    const [open, setOpen] = useState(false)
    return createElement(Ctx.Provider, { value: { value, onValueChange, open, setOpen } }, children)
  }

  const Trigger = ({ children, ...props }: any) => {
    const ctx = useContext(Ctx)
    return createElement('button', { type: 'button', onClick: () => ctx?.setOpen?.((v) => !v), ...props }, children)
  }

  const Value = ({ placeholder }: any) => {
    const ctx = useContext(Ctx)
    return createElement('span', null, ctx?.value || placeholder || null)
  }

  const Content = ({ children, ...props }: any) => {
    const ctx = useContext(Ctx)
    return ctx?.open ? createElement('div', { ...props }, children) : null
  }

  const Item = ({ value: itemVal, children, ...props }: any) => {
    const ctx = useContext(Ctx)
    return createElement('div', {
      role: 'option',
      onClick: () => {
        ctx?.onValueChange?.(itemVal)
        ctx?.setOpen?.(false)
      },
      ...props,
    }, children)
  }

  const PassThrough = ({ children }: any) => children
  const Null = () => null

  return {
    Root, Trigger, Value, Content, Item,
    Portal: PassThrough,
    Icon: PassThrough,
    ItemIndicator: PassThrough,
    ItemText: PassThrough,
    Viewport: PassThrough,
    Group: PassThrough,
    Label: PassThrough,
    Separator: Null,
    ScrollUpButton: Null,
    ScrollDownButton: Null,
  }
})

describe('TransacaoForm', () => {
  const mockOnSubmit = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders the form with "Nova Transação" title', () => {
    render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={false} />)
    expect(screen.getByText('Nova Transação')).toBeInTheDocument()
  })

  it('renders tipo select (Receita/Despesa)', () => {
    render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={false} />)
    expect(screen.getByText('Tipo')).toBeInTheDocument()
    const trigger = screen.getByLabelText('Tipo')
    expect(trigger).toBeInTheDocument()
  })

  it('renders categoria select', () => {
    render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={false} />)
    expect(screen.getByText('Categoria')).toBeInTheDocument()
    expect(screen.getByLabelText('Categoria')).toBeInTheDocument()
  })

  it('renders descricao input', () => {
    render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={false} />)
    expect(screen.getByPlaceholderText('Ex: Supermercado')).toBeInTheDocument()
  })

  it('renders valor input', () => {
    render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={false} />)
    expect(screen.getByPlaceholderText('0,00')).toBeInTheDocument()
  })

  it('renders data de vencimento input', () => {
    render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={false} />)
    expect(screen.getByLabelText('Data de Vencimento')).toBeInTheDocument()
  })

  it('renders observacao input', () => {
    render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={false} />)
    expect(screen.getByPlaceholderText('Detalhes...')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={false} />)
    expect(screen.getByRole('button', { name: /Adicionar Transação/i })).toBeInTheDocument()
  })

  it('submit calls onSubmit with form data', async () => {
    render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={false} />)

    fireEvent.change(screen.getByPlaceholderText('Ex: Supermercado'), {
      target: { value: 'Compra do mês' },
    })

    fireEvent.change(screen.getByPlaceholderText('0,00'), {
      target: { value: '15000' },
    })

    fireEvent.change(screen.getByLabelText('Data de Vencimento'), {
      target: { value: '2024-12-15' },
    })

    fireEvent.click(screen.getByLabelText('Categoria'))
    const catOption = await screen.findByRole('option', { name: /Alimentação/i })
    fireEvent.click(catOption)

    fireEvent.click(screen.getByRole('button', { name: /Adicionar Transação/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })

    const data = mockOnSubmit.mock.calls[0][0]
    expect(data).toMatchObject({
      descricao: 'Compra do mês',
      data: '2024-12-15',
      tipo: 'despesa',
    })
  })

  it('shows skeleton loading when isLoading is true', () => {
    const { container } = render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={true} />)
    expect(screen.queryByPlaceholderText('Ex: Supermercado')).not.toBeInTheDocument()
    expect(screen.queryByText('Adicionar Transação')).not.toBeInTheDocument()
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('handles changing tipo between receita/despesa', async () => {
    render(<TransacaoForm onSubmit={mockOnSubmit} isLoading={false} />)

    fireEvent.click(screen.getByLabelText('Tipo'))
    const receitaOption = await screen.findByRole('option', { name: /Receita/i })
    fireEvent.click(receitaOption)

    fireEvent.click(screen.getByLabelText('Categoria'))
    expect(await screen.findByRole('option', { name: /Salário/i })).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Categoria'))

    fireEvent.click(screen.getByLabelText('Tipo'))
    const despesaOption = await screen.findByRole('option', { name: /Despesa/i })
    fireEvent.click(despesaOption)

    fireEvent.click(screen.getByLabelText('Categoria'))
    expect(await screen.findByRole('option', { name: /Alimentação/i })).toBeInTheDocument()
  })
})
