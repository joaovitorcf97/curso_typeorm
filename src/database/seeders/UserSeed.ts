import { IUserInput } from '../../app/interfaces/IUser';

const userSeed: IUserInput = {
  name: 'John Doe',
  email: 'john@gmail.com',
  password: '123456',
  birth_date: new Date('1998-03-12'),
  active: true,
};

export default userSeed;
