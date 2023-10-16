import { Controller, Get, Header, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { Authentication, AuthenticationType } from '../shared/decorator/authentication.decorator'

@Controller()
@Authentication(AuthenticationType.PUBLIC)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  getHello() {
    return this.appService.getHello()
  }

  @Get('/test')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  getTest() {
    return {
        message: 'test',
    }
  }
}
