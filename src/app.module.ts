import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from 'config/typeorm.config';
import { UserModule } from './apps/user/user.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({ useClass: TypeOrmModuleConfig }),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
        UserModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
