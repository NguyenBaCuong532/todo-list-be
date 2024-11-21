import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // Địa chỉ frontend của bạn
    credentials: true, // Cho phép gửi cookie hoặc header với credentials
  });
  await app.listen(4000);
}
bootstrap();
