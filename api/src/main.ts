import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllConfigType } from './config/config.type';
import validationOptions from './utils/validation-options';
import { AllExceptionsFilter } from './utils/all-exteptions-filter/filters/all-exceptions.filter';
import { useContainer } from 'class-validator';

async function bootstrap() {
  // App
  const app = await NestFactory.create(AppModule);
  /**
   * Caso o NestJS retorne erro, ao invés de encerrar o Node,
   * ele continua rodando e apenas imprime o log de erro. Esse é o propósito do container.
   */
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  /** Adicionar `/v1/` e afins na API */
  app.enableVersioning({
    type: VersioningType.URI,
  });
  /** Habilitar o uso de pipes no DTO (vallidação por classe) */
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  /**  */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllExceptionsFilter());
  const configService = app.get(ConfigService<AllConfigType>);
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // Listen
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
