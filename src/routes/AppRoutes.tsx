import LayoutApp from '@/core/components/LayoutApp';
import Home from '@/features/home/views/HomePage';
import Dashboard from '@/features/dashboard/views/DashboardPage';
import Financeiro from '@/features/financeiro/views/FinanceiroPage';
import Settings from '@/features/dashboard/views/SettingsPage';
import Cadastro from '@/features/auth/views/CadastroPage';
import Login from '@/features/auth/views/LoginPage';
import TermosDeUso from '@/features/pages-legais/views/TermosPage';
import PoliticaPrivacidade from '@/features/pages-legais/views/PrivacidadePage';
import FaleConosco from '@/features/pages-legais/views/FaleConoscoPage';
import { Route, Routes } from 'react-router-dom';
import UserProvider from '@/core/viewModels/UserProvider';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas publicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/CreateAccount" element={<Cadastro />} />
      <Route path="/termos" element={<TermosDeUso />} />
      <Route path="/privacidade" element={<PoliticaPrivacidade />} />
      <Route path="/fale-conosco" element={<FaleConosco />} />

      {/* Rotas Privadas */}
      <Route
        path="/dashboard"
        element={
          <UserProvider>
            <LayoutApp children={<Dashboard />} />
          </UserProvider>
        }
      />
      <Route
        path="/financeiro"
        element={
          <UserProvider>
            <LayoutApp children={<Financeiro />} />
          </UserProvider>
        }
      />
      <Route
        path="/settings"
        element={
          <UserProvider>
            <LayoutApp children={<Settings />} />
          </UserProvider>
        }
      />
    </Routes>
  );
};

export default AppRoutes;