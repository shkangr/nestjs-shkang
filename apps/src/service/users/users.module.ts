import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../../entities/user.entity'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UtilsService } from '../../../shared/utils/utils.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UtilsService],
})
export class UsersModule {}
