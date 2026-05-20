export interface DashboardData {
  entrada: string;
}

export interface ErrorResponse {
  response?: {
    data: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request?: any;
  message: string;
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