import LayoutApp from '@/components/layout/containers/LayoutApp';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Financeiro from '@/pages/Financeiro';
import Settings from '@/pages/Settings';
import Cadastro from '@/pages/Cadastro';
import Login from '@/pages/Login';
import { Route, Routes } from 'react-router-dom';
import UserProvider from '@/hooks/UserProvider';
import LayoutIndex from '@/components/layout/containers/LayoutIndex';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas publicas */}
      <Route path="/" element={<Home />} />
      <Route
        path="/cadastro"
        element={
          <LayoutIndex>
            <Cadastro />
          </LayoutIndex>
        }
      />
      <Route
        path="/login"
        element={
          <LayoutIndex>
            <Login />
          </LayoutIndex>
        }
      />

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
