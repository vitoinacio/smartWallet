import axios from 'axios';

const isDev = import.meta.env.DEV;

const MOCK_USER_DATA = [
  {
    id: 1,
    nome: 'Usuário Teste',
    sexo: 'Masculino',
    datanasc: '1990-01-01',
    email: 'teste@gmail.com',
    senha: 'teste123',
    cpf: null,
    tel: null,
    cep: null,
    cidade: null,
    bairro: null,
    rua: null,
    numerocasa: null,
    foto: null,
    dtcriacao: '2025-01-01',
    twofa: false
  }
];

const User = async () => {
  const userEmail = sessionStorage.getItem('UserProvider');
  
  if (!userEmail) {
    throw new Error('Email do usuário não encontrado no sessionStorage.');
  }

  // Mock em desenvolvimento
  if (isDev) {
    if (userEmail === 'teste@gmail.com') {
      return MOCK_USER_DATA;
    }
    throw new Error('Usuário não encontrado (modo desenvolvimento)');
  }

  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.get(`${apiUrl}users?email=${userEmail}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao buscar informações do usuário:', error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data || 'Erro desconhecido ao buscar as informações';
      throw new Error(`${errorMessage}`);
    } else if (error instanceof Error) {
      throw new Error(`Erro desconhecido: ${error.message}`);
    } else {
      throw new Error('Erro desconhecido ao tentar buscar as informações.');
    }
  }
};

export default User;