import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@database/database.module'
import { configuration } from '@config/configuration'
import { ApiModule } from '@api/api.module'
import { AuthModule } from '@auth/auth.module'
import { AppController } from '@src/app.controller'

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
