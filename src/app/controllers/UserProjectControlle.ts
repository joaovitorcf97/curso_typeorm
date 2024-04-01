import { Request, Response, Router } from 'express';
import UserProjectRepository from '../repositories/UserProjectRepository';

class UserProjectController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.createUserProject);
    this.router.get('/', this.getAllUserProject);
    this.router.get('/:id', this.getUserProject);
    this.router.put('/:id', this.updateUserProject);
    this.router.delete('/:id', this.deleteUserProject);
  }

  private async getAllUserProject(request: Request, response: Response) {
    const userProjects = await UserProjectRepository.getUserProjects();

    response.status(200).json(userProjects);
  }

  private async createUserProject(request: Request, response: Response) {
    const userProjectCreated = await UserProjectRepository.newUserProject(
      request.body,
    );

    response.status(201).json(userProjectCreated);
  }

  private async getUserProject(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const userproject = await UserProjectRepository.getUserProjectById(id);

    response.status(200).json(userproject);
  }

  private async updateUserProject(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const userProjectUpdated = await UserProjectRepository.updateUserProject(
      id,
      request.body,
    );

    response.status(200).json({ message: userProjectUpdated });
  }

  private async deleteUserProject(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const userProjectDeleted =
      await UserProjectRepository.removeUserProject(id);

    response.status(200).json({ message: userProjectDeleted });
  }
}

const userProjectRouter = new UserProjectController().router;

export default userProjectRouter;
