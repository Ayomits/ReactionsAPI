import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { AppConfig } from './config';

async function bootstrap() {
  AppConfig.init();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Reactions Api')
    .setDescription('The reactions api')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', name: 'Authorization', type: 'apiKey' })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, documentFactory);

  app.setGlobalPrefix('/api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(AppConfig.port);
}
void bootstrap();
