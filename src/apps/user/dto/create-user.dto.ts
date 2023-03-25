import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ default: 'Justin' })
    @IsString()
    firstName: string;

    @ApiProperty({ default: 'Bieber' })
    @IsString()
    lastName: string;

    @ApiProperty({ default: 'example@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ default: 'bieber' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
