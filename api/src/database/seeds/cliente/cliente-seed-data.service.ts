import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TipoCliente } from 'src/tipo-cliente/entities/tipo-cliente.entity';
import { TipoClienteEnum } from 'src/tipo-cliente/tipo-cliente.enum';
import { IClienteSeedData } from './cliente-seed-data.interface';
import { Cliente } from 'src/cliente/cliente.entity';
import { ClienteStatusEnum } from 'src/cliente/enums/cliente-status.enum';

@Injectable()
export class ClienteSeedDataService {
  nodeEnv = (): string => '';
  cpfSamples: string[] = [];
  cnpjSamples: string[] = [];

  constructor(private configService: ConfigService) {
    this.nodeEnv = () =>
      this.configService.getOrThrow('app.nodeEnv', { infer: true });
  }

  async getData(): Promise<IClienteSeedData[]> {
    return [
      {
        tipo: { id: TipoClienteEnum.admin },
        password: await Cliente.hashPassword('secret'),
        hash: '',
        status: ClienteStatusEnum.criado,
        nome: 'Ademar',
        email: 'admin@example.com',
        cpf: '',
        nascimento: new Date('1999-03-01'),
        endereco: '',
        ativo: true,
      },
      {
        tipo: { id: TipoClienteEnum.cliente },
        password: await Cliente.hashPassword('secret'),
        hash: '',
        status: ClienteStatusEnum.criado,
        nome: 'Cliente da Silva',
        email: 'cliente@example.com',
        cpf: '90176820000',
        nascimento: new Date('2000-05-01'),
        endereco: 'Rua ABC',
        ativo: true,
      },
      {
        tipo: { id: TipoClienteEnum.gerente },
        password: await Cliente.hashPassword('secret'),
        hash: '',
        status: ClienteStatusEnum.criado,
        nome: 'Gerente Costa',
        email: 'gerente@example.com',
        cpf: '45714771044',
        nascimento: new Date('2001-06-02'),
        endereco: 'Rua DEF',
        ativo: true,
      },
      {
        tipo: { id: TipoClienteEnum.funcionario },
        password: await Cliente.hashPassword('secret'),
        hash: '',
        status: ClienteStatusEnum.criado,
        nome: 'Funcionário Alves',
        email: 'funcionario@example.com',
        cpf: '75993388021',
        nascimento: new Date('2000-07-03'),
        endereco: 'Rua GHI',
        ativo: true,
      },
    ];
  }
}
