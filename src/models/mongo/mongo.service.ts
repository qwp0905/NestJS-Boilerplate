import { ISignature } from '@interfaces'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Diff } from '@type'
import { deepDiff } from '@utils'
import { Connection, FilterQuery } from 'mongoose'
import { IMongoDB } from '@interfaces'

@Injectable()
export class MongoService {
  constructor(
    @InjectConnection('mongo') private readonly connection: Connection
  ) {}

  async updateDiff<T extends keyof IMongoDB, K extends IMongoDB[T]>(
    collection: T,
    filter_query: FilterQuery<K>,
    previous: K,
    signature: ISignature
  ) {
    const current: K = await this.connection
      .collection(collection)
      .findOne<K>(filter_query)
    const diff_data = deepDiff.map<K>(previous, current)
    const diff: Diff<K> = {
      ...diff_data,
      _bef_dt: previous._dt,
      ...signature
    }
    const update_query = {
      _diff: {
        $push: {
          $each: [diff],
          $slice: 30
        }
      }
    }
    await this.connection
      .collection(collection)
      .updateOne({ _id: current._id }, update_query)

    return true
  }
}
