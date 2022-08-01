import { HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '../../models/mysql/user/user.repository'
import { Mock } from '../../common/types/test.type'
import { UsersService } from './users.service'
import { MysqlService } from '../../models/mysql/mysql.service'
import { CacheService } from '../../cache/cache.service'

const mockHttpService = () => ({})
const mockUserRepository = () => ({})
const mockMysqlService = () => ({})
const mockCacheService = () => ({})

describe('UsersService', () => {
  let service: UsersService
  let httpService: Mock<HttpService>
  let userRepository: Mock<UserRepository>
  let mysqlService: Mock<MysqlService>
  let cacheService: Mock<CacheService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: mockUserRepository()
        },
        {
          provide: HttpService,
          useValue: mockHttpService()
        },
        {
          provide: MysqlService,
          useValue: mockMysqlService()
        },
        {
          provide: CacheService,
          useValue: mockCacheService()
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
    httpService = module.get(HttpService)
    userRepository = module.get(UserRepository)
    mysqlService = module.get(MysqlService)
    cacheService = module.get(CacheService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
