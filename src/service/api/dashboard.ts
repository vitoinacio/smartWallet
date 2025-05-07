/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import toast from '@/components/ui/sonner';
import { DashboardData, ErrorResponse, ShowToastProps } from '@/types/DashboardTypes';

const getUserId = (): string => {
  const user = sessionStorage.getItem('userData');
  if (user) {
    return JSON.parse(user).id;
  }
  throw new Error('Usuário não encontrado');
};

const showToast = ({ message, type, theme }: ShowToastProps) => {
  toast({
    title: message,
    position: 'bottom-right',
    type,
    autoClose: 3000,
    theme,
    hideProgressBar: false,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
  });
};

export const getFinanceiro = async (theme: 'light' | 'dark'): Promise<AxiosResponse<any>> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) throw new Error('API não definida');

  const userID = getUserId();
  const headers = { headers: { 'Content-Type': 'application/json' } };

  try {
    return await axios.get(`${apiUrl}financeiro?id=${userID}`, headers);
  } catch {
    showToast({ message: 'Erro desconhecido ao tentar encontrar entrada', type: 'error', theme });
    throw new Error('Erro desconhecido ao tentar encontrar entrada');
  }
};

export const setDashboardData = async ({
  entrada,
  theme,
}: DashboardData): Promise<void> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) throw new Error('API não definida');

  const userID = getUserId();
  const headers = { headers: { 'Content-Type': 'application/json' } };

  try {
    const { data } = await getFinanceiro(theme);
    const exists = Array.isArray(data) && data.length > 0;

    if (exists) {
      await axios.put(`${apiUrl}financeiro/${userID}`, { entrada }, headers);
      showToast({ message: 'Entrada atualizada com sucesso!', type: 'success', theme });
    } else {
      await axios.post(
        `${apiUrl}financeiro`,
        { idUsuarios: userID, entrada },
        headers,
      );
      showToast({ message: 'Entrada adicionada com sucesso!', type: 'success', theme });
    }
  } catch (error: unknown) {
    console.error('Erro ao adicionar/atualizar entrada', error);

    const errorMessage =
      (error as ErrorResponse)?.response?.data ||
      (error as Error).message ||
      'Erro desconhecido ao tentar adicionar/atualizar entrada';

    showToast({ message: errorMessage, type: 'error', theme });
  }
};