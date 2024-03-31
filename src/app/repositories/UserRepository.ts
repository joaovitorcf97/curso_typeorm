import { AppDataSource } from '../../database/dataSource';
import User from '../entities/User';
import { IUserInput, IUserOutput } from '../interfaces/IUser';
import ErrorExtension from '../utils/ErrorExtension';

class UserRepository {
  private static usersRepository = AppDataSource.getRepository(User);

  static async getUsers(): Promise<IUserOutput[]> {
    return this.usersRepository.find();
  }

  static async newUser(user: IUserInput): Promise<IUserOutput> {
    const createdUser = await this.usersRepository.save(user);

    return createdUser;
  }

  static async getUser(userId: number): Promise<IUserOutput | null> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new ErrorExtension(404, 'User not found.');
    }

    return user;
  }

  static async updateUser(userId: number, user: IUserInput): Promise<string> {
    const userExist = await this.usersRepository.findOneBy({ id: userId });

    if (!userExist) {
      throw new ErrorExtension(404, 'User not found.');
    }

    await this.usersRepository.update(userId, user);

    return 'User data was updated.';
  }

  static async deleteUser(userId: number): Promise<string> {
    const userExist = await this.usersRepository.findOneBy({ id: userId });

    if (!userExist) {
      throw new ErrorExtension(404, 'User not found.');
    }

    await this.usersRepository.delete(userId);

    return 'User was deleted.';
  }
}

export default UserRepository;
