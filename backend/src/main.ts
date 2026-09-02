import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3001);
  const apiPrefix = configService.get<string>('app.apiPrefix', 'api/v1');
  const corsOrigins = configService.get<string[]>('app.corsOrigins', [
    'http://localhost:3000',
  ]);
  const swaggerEnabled = configService.get<boolean>('app.swaggerEnabled', true);
  const swaggerPath = configService.get<string>('app.swaggerPath', 'docs');

  app.use(helmet());

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.setGlobalPrefix(apiPrefix, { exclude: ['health'] });

  if (swaggerEnabled) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('AGRONEX API')
      .setDescription(
        'API Backend da plataforma AGRONEX — comercialização e gestão de produtos agrícolas.',
      )
      .setVersion('0.1.0')
      .addBearerAuth()
      .addTag('Health', 'Verificação de saúde dos serviços')
      .addTag('Auth', 'Autenticação e autorização')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(swaggerPath, app, document, {
      swaggerOptions: { persistAuthorization: true },
    });

    logger.log(`Swagger disponível em http://localhost:${port}/${swaggerPath}`);
  }

  await app.listen(port);

  logger.log(`AGRONEX API rodando em http://localhost:${port}`);
  logger.log(`Health check: http://localhost:${port}/health`);
  logger.log(`API prefix: /${apiPrefix}`);
}

bootstrap();
