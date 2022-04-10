import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SightController } from './sight.controller';
import { Sight } from './sight.model';
import { CoordinatesModule } from '../coordinates/coordinates.module';
import { SightService } from './sight.service';
import { CityModule } from '../city/city.module';
import { CategorySight } from '../category/category-sight.model';
import { Category } from '../category/category.model';
import { CategoryModule } from '../category/category.module';

@Module({
  exports: [],
  imports: [
    SequelizeModule.forFeature([Sight, CategorySight, Category]),
    CoordinatesModule,
    CityModule,
    CategoryModule,
  ],
  controllers: [SightController],
  providers: [SightService],
})
export class SightModule {}
