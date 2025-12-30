import { Injectable } from '@nestjs/common';
import PrismaClient from '../prisma';
import { ProjectCreateInput, ProjectModel } from 'generated/prisma/models';

@Injectable()
export class ProjectsService {
  getProjects(): string {
    return 'Hello World Projects';
  }

  async createProject(project: ProjectCreateInput): Promise<ProjectModel> {
    const createdProject = await PrismaClient.project.create({
      data: project,
    });

    return createdProject;
  }
}
