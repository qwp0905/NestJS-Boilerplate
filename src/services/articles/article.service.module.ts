import { Module } from '@nestjs/common'
import { ArticleService } from '@services'

@Module({
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleServiceModule {}
