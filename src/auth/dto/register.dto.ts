import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/apps/user/dto/create-user.dto';

export class RegisterDto extends PickType(CreateUserDto, ['email', 'firstName', 'lastName', 'password', 'username']) {}
