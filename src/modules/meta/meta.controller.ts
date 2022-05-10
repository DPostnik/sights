import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MetaService } from './meta.service';
import { Public } from '../../auth/common/decorators';

@Controller('meta')
@ApiTags('Мета-информация')
export class MetaController {
  constructor(private metaService: MetaService) {}

  @ApiOperation({ summary: 'Получение мета-информации' })
  @ApiResponse({ status: 201 })
  @Public()
  @Get()
  getAll() {
    return this.metaService.getAll();
  }
}
