import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { ProjectModel } from 'generated/prisma/models';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import type { Request } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('authorId') authorId?: string,
  ): Promise<{
    data: ProjectModel[];
    total: number;
    page: number;
    limit: number;
  }> {
    const projects = await this.projectsService.getProjects(
      page,
      limit,
      authorId,
    );
    return projects;
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<ProjectModel> {
    const project = await this.projectsService.getProjectById(id);
    return project;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: Request,
  ): Promise<ProjectModel> {
    const user = req.user as { sub?: string } | undefined;
    const authorId = user?.sub ?? 'test-author-id';

    console.log('DATA', { user, authorId });

    const created = await this.projectsService.createProject(
      authorId,
      createProjectDto,
    );
    return created;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectModel> {
    const updated = await this.projectsService.updateProject(
      id,
      updateProjectDto,
    );
    return updated;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProjectModel> {
    const deleted = await this.projectsService.deleteProject(id);
    return deleted;
  }
}
