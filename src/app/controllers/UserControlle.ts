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
  }

  private async getAllUsers(request: Request, response: Response) {
    const users = await UserRepository.getUsers();

    response.status(200).json(users);
  }
}

const userRouter = new UserController().router;

export default userRouter;
