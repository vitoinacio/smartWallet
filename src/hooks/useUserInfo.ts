import { useState, useEffect } from 'react';
import User from "@/utils/User";

interface UserData {
  id: number;
  nome: string;
  sexo: string;
  datanasc: string;
  email: string;
  senha: string;
  cpf: string | null;
  tel: string | null;
  cep: string | null;
  cidade: string | null;
  bairro: string | null;
  rua: string | null;
  numerocasa: string | null;
  foto: string | null;
  dtcriacao: string;
  twofa: boolean;
}

const useUserInfo = (): { userData: UserData | null; loading: boolean } => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    // Verifica se os dados do usuário já estão no sessionStorage
    const cachedUserData = sessionStorage.getItem('userData');
    if (cachedUserData) {
      // Se os dados já estiverem no cache, usa eles
      setUserData(JSON.parse(cachedUserData));
      setLoading(false);
      return;
    }

    try {
      const userData = await User();
      const userDataFetched = userData[0];
      
      // Armazena os dados no sessionStorage para uso futuro
      sessionStorage.setItem('userData', JSON.stringify(userDataFetched));

      setUserData(userDataFetched);
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        console.error('Erro ao buscar dados do usuário:', error.message);
      } else {
        console.error('Erro desconhecido ao buscar dados do usuário');
      }
    }
  };

  useEffect(() => {
    // Apenas chama a função de buscar os dados uma vez
    fetchUserData();
  }, []); // O array vazio garante que o efeito é executado apenas uma vez

  return { userData, loading };
};

export default useUserInfo;
