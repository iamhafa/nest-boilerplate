import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmModuleConfig implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        const isProduction: boolean = process.env.NODE_ENV === 'production';

        return {
            type: 'postgres',
            host: this.configService.get<string>(isProduction ? 'DB_HOST_PRODUCTION' : 'DB_HOST_LOCAL'),
            username: this.configService.get<string>(isProduction ? 'DB_USERNAME_PRODUCTION' : 'DB_USERNAME_LOCAL'),
            password: this.configService.get<string>(isProduction ? 'DB_PASSWORD_PRODUCTION' : 'DB_PASSWORD_LOCAL'),
            database: this.configService.get<string>(isProduction ? 'DB_DATABASE_PRODUCTION' : 'DB_DATABASE_LOCAL'),
            port: this.configService.get<number>(isProduction ? 'DB_PORT_PRODUCTION' : 'DB_PORT_LOCAL'),
            autoLoadEntities: true,
            // disable when production
            synchronize: isProduction ? false : true,
        };
    }
}
