import { HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { Mock } from '../../types/test.type'
import { UsersService } from './users.service'

const mockHttpService = () => ({})

describe('UsersService', () => {
  let service: UsersService
  let httpService: Mock<HttpService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: HttpService,
          useValue: mockHttpService()
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
    httpService = module.get(HttpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
