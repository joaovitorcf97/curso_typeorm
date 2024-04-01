import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Address from '../app/entities/Address';
import Projects from '../app/entities/Project';
import User from '../app/entities/User';
import UserProjects from '../app/entities/UserProject';
import { CreateUsersTable1711858586395 } from './migrations/1711858586395-CreateUsersTable';
import { CreateSeedUsersTable1711860491430 } from './migrations/1711860491430-CreateSeedUsersTable';
import { CreateAddressTable1711992892829 } from './migrations/1711992892829-CreateAddressTable';
import { CreateProjectTable1711996423573 } from './migrations/1711996423573-CreateProjectTable';
import { CreateUserProjectTable1711996436195 } from './migrations/1711996436195-CreateUserProjectTable';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'curso_typeorm',
  synchronize: true,
  logging: false,
  entities: [User, Address, Projects, UserProjects],
  migrations: [
    CreateUsersTable1711858586395,
    CreateSeedUsersTable1711860491430,
    CreateAddressTable1711992892829,
    CreateProjectTable1711996423573,
    CreateUserProjectTable1711996436195,
  ],
  subscribers: [],
});
