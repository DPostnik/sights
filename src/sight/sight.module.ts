import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SightController } from './sight.controller';
import { Sight } from './sight.model';
import { CoordinatesModule } from '../coordinates/coordinates.module';
import { SightService } from './sight.service';

@Module({
  exports: [],
  imports: [SequelizeModule.forFeature([Sight]), CoordinatesModule],
  controllers: [SightController],
  providers: [SightService],
})
export class SightModule {}
