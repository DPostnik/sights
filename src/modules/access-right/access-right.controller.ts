import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessRightService } from './access-right.service';
import { AccessRight } from './access-right.model';
import { CreateAccessRightDto } from './dto/create-acess-right.dto';

@Controller('access-right')
@ApiTags('Роли')
export class AccessRightController {
  constructor(private accessRightService: AccessRightService) {}

  @ApiOperation({ summary: 'Получение списка ролей' })
  @ApiResponse({ status: 200, type: [AccessRight] })
  @Get()
  getAllCities(@Query('limit') limit?: string) {
    return this.accessRightService.getAll(limit && +limit);
  }

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: AccessRight })
  @Post()
  @HttpCode(201)
  createCity(@Body() dto: CreateAccessRightDto) {
    return this.accessRightService.create(dto);
  }

  @ApiOperation({ summary: 'Получение роли по id' })
  @ApiResponse({ status: 200, type: AccessRight })
  @Get(':id')
  getEntityById(@Param('id') id: string) {
    return this.accessRightService.getById(+id);
  }

  @ApiOperation({ summary: 'Обновление роли по id' })
  @Put(':id')
  updateCity(@Param('id') id: string, @Body() dto: CreateAccessRightDto) {
    return this.accessRightService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Удаление роли по id' })
  @Delete(':id')
  removeCity(@Param('id') id: string) {
    return this.accessRightService.remove(+id);
  }
}
