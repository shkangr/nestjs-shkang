import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class CreateAuthUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string
}
