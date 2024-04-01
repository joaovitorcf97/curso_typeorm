import { ValidationErrorItem } from 'joi';
import { AppDataSource } from '../../database/dataSource';
import Projects from '../entities/Project';
import { IProjectOutput } from '../interfaces/IProjects';
import ErrorExtension from '../utils/ErrorExtension';
import projectSchemaValidation from '../utils/validations/projectsSchemaValidation';

class ProjectRepository {
  private static projectsRepository = AppDataSource.getRepository(Projects);

  static async getProjects(): Promise<IProjectOutput[]> {
    return await this.projectsRepository.find();
  }

  static async getProjectById(id: number): Promise<IProjectOutput | null> {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new ErrorExtension(404, 'Project not found.');
    }

    return project;
  }

  static async newProject(projec: Projects): Promise<IProjectOutput> {
    const { error } = projectSchemaValidation.validate(projec, {
      abortEarly: false,
    });

    if (error) {
      const validationsErrors = error.details.map(
        (error: ValidationErrorItem) => error.message,
      );

      throw new ErrorExtension(400, 'Error de validação', validationsErrors);
    }

    const createdProject = this.projectsRepository.save(projec);

    return createdProject;
  }

  static async removeProject(id: number): Promise<string> {
    await this.projectsRepository.delete(id);

    return 'Project removed successfully';
  }
}

export default ProjectRepository;
