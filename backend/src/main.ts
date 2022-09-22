import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import express from 'express';
import cors from 'cors';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

ConfigModule.forRoot({
  envFilePath: ['.env'],
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder().setTitle('repair-matching-platform').setDescription('The platform API description').setVersion('1.0').addTag('platform').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app
    .enableCors
    //   {
    //   origin: [process.env.REACT_URL],
    // }
    ();

  app.useStaticAssets('uploads');

  app.use((req, res, next) => {
    console.log(req.url);
    next();
  });

  await app.listen(8000, function () {
    console.log(`Server is listening on post:8000`);
  });
}
bootstrap();
