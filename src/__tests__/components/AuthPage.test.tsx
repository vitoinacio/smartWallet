import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AuthPage from '@/features/auth/views/AuthPage'

const mockTransitionConfig = {
  enter: { x: 120, y: 0 },
  exit: { x: -120, y: 0 },
}

const mockAuthPageState = {
  isLogin: true,
  isCriar: false,
  isRecuperar: false,
  currentRoute: '/login' as const,
  goToLogin: vi.fn(),
  goToCriar: vi.fn(),
  goToRecuperar: vi.fn(),
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'auth:login.title': 'Entrar',
        'auth:login.subtitle': 'Acesse sua conta',
        'auth:cadastro.title': 'Criar conta',
        'auth:cadastro.subtitle': 'Cadastre-se',
        'auth:recuperar.title': 'Recuperar senha',
        'auth:recuperar.subtitle': 'Redefina sua senha',
      }
      return map[key] ?? key
    },
    i18n: { language: 'pt-BR', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

vi.mock('@/features/auth/viewModels/useAuthAnimation', async () => ({
  ...(await vi.importActual('@/features/auth/viewModels/useAuthAnimation')),
  useAuthAnimation: () => ({
    currentRoute: mockAuthPageState.currentRoute,
    previousRoute: null,
    animationKey: 'initial-/login',
    transitionConfig: mockTransitionConfig,
  }),
}))

vi.mock('@/features/auth/viewModels/useAuthPage', () => ({
  useAuthPage: () => mockAuthPageState,
}))

vi.mock('@/features/auth/views/components/LoginForm', () => ({
  default: () => <div data-testid="login-form">Login Form</div>,
}))

vi.mock('@/features/auth/views/components/CadastroForm', () => ({
  default: () => <div data-testid="cadastro-form">Cadastro Form</div>,
}))

vi.mock('@/features/auth/views/components/RecuperarSenhaForm', () => ({
  RecuperarSenhaForm: () => <div data-testid="recuperar-form">Recuperar Senha Form</div>,
}))

vi.mock('@/features/auth/views/components/AuthPainelBlue', () => ({
  AuthPainelBlue: ({ variant }: { variant: string }) => (
    <div data-testid="auth-painel" data-variant={variant} />
  ),
}))

vi.mock('@/features/auth/views/components/AuthFormContainer', () => ({
  AuthFormContainer: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div data-testid="auth-container">
      <h1 data-testid="auth-title">{title}</h1>
      {children}
    </div>
  ),
}))

function renderAuthPage() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthPage />
    </MemoryRouter>
  )
}

describe('AuthPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    renderAuthPage()
    expect(screen.getByTestId('login-form')).toBeInTheDocument()
  })

  it('renders Login form when isLogin is true', () => {
    renderAuthPage()
    expect(screen.getByTestId('login-form')).toBeInTheDocument()
    expect(screen.queryByTestId('cadastro-form')).not.toBeInTheDocument()
    expect(screen.queryByTestId('recuperar-form')).not.toBeInTheDocument()
  })

  it('renders Cadastro form when isCriar is true', () => {
    mockAuthPageState.isLogin = false
    mockAuthPageState.isCriar = true
    mockAuthPageState.isRecuperar = false
    mockAuthPageState.currentRoute = '/criar'

    renderAuthPage()
    expect(screen.getByTestId('cadastro-form')).toBeInTheDocument()
    expect(screen.queryByTestId('login-form')).not.toBeInTheDocument()
    expect(screen.queryByTestId('recuperar-form')).not.toBeInTheDocument()
  })

  it('renders RecuperarSenha form when isRecuperar is true', () => {
    mockAuthPageState.isLogin = false
    mockAuthPageState.isCriar = false
    mockAuthPageState.isRecuperar = true
    mockAuthPageState.currentRoute = '/recuperar'

    renderAuthPage()
    expect(screen.getByTestId('recuperar-form')).toBeInTheDocument()
    expect(screen.queryByTestId('login-form')).not.toBeInTheDocument()
    expect(screen.queryByTestId('cadastro-form')).not.toBeInTheDocument()
  })
})
