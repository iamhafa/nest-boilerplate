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
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationQuery } from 'src/common/shared/pagination.query';
import { PaginationInterceptor } from 'src/common/interceptors/pagination.interceptor';
import { FilterUserDto } from './dto/filter-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('User Entity')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Version('1')
  @Post('create-user')
  create(@Body() createUserDto: CreateUserDto): Promise<User | ConflictException> {
    return this.userService.createOne(createUserDto);
  }

  @Version('1')
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(PaginationInterceptor)
  @Get('list-user')
  findAll(
    @Query() paginationQuery: PaginationQuery,
    @Query() filterUserDto: FilterUserDto,
  ): Promise<User[]> {
    return this.userService.findAll(paginationQuery, filterUserDto);
  }

  @Version('1')
  @Get('find-user/:id')
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<User | NotFoundException> {
    return this.userService.findOneById(id);
  }

  @Version('1')
  @Get('find-username/:username')
  findOneByUsername(@Param('username') username: string): Promise<User | NotFoundException> {
    return this.userService.findOneByUsername(username);
  }

  @Version('1')
  @Put('update-user/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult | NotFoundException> {
    return this.userService.updateOneById(id, updateUserDto);
  }

  @Version('1')
  @Delete('remove-user/:id')
  softDelete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult | NotFoundException> {
    return this.userService.softDeleteOneById(id);
  }
}
