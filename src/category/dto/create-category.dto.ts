import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Архитектура', description: 'Название категории' })
  readonly name: string;
  @ApiProperty({ example: '1', description: 'Внешний  ключ на категорию' })
  readonly category_id: number;
}
