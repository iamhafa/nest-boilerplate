import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
    .setTitle('Swagger Document')
    .setVersion('1.0')
    .setDescription('API Management')
    .build();
