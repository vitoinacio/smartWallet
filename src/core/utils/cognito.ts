import axios from 'axios';

export interface InfoCognito {
  nome?: string;
  sexo?: string;
  email?: string;
  senha?: string;
  dataNasc?: string;
}

// Usuário mockado para testes em desenvolvimento
const MOCK_USER = {
  email: 'teste@gmail.com',
  senha: 'teste123',
  nome: 'Usuário Teste',
  sexo: 'Masculino',
  dataNasc: '1990-01-01'
};

// Verifica se está em modo de desenvolvimento
const isDev = import.meta.env.DEV;

export const createAccount = async (info: InfoCognito) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Mock em desenvolvimento
  if (isDev) {
    console.log('Mock: Criando conta em modo desenvolvimento');
    return { status: 200, data: { message: 'Conta criada com sucesso (mock)' } };
  }

  try {
    const response = await axios.post(
      `${apiUrl}users`,
      {
        nome: info.nome,
        sexo: info.sexo,
        email: info.email,
        senha: info.senha,
        dataNasc: info.dataNasc,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Usuário criado com sucesso', response);
    return response;
  } catch (error: any) {
    console.error('Erro ao criar o usuário', error);
  }
}

export const login = async (info: InfoCognito) => {
  // Mock em desenvolvimento - verificar credenciais
  if (isDev) {
    if (info.email === MOCK_USER.email && info.senha === MOCK_USER.senha) {
      console.log('Mock: Login realizado com sucesso');
      return { 
        status: 200, 
        data: { 
          message: 'Login realizado com sucesso (mock)',
          user: MOCK_USER 
        } 
      };
    }
    // Simular erro para credenciais incorretas em dev
    throw new Error('Credenciais inválidas (modo desenvolvimento)');
  }

  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.post(
      `${apiUrl}login`,
      {
        email: info.email,
        senha: info.senha,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Login realizado', response);
    return response;
  } catch (error: any) {
    console.error('Erro ao fazer login', error);

    if (error.response) {
      const errorMessage = error.response?.data || 'Erro desconhecido ao tentar fazer login';
      throw new Error(`${errorMessage}`);
    } else if (error.request) {
      throw new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      throw new Error(`Erro desconhecido ao tentar fazer login: ${error.message}`);
    }
  }
};