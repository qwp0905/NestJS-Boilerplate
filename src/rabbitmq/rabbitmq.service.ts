import { Inject, Injectable } from '@nestjs/common'
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext
} from '@nestjs/microservices'

@Injectable()
export class RabbitmqService {
  @MessagePattern()
  example(
    @Inject('RabbitMQ') rmq: ClientProxy,
    @Payload() data: Array<any>,
    @Ctx() context: RmqContext
  ) {
    return
  }
}
