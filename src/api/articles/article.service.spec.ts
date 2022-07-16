import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { ArticleModel } from '../../models/mongo/article/article.model'
import { Article } from '../../models/mongo/article/article.schema'
import { Mock } from '../../types/test.type'
import { ArticleService } from './article.service'

const mockArticleModel = (): Partial<ArticleModel> => ({})

describe('ArticleService', () => {
  let service: ArticleService
  let articleModel: Mock<ArticleModel>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getModelToken('123', 'mongo'),
          useValue: mockArticleModel()
        }
      ]
    }).compile()

    service = module.get<ArticleService>(ArticleService)
    articleModel = module.get(getModelToken('123', 'mongo'))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
