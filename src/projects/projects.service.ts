import { Injectable, NotFoundException } from '@nestjs/common';
import PrismaClient from '../prisma';
import { ProjectModel } from 'generated/prisma/models';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  async getProjects(
    page = 0,
    limit = 10,
    authorId?: string,
  ): Promise<{
    data: ProjectModel[];
    total: number;
    page: number;
    limit: number;
  }> {
    const safePage = page < 0 ? 0 : page;
    const safeLimit = limit > 0 ? limit : 10;

    const [data, total] = await Promise.all([
      PrismaClient.project.findMany({
        skip: safePage * safeLimit,
        take: safeLimit,
        orderBy: { createdAt: 'desc' },
        where: authorId ? { authorId } : undefined,
      }),
      PrismaClient.project.count({
        where: authorId ? { authorId } : undefined,
      }),
    ]);

    return { data, total, page: safePage, limit: safeLimit };
  }

  async getProjectById(id: string): Promise<ProjectModel> {
    const project = await PrismaClient.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }

    return project;
  }

  async createProject(
    authorId: string,
    dto: CreateProjectDto,
  ): Promise<ProjectModel> {
    return PrismaClient.project.create({
      data: {
        ...dto,
        authorId,
      },
    });
  }

  async updateProject(
    id: string,
    dto: UpdateProjectDto,
  ): Promise<ProjectModel> {
    await this.ensureExists(id);

    return PrismaClient.project.update({
      where: { id },
      data: dto,
    });
  }

  async deleteProject(id: string): Promise<ProjectModel> {
    await this.ensureExists(id);

    return PrismaClient.project.delete({
      where: { id },
    });
  }

  private async ensureExists(id: string): Promise<void> {
    const exists = await PrismaClient.project.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }
  }
}
