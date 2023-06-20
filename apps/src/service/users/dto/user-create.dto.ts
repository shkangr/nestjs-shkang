import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator'
import { PartialType } from '@nestjs/swagger'
import { UserDto } from './user.dto'

export class UserCreateDto extends PartialType(UserDto) {
  @IsNotEmpty()
  @IsString()
  address: string

  @IsOptional()
  @IsString()
  balance?: string
}
