import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '@models/mysql/user/user.repository'
import { Mock } from '@type/test.type'
import { AuthService } from '@auth/auth.service'

const mockUserRepository = () => ({})

describe('AuthService', () => {
  let service: AuthService
  let userRepository: Mock<UserRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: mockUserRepository()
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
    userRepository = module.get(UserRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
