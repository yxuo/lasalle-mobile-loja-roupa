import { Module } from '@nestjs/common';
import { ItemVendaController } from './item-venda.controller';
import { ItemVendaService } from './item-venda.service';

@Module({
  controllers: [ItemVendaController],
  providers: [ItemVendaService]
})
export class ItemVendaModule { }
