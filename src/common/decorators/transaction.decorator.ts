import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

export const Transaction = (data_source: string): MethodDecorator => {
  return (target: any, _: string, descriptor: PropertyDescriptor) => {
    InjectDataSource(data_source)(target, '__connection__')
    const origin_method = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const connection: DataSource = (this as any).__connection__
      const query_runner = connection.createQueryRunner()
      try {
        await query_runner.startTransaction()

        const result = await origin_method.apply(this, args)

        await query_runner.commitTransaction()
        await query_runner.release()

        return result
      } catch (err) {
        await query_runner.rollbackTransaction()
        await query_runner.release()

        throw err
      }
    }

    Reflect.getMetadataKeys(origin_method).forEach((previous_metadata_key) => {
      const previous_metadata = Reflect.getMetadata(
        previous_metadata_key,
        origin_method
      )

      Reflect.defineMetadata(
        previous_metadata_key,
        previous_metadata,
        descriptor.value as object
      )
    })

    Object.defineProperty(descriptor.value, 'name', {
      value: origin_method.name,
      writable: false
    })
  }
}
