export * from './auth.service'
export * from './strategies/basic.strategy'
export * from './strategies/jwt.strategy'

import { Module } from '@nestjs/common'
import { BasicStrategy, JwtStrategy, AuthService } from '@auth'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserTable } from '@models/mysql'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' }
      })
    }),
    UserTable
  ],
  providers: [BasicStrategy, JwtStrategy, AuthService]
})
export class AuthModule {}
