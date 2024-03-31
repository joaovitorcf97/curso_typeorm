import { MigrationInterface } from 'typeorm';
import User from '../../app/entities/User';
import { AppDataSource } from '../dataSource';
import userSeed from '../seeders/UserSeed';

export class CreateSeedUsersTable1711860491430 implements MigrationInterface {
  public async up(): Promise<void> {
    const usersRepository = AppDataSource.getRepository(User);
    await usersRepository.save(userSeed);
  }

  public async down(): Promise<void> {}
}
