import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { RabbitmqService } from './rabbitmq.service'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RabbitMQ',
        inject: [ConfigService],
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'queue_name',
            queueOptions: {}
          }
        })
      }
    ])
  ],
  providers: [RabbitmqService]
})
export class RabbitmqModule {}
