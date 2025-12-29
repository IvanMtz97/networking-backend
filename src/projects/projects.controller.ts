import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  getProjects(): string {
    return this.projectsService.getProjects();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  postProject(): string {
    return this.projectsService.postProject();
  }
}
