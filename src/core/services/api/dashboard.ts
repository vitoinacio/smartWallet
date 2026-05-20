/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { toast } from '@/components/ui/sonner';
import { DashboardData, ErrorResponse } from '@/core/models/DashboardTypes';

const getUserId = (): string => {
  const user = sessionStorage.getItem('userData');
  if (user) {
    return JSON.parse(user).id;
  }
  throw new Error('Usuário não encontrado');
};

export const getFinanceiro = async (): Promise<AxiosResponse<any>> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) throw new Error('API não definida');

  const userID = getUserId();
  const headers = { headers: { 'Content-Type': 'application/json' } };

  try {
    return await axios.get(`${apiUrl}financeiro?id=${userID}`, headers);
  } catch {
    toast.error('Erro desconhecido ao tentar encontrar entrada');
    throw new Error('Erro desconhecido ao tentar encontrar entrada');
  }
};

export const setDashboardData = async ({
  entrada,
}: DashboardData): Promise<void> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) throw new Error('API não definida');

  const userID = getUserId();
  const headers = { headers: { 'Content-Type': 'application/json' } };

  try {
    const { data } = await getFinanceiro();
    const exists = Array.isArray(data) && data.length > 0;

    if (exists) {
      await axios.put(`${apiUrl}financeiro/${userID}`, { entrada }, headers);
      toast.success('Entrada atualizada com sucesso!');
    } else {
      await axios.post(
        `${apiUrl}financeiro`,
        { idUsuarios: userID, entrada },
        headers,
      );
      toast.success('Entrada adicionada com sucesso!');
    }
  } catch (error: unknown) {
    console.error('Erro ao adicionar/atualizar entrada', error);

    const errorMessage =
      (error as ErrorResponse)?.response?.data ||
      (error as Error).message ||
      'Erro desconhecido ao tentar adicionar/atualizar entrada';

    toast.error(errorMessage);
  }
};