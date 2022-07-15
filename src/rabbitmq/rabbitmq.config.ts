import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices'

export const RabbitMQConfig: ClientsProviderAsyncOptions = {
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
