import { ApiProperty } from '@nestjs/swagger'

export class AuthUserDto {
  @ApiProperty({ example: '10' })
  id: string

  @ApiProperty({ example: 'abcd1234@gmail.com' })
  email: string

  @ApiProperty({ example: 'qjviasokdj' })
  password: string

  @ApiProperty({ example: '2023-02-18 15:18:07' })
  createdAt: Date
}
