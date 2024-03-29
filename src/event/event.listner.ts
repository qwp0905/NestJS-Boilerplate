import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { SignatureEvent } from '@event'
import { MongoService } from '@models/mongo'
import { IMongoDB } from '@interfaces'

@Injectable()
export class EventListener {
  constructor(private readonly mongoService: MongoService) {}
  @OnEvent('diff')
  async testEvent(payload: SignatureEvent<IMongoDB, keyof IMongoDB>) {
    await this.mongoService.updateDiff(
      payload.collection,
      payload.filter_query,
      payload.previous,
      payload.signature
    )
  }
}
