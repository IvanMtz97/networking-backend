import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';
import { ProjectModel } from 'generated/prisma/models';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  getProjects(): string {
    return this.projectsService.getProjects();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createProjectDto: any): Promise<ProjectModel> {
    return this.projectsService.createProject(createProjectDto);
  }
}
