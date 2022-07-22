import { HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '../../models/mysql/user/user.repository'
import { Mock } from '../../common/types/test.type'
import { UsersService } from './users.service'
import { MysqlService } from '../../models/mysql/mysql.service'

const mockHttpService = () => ({})
const mockUserRepository = () => ({})
const mockMysqlService = () => ({})

describe('UsersService', () => {
  let service: UsersService
  let httpService: Mock<HttpService>
  let userRepository: Mock<UserRepository>
  let mysqlService: Mock<MysqlService>

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
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
    httpService = module.get(HttpService)
    userRepository = module.get(UserRepository)
    mysqlService = module.get(MysqlService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
