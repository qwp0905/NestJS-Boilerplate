export * from './rabbitmq.service'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices'
import { RabbitmqService } from '@rabbitmq'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RabbitMQ',
        inject: [ConfigService],
        imports: [ConfigModule],
        useFactory: (configService: ConfigService): RmqOptions => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            noAck: true,
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
