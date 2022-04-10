import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ example: 'Гродно', description: 'Название города' })
  readonly name: string;
  @ApiProperty({ example: '1', description: 'Название региона' })
  readonly region: string;
}
