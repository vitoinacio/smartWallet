import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import LayoutApp from '@/core/components/LayoutApp';
import UserProvider from '@/core/viewModels/UserProvider';
import { AuthProvider, useAuth } from '@/core/viewModels/AuthContext';
import { NotFoundPage } from '@/features/not-found/views/NotFoundPage';

const Home = lazy(() => import('@/features/home/views/HomePage'));
const AuthPage = lazy(() => import('@/features/auth/views/AuthPage'));
const Dashboard = lazy(() => import('@/features/dashboard/views/DashboardPage'));
const Financeiro = lazy(() => import('@/features/financeiro/views/FinanceiroPage'));
const Metas = lazy(() => import('@/features/metas/views/MetasPage'));
const Extrato = lazy(() => import('@/features/extrato/views/ExtratoPage'));
const Settings = lazy(() => import('@/features/dashboard/views/SettingsPage'));
const TermosDeUso = lazy(() => import('@/features/pages-legais/views/TermosPage'));
const PoliticaPrivacidade = lazy(() => import('@/features/pages-legais/views/PrivacidadePage'));
const FaleConosco = lazy(() => import('@/features/pages-legais/views/FaleConoscoPage'));

function AuthRedirect({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
}

function ContentFallback() {
  return (
    <div className="w-full mt-6 px-4 lg:px-6 pb-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-36" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FullPageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-400" />
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
      <Routes>
        {/* Rotas publicas */}
        <Route path="/" element={<Suspense fallback={<FullPageFallback />}><Home /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<FullPageFallback />}><AuthRedirect><AuthPage /></AuthRedirect></Suspense>} />
        <Route path="/criar" element={<Suspense fallback={<FullPageFallback />}><AuthRedirect><AuthPage /></AuthRedirect></Suspense>} />
        <Route path="/recuperar" element={<Suspense fallback={<FullPageFallback />}><AuthRedirect><AuthPage /></AuthRedirect></Suspense>} />
        <Route path="/CreateAccount" element={<Suspense fallback={<FullPageFallback />}><AuthRedirect><AuthPage /></AuthRedirect></Suspense>} />
        <Route path="/termos" element={<Suspense fallback={<FullPageFallback />}><TermosDeUso /></Suspense>} />
        <Route path="/privacidade" element={<Suspense fallback={<FullPageFallback />}><PoliticaPrivacidade /></Suspense>} />
        <Route path="/fale-conosco" element={<Suspense fallback={<FullPageFallback />}><FaleConosco /></Suspense>} />

        {/* Rotas Privadas */}
        <Route
          path="/dashboard"
          element={
            <UserProvider>
              <LayoutApp children={<Suspense fallback={<ContentFallback />}><Dashboard /></Suspense>} />
            </UserProvider>
          }
        />
        <Route
          path="/financeiro"
          element={
            <UserProvider>
              <LayoutApp children={<Suspense fallback={<ContentFallback />}><Financeiro /></Suspense>} />
            </UserProvider>
          }
        />
        <Route
          path="/metas"
          element={
            <UserProvider>
              <LayoutApp children={<Suspense fallback={<ContentFallback />}><Metas /></Suspense>} />
            </UserProvider>
          }
        />
        <Route
          path="/extrato"
          element={
            <UserProvider>
              <LayoutApp children={<Suspense fallback={<ContentFallback />}><Extrato /></Suspense>} />
            </UserProvider>
          }
        />
        <Route
          path="/settings"
          element={
            <UserProvider>
              <LayoutApp children={<Suspense fallback={<ContentFallback />}><Settings /></Suspense>} />
            </UserProvider>
          }
        />

        {/* Rota 404 - catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </AuthProvider>
    </>
  );
};

export default AppRoutes;