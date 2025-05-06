import axios from 'axios';

export interface InfoCognito {
  nome?: string;
  sexo?: string;
  email?: string;
  senha?: string;
  dataNasc?: string;
}

// Função para criar o usuário
export const createAccount = async (info: InfoCognito) => {

  const apiUrl = import.meta.env.VITE_API_URL;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Erro ao criar o usuário', error);
  }
}

export const login = async (info: InfoCognito) => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Erro ao fazer login', error);

    if (error.response) {
      // Se a resposta da API indicar um erro, exibe a mensagem de erro no toast
      const errorMessage = error.response?.data || 'Erro desconhecido ao tentar fazer login';

      // Lança o erro com mais informações (para depuração)
      throw new Error(`${errorMessage}`);
    } else if (error.request) {
      // Se não houve resposta do servidor
      throw new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      // Se o erro foi causado em algum outro lugar
      throw new Error(`Erro desconhecido ao tentar fazer login: ${error.message}`);
    }
  }
};


interface financeiroData{
  entrada: string;
}

export const setFinanceiroData = async (data: financeiroData) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  let userID;

  try {
    const user = sessionStorage.getItem('userData')
    if(user){
       userID = JSON.parse(user).id
    }
    const response = await axios.post(
      `${apiUrl}financeiro/${userID}`,
      {
        entrada: data.entrada,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Entrada adicionada com sucesso', response);
    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Erro ao adicionar entrada', error);

    if (error.response) {
      const errorMessage = error.response?.data || 'Erro desconhecido ao tentar adicionar entrada';

      throw new Error(`${errorMessage}`);
    } else if (error.request) {
      throw new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      throw new Error(`Erro desconhecido ao tentar adicionar entrada: ${error.message}`);
    }
  }
};