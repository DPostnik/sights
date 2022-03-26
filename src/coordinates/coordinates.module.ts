import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Coordinates } from './coordinates.model';
import { CoordinatesService } from './coordinates.service';

@Module({
  exports: [],
  imports: [SequelizeModule.forFeature([Coordinates])],
  providers: [CoordinatesService],
})
export class CoordinatesModule {}
