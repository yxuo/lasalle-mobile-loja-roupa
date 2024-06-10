import { Module } from '@nestjs/common';
import { VendaController } from './venda.controller';
import { VendaService } from './venda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './venda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venda])],
  controllers: [VendaController],
  providers: [VendaService],
  exports: [VendaService],
})
export class VendaModule {}
