export interface DashboardData {
  entrada: string;
  theme: 'light' | 'dark';
}

export interface ErrorResponse {
  response?: {
    data: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request?: any;
  message: string;
}

export interface ShowToastProps {
  message: string;
  type: 'success' | 'error';
  theme: 'light' | 'dark';
}

interface ResponseData {
  data_ent: string;
  entrada: string;
  id: number;
  idusuarios: number;
}

export interface Response {
    data: ResponseData[];
}
