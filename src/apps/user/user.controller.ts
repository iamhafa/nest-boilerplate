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
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationQuery } from 'src/common/shared/pagination.query';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { PaginationInterceptor } from 'src/common/interceptors/pagination.interceptor';
import { FilterUserDto } from './dto/filter-user.dto';

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
    // using interceptors
    @UseInterceptors(LoggingInterceptor, PaginationInterceptor)
    @Get()
    findAll(@Query() paginationQuery: PaginationQuery, @Query() filterUserDto: FilterUserDto): Promise<User[]> {
        return this.userService.findAll(paginationQuery, filterUserDto);
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
