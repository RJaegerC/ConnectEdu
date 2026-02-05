import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:8080'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // permite cookies e headers Authorization
  });

  await app.listen(3000);
}
bootstrap();
