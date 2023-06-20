import { Injectable, Logger, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common'
import { CreateAuthUserDto } from './dto/create-auth-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthUserEntity } from '../../entities/auth-user.entity'
import { compare, genSalt, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ValidateAuthUserDto } from './dto/validate-auth-user.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUserEntity)
    private readonly authUserRepository: Repository<AuthUserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async registerAuthUser(request: CreateAuthUserDto): Promise<AuthUserEntity> {
    request.password = await this.hash(request.password)
    const creatableAuthUser = this.authUserRepository.create(request)
    return await this.authUserRepository.save(creatableAuthUser)
  }

  async hash(data: string): Promise<string> {
    const salt = await genSalt()
    return hash(data, salt)
  }

  compare(data: string, encrypted: string): Promise<boolean> {
    return compare(data, encrypted)
  }

  async getAuthUserToken(validateAuthUserDto: ValidateAuthUserDto): Promise<any | { status: number; message: string }> {
    return this.authUserRepository
      .findOne({ where: { email: validateAuthUserDto.email } })
      .then(async (authUser) => {
        if (!authUser) {
          throw new UnauthorizedException()
        }

        const passwordIsValid = await this.compare(validateAuthUserDto.password, authUser.password)

        if (!passwordIsValid == true) {
          return {
            message: 'Authentication failed. Wrong password',
            status: HttpStatus.BAD_REQUEST,
          }
        }

        return await this.signToken({
          email: authUser.email,
          id: authUser.id,
        })
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.BAD_REQUEST)
      })
  }

  private async signToken(payload: { id: string; email: string }) {
    const accessToken = await this.jwtService.signAsync(payload)

    return {
      sub: payload.id,
      expiresIn: Number(process.env.JWT_ACCESS_TOKEN_TTL),
      accessToken: accessToken,
      user: payload,
    }
  }

  async validateUserByJwt(payload: { email: string }) {
    const user = await this.authUserRepository.findOne({ where: { email: payload.email } })

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
