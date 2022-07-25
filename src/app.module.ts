import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { configuration } from './config/configuration'
import { DatabaseModule } from './databasse/database.module'
import { ApiModule } from './api/api.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot(configuration),
    DatabaseModule,
    ApiModule,
    AuthModule
  ],
  controllers: [AppController]
})
export class AppModule {}
