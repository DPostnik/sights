import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: '1234', description: 'Пароль' })
  readonly password: string;
  @ApiProperty({ example: 'Name', description: 'Имя' })
  readonly name: string;
}
