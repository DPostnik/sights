import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({ example: 'Беларусь', description: 'Название страны' })
  readonly country: string;
  @ApiProperty({
    example: 'Гродненская область',
    description: 'Название области',
  })
  readonly name: string;
}
