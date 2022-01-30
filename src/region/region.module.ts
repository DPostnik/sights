import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './region.model';

@Module({
  controllers: [RegionController],
  providers: [RegionService],
  imports: [SequelizeModule.forFeature([Region])],
  exports: [],
})
export class RegionModule {}
