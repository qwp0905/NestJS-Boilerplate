export * from './aws.service'

import { Module } from '@nestjs/common'
import { AwsService } from '@aws'
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'

@Module({
  providers: [
    AwsService,
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
  exports: [AwsService]
})
export class AwsModule {}
