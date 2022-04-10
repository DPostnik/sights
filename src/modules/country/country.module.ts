import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from './contry.model';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  exports: [CountryService],
  imports: [SequelizeModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
