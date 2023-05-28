import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from 'config/typeorm.config';
import { UserModule } from './apps/user/user.module';
import { HeaderMiddeware } from './middlewares/header.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmModuleConfig }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderMiddeware).forRoutes('*');
  }
}
