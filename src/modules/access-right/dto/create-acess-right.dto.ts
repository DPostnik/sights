import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessRightDto {
  @ApiProperty({ example: 'Администратор', description: 'Название роли' })
  readonly name: string;
  @ApiProperty({
    example: 'Пользователь с данным правам имеет неограниченные права',
    description: 'Описание роли',
  })
  readonly description: string;
}
