import { Debitos, InfoDebitoTypes } from '@/types/DebitosTypes';
import axios from 'axios';

export const getDebitosData = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response: InfoDebitoTypes = await axios.get(`${apiUrl}debitos`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Erro ao buscar dados do Debito', error);

    if (error.response) {
      const errorMessage =
        error.response?.data ||
        'Erro desconhecido ao buscar os dados dos debitos';

      throw new Error(`${errorMessage}`);
    } else if (error.request) {
      throw new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      throw new Error(
        `Erro desconhecido ao tentar buscar os dados dos Debitos: ${error.message}`,
      );
    }
  }
};

export const setDebitosData = async (info: Debitos) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  let userID;

  try {
    const user = sessionStorage.getItem('userData');
    if (user) {
      userID = JSON.parse(user).id;
    }
    const response = await axios.post(
      `${apiUrl}debitos/${userID}`,
      {
        identificacao: info.title,
        dataVenc: info.data,
        observacao: info.obs || '',
        valor: info.valor,
        notificacao: info.notifi,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Dados do Debitos enviados com sucesso', response);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Erro ao enviar dados do Debito', error);

    if (error.response) {
      const errorMessage =
        error.response?.data ||
        'Erro desconhecido ao tentar enviar os dados Debito';

      throw new Error(`${errorMessage}`);
    } else if (error.request) {
      throw new Error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      throw new Error(
        `Erro desconhecido ao tentar enviar os dados do Debito: ${error.message}`,
      );
    }
  }
};
