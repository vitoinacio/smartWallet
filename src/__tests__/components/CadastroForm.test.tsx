import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CadastroForm from '@/features/auth/views/components/CadastroForm';

vi.mock('react-i18next', () => {
  const translations: Record<string, string> = {
    'cadastro.nome': 'Nome completo',
    'cadastro.nomePlaceholder': 'Digite seu nome completo',
    'cadastro.sexo': 'Sexo',
    'cadastro.selecione': 'Selecione',
    'cadastro.masculino': 'Masculino',
    'cadastro.feminino': 'Feminino',
    'cadastro.dataNasc': 'Data de nasc.',
    'cadastro.email': 'E-mail',
    'cadastro.senha': 'Senha',
    'cadastro.aceitarTermos': 'Aceitar termos',
    'cadastro.criarConta': 'Criar conta',
    'login.emailPlaceholder': 'seu@email.com',
  };
  return {
    useTranslation: () => ({
      t: (key: string) => translations[key] ?? key,
      i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
    }),
    initReactI18next: { type: '3rdParty', init: vi.fn() },
    Trans: ({ i18nKey }: { i18nKey: string }) => translations[i18nKey] ?? i18nKey,
  };
});

const mockHandleSubmit = vi.fn();
const mockSetNome = vi.fn();
const mockSetSexo = vi.fn();
const mockSetEmail = vi.fn();
const mockSetSenha = vi.fn();
const mockSetDataNasc = vi.fn();

vi.mock('@/features/auth/viewModels/useSignupPage', () => ({
  useSignupPage: () => ({
    setNome: mockSetNome,
    setSexo: mockSetSexo,
    setEmail: mockSetEmail,
    setSenha: mockSetSenha,
    setDataNasc: mockSetDataNasc,
    isLoading: false,
    handleSubmit: mockHandleSubmit,
  }),
}));

describe('CadastroForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nome input', () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Digite seu nome completo')).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('seu@email.com')).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeInTheDocument();
  });

  it('nome input accepts text', () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Digite seu nome completo');
    fireEvent.change(input, { target: { value: 'João Silva' } });
    expect(input).toHaveValue('João Silva');
    expect(mockSetNome).toHaveBeenCalledWith('João Silva');
  });

  it('email input accepts text', () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('seu@email.com');
    fireEvent.change(input, { target: { value: 'joao@email.com' } });
    expect(input).toHaveValue('joao@email.com');
    expect(mockSetEmail).toHaveBeenCalledWith('joao@email.com');
  });

  it('password input accepts text', () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('••••••••');
    fireEvent.change(input, { target: { value: '12345678' } });
    expect(input).toHaveValue('12345678');
    expect(mockSetSenha).toHaveBeenCalledWith('12345678');
  });

  it('sexo select is rendered', () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    expect(screen.getByText('Selecione')).toBeInTheDocument();
  });

  it('data de nascimento input is rendered', () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    const dataNasc = screen.getByLabelText('Data de nasc.');
    expect(dataNasc).toBeInTheDocument();
    expect(dataNasc).toHaveAttribute('type', 'date');
  });

  it('terms checkbox is rendered', () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('form calls onSubmit with data when submitted', async () => {
    render(
      <MemoryRouter>
        <CadastroForm />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Digite seu nome completo'), { target: { value: 'João Silva' } });
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'Masculino' }));
    fireEvent.change(screen.getByLabelText('Data de nasc.'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'joao@email.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: '12345678' } });
    fireEvent.click(screen.getByRole('checkbox'));
    act(() => {
      fireEvent.submit(screen.getByRole('button', { name: /criar conta/i }).closest('form')!);
    });
    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
