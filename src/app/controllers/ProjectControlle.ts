import { Request, Response, Router } from 'express';
import authenticateMiddleware from '../middlewares/AuthMiddleware';
import ProjectRepository from '../repositories/ProjectRepository';

class ProjectController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.createProject);
    this.router.get('/', this.getAllProject);
    this.router.get('/:id', authenticateMiddleware, this.getProject);
    this.router.delete('/:id', this.deleteProject);
  }

  private async getAllProject(request: Request, response: Response) {
    const projects = await ProjectRepository.getProjects();

    response.status(200).json(projects);
  }

  private async createProject(request: Request, response: Response) {
    const projectCreated = await ProjectRepository.newProject(request.body);

    response.status(201).json(projectCreated);
  }

  private async getProject(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const project = await ProjectRepository.getProjectById(id);

    response.status(200).json(project);
  }

  private async deleteProject(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const projectDeleted = await ProjectRepository.removeProject(id);

    response.status(200).json({ message: projectDeleted });
  }
}

const projectRouter = new ProjectController().router;

export default projectRouter;
