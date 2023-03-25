import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModuleConfig } from 'config/jwt.config';
import { User } from 'src/apps/user/entities/user.entity';
import { UserModule } from 'src/apps/user/user.module';
import { UserService } from 'src/apps/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({ useClass: JwtModuleConfig }),
        PassportModule,
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
