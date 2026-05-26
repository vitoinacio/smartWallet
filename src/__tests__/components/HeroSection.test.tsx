import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { HeroSection } from '@/features/home/views/components/HeroSection';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'hero.title': 'SmartWallet',
        'hero.subtitle': 'Controle suas finanças',
        'hero.emailPlaceholder': 'Digite seu e-mail',
        'hero.cta': 'Começar Agora',
      };
      return map[key] ?? key;
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

describe('HeroSection', () => {
  const mockOnSubmitEmail = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders main title SmartWallet', () => {
    render(<HeroSection onSubmitEmail={mockOnSubmitEmail} />);
    expect(screen.getByText('SmartWallet')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<HeroSection onSubmitEmail={mockOnSubmitEmail} />);
    expect(screen.getByText('Controle suas finanças')).toBeInTheDocument();
  });

  it('renders email input with placeholder', () => {
    render(<HeroSection onSubmitEmail={mockOnSubmitEmail} />);
    expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument();
  });

  it('renders CTA button Começar Agora', () => {
    render(<HeroSection onSubmitEmail={mockOnSubmitEmail} />);
    expect(screen.getByRole('button', { name: /começar agora/i })).toBeInTheDocument();
  });

  it('calls onSubmitEmail when form is submitted with valid email', async () => {
    render(<HeroSection onSubmitEmail={mockOnSubmitEmail} />);
    const input = screen.getByPlaceholderText('Digite seu e-mail');
    fireEvent.change(input, { target: { value: 'teste@test.com' } });
    act(() => {
      fireEvent.submit(screen.getByRole('button', { name: /começar agora/i }).closest('form')!);
    });
    await waitFor(() => {
      expect(mockOnSubmitEmail).toHaveBeenCalled();
      expect(mockOnSubmitEmail.mock.calls[0][0]).toEqual({ email: 'teste@test.com' });
    });
  });
});
