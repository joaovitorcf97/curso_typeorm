import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CreateUsersTable1711858586395 } from './migrations/1711858586395-CreateUsersTable';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'curso_typeorm',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [CreateUsersTable1711858586395],
  subscribers: [],
});