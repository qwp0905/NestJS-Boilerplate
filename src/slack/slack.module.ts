import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WebClient } from '@slack/web-api'
import { SlackService } from './slack.service'

@Module({
  providers: [
    {
      provide: 'Slack',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return await new WebClient(configService.get<string>('SLACK_API_TOKEN'))
      }
    },
    SlackService
  ],
  exports: [SlackService]
})
export class SlackModule {}