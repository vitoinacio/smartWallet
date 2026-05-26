import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GraficoRosca } from '@/features/dashboard/views/components/GraficoRosca'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'graficoRosca.title': 'Gráfico de Rosca',
        'graficoRosca.empty': 'Nenhum dado disponível',
        'graficoRosca.emptyHint': 'Adicione transações para ver o gráfico',
      }
      return map[key] ?? key
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Pie: ({ children }: any) => <div data-testid="pie">{children}</div>,
  Cell: () => <div data-testid="cell" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}))

describe('GraficoRosca', () => {
  it('renders titulo when provided', () => {
    render(<GraficoRosca dados={[{ nome: 'Alimentação', valor: 500, cor: '#22c55e' }]} titulo="Meu Título" />)
    expect(screen.getByText('Meu Título')).toBeInTheDocument()
  })

  it('renders without crashing with empty dados', () => {
    expect(() => render(<GraficoRosca dados={[]} />)).not.toThrow()
  })

  it('renders pie chart with data', () => {
    const dados = [
      { nome: 'Alimentação', valor: 500, cor: '#22c55e' },
      { nome: 'Transporte', valor: 300, cor: '#3b82f6' },
    ]
    render(<GraficoRosca dados={dados} />)
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument()
  })

  it('shows empty state when dados is empty', () => {
    render(<GraficoRosca dados={[]} />)
    expect(screen.getByText('Nenhum dado disponível')).toBeInTheDocument()
    expect(screen.getByText('Adicione transações para ver o gráfico')).toBeInTheDocument()
  })
})
