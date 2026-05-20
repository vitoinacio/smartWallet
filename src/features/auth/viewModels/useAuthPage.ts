import { useLocation, useNavigate } from 'react-router-dom';
import { AuthRoute, isAuthRoute } from '../models/AuthTypes';

export function useAuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute: AuthRoute = isAuthRoute(location.pathname)
    ? location.pathname as AuthRoute
    : '/login';

  const isLogin = currentRoute === '/login';
  const isCriar = currentRoute === '/criar';
  const isRecuperar = currentRoute === '/recuperar';

  const goToLogin = () => navigate('/login');
  const goToCriar = () => navigate('/criar');
  const goToRecuperar = () => navigate('/recuperar');

  return {
    currentRoute,
    isLogin,
    isCriar,
    isRecuperar,
    goToLogin,
    goToCriar,
    goToRecuperar,
  };
}