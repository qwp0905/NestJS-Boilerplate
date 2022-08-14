export * from './app.controller'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@database'
import { configuration } from '@config'
import { ApiModule } from '@api'
import { AuthModule } from '@auth'
import { AppController } from '@app'
import { RabbitmqModule } from '@rabbitmq'

@Module({
  imports: [
    ConfigModule.forRoot(configuration),
    DatabaseModule,
    ApiModule,
    AuthModule,
    RabbitmqModule
  ],
  controllers: [AppController]
})
export class AppModule {}
