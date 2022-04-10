import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { View } from './view.model';

@Module({
  controllers: [ViewController],
  providers: [ViewService],
  exports: [],
  imports: [SequelizeModule.forFeature([View])],
})
export class ViewModule {}
