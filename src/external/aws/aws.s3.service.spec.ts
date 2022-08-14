import { AwsS3Service } from '@aws'
import { Test, TestingModule } from '@nestjs/testing'
import { Mock } from '@type'
import { S3 } from 'aws-sdk'

const mockS3 = () => ({})

describe('AwsService', () => {
  let service: AwsS3Service
  let s3: Mock<S3>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AwsS3Service,
        {
          provide: 'S3',
          useValue: mockS3()
        }
      ]
    }).compile()

    service = module.get<AwsS3Service>(AwsS3Service)
    s3 = module.get('S3')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(s3).toBeDefined()
  })
})
