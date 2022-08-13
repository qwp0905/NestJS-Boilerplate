import { ISignature } from '@interfaces'
import { FilterQuery } from 'mongoose'

export class TestEvent<T, K extends keyof T> {
  collection: K
  previous: T[K]
  filter_query: FilterQuery<T[K]>
  signature: ISignature
}
