import { CACHE_MANAGER } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Cache } from 'cache-manager'
import { Mock } from '../common/types/test.type'
import { CacheService } from './cache.service'

const mockCache = () => ({})

describe('CacheService', () => {
  let service: CacheService
  let cache: Mock<Cache>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCache()
        }
      ]
    }).compile()

    service = module.get<CacheService>(CacheService)
    cache = module.get(CACHE_MANAGER)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
