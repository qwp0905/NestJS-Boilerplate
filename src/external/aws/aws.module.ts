export * from './aws.s3.service'

import { DynamicModule, Module } from '@nestjs/common'
import { AwsS3Service } from '@aws'
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'

@Module({})
export class AwsModule {
  static S3(): DynamicModule {
    return {
      module: AwsModule,
      providers: [
        AwsS3Service,
        {
          provide: 'AWS-S3',
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return new S3({
              region: configService.get<string>('AWS_REGION'),
              credentials: {
                accessKeyId: configService.get<string>('AWS_ACCESS_KEY'),
                secretAccessKey: configService.get<string>('AWS_ACCESS_SECRET')
              }
            })
          }
        }
      ],
      exports: [AwsS3Service]
    }
  }
}
