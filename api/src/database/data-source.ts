import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
console.log('*************PASSWORD***************');
console.log(process.env.DATABASE_PASSWORD);

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  dropSchema: false,
  keepConnectionAlive: true,
  logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);
