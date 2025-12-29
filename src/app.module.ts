import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
