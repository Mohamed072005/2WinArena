import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './global/filters/http.exception.filter';
import { LoggingInterceptors } from './global/interceptors/logging.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptors())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
