import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './service/users/users.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { UtilsModule } from '../shared/utils/utils.module'
import { UserEntity } from './entities/user.entity'
import { TransactionEntity } from './entities/transaction.entity'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from '../libs/exception-filter/HttpExceptionFilter'
import { AuthUserEntity } from './entities/auth-user.entity'
import { AuthModule } from './service/auth/auth.module'
import { SlackWebhookModule } from '../libs/notification/slack/slack-webhook.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev', '.env.stage', '.env.prod'],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('THROTTLE_TTL'),
        limit: config.get<number>('THROTTLE_LIMIT'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('TYPEORM_HOST'),
        port: config.get<number>('TYPEORM_PORT'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        synchronize: true,
        entities: [UserEntity, TransactionEntity, AuthUserEntity],
      }),
    }),
    UsersModule,
    UtilsModule,
    AuthModule,
    SlackWebhookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
