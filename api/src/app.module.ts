import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendaModule } from './venda/venda.module';
import { ItemVendaModule } from './item-venda/item-venda.module';

@Module({
  imports: [
    ProdutoModule,
    FornecedorModule,
    VendaModule,
    ItemVendaModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
