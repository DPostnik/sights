import { Module } from '@nestjs/common';
import { SignificanceDegreeService } from './significance-degree.service';
import { SignificanceDegreeController } from './significance-degree.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SignificanceDegree } from './significance-degree.model';

@Module({
  providers: [SignificanceDegreeService],
  controllers: [SignificanceDegreeController],
  imports: [SequelizeModule.forFeature([SignificanceDegree])],
  exports: [],
})
export class SignificanceDegreeModule {}
