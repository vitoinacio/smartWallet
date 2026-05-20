export type AuthRoute = '/login' | '/criar' | '/recuperar';

export type AnimationDirection = 'horizontal' | 'vertical';

export interface RouteTransition {
  direction: AnimationDirection;
  from: AuthRoute;
  to: AuthRoute;
}

export const AUTH_ROUTES: AuthRoute[] = ['/login', '/criar', '/recuperar'];

export function isAuthRoute(pathname: string): pathname is AuthRoute {
  return AUTH_ROUTES.includes(pathname as AuthRoute);
}

export function getRouteIndex(route: AuthRoute): number {
  return AUTH_ROUTES.indexOf(route);
}