import { Controller, UseFilters } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiTags } from '@nestjs/swagger'
import { HttpExceptionFilter } from '../../../libs/exception-filter/HttpExceptionFilter'

@ApiTags('account')
@Controller()
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
