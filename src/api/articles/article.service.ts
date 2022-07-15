import { Injectable } from '@nestjs/common'
import { ArticleModel } from '../../models/mongo/article/article.model'

@Injectable()
export class ArticleService {
  constructor(private readonly articleModel: ArticleModel) {}

  async findArticle() {
    const article = this.articleModel.find()
    return article
  }
}
