import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.model';
import { Sight } from '../sight/sight.model';
import { CategorySight } from './category-sight.model';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [SequelizeModule.forFeature([Category, Sight, CategorySight])],
  exports: [CategoryService],
})
export class CategoryModule {}
