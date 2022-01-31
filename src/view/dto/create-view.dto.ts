import { ApiProperty } from '@nestjs/swagger';

export class CreateViewDto {
  @ApiProperty({
    example: 'Документальные памятники ',
    description: 'Вид объекта',
  })
  readonly name: string;
}
