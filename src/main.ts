import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/* import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'; */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*   const checkJwt = auth({
      audience: process.env.AUTH0_AUDIENCE,
      issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    }) */
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
bootstrap();
