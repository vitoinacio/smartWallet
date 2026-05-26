import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GraficoBarras } from '@/features/dashboard/views/components/GraficoBarras'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'graficoBarras.title': 'Gráfico de Barras',
        'graficoBarras.empty': 'Nenhum dado disponível',
        'graficoBarras.emptyHint': 'Adicione transações para ver o gráfico',
        'graficoBarras.receitas': 'Receitas',
        'graficoBarras.despesas': 'Despesas',
      }
      return map[key] ?? key
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}))

describe('GraficoBarras', () => {
  it('renders titulo when provided', () => {
    render(<GraficoBarras dados={[{ mes: 'Janeiro', receitas: 1000, despesas: 500 }]} titulo="Meu Título" />)
    expect(screen.getByText('Meu Título')).toBeInTheDocument()
  })

  it('renders without crashing with empty dados', () => {
    expect(() => render(<GraficoBarras dados={[]} />)).not.toThrow()
  })

  it('renders bar chart with data', () => {
    const dados = [
      { mes: 'Janeiro', receitas: 1000, despesas: 500 },
      { mes: 'Fevereiro', receitas: 2000, despesas: 800 },
    ]
    render(<GraficoBarras dados={dados} />)
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('shows empty state when dados is empty', () => {
    render(<GraficoBarras dados={[]} />)
    expect(screen.getByText('Nenhum dado disponível')).toBeInTheDocument()
    expect(screen.getByText('Adicione transações para ver o gráfico')).toBeInTheDocument()
  })
})
