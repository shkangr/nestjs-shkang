import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class ValidateAuthUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string
}
