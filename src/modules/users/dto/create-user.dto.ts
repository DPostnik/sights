import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Почта' })
  readonly email?: string;
  @ApiProperty({ example: 'user@gmail.com', description: 'Почта gmail' })
  readonly gmail?: string;
  @ApiProperty({ example: '1234', description: 'Пароль' })
  readonly password?: string;
  @ApiProperty({ example: 'Name', description: 'Полное имя' })
  readonly name?: string;
  @ApiProperty({ example: 'Daniil', description: 'Имя' })
  readonly firstName?: string;
  @ApiProperty({ example: 'Postnik', description: 'Фамилия' })
  readonly lastName?: string;
  @ApiProperty({ example: 'Postnik', description: 'Фамилия' })
  readonly refreshToken?: string;
  readonly roleId?: number;
  readonly photoUrl?: string;
}
