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
import { SignificanceDegreeService } from './significance-degree.service';
import { SignificanceDegree } from './significance-degree.model';
import { CreateSignificanceDegreeDto } from './dto/create-significance-degree.dto';

@Controller('significance-degree')
@ApiTags('Степень значимости')
export class SignificanceDegreeController {
  constructor(private significanceService: SignificanceDegreeService) {}

  @ApiOperation({ summary: 'Получение списка степеней значимости' })
  @ApiResponse({ status: 200, type: [SignificanceDegree] })
  @Get()
  getAllSignificanceDegrees(@Query('limit') limit?: string) {
    return this.significanceService.getAll(limit && +limit);
  }

  @ApiOperation({ summary: 'Создание степени значимости' })
  @ApiResponse({ status: 200, type: SignificanceDegree })
  @Post()
  @HttpCode(201)
  createSignificanceDegree(@Body() dto: CreateSignificanceDegreeDto) {
    return this.significanceService.create(dto);
  }

  @ApiOperation({ summary: 'Получение степени значимости по id' })
  @ApiResponse({ status: 200, type: SignificanceDegree })
  @Get(':id')
  getSignificanceDegreeById(@Param('id') id: string) {
    return this.significanceService.getById(+id);
  }

  @ApiOperation({ summary: 'Обновление степени значимости по id' })
  @Put(':id')
  updateSignificanceDegree(
    @Param('id') id: string,
    @Body() dto: CreateSignificanceDegreeDto,
  ) {
    return this.significanceService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Удаление степени значимости по id' })
  @Delete(':id')
  removeSignificanceDegree(@Param('id') id: string) {
    return this.significanceService.remove(+id);
  }
}
