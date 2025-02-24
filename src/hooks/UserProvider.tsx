import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  password: string;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Função para verificar se o usuário está logado
  const isLoggedIn = (): boolean => {
    const user = sessionStorage.getItem('UserProvider');
    if (user) {
      const parsedUser: User = JSON.parse(user);
      return !!parsedUser.email && !!parsedUser.password;
    }
    return false;
  };

  // Se o usuário não estiver logado, redireciona para a página de login
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  // Se o usuário estiver logado, renderiza o componente filho
  return <>{children}</>;
};

export default UserProvider;