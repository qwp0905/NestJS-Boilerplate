import { NestFactory } from '@nestjs/core'
import { BasicGuard } from './guards/basic.guard'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'
import { urlencoded } from 'express'
import * as morgan from 'morgan'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(helmet())
  app.use(morgan('dev'))
  app.use(urlencoded({ extended: false }))
  app.use(cookieParser())

  const swagger_config = new DocumentBuilder()
    .setTitle('title')
    .setDescription('description')
    .setVersion('0.0.1')
    .addBasicAuth()
    .build()

  const api_document = SwaggerModule.createDocument(app, swagger_config)
  SwaggerModule.setup('api', app, api_document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  app.useGlobalGuards(new BasicGuard())

  app.useGlobalFilters(new HttpExceptionFilter())

  app.startAllMicroservices()

  await app.listen(3000)
}
bootstrap()
