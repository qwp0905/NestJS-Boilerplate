import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Article, ArticleDocument, BaseModel } from '@models/mongo'

@Injectable()
export class ArticleModel extends BaseModel<ArticleDocument> {
  constructor(
    @InjectModel(Article.name, 'mongo')
    protected readonly model: Model<ArticleDocument>
  ) {
    super(model)
  }
}
