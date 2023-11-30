import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleConfig } from 'config/typeorm.config';
import { UserModule } from 'src/apps/user/user.module';
import { HeaderMiddeware } from 'src/core/middlewares/header.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { CartModule } from './apps/cart/cart.module';
import { MovieModule } from './apps/movie/movie.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmModuleConfig }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    AuthModule,
    UserModule,
    CartModule,
    MovieModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderMiddeware).forRoutes('*');
  }
}
