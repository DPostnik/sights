import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({ example: 'Беларусь', description: 'Название страны' })
  readonly name: string;
}
