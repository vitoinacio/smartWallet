import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const location = useLocation();

  const isLoggedIn = (): boolean => {
    const user = sessionStorage.getItem('UserProvider');
    return !!user;
  };

  if (!isLoggedIn()) {
    sessionStorage.setItem('redirectAfterLogin', location.pathname + location.search);
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default UserProvider;