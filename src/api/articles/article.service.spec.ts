import { getConnectionToken, getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Connection } from 'mongoose'
import { ArticleModel } from '../../models/mongo/article/article.model'
import { ArticleModelModule } from '../../models/mongo/article/article.model.module'
import { Article } from '../../models/mongo/article/article.schema'
import { Mock } from '../../types/test.type'
import { ArticleService } from './article.service'

const mockArticleModel = (): Partial<ArticleModel> => ({})

describe('ArticleService', () => {
  let service: ArticleService
  let articleModel: Mock<ArticleModel>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ArticleModelModule],
      providers: [
        ArticleService,
        {
          provide: ArticleModel,
          inject: [getConnectionToken('mongo')],
          useFactory: (connection: Connection) => ({
            provide: getModelToken(Article.name, 'mongo'),
            useFactory: () => mockArticleModel()
          })
        }
      ]
    }).compile()

    service = module.get<ArticleService>(ArticleService)
    articleModel = module.get(getModelToken(Article.name, 'mongo'))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
