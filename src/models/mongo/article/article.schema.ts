import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'test1', versionKey: false })
export class Article {
  @Prop()
  article_id: number

  @Prop()
  context: string

  @Prop()
  writer_name: string

  @Prop()
  dt: Date
}

export type ArticleDocument = Article & Document

export const ArticleSchema = SchemaFactory.createForClass(Article)
