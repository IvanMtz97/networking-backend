import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  getProjects(): string {
    return 'Hello World Projects';
  }

  postProject(): string {
    return 'Hello World Post Projects';
  }
}
