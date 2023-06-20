import { IsNotEmpty, IsString } from 'class-validator'
import { IUser } from '../../../interfaces/users.interface'

export class UserDto implements IUser {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  address: string

  @IsNotEmpty()
  @IsString()
  balance: string
}
