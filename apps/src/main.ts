import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { configureSwaggerDocs } from '../libs/swagger/configure-swagger-docs.helper'
import { json, urlencoded } from 'express'
import { HttpExceptionFilter } from '../libs/exception-filter/HttpExceptionFilter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)

  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  app.useGlobalFilters(new HttpExceptionFilter())

  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))

  configureSwaggerDocs(app, configService)

  app.enableCors({
    // origin: configService.get<string>('ENDPOINT_CORS'),
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  })

  const port = configService.get<number>('NODE_API_PORT') || 3000
  await app.listen(port)
  Logger.log(`Url for OpenApi is listening port: ${port}, env: ${process.env.NODE_ENV}`)
  Logger.log(`swagger EndPoint http://localhost:3000/docs/`)
}
bootstrap()
