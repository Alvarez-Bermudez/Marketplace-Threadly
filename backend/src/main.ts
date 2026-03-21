import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';
import { HttpErrorFilter } from './common/middleware/http-error-filter.middleware';
import { ValidationErrorFilter } from './common/middleware/validation-error-filter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(express.static(path.join(__dirname, '..', 'uploads')));

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalFilters(new ValidationErrorFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
