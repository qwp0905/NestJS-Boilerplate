export * from './app.controller'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@database'
import { configuration } from '@config'
import { ApiModule } from '@api'
import { AuthModule } from '@auth'
import { AppController } from '@app'
import { AwsModule } from '@aws'
import { RabbitmqModule } from '@rabbitmq'
import { RedisModule } from '@redis'
import { SlackModule } from '@slack'

@Module({
  imports: [
    ConfigModule.forRoot(configuration),
    DatabaseModule,
    ApiModule,
    AuthModule,
    AwsModule.forRoot(),
    RabbitmqModule,
    RedisModule.forRoot(),
    SlackModule.forRoot()
  ],
  controllers: [AppController]
})
export class AppModule {}
