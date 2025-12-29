import { Controller, Get, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  getProjects(): string {
    return this.projectsService.getProjects();
  }

  @Post()
  postProject(): string {
    return this.projectsService.postProject();
  }
}
