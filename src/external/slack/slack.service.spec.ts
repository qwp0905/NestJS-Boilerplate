import { Test, TestingModule } from '@nestjs/testing'
import { SlackService } from '@slack'
import { WebClient } from '@slack/web-api'
import { Mock } from '@type'

const mockWeb = () => ({})

describe('SlackService', () => {
  let service: SlackService
  let web: Mock<WebClient>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlackService,
        {
          provide: 'Slack',
          useValue: mockWeb
        }
      ]
    }).compile()

    service = module.get<SlackService>(SlackService)
    web = module.get('Slack')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(web).toBeDefined()
  })
})
