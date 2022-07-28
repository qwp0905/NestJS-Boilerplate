import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { BasicStrategy as Strategy } from 'passport-http'

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({ passReqToCallback: true })
  }

  async validate(
    req: Request,
    username: string,
    password: string,
    done: (err: any, user?: any) => void
  ) {
    if (
      this.configService.get<string>('BASIC_USER') === username &&
      this.configService.get<string>('BASIC_PASSWORD') === password
    ) {
      return done(null, true)
    } else return done(new UnauthorizedException('인증에 실패했습니다.'))
  }
}
