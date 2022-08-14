import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WebClient } from '@slack/web-api'

let web: WebClient

export const SlackRootProvider: Provider = {
  provide: 'Slack_root',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    web = new WebClient(configService.get<string>('SLACK_API_TOKEN'))
    return web
  }
}

export const SlackFeatureProvider: Provider = {
  provide: 'Slack',
  useFactory: () => web
}
