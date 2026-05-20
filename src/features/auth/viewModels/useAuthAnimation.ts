import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import type { Variants } from 'framer-motion';
import { AuthRoute, isAuthRoute } from '../models/AuthTypes';

interface MotionPosition {
  x: number;
  y: number;
}

export interface AuthTransitionConfig {
  enter: MotionPosition;
  exit: MotionPosition;
}

interface UseAuthAnimationReturn {
  currentRoute: AuthRoute;
  previousRoute: AuthRoute | null;
  animationKey: string;
  transitionConfig: AuthTransitionConfig;
}

export function useAuthAnimation(): UseAuthAnimationReturn {
  const location = useLocation();
  const previousRouteRef = useRef<AuthRoute | null>(null);

  const currentRoute: AuthRoute = isAuthRoute(location.pathname)
    ? (location.pathname as AuthRoute)
    : '/login';

  const previousRoute = previousRouteRef.current;

  const transitionConfig = getTransitionConfig(previousRoute, currentRoute);

  useEffect(() => {
    previousRouteRef.current = currentRoute;
  }, [currentRoute]);

  return {
    currentRoute,
    previousRoute,
    animationKey: `${previousRoute ?? 'initial'}-${currentRoute}`,
    transitionConfig,
  };
}

function getTransitionConfig(
  previousRoute: AuthRoute | null,
  currentRoute: AuthRoute
): AuthTransitionConfig {
  const horizontalDistance = 120;
  const verticalDistance = 96;

  if (previousRoute === '/login' && currentRoute === '/criar') {
    return {
      enter: {
        x: horizontalDistance,
        y: 0,
      },
      exit: {
        x: -horizontalDistance,
        y: 0,
      },
    };
  }

  if (previousRoute === '/criar' && currentRoute === '/login') {
    return {
      enter: {
        x: -horizontalDistance,
        y: 0,
      },
      exit: {
        x: horizontalDistance,
        y: 0,
      },
    };
  }

  if (previousRoute === '/login' && currentRoute === '/recuperar') {
    return {
      enter: {
        x: 0,
        y: verticalDistance,
      },
      exit: {
        x: 0,
        y: -verticalDistance,
      },
    };
  }

  if (previousRoute === '/recuperar' && currentRoute === '/login') {
    return {
      enter: {
        x: 0,
        y: -verticalDistance,
      },
      exit: {
        x: 0,
        y: verticalDistance,
      },
    };
  }

  if (currentRoute === '/criar') {
    return {
      enter: {
        x: horizontalDistance,
        y: 0,
      },
      exit: {
        x: -horizontalDistance,
        y: 0,
      },
    };
  }

  if (currentRoute === '/recuperar') {
    return {
      enter: {
        x: 0,
        y: verticalDistance,
      },
      exit: {
        x: 0,
        y: -verticalDistance,
      },
    };
  }

  return {
    enter: {
      x: -horizontalDistance,
      y: 0,
    },
    exit: {
      x: horizontalDistance,
      y: 0,
    },
  };
}

export const authPageVariants: Variants = {
  initial: (config: AuthTransitionConfig) => ({
    opacity: 0,
    x: config.enter.x,
    y: config.enter.y,
    scale: 0.995,
  }),

  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  },

  exit: (config: AuthTransitionConfig) => ({
    opacity: 0,
    x: config.exit.x,
    y: config.exit.y,
    scale: 0.995,
  }),
};