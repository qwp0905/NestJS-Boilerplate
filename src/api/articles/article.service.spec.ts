import { Test, TestingModule } from '@nestjs/testing'
import { ArticleModel } from '@models/mongo/article/article.model'
import { Mock } from '@type/test.type'
import { ArticleService } from '@api/articles/article.service'

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
