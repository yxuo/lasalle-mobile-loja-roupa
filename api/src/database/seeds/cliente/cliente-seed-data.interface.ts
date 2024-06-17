import { ClienteStatusEnum } from 'src/cliente/enums/cliente-status.enum';
import { TipoCliente } from 'src/tipo-cliente/entities/tipo-cliente.entity';
import { DeepPartial } from 'typeorm';

export interface IClienteSeedData {
  id?: number;
  role: DeepPartial<TipoCliente>;
  password: string;
  hash: string;
  status: ClienteStatusEnum;
  nome: string;
  email: string;
  cpf: string;
  nascimento: Date;
  endereco: string;
  ativo: boolean;
  dataExclusao?: Date;
}
