import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { ProjectsModule } from './projects/projects.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [ProjectsModule, AuthzModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
