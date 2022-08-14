export * from './slack.provider'
export * from './slack.service'

import { DynamicModule, Module } from '@nestjs/common'
import { SlackRootProvider, SlackFeatureProvider, SlackService } from '@slack'

@Module({})
export class SlackModule {
  static forRoot(): DynamicModule {
    return {
      module: SlackModule,
      providers: [SlackRootProvider]
    }
  }

  static forFeature(): DynamicModule {
    return {
      module: SlackModule,
      providers: [SlackService, SlackFeatureProvider],
      exports: [SlackService]
    }
  }
}
