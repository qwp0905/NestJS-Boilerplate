import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CacheService } from '../cache/cache.service'
import { UserRepository } from '../models/mysql/user/user.repository'
import { Mock } from '../types/test.type'
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
          provide: getRepositoryToken(UserRepository, 'MySQL'),
          useValue: mockUserRepository()
        },
        {
          provide: CacheService,
          useValue: mockCacheService()
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
    userRepository = module.get(getRepositoryToken(UserRepository, 'MySQL'))
    cacheService = module.get(CacheService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
