import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Version,
    Put,
    ParseIntPipe,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@ApiTags('User Entity')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Version('1')
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createOne(createUserDto);
    }

    @Version('1')
    // using interceptor
    @UseInterceptors(LoggingInterceptor)
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Version('1')
    @Get('/:id')
    findOneById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.findOneById(id);
    }

    @Version('1')
    @Get('/username/:username')
    findOneByUsername(@Param('username') username: string): Promise<User> {
        return this.userService.findOneByUsername(username);
    }

    @Version('1')
    @Put('/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return this.userService.updateOneById(id, updateUserDto);
    }

    @Version('1')
    @Delete('/:id')
    softDelete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.userService.softDeleteOneById(id);
    }
}
