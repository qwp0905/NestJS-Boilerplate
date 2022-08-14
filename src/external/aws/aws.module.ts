export * from './aws.provider'
export * from './aws.s3.service'

import { DynamicModule, Module } from '@nestjs/common'
import { AwsS3Service } from '@aws'
import { AwsRootProvider, AwsS3Provider } from '@aws'

@Module({})
export class AwsModule {
  static forRoot(): DynamicModule {
    return {
      module: AwsModule,
      providers: [AwsRootProvider]
    }
  }

  static S3(): DynamicModule {
    return {
      module: AwsModule,
      providers: [AwsS3Service, AwsS3Provider],
      exports: [AwsS3Service]
    }
  }
}
