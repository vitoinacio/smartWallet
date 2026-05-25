import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const userEmail = sessionStorage.getItem('UserProvider');
  const isLoggedIn = !!userEmail;

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return { isLoggedIn: false, userEmail: null };
  }
  return context;
}
