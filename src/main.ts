import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'
import { urlencoded } from 'express'
import * as morgan from 'morgan'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { BasicGuard } from '@guards/auth.guard'
import {
  ErrorFilter,
  HttpExceptionFilter
} from '@filters/http-exception.filter'
import { HttpInterceptor } from '@interceptors/http.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true }
  })

  app.use(helmet())
  app.use(morgan('dev'))
  app.use(urlencoded({ extended: false }))
  app.use(cookieParser())

  const swagger_config = new DocumentBuilder()
    .setTitle('title')
    .setDescription('description')
    .setVersion('0.0.1')
    .build()

  const api_document = SwaggerModule.createDocument(app, swagger_config)
  SwaggerModule.setup('api', app, api_document, {
    swaggerOptions: {
      defaultModelExpandDepth: 10,
      defaultModelsExpandDepth: 10
    }
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  app.useGlobalGuards(new BasicGuard())

  app.useGlobalFilters(new HttpExceptionFilter(), new ErrorFilter())

  await app.startAllMicroservices()

  app.useGlobalInterceptors(new HttpInterceptor())

  await app.listen(3000, () => {
    console.log((process.env.NODE_ENV || 'production') + '환경에서 접속 중')
  })
}
bootstrap()
