import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CTASection } from '@/features/home/views/components/CTASection';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'cta.title': 'Pronto para começar?',
        'cta.criarConta': 'Criar Conta Grátis',
        'cta.jaTenhoConta': 'Já tenho conta',
      };
      return map[key] ?? key;
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

describe('CTASection', () => {
  const mockOnCriarConta = vi.fn();
  const mockOnJaTenhoConta = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title Pronto para começar?', () => {
    render(<CTASection onCriarConta={mockOnCriarConta} onJaTenhoConta={mockOnJaTenhoConta} />);
    expect(screen.getByText('Pronto para começar?')).toBeInTheDocument();
  });

  it('renders Criar Conta Grátis button', () => {
    render(<CTASection onCriarConta={mockOnCriarConta} onJaTenhoConta={mockOnJaTenhoConta} />);
    expect(screen.getByRole('button', { name: /criar conta grátis/i })).toBeInTheDocument();
  });

  it('renders Já tenho conta button', () => {
    render(<CTASection onCriarConta={mockOnCriarConta} onJaTenhoConta={mockOnJaTenhoConta} />);
    expect(screen.getByRole('button', { name: /já tenho conta/i })).toBeInTheDocument();
  });

  it('calls onCriarConta when Criar Conta Grátis is clicked', () => {
    render(<CTASection onCriarConta={mockOnCriarConta} onJaTenhoConta={mockOnJaTenhoConta} />);
    fireEvent.click(screen.getByRole('button', { name: /criar conta grátis/i }));
    expect(mockOnCriarConta).toHaveBeenCalledTimes(1);
  });
});
