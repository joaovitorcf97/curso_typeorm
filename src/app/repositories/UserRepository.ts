import { AppDataSource } from '../../database/dataSource';
import User from '../entities/User';

class UserRepository {
  private static usersRepository = AppDataSource.getRepository(User);

  static async getUsers() {
    return this.usersRepository.find();
  }
}

export default UserRepository;
