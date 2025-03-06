import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Função para verificar se o usuário está logado
  const isLoggedIn = (): boolean => {
    const user = sessionStorage.getItem('UserProvider');
    // Verifica se o email existe no sessionStorage
    return !!user;
  };

  // Se o usuário não estiver logado, redireciona para a página de login
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  // Se o usuário estiver logado, renderiza o componente filho
  return <>{children}</>;
};

export default UserProvider;