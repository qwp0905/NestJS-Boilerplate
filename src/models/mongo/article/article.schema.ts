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

  @Prop({ type: [String] })
  logs: Array<string>

  @Prop()
  _dt: string
}

export type ArticleDocument = Article & Document

export const ArticleSchema = SchemaFactory.createForClass(Article)
