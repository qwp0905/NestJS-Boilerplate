import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy, Ctx, RmqContext } from '@nestjs/microservices'

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject('RabbitMQ') private readonly rmq: ClientProxy,
    @Ctx() private readonly context: RmqContext
  ) {}
}
