import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import Redis from 'ioredis'
import { Mock } from '@type/test.type'
import { RedisService } from '@redis/redis.service'

const mockRedis = () => ({})

describe('RedisService', () => {
  let service: RedisService
  let redis: Mock<Redis>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        ConfigService,
        {
          provide: 'REDIS_1',
          useValue: mockRedis()
        }
      ]
    }).compile()

    service = module.get<RedisService>(RedisService)
    redis = module.get('REDIS_1')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
