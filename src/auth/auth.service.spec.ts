import { Test, TestingModule } from '@nestjs/testing'
import { CacheService } from '../cache/cache.service'
import { UserRepository } from '../models/mysql/user/user.repository'
import { Mock } from '../common/types/test.type'
import { AuthService } from './auth.service'

const mockUserRepository = () => ({})

const mockCacheService = () => ({
  get: jest.fn()
})

describe('AuthService', () => {
  let service: AuthService
  let userRepository: Mock<UserRepository>
  let cacheService: Mock<CacheService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: mockUserRepository()
        },
        {
          provide: CacheService,
          useValue: mockCacheService()
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
    userRepository = module.get(UserRepository)
    cacheService = module.get(CacheService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
