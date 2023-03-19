import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { swaggerOptions } from './helpers/swagger.option';

(async (): Promise<void> => {
    // Setup app
    const app: INestApplication = await NestFactory.create<INestApplication>(AppModule);
    app.enableCors({ origin: true, credentials: true });
    app.useGlobalPipes(new ValidationPipe());
    app.enableVersioning({ type: VersioningType.URI });
    // app.use(helmet());
    app.setGlobalPrefix('api', { exclude: ['auth/login', 'auth/register'] });

    const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('docs', app, swaggerDocument);

    await app.listen(3000);
})();
