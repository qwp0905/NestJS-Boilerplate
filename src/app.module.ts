import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { configuration } from './config/configuration'
import { DatabaseModule } from './databasse/database.module'
import { HttpModule } from '@nestjs/axios'
import { ApiModule } from './api/api.module'
import { CacheModule } from './cache/cache.module'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(configuration),
    DatabaseModule,
    HttpModule,
    CacheModule,
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
