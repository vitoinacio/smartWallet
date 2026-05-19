import axios from 'axios';

export interface InfoCognito {
  nome?: string;
  sexo?: string;
  email?: string;
  senha?: string;
  dataNasc?: string;
}

// Usuário mockado para testes
const MOCK_USER = {
  email: 'teste@gmail.com',
  senha: 'teste123',
  nome: 'Usuário Teste',
  sexo: 'Masculino',
  dataNasc: '1990-01-01'
};

// Verifica se deve forçar uso de mock
const forceMock = import.meta.env.VITE_USE_MOCK === 'true';

export const createAccount = async (info: InfoCognito) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Usa mock forçado
  if (forceMock || !apiUrl) {
    console.log('Mock: Criando conta');
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
};

export const login = async (info: InfoCognito) => {
  // Se o usuário for o teste, sempre usa mock (funciona em qualquer ambiente)
  if (info.email === MOCK_USER.email && info.senha === MOCK_USER.senha) {
    console.log('Mock: Login do usuário teste realizado com sucesso');
    return { 
      status: 200, 
      data: { 
        message: 'Login realizado com sucesso (mock)',
        user: MOCK_USER 
      } 
    };
  }

  // Se não for usuário teste, tenta usar mock forçado ou API
  if (forceMock || !import.meta.env.VITE_API_URL) {
    // Usuário não é o teste e está em modo mock
    throw new Error('Credenciais inválidas');
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