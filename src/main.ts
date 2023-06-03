import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { SERVER_CONFIG } from 'src/utils/constants';
import { swaggerOptions } from 'src/common/helpers/swagger.option';
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter';
import { ResponseInterceptor } from 'src/core/interceptors/response.interceptor';

(async (): Promise<void> => {
  // Setup app
  const app: INestApplication = await NestFactory.create<INestApplication>(AppModule);
  // CORS
  app.enableCors({ origin: true, credentials: true });
  // *GUARDS*
  // app.useGlobalGuards();
  // *INTERCEPTORS*
  app.useGlobalInterceptors(new ResponseInterceptor());
  // *PIPES*
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // *FILTERS* (error handler)
  app.useGlobalFilters(new HttpExceptionFilter());
  // *VERSIONING* (route versioning)
  app.enableVersioning({ type: VersioningType.URI });
  // APP PREFIX
  app.setGlobalPrefix(SERVER_CONFIG.PREFIX_API, { exclude: ['auth/login', 'auth/register'] });

  // SWAGGER
  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(SERVER_CONFIG.PREFIX_DOCS, app, swaggerDocument);

  await app.listen(SERVER_CONFIG.PORT);
})();
