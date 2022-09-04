import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('repair-matching-platform')
  .setDescription('The platform API description')
  .setVersion('1.0')
  .addTag('platform')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(3000,function (){
    console.log(`Server is listening on post:3000`)
  });
  
}
bootstrap();
