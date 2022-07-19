import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { configuration } from './config/configuration'
import { DatabaseModule } from './databasse/database.module'
import { HttpModule } from '@nestjs/axios'
import { ApiModule } from './api/api.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot(configuration),
    DatabaseModule,
    HttpModule,
    ApiModule,
    AuthModule
  ],
  controllers: [AppController]
})
export class AppModule {}
