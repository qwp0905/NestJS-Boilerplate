import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as AWS from 'aws-sdk'
import { S3 } from 'aws-sdk'

let s3: S3

export const AwsRootProvider: Provider = {
  provide: 'AWS',
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    AWS.config.update({
      region: configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: configService.get<string>('AWS_ACCESS_SECRET')
      }
    })
    s3 = new S3()
    return s3
  }
}

export const AwsS3Provider: Provider = {
  provide: 'S3',
  useFactory: () => s3
}
