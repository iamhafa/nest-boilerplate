import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtModuleConfig implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return {
            // private key
            secret: this.configService.get<string>('JWT_SECRET_KEY'),
            signOptions: {
                // key expires after...
                expiresIn: this.configService.get<string>('JWT_EXPIRE_TIMES'),
            },
        };
    }
}
