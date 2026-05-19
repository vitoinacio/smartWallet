export interface Debitos {
  title: string;
  valor: string;
  data: string;
  notifi: boolean;
  obs: string;
}

export interface InfoDebitoTypes {
  data: DataInfoDebitoType[];
}

export interface DataInfoDebitoType {
  id_deb: number;
  identificacao: string;
  observacao: string;
  valor: string;
  datavenc: string;
  idusuarios: number;
  notificacao: boolean;
  notificacao_enviada: boolean;
  pago: boolean;
}
