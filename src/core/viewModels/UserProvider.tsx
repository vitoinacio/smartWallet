import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const location = useLocation();
  const userEmail = sessionStorage.getItem('UserProvider');
  const isLoggedIn = !!userEmail;

  if (!isLoggedIn) {
    sessionStorage.setItem('redirectAfterLogin', location.pathname + location.search);
    return <Navigate to="/login" />;
  }

  return <AuthProvider>{children}</AuthProvider>;
};

export default UserProvider;
