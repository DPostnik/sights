import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @Get()
  getAllUsers(
    @Query('_limit') limit: number,
    @Query('_offset') offset: number,
    @Query('_search') search: string,
  ) {
    return this.userService.getAllUsers(limit, offset, search);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() dto: CreateUserDto) {
    return this.userService.updateUser(id, dto);
  }
}
