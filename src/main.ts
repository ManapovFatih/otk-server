import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from './modules/database/prisma.service';
import { PrismaClientExceptionFilter } from './filters/prisma-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main');
  app.enableCors({ credentials: true, origin: true });
  app.use(cookieParser(process.env.COOKIES_SECRET));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('OTK API')
    .setDescription('OTK')
    .setVersion('1.0.1')
    .addTag('APP')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => {
      logger.log(`Server is running on port: ${PORT}`);
  });
}
bootstrap();
