import { AwsService } from '@aws'
import { Test, TestingModule } from '@nestjs/testing'
import { Mock } from '@type'
import { S3 } from 'aws-sdk'

const mockS3 = () => ({})

describe('AwsService', () => {
  let service: AwsService
  let s3: Mock<S3>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AwsService,
        {
          provide: 'AWS-S3',
          useValue: mockS3()
        }
      ]
    }).compile()

    service = module.get<AwsService>(AwsService)
    s3 = module.get('AWS-S3')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(s3).toBeDefined()
  })
})
