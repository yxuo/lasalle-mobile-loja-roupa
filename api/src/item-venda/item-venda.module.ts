import { Module } from '@nestjs/common';
import { ItemVendaController } from './item-venda.controller';
import { ItemVendaService } from './item-venda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemVenda } from './item-venda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemVenda])],
  controllers: [ItemVendaController],
  providers: [ItemVendaService],
  exports: [ItemVendaService],
})
export class ItemVendaModule { }
