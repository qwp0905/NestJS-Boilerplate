import { HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '../../models/mysql/user/user.repository'
import { Mock } from '../../common/types/test.type'
import { UsersService } from './users.service'
import { DataSourceService } from '../../models/mysql/dataSource.service'

const mockHttpService = () => ({})
const mockUserRepository = () => ({})
const mockDataSource = () => ({})

describe('UsersService', () => {
  let service: UsersService
  let httpService: Mock<HttpService>
  let userRepository: Mock<UserRepository>
  let dataSource: Mock<DataSourceService>

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
          provide: DataSourceService,
          useValue: mockDataSource()
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
    httpService = module.get(HttpService)
    userRepository = module.get(UserRepository)
    dataSource = module.get(DataSourceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
