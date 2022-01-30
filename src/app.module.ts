import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { CountryModule } from './country/country.module';
import { Country } from './country/contry.model';
import { City } from './city/city.model';
import { CityModule } from './city/city.module';
import { RegionModule } from './region/region.module';
import { Region } from './region/region.model';

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
      models: [User, Role, UserRoles, Country, City, Region],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    CountryModule,
    CityModule,
    RegionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
