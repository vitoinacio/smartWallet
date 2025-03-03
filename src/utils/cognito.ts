import axios from 'axios';

export interface InfoCognito {
  nome: string;
  sexo: string;
  email: string;
  senha: string;
  dataNasc: string;
  cpf: string;
  tel: string;
  cep: string;
  cidade: string;
  bairro: string;
  rua: string;
  numeroCasa: string;
}

export const createAccount = (info: InfoCognito) =>
  axios({
    method: 'post',
    url: process.env.DATABASE_URL,
    headers: {
      'Content-Type': `application/json`,
    },
    data: {
        nome: info.nome,
        sexo: info.sexo,
        email: info.email,
        senha: info.senha,
        dataNasc: info.dataNasc,
        cpf: info.cpf,
        tel: info.tel,
        cep: info.cep,
        cidade: info.cidade,
        bairro: info.bairro,
        rua: info.rua,
        numeroCasa: info.numeroCasa
    },
  });
