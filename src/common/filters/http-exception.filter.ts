import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    res.json({
      code: exception.getStatus(),
      result: false,
      message: exception.message,
      timestamp: new Date().toISOString()
    })
  }
}

@Catch(Error)
export class ErrorFilter implements ExceptionFilter<Error> {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    res.json({
      code: 500,
      result: false,
      message: exception.message,
      timestamp: new Date().toISOString()
    })
  }
}
