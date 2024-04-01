import bcrypt from 'bcrypt';
import { ValidationErrorItem } from 'joi';
import { AppDataSource } from '../../database/dataSource';
import User from '../entities/User';
import { ILogin } from '../interfaces/ILogin';
import { IUserInput, IUserOutput } from '../interfaces/IUser';
import Auth from '../utils/Auth';
import ErrorExtension from '../utils/ErrorExtension';
import userSchemaValidation from '../utils/validations/userSchemaValidation';

class UserRepository {
  private static usersRepository = AppDataSource.getRepository(User);

  static async getUsers(): Promise<IUserOutput[]> {
    const users = await this.usersRepository.find();

    return users.map(({ password, ...user }) => user);
  }

  static async newUser(user: IUserInput): Promise<IUserOutput> {
    const { error } = userSchemaValidation.validate(user, {
      abortEarly: false,
    });

    if (error) {
      const validationsErrors = error.details.map(
        (error: ValidationErrorItem) => error.message,
      );

      throw new ErrorExtension(400, 'Error de validação', validationsErrors);
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    const createdUser = await this.usersRepository.save(user);

    const { password, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  static async getUser(userId: number): Promise<IUserOutput | null> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new ErrorExtension(404, 'User not found.');
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  static async updateUser(userId: number, user: IUserInput): Promise<string> {
    const userExist = await this.usersRepository.findOneBy({ id: userId });

    if (!userExist) {
      throw new ErrorExtension(404, 'User not found.');
    }

    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      user.password = hashedPassword;
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

  static async getUserByEmail(email: string): Promise<IUserOutput | null> {
    return this.usersRepository.findOneBy({ email });
  }

  static async auth(loginData: ILogin): Promise<string> {
    const { email, password } = loginData;

    if (!email || !password) {
      throw new ErrorExtension(401, 'Email and password are required.');
    }

    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new ErrorExtension(401, 'Invalid credential.');
    }

    if (password) {
      const passwordVerification = bcrypt.compare(password, user.password!);

      if (!passwordVerification) {
        throw new ErrorExtension(401, 'Invalid credential.');
      }
    }

    const payload = {
      name: user.name,
      email: user.email,
    };

    const tokenGenerator = new Auth();
    const token = tokenGenerator.jwtGenerator(payload);

    return token;
  }
}

export default UserRepository;
