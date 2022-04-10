import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SightService } from './sight.service';
import { CreateSightDto } from './dto/create-sight.dto';

@Controller('sight')
export class SightController {
  constructor(private sightService: SightService) {}

  @Post()
  createSight(@Body() sight: CreateSightDto) {
    return this.sightService.create(sight);
  }

  @Get()
  getAllSights(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.sightService.getAll(limit, offset);
  }

  @Get(':id')
  getSightById(@Param('id') id: string) {
    return this.sightService.getById(+id);
  }

  @Put(':id')
  updateSight(@Param('id') id: string, @Body() sight: CreateSightDto) {
    return this.sightService.update(+id, sight);
  }

  @Delete(':id')
  removeSight(@Param('id') id: string) {
    return this.sightService.remove(+id);
  }
}
