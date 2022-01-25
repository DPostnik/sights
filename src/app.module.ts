import { Module } from '@nestjs/common';
import { CountryController } from './country/country.controller';
import { CountryService } from './country/country.service';
import { CityController } from './city/city.controller';
import { CityService } from './city/city.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true,
    }),
    UsersModule,
  ],
  controllers: [CountryController, CityController],
  providers: [CountryService, CityService],
})
export class AppModule {}
