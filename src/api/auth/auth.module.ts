import { Module } from '@nestjs/common'
import { BasicStrategy } from './strategies/basic.strategy'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtConfig } from '../../config/jwt.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from '../../models/mysql/user/user.repository'

@Module({
  imports: [
    JwtModule.registerAsync(JwtConfig),
    TypeOrmModule.forFeature([UserRepository], 'MySQL')
  ],
  providers: [BasicStrategy, JwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
