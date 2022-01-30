import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ example: 'Гродно', description: 'Название города' })
  readonly name: string;
  @ApiProperty({ example: '1', description: 'Внешний  ключ на регион' })
  readonly region_id: number;
}
