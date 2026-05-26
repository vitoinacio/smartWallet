import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyState } from '@/core/components/EmptyState'

describe('EmptyState', () => {
  const IconMock = () => <svg data-testid="empty-state-icon" />

  it('renders icon', () => {
    render(<EmptyState icon={IconMock} title="Test" />)
    expect(screen.getByTestId('empty-state-icon')).toBeInTheDocument()
  })

  it('renders title text', () => {
    render(<EmptyState icon={IconMock} title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<EmptyState icon={IconMock} title="Test" description="Hello World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const { container } = render(<EmptyState icon={IconMock} title="Test" />)
    expect(container.querySelectorAll('p')).toHaveLength(1)
  })

  it('renders action ReactNode when provided', () => {
    render(<EmptyState icon={IconMock} title="Test" action={<button>Click</button>} />)
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument()
  })
})
