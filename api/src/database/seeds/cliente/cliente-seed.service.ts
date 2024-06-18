import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { Repository } from 'typeorm';
import { ClienteSeedDataService } from './cliente-seed-data.service';

@Injectable()
export class ClienteSeedService {
  private logger = new Logger('UserSeedService', { timestamp: true });
  private newUsers: any[] = [];

  constructor(
    @InjectRepository(Cliente)
    private clienteSeedRepository: Repository<Cliente>,
    private clienteSeedDataService: ClienteSeedDataService,
  ) {}

  async validateRun() {
    // return global.force || (await this.clienteSeedRepository.count()) === 0;
    return Promise.resolve(true);
  }

  async run() {
    const userFixtures = await this.clienteSeedDataService.getData();
    for (const newCliente of userFixtures) {
      const existing = await this.clienteSeedRepository.findOne({
        where: {
          email: newCliente.email,
        },
      });
      let created: Cliente | undefined = undefined;
      if (existing) {
        await this.clienteSeedRepository.save({
          ...newCliente,
          id: existing.id,
          email: existing.email,
        });
      } else {
        created = await this.clienteSeedRepository.save(newCliente);
      }
      newCliente.hash = await this.generateHash();
      this.pushNewUser(existing, created);
    }

    if (this.newUsers.length) {
      this.printResults();
    } else {
      this.logger.log('No new users changed.');
    }
  }

  pushNewUser(existing: Cliente | null, created: Cliente) {
    const upserted = existing || created;
    this.newUsers.push({
      status: existing ? 'updated' : 'created',
      nome: upserted.nome,
      email: upserted.email,
      cpf: upserted.cpf,
      hashedPassword: upserted.password,
    });
  }

  printResults() {
    this.logger.log('NEW USERS:');
    this.logger.warn(
      'The passwords shown are always new but if user exists the current password in DB wont be updated.\n' +
        'Save these passwords in the first run or remove these users before seed',
    );
    for (const item of this.newUsers) {
      this.logger.log(item);
    }
  }

  async generateHash(): Promise<string> {
    let hash = Cliente.generateHash();
    while (await this.clienteSeedRepository.findOne({ where: { hash } })) {
      hash = Cliente.generateHash();
    }
    return hash;
  }
}
