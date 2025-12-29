import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { ProtectedMiddleware } from "../protected.middleware";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectedMiddleware).forRoutes('projects');
  }
}
