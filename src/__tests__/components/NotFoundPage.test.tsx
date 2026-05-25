import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from '@/features/not-found/views/NotFoundPage';
import { AuthProvider } from '@/core/viewModels/AuthContext';

describe('NotFoundPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderPage() {
    return render(
      <MemoryRouter>
        <AuthProvider>
          <NotFoundPage />
        </AuthProvider>
      </MemoryRouter>
    );
  }

  it('should render 404 title and message', () => {
    renderPage();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
  });

  it('should show "Voltar" button', () => {
    renderPage();

    expect(screen.getByText('Voltar')).toBeInTheDocument();
  });

  it('should show "Página Inicial" when user is not authenticated', () => {
    renderPage();

    expect(screen.getByText('Página Inicial')).toBeInTheDocument();
  });

  it('should show "Ir para o Dashboard" when user is authenticated', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === 'UserProvider') return 'teste@email.com';
      return null;
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <NotFoundPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Ir para o Dashboard')).toBeInTheDocument();
  });
});
