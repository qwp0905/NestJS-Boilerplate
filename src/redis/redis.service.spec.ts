import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { RedisProvider } from './redis.provider'
import { RedisService } from './redis.service'

describe('RedisService', () => {
  let service: RedisService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisService, ConfigService, RedisProvider(1, 'REDIS_1')]
    }).compile()

    service = module.get<RedisService>(RedisService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
