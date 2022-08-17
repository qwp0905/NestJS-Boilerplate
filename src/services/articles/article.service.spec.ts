import { Test, TestingModule } from '@nestjs/testing'
import { ArticleModel } from '@models/mongo'
import { Mock } from '@type'
import { ArticleService } from '@services'

const mockArticleModel = (): Partial<ArticleModel> => ({})

describe('ArticleService', () => {
  let service: ArticleService
  let articleModel: Mock<ArticleModel>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: ArticleModel,
          useValue: mockArticleModel()
        }
      ]
    }).compile()

    service = module.get<ArticleService>(ArticleService)
    articleModel = module.get(ArticleModel)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
