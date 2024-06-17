import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCliente } from 'src/tipo-cliente/entities/tipo-cliente.entity';
import { TipoClienteSeedService } from './tipo-cliente-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoCliente])],
  providers: [TipoClienteSeedService],
  exports: [TipoClienteSeedService],
})
export class TipoClienteSeedModule {}
