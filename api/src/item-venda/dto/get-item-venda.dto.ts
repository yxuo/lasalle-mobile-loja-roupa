import { Produto } from 'src/produto/produto.entity';
import { ItemVenda } from '../item-venda.entity';
import { Venda } from 'src/venda/venda.entity';

export class GetItemVendaDto implements ItemVenda {
  id: number;
  precoUnitario: number;
  quantidade: number;
  produto: Produto;
  venda: Venda;
}
