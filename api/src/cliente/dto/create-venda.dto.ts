import { Cliente } from "../cliente.entity";

export class CreateVendaDto extends Cliente {
  id: number;
  nome: string;
  cpf: string;
  nascimento: Date;
  tipo: string;
  endereco: string;
  ativo: boolean;
  dataExclusao: Date;
}
