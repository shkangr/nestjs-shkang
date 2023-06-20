import { Controller, Post, HttpCode, HttpStatus, Body, Get } from '@nestjs/common'
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger'
import { CreateAuthUserDto } from './dto/create-auth-user.dto'
import { AuthUserDto } from './dto/auth-user.dto'
import { AuthService } from './auth.service'
import { ValidateAuthUserDto } from './dto/validate-auth-user.dto'
import { Authentication, AuthenticationType } from '../../../shared/decorator/authentication.decorator'

@ApiTags('Auth')
@Controller()
@Authentication(AuthenticationType.PUBLIC)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth-user')
  @ApiOperation({
    summary: '로그인 유저 생성 ( email, password )',
  })
  @ApiCreatedResponse({ type: AuthUserDto })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createAuthUserDto: CreateAuthUserDto): Promise<AuthUserDto> {
    return await this.authService.registerAuthUser(createAuthUserDto)
  }

  @Post('/token')
  @ApiOperation({
    summary: 'jwt 발급',
  })
  @ApiCreatedResponse({ type: AuthUserDto })
  @HttpCode(HttpStatus.CREATED)
  async getToken(@Body() validateAuthUserDto: ValidateAuthUserDto): Promise<any> {
    return await this.authService.getAuthUserToken(validateAuthUserDto)
  }
}
