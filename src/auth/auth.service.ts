import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/apps/user/user.service';
import { User } from 'src/apps/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { IJwtValidated } from 'src/common/interfaces/jwt-validated.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByEmail(email);

    const checkMatchPassword: boolean = await bcrypt.compare(password, user.password);

    if (user && checkMatchPassword) return user;
    throw new UnauthorizedException();
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { password } = registerDto;

    const saltOrRounds: number = 10;
    const hashPassword: string = await bcrypt.hash(password, saltOrRounds);
    registerDto.password = hashPassword;

    return this.userService.createOne(registerDto);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    const found: User = await this.userService.findOneByEmail(email);
    if (!found) throw new NotFoundException();
    const isMatched: boolean = await bcrypt.compare(password, found.password);
    if (!isMatched) throw new NotFoundException();

    // sign token string based on { userId: found.id, username: found.username }
    const payloadResponse: IJwtValidated = { userId: found.id, username: found.username };

    return { access_token: this.jwtService.sign(payloadResponse) };
  }
}
