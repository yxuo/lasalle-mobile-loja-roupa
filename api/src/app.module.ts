import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';

@Module({
  imports: [ProdutoModule, FornecedorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
