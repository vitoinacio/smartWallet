import axios, { AxiosError } from 'axios';

export interface InfoCognito {
  nome?: string;
  sexo?: string;
  email?: string;
  senha?: string;
  dataNasc?: string;
}

export interface ApiResponse {
  status: number;
  data: {
    message: string;
    user?: typeof MOCK_USER;
  };
}

export interface CognitoError {
  message: string;
  response?: {
    data?: string;
  };
}

const MOCK_USER = {
  email: 'teste@gmail.com',
  senha: 'teste123',
  nome: 'Usuário Teste',
  sexo: 'Masculino',
  dataNasc: '1990-01-01'
} as const;

const forceMock = import.meta.env.VITE_USE_MOCK === 'true';

export const createAccount = async (info: InfoCognito): Promise<ApiResponse> => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (forceMock || !apiUrl) {
    console.log('Mock: Criando conta');
    return { status: 200, data: { message: 'Conta criada com sucesso (mock)' } };
  }

  try {
    const response = await axios.post<{ message: string }>(
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
    return { status: response.status, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error('Erro ao criar o usuário', axiosError.message);
    return { status: 500, data: { message: axiosError.message } };
  }
};

export const login = async (info: InfoCognito): Promise<ApiResponse> => {
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

  if (forceMock || !import.meta.env.VITE_API_URL) {
    throw new Error('Credenciais inválidas');
  }

  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.post<{ message?: string }>(
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
    return { status: response.status, data: { message: response.data?.message || 'Login realizado' } };
  } catch (error) {
    const axiosError = error as AxiosError<CognitoError>;
    
    if (axiosError.response?.data) {
      const errorMessage = axiosError.response.data?.message || 'Erro desconhecido ao tentar fazer login';
      throw new Error(`${errorMessage}`);
    } else if (axiosError.request) {
      throw new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      throw new Error(`Erro desconhecido ao tentar fazer login: ${axiosError.message}`);
    }
  }
};