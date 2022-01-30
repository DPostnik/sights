import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({ example: '1', description: 'Внешний ключ на страну' })
  readonly country_id: number;
  @ApiProperty({
    example: 'Гродненская область',
    description: 'Название области',
  })
  readonly name: string;
}
