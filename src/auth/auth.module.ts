import { Module } from '@nestjs/common'
import { BasicStrategy } from '@auth/strategies/basic.strategy'
import { AuthService } from '@auth/auth.service'
import { JwtStrategy } from '@auth/strategies/jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserTable } from '@models/mysql/user/user.repository.module'

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
