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
import { ViewService } from './view.service';
import { View } from './view.model';
import { CreateViewDto } from './dto/create-view.dto';

@Controller('view')
@ApiTags('Вид объекта')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @ApiOperation({ summary: 'Получение видов объектов' })
  @ApiResponse({ status: 200, type: [View] })
  @Get()
  getAllCities(@Query('limit') limit: string) {
    return this.viewService.getAll(limit);
  }

  @ApiOperation({ summary: 'Создание вида объекта' })
  @ApiResponse({ status: 200, type: View })
  @Post()
  @HttpCode(201)
  createView(@Body() city: CreateViewDto) {
    return this.viewService.create(city);
  }

  @ApiOperation({ summary: 'Получение вида объекта по id' })
  @ApiResponse({ status: 200, type: View })
  @Get(':id')
  getEntityById(@Param('id') id: string) {
    return this.viewService.getById(id);
  }

  @ApiOperation({ summary: 'Обновление вида объекта по id' })
  @Put(':id')
  updateView(@Param('id') id: string, @Body() city: CreateViewDto) {
    return this.viewService.update(+id, city);
  }

  @ApiOperation({ summary: 'Удаление вида объекта по id' })
  @Delete(':id')
  removeView(@Param('id') id: string) {
    return this.viewService.remove(id);
  }
}
