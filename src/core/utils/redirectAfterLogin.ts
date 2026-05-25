const AUTH_ROUTES = ['/login', '/criar', '/recuperar', '/CreateAccount'];

export function getRedirectAfterLogin(): string {
  const saved = sessionStorage.getItem('redirectAfterLogin');
  sessionStorage.removeItem('redirectAfterLogin');

  if (saved && !AUTH_ROUTES.includes(saved)) {
    return saved;
  }

  return '/dashboard';
}
