export interface Usuario {
  nome: string;
  cpf: string;
  tipo: TipoUsuario;
  endereco?: Endereco;
}

export interface Endereco {
  cep: string;
  complemento: string;
  numero: number;
  rua: string;
  uf: string;
}

export type TipoUsuario = 'cliente' | 'funcionario' | 'gerente';
