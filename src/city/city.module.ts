import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from './city.model';
import { RegionModule } from '../region/region.module';

@Module({
  imports: [SequelizeModule.forFeature([City]), RegionModule],
  exports: [CityService],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
