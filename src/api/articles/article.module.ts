import { Module } from '@nestjs/common'
import { ArticleModelModule } from '../../models/mongo/article/article.model.module'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
  imports: [ArticleModelModule],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
