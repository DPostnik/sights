import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SightService } from './sight.service';
import { CreateSightDto } from './dto/create-sight.dto';
import { Public } from '../../auth/common/decorators';

@Controller('sight')
export class SightController {
  constructor(private sightService: SightService) {}

  @Post()
  createSight(@Body() sight: CreateSightDto) {
    return this.sightService.create(sight);
  }

  @Public()
  @Get()
  getAllSights(
    @Query('_limit') limit: number,
    @Query('_offset') offset: number,
    @Query('_search') search: string,
  ) {
    return this.sightService.getAllSights(limit, offset, search);
  }

  @Public()
  @Get(':id')
  getSightById(@Param('id', ParseIntPipe) id: string) {
    return this.sightService.getById(+id);
  }

  @Put(':id')
  updateSight(
    @Param('id', ParseIntPipe) id: string,
    @Body() sight: CreateSightDto,
  ) {
    return this.sightService.update(+id, sight);
  }

  @Delete(':id')
  removeSight(@Param('id', ParseIntPipe) id: string) {
    return this.sightService.remove(+id);
  }
}
