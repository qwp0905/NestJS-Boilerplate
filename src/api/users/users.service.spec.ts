import { HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '../../models/mysql/user/user.repository'
import { Mock } from '../../types/test.type'
import { UsersService } from './users.service'

const mockHttpService = () => ({})

const mockUserRepository = () => ({})

describe('UsersService', () => {
  let service: UsersService
  let httpService: Mock<HttpService>
  let userRepository: Mock<UserRepository>

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
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
    httpService = module.get(HttpService)
    userRepository = module.get(UserRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
