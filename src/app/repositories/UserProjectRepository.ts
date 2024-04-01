import { ValidationErrorItem } from 'joi';
import { AppDataSource } from '../../database/dataSource';
import UserProjects from '../entities/UserProject';
import {
  IUserProjectInput,
  IUserProjectOutput,
} from '../interfaces/IUserProject';
import ErrorExtension from '../utils/ErrorExtension';
import userProjectSchemaValidation from '../utils/validations/userProjectSchemaValidation';

class UserProjectRepository {
  private static userProjectRepository =
    AppDataSource.getRepository(UserProjects);

  static async getUserProjects(): Promise<IUserProjectInput[]> {
    return await this.userProjectRepository.find({
      relations: {
        users: true,
        projects: true,
      },
    });
  }

  static async getUserProjectById(
    id: number,
  ): Promise<IUserProjectOutput | null> {
    const userProject = await this.userProjectRepository.findOneBy({ id });

    if (!userProject) {
      throw new ErrorExtension(404, 'Project not found.');
    }

    return userProject;
  }

  static async newUserProject(
    userProject: UserProjects,
  ): Promise<IUserProjectOutput> {
    const { error } = userProjectSchemaValidation.validate(userProject, {
      abortEarly: false,
    });

    if (error) {
      const validationsErrors = error.details.map(
        (error: ValidationErrorItem) => error.message,
      );

      throw new ErrorExtension(400, 'Error de validação', validationsErrors);
    }

    const createdUserProject = this.userProjectRepository.save(userProject);

    return createdUserProject;
  }

  static async updateUserProject(
    userProjectId: number,
    userProject: IUserProjectInput,
  ): Promise<string> {
    const userProjectExist = await this.userProjectRepository.findOneBy({
      id: userProjectId,
    });

    if (!userProjectExist) {
      throw new ErrorExtension(404, 'User not found.');
    }

    await this.userProjectRepository.update(userProjectId, userProject);

    return 'User data was updated.';
  }

  static async removeUserProject(id: number): Promise<string> {
    await this.userProjectRepository.delete(id);

    return 'Project removed successfully';
  }
}

export default UserProjectRepository;
