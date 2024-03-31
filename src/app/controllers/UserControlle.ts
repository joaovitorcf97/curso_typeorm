import { Request, Response, Router } from 'express';
import UserRepository from '../repositories/UserRepository';

class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.getAllUsers);
    this.router.post('/', this.createUser);
    this.router.get('/:id', this.getUser);
    this.router.put('/:id', this.updateUser);
    this.router.delete('/:id', this.deleteUser);
  }

  private async getAllUsers(request: Request, response: Response) {
    const users = await UserRepository.getUsers();

    response.status(200).json(users);
  }

  private async createUser(request: Request, response: Response) {
    const userCreated = await UserRepository.newUser(request.body);

    response.status(201).json(userCreated);
  }

  private async getUser(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const userCreated = await UserRepository.getUser(id);

    response.status(200).json(userCreated);
  }

  private async updateUser(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const userUpdated = await UserRepository.updateUser(id, request.body);

    response.status(200).json({ message: userUpdated });
  }

  private async deleteUser(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const userDeleted = await UserRepository.deleteUser(id);

    response.status(200).json({ message: userDeleted });
  }
}

const userRouter = new UserController().router;

export default userRouter;
