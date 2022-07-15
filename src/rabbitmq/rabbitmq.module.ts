import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { RabbitMQConfig } from './rabbitmq.config'
import { RabbitmqService } from './rabbitmq.service'

@Module({
  imports: [ClientsModule.registerAsync([RabbitMQConfig])],
  providers: [RabbitmqService]
})
export class RabbitmqModule {}
