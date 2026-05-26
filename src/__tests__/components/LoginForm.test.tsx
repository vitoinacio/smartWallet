import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '@/features/auth/views/components/LoginForm';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'login.email': 'Email',
        'login.emailPlaceholder': 'seu@email.com',
        'login.senha': 'Senha',
        'login.esqueceuSenha': 'Esqueceu a senha?',
        'login.entrar': 'Entrar',
      };
      return map[key] ?? key;
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

const mockHandleSubmit = vi.fn();
const mockSetEmail = vi.fn();
const mockSetSenha = vi.fn();

vi.mock('@/features/auth/viewModels/useLoginPage', () => ({
  useLoginPage: () => ({
    setSenha: mockSetSenha,
    setEmail: mockSetEmail,
    isLoading: false,
    handleSubmit: mockHandleSubmit,
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders email input', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('seu@email.com')).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('renders submit button with text Entrar', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('renders "Esqueceu a senha?" link', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument();
  });

  it('email input accepts text and calls onChange', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('seu@email.com');
    fireEvent.change(input, { target: { value: 'teste@test.com' } });
    expect(input).toHaveValue('teste@test.com');
    expect(mockSetEmail).toHaveBeenCalledWith('teste@test.com');
  });

  it('password input accepts text and calls onChange', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('••••••••');
    fireEvent.change(input, { target: { value: '12345678' } });
    expect(input).toHaveValue('12345678');
    expect(mockSetSenha).toHaveBeenCalledWith('12345678');
  });

  it('submit button is enabled when form has values', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).not.toBeDisabled();
  });

  it('calls onSubmit handler when submitted', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'teste@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: '12345678' } });
    act(() => {
      fireEvent.submit(screen.getByRole('button', { name: /entrar/i }).closest('form')!);
    });
    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
