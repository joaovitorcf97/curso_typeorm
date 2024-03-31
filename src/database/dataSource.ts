import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from '../app/entities/User';
import { CreateUsersTable1711858586395 } from './migrations/1711858586395-CreateUsersTable';
import { CreateSeedUsersTable1711860491430 } from './migrations/1711860491430-CreateSeedUsersTable';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'curso_typeorm',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [
    CreateUsersTable1711858586395,
    CreateSeedUsersTable1711860491430,
  ],
  subscribers: [],
});
