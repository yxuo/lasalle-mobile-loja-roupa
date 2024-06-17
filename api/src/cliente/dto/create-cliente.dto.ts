import { TipoCliente } from 'src/tipo-cliente/entities/tipo-cliente.entity';
import { DeepPartial } from 'typeorm';
import { ClienteStatusEnum } from '../enums/cliente-status.enum';

export class CreateClienteDto {
  tipo: DeepPartial<TipoCliente>;
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
