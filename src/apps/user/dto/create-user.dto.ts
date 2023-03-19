import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ default: 'Justin' })
    @IsString()
    firstName: string;

    @ApiProperty({ default: 'Bieber' })
    @IsString()
    lastName: string;

    @ApiProperty({ default: 'example@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ default: 'bieber' })
    @IsString()
    username: string;
}
