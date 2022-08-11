import { Inject, Injectable } from '@nestjs/common'
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext
} from '@nestjs/microservices'
import { Channel } from 'amqplib'

@Injectable()
export class RabbitmqService {
  @MessagePattern('pattern')
  example(
    @Inject('RabbitMQ') rmq: ClientProxy,
    @Payload() data: Array<any>,
    @Ctx() context: RmqContext
  ) {
    const channel: Channel = context.getChannelRef()
    const message = context.getMessage()
  }
}
