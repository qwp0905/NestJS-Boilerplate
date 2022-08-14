export * from './slack.service'

import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SlackService } from '@slack'
import { WebClient } from '@slack/web-api'

@Module({
  providers: [
    {
      provide: 'Slack',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new WebClient(configService.get<string>('SLACK_API_TOKEN'))
      }
    },
    SlackService
  ],
  exports: [SlackService]
})
export class SlackModule {}
