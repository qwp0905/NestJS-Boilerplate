import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { RabbitmqService } from 'src/external/rabbitmq/rabbitmq.module'

describe('RabbitmqService', () => {
  let service: RabbitmqService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, RabbitmqService]
    }).compile()

    service = module.get<RabbitmqService>(RabbitmqService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
