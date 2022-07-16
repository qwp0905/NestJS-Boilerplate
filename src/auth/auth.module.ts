import { Module } from '@nestjs/common'
import { BasicStrategy } from './strategies/basic.strategy'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from '../models/mysql/user/user.repository'
import { CacheModule } from '../cache/cache.module'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' }
      })
    }),
    TypeOrmModule.forFeature([UserRepository], 'MySQL'),
    CacheModule,
    PassportModule
  ],
  providers: [BasicStrategy, JwtStrategy, AuthService]
})
export class AuthModule {}
