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
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
@ApiTags('Категории')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Получение списка категорий' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  getAllCities(@Query('limit') limit?: string) {
    return this.categoryService.getAll(limit && +limit);
  }

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({ status: 200, type: Category })
  @Post()
  @HttpCode(201)
  createCity(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @ApiOperation({ summary: 'Получение категории по id' })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  getEntityById(@Param('id') id: string) {
    return this.categoryService.getById(+id);
  }

  @ApiOperation({ summary: 'Обновление категории по id' })
  @Put(':id')
  updateCity(@Param('id') id: string, @Body() category: CreateCategoryDto) {
    return this.categoryService.update(+id, category);
  }

  @ApiOperation({ summary: 'Удаление категории по id' })
  @Delete(':id')
  removeCity(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
