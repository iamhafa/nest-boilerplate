import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/apps/user/dto/create-user.dto';

export class LoginDto extends PickType(CreateUserDto, ['email', 'password']) {}
