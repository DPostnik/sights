import { ApiProperty } from '@nestjs/swagger';

export class CreateSignificanceDegreeDto {
  @ApiProperty({
    example: 'Мировое',
    description: 'Название степени значимости',
  })
  readonly name: string;
}
