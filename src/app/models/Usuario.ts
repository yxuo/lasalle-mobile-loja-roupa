export class Usuario {
  nome: string = '';
  cpf: string = '';
  tipo: TipoUsuario = 'cliente';
  endereco?: Endereco;
}

export class Endereco {
  cep: string = '';
  complemento: string = '';
  numero: number = 0;
  rua: string = '';
  uf: string = '';
}

export type TipoUsuario = 'cliente' | 'funcionario' | 'gerente';
