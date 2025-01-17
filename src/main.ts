import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 9000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log(port);
  

  await app.listen(port);
}

bootstrap();
