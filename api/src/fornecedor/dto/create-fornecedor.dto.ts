import { Fornecedor } from "../fornecedor.entity";

export class CreateFornecedorDto extends Fornecedor {
  nome: string;
  cnpj: string;
}
