import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import express from "express";
import cors from "cors";
import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot({
  envFilePath: [".env"],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("repair-matching-platform")
    .setDescription("The platform API description")
    .setVersion("1.0")
    .addTag("platform")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors({
    origin: [process.env.REACT_URL],
  });

  // app.use((req, res, next) => {
  // 	cors({
  // 		origin: [process.env.URL]
  // 	})
  // 	next()
  // })

  app.use((req, res, next) => {
    console.log(req.url);
    next();
  });

  // app.use((req, res, next) => {
  // 	express.urlencoded()
  // 	next()
  // })
  // app.use((req, res, next) => {
  // 	express.json()
  // 	next()
  // })

  await app.listen(8000, function () {
    console.log(`Server is listening on post:8000`);
  });
}
bootstrap();
