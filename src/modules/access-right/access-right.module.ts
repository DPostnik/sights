import { Module } from '@nestjs/common';
import { AccessRightController } from './access-right.controller';
import { AccessRightService } from './access-right.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccessRight } from './access-right.model';

@Module({
  controllers: [AccessRightController],
  providers: [AccessRightService],
  exports: [],
  imports: [SequelizeModule.forFeature([AccessRight])],
})
export class AccessRightModule {}
