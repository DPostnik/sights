import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from './city.model';

@Module({
  imports: [SequelizeModule.forFeature([City])],
  exports: [CityService],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
