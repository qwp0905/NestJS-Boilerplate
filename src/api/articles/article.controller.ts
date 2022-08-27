import { Controller } from '@nestjs/common'
import { ArticleService } from '@services'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
}
