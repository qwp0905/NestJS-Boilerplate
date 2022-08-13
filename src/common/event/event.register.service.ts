import { IMongoDB, ISignature } from '@interfaces'
import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FilterQuery } from 'mongoose'
import { TestEvent } from '@event'

@Injectable()
export class EventRegisterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  testEvent<T extends keyof IMongoDB>(
    collection: T,
    filter_query: FilterQuery<IMongoDB[T]>,
    previous: IMongoDB[T],
    signature: ISignature
  ) {
    const event = new TestEvent<IMongoDB, T>()
    event.collection = collection
    event.filter_query = filter_query
    event.previous = previous
    event.signature = signature

    return this.eventEmitter.emit('test', event)
  }
}
