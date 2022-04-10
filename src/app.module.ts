import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/users/users.model';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/roles.model';
import { UserRoles } from './modules/roles/user-roles.model';
import { AccessRight } from './modules/access-right/access-right.model';
import { AuthModule } from './auth/auth.module';
import { Coordinates } from './modules/coordinates/coordinates.model';
import { CoordinatesModule } from './modules/coordinates/coordinates.module';
import { CountryModule } from './modules/country/country.module';
import { Country } from './modules/country/country.model';
import { City } from './modules/city/city.model';
import { CityModule } from './modules/city/city.module';
import { RegionModule } from './modules/region/region.module';
import { Region } from './modules/region/region.model';
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/category.model';
import { ViewModule } from './modules/view/view.module';
import { View } from './modules/view/view.model';
import { SignificanceDegreeModule } from './modules/significance-degree/significance-degree.module';
import { SignificanceDegree } from './modules/significance-degree/significance-degree.model';
import { AccessRightModule } from './modules/access-right/access-right.module';
import { SightModule } from './modules/sight/sight.module';
import { Sight } from './modules/sight/sight.model';
import { CategorySight } from './modules/category/category-sight.model';

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
      models: [
        User,
        Role,
        UserRoles,
        Country,
        City,
        Region,
        Category,
        View,
        SignificanceDegree,
        AccessRight,
        Coordinates,
        Sight,
        CategorySight,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    CountryModule,
    CityModule,
    RegionModule,
    CategoryModule,
    ViewModule,
    SignificanceDegreeModule,
    AccessRightModule,
    AuthModule,
    CoordinatesModule,
    SightModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
