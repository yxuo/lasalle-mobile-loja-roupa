import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteSeedDataService } from './cliente-seed-data.service';
import { ClienteSeedService } from './cliente-seed.service';
import { ConfigModule } from '@nestjs/config';
import { Cliente } from 'src/cliente/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), ConfigModule],
  providers: [ClienteSeedService, ClienteSeedDataService],
  exports: [ClienteSeedService, ClienteSeedDataService],
})
export class ClienteSeedModule {}
